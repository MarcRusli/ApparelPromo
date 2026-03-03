import { Canvas, FabricImage, filters } from "fabric";
import { useCallback, useEffect, useRef, useState } from "react";
import Toolbar from "./Toolbar";
import CheckoutPanel from "./CheckoutPanel";

import "./TShirtDesigner.css";

export default function TShirtDesigner() {
  const canvasFrontRef = useRef(null);
  const canvasBackRef = useRef(null);
  const fabricCanvasFront = useRef(null);
  const fabricCanvasBack = useRef(null);
  const [activeCanvas, setActiveCanvas] = useState(null);
  const [isFrontSide, setIsFrontSide] = useState(true);
  const [isDirty, setIsDirty] = useState(false);

  const handleToggleSide = () => {
    isFrontSide
      ? setActiveCanvas(fabricCanvasBack.current)
      : setActiveCanvas(fabricCanvasFront.current);
    setIsFrontSide(!isFrontSide);
  };

  const exportDesigns = useCallback(async () => {
    const blobToDataUrl = (blob) =>
      new Promise((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(r.result);
        r.onerror = reject;
        r.readAsDataURL(blob);
      });
    let front = null;
    let back = null;
    if (fabricCanvasFront.current) {
      const blob = await fabricCanvasFront.current.toBlob({
        format: "png",
        quality: 1,
      });
      front = blob ? await blobToDataUrl(blob) : null;
    }
    if (fabricCanvasBack.current) {
      const blob = await fabricCanvasBack.current.toBlob({
        format: "png",
        quality: 1,
      });
      back = blob ? await blobToDataUrl(blob) : null;
    }
    return { front, back };
  }, []);

  const handleSendEmail = async () => {
    // Create FormData
    const formData = new FormData();

    console.log("asdf!");
    console.log(fabricCanvasFront.current);

    await fabricCanvasFront.current
      .toBlob({
        format: "png",
        quality: 1,
      })
      .then((blob) => {
        formData.append("files", blob, "front-design.png");
      })
      .then(() => console.log("made form data?", formData.has("files")));

    // Example: get recipient email from input (hardcoded here for demo)
    formData.append("email", "apparelpromotest@gmail.com");

    try {
      console.log("trying!");
      const res = await fetch("/api/send-both", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        alert("Email with both designs sent!");
      } else {
        alert("Failed to send email.");
      }
    } catch (err) {
      console.error("Error sending email:", err);
    }
  };

  useEffect(() => {
    const setUpCanvas = (canvasRef, modelURL, shirtURL) => {
      if (canvasRef.current) {
        const initCanvas = new Canvas(canvasRef.current, {
          width: Math.min(window.innerWidth * 0.8, 800),
          height: Math.min(window.innerHeight * 0.8, 800),
        });

        initCanvas.backgroundColor = "#fff";
        let isPanning = false;
        let lastPosX = 0;
        let lastPosY = 0;

        const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

        initCanvas.on("mouse:wheel", (opt) => {
          const evt = opt.e;
          const delta = evt.deltaY;
          const zoom = initCanvas.getZoom();
          const nextZoom = clamp(zoom * 0.999 ** delta, 0.4, 2.5);
          const pointer = initCanvas.getPointer(evt);
          initCanvas.zoomToPoint(pointer, nextZoom);
          evt.preventDefault();
          evt.stopPropagation();
        });

        initCanvas.on("mouse:down", (opt) => {
          const evt = opt.e;
          if (initCanvas.getZoom() <= 1) return;
          if (evt.altKey || evt.button === 1) {
            isPanning = true;
            initCanvas.selection = false;
            lastPosX = evt.clientX;
            lastPosY = evt.clientY;
          }
        });

        initCanvas.on("mouse:move", (opt) => {
          if (!isPanning) return;
          const evt = opt.e;
          const vpt = initCanvas.viewportTransform;
          if (!vpt) return;
          vpt[4] += evt.clientX - lastPosX;
          vpt[5] += evt.clientY - lastPosY;
          initCanvas.requestRenderAll();
          lastPosX = evt.clientX;
          lastPosY = evt.clientY;
        });

        initCanvas.on("mouse:up", () => {
          isPanning = false;
          initCanvas.selection = true;
        });

        // add non-interactive T-shirt background
        // --- Preload background image (non-interactive) ---
        FabricImage.fromURL(modelURL)
          .then((img) => {
            const maxWidth = initCanvas.getWidth();
            const maxHeight = initCanvas.getHeight();

            const origW = img.get("width");
            const origH = img.get("height");
            const scaleX = maxWidth / origW;
            const scaleY = maxHeight / origH;
            const scale = Math.min(scaleX, scaleY);

            img.set({
              scaleX: scale,
              scaleY: scale,
              originX: "center",
              originY: "center",
              selectable: false, // lock it
              evented: false, // no mouse events
            });

            initCanvas.add(img);
            initCanvas.centerObject(img);
          })
          .then(
            FabricImage.fromURL(shirtURL).then((img) => {
              const maxWidth = initCanvas.getWidth();
              const maxHeight = initCanvas.getHeight();

              const origW = img.get("width");
              const origH = img.get("height");
              const scaleX = maxWidth / origW;
              const scaleY = maxHeight / origH;
              const scale = Math.min(scaleX, scaleY);

              img.set({
                scaleX: scale,
                scaleY: scale,
                originX: "center",
                originY: "center",
                selectable: false, // lock it
                evented: false, // no mouse events
              });

              const redFilter = new filters.BlendColor({
                color: "#cc0000", // or dynamic color
                mode: "multiply",
                alpha: 1,
              });

              img.filters.push(redFilter);
              img.applyFilters();

              initCanvas.add(img);
              initCanvas.centerObject(img);
              initCanvas.requestRenderAll();
              //setCanvas(initCanvas);
            })
          )
          .then(() => setIsDirty(false)); // sets dirty flag back to false after loading initial bg imgs

        //initCanvas.renderAll();

        return initCanvas;
      }
    };

    fabricCanvasFront.current = setUpCanvas(
      canvasFrontRef,
      "/WhiteModelFront4.jpg",
      "/white-front-mask.png"
    );
    fabricCanvasBack.current = setUpCanvas(
      canvasBackRef,
      "/t-shirt-background-back.jpg",
      "/white-front-mask.png"
    );

    setActiveCanvas(fabricCanvasFront.current);

    // Mark dirty when user edits
    const markDirty = () => setIsDirty(true);
    const events = ["object:added", "object:modified", "object:removed"];
    events.forEach((ev) => {
      fabricCanvasFront.current.on(ev, markDirty);
      fabricCanvasBack.current.on(ev, markDirty);
    });

    return () => {
      fabricCanvasFront.current.dispose();
      fabricCanvasBack.current.dispose();
    };
  }, []);

  // Register beforeunload only if dirty
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ""; // required for Chrome/Edge
      // Some older browsers might display this string
      return "You have unsaved changes. Are you sure you want to leave?";
    };

    if (isDirty) {
      console.log("adding event listener beforeunload!!!");
      window.addEventListener("beforeunload", handleBeforeUnload);
    } else {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  return (
    <div className="designer-container">
      <div className="designer-header">
        <div>
          <p className="designer-eyebrow">T-Shirt Designer</p>
          <h1 className="designer-title">Build Your Custom Tee</h1>
          <p className="designer-subtitle">
            Add shapes, upload art, then export or send your design.
          </p>
        </div>
        <div className="designer-actions">
          <button className="designer-secondary" onClick={handleToggleSide}>
            {isFrontSide ? "View Back" : "View Front"}
          </button>
          <button className="designer-primary" onClick={handleSendEmail}>
            Send to ApparelPromo
          </button>
        </div>
      </div>

      <div className="designer-layout">
        <Toolbar canvas={activeCanvas} />
        <CheckoutPanel exportDesigns={exportDesigns} />
        <div className="designer-canvas-card">
          <div
            className="designer-canvas-wrap"
            style={{ display: isFrontSide ? "block" : "none" }}
          >
            <canvas className="canvas canvas-front" ref={canvasFrontRef} />
          </div>
          <div
            className="designer-canvas-wrap"
            style={{ display: isFrontSide ? "none" : "block" }}
          >
            <canvas className="canvas canvas-back" ref={canvasBackRef} />
          </div>
          <div className="designer-hint">
            Tip: drag, resize, or delete items from the toolbar.
          </div>
        </div>
      </div>
    </div>
  );
}

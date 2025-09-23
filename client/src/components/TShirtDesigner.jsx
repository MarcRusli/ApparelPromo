import { Canvas, FabricImage } from "fabric";
import { useEffect, useRef, useState } from "react";
import Toolbar from "./Toolbar";

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

  useEffect(() => {
    const setUpCanvas = (canvasRef, shirtURL) => {
      if (canvasRef.current) {
        const initCanvas = new Canvas(canvasRef.current, {
          width: Math.min(window.innerWidth * 0.8, 800),
          height: Math.min(window.innerHeight * 0.8, 800),
        });

        initCanvas.backgroundColor = "#fff";

        // add non-interactive T-shirt background
        // --- Preload background image (non-interactive) ---
        FabricImage.fromURL(shirtURL)
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
            initCanvas.requestRenderAll();
            //setCanvas(initCanvas);
          })
          .then(() => setIsDirty(false)); // sets dirty flag back to false after loading initial bg imgs

        //initCanvas.renderAll();

        return initCanvas;
      }
    };

    fabricCanvasFront.current = setUpCanvas(
      canvasFrontRef,
      "/t-shirt-background-front.jpg"
    );
    fabricCanvasBack.current = setUpCanvas(
      canvasBackRef,
      "/t-shirt-background-back.jpg"
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
      <Toolbar canvas={activeCanvas} />
      <div
        style={{
          border: "1px solid #ccc",
          display: isFrontSide ? "block" : "none",
        }}
      >
        <canvas className="canvas canvas-front" ref={canvasFrontRef} />
      </div>
      <div
        style={{
          border: "1px solid #ccc",
          display: isFrontSide ? "none" : "block",
        }}
      >
        <canvas className="canvas canvas-back" ref={canvasBackRef} />
      </div>
      <button onClick={handleToggleSide}>
        Switch to {isFrontSide ? "Back" : "Front"}
      </button>
    </div>
  );
}

import { Canvas, FabricImage } from "fabric";
import { useEffect, useRef, useState } from "react";
import Toolbar from "./Toolbar";

import "./TShirtDesigner.css";

export default function TShirtDesigner() {
  const canvasFrontRef = useRef(null);
  const canvasBackRef = useRef(null);
  const [activeCanvas, setActiveCanvas] = useState(null);
  const fabricCanvasFront = useRef(null);
  const fabricCanvasBack = useRef(null);

  const handleToggleSide = () => {
    setActiveCanvas((prev) =>
      prev == fabricCanvasFront.current
        ? fabricCanvasBack.current
        : fabricCanvasFront.current
    );
  };

  // do once on mount
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

          initCanvas.add(img);
          initCanvas.centerObject(img);
          initCanvas.requestRenderAll();

          //setCanvas(initCanvas);
        });

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

    return () => {
      fabricCanvasFront.current.dispose();
      fabricCanvasBack.current.dispose();
    };
  }, []);

  return (
    <div className="designer-container">
      <Toolbar canvas={activeCanvas} />
      <div
        style={{
          border: "1px solid #ccc",
          display:
            activeCanvas === fabricCanvasFront.current ? "block" : "none",
        }}
      >
        <canvas className="canvas canvas-front" ref={canvasFrontRef} />
      </div>
      <div
        style={{
          border: "1px solid #ccc",
          display:
            activeCanvas === fabricCanvasBack.current ? "block" : "none",
        }}
      >
        <canvas className="canvas canvas-back" ref={canvasBackRef} />
      </div>
      <button onClick={handleToggleSide}>
        Switch to {activeCanvas == fabricCanvasFront.current ? "Back" : "Front"}
      </button>
    </div>
  );
}

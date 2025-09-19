import { Canvas, FabricImage } from "fabric";
import { useEffect, useRef, useState } from "react";
import Toolbar from "./Toolbar";

import "./TShirtDesigner.css";

export default function TShirtDesigner() {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  // do once on mount
  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, {
        width: Math.min(window.innerWidth * 0.8, 800),
        height: Math.min(window.innerHeight * 0.8, 800),
      });

      initCanvas.backgroundColor = "#fff";

      // add non-interactive T-shirt background
      // --- Preload background image (non-interactive) ---
      FabricImage.fromURL(
        "/t-shirt-background.jpg"
        //"https://cdnp.sanmar.com/medias/sys_master/images/hf9/h1b/28963219472414/1200W_4349_Black-0-ST350BlackModelFront5/1200W-4349-Black-0-ST350BlackModelFront5.jpg"
      ).then((img) => {
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

        // Send it to the very back so all new objects are above
        initCanvas.requestRenderAll();

        setCanvas(initCanvas);
      });

      //initCanvas.renderAll();

      return () => {
        initCanvas.dispose();
      };
    }
  }, []);

  return (
    <div className="designer-container">
      <Toolbar canvas={canvas} />
      <canvas id="canvas" ref={canvasRef} />
    </div>
  );
}

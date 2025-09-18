import {
  Canvas,
  Circle,
  FabricImage,
  Control,
  Rect,
} from "fabric";
import { useEffect, useRef, useState } from "react";
import Toolbar from "./Toolbar";
//import millsHighImg from "../assets/mills-high-school.jpg";

export default function TShirtDesigner() {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  /* function deleteObject(_eventData, transform) {
    const canvas = transform.target.canvas;
    canvas.remove(transform.target);
    canvas.requestRenderAll();
  }

  const deleteIcon =
    "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

  var deleteImg = document.createElement("img");
  deleteImg.src = deleteIcon;

  function renderIcon(ctx, left, top) {
    const size = this.cornerSize;
    ctx.save();
    ctx.translate(left, top);
    ctx.drawImage(deleteImg, -size / 2, -size / 2, size, size);
    ctx.restore();
  } */

  // do once on mount
  useEffect(() => {
    // check if canvas exists?
    if (canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, {
        width: 500,
        height: 500,
      });

      // Add global delete control for all FabricObjects
      /* InteractiveFabricObject.prototype.controls.de = new Control({
        x: 0.5,
        y: -0.5,
        offsetX: 10,
        offsetY: -10,
        cursorStyle: "pointer",
        mouseUpHandler: (eventData, transform) => {
          const target = transform.target;
          canvas.remove(target);
          canvas.requestRenderAll();
          return true;
        },
        render: function renderDeleteIcon(ctx, left, top) {
          const size = this.cornerSize || 24;
          ctx.save();
          ctx.translate(left, top);

          ctx.beginPath();
          ctx.arc(0, 0, size / 2, 0, 2 * Math.PI, false);
          ctx.fillStyle = "red";
          ctx.fill();

          ctx.strokeStyle = "white";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-size / 4, -size / 4);
          ctx.lineTo(size / 4, size / 4);
          ctx.moveTo(size / 4, -size / 4);
          ctx.lineTo(-size / 4, size / 4);
          ctx.stroke();

          ctx.restore();
        },
        cornerSize: 24,
      }); */

      initCanvas.backgroundColor = "#fff";
      initCanvas.renderAll();

      setCanvas(initCanvas);

      /* FabricObject.prototype.controls.deleteControl = new Control({
        x: 0.5,
        y: -0.5,
        offsetY: 16,
        cursorStyle: "pointer",
        mouseUpHandler: deleteObject,
        render: renderIcon,
        cornerSize: 24,
      }); */

      return () => {
        initCanvas.dispose();
      };
    }
  }, []);

  return (
    <>
      <Toolbar canvas={canvas} />
      <canvas id="canvas" ref={canvasRef} />
    </>
  );
}

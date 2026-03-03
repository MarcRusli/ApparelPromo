import { FabricImage, Rect, Circle } from "fabric";
import "./Toolbar.css";

export default function Toolbar({ canvas }) {
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const zoomTo = (nextZoom) => {
    if (!canvas) return;
    const zoom = clamp(nextZoom, 0.4, 2.5);
    const center = canvas.getCenter();
    canvas.zoomToPoint({ x: center.left, y: center.top }, zoom);
    canvas.requestRenderAll();
  };

  const zoomIn = () => {
    if (!canvas) return;
    zoomTo(canvas.getZoom() + 0.1);
  };

  const zoomOut = () => {
    if (!canvas) return;
    zoomTo(canvas.getZoom() - 0.1);
  };

  const resetZoom = () => {
    if (!canvas) return;
    zoomTo(1);
  };

  const addRectangle = () => {
    // check if canvas has been initialized
    if (canvas) {
      const rect = new Rect({
        top: 100,
        left: 50,
        width: 100,
        height: 60,
        fill: "#a371a8",
      });
      canvas.add(rect);
    }
  };

  const addCircle = () => {
    if (canvas) {
      const circle = new Circle({
        top: 100,
        left: 50,
        radius: 50,
        fill: "#d66d0d",
      });
      canvas.add(circle);
    }
  };

  async function addImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async function (event) {
      try {
        if (canvas) {
          // load image as FabricImage
          const img = await FabricImage.fromURL(
            event.target.result,
            { crossOrigin: "anonymous" }, // loadImage options
            {} // imageOptions (you can preset width/height etc.)
          );

          // Once loaded, img.naturalWidth and img.naturalHeight (or img.width/img.height) are the original size
          const origWidth = img.get("width");
          const origHeight = img.get("height");

          const maxWidth = 100;
          const maxHeight = 100;

          // compute scale to fit into the box
          const scaleX = maxWidth / origWidth;
          const scaleY = maxHeight / origHeight;
          const scale = Math.min(scaleX, scaleY, 1);
          // the “, 1” ensures we don't upscale beyond 100% if that's a concern

          // set size/scale and position
          img.set({
            scaleX: scale,
            scaleY: scale,
            originX: "center",
            originY: "center",
          });

          canvas.add(img);
          canvas.centerObject(img);
          canvas.setActiveObject(img);
        }
      } catch (err) {
        console.error("Error loading image", err);
      }
    };
    reader.readAsDataURL(file); // convert file to base64 URL for fromURL
  }

  const deleteObject = () => {
    if (!canvas) return;

    const activeObjects = canvas.getActiveObjects();
    activeObjects.forEach((obj) => canvas.remove(obj));
    canvas.discardActiveObject();
  };

  const exportAsPNG = () => {
    if (!canvas) return;

    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1.0,
    });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `t-shirt-design.png`;
    link.click();
  };
  
  return (
    <div className="designer-toolbar">
      <div className="designer-toolbar-title">Tools</div>
      <button className="designer-toolbar-btn" onClick={addRectangle}>
        Add Rectangle
      </button>
      <button className="designer-toolbar-btn" onClick={addCircle}>
        Add Circle
      </button>
      <label htmlFor="image-upload" className="designer-toolbar-btn">
        Upload Image
      </label>
      <input
        className="designer-toolbar-btn"
        type="file"
        id="image-upload"
        name="uploadedImage"
        style={{ display: "none" }}
        onChange={addImage}
      />
      <button
        className="designer-toolbar-btn delete-btn"
        onClick={deleteObject}
      >
        Delete Selected
      </button>
      <button className="designer-toolbar-btn export-btn" onClick={exportAsPNG}>
        Export PNG
      </button>
      <div className="designer-toolbar-divider" />
      <div className="designer-toolbar-title">Zoom</div>
      <div className="designer-zoom-row">
        <button className="designer-toolbar-btn" onClick={zoomOut}>
          -
        </button>
        <button className="designer-toolbar-btn" onClick={resetZoom}>
          Reset
        </button>
        <button className="designer-toolbar-btn" onClick={zoomIn}>
          +
        </button>
      </div>
    </div>
  );
}

import { useState } from "react";
import "./QuickOrder.css";

const API_BASE = import.meta.env.VITE_API_URL || "";

const OPTIONS = [
  {
    id: "sports-team-jersey",
    title: "Sports Team Jersey",
    description: "Build a team jersey order for schools, clubs, and leagues.",
    image: "/sports-team-jersey.jpg",
    isAvailable: true,
  },
  {
    id: "company-uniform",
    title: "Company Uniform",
    description: "Set up uniforms for staff and departments.",
    image: "/embroidery-screen-print-bts.png",
    isAvailable: false,
  },
  {
    id: "graphic-tee",
    title: "Graphic Tee",
    description: "Launch a graphic shirt order for events and merch drops.",
    image: "/hero-image.png",
    isAvailable: false,
  },
];

const SHIRT_MODELS = [
  {
    id: "A4N3142",
    name: "A4 Cooling Performance Short Sleeve Tee",
    image: "/a4-cooling-performance-tee-royal.jpg",
    description:
      "A top choice for sports and exercise, this tee combines a comfortable fit with performance features such as moisture wicking and sun protection.",
    price: "$7.50",
  },
  {
    id: "classic-team-v2",
    name: "Classic Team V2",
    image: "/t-shirt-background-front.jpg",
    description:
      "Balanced everyday jersey with lightweight comfort and strong print results.",
    price: "$24.95",
  },
  {
    id: "rival-mesh-v3",
    name: "Rival Mesh V3",
    image: "/t-shirt-background-back.jpg",
    description:
      "Breathable mesh panel jersey designed for high-movement sports and training.",
    price: "$34.95",
  },
];

const A4_COLOR_SWATCHES = [
  { name: "Royal", hex: "#0047AB", pms: "7687C" },
  { name: "Black", hex: "#2C2C2C", pms: "Black C" },
  { name: "Navy", hex: "#000080", pms: "533C" },
  { name: "White", hex: "#FFFFFF", pms: "White" },
  { name: "Scarlet", hex: "#CE1126", pms: "200C" },
  { name: "Graphite", hex: "#53565A", pms: "7540C" },
  { name: "Silver", hex: "#A2AAAD", pms: "429C" },
  { name: "Teal", hex: "#008080", pms: "322C" },
  { name: "Forest", hex: "#013220", pms: "5535C" },
  { name: "Maroon", hex: "#500000", pms: "504C" },
  { name: "Cardinal", hex: "#C41E3A", pms: "7421C" },
  { name: "Purple", hex: "#4B0082", pms: "7672C" },
  { name: "Kelly", hex: "#009A44", pms: "341C" },
  { name: "Gold", hex: "#FFD700", pms: "1235C" },
  { name: "Light Blue", hex: "#ADD8E6", pms: "644C" },
  { name: "Athletic Orange", hex: "#FF6600", pms: "172C" },
  { name: "Safety Orange", hex: "#FF671F", pms: "021C" },
  { name: "Safety Yellow", hex: "#E1E000", pms: "809C" },
  { name: "Lime", hex: "#32CD32", pms: "375C" },
  { name: "Electric Blue", hex: "#0072CE", pms: "2147C" },
  { name: "Coral", hex: "#FF7F50", pms: "171C" },
  { name: "Pink", hex: "#FFC0CB", pms: "189C" },
  { name: "Fuchsia", hex: "#FF00FF", pms: "219C" },
  { name: "Light Yellow", hex: "#FFFFE0", pms: "120C" },
  { name: "Military Green", hex: "#4B5320", pms: "7771C" },
  { name: "Olive", hex: "#808000", pms: "5743C" },
  { name: "Pastel Blue", hex: "#B0C4DE", pms: "543C" },
  { name: "Pastel Mint", hex: "#B2E2E2", pms: "344C" },
  { name: "Sand", hex: "#C2B280", pms: "453C" },
  { name: "Vegas Gold", hex: "#C5B358", pms: "4525C" },
];

export default function QuickOrder() {
  const [phase, setPhase] = useState("order-type");
  const [selectedOrderType, setSelectedOrderType] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [shirtModelAlert, setShirtModelAlert] = useState("");
  const [frontPlacement, setFrontPlacement] = useState("none");
  const [frontDesignColors, setFrontDesignColors] = useState(0);
  const [frontDesignFile, setFrontDesignFile] = useState(null);
  const [frontDesignFileName, setFrontDesignFileName] = useState("");
  const [frontPhaseAlert, setFrontPhaseAlert] = useState("");
  const [backSpreadsheetFile, setBackSpreadsheetFile] = useState(null);
  const [backSpreadsheetFileName, setBackSpreadsheetFileName] = useState("");
  const [backDesignFile, setBackDesignFile] = useState(null);
  const [backDesignFileName, setBackDesignFileName] = useState("");
  const [backDesignColors, setBackDesignColors] = useState(0);
  const [shippingMethod, setShippingMethod] = useState("delivery");
  const [shippingAddress, setShippingAddress] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [sendOrderStatus, setSendOrderStatus] = useState({ state: "idle", message: "" });
  const [backFeatures, setBackFeatures] = useState({
    name: false,
    title: false,
    backDesign: false,
  });

  const handleSelectOrderType = (option) => {
    if (!option.isAvailable) return;
    setSelectedOrderType(option.title);
    setPhase("shirt-model");
  };

  const handleSelectModel = (modelId) => {
    if (selectedModel === modelId) {
      setSelectedModel("");
      setSelectedColor("");
      setShirtModelAlert("");
      return;
    }
    setSelectedModel(modelId);
    setSelectedColor("");
    setShirtModelAlert("");
    setFrontPlacement("none");
    setFrontDesignColors(0);
    setFrontDesignFile(null);
    setFrontDesignFileName("");
    setFrontPhaseAlert("");
    setBackSpreadsheetFile(null);
    setBackSpreadsheetFileName("");
    setBackDesignFile(null);
    setBackDesignFileName("");
    setBackDesignColors(0);
    setBackFeatures({ name: false, title: false, backDesign: false });
  };

  const handleFrontPlacementChange = (value) => {
    setFrontPlacement(value);
    setFrontPhaseAlert("");
    if (value === "none") {
      setFrontDesignColors(0);
      return;
    }
    setFrontDesignColors((current) => {
      if (current < 1) return 1;
      if (current > 4) return 4;
      return current;
    });
  };

  const handleFrontDesignUpload = (event) => {
    const file = event.target.files?.[0];
    setFrontDesignFile(file || null);
    setFrontDesignFileName(file ? file.name : "");
    setFrontPhaseAlert("");
  };

  const handleContinueToBackDesign = () => {
    const needsUpload = frontPlacement === "full-front" || frontPlacement === "left-chest";
    if (needsUpload && !frontDesignFileName) {
      setFrontPhaseAlert(
        "Upload a front design before continuing when Full Front or Left Chest is selected.",
      );
      return;
    }
    setFrontPhaseAlert("");
    setPhase("back-design");
  };

  const handleBackFeatureToggle = (feature) => {
    setBackFeatures((current) => {
      const nextValue = !current[feature];
      if (feature === "backDesign") {
        if (nextValue) {
          setBackDesignColors((colorCount) => (colorCount < 1 ? 1 : colorCount));
        } else {
          setBackDesignColors(0);
          setBackDesignFileName("");
        }
      }
      return {
        ...current,
        [feature]: nextValue,
      };
    });
  };

  const handleBackSpreadsheetUpload = (event) => {
    const file = event.target.files?.[0];
    setBackSpreadsheetFile(file || null);
    setBackSpreadsheetFileName(file ? file.name : "");
  };

  const handleBackDesignUpload = (event) => {
    const file = event.target.files?.[0];
    setBackDesignFile(file || null);
    setBackDesignFileName(file ? file.name : "");
  };

  const selectedModelDetails = SHIRT_MODELS.find(
    (model) => model.id === selectedModel,
  );
  const showColorPanel = phase === "shirt-model" && Boolean(selectedModel);
  const showA4Colors = selectedModel === "A4N3142";
  const canContinueToFrontDesign = showA4Colors && Boolean(selectedColor);
  const showFullFront = frontPlacement === "full-front";
  const showLeftChest = frontPlacement === "left-chest";
  const spreadsheetFields = ["Style", "Size"];
  if (backFeatures.name) spreadsheetFields.push("Name");
  if (backFeatures.title) spreadsheetFields.push("Title");
  const spreadsheetLabel = `Upload ${spreadsheetFields.join("/") } Spreadsheet`;

  const parsePrice = (value) => {
    if (!value) return 0;
    const num = Number(String(value).replace(/[^0-9.]/g, ""));
    return Number.isFinite(num) ? num : 0;
  };

  const baseUnitPrice = selectedModelDetails ? parsePrice(selectedModelDetails.price) : 0;
  const frontPrintUnit =
    frontPlacement === "none" ? 0 : 2 + Math.max(1, frontDesignColors) * 1.5;
  const backNameUnit = backFeatures.name ? 1.0 : 0;
  const backTitleUnit = backFeatures.title ? 0.75 : 0;
  const backDesignUnit = backFeatures.backDesign
    ? 2 + Math.max(1, backDesignColors) * 1.5
    : 0;
  const pickupOrDelivery = shippingMethod === "delivery" ? 12 : 0;
  const estimateUnitSubtotal =
    baseUnitPrice + frontPrintUnit + backNameUnit + backTitleUnit + backDesignUnit;
  const estimateTotal = estimateUnitSubtotal + pickupOrDelivery;

  const fileToDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSendQuickOrder = async () => {
    if (sendOrderStatus.state === "sending") return;

    if (!contactName || !contactEmail) {
      setSendOrderStatus({
        state: "error",
        message: "Please enter your name and email before sending the order.",
      });
      return;
    }

    setSendOrderStatus({ state: "sending", message: "" });
    try {
      const attachments = {};
      if (frontDesignFile) {
        attachments.frontDesign = {
          fileName: frontDesignFileName || frontDesignFile.name,
          dataUrl: await fileToDataUrl(frontDesignFile),
        };
      }
      if (backDesignFile) {
        attachments.backDesign = {
          fileName: backDesignFileName || backDesignFile.name,
          dataUrl: await fileToDataUrl(backDesignFile),
        };
      }
      if (backSpreadsheetFile) {
        attachments.styleSizeBreakdown = {
          fileName: backSpreadsheetFileName || backSpreadsheetFile.name,
          dataUrl: await fileToDataUrl(backSpreadsheetFile),
        };
      }

      const payload = {
        orderType: selectedOrderType || "Sports Team Jersey",
        contactName,
        contactEmail,
        contactPhone,
        model: selectedModelDetails?.name || "",
        color: selectedColor,
        frontPlacement,
        frontColorCount: frontPlacement === "none" ? 0 : frontDesignColors,
        backTitle: Boolean(backFeatures.title),
        backName: Boolean(backFeatures.name),
        backDesign: Boolean(backFeatures.backDesign),
        backColorCount: backFeatures.backDesign ? backDesignColors : 0,
        shippingMethod: shippingMethod === "delivery" ? "Deliver" : "Pick Up",
        deliveryAddress: shippingMethod === "delivery" ? shippingAddress : "",
        attachments,
      };

      const res = await fetch(`${API_BASE}/api/quick-order/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || "Failed to send order");
      }
      setSendOrderStatus({ state: "sent", message: "Order sent. We'll email you within 48 hours." });
    } catch (err) {
      setSendOrderStatus({
        state: "error",
        message: err?.message || "Failed to send order",
      });
    }
  };

  return (
    <main className="quick-order-page">
      <section className="quick-order-hero">
        <p className="quick-order-eyebrow">Quick Order</p>
        <h1>
          {phase === "order-type"
            ? "Choose Your Order Type"
            : phase === "shirt-model"
              ? "Pick a Shirt Model"
              : phase === "front-design"
                ? "Front Design"
                : phase === "back-design"
                  ? "Back Design"
                  : "Shipping & Order Confirmation"}
        </h1>
        <p className="quick-order-copy">
          {phase === "order-type"
            ? "Start by selecting the product category that matches your order."
            : phase === "shirt-model"
              ? "Choose any model to continue into the front design step."
              : phase === "front-design"
                ? "Set the front print location and upload your artwork."
                : phase === "back-design"
                  ? "Choose what to include on the back of the shirt."
                  : "Review shipping details and confirm your order."}
        </p>
      </section>

      {phase === "order-type" && (
        <section className="quick-order-grid" aria-label="Quick order options">
          {OPTIONS.map((option) => (
            <article
              key={option.id}
              className={`quick-order-panel ${option.isAvailable ? "is-available" : "is-locked"}`}
              onClick={() => handleSelectOrderType(option)}
              onKeyDown={(event) => {
                if (!option.isAvailable) return;
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleSelectOrderType(option);
                }
              }}
              role={option.isAvailable ? "button" : undefined}
              tabIndex={option.isAvailable ? 0 : undefined}
            >
              <div className="quick-order-panel-image-wrap">
                <img
                  className="quick-order-panel-image"
                  src={option.image}
                  alt={`${option.title} option`}
                  loading="lazy"
                />
              </div>
              <div className="quick-order-panel-top">
                <h2>{option.title}</h2>
                {!option.isAvailable && (
                  <span className="coming-soon-badge">Coming Soon</span>
                )}
              </div>
              <p className="quick-order-panel-description">{option.description}</p>
            </article>
          ))}
        </section>
      )}

      {phase === "shirt-model" && (
        <section
          className={`quick-order-model-layout ${showColorPanel ? "is-model-selected" : ""}`}
        >
          <div
            className={`quick-order-models ${selectedModel ? "is-model-selected" : ""}`}
            aria-label="Shirt model options"
          >
            {SHIRT_MODELS.map((model) => (
              <article
                key={model.id}
                className={`quick-order-model-panel is-available ${
                  selectedModel === model.id ? "is-selected" : ""
                } ${selectedModel && selectedModel !== model.id ? "is-deselected" : ""}`}
                onClick={() => handleSelectModel(model.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleSelectModel(model.id);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <div className="quick-order-model-image-wrap">
                  <img
                    className="quick-order-model-image"
                    src={model.image}
                    alt={model.name}
                    loading="lazy"
                  />
                </div>
                <h2>{model.name}</h2>
                <p>{model.description}</p>
                <p className="quick-order-model-price">{model.price}</p>
              </article>
            ))}
          </div>
          <div
            className={`quick-order-color-panel ${showColorPanel ? "is-visible" : ""}`}
            aria-live="polite"
          >
            <div className="quick-order-color-panel-header">
              <h2>Choose Shirt Color</h2>
              <p>
                {selectedModelDetails
                  ? `Colors available for ${selectedModelDetails.name}.`
                  : "Select a model to view available colors."}
              </p>
              {selectedColor && (
                <p className="quick-order-color-selected">Selected: {selectedColor}</p>
              )}
            </div>
            {showA4Colors ? (
              <div className="quick-order-color-grid" role="list">
                {A4_COLOR_SWATCHES.map((swatch) => (
                  <button
                    type="button"
                    className={`quick-order-color-card ${
                      selectedColor === swatch.name ? "is-selected" : ""
                    }`}
                    role="listitem"
                    key={swatch.name}
                    aria-pressed={selectedColor === swatch.name}
                    onClick={() => {
                      setSelectedColor(swatch.name);
                      setShirtModelAlert("");
                    }}
                  >
                    <span
                      className="quick-order-color-swatch"
                      style={{ backgroundColor: swatch.hex }}
                      aria-hidden="true"
                    />
                    <div className="quick-order-color-meta">
                      <p className="quick-order-color-name">{swatch.name}</p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="quick-order-color-empty">
                <p>Select the A4 Cooling Performance Short Sleeve Tee to see color swatches.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {phase === "shirt-model" && (
        <section className="quick-order-next-step">
          <button
            type="button"
            className="quick-order-back"
            onClick={() => {
            if (selectedModel) {
              setSelectedModel("");
              setSelectedColor("");
              setShirtModelAlert("");
              return;
            }
            setPhase("order-type");
          }}
        >
            {selectedModel ? "Back to Shirt Model" : "Back to Order Types"}
          </button>
          <button
            type="button"
            className={`quick-order-continue ${
              canContinueToFrontDesign ? "" : "is-disabled"
            }`}
            onClick={() => {
              if (!selectedModel) {
                setShirtModelAlert("Select a shirt model to continue.");
                return;
              }
              if (!showA4Colors) {
                setShirtModelAlert(
                  "Color selection is currently available for the A4 Cooling Performance Short Sleeve Tee. Select that model to continue.",
                );
                return;
              }
              if (!selectedColor) {
                setShirtModelAlert(
                  "Select a shirt color before continuing to the front design step.",
                );
                return;
              }
              setPhase("front-design");
            }}
          >
            Continue to Front Design
          </button>
          {shirtModelAlert && (
            <p className="quick-order-warning" role="alert">
              {shirtModelAlert}
            </p>
          )}
        </section>
      )}

      {phase === "front-design" && selectedModelDetails && (
        <section
          className="quick-order-front-design"
          aria-label="Front design setup"
        >
          <div className="quick-order-blueprint-panel">
            <div className="quick-order-blueprint-visual">
              <img
                className="quick-order-blueprint-image"
                src="/blank-tee-front.png"
                alt={`blank template for ${selectedModelDetails.name} front view`}
              />
              {showFullFront && (
                <div className="front-placement-highlight full-front" />
              )}
              {showLeftChest && (
                <div className="front-placement-highlight left-chest" />
              )}
            </div>
          </div>

          <div className="quick-order-front-controls">
            <h2>Front Placement</h2>
            <div className="quick-order-placement-options">
              <label className="quick-order-option-row">
                <input
                  type="radio"
                  name="front-placement"
                  value="full-front"
                  checked={frontPlacement === "full-front"}
                  onChange={(event) => handleFrontPlacementChange(event.target.value)}
                />
                Full Front
              </label>
              <label className="quick-order-option-row">
                <input
                  type="radio"
                  name="front-placement"
                  value="left-chest"
                  checked={frontPlacement === "left-chest"}
                  onChange={(event) => handleFrontPlacementChange(event.target.value)}
                />
                Left Chest
              </label>
              <label className="quick-order-option-row">
                <input
                  type="radio"
                  name="front-placement"
                  value="none"
                  checked={frontPlacement === "none"}
                  onChange={(event) => handleFrontPlacementChange(event.target.value)}
                />
                None
              </label>
            </div>

            <div
              className={`quick-order-control-group ${frontPlacement === "none" ? "is-disabled" : ""}`}
            >
              <label htmlFor="front-design-upload">Upload Front Design</label>
              <input
                id="front-design-upload"
                className="sr-only"
                type="file"
                disabled={frontPlacement === "none"}
                onChange={handleFrontDesignUpload}
              />
              <label
                htmlFor="front-design-upload"
                className="quick-order-upload-button"
              >
                Upload Front Design
              </label>
              {frontDesignFileName && (
                <p className="quick-order-upload-name">Uploaded: {frontDesignFileName}</p>
              )}
              <p className="quick-order-tip">
                Tip: Use vector art when possible, or at least a 300 DPI raster
                file for best print quality.
              </p>
            </div>

            <div
              className={`quick-order-control-group ${frontPlacement === "none" ? "is-disabled" : ""}`}
            >
              <label htmlFor="front-design-colors">
                Number of Design Colors
              </label>
              <input
                id="front-design-colors"
                type="number"
                min={frontPlacement === "none" ? "0" : "1"}
                max="4"
                step="1"
                value={frontDesignColors}
                disabled={frontPlacement === "none"}
                onChange={(event) => {
                  const value = Number(event.target.value);
                  if (Number.isNaN(value)) return;
                  setFrontDesignColors(Math.min(4, Math.max(1, value)));
                }}
              />
              <p className="quick-order-tip">
                Tip: For best price and results, keep most designs at 1-2
                colors.
              </p>
            </div>
          </div>
        </section>
      )}

      {phase === "front-design" && (
        <section className="quick-order-next-step">
          <button
            type="button"
            className="quick-order-back"
            onClick={() => setPhase("shirt-model")}
          >
            Back to Shirt Models
          </button>
          <button
            type="button"
            className="quick-order-continue"
            onClick={handleContinueToBackDesign}
          >
            Continue to Back Design
          </button>
          {frontPhaseAlert && (
            <p className="quick-order-warning" role="alert">
              {frontPhaseAlert}
            </p>
          )}
        </section>
      )}

      {phase === "back-design" && (
        <section
          className="quick-order-front-design quick-order-back-design"
          aria-label="Back design setup"
        >
          <div className="quick-order-blueprint-panel">
            <div className="quick-order-blueprint-visual">
              <img
                className="quick-order-blueprint-image"
                src="/blank-tee-back.png"
                alt="Blank tee back blueprint"
              />
              {backFeatures.title && (
                <div className="front-placement-highlight back-title" />
              )}
              {backFeatures.name && (
                <div className="front-placement-highlight back-name" />
              )}
              {backFeatures.backDesign && (
                <div className="front-placement-highlight back-design" />
              )}
            </div>
          </div>

          <div className="quick-order-front-controls">
            <h2>Back Features</h2>
            <p className="quick-order-tip">
              Select any combination of these options for the back setup.
            </p>
            <div className="quick-order-placement-options">
              <label className="quick-order-option-row">
                <input
                  type="checkbox"
                  checked={backFeatures.title}
                  onChange={() => handleBackFeatureToggle("title")}
                />
                Title
              </label>
              <label className="quick-order-option-row">
                <input
                  type="checkbox"
                  checked={backFeatures.name}
                  onChange={() => handleBackFeatureToggle("name")}
                />
                Name
              </label>
              <label className="quick-order-option-row">
                <input
                  type="checkbox"
                  checked={backFeatures.backDesign}
                  onChange={() => handleBackFeatureToggle("backDesign")}
                />
                Back Design
              </label>
            </div>

            <div className="quick-order-control-group">
              <label htmlFor="back-roster-upload">
                {spreadsheetLabel}
              </label>
              <input
                id="back-roster-upload"
                className="sr-only"
                type="file"
                onChange={handleBackSpreadsheetUpload}
              />
              <label htmlFor="back-roster-upload" className="quick-order-upload-button">
                Upload Spreadsheet
              </label>
              {backSpreadsheetFileName && (
                <p className="quick-order-upload-name">
                  Uploaded: {backSpreadsheetFileName}
                </p>
              )}
            </div>

            <div className="quick-order-control-group">
              <p className="quick-order-table-label">Example Spreadsheet Format</p>
              <div className="quick-order-table-wrap">
                <table className="quick-order-example-table">
                  <thead>
                    <tr>
                      <th>Style</th>
                      <th>Size</th>
                      {backFeatures.name && <th>Preferred Name</th>}
                      {backFeatures.title && <th>Title</th>}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Unisex</td>
                      <td>S</td>
                      {backFeatures.name && <td>A DING</td>}
                      {backFeatures.title && <td>CAPTAIN</td>}
                    </tr>
                    <tr>
                      <td>Men&apos;s</td>
                      <td>M</td>
                      {backFeatures.name && <td>M. JOHNSON</td>}
                      {backFeatures.title && <td></td>}
                    </tr>
                    <tr>
                      <td>Women&apos;s</td>
                      <td>XS</td>
                      {backFeatures.name && <td>P Yoshida</td>}
                      {backFeatures.title && <td></td>}
                    </tr>
                    <tr>
                      <td>Unisex</td>
                      <td>L</td>
                      {backFeatures.name && <td>RAJESH</td>}
                      {backFeatures.title && <td>CAPTAIN</td>}
                    </tr>
                    <tr>
                      <td>Men&apos;s</td>
                      <td>XL</td>
                      {backFeatures.name && <td>Alex Kim</td>}
                      {backFeatures.title && <td></td>}
                    </tr>
                  </tbody>
                </table>
              </div>
              {(backFeatures.name || backFeatures.title) && (
                <p className="quick-order-tip">
                  Tip: Names and titles are printed exactly as entered in your spreadsheet,
                  including capitalization, punctuation, and spacing.
                </p>
              )}
            </div>

            <div
              className={`quick-order-control-group ${backFeatures.backDesign ? "" : "is-disabled"}`}
            >
              <label htmlFor="back-design-upload">Upload Back Design</label>
              <input
                id="back-design-upload"
                className="sr-only"
                type="file"
                disabled={!backFeatures.backDesign}
                onChange={handleBackDesignUpload}
              />
              <label htmlFor="back-design-upload" className="quick-order-upload-button">
                Upload Back Design
              </label>
              {backDesignFileName && (
                <p className="quick-order-upload-name">Uploaded: {backDesignFileName}</p>
              )}
              <p className="quick-order-tip">
                Tip: Use vector art when possible, or at least a 300 DPI raster
                file for best print quality.
              </p>
            </div>

            <div
              className={`quick-order-control-group ${backFeatures.backDesign ? "" : "is-disabled"}`}
            >
              <label htmlFor="back-design-colors">Number of Design Colors</label>
              <input
                id="back-design-colors"
                type="number"
                min={backFeatures.backDesign ? "1" : "0"}
                max="4"
                step="1"
                value={backDesignColors}
                disabled={!backFeatures.backDesign}
                onChange={(event) => {
                  const value = Number(event.target.value);
                  if (Number.isNaN(value)) return;
                  setBackDesignColors(Math.min(4, Math.max(1, value)));
                }}
              />
              <p className="quick-order-tip">
                Tip: For best price and results, keep most designs at 1-2 colors.
              </p>
            </div>
          </div>
        </section>
      )}

      {phase === "back-design" && (
        <section className="quick-order-next-step">
          <button
            type="button"
            className="quick-order-back"
            onClick={() => setPhase("front-design")}
          >
            Back to Front Design
          </button>
          <button
            type="button"
            className="quick-order-continue"
            onClick={() => setPhase("shipping-confirmation")}
          >
            Continue to Shipping & Order Confirmation
          </button>
        </section>
      )}

      {phase === "shipping-confirmation" && (
        <section className="quick-order-shipping-layout" aria-label="Shipping and confirmation">
          <div className="quick-order-shipping-card">
            <h2>Shipping & Contact</h2>
            <div className="quick-order-control-group">
              <p className="quick-order-table-label">Shipping</p>
              <div className="quick-order-placement-options">
                <label className="quick-order-option-row">
                  <input
                    type="radio"
                    name="shipping-method"
                    value="delivery"
                    checked={shippingMethod === "delivery"}
                    onChange={(event) => setShippingMethod(event.target.value)}
                  />
                  Deliver to your address
                </label>
                <label className="quick-order-option-row">
                  <input
                    type="radio"
                    name="shipping-method"
                    value="pickup"
                    checked={shippingMethod === "pickup"}
                    onChange={(event) => setShippingMethod(event.target.value)}
                  />
                  Pick up at our Hayward office
                  <span className="quick-order-free-tip">Free</span>
                </label>
              </div>
            </div>

            <div
              className={`quick-order-control-group ${
                shippingMethod === "pickup" ? "is-disabled" : ""
              }`}
            >
              <label htmlFor="shipping-address">Delivery Address</label>
              <input
                id="shipping-address"
                type="text"
                value={shippingAddress}
                onChange={(event) => setShippingAddress(event.target.value)}
                placeholder="Street, City, State, ZIP"
                disabled={shippingMethod === "pickup"}
              />
            </div>

            <div className="quick-order-control-group">
              <label htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                type="text"
                value={contactName}
                onChange={(event) => setContactName(event.target.value)}
                placeholder="Your full name"
              />
            </div>

            <div className="quick-order-control-group">
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                type="email"
                value={contactEmail}
                onChange={(event) => setContactEmail(event.target.value)}
                placeholder="you@example.com"
              />
            </div>

            <div className="quick-order-control-group">
              <label htmlFor="contact-phone">Phone</label>
              <input
                id="contact-phone"
                type="tel"
                value={contactPhone}
                onChange={(event) => setContactPhone(event.target.value)}
                placeholder="(555) 555-5555"
              />
            </div>
          </div>

          <aside className="quick-order-estimate-card" aria-label="Price estimate">
            <h2>Price Estimate</h2>
            <p className="quick-order-tip">
              Estimate is for 1 item plus shipping. Final quote is confirmed after review.
            </p>
            <div className="quick-order-estimate-lines">
              <div className="quick-order-estimate-row">
                <span>Base shirt</span>
                <span>${baseUnitPrice.toFixed(2)}</span>
              </div>
              <div className="quick-order-estimate-row">
                <span>Color</span>
                <span>{selectedColor || "—"}</span>
              </div>
              <div className="quick-order-estimate-row">
                <span>Front print</span>
                <span>${frontPrintUnit.toFixed(2)}</span>
              </div>
              <div className="quick-order-estimate-row">
                <span>Back name</span>
                <span>${backNameUnit.toFixed(2)}</span>
              </div>
              <div className="quick-order-estimate-row">
                <span>Back title</span>
                <span>${backTitleUnit.toFixed(2)}</span>
              </div>
              <div className="quick-order-estimate-row">
                <span>Back design</span>
                <span>${backDesignUnit.toFixed(2)}</span>
              </div>
              <div className="quick-order-estimate-row">
                <span>Shipping</span>
                <span>${pickupOrDelivery.toFixed(2)}</span>
              </div>
              <div className="quick-order-estimate-total">
                <span>Estimated total</span>
                <span>${estimateTotal.toFixed(2)}</span>
              </div>
            </div>
          </aside>
        </section>
      )}

      {phase === "shipping-confirmation" && (
        <section className="quick-order-shipping-note-float">
          <p className="quick-order-shipping-note">
            Once you send the order, we will review your order. Expect to receive a breakdown and quote in your email from us within 48 hours.
          </p>
        </section>
      )}

      {phase === "shipping-confirmation" && (
        <section className="quick-order-next-step">
          <button
            type="button"
            className="quick-order-back"
            onClick={() => setPhase("back-design")}
          >
            Back to Back Design
          </button>
          <button
            type="button"
            className="quick-order-continue quick-order-send"
            onClick={handleSendQuickOrder}
          >
            {sendOrderStatus.state === "sending" ? "Sending..." : "Send Order"}
          </button>
          {sendOrderStatus.state === "error" && (
            <p className="quick-order-warning" role="alert">
              {sendOrderStatus.message}
            </p>
          )}
          {sendOrderStatus.state === "sent" && (
            <p className="quick-order-upload-name" role="status">
              {sendOrderStatus.message}
            </p>
          )}
        </section>
      )}
    </main>
  );
}

import { useState } from "react";
import { getScreenPrintQuotePerShirt } from "../utils/pricing";
import "./QuickOrder.css";

const API_BASE = import.meta.env.VITE_API_URL || "";

const OPTIONS = [
  {
    id: "badminton-team",
    title: "Badminton Team",
    description: "Build a team apparel order for schools, clubs, and leagues.",
    image: "/badminton-team-jersey.png",
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
    name: "A4 Performance Tee",
    image: "/a4-tees/a4-royal.jpg",
    description:
      "A top choice for many high school teams, this tee offers a unisex fit with performance features such as moisture wicking and sun protection.",
    price: "$7.50",
  },
  {
    id: "OTHER",
    name: "Other",
    image: "/blank-tee-front.png",
    description:
      "Request a shirt style of your choice and enter the model name and color manually.",
    price: "Custom quote",
  },
];

const A4_COLOR_SWATCHES = [
  {
    name: "White",
    hex: "#FFFFFF",
    pms: "White",
    image: "/a4-tees/a4-white.jpg",
  },
  {
    name: "Silver",
    hex: "#A2AAAD",
    pms: "429C",
    image: "/a4-tees/a4-silver.jpg",
  },
  {
    name: "Graphite",
    hex: "#53565A",
    pms: "7540C",
    image: "/a4-tees/a4-graphite.jpg",
  },
  {
    name: "Black",
    hex: "#2C2C2C",
    pms: "Black C",
    image: "/a4-tees/a4-black.jpg",
  },
  {
    name: "Light Blue",
    hex: "#ADD8E6",
    pms: "644C",
    image: "/a4-tees/a4-light-blue.jpg",
  },
  {
    name: "Pastel Blue",
    hex: "#B0C4DE",
    pms: "543C",
    image: "/a4-tees/a4-pastel-blue.jpg",
  },
  {
    name: "Electric Blue",
    hex: "#0072CE",
    pms: "2147C",
    image: "/a4-tees/a4-electric-blue.jpg",
  },
  {
    name: "Royal",
    hex: "#0047AB",
    pms: "7687C",
    image: "/a4-tees/a4-royal.jpg",
  },
  { name: "Navy", hex: "#000080", pms: "533C", image: "/a4-tees/a4-navy.jpg" },
  {
    name: "Pastel Mint",
    hex: "#B2E2E2",
    pms: "344C",
    image: "/a4-tees/a4-pastel-mint.jpg",
  },
  { name: "Teal", hex: "#008080", pms: "322C", image: "/a4-tees/a4-teal.jpg" },
  { name: "Lime", hex: "#32CD32", pms: "375C", image: "/a4-tees/a4-lime.jpg" },
  {
    name: "Kelly",
    hex: "#009A44",
    pms: "341C",
    image: "/a4-tees/a4-kelly.jpg",
  },
  {
    name: "Forest",
    hex: "#013220",
    pms: "5535C",
    image: "/a4-tees/a4-forest.jpg",
  },
  {
    name: "Military Green",
    hex: "#4B5320",
    pms: "7771C",
    image: "/a4-tees/a4-military-green.jpg",
  },
  {
    name: "Olive",
    hex: "#808000",
    pms: "5743C",
    image: "/a4-tees/a4-olive.jpg",
  },
  { name: "Pink", hex: "#FFC0CB", pms: "189C", image: "/a4-tees/a4-pink.jpg" },
  {
    name: "Coral",
    hex: "#FF7F50",
    pms: "171C",
    image: "/a4-tees/a4-coral.jpg",
  },
  {
    name: "Scarlet",
    hex: "#CE1126",
    pms: "200C",
    image: "/a4-tees/a4-scarlet.jpg",
  },
  {
    name: "Cardinal",
    hex: "#C41E3A",
    pms: "7421C",
    image: "/a4-tees/a4-cardinal.jpg",
  },
  {
    name: "Maroon",
    hex: "#500000",
    pms: "504C",
    image: "/a4-tees/a4-maroon.jpg",
  },
  {
    name: "Fuchsia",
    hex: "#FF00FF",
    pms: "219C",
    image: "/a4-tees/a4-fuchsia.jpg",
  },
  {
    name: "Purple",
    hex: "#4B0082",
    pms: "7672C",
    image: "/a4-tees/a4-purple.jpg",
  },
  {
    name: "Athletic Orange",
    hex: "#FF6600",
    pms: "172C",
    image: "/a4-tees/a4-athletic-orange.jpg",
  },
  {
    name: "Safety Orange",
    hex: "#FF671F",
    pms: "021C",
    image: "/a4-tees/a4-safety-orange.jpg",
  },
  { name: "Sand", hex: "#C2B280", pms: "453C", image: "/a4-tees/a4-sand.jpg" },
  {
    name: "Vegas Gold",
    hex: "#C5B358",
    pms: "4525C",
    image: "/a4-tees/a4-vegas-gold.jpg",
  },
  { name: "Gold", hex: "#FFD700", pms: "1235C", image: "/a4-tees/a4-gold.jpg" },
  {
    name: "Light Yellow",
    hex: "#FFFFE0",
    pms: "120C",
    image: "/a4-tees/a4-light-yellow.jpg",
  },
  {
    name: "Safety Yellow",
    hex: "#E1E000",
    pms: "809C",
    image: "/a4-tees/a4-safety-yellow.jpg",
  },
];

export default function QuickOrder() {
  const [phase, setPhase] = useState("order-type");
  const [selectedOrderType, setSelectedOrderType] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [shirtModelAlert, setShirtModelAlert] = useState("");
  const [shirtModelFieldAlerts, setShirtModelFieldAlerts] = useState({
    modelName: "",
    color: "",
  });
  const [otherModelName, setOtherModelName] = useState("");
  const [otherModelColor, setOtherModelColor] = useState("");
  const [frontPlacement, setFrontPlacement] = useState("none");
  const [frontDesignColors, setFrontDesignColors] = useState(0);
  const [frontDesignColorsOverflow, setFrontDesignColorsOverflow] =
    useState(false);
  const [frontDesignFile, setFrontDesignFile] = useState(null);
  const [frontDesignFileName, setFrontDesignFileName] = useState("");
  const [frontPhaseAlert, setFrontPhaseAlert] = useState("");
  const [frontFieldAlerts, setFrontFieldAlerts] = useState({
    upload: "",
    colors: "",
  });
  const [backSpreadsheetFile, setBackSpreadsheetFile] = useState(null);
  const [backSpreadsheetFileName, setBackSpreadsheetFileName] = useState("");
  const [backTotalQuantity, setBackTotalQuantity] = useState("");
  const [backDesignFile, setBackDesignFile] = useState(null);
  const [backDesignFileName, setBackDesignFileName] = useState("");
  const [backDesignColors, setBackDesignColors] = useState(0);
  const [backDesignColorsOverflow, setBackDesignColorsOverflow] =
    useState(false);
  const [backOrganizationName, setBackOrganizationName] = useState("");
  const [backPhaseAlert, setBackPhaseAlert] = useState("");
  const [backFieldAlerts, setBackFieldAlerts] = useState({
    spreadsheet: "",
    quantity: "",
    organization: "",
    upload: "",
    colors: "",
  });
  const [shippingMethod, setShippingMethod] = useState("delivery");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingFieldAlerts, setShippingFieldAlerts] = useState({
    deliveryAddress: "",
    contactName: "",
    contactEmail: "",
  });
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [sendOrderStatus, setSendOrderStatus] = useState({
    state: "idle",
    message: "",
  });
  const [backFeatures, setBackFeatures] = useState({
    name: false,
    title: false,
    organization: false,
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
      setShirtModelFieldAlerts({ modelName: "", color: "" });
      setOtherModelName("");
      setOtherModelColor("");
      return;
    }
    setSelectedModel(modelId);
    setSelectedColor("");
    setShirtModelAlert("");
    setShirtModelFieldAlerts({ modelName: "", color: "" });
    setOtherModelName("");
    setOtherModelColor("");
    setFrontPlacement("none");
    setFrontDesignColors(0);
    setFrontDesignColorsOverflow(false);
    setFrontDesignFile(null);
    setFrontDesignFileName("");
    setFrontPhaseAlert("");
    setFrontFieldAlerts({ upload: "", colors: "" });
    setBackSpreadsheetFile(null);
    setBackSpreadsheetFileName("");
    setBackTotalQuantity("");
    setBackDesignFile(null);
    setBackDesignFileName("");
    setBackDesignColors(0);
    setBackDesignColorsOverflow(false);
    setBackOrganizationName("");
    setBackPhaseAlert("");
    setBackFieldAlerts({
      spreadsheet: "",
      quantity: "",
      organization: "",
      upload: "",
      colors: "",
    });
    setBackFeatures({
      name: false,
      title: false,
      organization: false,
      backDesign: false,
    });
  };

  const handleFrontPlacementChange = (value) => {
    setFrontPlacement(value);
    setFrontPhaseAlert("");
    setFrontFieldAlerts({ upload: "", colors: "" });
    if (value === "none") {
      setFrontDesignColors(0);
      setFrontDesignColorsOverflow(false);
      return;
    }
    setFrontDesignColors("");
    setFrontDesignColorsOverflow(false);
  };

  const handleFrontDesignUpload = (event) => {
    const file = event.target.files?.[0];
    setFrontDesignFile(file || null);
    setFrontDesignFileName(file ? file.name : "");
    setFrontPhaseAlert("");
    setFrontFieldAlerts((current) => ({
      ...current,
      upload: "",
    }));
  };

  const handleContinueToBackDesign = () => {
    const needsUpload =
      frontPlacement === "full-front" || frontPlacement === "left-chest";
    const nextFieldAlerts = {
      upload:
        needsUpload && !frontDesignFileName
          ? "Upload a front design before continuing."
          : "",
      colors:
        needsUpload && !frontDesignColorsOverflow && !frontDesignColors
          ? "Enter the number of design colors or select 5+."
          : "",
    };

    setFrontFieldAlerts(nextFieldAlerts);

    if (nextFieldAlerts.upload || nextFieldAlerts.colors) {
      setFrontPhaseAlert(
        "Complete the highlighted front design fields before continuing.",
      );
      return;
    }

    setFrontPhaseAlert("");
    setFrontFieldAlerts({ upload: "", colors: "" });
    setPhase("back-design");
  };

  const handleBackFeatureToggle = (feature) => {
    setBackFeatures((current) => {
      const nextValue = !current[feature];
      if (feature === "backDesign") {
        if (nextValue) {
          setBackDesignColors("");
          setBackDesignColorsOverflow(false);
          setBackPhaseAlert("");
          setBackFieldAlerts({
            spreadsheet: "",
            quantity: "",
            organization: "",
            upload: "",
            colors: "",
          });
        } else {
          setBackDesignFile(null);
          setBackDesignColors(0);
          setBackDesignColorsOverflow(false);
          setBackDesignFileName("");
          setBackPhaseAlert("");
          setBackFieldAlerts({
            spreadsheet: "",
            quantity: "",
            organization: "",
            upload: "",
            colors: "",
          });
        }
      }
      if (feature === "organization") {
        setBackPhaseAlert("");
        setBackFieldAlerts((alerts) => ({
          ...alerts,
          organization: "",
        }));
        if (!nextValue) {
          setBackOrganizationName("");
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
    setBackPhaseAlert("");
    setBackFieldAlerts((current) => ({
      ...current,
      spreadsheet: "",
      quantity: "",
    }));
  };

  const handleBackDesignUpload = (event) => {
    const file = event.target.files?.[0];
    setBackDesignFile(file || null);
    setBackDesignFileName(file ? file.name : "");
    setBackPhaseAlert("");
    setBackFieldAlerts((current) => ({
      ...current,
      upload: "",
    }));
  };

  const handleContinueToShipping = () => {
    if (!backFeatures.backDesign) {
      setBackPhaseAlert("");
    }

    const nextFieldAlerts = {
      spreadsheet: !backSpreadsheetFileName
        ? "Upload the sizing spreadsheet before continuing."
        : "",
      quantity:
        !backTotalQuantity || Number(backTotalQuantity) < 1
          ? "Enter the total quantity of shirts to be ordered."
          : "",
      organization:
        backFeatures.organization && !backOrganizationName.trim()
          ? "Enter the school, team, or organization name."
          : "",
      upload:
        backFeatures.backDesign && !backDesignFileName
          ? "Upload a back design before continuing."
          : "",
      colors:
        backFeatures.backDesign &&
        !backDesignColorsOverflow &&
        !backDesignColors
          ? "Enter the number of design colors or select 5+."
          : "",
    };

    setBackFieldAlerts(nextFieldAlerts);

    if (
      nextFieldAlerts.spreadsheet ||
      nextFieldAlerts.quantity ||
      nextFieldAlerts.organization ||
      nextFieldAlerts.upload ||
      nextFieldAlerts.colors
    ) {
      setBackPhaseAlert(
        "Complete the highlighted back design fields before continuing.",
      );
      return;
    }

    setBackPhaseAlert("");
    setBackFieldAlerts({
      spreadsheet: "",
      quantity: "",
      organization: "",
      upload: "",
      colors: "",
    });
    setPhase("shipping-confirmation");
  };

  const selectedModelDetails = SHIRT_MODELS.find(
    (model) => model.id === selectedModel,
  );
  const selectedA4Color = A4_COLOR_SWATCHES.find(
    (swatch) => swatch.name === selectedColor,
  );
  const showOtherModelFields = selectedModel === "OTHER";
  const selectedModelName = showOtherModelFields
    ? otherModelName.trim()
    : selectedModelDetails?.name || "";
  const selectedShirtColor = showOtherModelFields
    ? otherModelColor.trim()
    : selectedColor;
  const getModelImage = (model) => {
    if (model.id === "A4N3142" && selectedA4Color?.image) {
      return selectedA4Color.image;
    }
    return model.image;
  };
  const showColorPanel = phase === "shirt-model" && Boolean(selectedModel);
  const showA4Colors = selectedModel === "A4N3142";
  const canContinueToFrontDesign = showA4Colors
    ? Boolean(selectedColor)
    : showOtherModelFields &&
      Boolean(otherModelName.trim()) &&
      Boolean(otherModelColor.trim());
  const showFullFront = frontPlacement === "full-front";
  const showLeftChest = frontPlacement === "left-chest";
  const frontDesignRequiresArtwork =
    frontPlacement === "full-front" || frontPlacement === "left-chest";
  const canContinueToBackDesign =
    !frontDesignRequiresArtwork ||
    (Boolean(frontDesignFileName) &&
      (frontDesignColorsOverflow || Boolean(frontDesignColors)));
  const activeBackTextFeatures = [
    backFeatures.name ? "name" : null,
    backFeatures.organization ? "organization" : null,
    backFeatures.title ? "title" : null,
  ].filter(Boolean);
  const getBackTextHighlightTop = (feature) => {
    if (activeBackTextFeatures.length === 1) return "21%";
    if (activeBackTextFeatures.length === 2) {
      if (
        backFeatures.title &&
        backFeatures.name &&
        !backFeatures.organization
      ) {
        if (feature === "title") return "17%";
        if (feature === "name") return "25%";
      }
      if (
        backFeatures.title &&
        !backFeatures.name &&
        backFeatures.organization
      ) {
        if (feature === "title") return "17%";
        if (feature === "organization") return "25%";
      }
      const index = activeBackTextFeatures.indexOf(feature);
      return index === 0 ? "17%" : "25%";
    }
    if (activeBackTextFeatures.length === 3) {
      if (feature === "name") return "17%";
      if (feature === "organization") return "25%";
      if (feature === "title") return "70%";
    }
    return undefined;
  };
  const spreadsheetFields = ["Style", "Size"];
  if (backFeatures.name) spreadsheetFields.push("Name");
  if (backFeatures.title) spreadsheetFields.push("Title");
  const spreadsheetLabel = `Upload ${spreadsheetFields.join("/")} Spreadsheet`;
  const canContinueToShipping =
    Boolean(backSpreadsheetFileName) &&
    Boolean(backTotalQuantity) &&
    Number(backTotalQuantity) > 0 &&
    (!backFeatures.organization || Boolean(backOrganizationName.trim())) &&
    (!backFeatures.backDesign ||
      (Boolean(backDesignFileName) &&
        (backDesignColorsOverflow || Boolean(backDesignColors))));
  const canSendOrder =
    Boolean(contactName.trim()) &&
    Boolean(contactEmail.trim()) &&
    (shippingMethod !== "delivery" || Boolean(shippingAddress.trim()));

  const parsePrice = (value) => {
    if (!value) return 0;
    const num = Number(String(value).replace(/[^0-9.]/g, ""));
    return Number.isFinite(num) ? num : 0;
  };

  const effectiveFrontColorCount = frontDesignColorsOverflow
    ? "5+"
    : frontDesignColors;
  const effectiveBackColorCount = backDesignColorsOverflow
    ? "5+"
    : backDesignColors;
  const selectedModelPrice = selectedModelDetails?.price || "";
  const isCustomModelQuote = selectedModelPrice === "Custom quote";
  const estimatePayload = {
    model: selectedModelName,
    frontPlacement,
    frontColorCount: frontPlacement === "none" ? 0 : effectiveFrontColorCount,
    backDesign: Boolean(backFeatures.backDesign),
    backColorCount: backFeatures.backDesign ? effectiveBackColorCount : 0,
    totalQuantity: Number(backTotalQuantity) || 0,
  };
  const estimatedFrontColors =
    estimatePayload.frontPlacement === "none"
      ? 0
      : Number.isInteger(Number(estimatePayload.frontColorCount)) &&
          Number(estimatePayload.frontColorCount) >= 1 &&
          Number(estimatePayload.frontColorCount) <= 4
        ? Number(estimatePayload.frontColorCount)
        : 0;
  const estimatedBackColors =
    estimatePayload.backDesign &&
    Number.isInteger(Number(estimatePayload.backColorCount)) &&
    Number(estimatePayload.backColorCount) >= 1 &&
    Number(estimatePayload.backColorCount) <= 4
      ? Number(estimatePayload.backColorCount)
      : 0;
  const estimatedQuantity = estimatePayload.totalQuantity;
  const shirtPricePerShirt = parsePrice(selectedModelPrice);
  const screenPrintPerShirt =
    estimatedQuantity > 0
      ? getScreenPrintQuotePerShirt(
          0,
          estimatedQuantity,
          estimatedFrontColors,
          estimatedBackColors,
        )
      : 0;
  const directToFilmPerShirt = 0;
  const namesPerShirt = backFeatures.name ? 6.5 : 0;
  const organizationPerShirt = 0;
  const perShirtTotal =
    shirtPricePerShirt +
    screenPrintPerShirt +
    directToFilmPerShirt +
    namesPerShirt +
    organizationPerShirt;
  const orderSubtotal = perShirtTotal * estimatedQuantity;
  const shippingFee = shippingMethod === "delivery" ? 12 : 0;
  const estimateTotal = orderSubtotal + shippingFee;

  const fileToDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSendQuickOrder = async () => {
    if (sendOrderStatus.state === "sending") return;

    const nextShippingAlerts = {
      deliveryAddress:
        shippingMethod === "delivery" && !shippingAddress.trim()
          ? "Enter the delivery address before sending the order."
          : "",
      contactName: !contactName.trim()
        ? "Enter the contact name before sending the order."
        : "",
      contactEmail: !contactEmail.trim()
        ? "Enter the email address before sending the order."
        : "",
    };

    setShippingFieldAlerts(nextShippingAlerts);

    if (
      nextShippingAlerts.deliveryAddress ||
      nextShippingAlerts.contactName ||
      nextShippingAlerts.contactEmail
    ) {
      setSendOrderStatus({
        state: "error",
        message:
          "Complete the highlighted shipping and contact fields before sending.",
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
        model: selectedModelName,
        color: selectedShirtColor,
        frontPlacement,
        frontColorCount:
          frontPlacement === "none" ? 0 : effectiveFrontColorCount,
        backTitle: Boolean(backFeatures.title),
        backName: Boolean(backFeatures.name),
        totalQuantity: Number(backTotalQuantity) || 0,
        backOrganization: Boolean(backFeatures.organization),
        backOrganizationName: backFeatures.organization
          ? backOrganizationName.trim()
          : "",
        backDesign: Boolean(backFeatures.backDesign),
        backColorCount: backFeatures.backDesign ? effectiveBackColorCount : 0,
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
      setSendOrderStatus({
        state: "sent",
        message: "Order sent. We'll email you within 48 hours.",
      });
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
              ? "Pick a Model"
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
              <p className="quick-order-panel-description">
                {option.description}
              </p>
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
                    src={getModelImage(model)}
                    alt={model.name}
                    loading="lazy"
                  />
                </div>
                <div className="quick-order-model-copy">
                  <h2>{model.name}</h2>
                  <p>{model.description}</p>
                  <p className="quick-order-model-price">{model.price}</p>
                </div>
              </article>
            ))}
          </div>
          <div
            className={`quick-order-color-panel ${showColorPanel ? "is-visible" : ""}`}
            aria-live="polite"
          >
            <div className="quick-order-color-panel-header">
              <h2>
                {showOtherModelFields
                  ? "Enter Shirt Details"
                  : "Choose Shirt Color"}
              </h2>
              <p>
                {showOtherModelFields
                  ? "Tell us which shirt model and color you want quoted."
                  : selectedModelDetails
                    ? `Colors available for ${selectedModelDetails.name}.`
                    : "Select a model to view available colors."}
              </p>
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
            ) : showOtherModelFields ? (
              <div className="quick-order-color-form">
                <div
                  className={`quick-order-control-group ${
                    shirtModelFieldAlerts.modelName ? "has-alert" : ""
                  }`}
                >
                  <label htmlFor="other-model-name">Model Name</label>
                  <input
                    id="other-model-name"
                    type="text"
                    value={otherModelName}
                    placeholder="Example: Bella + Canvas 3001"
                    onChange={(event) => {
                      setOtherModelName(event.target.value);
                      setShirtModelAlert("");
                      setShirtModelFieldAlerts((current) => ({
                        ...current,
                        modelName: "",
                      }));
                    }}
                  />
                  {shirtModelFieldAlerts.modelName && (
                    <p className="quick-order-field-alert" role="alert">
                      {shirtModelFieldAlerts.modelName}
                    </p>
                  )}
                </div>

                <div
                  className={`quick-order-control-group ${
                    shirtModelFieldAlerts.color ? "has-alert" : ""
                  }`}
                >
                  <label htmlFor="other-model-color">Color</label>
                  <input
                    id="other-model-color"
                    type="text"
                    value={otherModelColor}
                    placeholder="Example: Heather Navy"
                    onChange={(event) => {
                      setOtherModelColor(event.target.value);
                      setShirtModelAlert("");
                      setShirtModelFieldAlerts((current) => ({
                        ...current,
                        color: "",
                      }));
                    }}
                  />
                  {shirtModelFieldAlerts.color && (
                    <p className="quick-order-field-alert" role="alert">
                      {shirtModelFieldAlerts.color}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="quick-order-color-empty">
                <p>
                  Select the A4 Cooling Performance Short Sleeve Tee to see
                  color swatches.
                </p>
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
                setShirtModelFieldAlerts({ modelName: "", color: "" });
                setOtherModelName("");
                setOtherModelColor("");
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
              if (showOtherModelFields) {
                const nextFieldAlerts = {
                  modelName: otherModelName.trim()
                    ? ""
                    : "Enter the shirt model name before continuing.",
                  color: otherModelColor.trim()
                    ? ""
                    : "Enter the shirt color before continuing.",
                };
                setShirtModelFieldAlerts(nextFieldAlerts);
                if (nextFieldAlerts.modelName || nextFieldAlerts.color) {
                  setShirtModelAlert(
                    "Complete the highlighted shirt details before continuing.",
                  );
                  return;
                }
                setShirtModelFieldAlerts({ modelName: "", color: "" });
                setShirtModelAlert("");
                setPhase("front-design");
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
              setShirtModelFieldAlerts({ modelName: "", color: "" });
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

      {phase === "front-design" && selectedModelName && (
        <section
          className="quick-order-front-design"
          aria-label="Front design setup"
        >
          <div className="quick-order-blueprint-panel">
            <div className="quick-order-blueprint-visual">
              <img
                className="quick-order-blueprint-image"
                src="/blank-tee-front.png"
                alt={`blank template for ${selectedModelName} front view`}
              />
              {showFullFront && (
                <div className="placement-highlight full-front" />
              )}
              {showLeftChest && (
                <div className="placement-highlight left-chest" />
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
                  onChange={(event) =>
                    handleFrontPlacementChange(event.target.value)
                  }
                />
                Full Front
              </label>
              <label className="quick-order-option-row">
                <input
                  type="radio"
                  name="front-placement"
                  value="left-chest"
                  checked={frontPlacement === "left-chest"}
                  onChange={(event) =>
                    handleFrontPlacementChange(event.target.value)
                  }
                />
                Left Chest
              </label>
              <label className="quick-order-option-row">
                <input
                  type="radio"
                  name="front-placement"
                  value="none"
                  checked={frontPlacement === "none"}
                  onChange={(event) =>
                    handleFrontPlacementChange(event.target.value)
                  }
                />
                None
              </label>
            </div>

            <div
              className={`quick-order-control-group ${frontPlacement === "none" ? "is-disabled" : ""} ${
                frontFieldAlerts.upload ? "has-alert" : ""
              }`}
            >
              <label htmlFor="front-design-upload">Upload Front Design</label>
              <input
                id="front-design-upload"
                className="sr-only"
                type="file"
                accept=".png, .jpg, .jpeg, .pdf, .ai, .svg"
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
                <p className="quick-order-upload-name">
                  Uploaded: {frontDesignFileName}
                </p>
              )}
              {frontFieldAlerts.upload && (
                <p className="quick-order-field-alert" role="alert">
                  {frontFieldAlerts.upload}
                </p>
              )}
              <p className="quick-order-tip">
                Tip: Use vector art when possible, or at least a 300 DPI raster
                file for best print quality.
              </p>
            </div>

            <div
              className={`quick-order-control-group ${frontPlacement === "none" ? "is-disabled" : ""} ${
                frontFieldAlerts.colors ? "has-alert" : ""
              }`}
            >
              <div className="quick-order-label-with-tooltip">
                <label htmlFor="front-design-colors">
                  Number of Design Colors
                </label>
                <span className="quick-order-tooltip-wrap">
                  <button
                    type="button"
                    className="quick-order-tooltip-trigger"
                    aria-label="About design color count"
                  >
                    ?
                  </button>
                  <span className="quick-order-tooltip-bubble" role="tooltip">
                    Count each distinct ink color in the artwork. Each
                    additional color up to 4 colors raises the price. At 5+
                    colors, price will not be determined by number of colors,
                    but by the size of the art.
                  </span>
                </span>
              </div>
              <div className="quick-order-color-count-row">
                <input
                  id="front-design-colors"
                  type="number"
                  min={frontPlacement === "none" ? "0" : "1"}
                  max="4"
                  step="1"
                  value={frontDesignColors}
                  placeholder="1"
                  disabled={
                    frontPlacement === "none" || frontDesignColorsOverflow
                  }
                  onChange={(event) => {
                    setFrontFieldAlerts((current) => ({
                      ...current,
                      colors: "",
                    }));
                    if (event.target.value === "") {
                      setFrontDesignColors("");
                      return;
                    }
                    const value = Number(event.target.value);
                    if (Number.isNaN(value)) return;
                    setFrontDesignColors(Math.min(4, Math.max(1, value)));
                  }}
                />
                <label
                  className={`quick-order-inline-toggle ${
                    frontPlacement === "none" ? "is-disabled" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={frontDesignColorsOverflow}
                    disabled={frontPlacement === "none"}
                    onChange={(event) => {
                      const isChecked = event.target.checked;
                      setFrontDesignColorsOverflow(isChecked);
                      setFrontFieldAlerts((current) => ({
                        ...current,
                        colors: "",
                      }));
                      if (isChecked) {
                        return;
                      }
                      if (frontPlacement === "none") {
                        setFrontDesignColors(0);
                      } else {
                        setFrontDesignColors("");
                      }
                    }}
                  />
                  <span>5+</span>
                </label>
              </div>
              {frontFieldAlerts.colors && (
                <p className="quick-order-field-alert" role="alert">
                  {frontFieldAlerts.colors}
                </p>
              )}
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
            className={`quick-order-continue ${
              canContinueToBackDesign ? "" : "is-disabled"
            }`}
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
                <div
                  className="placement-highlight back-title"
                  style={{ top: getBackTextHighlightTop("title") }}
                >
                  <span className="placement-highlight-label">Title</span>
                </div>
              )}
              {backFeatures.name && (
                <div
                  className="placement-highlight back-name"
                  style={{ top: getBackTextHighlightTop("name") }}
                >
                  <span className="placement-highlight-label">Name</span>
                </div>
              )}
              {backFeatures.organization && (
                <div
                  className="placement-highlight back-organization"
                  style={{ top: getBackTextHighlightTop("organization") }}
                >
                  <span className="placement-highlight-label">
                    School/Team/Organization
                  </span>
                </div>
              )}
              {backFeatures.backDesign && (
                <div className="placement-highlight back-design">
                  <span className="placement-highlight-label">Back Design</span>
                </div>
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
                  checked={backFeatures.organization}
                  onChange={() => handleBackFeatureToggle("organization")}
                />
                School/Team/Organization
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

            <div className="quick-order-upload-row">
              <div
                className={`quick-order-control-group quick-order-inline-group ${
                  backFieldAlerts.spreadsheet ? "has-alert" : ""
                }`}
              >
                <label htmlFor="back-roster-upload">{spreadsheetLabel}</label>
                <input
                  id="back-roster-upload"
                  className="sr-only"
                  type="file"
                  onChange={handleBackSpreadsheetUpload}
                />
                <label
                  htmlFor="back-roster-upload"
                  className="quick-order-upload-button"
                >
                  Upload Spreadsheet
                </label>
                {backSpreadsheetFileName && (
                  <p className="quick-order-upload-name">
                    Uploaded: {backSpreadsheetFileName}
                  </p>
                )}
                {backFieldAlerts.spreadsheet && (
                  <p className="quick-order-field-alert" role="alert">
                    {backFieldAlerts.spreadsheet}
                  </p>
                )}
              </div>
              <div
                className={`quick-order-control-group quick-order-inline-input ${
                  backFieldAlerts.quantity ? "has-alert" : ""
                }`}
              >
                <label htmlFor="back-total-quantity">
                  Total Shirt Quantity
                </label>
                <input
                  id="back-total-quantity"
                  type="number"
                  min="1"
                  step="1"
                  inputMode="numeric"
                  value={backTotalQuantity}
                  placeholder="0"
                  onChange={(event) => {
                    const nextValue = event.target.value;
                    if (nextValue === "") {
                      setBackTotalQuantity("");
                    } else {
                      const parsedValue = Number(nextValue);
                      if (Number.isNaN(parsedValue)) return;
                      setBackTotalQuantity(
                        String(Math.max(1, Math.floor(parsedValue))),
                      );
                    }
                    setBackPhaseAlert("");
                    setBackFieldAlerts((current) => ({
                      ...current,
                      quantity: "",
                    }));
                  }}
                />
                {backFieldAlerts.quantity && (
                  <p className="quick-order-field-alert" role="alert">
                    {backFieldAlerts.quantity}
                  </p>
                )}
              </div>
            </div>

            <div className="quick-order-control-group">
              <p className="quick-order-table-label">
                Example Spreadsheet Format
              </p>
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
                  Tip: Names and titles are printed exactly as entered in your
                  spreadsheet, including capitalization, punctuation, and
                  spacing.
                </p>
              )}
            </div>

            <div
              className={`quick-order-control-group ${
                backFeatures.organization ? "" : "is-disabled"
              } ${backFieldAlerts.organization ? "has-alert" : ""}`}
            >
              <label htmlFor="back-organization-name">
                School/Team/Organization
              </label>
              <input
                id="back-organization-name"
                type="text"
                value={backOrganizationName}
                placeholder="Enter school, team, or organization name"
                disabled={!backFeatures.organization}
                onChange={(event) => {
                  setBackOrganizationName(event.target.value);
                  setBackPhaseAlert("");
                  setBackFieldAlerts((current) => ({
                    ...current,
                    organization: "",
                  }));
                }}
              />
              {backFieldAlerts.organization && (
                <p className="quick-order-field-alert" role="alert">
                  {backFieldAlerts.organization}
                </p>
              )}
            </div>

            <div
              className={`quick-order-control-group ${backFeatures.backDesign ? "" : "is-disabled"} ${
                backFieldAlerts.upload ? "has-alert" : ""
              }`}
            >
              <label htmlFor="back-design-upload">Upload Back Design</label>
              <input
                id="back-design-upload"
                className="sr-only"
                type="file"
                accept=".png, .jpg, .jpeg, .pdf, .ai, .svg"
                disabled={!backFeatures.backDesign}
                onChange={handleBackDesignUpload}
              />
              <label
                htmlFor="back-design-upload"
                className="quick-order-upload-button"
              >
                Upload Back Design
              </label>
              {backDesignFileName && (
                <p className="quick-order-upload-name">
                  Uploaded: {backDesignFileName}
                </p>
              )}
              {backFieldAlerts.upload && (
                <p className="quick-order-field-alert" role="alert">
                  {backFieldAlerts.upload}
                </p>
              )}
              <p className="quick-order-tip">
                Tip: Use vector art when possible, or at least a 300 DPI raster
                file for best print quality.
              </p>
            </div>

            <div
              className={`quick-order-control-group ${backFeatures.backDesign ? "" : "is-disabled"} ${
                backFieldAlerts.colors ? "has-alert" : ""
              }`}
            >
              <div className="quick-order-label-with-tooltip">
                <label htmlFor="back-design-colors">
                  Number of Design Colors
                </label>
                <span className="quick-order-tooltip-wrap">
                  <button
                    type="button"
                    className="quick-order-tooltip-trigger"
                    aria-label="About back design color count"
                  >
                    ?
                  </button>
                  <span className="quick-order-tooltip-bubble" role="tooltip">
                    Count each distinct ink color in the artwork. Each
                    additional color up to 4 colors raises the price. At 5+
                    colors, price will not be determined by number of colors,
                    but by the size of the art.
                  </span>
                </span>
              </div>
              <div className="quick-order-color-count-row">
                <input
                  id="back-design-colors"
                  type="number"
                  min={backFeatures.backDesign ? "1" : "0"}
                  max="4"
                  step="1"
                  value={backDesignColors}
                  disabled={
                    !backFeatures.backDesign || backDesignColorsOverflow
                  }
                  onChange={(event) => {
                    setBackPhaseAlert("");
                    setBackFieldAlerts((current) => ({
                      ...current,
                      colors: "",
                    }));
                    if (event.target.value === "") {
                      setBackDesignColors("");
                      return;
                    }
                    const value = Number(event.target.value);
                    if (Number.isNaN(value)) return;
                    setBackDesignColors(Math.min(4, Math.max(1, value)));
                  }}
                />
                <label
                  className={`quick-order-inline-toggle ${
                    backFeatures.backDesign ? "" : "is-disabled"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={backDesignColorsOverflow}
                    disabled={!backFeatures.backDesign}
                    onChange={(event) => {
                      const isChecked = event.target.checked;
                      setBackDesignColorsOverflow(isChecked);
                      setBackPhaseAlert("");
                      setBackFieldAlerts((current) => ({
                        ...current,
                        colors: "",
                      }));
                      if (isChecked) {
                        return;
                      }
                      if (backFeatures.backDesign) {
                        setBackDesignColors("");
                      } else {
                        setBackDesignColors(0);
                      }
                    }}
                  />
                  <span>5+</span>
                </label>
              </div>
              {backFieldAlerts.colors && (
                <p className="quick-order-field-alert" role="alert">
                  {backFieldAlerts.colors}
                </p>
              )}
              <p className="quick-order-tip">
                Tip: For best price and results, keep most designs at 1-2
                colors.
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
            className={`quick-order-continue ${
              canContinueToShipping ? "" : "is-disabled"
            }`}
            onClick={handleContinueToShipping}
          >
            Continue to Shipping & Order Confirmation
          </button>
          {backPhaseAlert && (
            <p className="quick-order-warning" role="alert">
              {backPhaseAlert}
            </p>
          )}
        </section>
      )}

      {phase === "shipping-confirmation" && (
        <section
          className="quick-order-shipping-layout"
          aria-label="Shipping and confirmation"
        >
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
                    onChange={(event) => {
                      setShippingMethod(event.target.value);
                      setSendOrderStatus({ state: "idle", message: "" });
                      setShippingFieldAlerts((current) => ({
                        ...current,
                        deliveryAddress: "",
                      }));
                    }}
                  />
                  Deliver to your address
                </label>
                <label className="quick-order-option-row">
                  <input
                    type="radio"
                    name="shipping-method"
                    value="pickup"
                    checked={shippingMethod === "pickup"}
                    onChange={(event) => {
                      setShippingMethod(event.target.value);
                      setSendOrderStatus({ state: "idle", message: "" });
                      setShippingFieldAlerts((current) => ({
                        ...current,
                        deliveryAddress: "",
                      }));
                    }}
                  />
                  Pick up at our Hayward office
                  <span className="quick-order-free-tip">Free</span>
                </label>
              </div>
            </div>

            <div
              className={`quick-order-control-group ${
                shippingMethod === "pickup" ? "is-disabled" : ""
              } ${shippingFieldAlerts.deliveryAddress ? "has-alert" : ""}`}
            >
              <label htmlFor="shipping-address">Delivery Address</label>
              <input
                id="shipping-address"
                type="text"
                value={shippingAddress}
                onChange={(event) => {
                  setShippingAddress(event.target.value);
                  setSendOrderStatus({ state: "idle", message: "" });
                  setShippingFieldAlerts((current) => ({
                    ...current,
                    deliveryAddress: "",
                  }));
                }}
                placeholder="Street, City, State, ZIP"
                disabled={shippingMethod === "pickup"}
              />
              {shippingFieldAlerts.deliveryAddress && (
                <p className="quick-order-field-alert" role="alert">
                  {shippingFieldAlerts.deliveryAddress}
                </p>
              )}
            </div>

            <div
              className={`quick-order-control-group ${
                shippingFieldAlerts.contactName ? "has-alert" : ""
              }`}
            >
              <label htmlFor="contact-name">Contact Name</label>
              <input
                id="contact-name"
                type="text"
                value={contactName}
                onChange={(event) => {
                  setContactName(event.target.value);
                  setSendOrderStatus({ state: "idle", message: "" });
                  setShippingFieldAlerts((current) => ({
                    ...current,
                    contactName: "",
                  }));
                }}
                placeholder="Your full name"
              />
              {shippingFieldAlerts.contactName && (
                <p className="quick-order-field-alert" role="alert">
                  {shippingFieldAlerts.contactName}
                </p>
              )}
            </div>

            <div
              className={`quick-order-control-group ${
                shippingFieldAlerts.contactEmail ? "has-alert" : ""
              }`}
            >
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                type="email"
                value={contactEmail}
                onChange={(event) => {
                  setContactEmail(event.target.value);
                  setSendOrderStatus({ state: "idle", message: "" });
                  setShippingFieldAlerts((current) => ({
                    ...current,
                    contactEmail: "",
                  }));
                }}
                placeholder="you@example.com"
              />
              {shippingFieldAlerts.contactEmail && (
                <p className="quick-order-field-alert" role="alert">
                  {shippingFieldAlerts.contactEmail}
                </p>
              )}
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

          <aside
            className="quick-order-estimate-card"
            aria-label="Price estimate"
          >
            <h2>Price Estimate</h2>
            <p className="quick-order-tip">
              Estimate uses the current screen print quote formula. Final quote
              is confirmed after review.
            </p>
            <div className="quick-order-estimate-lines">
              <p className="quick-order-estimate-section-title">Per Shirt</p>
              <div className="quick-order-estimate-row">
                <span>{selectedModelName || "Shirt model"}</span>
                <span>
                  {isCustomModelQuote
                    ? selectedModelPrice
                    : `$${shirtPricePerShirt.toFixed(2)}`}
                </span>
              </div>
              <div className="quick-order-estimate-row">
                <span>Screen print</span>
                <span>${screenPrintPerShirt.toFixed(2)}</span>
              </div>
              <div className="quick-order-estimate-row">
                <span>Direct to film</span>
                <span>${directToFilmPerShirt.toFixed(2)}</span>
              </div>
              <div className="quick-order-estimate-row">
                <span>Name</span>
                <span>${namesPerShirt.toFixed(2)}</span>
              </div>
              <div className="quick-order-estimate-row">
                <span>School/Org</span>
                <span>${organizationPerShirt.toFixed(2)}</span>
              </div>
              <div className="quick-order-estimate-total">
                <span>Per-shirt total</span>
                <span>
                  {isCustomModelQuote
                    ? "Custom quote"
                    : `$${perShirtTotal.toFixed(2)}`}
                </span>
              </div>
            </div>
            <div className="quick-order-estimate-lines">
              <p className="quick-order-estimate-section-title">Order Total</p>
              <div className="quick-order-estimate-row">
                <span>
                  {isCustomModelQuote
                    ? `${selectedModelName || "Per-shirt total"} x ${estimatedQuantity || 0}`
                    : `$${perShirtTotal.toFixed(2)} x ${estimatedQuantity || 0}`}
                </span>
                <span>
                  {isCustomModelQuote
                    ? "Custom quote"
                    : `$${orderSubtotal.toFixed(2)}`}
                </span>
              </div>
              {shippingMethod === "delivery" && (
                <div className="quick-order-estimate-row">
                  <span>Shipping</span>
                  <span>${shippingFee.toFixed(2)}</span>
                </div>
              )}
              <div className="quick-order-estimate-total">
                <span>Estimated total</span>
                <span>
                  {isCustomModelQuote
                    ? "Custom quote"
                    : `$${estimateTotal.toFixed(2)}`}
                </span>
              </div>
            </div>
          </aside>
        </section>
      )}

      {phase === "shipping-confirmation" && (
        <section className="quick-order-shipping-note-float">
          <p className="quick-order-shipping-note">
            Once you send the order, we will review your order. Expect to
            receive a breakdown and quote in your email from us within 48 hours.
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
            className={`quick-order-continue quick-order-send ${
              canSendOrder ? "" : "is-disabled"
            }`}
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

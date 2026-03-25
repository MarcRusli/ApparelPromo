import express from "express";

const router = express.Router();

const requiredEnv = (name) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing env var: ${name}`);
  }
  return value;
};

const dataUrlToBuffer = (dataUrl) => {
  if (!dataUrl) return null;
  const str = String(dataUrl);
  const match = str.match(/^data:([^;]+);base64,(.+)$/);
  if (match) {
    const contentType = match[1];
    const base64 = match[2];
    return { contentType, buffer: Buffer.from(base64, "base64") };
  }
  // Fallback: assume raw base64
  return {
    contentType: "application/octet-stream",
    buffer: Buffer.from(str, "base64"),
  };
};

router.post("/submit", async (req, res) => {
  try {
    const {
      orderType,
      contactName,
      contactEmail,
      contactPhone,
      model,
      color,
      frontPlacement,
      frontColorCount,
      backTitle,
      backName,
      backDesign,
      backColorCount,
      shippingMethod,
      deliveryAddress,
      attachments = {},
    } = req.body || {};

    if (!orderType || !contactName || !contactEmail) {
      return res.status(400).json({
        error: "Missing required fields: orderType, contactName, contactEmail",
      });
    }

    const resendApiKey = requiredEnv("RESEND_API_KEY");
    const resendFrom = requiredEnv("RESEND_FROM");

    const yesNo = (v) => (v ? "yes" : "no");

    const text = [
      `Model: ${model || ""}`,
      `Color: ${color || ""}`,
      "",
      `Front Placement: ${frontPlacement || ""}`,
      `Front Color Count: ${frontColorCount ?? ""}`,
      "",
      `Title: ${yesNo(backTitle)}`,
      `Name: ${yesNo(backName)}`,
      `Back Design: ${yesNo(backDesign)}`,
      `Back Color Count: ${backColorCount ?? ""}`,
      "",
      `Shipping: ${shippingMethod || ""}`,
      `Delivery Address: ${deliveryAddress || ""}`,
      "",
      `Contact Name: ${contactName || ""}`,
      `Email: ${contactEmail || ""}`,
      `Phone: ${contactPhone || ""}`,
      "",
    ].join("\n");

    const attachmentList = [];
    const addAttachment = (key, fallbackName) => {
      const entry = attachments?.[key];
      if (!entry?.dataUrl) return;
      const converted = dataUrlToBuffer(entry.dataUrl);
      if (!converted) return;
      attachmentList.push({
        filename: entry.fileName || fallbackName,
        content: converted.buffer.toString("base64"),
      });
    };

    addAttachment("frontDesign", "FrontDesign");
    addAttachment("backDesign", "BackDesign");
    addAttachment("styleSizeBreakdown", "StyleSizeBreakdown");

    const subject = `Quick Order: ${orderType} - ${contactName}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: resendFrom,
        to: ["orders@apparelpromo.com"],
        reply_to: contactEmail,
        subject,
        text,
        attachments: attachmentList.length ? attachmentList : undefined,
      }),
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));

    const resendBody = await resendRes.text().catch(() => "");
    if (!resendRes.ok) {
      throw new Error(
        `Resend error (${resendRes.status}): ${resendBody || "Request failed"}`,
      );
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Quick order submit error:", err);
    res.status(500).json({ error: err.message || "Failed to send email" });
  }
});

export default router;

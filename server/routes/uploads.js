import express from "express";
import { v2 as cloudinary } from "cloudinary";

const router = express.Router();

// Middleware to check admin token
const adminAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token === process.env.ADMIN_TOKEN) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

// Upload design file (base64 encoded)
router.post("/design", async (req, res) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });
    
    const { file, fileName, customerEmail } = req.body;

    if (!file || !customerEmail) {
      return res.status(400).json({ error: "Missing file or customerEmail" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file, {
      folder: `designs/${customerEmail}`,
      public_id: fileName || `design_${Date.now()}`,
      resource_type: "auto"
    });

    res.json({
      success: true,
      fileUrl: result.secure_url,
      publicId: result.public_id
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Delete design file (admin only)
router.delete("/:publicId", adminAuth, async (req, res) => {
  try {
    const publicId = req.params.publicId.replace(/___/g, "/"); // Handle encoded slashes
    
    await cloudinary.uploader.destroy(publicId, { resource_type: "auto" });
    
    res.json({ success: true, message: "File deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;

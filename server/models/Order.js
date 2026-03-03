import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerEmail: {
    type: String,
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  designFront: {
    fileUrl: String,
    publicId: String
  },
  designBack: {
    fileUrl: String,
    publicId: String
  },
  sizes: [
    {
      size: {
        type: String,
        enum: ["XS", "S", "M", "L", "XL", "2XL", "3XL"]
      },
      quantity: {
        type: Number,
        min: 1
      }
    }
  ],
  totalPrice: {
    type: Number,
    required: true
  },
  stripePaymentId: String,
  status: {
    type: String,
    enum: ["pending", "paid", "processing", "shipped", "cancelled"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Order", orderSchema);

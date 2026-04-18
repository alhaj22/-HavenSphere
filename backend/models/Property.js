import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    beds: { type: Number, default: 1 },
    baths: { type: Number, default: 1 },
    area: { type: String, default: "N/A" },
    image: { type: String, default: "/images/property1.png" },
    images: [{ type: String }],
    badge: { type: String, default: "New" },
    type: {
      type: String,
      enum: ["Apartment", "Villa", "Townhouse", "Penthouse", "House", "Commercial", "Land"],
      default: "Apartment",
    },
    amenities: [{ type: String }],
    status: {
      type: String,
      enum: ["available", "sold", "rented"],
      default: "available",
    },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Text index for search
propertySchema.index({ title: "text", description: "text", location: "text" });

const Property = mongoose.model("Property", propertySchema);
export default Property;

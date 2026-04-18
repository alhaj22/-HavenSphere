/**
 * Database seed script.
 * Creates an admin user and sample properties.
 *
 * Usage: node seed.js
 */

import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./models/User.js";
import Property from "./models/Property.js";

dotenv.config();

const ADMIN = {
  name: "Admin User",
  email: "admin@havensphere.com",
  password: "admin123456",
  role: "admin",
};

const SAMPLE_USER = {
  name: "John Doe",
  email: "john@example.com",
  password: "user123456",
  role: "user",
};

const sampleProperties = [
  {
    title: "Skyline Luxury Apartments",
    description:
      "Experience elevated living in this stunning Manhattan apartment featuring floor-to-ceiling windows, premium finishes, and breathtaking city views. Includes a private balcony, in-unit laundry, and access to a rooftop pool.",
    price: 1250000,
    location: "Manhattan, New York",
    beds: 4,
    baths: 3,
    area: "3,200 sq ft",
    image: "/images/property1.png",
    badge: "Featured",
    type: "Apartment",
    isFeatured: true,
    amenities: ["Pool", "Gym", "Parking", "Concierge"],
    status: "available",
  },
  {
    title: "Mediterranean Villa Paradise",
    description:
      "Nestled along the Malibu coastline, this Mediterranean-inspired villa offers unparalleled luxury with ocean views, a private infinity pool, and lush tropical gardens. Perfect for those seeking the ultimate coastal lifestyle.",
    price: 2850000,
    location: "Malibu, California",
    beds: 5,
    baths: 4,
    area: "5,400 sq ft",
    image: "/images/property2.png",
    badge: "Premium",
    type: "Villa",
    isFeatured: true,
    amenities: ["Pool", "Garden", "Beach Access", "Wine Cellar"],
    status: "available",
  },
  {
    title: "Modern Elegance Townhouse",
    description:
      "A beautifully designed Brooklyn townhouse combining modern aesthetics with historic charm. Features an open-concept layout, chef's kitchen, private garden, and a rooftop terrace with Manhattan views.",
    price: 890000,
    location: "Brooklyn, New York",
    beds: 3,
    baths: 2,
    area: "2,100 sq ft",
    image: "/images/property3.png",
    badge: "New",
    type: "Townhouse",
    isFeatured: true,
    amenities: ["Garden", "Rooftop", "Smart Home", "Fireplace"],
    status: "available",
  },
  {
    title: "Penthouse City View Suite",
    description:
      "Crown jewel of the Upper East Side — this penthouse offers 360° panoramic views, a private elevator, gourmet kitchen, and access to world-class amenities including a spa, theater, and valet parking.",
    price: 4500000,
    location: "Upper East Side, NYC",
    beds: 6,
    baths: 5,
    area: "7,800 sq ft",
    image: "/images/property4.png",
    badge: "Exclusive",
    type: "Penthouse",
    isFeatured: true,
    amenities: ["Spa", "Theater", "Valet Parking", "Private Elevator"],
    status: "available",
  },
  {
    title: "Charming Family Home",
    description:
      "A warm and inviting family home in Greenwich with spacious rooms, a large backyard, modern kitchen, and proximity to top-rated schools. The perfect blend of suburban tranquility and urban convenience.",
    price: 675000,
    location: "Greenwich, Connecticut",
    beds: 4,
    baths: 3,
    area: "2,800 sq ft",
    image: "/images/property5.png",
    badge: "Just Listed",
    type: "House",
    amenities: ["Backyard", "Garage", "Fireplace", "Basement"],
    status: "available",
  },
  {
    title: "Downtown Luxury Loft",
    description:
      "Industrial-chic loft in the heart of Chicago with soaring ceilings, exposed brick, designer kitchen, and floor-to-ceiling windows flooding the space with natural light.",
    price: 980000,
    location: "Downtown Chicago",
    beds: 3,
    baths: 2,
    area: "2,400 sq ft",
    image: "/images/property1.png",
    badge: "Hot",
    type: "Apartment",
    amenities: ["Gym", "Doorman", "Rooftop Deck", "Pet Friendly"],
    status: "available",
  },
  {
    title: "Oceanfront Villa Retreat",
    description:
      "Escape to luxury in this Miami Beach villa featuring direct ocean access, a heated pool, outdoor kitchen, and a private dock. Resort-style living at its finest.",
    price: 1650000,
    location: "Miami Beach, Florida",
    beds: 4,
    baths: 3,
    area: "3,600 sq ft",
    image: "/images/property2.png",
    badge: "Reduced",
    type: "Villa",
    amenities: ["Pool", "Dock", "Ocean View", "Outdoor Kitchen"],
    status: "available",
  },
  {
    title: "Austin Modern Townhouse",
    description:
      "Sleek and contemporary townhouse in Austin's most vibrant neighborhood. Features smart home technology, energy-efficient design, a private courtyard, and walking distance to live music venues.",
    price: 720000,
    location: "Austin, Texas",
    beds: 3,
    baths: 2,
    area: "1,950 sq ft",
    image: "/images/property3.png",
    badge: "New",
    type: "Townhouse",
    amenities: ["Smart Home", "EV Charger", "Courtyard", "Walk Score 95"],
    status: "available",
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    // eslint-disable-next-line no-console
    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Property.deleteMany({});
    // eslint-disable-next-line no-console
    console.log("Cleared existing data");

    // Create users
    const admin = await User.create(ADMIN);
    const user = await User.create(SAMPLE_USER);
    // eslint-disable-next-line no-console
    console.log(`Created admin: ${admin.email}`);
    // eslint-disable-next-line no-console
    console.log(`Created user:  ${user.email}`);

    // Create properties (half by admin, half by user)
    const propertiesWithOwner = sampleProperties.map((p, i) => ({
      ...p,
      createdBy: i < 4 ? admin._id : user._id,
    }));

    await Property.insertMany(propertiesWithOwner);
    // eslint-disable-next-line no-console
    console.log(`Created ${propertiesWithOwner.length} properties`);

    // eslint-disable-next-line no-console
    console.log("\n✅ Seed complete!");
    // eslint-disable-next-line no-console
    console.log("Admin login:  admin@havensphere.com / admin123456");
    // eslint-disable-next-line no-console
    console.log("User login:   john@example.com / user123456");

    process.exit(0);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Seed failed:", err);
    process.exit(1);
  }
};

seed();

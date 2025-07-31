const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  date: { type: Date, required: true },
  reviewerName: { type: String, required: true },
  reviewerEmail: { type: String, required: true },
});

const dimensionsSchema = new mongoose.Schema({
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  depth: { type: Number, required: true },
});

const metaSchema = new mongoose.Schema({
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
  barcode: { type: String, required: true },
  qrCode: { type: String, required: true },
});

const cartSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  discountPercentage: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  stock: { type: Number, required: true },
  tags: { type: [String], default: [] },
  brand: { type: String },
  quantity:{type:Number, default:1},
  sku: { type: String, required: true, unique: true },
  weight: { type: Number, required: true },
  dimensions: { type: dimensionsSchema, required: true },
  warrantyInformation: { type: String },
  shippingInformation: { type: String },
  availabilityStatus: { type: String, required: true },
  reviews: { type: [reviewSchema], default: [] },
  returnPolicy: { type: String, required: true },
  minimumOrderQuantity: { type: Number, required: true },
  meta: { type: metaSchema, required: true },
  images: { type: [String], default: [] },
  thumbnail: { type: String },
});

const Cart =mongoose.model('Cart', cartSchema);
module.exports={Cart}
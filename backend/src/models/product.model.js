//modulo genesis.............
"use strict";
import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    entrepreneur: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    versionKey: false
  }
);

const Product = model("Product", productSchema);
export default Product;

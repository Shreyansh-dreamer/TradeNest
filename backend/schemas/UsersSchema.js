const {Schema}=require("mongoose");
const mongoose = require('mongoose');
const { Types } = mongoose;

const UsersSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required:true,
    },
    password: {
      type: String,
      required: true,
    },
    lastLoggedIn: {
      type: Date,
      default: Date.now,
    },
    availableMargin: {
      type: Number,
      default: 0,
    },
    payin: {
      type: Number,
      default: 0,
    },
    openingBalance: {
      type: Number,
      default: 0,
    },
    usedMargin:{
      type: Number,
      default: 0,
    },
    favourites: {
      type: [
        {
          _id: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
          },
          symbol: {
            type: String,
            required: true,
          },
        }
      ],
      default: () => ([
        { symbol: "RELIANCE" },
        { symbol: "TCS" },
        { symbol: "HDFCBANK" },
        { symbol: "WIPRO" }
      ]),
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

module.exports={UsersSchema}

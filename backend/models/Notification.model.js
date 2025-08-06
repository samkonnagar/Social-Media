import { Schema, model } from "mongoose";

const notificationSchema = new Schema(
  {
    toUser: { type: Schema.Types.ObjectId, ref: "User" },
    message: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: ["Post", "User", "Other"],
      default: "Other",
    },
    id: {
      type: Schema.Types.ObjectId,
      refPath: "type",
    },
  },
  { timestamps: true }
);

export default model("Notification", notificationSchema);

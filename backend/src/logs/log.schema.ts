import { Schema } from 'mongoose';

export const LogSchema = new Schema({
  action: { type: String, required: true },
  details: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});
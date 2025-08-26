import mongoose, { Schema } from 'mongoose';

const HistoryDataSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  clerkUserId: {
    type: String,
    required: true,
  },
  template: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  totalWords: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const HistoryData = 
mongoose.models.HistoryData || 
mongoose.model("HistoryData", HistoryDataSchema);

export default HistoryData;
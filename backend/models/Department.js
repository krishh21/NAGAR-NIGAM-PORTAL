const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
default:''
    
  },
  head: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  // Add this field to fix the StrictPopulateError
  assignedStaff: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  categories: [{
    type: String
  }],
  totalComplaints: {
    type: Number,
    default: 0
  },
  resolvedComplaints: {
    type: Number,
    default: 0
  },
  avgResolutionTime: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  // Add this to handle population of paths not in schema
  strictPopulate: false
});

// Add index for faster queries
DepartmentSchema.index({ name: 1, email: 1 });

module.exports = mongoose.model('Department', DepartmentSchema);
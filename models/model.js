const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  address: {
    type: String,
    required: [true, 'Please add address'],
    unique: true,
    maxLength: [40, '']
  },
  name: {
    type: String,
    required: [true, 'Please add name'],
    unique: false,
    maxLength: [50, '']
  },
  lat: {
    type: Number,
    required: [true, 'Please add lat'],
    unique: true,
    trim: true,
    maxLength: [20, '']
  },
  lng: {
    type: Number,
    required: [true, 'Please add lng'],
    unique: true,
    trim: true,
    maxLength: [20, '']
  },
  description: {
    type: String,
    required: [false, ''],
    unique: false,
    maxLength: [120, '']
  },
  photo: {
    type: String,
    required: [false, ''],
    unique: false,
    maxLength: [50, '']
  },
  website: {
    type: String,
    required: [false, ''],
    unique: false,
    maxLength: [50, '']
  },
  work_time: {
    type: String,
    required: [false, ''],
    unique: false,
    maxLength: [50, '']
  }
});

module.exports = mongoose.model('Data', dataSchema)
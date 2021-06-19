const mongoose = require('mongoose');

const ToolSchema = new mongoose.Schema({
  name: String,
  price: Number
});

const MaterialSchema = new mongoose.Schema({
  name: String,
  price: Number
})

const ProjectSchema = new mongoose.Schema({
  createdBy: String,
  title: String,
  tools: [ToolSchema],
  materials: [MaterialSchema]
});

module.exports = mongoose.model('Project', ProjectSchema);
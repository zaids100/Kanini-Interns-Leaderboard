const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  moduleNumber: {
    type: String,
    required: true
  },
  moduleName: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  }
}, { _id: false });

const internSchema = new mongoose.Schema({
  ka_id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profilePic: {
    type: String,        
    default: ''          
  },
  score: {
    type: [scoreSchema],
    default: []
  },
  achievements: {
    type: [String],
    default: []
  },
  role: {
    type: String,
    enum: ['intern', 'admin'], 
    default: 'intern'
  }
});

const Intern = mongoose.model('Intern', internSchema, 'Interns');

module.exports = Intern;
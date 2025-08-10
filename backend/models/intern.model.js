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

const certificationSchema = new mongoose.Schema({
  certification_name: {
    type: String,
    required: true
  },
  certificate_link: {
    type: String,
    required: true
  }
}, { _id: false });

const leetcodeStatsSchema = new mongoose.Schema({
  easy: {
    type: Number,
    default: 0
  },
  medium: {
    type: Number,
    default: 0
  },
  hard: {
    type: Number,
    default: 0
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
  certifications: {
    type: [certificationSchema],
    default: []
  },
  leetcode_stats: {
    type: leetcodeStatsSchema,
    default: { easy: 0, medium: 0, hard: 0 }
  },
  role: {
    type: String,
    enum: ['intern', 'admin'], 
    default: 'intern'
  }
});

const Intern = mongoose.model('Intern', internSchema, 'Interns');

module.exports = Intern;
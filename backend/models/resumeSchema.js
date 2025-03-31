const mongoose = require("mongoose");
const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  personalInfo: {
    fullName: String,
    email: String,
    phone: String,
    address: String,
    website: String,
    linkedin: String,
    github: String,
    portfolio: String,
  },
  summary: {
    type: String,
  },
  experience: [
    {
      company: String,
      position: String,
      location: String,
      startDate: Date,
      endDate: Date,
      description: String,
    },
  ],
  education: [
    {
      institution: String,
      degree: String,
      fieldOfStudy: String,
      startDate: Date,
      endDate: Date,
      grade: String,
    },
  ],
  skills: [String],
  projects: [
    {
      title: String,
      description: String,
      technologies: [String], // Array of technologies used
      link: String, // GitHub or live project link
    },
  ],
  certifications: [
    {
      name: String,
      issuingOrganization: String,
      issueDate: Date,
      expirationDate: Date,
      credentialID: String,
      credentialURL: String,
    },
  ],
  languages: [
    {
      name: String,
      proficiency: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced", "Fluent", "Native"],
      },
    },
  ],
  interests: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;

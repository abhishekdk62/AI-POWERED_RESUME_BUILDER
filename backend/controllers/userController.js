const bcrypt = require('bcryptjs');
const User = require("../models/userSchema");
const Resume = require("../models/resumeSchema");
const Admin = require("../models/adminSchema");
const generateWebToken = require("../utils/generateWebToken");
const mongoose = require("mongoose");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");


dotenv.config();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const generateResume = async (req, res) => {
  try {
    const { id } = req.body;

    const resume = await Resume.findById(id);

    if (!resume) return res.status(404).json({ error: "Resume not found" });

    const prompt = `
Generate a professional resume using the following details in a correct order:just generate the resume dont give notes and tips 
if any of the experience or projects or certigicatons is empty  then  avoid it dont give warning and dont createa any texts for that.
Name: ${resume.personalInfo.fullName}
Title: ${resume.title}

Address:${resume.personalInfo.address}
email:${resume.personalInfo.email}
phone num:${resume.personalInfo.phone}
linkedin:${resume.personalInfo.linkedin}
github:${resume.personalInfo.github}
personal portfoilio :${resume.personalInfo.portfolio}

summary:${
      resume.summary
    } make this sumary actractive to the hr based on my skills and the experience and projects done if i have these
Technical Skills: ${resume.skills.join(", ")}

Experience:
${
  resume.experience.length > 0
    ? resume.experience
        .map(
          (e) =>
            `-position: ${e.position} at ${e.company}, ${e.location} (${e.startDate} - ${e.endDate})\n  Description: ${e.description} dont blindly keep this discription make this atractive modify this diescription according to the resume title and this position  `
        )
        .join("\n")
    : "I am a fresher with industry-level skills. modify this line and make it atractive to the hr in case of no experience provided"
}


Projects:
${
  resume.projects.length > 0
    ? resume.projects
        .map(
          (p) =>
            `- ${
              p.title
            }:keep the discription in a profetional manner include the technologies and explain a little bit ${
              p.description
            } (Tech: ${p.technologies.join(", ")})\n  Link: ${p.link}`
        )
        .join("\n")
    : "No projects listed."
}
    


Education:
${resume.education
  .map(
    (e) =>
      `- ${e.degree} at ${e.institution} (${e.startDate} - ${e.endDate}), specializing in ${e.fieldOfStudy}, Grade: ${e.grade}`
  )
  .join("\n")}





${
  resume.certifications.length > 0
    ? resume.certifications
        .map(
          (c) =>
            `- ${c.name} from ${c.issuingOrganization} (ID: ${c.credentialID}, URL: ${c.credentialURL})`
        )
        .join("\n")
    : "No certifications listed."
}

Languages Known:
${resume.languages
  .map((l) => `- ${l.name} (Proficiency: ${l.proficiency}) `)
  .join("\n")} keep this languages listing profetoinal way 

Interests: ${resume.interests.join(
      ", "
    )}keep this intrests listing profetoinal way

`;

    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro" });
    const response = await model.generateContent(prompt);
    const aiGeneratedResume =
      response.response.candidates[0].content.parts[0].text;

    res.status(200).json({ resume: aiGeneratedResume });
  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  }
};

const userSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "Signing up...", userId: newUser._id });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const signin = async (req, res) => {
  try {
    
    const { email, password } = req.body;

    let user = await Admin.findOne({ email });
    let role = "admin";

    if (!user) {
      user = await User.findOne({ email });
      role = "user";
    }

    if (!user) {
      return res.status(400).json("User doesn't exist");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json("Incorrect Password");
    }
    console.log("hiii");
    

    generateWebToken(res, user._id, role);
    console.log(user._id);

    res.status(200).json({ message: "Logging In", role,user:user._id });
  } catch (error) {
    res.status(500).json("Server error");
  }
};

const check = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not logged in" });
    }

    res.status(200).json({ user: req.user });
  } catch (error) {
    res.status(500).json(error);
  }
};

const storeResume = async (req, res) => {
  try {
    const {
      title,
      personalInfo,
      summary,
      experience,
      education,
      skills,
      projects,
      certifications,
      languages,
    } = req.body.resumeData;

    const user = req.user;
    const newResume = new Resume({
      user: new mongoose.Types.ObjectId(user.id),
      title,
      personalInfo,
      summary,
      experience,
      education,
      skills,
      projects,
      certifications,
      languages,
    });
    await newResume.save();
    res.status(200).json("Resume data have stored");
  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  }
};


const removeResume=async(req,res)=>{
  try {
    
    const {id}=req.params
  if(!id)
  {
    return res.status(400).json("id not provided")
  }
  const resume=await Resume.findByIdAndDelete(id)
res.status(200).json("resume deleted")
    
  } catch (error) {
    res.status(500).json(error)
  }
}

const getResume = async (req, res) => {
  try {
    const userId = req.user.id;

    const resume = await Resume.find({ user: userId }).populate("user");
    if (!resume) {
      return res.status(400).json("no resumes found");
      console.log("no ");
    }

    res.status(200).json(resume);
  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  }
};
const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Logout failed" });
  }
};

const getuser=async(req,res)=>{


  try {const uid=req.params.id
  

const user=await User.findById(uid)

if(!user)
{
  return res.status(400).json("user not found")
}

res.status(200).json(user)
    
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports = logout;

module.exports = {
  userSignup,
  logout,
  getuser,
  getResume,
  removeResume,
  generateResume,
  storeResume,
  signin,
  check,
};

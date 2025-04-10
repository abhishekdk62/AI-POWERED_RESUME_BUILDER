import React, { useState } from 'react';
import { Mail, Plus, Trash2, Save } from 'lucide-react';
import toast from "react-hot-toast";
import { sendResumeApi } from '../../services/userServices';

// Helper components & functions
const FormSection = ({ title,val ,children }) => (
  <div className="mb-6">
    <h2 className="text-xl gap-1 flex font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
      {title}
      <div className='text-red-600 text-xl block'>{val}</div>

    </h2>
    {children}
  </div>
);

const ResumeBodyc = () => {
  const [title, setTitle] = useState('');
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    linkedin: '',
    github: '',
    portfolio: '',
  });
  const [summary, setSummary] = useState('');

  // Array fields
  const [experience, setExperience] = useState([
    { company: '', position: '', location: '', startDate: '', endDate: '', description: '' },
  ]);
  const [education, setEducation] = useState([
    { institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', grade: '' },
  ]);
  const [skills, setSkills] = useState(['']);
  const [projects, setProjects] = useState([
    { title: '', description: '', technologies: [''], link: '' },
  ]);
  const [certifications, setCertifications] = useState([
    { name: '', issuingOrganization: '', issueDate: '', expirationDate: '', credentialID: '', credentialURL: '' },
  ]);
  const [languages, setLanguages] = useState([
    { name: '', proficiency: 'Intermediate' },
  ]);
  const [interests, setInterests] = useState(['']);

  // Helpers to add and remove items in arrays
  const addItem = (items, setItems, template) => {
    setItems([...items, { ...template }]);
  };
  const removeItem = (items, setItems, index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  // For simple arrays (skills, interests)
  const handleSimpleArrayChange = (items, setItems, index, value) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  };

  const addSimpleItem = (items, setItems) => {
    setItems([...items, '']);
  };

  // For nested objects (experience, education, certifications, languages)
  const handleObjectChange = (items, setItems, index, field, value) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  // For technologies in projects
  const handleTechChange = (projectIndex, techIndex, value) => {
    const newProjects = [...projects];
    newProjects[projectIndex].technologies[techIndex] = value;
    setProjects(newProjects);
  };
  const addTech = (projectIndex) => {
    const newProjects = [...projects];
    newProjects[projectIndex].technologies.push('');
    setProjects(newProjects);
  };
  const removeTech = (projectIndex, techIndex) => {
    const newProjects = [...projects];
    if (newProjects[projectIndex].technologies.length > 1) {
      newProjects[projectIndex].technologies = newProjects[projectIndex].technologies.filter(
        (_, i) => i !== techIndex
      );
      setProjects(newProjects);
    }
  };

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo({ ...personalInfo, [field]: value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    if(!title||!personalInfo||!summary||!education||!skills||!languages||!interests)
    {
      toast.error("Please fill out the marked fields", {
        style: {
          border: "1px solid #e53e3e",
          padding: "16px",
          color: "#e53e3e",
        },
        iconTheme: {
          primary: "#e53e3e",
          secondary: "#ffe6e6",
        },
      });
      return
    }
    
    const resumeData = {
      title,
      personalInfo,
      summary,
      experience,//not incl
      education,
      skills,
      projects,//not incls
      certifications,//not incl
      languages,
      interests,
    };
    try {
      const response=await sendResumeApi(resumeData)
      toast.success(response.data.message, {
        style: {
          border: "1px solid #38a169",
          padding: "16px",
          color: "#38a169",
        },
        iconTheme: {
          primary: "#38a169",
          secondary: "#e6ffe6",
        },
      });
      setInterests([""])
      setLanguages( { name: '', proficiency: 'Intermediate' })
      setCertifications(  { name: '', issuingOrganization: '', issueDate: '', expirationDate: '', credentialID: '', credentialURL: '' })
      setProjects({ title: '', description: '', technologies: [''], link: '' })
      setExperience(    { company: '', position: '', location: '', startDate: '', endDate: '', description: '' })
      setSummary("")
      setSkills("")
      setTitle("")
      setPersonalInfo({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        website: '',
        linkedin: '',
        github: '',
        portfolio: '',
      })
      setEducation( { institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', grade: '' })
    } catch (error) {
      console.log(error);
      
      
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Create Your Resume</h1>
        <form onSubmit={handleSubmit}>
          {/* Resume Title */}
          <FormSection val="*" title="Resume Title ">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Senior Developer Resume"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </FormSection>

          {/* Personal Information */}
          <FormSection val="*" title="Personal Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label>Full Name</label>
                <input
                  type="text"
                  value={personalInfo.fullName}
                  onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                  placeholder="John Doe"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg outline-none"
                />
              </div>
              <div>
                <label>Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                   
                    value={personalInfo.email}
                    onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                    placeholder="johndoe@example.com"
                    className="w-full p-3 pl-10 bg-gray-700 border border-gray-600 rounded-lg outline-none"
                  />
                </div>
              </div>
              <div>
                <label>Phone</label>
                <input
                  type="tel"
                  value={personalInfo.phone}
                  onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                  placeholder="(123) 456-7890"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg outline-none"
                />
              </div>
              <div>
                <label>Address</label>
                <input
                  type="text"
                  value={personalInfo.address}
                  onChange={(e) => handlePersonalInfoChange('address', e.target.value)}
                  placeholder="123 Main St, City, State"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg outline-none"
                />
              </div>
              <div>
                <label>Website</label>
                <input
                  value={personalInfo.website}
                  onChange={(e) => handlePersonalInfoChange('website', e.target.value)}
                  placeholder="https://yourwebsite.com"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg outline-none"
                />
              </div>
              <div>
                <label>LinkedIn</label>
                <input
                  value={personalInfo.linkedin}
                  onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg outline-none"
                />
              </div>
              <div>
                <label>GitHub</label>
                <input
                  value={personalInfo.github}
                  onChange={(e) => handlePersonalInfoChange('github', e.target.value)}
                  placeholder="https://github.com/username"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg outline-none"
                />
              </div>
              <div>
                <label>Portfolio</label>
                <input
                  value={personalInfo.portfolio}
                  onChange={(e) => handlePersonalInfoChange('portfolio', e.target.value)}
                  placeholder="https://portfolio.com"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg outline-none"
                />
              </div>
            </div>
          </FormSection>

          {/* Professional Summary */}
          <FormSection val="*" title="Professional Summary">
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Write a short summary of your professional background..."
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg outline-none"
              rows="4"
            />
          </FormSection>

          {/* Work Experience */}
          <FormSection title="Work Experience">
            {experience.length>0?(experience?.map((exp, index) => (
              <div key={index} className="border p-4 rounded mb-4 bg-gray-700">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">Experience {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeItem(experience, setExperience, index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label>Company</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => handleObjectChange(experience, setExperience, index, 'company', e.target.value)}
                      className="w-full p-3 bg-gray-600 border border-gray-500 rounded-lg outline-none"
                      placeholder="Company Name"
                    />
                  </div>
                  <div>
                    <label>Position</label>
                    <input
                      type="text"
                      value={exp.position}
                      onChange={(e) => handleObjectChange(experience, setExperience, index, 'position', e.target.value)}
                      className="w-full p-3 bg-gray-600 border border-gray-500 rounded-lg outline-none"
                      placeholder="Job Title"
                    />
                  </div>
                  <div>
                    <label>Location</label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => handleObjectChange(experience, setExperience, index, 'location', e.target.value)}
                      className="w-full p-3 bg-gray-600 border border-gray-500 rounded-lg outline-none"
                      placeholder="City, Country"
                    />
                  </div>
                  <div>
                    <label>Start Date</label>
                    <input
                      type="date"
                      value={exp.startDate}
                      onChange={(e) => handleObjectChange(experience, setExperience, index, 'startDate', e.target.value)}
                      className="w-full p-3 bg-gray-600 border border-gray-500 rounded-lg outline-none"
                    />
                  </div>
                  <div>
                    <label>End Date</label>
                    <input
                      type="date"
                      value={exp.endDate}
                      onChange={(e) => handleObjectChange(experience, setExperience, index, 'endDate', e.target.value)}
                      className="w-full p-3 bg-gray-600 border border-gray-500 rounded-lg outline-none"
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <label>Description</label>
                  <textarea
                    value={exp.description}
                    onChange={(e) => handleObjectChange(experience, setExperience, index, 'description', e.target.value)}
                    className="w-full p-3 bg-gray-600 border border-gray-500 rounded-lg outline-none"
                    rows="3"
                    placeholder="Describe your responsibilities and achievements..."
                  />
                </div>
              </div>
            ))):null}
            <button
              type="button"
              onClick={() =>
                addItem(experience, setExperience, {
                  company: '',
                  position: '',
                  location: '',
                  startDate: '',
                  endDate: '',
                  description: '',
                })
              }
              className="flex items-center bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded"
            >
              <Plus size={18} className="mr-2" /> Add Experience
            </button>
          </FormSection>

          {/* Education */}
          <FormSection val="*" title="Education">
            {education.map((edu, index) => (
              <div key={index} className="border p-4 rounded mb-4 bg-gray-700">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">Education {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeItem(education, setEducation, index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label>Institution</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => handleObjectChange(education, setEducation, index, 'institution', e.target.value)}
                      className="w-full p-3 bg-gray-600 border border-gray-500 rounded-lg outline-none"
                      placeholder="University/School Name"
                    />
                  </div>
                  <div>
                    <label>Degree</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => handleObjectChange(education, setEducation, index, 'degree', e.target.value)}
                      className="w-full p-3 bg-gray-600 border border-gray-500 rounded-lg outline-none"
                      placeholder="Bachelor's, Master's, etc."
                    />
                  </div>
                  <div>
                    <label>Field of Study</label>
                    <input
                      type="text"
                      value={edu.fieldOfStudy}
                      onChange={(e) => handleObjectChange(education, setEducation, index, 'fieldOfStudy', e.target.value)}
                      className="w-full p-3 bg-gray-600 border border-gray-500 rounded-lg outline-none"
                      placeholder="e.g. Computer Science"
                    />
                  </div>
                  <div>
                    <label>Start Date</label>
                    <input
                      type="date"
                      value={edu.startDate}
                      onChange={(e) => handleObjectChange(education, setEducation, index, 'startDate', e.target.value)}
                      className="w-full p-3 bg-gray-600 border border-gray-500 rounded-lg outline-none"
                    />
                  </div>
                  <div>
                    <label>End Date</label>
                    <input
                      type="date"
                      value={edu.endDate}
                      onChange={(e) => handleObjectChange(education, setEducation, index, 'endDate', e.target.value)}
                      className="w-full p-3 bg-gray-600 border border-gray-500 rounded-lg outline-none"
                    />
                  </div>
                  <div>
                    <label>Grade/GPA</label>
                    <input
                      type="text"
                      value={edu.grade}
                      onChange={(e) => handleObjectChange(education, setEducation, index, 'grade', e.target.value)}
                      className="w-full p-3 bg-gray-600 border border-gray-500 rounded-lg outline-none"
                      placeholder="e.g. 3.8/4.0"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                addItem(education, setEducation, {
                  institution: '',
                  degree: '',
                  fieldOfStudy: '',
                  startDate: '',
                  endDate: '',
                  grade: '',
                })
              }
              className="flex items-center bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded"
            >
              <Plus size={18} className="mr-2" /> Add Education
            </button>
          </FormSection>

          <FormSection val="*" title="Skills">
            <div className="flex flex-wrap gap-2 mb-3">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center bg-gray-600 p-2 rounded">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => handleSimpleArrayChange(skills, setSkills, index, e.target.value)}
                    placeholder="Skill"
                    className="p-1 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(skills, setSkills, index)}
                    className="text-red-500 ml-2"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => addSimpleItem(skills, setSkills)}
              className="flex items-center bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded"
            >
              <Plus size={16} className="mr-2" /> Add Skill
            </button>
          </FormSection>

          {/* Projects */}
          <FormSection title="Projects">
            {projects.map((project, index) => (
              <div key={index} className="border p-4 rounded mb-4 bg-gray-700">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold">Project {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeItem(projects, setProjects, index)}
                    className="text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label>Title</label>
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => handleObjectChange(projects, setProjects, index, 'title', e.target.value)}
                      className="w-full p-3 bg-gray-600 border border-gray-500 rounded-lg outline-none"
                      placeholder="Project Title"
                    />
                  </div>
                  <div>
                    <label>Link</label>
                    <input
                   
                      value={project.link}
                      onChange={(e) => handleObjectChange(projects, setProjects, index, 'link', e.target.value)}
                      className="w-full p-3 bg-gray-600 border border-gray-500 rounded-lg outline-none"
                      placeholder="https://github.com/username/project"
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <label>Description</label>
                  <textarea
                    value={project.description}
                    onChange={(e) => handleObjectChange(projects, setProjects, index, 'description', e.target.value)}
                    className="w-full p-3 bg-gray-600 border border-gray-500 rounded-lg outline-none"
                    rows="3"
                    placeholder="Describe your project..."
                  />
                </div>
                <div className="mt-2">
                  <label>Technologies</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.technologies.map((tech, techIndex) => (
                      <div key={techIndex} className="flex items-center bg-gray-600 p-2 rounded">
                        <input
                          type="text"
                          value={tech}
                          onChange={(e) => handleTechChange(index, techIndex, e.target.value)}
                          placeholder="Technology"
                          className="p-1 text-black outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => removeTech(index, techIndex)}
                          className="text-red-500 ml-2"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => addTech(index)}
                    className="flex items-center bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded"
                  >
                    <Plus size={16} className="mr-2" /> Add Technology
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                addItem(projects, setProjects, {
                  title: '',
                  description: '',
                  technologies: [''],
                  link: '',
                })
              }
              className="flex items-center bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded"
            >
              <Plus size={16} className="mr-2" /> Add Project
            </button>
          </FormSection>

          {/* Certifications */}
          <FormSection title="Certifications">
            {certifications.map((cert, index) => (
              <div key={index} className="border p-4 rounded mb-4 bg-gray-700">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold">Certification {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeItem(certifications, setCertifications, index)}
                    className="text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label>Name</label>
                    <input
                      type="text"
                      value={cert.name}
                      onChange={(e) => handleObjectChange(certifications, setCertifications, index, 'name', e.target.value)}
                      className="w-full p-3 bg-gray-600 border border-gray-500 rounded-lg outline-none"
                      placeholder="Certification Name"
                    />
                  </div>
                  <div>
                    <label>Issuing Organization</label>
                    <input
                      type="text"
                      value={cert.issuingOrganization}
                      onChange={(e) =>
                        handleObjectChange(certifications, setCertifications, index, 'issuingOrganization', e.target.value)
                      }
                      className="w-full p-3 bg-gray-600 border border-gray-500 rounded-lg outline-none"
                      placeholder="Organization"
                    />
                  </div>
                  <div>
                    <label>Issue Date</label>
                    <input
                      type="date"
                      value={cert.issueDate}
                      onChange={(e) => handleObjectChange(certifications, setCertifications, index, 'issueDate', e.target.value)}
                      className="w-full p-3 bg-gray-600 border border-gray-500 rounded-lg outline-none"
                    />
                  </div>
                  <div>
                    <label>Expiration Date</label>
                    <input
                      type="date"
                      value={cert.expirationDate}
                      onChange={(e) =>
                        handleObjectChange(certifications, setCertifications, index, 'expirationDate', e.target.value)
                      }
                      className="w-full p-3 bg-gray-600 border border-gray-500 rounded-lg outline-none"
                    />
                  </div>
                  <div>
                    <label>Credential ID</label>
                    <input
                      type="text"
                      value={cert.credentialID}
                      onChange={(e) => handleObjectChange(certifications, setCertifications, index, 'credentialID', e.target.value)}
                      className="w-full p-3 bg-gray-600 border border-gray-500 rounded-lg outline-none"
                      placeholder="ID"
                    />
                  </div>
                  <div>
                    <label>Credential URL</label>
                    <input
                      value={cert.credentialURL}
                      onChange={(e) => handleObjectChange(certifications, setCertifications, index, 'credentialURL', e.target.value)}
                      className="w-full p-3 bg-gray-600 border border-gray-500 rounded-lg outline-none"
                      placeholder="https://"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                addItem(certifications, setCertifications, {
                  name: '',
                  issuingOrganization: '',
                  issueDate: '',
                  expirationDate: '',
                  credentialID: '',
                  credentialURL: '',
                })
              }
              className="flex items-center bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded"
            >
              <Plus size={16} className="mr-2" /> Add Certification
            </button>
          </FormSection>

          {/* Languages */}
          <FormSection val="*" title="Languages">
            {languages.map((lang, index) => (
              <div key={index} className="border p-4 rounded mb-4 bg-gray-700 flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex-1">
                  <label>Name</label>
                  <input
                    type="text"
                    value={lang.name}
                    onChange={(e) => handleObjectChange(languages, setLanguages, index, 'name', e.target.value)}
                    className="w-full p-3 bg-gray-600 border border-gray-500 rounded-lg outline-none"
                    placeholder="Language"
                  />
                </div>
                <div className="flex-1 md:ml-4">
                  <label>Proficiency</label>
                  <select
                    value={lang.proficiency}
                    onChange={(e) => handleObjectChange(languages, setLanguages, index, 'proficiency', e.target.value)}
                    className="w-full p-3 bg-gray-600 border border-gray-500 rounded-lg outline-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Fluent">Fluent</option>
                    <option value="Native">Native</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(languages, setLanguages, index)}
                  className="text-red-500 mt-2 md:mt-0"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addSimpleItem(languages, setLanguages)}
              className="flex items-center bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded"
            >
              <Plus size={16} className="mr-2" /> Add Language
            </button>
          </FormSection>

          {/* Interests */}
          <FormSection val="*" title="Interests">
            <div className="flex flex-wrap gap-2 mb-3">
              {interests.map((interest, index) => (
                <div key={index} className="flex items-center bg-gray-600 p-2 rounded">
                  <input
                    type="text"
                    value={interest}
                    onChange={(e) => handleSimpleArrayChange(interests, setInterests, index, e.target.value)}
                    placeholder="Interest"
                    className="p-1 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(interests, setInterests, index)}
                    className="text-red-500 ml-2"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => addSimpleItem(interests, setInterests)}
              className="flex items-center bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded"
            >
              <Plus size={16} className="mr-2" /> Add Interest
            </button>
          </FormSection>

          {/* Submit Button */}
          <div className="mt-8 flex  text-center">
            <button type="submit" className="px-4 ml-auto py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium shadow-lg shadow-indigo-700/30 transition-all duration-200 flex items-center">
              <Save size={20} className="mr-2" /> Save Resume
            </button>
          
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResumeBodyc;

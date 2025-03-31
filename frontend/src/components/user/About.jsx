import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, FileText, Star, PenTool, Search, Zap, Award } from 'lucide-react';

const About = ({setSelectedTab}) => {
  const [position1, setPosition1] = useState({ x: 0, y: 0, scale: 1 });
  const [position2, setPosition2] = useState({ x: 0, y: 0, scale: 1 });
  const [position3, setPosition3] = useState({ x: 0, y: 0, scale: 1 });

  useEffect(() => {
    const animateBackground = () => {
      const getRandomPosition = () => ({
        x: Math.floor(Math.random() * 200) - 100,
        y: Math.floor(Math.random() * 200) - 100,
        scale: Math.random() * 0.5 + 0.8,
      });

      setInterval(() => {
        setPosition1(getRandomPosition());
        setPosition2(getRandomPosition());
        setPosition3(getRandomPosition());
      }, 6000);
    };

    animateBackground();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-start p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-800 to-blue-500 opacity-20 blur-3xl"
          style={{
            top: "-150px",
            left: "-150px",
            transform: `translate(${position1.x}px, ${position1.y}px) scale(${position1.scale})`,
            transition: "transform 6s ease-in-out",
          }}
        />
        <div
          className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-pink-700 to-purple-600 opacity-20 blur-3xl"
          style={{
            bottom: "-100px",
            right: "-100px",
            transform: `translate(${position2.x}px, ${position2.y}px) scale(${position2.scale})`,
            transition: "transform 6s ease-in-out",
          }}
        />
        <div
          className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-cyan-700 to-emerald-600 opacity-20 blur-3xl"
          style={{
            top: "50%",
            left: "30%",
            transform: `translate(${position3.x}px, ${position3.y}px) scale(${position3.scale})`,
            transition: "transform 6s ease-in-out",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto pt-16 pb-24 px-4 text-center">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent inline-block">
            ResumeAI
          </h1>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight">
          MEET THE ATS FRIENDLY RESUME BUILDER
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
          Get past Applicant Tracking Systems and land more interviews with AI-powered resumes tailored for your dream job
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <button onClick={()=>setSelectedTab("create")} className="px-8 py-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium shadow-lg shadow-indigo-700/30 transition-all duration-200 transform hover:translate-y-[-2px] flex items-center justify-center">
            Create Your Resume Now
            <ArrowRight size={20} className="ml-2" />
          </button>
          <button onClick={()=>setSelectedTab("show")} className="px-8 py-4 rounded-lg bg-gray-700/50 bordersetSelectedTab border-gray-600 hover:bg-gray-700 text-white font-medium transition-all duration-200 transform hover:translate-y-[-2px]">
            Your Resumes
          </button>
        </div>

        {/* Feature Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-800 rounded-xl shadow-xl backdrop-blur-sm bg-opacity-80 p-8 relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm"></div>
            <div className="text-indigo-400 mb-4">
              <FileText size={36} />
            </div>
            <h3 className="text-xl font-bold mb-3">ATS-Optimized Templates</h3>
            <p className="text-gray-300">
              Our templates are designed to pass through Applicant Tracking Systems with ease, ensuring your resume reaches human recruiters.
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl shadow-xl backdrop-blur-sm bg-opacity-80 p-8 relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm"></div>
            <div className="text-indigo-400 mb-4">
              <Zap size={36} />
            </div>
            <h3 className="text-xl font-bold mb-3">AI-Powered Content</h3>
            <p className="text-gray-300">
              Let AI help you craft compelling bullet points highlighting your achievements and skills that match job descriptions perfectly.
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl shadow-xl backdrop-blur-sm bg-opacity-80 p-8 relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm"></div>
            <div className="text-indigo-400 mb-4">
              <Search size={36} />
            </div>
            <h3 className="text-xl font-bold mb-3">Keyword Optimization</h3>
            <p className="text-gray-300">
              Automatically extract and integrate industry-specific keywords to maximize your match rate with job requirements.
            </p>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="bg-gray-800 rounded-xl shadow-xl backdrop-blur-sm bg-opacity-80 p-8 mb-16 max-w-3xl mx-auto relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm"></div>
          <div className="flex justify-center mb-4">
            <Star className="text-yellow-400" size={24} />
            <Star className="text-yellow-400" size={24} />
            <Star className="text-yellow-400" size={24} />
            <Star className="text-yellow-400" size={24} />
            <Star className="text-yellow-400" size={24} />
          </div>
          <p className="text-lg italic mb-4">
            "After using ResumeAI, I started getting callbacks from companies that never responded before. The ATS optimization made all the difference in my job search."
          </p>
          <p className="font-medium">— Michael K., Software Engineer</p>
        </div>

        {/* Why Choose Us */}
        <h2 className="text-3xl font-bold mb-8">Why Choose ResumeAI?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
          <div className="flex items-start">
            <CheckCircle className="text-green-400 mr-3 flex-shrink-0 mt-1" size={22} />
            <div className="text-left">
              <h3 className="font-semibold mb-1">Higher Interview Rate</h3>
              <p className="text-gray-300">Our users report a 3x increase in interview invitations</p>
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle className="text-green-400 mr-3 flex-shrink-0 mt-1" size={22} />
            <div className="text-left">
              <h3 className="font-semibold mb-1">Industry-Specific Formats</h3>
              <p className="text-gray-300">Tailored formats for tech, finance, healthcare, and more</p>
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle className="text-green-400 mr-3 flex-shrink-0 mt-1" size={22} />
            <div className="text-left">
              <h3 className="font-semibold mb-1">ATS Score Checker</h3>
              <p className="text-gray-300">Preview how your resume performs against ATS systems</p>
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle className="text-green-400 mr-3 flex-shrink-0 mt-1" size={22} />
            <div className="text-left">
              <h3 className="font-semibold mb-1">Easy PDF Export</h3>
              <p className="text-gray-300">Download ATS-friendly PDFs with perfect formatting</p>
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle className="text-green-400 mr-3 flex-shrink-0 mt-1" size={22} />
            <div className="text-left">
              <h3 className="font-semibold mb-1">Expert Review</h3>
              <p className="text-gray-300">AI-powered suggestions for improvement</p>
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle className="text-green-400 mr-3 flex-shrink-0 mt-1" size={22} />
            <div className="text-left">
              <h3 className="font-semibold mb-1">24/7 Support</h3>
              <p className="text-gray-300">Get help whenever you need it</p>
            </div>
          </div>
        </div>

        {/* Keywords Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Optimized For Popular Keywords</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {['Technical Skills', 'Leadership', 'Project Management', 'Problem Solving', 'Team Collaboration', 
              'Communication', 'Data Analysis', 'Strategic Planning', 'Process Improvement', 'Customer Service',
              'Sales', 'Marketing', 'Full Stack', 'React', 'Node.js', 'Python', 'SQL', 'Machine Learning',
              'UX/UI Design', 'Agile', 'Scrum', 'Product Management'].map((keyword, index) => (
              <span key={index} className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-full text-sm">
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-xl p-10 backdrop-blur-sm max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 backdrop-blur-sm"></div>
          <h2 className="text-3xl font-bold mb-4">Ready to stand out from the competition?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Create an ATS-optimized resume in minutes and increase your chances of landing your dream job.
          </p>
          <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold shadow-lg shadow-indigo-700/30 transition-all duration-200 transform hover:translate-y-[-2px] flex items-center justify-center mx-auto">
            Get Started For Free
            <ArrowRight size={20} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
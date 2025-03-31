import React, { useEffect, useRef, useState } from "react";
import { generateResumeApi } from "../../services/userServices";
import { useParams } from "react-router-dom";
import { filterResumeData } from "../../utils/filterResumeData";
import ResumeLayout from "./ResumeLayout";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const Resume = () => {
  const resumeRef = useRef();
  const [generatedResume, setGeneratedResume] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { id } = useParams();
  
  const downloadPDF = async () => {
    const element = resumeRef.current;
    
    try {
      // Force specific dimensions to ensure content fits
      const originalWidth = element.offsetWidth;
      const originalHeight = element.offsetHeight;
      
      // Create canvas from the resume content
      const canvas = await html2canvas(element, { 
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: originalWidth,
        height: originalHeight,
        // Important to capture the full height
        windowHeight: originalHeight
      });
      
      const imgData = canvas.toDataURL("image/png");
      
      // Create PDF with A4 dimensions
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });
      
      // Get page dimensions
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate image dimensions to fit within the page width
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Check if content needs multiple pages
      let heightLeft = imgHeight;
      let position = 0;
      
      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      // Add subsequent pages if needed
      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save("resume.pdf");
    } catch (err) {
      console.error("Error generating PDF:", err);
      setError("Failed to generate PDF: " + err.message);
    }
  };

  const generateResume = async () => {
    try {
      const response = await generateResumeApi(id);
      const filteredResume = filterResumeData(
        response.resume.replace(/\*/g, "")
      );
      setGeneratedResume(filteredResume);

      setLoading(false);
    } catch (error) {
      console.error("Error generating resume:", error);
      setError("Failed to generate resume. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    generateResume();
  }, [id]);

  return (
    <div className="bg-gray-800 min-h-screen text-white p-4">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <p>Loading resume...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div 
            ref={resumeRef} 
            className="bg-white w-full max-w-3xl"
            style={{ 
              // These ensure all content is rendered for capture
              overflow: "visible",
              position: "relative"
            }}
          >
            <ResumeLayout {...generatedResume} />
          </div>
          <button
            onClick={downloadPDF}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default Resume;
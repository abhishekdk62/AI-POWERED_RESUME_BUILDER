import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

import { Trash, Trash2, X } from "lucide-react";
import { getResumeApi, removeResumeApi } from "../../services/userServices";
const ResumeList = ({ setSelectedTab, setResumeId }) => {
  const [resumeList, setResumeList] = useState([]);
  const navigate = useNavigate();
  const getResume = async () => {
    try {
      const response = await getResumeApi();
      setResumeList(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getResume();
  }, []);
  const handleClick = (id) => {
    navigate(`/resume/${id}`);
  };

  const removeResumeHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this resume!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeResume(id);
      }
    });
  };

  const removeResume = async (id) => {
    try {
      const response = await removeResumeApi(id);

      toast.success("Resume Removed", {
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
      
      getResume()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
        <div className="max-w-7xl mx-auto bg-gray-800 rounded-xl shadow-xl p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Your Resumes</h1>
          <div className="grid grid-cols-3 gap-10">
            {resumeList.map((resume) => (
              <div
                onClick={() => handleClick(resume._id)}
                key={resume._id}
                className="transition-all duration-300 hover:scale-105  cursor-pointer"
              >
                <div
                  className="bg-gray-700 rounded-2xl flex flex-col gap-3 hover:shadow-[0_0_15px_5px_rgba(59,130,246,0.3)]
 justify-center items-center h-100 p-6"
                >
                  <Trash2
                    onClick={(e) => {
                      
                      e.stopPropagation(); // Prevents the click event from bubbling up

                      removeResumeHandler(resume._id)}}
                    className=" hover:text-red-400 absolute mb-85 ml-80  "
                  />

                  <h1 className="text-center uppercase text-2xl">
                    {resume.personalInfo.fullName}
                  </h1>

                  <div className="flex uppercase gap-4">
                    {resume.education.map((d, i) => (
                      <h1 key={i} className="text-center text-2xl">
                        {d.degree}
                      </h1>
                    ))}
                  </div>

                  {resume.skills.length > 0 ? (
                    <div className="flex gap-4 text-center text-2xl">
                      Skills:
                      {resume.skills.map((s, i) => (
                        <h1 key={i} className="text-center uppercase text-2xl">
                          {s}
                        </h1>
                      ))}
                    </div>
                  ) : null}
                </div>

                <h1 className="text-xl uppercase text-center mt-2">
                  {resume.title}
                </h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeList;

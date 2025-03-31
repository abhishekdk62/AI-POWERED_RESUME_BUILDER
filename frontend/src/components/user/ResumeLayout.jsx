import React from "react";
import "./CustomHeading.css";

const ResumeLayout = ({
  header,
  summary,
  technicalSkills,
  experience,
  projects,
  education,
  languages,
}) => {
  
  return (
    <div
      id="resume-content"
      style={{
        maxWidth: "48rem", // equivalent to Tailwind's max-w-3xl
        backgroundColor: "#ffffff", // bg-white
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)", // shadow-lg
        paddingBottom: "2rem", // p-8
        paddingLeft: "2rem", // p-8
        paddingRight: "2rem", // p-8
        paddingTop: "1rem", // p-8
        color: "#1F2937", // text-gray-800
        borderRadius: "0.5rem", // rounded-lg
      }}
    >
      <header
        style={{
          borderBottom: "1px solid #D1D5DB",
          paddingBottom: "1rem", // pb-4
          marginBottom: "1rem", // mb-6
        }}
      >
        <h1
          className="custom-heading "
          style={{
            textTransform: "uppercase",
            fontSize: "2.25rem", // text-4xl
            textAlign: "center", // text-center
            fontWeight: "700", // font-bold
            color: "#111827", // text-gray-900
          }}
        >
          {header.name}
        </h1>
        <h2
          style={{
            textTransform: "uppercase",

            fontSize: "1.125rem", // text-lg
            textAlign: "center", // text-center
            fontWeight: "500", // font-medium
            color: "#031249", // text-blue-700
            marginTop: "0.25rem", // mt-1
          }}
        >
          {header.title}
        </h2>
        <p
          style={{
            color: "#000000", // text-blue-800

            fontSize: "0.875rem",
            textAlign: "center",
            color: "#4B5563",
            marginTop: "0.5rem",
          }}
        >
          {header.contact}
        </p>
      </header>

      <section style={{ marginBottom: "1rem" }}>
        <h3
          className="custom-heading "
          style={{
            textTransform: "uppercase",

            fontSize: "1.25rem",
            fontWeight: "600",
            color: "#031249",
            borderBottom: "1px solid #E5E7EB", // border-b and border-gray-200
            paddingBottom: "0.5rem", // pb-2
          }}
        >
          Professional Summary
        </h3>
        <p
          style={{
            marginTop: "0.75rem", // mt-3
            lineHeight: "1.625", // leading-relaxed
            color: "#000000", // text-blue-800
          }}
        >
          {summary}
        </p>
      </section>

{experience.length>0?      <section style={{ marginBottom: "1rem" }}>
        <h3
          className="custom-heading "
          style={{
            textTransform: "uppercase",

            fontSize: "1.25rem",
            fontWeight: "600",
            color: "#031249",
            borderBottom: "1px solid #E5E7EB",
            paddingBottom: "0.5rem",
          }}
        >
          Professional Experience
        </h3>
        <div
          style={{
            color: "#000000", // text-blue-800

            marginTop: "0.75rem",
            whiteSpace: "pre-wrap", // whitespace-pre-wrap
            lineHeight: "1.625",
          }}
        >
          <div className="font-bold" style={{ color: "#000000" }}>
            {experience.split("\n")[0]}
          </div>
          {experience.split("\n").splice(1, experience.length)}
        </div>
      </section>:null}
      {/* Projects */}
     {projects.length>0?<section style={{ marginBottom: "1rem" }}>
        <h3
          className="custom-heading "
          style={{
            textTransform: "uppercase",

            fontSize: "1.25rem",
            fontWeight: "600",
            color: "#031249",
            borderBottom: "1px solid #E5E7EB",
            paddingBottom: "0.5rem",
          }}
        >
          Projects
        </h3>
        <div
          style={{
            color: "#000000", // text-blue-800

            marginTop: "0.75rem",
            whiteSpace: "pre-wrap",
            lineHeight: "1.625",
          }}
        >
          <div className="font-bold" style={{ color: "#000000" }}>
            {projects.split("\n")[0]}
          </div>
          {projects.split("\n").splice(1, projects.length)}
        </div>
      </section>
:null}
      {/* Education */}
      <section style={{ marginBottom: "1rem" }}>
        <h3
          className="custom-heading "
          style={{
            textTransform: "uppercase",

            fontSize: "1.25rem",
            fontWeight: "600",
            color: "#031249",
            borderBottom: "1px solid #E5E7EB",
            paddingBottom: "0.5rem",
          }}
        >
          Qualifications
        </h3>
        <div
          className="flex"
          style={{
            color: "#000000", // text-blue-800

            marginTop: "0.75rem",
            whiteSpace: "pre-wrap",
            lineHeight: "1.625",
          }}
        >
          <div className="font-bold">{education.split("|")[0]}</div>
          {education.split("|").splice(1, education.length).join("|")}
        </div>
      </section>
      <section style={{ marginBottom: "1rem" }}>
        <h3
          className="custom-heading "
          style={{
            textTransform: "uppercase",

            fontSize: "1.25rem",
            fontWeight: "600",
            color: "#031249",
            borderBottom: "1px solid #E5E7EB",
            paddingBottom: "0.5rem",
          }}
        >
          Skills
        </h3>
        <p
          style={{
            marginTop: "0.75rem",
            color: "#000000", // text-blue-800

            lineHeight: "1.625",
          }}
        >
          <div className="flex">
            {" "}
            <div className="font-bold" style={{ color: "#000000" }}>
              Technical:
            </div>
            {technicalSkills}
          </div>
          <div className="flex">
            <div className="font-bold" style={{ color: "#000000" }}>
              Languages Known:
            </div>
            {languages}
          </div>
        </p>
      </section>
    </div>
  );
};

export default ResumeLayout;

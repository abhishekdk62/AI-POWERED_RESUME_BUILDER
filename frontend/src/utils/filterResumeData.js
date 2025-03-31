export const filterResumeData = (text) => {
    // Split the text into lines, trim each line, and filter out empty lines
    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
  
    const header = {
      name: lines[0] || "",
      title: lines[1] || "",
      contact: lines[2] || "",
    };
  
    const sections = [
      "Summary",
      "Technical Skills",
      "Experience",
      "Projects",
      "Education",
      "Languages",
    ];
    let indices = {};
  
    sections.forEach((section) => {
      indices[section] = lines.findIndex(
        (l) => l.toLowerCase() === section.toLowerCase()
      );
    });
  
    const getSectionContent = (startHeader, lastHeader) => {
      const startIndex = indices[startHeader] + 1;
      const lastIndex = lastHeader ? indices[lastHeader] : lines.length;
      return lines.slice(startIndex, lastIndex).join("\n");
    };
  
    const structuredResume = {
      header,
      summary: indices["Summary"] !== -1 ? getSectionContent("Summary", "Technical Skills") : "",
      technicalSkills:
        indices["Technical Skills"] !== -1
          ? getSectionContent("Technical Skills", "Experience")
          : "",
      experience:
        indices["Experience"] !== -1
          ? getSectionContent("Experience", "Projects")
          : "",
      projects:
        indices["Projects"] !== -1
          ? getSectionContent("Projects", "Education")
          : "",
      education:
        indices["Education"] !== -1
          ? getSectionContent("Education", "Languages")
          : "",
      languages:
        indices["Languages"] !== -1 ? getSectionContent("Languages") : "",
    };
  
    return structuredResume;
  };
  
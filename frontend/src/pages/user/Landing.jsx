import React, { useState } from "react";
import Headerc from "../../components/user/Headerc";
import ResumeBodyc from "../../components/user/ResumeBodyc";
import ResumeList from "../../components/user/ResumeList";
import Resume from "./ResumeMain";
import About from "../../components/user/About";

const Landing = () => {
  const [selectedTab, setSelectedTab] = useState("home");

  return (
    <div>
      <Headerc setSelectedTab={setSelectedTab} />
      {selectedTab == "show" ? (
        <ResumeList setSelectedTab={setSelectedTab} />
      ) : null}

      {selectedTab == "create" ? (
        <ResumeBodyc setSelectedTab={setSelectedTab} />
      ) : null}
      {selectedTab == "resume" ? (
        <Resume setSelectedTab={setSelectedTab} />
      ) : null}
      {selectedTab == "home" ? (
        <About setSelectedTab={setSelectedTab} />
      ) : null}
    </div>
  );
};

export default Landing;

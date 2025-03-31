import React, { useState } from "react";
import Headerc from "../../components/user/Headerc";
import Resume from "../../components/user/Resume";

const ResumeMain = () => {
  const [selectedTab, setSelectedTab] = useState("");

  return (
    <div>
      <Headerc setSelectedTab={setSelectedTab} />
      <Resume />
    </div>
  );
};

export default ResumeMain;

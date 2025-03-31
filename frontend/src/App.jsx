import React, { useEffect } from "react";
import Signup from "./pages/user/signup";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./pages/user/Signin";
import Landing from "./pages/user/Landing";
import { getuserApi } from "./services/userServices";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./slices/authSlice";
import Resume from "./pages/user/ResumeMain";
import ProtectUser from "./protectedRoutes/protectUser";

import ProtectAuths from "./protectedRoutes/ProtectAuths";
const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await getuserApi();
        dispatch(login({ uid: response.user.id, role: response.user.role }));
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/signup"
            element={
              <ProtectAuths>
                <Signup />
              </ProtectAuths>
            }
          />
          <Route
            path="*"
            element={
              <ProtectAuths>
                <Signin />
              </ProtectAuths>
            }
          />

          <Route
            path="/home"
            element={
              <ProtectUser>
                <Landing />
               </ProtectUser>
            }
          />
          <Route
            path="/resume/:id"
            element={
              // <ProtectUser>
                <Resume />
              // </ProtectUser>
            }
          />

        </Routes>
      </Router>
      <Toaster />
    </div>
  );
};

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./Layout";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { dataObj } from "./context/authContext/AuthContext";
import { useEffect, useState } from "react";
import { getUserDetails } from "./api/auth";

function App() {
  const { user, dispatch } = dataObj();
  const [isLoggedin, setIsLoggedin] = useState(false);
  useEffect(() => {
    if (!isLoggedin) {
      getUserDetails()
        .then((res) => res.data)
        .then((data) => {
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: data?.data?.user,
          });
          setIsLoggedin(true);
        })
        .catch((err) => {});
    }
  }, []);

  return (
    <BrowserRouter>
      {user ? (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<Feed />} />
            <Route path="profile/:id" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Login setIsLoggedin={setIsLoggedin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;

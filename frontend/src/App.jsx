import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./Layout";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { AuthProvider, data } from "./context/authContext/AuthContext";

function App() {
  const userData = data();
  return (
    <AuthProvider>
      <BrowserRouter>
        {userData.user ? (
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="" element={<Feed />} />
              <Route path="profile/:id" element={<Profile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

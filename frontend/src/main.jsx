import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ErrorProvider } from "./context/errorContext/errorContext.jsx";
import { AuthProvider } from "./context/authContext/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <ErrorProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ErrorProvider>
);

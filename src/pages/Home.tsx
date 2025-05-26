import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth.service";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
      {/* Logo */}
      <img
        src="/icons/easygenerator-seeklogo.svg"
        alt="Easygenerator Logo"
        className="h-18 w-auto mb-8"
      />

      {/* Welcome message */}
      <h1 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
        Welcome to the application.
      </h1>

      {/* Logout button */}
      <button
        onClick={handleLogout}
        className="mt-4 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition shadow"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;

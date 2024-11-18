import { useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Menu from "./Components/Menu";
import SendMoney from "./Components/SendMoney";
import AddMoney from "./Components/AddMoney";
import RequestMoney from "./Components/RequestMoney";
import ShowTransactions from "./Components/ShowTransactions";
import SendRequestMoney from "./Components/SendRequestMoney";
import Home from "./Components/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import VerifyUser from "./Pages/VerifyUser";
import Logout from "./Pages/Logout";
import ProtectedRoute from "./Components/ProtectedRoute";
import Logo from "/Wezire-Logo.png";



function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to /home if token exists and user visits "/"
  useEffect(() => {
    if (location.pathname === "/") {
      const token = localStorage.getItem("token");
      if (token) {
        navigate("/home");
      }
    }
  }, [location.pathname, navigate]);

  // Define main content routes for conditional rendering
  const mainContentRoutes = [
    "/home",
    "/sendMoney",
    "/addMoney",
    "/requestMoney",
    "/showTransactions",
    "/sendRequestMoney",
  ];

  const isMainContentRoute = mainContentRoutes.includes(location.pathname);

  // Navigation handler for register/login buttons
  const clickHandler = (route: string) => {
    navigate(`/${route}`);
  };

  return (
    <div className="w-screen h-screen bg-custom-gradient p-3 flex flex-col items-center gap-5 relative overflow-hidden">
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-user" element={<VerifyUser />} />
        <Route path="/logout" element={<Logout />} />

      </Routes>

      {/* Render the welcome screen if on the root path */}
      {location.pathname === "/" && (
        <div className="absolute inset-0 bg-no-repeat bg-center opacity-100 pointer-events-none"
          style={{
            backgroundImage: `url(${Logo})`,
            backgroundSize: "500px 500px",
            backgroundPosition: "center center",
            zIndex: 0,
          }}
        ></div>
      )}

      {location.pathname === "/" && (
        <div className="z-10 w-full h-full flex flex-col items-center gap-3">
          <div className="w-full h-full flex justify-end p-5 gap-5">
            <button
              className="w-fit h-fit px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg rounded-lg shadow-md hover:scale-105 hover:shadow-lg focus:ring-4 focus:ring-blue-300 transition-all duration-300"
              onClick={() => clickHandler("register")}
            >
              Register
            </button>
            <button
              className="w-fit h-fit px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold text-lg rounded-lg shadow-md hover:scale-105 hover:shadow-lg focus:ring-4 focus:ring-green-300 transition-all duration-300"
              onClick={() => clickHandler("login")}
            >
              Login
            </button>
          </div>
        </div>
      )}

      {/* Render main content for authenticated routes */}
      {isMainContentRoute && (
        <div className="z-10 w-full h-full flex flex-col items-center gap-3">
          <div className="w-5/6 h-fit p-3 bg-blue-950 text-white opacity-85 rounded-lg">
            <Navbar />
          </div>
          <div className="w-5/6 flex-1 flex justify-between gap-5">
            {/* Sidebar Menu */}
            <div className="w-1/4 h-fit p-6 rounded-lg bg-white/10 backdrop-blur-md shadow-lg border border-white/20">
              <Menu />
            </div>

            {/* Main content */}
            <div className="w-full h-full p-6 rounded-lg bg-white/10 backdrop-blur-md shadow-lg border border-white/20 relative">
              {/* Background Layer */}
              <div
                className="absolute inset-0 bg-no-repeat bg-center pointer-events-none"
                style={{
                  backgroundImage: `url(${Logo})`,
                  backgroundSize: "500px 500px",
                  backgroundPosition: "center center",
                  opacity: 0.4, // Opacity applied only to the background
                  zIndex: 0,
                }}
              ></div>

              {/* Content Layer */}
              <div className="relative z-10 h-full w-full">
                <div className="h-full w-full overflow-y-auto">
                  <Routes>
                    <Route path="/home" element={<ProtectedRoute component={Home} />} />
                    <Route path="/sendMoney" element={<ProtectedRoute component={SendMoney} />} />
                    <Route path="/addMoney" element={<ProtectedRoute component={AddMoney} />} />
                    <Route path="/requestMoney" element={<ProtectedRoute component={RequestMoney} />} />
                    <Route path="/showTransactions" element={<ProtectedRoute component={ShowTransactions} />} />
                    <Route path="/sendRequestMoney" element={<ProtectedRoute component={SendRequestMoney} />} />
                  </Routes>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default App;

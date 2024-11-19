import { useEffect, useState } from "react";
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
import Logout from "./Pages/Logout";
import ProtectedRoute from "./Components/ProtectedRoute";
import Logo from "/Wezire-Logo.png";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (location.pathname === "/") {
      const token = localStorage.getItem("token");
      if (token) {
        navigate("/home");
      }
    }
  }, [location.pathname, navigate]);

  const mainContentRoutes = [
    "/home",
    "/sendMoney",
    "/addMoney",
    "/requestMoney",
    "/showTransactions",
    "/sendRequestMoney",
  ];

  const isMainContentRoute = mainContentRoutes.includes(location.pathname);

  const clickHandler = (route: string) => {
    navigate(`/${route}`);
  };

  return (
    <div className="w-screen h-screen bg-custom-gradient p-3 flex flex-col items-center gap-5 relative over">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>

      {location.pathname === "/" && (
        <div
          className="absolute inset-0 bg-no-repeat bg-center opacity-100 pointer-events-none"
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

      {isMainContentRoute && (
        <div className="z-10 w-full h-full flex flex-col gap-1 items-center overflow-hidden">
          <div className="w-5/6 h-fit p-1 bg-blue-950 text-white opacity-85 rounded-lg">
            <Navbar />
          </div>
          <div className="w-5/6 flex-1 flex justify-between gap-5 h-full">
            <div className="w-1/5 h-fit p-6 rounded-lg bg-white/10 backdrop-blur-md shadow-lg border border-white/20 hidden lg:block">
              <Menu setIsMenuOpen={setIsMenuOpen} />
            </div>
            <div className="w-full lg:w-4/5 rounded-lg bg-white/10 backdrop-blur-none shadow-lg border border-white/20 relative overflow-y-auto">
              <div
                className="absolute inset-0 bg-no-repeat bg-center pointer-events-none"
                style={{
                  backgroundImage: `url(${Logo})`,
                  backgroundSize: "500px 500px",
                  backgroundPosition: "center center",
                  opacity: 0.4,
                  zIndex: 0,
                  backdropFilter: "blur(10px)",
                }}
              ></div>
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
          <div className="lg:hidden absolute top-5 left-5 z-20">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white text-3xl">
              ☰
            </button>
          </div>
          {isMenuOpen && (
            <div className="lg:hidden absolute top-0 left-0 w-full h-full bg-white/10 backdrop-blur-md p-6 z-10">
              <Menu setIsMenuOpen={setIsMenuOpen} /> {/* Use setIsMenuOpen */}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;


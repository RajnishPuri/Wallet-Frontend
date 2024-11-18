import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Menu from "./Components/Menu";
import SendMoney from "./Components/SendMoney";
import AddMoney from "./Components/AddMoney";
import RequestMoney from "./Components/RequestMoney";
import ShowTransactions from "./Components/ShowTransactions";
import SendRequestMoney from "./Components/SendRequestMoney";
import { useLocation } from "react-router-dom";
import Home from "./Components/Home";
import Logo from '/Wezire-Logo.png';
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import VerifyUser from "./Pages/VerifyUser";
import Logout from "./Pages/Logout";

function App() {
  const location = useLocation();

  const navigate = useNavigate();

  const mainContentRoutes = [
    "/home",
    "/sendMoney",
    "/addMoney",
    "/requestMoney",
    "/showTransactions",
    "/sendRequestMoney",
  ];

  const isMainContentRoute = mainContentRoutes.includes(location.pathname);

  function clickHandler(e: string) {
    navigate(`/${e}`);
  }

  return (
    <div className="w-screen h-screen bg-custom-gradient p-3 flex flex-col items-center gap-5 relative">
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


      {/* Main Content */}
      <div className="z-10 w-full h-full flex flex-col items-center gap-3">
        {isMainContentRoute && (
          <>
            <div className="w-5/6 h-fit p-3 bg-blue-950 text-white opacity-85 rounded-lg">
              <Navbar />
            </div>
            <div className="w-5/6 flex-1 flex justify-between gap-5">
              <div className="w-1/4 h-fit p-6 rounded-lg bg-white/10 backdrop-blur-md shadow-lg border border-white/20">
                <Menu />
              </div>
              <div className="w-full h-full p-6 rounded-lg bg-white/10 backdrop-blur-md shadow-lg border border-white/20 relative">
                <div
                  className="absolute inset-0 bg-no-repeat bg-center opacity-40 pointer-events-none"
                  style={{
                    backgroundImage: `url(${Logo})`,
                    backgroundSize: "500px 500px",
                    backgroundPosition: "center center",
                    zIndex: 0,
                  }}
                ></div>
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/sendMoney" element={<SendMoney />} />
                  <Route path="/addMoney" element={<AddMoney />} />
                  <Route path="/requestMoney" element={<RequestMoney />} />
                  <Route path="/showTransactions" element={<ShowTransactions />} />
                  <Route path="/sendRequestMoney" element={<SendRequestMoney />} />
                  <Route path="/logout" element={<Logout />} />
                </Routes>
              </div>
            </div>
          </>
        )}
        {location.pathname === "/" && (
          <div className="w-full h-full flex justify-end p-5 gap-5">
            <div>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg rounded-lg shadow-md hover:scale-105 hover:shadow-lg focus:ring-4 focus:ring-blue-300 transition-all duration-300" onClick={() => clickHandler("register")}>
                Register
              </button>
            </div>
            <div>
              <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold text-lg rounded-lg shadow-md hover:scale-105 hover:shadow-lg focus:ring-4 focus:ring-green-300 transition-all duration-300" onClick={() => clickHandler("login")}>
                Login
              </button>
            </div>
          </div>

        )}
      </div>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-user" element={<VerifyUser />} />
      </Routes>
    </div>
  );
}

export default App;

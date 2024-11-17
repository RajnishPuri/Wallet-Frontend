import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Menu from "./Components/menu";
import SendMoney from "./Components/SendMoney";
import AddMoney from "./Components/AddMoney";
import RequestMoney from "./Components/RequestMoney";
import ShowTransactions from "./Components/ShowTransactions";
import SendRequestMoney from "./Components/SendRequestMoney";
// import Home from "./Components/Home";

function App() {
  return (
    <div className="w-screen h-screen bg-custom-gradient p-3 flex flex-col items-center gap-5">
      <div className="w-5/6 h-fit p-3 bg-blue-950 text-white opacity-85 rounded-lg">
        <Navbar />
      </div>
      <div className="w-5/6 flex-1 flex justify-between gap-5">
        <div className="w-1/4 h-fit p-6 rounded-lg bg-white/10 backdrop-blur-md shadow-lg border border-white/20">
          <Menu />
        </div>
        <div className="w-full h-full p-6 rounded-lg bg-white/10 backdrop-blur-md shadow-lg border border-white/20">
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/sendMoney" element={<SendMoney />} />
            <Route path="/addMoney" element={<AddMoney />} />
            <Route path="/requestMoney" element={<RequestMoney />} />
            <Route path="/showTransactions" element={<ShowTransactions />} />
            <Route path="/sendRequestMoney" element={<SendRequestMoney />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;



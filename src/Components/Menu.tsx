import { useNavigate, useLocation } from "react-router-dom";

const Menu: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const clickHandler = (path: string) => {
        navigate(`/${path}`);
    };

    // Define a function to check if the current path matches
    const isActive = (path: string) => location.pathname === `/${path}`;

    return (
        <div>
            <ul>
                <li
                    className={`text-center text-lg font-medium cursor-pointer ${isActive("sendMoney")
                        ? "text-blue-950 font-bold"
                        : "text-white hover:text-cyan-300"
                        }`}
                    onClick={() => clickHandler("sendMoney")}
                >
                    Send Money
                </li>
                <li
                    className={`text-center text-lg font-medium cursor-pointer mt-4 ${isActive("addMoney")
                        ? "text-blue-950 font-bold"
                        : "text-white hover:text-cyan-300"
                        }`}
                    onClick={() => clickHandler("addMoney")}
                >
                    Add Money
                </li>
                <li
                    className={`text-center text-lg font-medium cursor-pointer mt-4 ${isActive("requestMoney")
                        ? "text-blue-950 font-bold"
                        : "text-white hover:text-cyan-300"
                        }`}
                    onClick={() => clickHandler("requestMoney")}
                >
                    Request Money
                </li>
                <li
                    className={`text-center text-lg font-medium cursor-pointer mt-4 ${isActive("showTransactions")
                        ? "text-blue-950 font-bold"
                        : "text-white hover:text-cyan-300"
                        }`}
                    onClick={() => clickHandler("showTransactions")}
                >
                    Show Transactions
                </li>
                <li
                    className={`text-center text-lg font-medium cursor-pointer mt-4 ${isActive("sendRequestMoney")
                        ? "text-blue-950 font-bold"
                        : "text-white hover:text-cyan-300"
                        }`}
                    onClick={() => clickHandler("sendRequestMoney")}
                >
                    Send Request Money
                </li>
                <li
                    className={`text-center text-lg font-medium cursor-pointer mt-4 ${isActive("logout")
                        ? "text-blue-950 font-bold"
                        : "text-white hover:text-cyan-300"
                        }`}
                    onClick={() => clickHandler("logout")}
                >
                    Logout
                </li>
            </ul>
        </div>
    );
};

export default Menu;

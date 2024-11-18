import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Menu: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const clickHandler = (path: string) => {
        navigate(`/${path}`);
    };

    const handleLogout = async () => {
        try {
            // Call backend logout endpoint
            await axios.post("http://localhost:3000/api/v1/auth/logout", null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass the token in the header
                },
            });

            // Clear token from localStorage
            localStorage.removeItem("token");

            // Redirect to login page
            navigate("/login");
        } catch (error) {
            console.error("Error during logout:", error);
            alert("An error occurred while logging out. Please try again.");
        }
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
                    onClick={handleLogout}
                >
                    Logout
                </li>
            </ul>
        </div>
    );
};

export default Menu;

import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const server = import.meta.env.VITE_SERVER;
console.log(server);

interface MenuProps {
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Menu: React.FC<MenuProps> = ({ setIsMenuOpen }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const clickHandler = (path: string) => {
        navigate(`/${path}`);
        setIsMenuOpen(false);
    };

    const handleLogout = async () => {
        try {
            await axios.post(`${server}/api/v1/auth/logout`, null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            localStorage.removeItem("token");
            navigate("/login");
            setIsMenuOpen(false);
        } catch (error) {
            console.error("Error during logout:", error);
            alert("An error occurred while logging out. Please try again.");
        }
    };

    const isActive = (path: string) => location.pathname === `/${path}`;

    return (
        <div>
            <ul>
                <li
                    className={`text-center text-lg font-medium cursor-pointer ${isActive("sendMoney") ? "text-blue-950 font-bold" : "text-white hover:text-cyan-300"
                        }`}
                    onClick={() => clickHandler("sendMoney")}
                >
                    Send Money
                </li>
                <li
                    className={`text-center text-lg font-medium cursor-pointer mt-4 ${isActive("addMoney") ? "text-blue-950 font-bold" : "text-white hover:text-cyan-300"
                        }`}
                    onClick={() => clickHandler("addMoney")}
                >
                    Add Money
                </li>
                <li
                    className={`text-center text-lg font-medium cursor-pointer mt-4 ${isActive("requestMoney") ? "text-blue-950 font-bold" : "text-white hover:text-cyan-300"
                        }`}
                    onClick={() => clickHandler("requestMoney")}
                >
                    Request Money
                </li>
                <li
                    className={`text-center text-lg font-medium cursor-pointer mt-4 ${isActive("showTransactions") ? "text-blue-950 font-bold" : "text-white hover:text-cyan-300"
                        }`}
                    onClick={() => clickHandler("showTransactions")}
                >
                    Show Transactions
                </li>
                <li
                    className={`text-center text-lg font-medium cursor-pointer mt-4 ${isActive("sendRequestMoney") ? "text-blue-950 font-bold" : "text-white hover:text-cyan-300"
                        }`}
                    onClick={() => clickHandler("sendRequestMoney")}
                >
                    Send Request Money
                </li>
                <li
                    className={`text-center text-lg font-medium cursor-pointer mt-4 ${isActive("logout") ? "text-blue-950 font-bold" : "text-white hover:text-cyan-300"
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

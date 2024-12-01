import { useState, useEffect } from "react";
import axios from "axios";

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

interface UserDetails {
    Name: string;
    Email: string;
    AccountNumber: string;
    Balance: number;
}

const Home = () => {
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    setError("Unauthorized: No token provided.");
                    setLoading(false);
                    return;
                }

                const response = await axios.get<ApiResponse<UserDetails>>(
                    "https://wallet-backend-1-sqp6.onrender.com/api/v1/getUserDetails",
                    {
                        headers: {
                            Authorization: `${token}`,
                        },
                        withCredentials: true,
                    }
                );
                setUserDetails(response.data.data);
                setLoading(false);
            } catch (err: any) {
                setError("Failed to fetch user details.");
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className=" h-[36rem]">
            <div className="flex flex-col items-center text-center space-y-6 overflow-y-auto mb-16">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                    Welcome to Wezire Bank,
                </h1>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-white">
                    {userDetails?.Name}!
                </h1>
                <p className="text-white sm:text-lg lg:text-xl max-w-2xl mb-6">
                    At Wezire Bank, we are dedicated to providing you with secure, reliable,
                    and efficient banking services. Whether you're managing your savings,
                    tracking your transactions, or planning for the future, Wezire Bank is here
                    to support you every step of the way.
                    At Wezire Bank, we are dedicated to providing you with secure, reliable,
                    and efficient banking services. Whether you're managing your savings,
                    tracking your transactions, or planning for the future, Wezire Bank is here
                    to support you every step of the way.                    At Wezire Bank, we are dedicated to providing you with secure, reliable,
                    and efficient banking services. Whether you're managing your savings,
                    tracking your transactions, or planning for the future, Wezire Bank is here
                    to support you every step of the way.
                </p>
                <p className="text-white sm:text-lg lg:text-xl max-w-2xl mb-6">
                    Explore our advanced online banking platform to access your account details,
                    manage your funds, and enjoy seamless banking from the comfort of your home.
                    We value your trust and strive to exceed your expectations every day.
                </p>
            </div>

            <footer className="w-full py-4 text-white text-center mt-auto">
                © {new Date().getFullYear()} Wezire Bank. All Rights Reserved.
            </footer>
        </div>
    );


};

export default Home;

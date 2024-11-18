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
                // Retrieve the token from localStorage or sessionStorage
                const token = localStorage.getItem("token");
                console.log(token);

                if (!token) {
                    setError("Unauthorized: No token provided.");
                    setLoading(false);
                    return;
                }

                // Send request with Authorization header
                const response = await axios.get<ApiResponse<UserDetails>>(
                    "http://localhost:3000/api/v1/getUserDetails",
                    {
                        headers: {
                            Authorization: `${token}`, // Add the token here
                        },
                        withCredentials: true, // If cookies are also required
                    }
                );

                console.log(response);
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
        <div className="w-full h-full flex flex-col justify-between text-white">
            <div className=" flex justify-center flex-col items-center">
                <h1 className="text-3xl font-bold mb-4">
                    Welcome to Wezire Bank,
                </h1>
                <h1 className="text-3xl font-bold mb-4">
                    {userDetails?.Name}!
                </h1>
                <p className="text-lg text-center max-w-2xl mb-6">
                    At Wezire Bank, we are dedicated to providing you with secure, reliable,
                    and efficient banking services. Whether you're managing your savings,
                    tracking your transactions, or planning for the future, Wezire Bank is here
                    to support you every step of the way.
                </p>
                <p className="text-lg text-center max-w-2xl mb-6">
                    Explore our advanced online banking platform to access your account details,
                    manage your funds, and enjoy seamless banking from the comfort of your home.
                    We value your trust and strive to exceed your expectations every day.
                </p>
            </div>
            <div>
                <footer className="w-full mt-auto py-4 text-white text-center">
                    © {new Date().getFullYear()} Wezire Bank. All Rights Reserved.
                </footer>
            </div>
        </div>
    );
};

export default Home;

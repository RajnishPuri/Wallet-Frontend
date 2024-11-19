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

export default function Navbar() {
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
                    "http://localhost:3000/api/v1/getUserDetails",
                    {
                        headers: {
                            Authorization: `${token}`, // Added Bearer prefix for clarity
                        },
                        withCredentials: true,
                    }
                );

                if (response.data.success) {
                    setUserDetails(response.data.data);
                } else {
                    setError(response.data.message); // Use the message from the API
                }
                setLoading(false);
            } catch (err: any) {
                console.error("Error fetching user details:", err); // Log the full error
                setError("Failed to fetch user details.");
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }

    return (
        <div className="flex flex-col space-y-1 md:flex-row md:space-x-12 p-1 shadow-md jus text-white rounded-md w-full">
            <div className="flex flex-col space-y-1">
                <div>
                    <span className="font-semibold">Account Number: </span>
                    {userDetails?.AccountNumber}
                </div>
                <div>
                    <span className="font-semibold">Name: </span>
                    {userDetails?.Name}
                </div>
            </div>
            <div className="flex flex-col space-y-1">
                <div>
                    <span className="font-semibold">Email: </span>
                    {userDetails?.Email}
                </div>
                <div>
                    <span className="font-semibold">Balance: </span>
                    ₹{userDetails?.Balance.toLocaleString()}
                </div>
            </div>
        </div>
    );
}

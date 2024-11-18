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
        <div className="flex justify-around p-2 shadow-md">
            <ul className="space-y-2">
                <li>Account Number: {userDetails?.AccountNumber}</li>
                <li>Name: {userDetails?.Name}</li>
            </ul>
            <ul className="space-y-2">
                <li>Email: {userDetails?.Email}</li>
                <li>Balance: ₹{userDetails?.Balance.toLocaleString()}</li>
            </ul>
        </div>
    );
}

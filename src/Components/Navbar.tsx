import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setUserDetails, setLoading, setError } from "../store/store";
import { RootState } from "../store/store";
import { RefreshCw } from "lucide-react"; // Import Lucide Refresh Icon

const server = import.meta.env.VITE_SERVER || "https://wallet-backend-1-sqp6.onrender.com";
console.log(server);

type ApiResponse<T> = {
    success: boolean;
    message: string;
    data: T;
};

interface UserDetails {
    Name: string;
    Email: string;
    AccountNumber: string;
    Balance: number;
}

export default function Navbar() {
    const dispatch = useDispatch();
    const { userDetails, loading, error } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        const fetchUserDetails = async () => {
            dispatch(setLoading(true));
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    dispatch(setError("Unauthorized: No token provided."));
                    dispatch(setLoading(false));
                    return;
                }

                const response = await axios.get<ApiResponse<UserDetails>>(
                    `${server}/api/v1/getUserDetails`,
                    {
                        headers: {
                            Authorization: `${token}`,
                        },
                        withCredentials: true,
                    }
                );

                if (response.data.success) {
                    dispatch(setUserDetails(response.data.data));
                } else {
                    dispatch(setError(response.data.message));
                }
            } catch (err) {
                dispatch(setError("Failed to fetch user details."));
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchUserDetails();
    }, [dispatch]);

    const refreshBalance = async () => {
        dispatch(setLoading(true));
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                dispatch(setError("Unauthorized: No token provided."));
                return;
            }

            const response = await axios.get<ApiResponse<UserDetails>>(
                `${server}/api/v1/getUserDetails`,
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                dispatch(setUserDetails(response.data.data));
            } else {
                dispatch(setError(response.data.message));
            }
        } catch (err) {
            dispatch(setError("Failed to refresh balance."));
        } finally {
            dispatch(setLoading(false));
        }
    };

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
                <div className="flex items-center space-x-2">
                    <span className="font-semibold">Balance: </span>
                    <span>₹{userDetails?.Balance.toLocaleString()}</span>
                    <RefreshCw
                        onClick={refreshBalance}
                        className="cursor-pointer text-gray-400 hover:text-white"
                        aria-label="Refresh Balance" // Use aria-label for accessibility
                    />
                </div>
            </div>
        </div>
    );
}

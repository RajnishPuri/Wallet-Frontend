import { useState } from "react";
import axios from "axios";
import Input from "./input";
import { CurrencyIcon, User } from "lucide-react";

const SendMoney = () => {
    const [toUser, setToUser] = useState("");
    const [amount, setAmount] = useState<number>(0); // Initialize as 0
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMoneyHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        setError("");
        setLoading(true);

        const token = localStorage.getItem("token");

        if (!token) {
            setError("You must be logged in to perform this action.");
            setLoading(false);
            return;
        }

        if (isNaN(amount) || amount <= 0) { // Validate numeric and positive amount
            setError("Please enter a valid amount greater than 0.");
            setLoading(false);
            return;
        }

        try {
            const response: any = await axios.post(
                "http://localhost:3000/api/v1/sendMoney",
                { toUser, amount },
                {
                    headers: {
                        Authorization: `${token}`, // Include token for authentication
                    },
                }
            );

            setMessage(response.data.message || "Money sent successfully!");
            setToUser("");
            setAmount(0);
        } catch (err: any) {
            setError(
                err.response?.data?.message || "An error occurred while processing your request."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex flex-col p-6 sm:p-8 w-full max-w-md rounded-lg mx-auto mt-8 overflow-y-auto max-h-[80vh]">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">
                Send Money
            </h2>
            <p className="text-white text-sm mb-6 text-center">
                Fill in the recipient's email and the amount you want to send. Ensure you have
                sufficient balance before proceeding.
            </p>
            <form onSubmit={sendMoneyHandler} className="space-y-4">
                {/* Recipient Email Input */}
                <div>
                    <label className="block text-white mb-2">Recipient's Email</label>
                    <Input
                        icon={User}
                        type="email"
                        placeholder="Recipient's email"
                        value={toUser}
                        onChange={(e) => setToUser(e.target.value)}
                    />
                </div>

                {/* Amount Input */}
                <div>
                    <label className="block text-white mb-2">Amount</label>
                    <Input
                        icon={CurrencyIcon}
                        type="number"
                        placeholder="Amount"
                        value={amount || ""} // Display empty string if amount is 0
                        onChange={(e) => setAmount(Number(e.target.value))} // Convert string to number
                    />
                </div>

                {/* Error Message */}
                {error && (
                    <div className="text-red-500 text-sm text-center">{error}</div>
                )}

                {/* Success Message */}
                {message && (
                    <div className="text-green-500 text-sm text-center">{message}</div>
                )}

                {/* Submit Button */}
                <div className="w-full flex justify-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`py-2 px-4 sm:py-2 sm:px-6 ${loading
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                            } text-white font-semibold rounded-lg transition duration-200`}
                    >
                        {loading ? "Processing..." : "Send Money"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SendMoney;

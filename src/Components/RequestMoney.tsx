import { useState } from "react";
import axios from "axios";
import Input from "./input";
import { Currency, User } from "lucide-react";

const RequestMoney = () => {
    const [senderAccountNumber, setSenderAccountNumber] = useState("");
    const [amount, setAmount] = useState<number>(0);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const requestMoneyHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        setError("");
        setLoading(true);

        if (amount <= 0) {
            setError("Please enter a valid amount greater than 0.");
            setLoading(false);
            return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
            setError("You must be logged in to perform this action.");
            setLoading(false);
            return;
        }

        try {
            const response: any = await axios.post(
                "https://wallet-backend-1-sqp6.onrender.com/api/v1/sendRequestMoney",
                { senderAccountNumber, amount },
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );

            setMessage(response.data.message || "Request sent successfully!");
            setSenderAccountNumber("");
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
                Request Money
            </h2>
            <p className="text-white text-sm mb-6 text-center">
                Enter the account number of the sender and the amount you want to request. Ensure you
                provide correct details before submitting your request.
            </p>
            <form onSubmit={requestMoneyHandler} className="space-y-4">
                {/* Sender Account Number Input */}
                <div>
                    <label className="block text-white mb-2">Sender's Account Number</label>
                    <Input
                        icon={User}
                        type="text"
                        placeholder="Sender's account number"
                        value={senderAccountNumber}
                        onChange={(e) => setSenderAccountNumber(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-white mb-2">Amount</label>
                    <Input
                        icon={Currency}
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value) || 0)}
                    />
                </div>

                {error && (
                    <div className="text-red-500 text-sm text-center">{error}</div>
                )}

                {message && (
                    <div className="text-green-500 text-sm text-center">{message}</div>
                )}

                <div className="w-full flex justify-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`py-2 px-4 sm:py-2 sm:px-6 ${loading
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-green-500 hover:bg-green-600"
                            } text-white font-semibold rounded-lg transition duration-200`}
                    >
                        {loading ? "Processing..." : "Request Money"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RequestMoney;

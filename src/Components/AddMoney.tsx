import { useState } from "react";
import axios from "axios";
import Input from "./input";
import { CurrencyIcon } from "lucide-react";

const server = import.meta.env.VITE_SERVER || "https://wallet-backend-1-sqp6.onrender.com";
console.log(server);

const AddMoney = () => {
    const [amount, setAmount] = useState<number>(0);
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

        if (isNaN(amount) || amount <= 0) {
            setError("Please enter a valid amount greater than 0.");
            setLoading(false);
            return;
        }

        try {
            const response: any = await axios.post(
                `${server}/api/v1/addMoney`,
                { amount },
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );

            setMessage(response.data.message || "Money sent successfully!");
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
                Add Money
            </h2>
            <p className="text-white text-sm mb-6 text-center">
                Enter the amount you want to add to your <span className="font-bold">Wezire Wallet</span>.
                You can add money up to <span className="font-bold">5 times a day</span>, with a limit of
                <span className="font-bold">₹500 per transaction</span>. Stay within the daily limit to continue adding funds.
            </p>

            <form onSubmit={sendMoneyHandler} className="space-y-4">
                <div>
                    <label className="block text-white mb-2">Amount</label>
                    <Input
                        icon={CurrencyIcon}
                        type="number"
                        placeholder="Amount"
                        value={amount || ""}
                        onChange={(e) => setAmount(Number(e.target.value))}
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
                            : "bg-blue-500 hover:bg-blue-600"
                            } text-white font-semibold rounded-lg transition duration-200`}
                    >
                        {loading ? "Processing..." : "Add Money"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddMoney;

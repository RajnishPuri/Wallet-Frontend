import { useState, useEffect } from "react";
import axios from "axios";


const server = import.meta.env.VITE_SERVER || "https://wallet-backend-1-sqp6.onrender.com";
console.log(server);
const ShowTransactions = () => {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("You must be logged in to view transactions.");
                    setLoading(false);
                    return;
                }

                const response: any = await axios.get(`${server}/api/v1/allTransactins`, {
                    headers: {
                        Authorization: `${token}`,
                    },
                });

                if (response.data.success) {
                    const sortedTransactions = response.data.alltansactions
                        .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

                    setTransactions(sortedTransactions);
                } else {
                    setError(response.data.message);
                }
            } catch (err) {
                setError("An error occurred while fetching transactions.");
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    const convertToIST = (utcTime: string) => {
        try {
            const date = new Date(utcTime);
            return date.toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
            });
        } catch {
            return "Invalid Date";
        }
    };

    return (
        <div className="relative flex flex-col p-4 w-full max-w-auto rounded-lg mx-auto max-h-[80vh] h-[38rem]">
            <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">
                    Transaction History
                </h2>
            </div>

            {error && (
                <div className="text-red-500 text-sm mt-2 text-center">{error}</div>
            )}

            {loading ? (
                <div className="text-white text-sm text-center">Loading...</div>
            ) : (
                <div className="relative h-[36rem] max-h-[70vh] overflow-y-auto">
                    {transactions.length === 0 ? (
                        <div className="text-white text-sm text-center">
                            No transactions found.
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {transactions.map((transaction: any) => (
                                <li
                                    key={transaction.transactionId}
                                    className={`flex flex-col space-y-2 p-4 rounded-lg ${transaction.transactionType === "credit"
                                        ? "bg-green-100"
                                        : "bg-red-100"
                                        }`}
                                >
                                    <div>
                                        <span className="font-semibold">From: </span>
                                        {transaction.from}
                                    </div>
                                    <div>
                                        <span className="font-semibold">To: </span>
                                        {transaction.sentTo}
                                    </div>
                                    <div>
                                        <span className="font-semibold">Time: </span>
                                        {convertToIST(transaction.createdAt)}
                                    </div>
                                    <div>
                                        <span className={`font-semibold ${transaction.transactionType === "credit"
                                            ? "text-green-600"
                                            : "text-red-600"
                                            }`}
                                        >
                                            {transaction.transactionType === "credit" ? "+" : "-"}₹
                                            {transaction.Amount}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default ShowTransactions;

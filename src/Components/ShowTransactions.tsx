import React, { useState, useEffect } from "react";
import axios from "axios";

const ShowTransactions = () => {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const token = localStorage.getItem("token"); // Retrieve token
                if (!token) {
                    setError("You must be logged in to view transactions.");
                    setLoading(false);
                    return;
                }

                const response: any = await axios.get("http://localhost:3000/api/v1/allTransactins", {
                    headers: {
                        Authorization: `${token}`,
                    },
                });

                if (response.data.success) {
                    setTransactions(response.data.alltansactions);
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

    // Convert UTC time to IST
    const convertToIST = (utcTime: string) => {
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
    };

    return (
        <div className="relative flex flex-col p-6 sm:p-8 w-full max-w-md rounded-lg mx-auto mt-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">
                Transaction History
            </h2>

            {/* Error Message */}
            {error && (
                <div className="text-red-500 text-sm mt-2 text-center">{error}</div>
            )}

            {/* Loading */}
            {loading ? (
                <div className="text-white text-sm text-center">Loading...</div>
            ) : (
                <div>
                    {transactions.length === 0 ? (
                        <div className="text-white text-sm text-center">No transactions found.</div>
                    ) : (
                        <div>
                            {transactions.map((transaction: any) => (
                                <div
                                    key={transaction.transactionId}
                                    className={`flex justify-between items-center mb-4 p-4 rounded-lg ${transaction.transactionType === "credit"
                                        ? "bg-green-100"
                                        : "bg-red-100"
                                        }`}
                                >
                                    <div className="flex flex-col">
                                        <span className="font-semibold">{transaction.from}</span>
                                        <span className="text-sm text-gray-600">
                                            {convertToIST(transaction.time)}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-sm">{transaction.sentTo}</span>
                                        <span
                                            className={`font-semibold ${transaction.transactionType === "credit"
                                                ? "text-green-600"
                                                : "text-red-600"
                                                }`}
                                        >
                                            {transaction.transactionType === "credit"
                                                ? "+" : "-"}₹{transaction.Amount}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ShowTransactions;

import React, { useState, useEffect } from "react";
import axios from "axios";

const SendRequestMoney = () => {
    const [pendingRequests, setPendingRequests] = useState<any[]>([]);
    const [completedRequests, setCompletedRequests] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const token = localStorage.getItem("token"); // Retrieve token
                if (!token) {
                    setError("You must be logged in to view requests.");
                    setLoading(false);
                    return;
                }

                const responsefirst: any = await axios.get(
                    "http://localhost:3000/api/v1/allRequestMoney",
                    {
                        headers: {
                            Authorization: `${token}`,
                        },
                    }
                );

                if (responsefirst.data.success) {
                    const { allRequesttMoney } = responsefirst.data;
                    // Separate pending and completed requests
                    const pending = allRequesttMoney.filter(
                        (request: any) => !request.Completed
                    );
                    const completed = allRequesttMoney.filter(
                        (request: any) => request.Completed
                    );
                    setPendingRequests(pending);
                    setCompletedRequests(completed);
                } else {
                    setError(responsefirst.data.message);
                }
            } catch (err) {
                setError("An error occurred while fetching requests.");
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    const handleCompletePayment = async (requestId: string) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("You must be logged in to complete payment.");
                return;
            }

            const response: any = await axios.post(
                "http://localhost:3000/api/v1/completeRequestMoney",
                { id: requestId },
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );

            if (response.data.success) {
                setPendingRequests((prevRequests) =>
                    prevRequests.filter((request) => request._id !== requestId)
                );
                setCompletedRequests((prevCompleted) => [
                    ...prevCompleted,
                    { ...response.data.request, Completed: true },
                ]);
                setError(""); // Clear any previous error
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError("An error occurred while completing the payment.");
        }
    };

    return (
        <div className="p-6 space-y-8 max-w-5xl mx-auto max-h-[80vh] h-[40rem] overflow-y-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white text-center">
                Pending Requests
            </h2>

            {error && <div className="text-red-500 text-center mb-4">{error}</div>}

            {loading ? (
                <div className="text-white text-center">Loading...</div>
            ) : (
                <div>
                    {pendingRequests.length === 0 ? (
                        <div className="text-center text-white">
                            No pending requests found.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pendingRequests.map((request: any) => (
                                <div
                                    key={request._id}
                                    className="p-4 border rounded-lg shadow-sm bg-white text-gray-800"
                                >
                                    <div className="mb-2">
                                        <strong>Request ID:</strong> {request._id}
                                    </div>
                                    <div className="mb-2">
                                        <strong>Amount:</strong> ₹{request.Amount}
                                    </div>
                                    <div className="mb-2">
                                        <strong>From:</strong> {request.from}
                                    </div>
                                    <div className="mb-2">
                                        <strong>Recipient:</strong>{" "}
                                        {request.reciepientEmail}
                                    </div>
                                    <button
                                        onClick={() => handleCompletePayment(request._id)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 w-full text-center"
                                    >
                                        Complete Payment
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            <h2 className="text-2xl sm:text-3xl font-bold mt-8 mb-4 text-white text-center">
                Completed Requests
            </h2>

            {completedRequests.length === 0 ? (
                <div className="text-center text-white">
                    No completed requests found.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {completedRequests.map((request: any) => (
                        <div
                            key={request._id}
                            className="p-4 border rounded-lg shadow-sm bg-gray-100 text-gray-800"
                        >
                            <div className="mb-2">
                                <strong>Request ID:</strong> {request._id}
                            </div>
                            <div className="mb-2">
                                <strong>Amount:</strong> ₹{request.Amount}
                            </div>
                            <div className="mb-2">
                                <strong>From:</strong> {request.from}
                            </div>
                            <div className="mb-2">
                                <strong>Recipient:</strong>{" "}
                                {request.reciepientEmail}
                            </div>
                            <div className="text-green-600 font-semibold text-center">
                                Payment Completed
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SendRequestMoney;

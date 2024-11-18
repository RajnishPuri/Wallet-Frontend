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

                const responsefirst: any = await axios.get("http://localhost:3000/api/v1/allRequestMoney", {
                    headers: {
                        Authorization: `${token}`,
                    },
                });

                if (responsefirst.data.success) {
                    const { allRequesttMoney } = responsefirst.data;
                    // Separate pending and completed requests
                    const pending = allRequesttMoney.filter((request: any) => !request.Completed);
                    const completed = allRequesttMoney.filter((request: any) => request.Completed);
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
            const token = localStorage.getItem("token"); // Retrieve token
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
                // Move the request to the completed section
                setPendingRequests((prevRequests) =>
                    prevRequests.filter((request) => request._id !== requestId)
                );
                setCompletedRequests((prevCompleted) => [
                    ...prevCompleted,
                    { ...response.data.request, Completed: true }
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
        <div>
            <h2>Pending Requests</h2>

            {error && <div className="text-red-500">{error}</div>}

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {pendingRequests.length === 0 ? (
                        <div>No pending requests found.</div>
                    ) : (
                        <div>
                            {pendingRequests.map((request: any) => (
                                <div key={request._id} className="mb-4 p-4 border">
                                    <div>
                                        <strong>Request ID:</strong> {request._id}
                                    </div>
                                    <div>
                                        <strong>Amount:</strong> ₹{request.Amount}
                                    </div>
                                    <div>
                                        <strong>From:</strong> {request.from}
                                    </div>
                                    <div>
                                        <strong>Recipient:</strong> {request.reciepientEmail}
                                    </div>
                                    <button
                                        onClick={() => handleCompletePayment(request._id)}
                                        className="bg-blue-500 text-white p-2 rounded"
                                    >
                                        Complete Payment
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            <h2>Completed Requests</h2>

            {completedRequests.length === 0 ? (
                <div>No completed requests found.</div>
            ) : (
                <div>
                    {completedRequests.map((request: any) => (
                        <div key={request._id} className="mb-4 p-4 border">
                            <div>
                                <strong>Request ID:</strong> {request._id}
                            </div>
                            <div>
                                <strong>Amount:</strong> ₹{request.Amount}
                            </div>
                            <div>
                                <strong>From:</strong> {request.from}
                            </div>
                            <div>
                                <strong>Recipient:</strong> {request.reciepientEmail}
                            </div>
                            <div className="text-green-600 font-semibold">Payment Completed</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SendRequestMoney;

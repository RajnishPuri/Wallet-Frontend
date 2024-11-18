import { useNavigate } from "react-router-dom";

const AddMoney = () => {
    const navigate = useNavigate();

    const redirectToAddMoneyPage = () => {
        navigate("/addMoneyForm"); // Replace with the actual path for your dedicated page
    };

    return (
        <div className="w-full h-full flex flex-col justify-center items-center p-6 ">
            <h1 className="text-2xl font-bold text-white mb-4">Add Money to Your Wallet</h1>
            <p className="text-center text-white mb-6 max-w-lg">
                Securely add funds to your wallet and enjoy a seamless transaction experience.
                Use your wallet balance to send money, request payments, or make transactions with ease.
            </p>
            <button
                onClick={redirectToAddMoneyPage}
                className="py-2 px-6 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition duration-200"
            >
                Add Money Now
            </button>
        </div>
    );
};

export default AddMoney;

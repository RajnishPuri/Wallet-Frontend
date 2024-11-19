import { useNavigate } from "react-router-dom";

const AddMoney = () => {
    const navigate = useNavigate();

    const redirectToAddMoneyPage = () => {
        navigate("/addMoneyForm"); // Replace with the actual path for your dedicated page
    };

    return (
        <div className="w-full h-full flex flex-col justify-center items-center p-6 sm:p-8 lg:p-12 overflow-y-auto">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 text-center">
                Add Money to Your Wallet
            </h1>
            <p className="text-center text-white mb-6 max-w-lg text-sm sm:text-base lg:text-lg leading-relaxed">
                Securely add funds to your wallet and enjoy a seamless transaction experience.
                Use your wallet balance to send money, request payments, or make transactions with ease.
            </p>
            <button
                onClick={redirectToAddMoneyPage}
                className="py-2 px-6 sm:py-3 sm:px-8 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition duration-200"
            >
                Add Money Now
            </button>
        </div>
    );
};

export default AddMoney;

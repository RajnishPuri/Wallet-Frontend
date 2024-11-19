import React, { InputHTMLAttributes } from 'react';

// Define the props type for the Input component
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Icon component should be an SVG component
}

const Input: React.FC<InputProps> = ({ icon: Icon, ...props }) => {
    return (
        <div className="relative mb-6">
            {/* Icon container */}
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Icon className="w-5 h-5 text-green-500" />
            </div>
            {/* Input field */}
            <input
                {...props}
                className="w-full pl-10 pr-3 py-2 bg-transparent border border-white focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-white transition duration-200"
            />
        </div>
    );
};

export default Input;

import React, { useState } from 'react';
import Input from '../Components/input';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from "lucide-react";
import PasswordStrengthMeter from '../Components/PasswordStrengthMeter';
import { z } from 'zod';

interface RegisterState {
    email: string;
    password: string;
    confirmPassword: string;
    signupToken: string;
    verificationCode: string;
    verificationStep: boolean;
}

const Register = () => {
    // Use RegisterState type for useState hooks
    const [state, setState] = useState<RegisterState>({
        email: "",
        password: "",
        confirmPassword: "",
        signupToken: "",
        verificationCode: "",
        verificationStep: false,
    });

    const navigate = useNavigate();

    const passwordSchema = z.string()
        .min(6, "Password must be at least 6 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character");

    const signupSchema = z.object({
        email: z.string().email("Invalid email address"),
        password: passwordSchema,
        confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
    }).refine(data => data.password === data.confirmPassword, {
        message: "Password and Confirm Password should be the same",
        path: ["confirmPassword"],
    });

    function createHandler(e: React.FormEvent) {
        e.preventDefault();

        const validationResult = signupSchema.safeParse({
            email: state.email,
            password: state.password,
            confirmPassword: state.confirmPassword
        });
        if (!validationResult.success) {
            alert(validationResult.error.errors.map(err => err.message).join(", "));
            return;
        }

        const user = { email: state.email, password: state.password };

        fetch('https://backend-to-do-e48o.onrender.com/api/v1/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setState(prevState => ({
                        ...prevState,
                        signupToken: data.signupToken,
                        verificationStep: true
                    }));
                } else {
                    alert(data.message);
                }
            })
            .catch(err => {
                console.error("Error:", err);
                alert("An error occurred during signup.");
            });
    }

    function verifyHandler(e: React.FormEvent) {
        e.preventDefault();

        const verificationData = { signupToken: state.signupToken, verificationToken: state.verificationCode };

        fetch('https://backend-to-do-e48o.onrender.com/api/v1/verify-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(verificationData),
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    navigate('/login');
                } else {
                    alert(data.message);
                }
            })
            .catch(err => {
                console.error("Error:", err);
                alert("An error occurred during verification.");
            });
    }

    return (
        <div className="w-full h-full flex justify-center items-center p-4">
            <form className="bg-[#1e1e1e] flex flex-col p-6 sm:p-8 w-full max-w-md rounded-lg shadow-md">
                <h2 className="text-2xl sm:text-3xl font-bold text-purple-500 mb-6 sm:mb-8 text-center">
                    {state.verificationStep ? 'Verify Account' : 'Sign Up'}
                </h2>

                {!state.verificationStep ? (
                    <>
                        <Input icon={Mail} type="email" placeholder="Email Address" value={state.email} onChange={(e) => setState(prevState => ({ ...prevState, email: e.target.value }))} />
                        <Input icon={Lock} type="password" placeholder="Password" value={state.password} onChange={(e) => setState(prevState => ({ ...prevState, password: e.target.value }))} />
                        <Input icon={Lock} type="password" placeholder="Confirm Password" value={state.confirmPassword} onChange={(e) => setState(prevState => ({ ...prevState, confirmPassword: e.target.value }))} />

                        <PasswordStrengthMeter password={state.password} />
                        <div className="w-full flex justify-center mt-4 sm:mt-6">
                            <button
                                className="py-2 px-4 sm:py-2 sm:px-6 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition duration-200"
                                onClick={createHandler}
                            >
                                Create Account
                            </button>
                        </div>
                        <div className="w-full flex justify-center mt-2">
                            <button
                                className="py-2 px-4 sm:py-2 sm:px-6 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition duration-200"
                                onClick={() => navigate('/login')}
                            >
                                Already have an account? Login
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <Input icon={Lock} type="text" placeholder="Enter Verification Code" value={state.verificationCode} onChange={(e) => setState(prevState => ({ ...prevState, verificationCode: e.target.value }))} />
                        <div className="w-full flex justify-center mt-4 sm:mt-6">
                            <button
                                className="py-2 px-4 sm:py-2 sm:px-6 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition duration-200"
                                onClick={verifyHandler}
                            >
                                Verify Account
                            </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
};

export default Register;

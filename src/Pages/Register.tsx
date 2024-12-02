import React, { useState } from 'react';
import Input from '../Components/input';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, User } from 'lucide-react';
import PasswordStrengthMeter from '../Components/PasswordStrengthMeter';
import { z } from 'zod';
import Logo from '/Wezire-Logo.png'


const server = import.meta.env.VITE_SERVER || "https://wallet-backend-1-sqp6.onrender.com";
console.log(server);

interface RegisterState {
    firstName: string,
    lastName: string,
    email: string;
    password: string;
    confirmPassword: string;
    signupToken: string;
    verificationCode: string;
    verificationStep: boolean;
}

const Register = () => {
    const [state, setState] = useState<RegisterState>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        signupToken: '',
        verificationCode: '',
        verificationStep: false,
    });

    const navigate = useNavigate();

    const passwordSchema = z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character');

    const signupSchema = z
        .object({
            email: z.string().email('Invalid email address'),
            password: passwordSchema,
            confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: 'Password and Confirm Password should be the same',
            path: ['confirmPassword'],
        });

        function createHandler(e: React.FormEvent) {
        e.preventDefault();

        const validationResult = signupSchema.safeParse({
            email: state.email,
            password: state.password,
            confirmPassword: state.confirmPassword,
        });
        if (!validationResult.success) {
            alert(validationResult.error.errors.map((err) => err.message).join(', '));
            return;
        }

        const user = { firstName: state.firstName, lastName: state.lastName, email: state.email, password: state.password };

        fetch(`${server}/api/v1/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((data) => {
                        throw new Error(data.message || 'Failed to register');
                    });
                }

                const token = res.headers.get('Authorization');
                if (token) {
                    localStorage.setItem('signupToken', token);
                    setState((prevState) => ({
                        ...prevState,
                        signupToken: token,
                        verificationStep: true,
                    }));
                } else {
                    throw new Error('Token not received');
                }
                return res.json();
            })
            .catch((err) => {
                console.error('Error:', err);
                alert(err.message);
            });
    }


    function verifyHandler(e: React.FormEvent) {
        e.preventDefault();

        const verificationData = { otp: state.verificationCode };

        const token = localStorage.getItem('signupToken');
        if (!token) {
            alert('Verification token not found. Please register again.');
            return;
        }

        fetch(`${server}/api/v1/auth/verify-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(verificationData),
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((data) => {
                        throw new Error(data.message || 'Failed to verify user.');
                    });
                }
                return res.json();
            })
            .then((data) => {
                if (data.success) {
                    localStorage.removeItem('signupToken');
                    navigate('/login');
                } else {
                    alert(data.message);
                }
            })
            .catch((err) => {
                console.error('Error:', err);
                alert(err.message);
            });
    }

    return (
        <div
            className="w-screen h-screen flex justify-center items-center p-4 bg-cover bg-center"
            style={{
                backgroundImage: `url(${Logo})`,
                backgroundSize: "500px 500px",
                backgroundPosition: "center center",
                backgroundRepeat: "space",
                zIndex: 0
            }}
        >
            <form className="relative bg-black/70 flex flex-col p-6 sm:p-8 w-full max-w-md rounded-lg shadow-md">


                <h2 className="text-2xl sm:text-3xl font-bold text-purple-500 mb-6 sm:mb-8 text-center">
                    {state.verificationStep ? 'Verify Account' : 'Sign Up'}
                </h2>

                {!state.verificationStep ? (
                    <>
                        <Input
                            icon={User}
                            type="text"
                            placeholder="First Name"
                            value={state.firstName}
                            onChange={(e) =>
                                setState((prevState) => ({
                                    ...prevState,
                                    firstName: e.target.value,
                                }))
                            }
                        />
                        <Input
                            icon={User}
                            type="text"
                            placeholder="Last Name"
                            value={state.lastName}
                            onChange={(e) =>
                                setState((prevState) => ({
                                    ...prevState,
                                    lastName: e.target.value,
                                }))
                            }
                        />
                        <Input
                            icon={Mail}
                            type="email"
                            placeholder="Email Address"
                            value={state.email}
                            onChange={(e) =>
                                setState((prevState) => ({
                                    ...prevState,
                                    email: e.target.value,
                                }))
                            }
                        />
                        <Input
                            icon={Lock}
                            type="password"
                            placeholder="Password"
                            value={state.password}
                            onChange={(e) =>
                                setState((prevState) => ({
                                    ...prevState,
                                    password: e.target.value,
                                }))
                            }
                        />
                        <Input
                            icon={Lock}
                            type="password"
                            placeholder="Confirm Password"
                            value={state.confirmPassword}
                            onChange={(e) =>
                                setState((prevState) => ({
                                    ...prevState,
                                    confirmPassword: e.target.value,
                                }))
                            }
                        />

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
                        <Input
                            icon={Lock}
                            type="text"
                            placeholder="Enter Verification Code"
                            value={state.verificationCode}
                            onChange={(e) =>
                                setState((prevState) => ({
                                    ...prevState,
                                    verificationCode: e.target.value,
                                }))
                            }
                        />
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

import React, { useState } from 'react';
import Input from '../Components/input';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Lock, Mail } from "lucide-react";
import { z } from 'zod';
import Logo from '/Wezire-Logo.png';

const server = import.meta.env.VITE_SERVER;
console.log(server);
console.log(server);

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginData = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const validationResult = loginSchema.safeParse({ email, password });
        if (!validationResult.success) {
            setError(validationResult.error.errors.map(err => err.message).join(", "));
            setLoading(false);
            return;
        }

        const user: LoginData = { email, password };

        try {
            const { data } = await axios.post<{ success: boolean; token?: string; message?: string }>(
                `${server}/api/v1/auth/login`,
                user
            );

            if (data.success && data.token) {
                localStorage.setItem('token', `${data.token}`);
                alert("Login successful!");
                navigate('/home');
            } else {
                setError(data.message || "Invalid credentials");
            }
        } catch (err) {
            console.error("Error:", err);
            setError("An error occurred during login. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center p-4 bg-cover bg-center"
            style={{
                backgroundImage: `url(${Logo})`,
                backgroundSize: "500px 500px",
                backgroundPosition: "center center",
                zIndex: 0,
                backgroundRepeat: "space"
            }}>
            <form className="relative bg-black/70 flex flex-col p-6 sm:p-8 w-full max-w-md rounded-lg shadow-md"
                onSubmit={loginHandler}>
                <h2 className="text-2xl sm:text-3xl font-bold text-purple-500 mb-6 sm:mb-8 text-center">Login</h2>

                <Input
                    icon={Mail}
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                    icon={Lock}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && (
                    <div className="text-red-500 text-sm mt-2 text-center">
                        {error}
                    </div>
                )}

                <div className="w-full flex justify-center mt-4 sm:mt-6">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`py-2 px-4 sm:py-2 sm:px-6 ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-purple-500 hover:bg-purple-600"} text-white font-semibold rounded-lg transition duration-200`}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;

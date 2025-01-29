// frontend/src/pages/Login.jsx

import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

function Login() {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            // navigate("/") などは AuthContext の login 関数内で実行 
        } catch (err) {
            console.error("Login Error:", error);
            setError(error?.message || "An unknown error occurred"); 
        };
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto bg-white p-4 shadow">
            <h2 className="text-xl mb-4">Login</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <div>
                <label>Username:</label>
                <input
                    className='border p-1 w-full'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div className='mt-2'>
                <label>Password:</label>
                <input
                    className='border p-1 w-full'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type='submit' className='mt-4 bg-blue-500 text-white px-4 py-1 rounded w-full'>
                Login
            </button>
        </form>
    );
}

export default Login;
// frontnd/src/contexts/AuthContext.jsx

import React, { createContext, useState, useEffect, useCallback } from "react";
import API from "../api";
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const navigate =useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // ログアウト関数を useCallback でラップ 
    const logout = useCallback(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
        navigate('/login');
    }, [navigate]);


    //アプリ起動時にトークンからユーザー情報を取得
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                try {
                    //プロフィール取得
                    const res = await API.get('profile/me/');
                    setUser(res.data);
                } catch (err) {
                    console.error('Failed to fetch user', err);
                    //　トークンが無効な場合はログアウト
                    logout();
                }
            }
            setLoading(false);
        };
        fetchUser();
    }, [logout]);

   
    const login = async (username, password) => {
        try {
          const response = await API.post("token/", { username, password });
      
          if (response.status === 200) {
            const { access, refresh } = response.data;
            localStorage.setItem("access_token", access);
            localStorage.setItem("refresh_token", refresh);
            
            console.log("Login successful!", response.data);
            return response.data;
          } else {
            console.error("Login failed with status", response.status);
            throw new Error(`Login failed with status ${response.status}`);
          }
        } catch (err) {
          if (err.response) {
            // サーバーがエラーレスポンスを返した場合
            console.error("Login failed", err.response.status, err.response.data);
            throw new Error(`Login failed with status ${err.response.status}: ${err.response.data.detail || "Unknown error"}`);
          } else if (err.request) {
            // サーバーが応答しない場合
            console.error("Login failed, no response:", err.message || err);
            throw new Error("Login failed: No response from server");
          } else {
            // 予期しないエラー
            console.error("Login failed, internal error", err.message || err);
            throw new Error(`Login failed, internal error: ${err.message}`);
          }
        }
      };    const register = async (username, email, password) => {
        try {
            const res = await API.post('register/', { username, email, password});
            console.log('Registration successfull:', res.data)
            // 登録後自動的にログイン
            await login(username, password);
        } catch (err) {
            console.error('Registration failed', err);
            throw err;
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );

}
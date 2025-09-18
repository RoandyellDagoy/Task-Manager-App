import React, { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", { email, password });
      auth?.login(res.data.user, res.data.token);
      navigate("/dashboard"); // redirect after login
    } catch (err) {
      console.error(err);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">

    <div className="card bg-base-100 w-96 drop-shadow-2xl">
        <div className="card-body">
            <h2 className="card-title">Login</h2>

                  <form className="space-y-3 w-full" onSubmit={handleSubmit} autoComplete="off">
                    <input
                      type="email"
                      required
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="input input-bordered w-full"
                          autoComplete="email"
                    />
                    <input
                      type="password"
                      required
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="input input-bordered w-full"
                          autoComplete="password"
                    />
                <div className="card-actions justify-end">
                      <button type="submit" className="btn btn-primary w-full">
                        Login
                      </button>
                      <button
                      type="button"
                      className="btn btn-outline w-full"
                      onClick={() => navigate("/register")}
                      >
                        Sign Up
                      </button>
                </div>
            </form>
        </div>
      </div>
      
    </div>
  );
};

export default Login;

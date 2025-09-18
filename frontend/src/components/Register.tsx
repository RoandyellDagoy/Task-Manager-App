
import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";





function Register(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await api.post("/register", {
        name,
        email,
        password,
      });
    } catch (error) {
      console.log(error)
    }
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
   <div className="flex justify-center items-center min-h-screen bg-base-200">
  <div className="card bg-base-100 w-96 drop-shadow-2xl">
    <div className="card-body">
      <h2 className="card-title">Register</h2>

      <form className="space-y-3 w-full" onSubmit={handleSubmit}>
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full"
          required
        />

        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full"
          required
          autoComplete="username"
        />

        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered w-full"
          required
          autoComplete="new-password"
        />

        <div className="card-actions justify-end">
          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
           <button
                type="button"
                className="btn btn-outline w-full"
                onClick={() => navigate("/")}
              >
                Back to Login
              </button>
        </div>
      </form>
    </div>
  </div>
</div>

  )

}
export default Register;

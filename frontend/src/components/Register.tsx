
import { useState } from "react";
import api from "../api/axios";



function Register(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    <form action="" onSubmit={handleSubmit}>
       <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />

      <label>
        Email:
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />

      <label>
        Password:
        <textarea
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  )





}

// const Register: React.FC = () => {
//   return (
//     <div>
//       <h1>Register Page</h1>
//       <form>
//         <input type="text" placeholder="Name" />
//         <input type="email" placeholder="Email" />
//         <input type="password" placeholder="Password" />
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

export default Register;

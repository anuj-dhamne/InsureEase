import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios"
const Login = ({ onSwitch }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setCredentials({ username: "", password: "" });
  };

  const handleLogin = async(e) => {
    e.preventDefault();
    if (!credentials.username || !credentials.password) {
      alert("Please enter username and password.");
      return;
    }

    try {
        const response= await axios.post("http://localhost:3000/api/v1/users/login",credentials, 
          {
            withCredentials:true
          }
        );
        
        console.log("Login Successful:", response.data);
        alert("Used Logged in Successfully !")
        navigate("/");
    } catch (error) {
        console.log(error.response?.data || "Error in Login");
    }


    // alert(`Welcome back, ${credentials.username}!`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-80 md:w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleReset}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Reset
          </button>
          <button
            onClick={handleLogin}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Log In
          </button>
        </div>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <button onClick={onSwitch} className="text-blue-600 hover:underline">
          <Link to="/register">Sign Up</Link>
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;

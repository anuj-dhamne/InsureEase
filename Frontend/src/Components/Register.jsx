import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const Register = ({ onSwitch }) => {
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    avator: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get selected file
    setFormData({ ...formData, avator: file });
  };

  const handleReset = () => {
    setFormData({
      username: "",
      name: "",
      email: "",
      password: "",
      avator: null,
    });
    document.getElementById("fileInput").value = ""; // Reset file input
  };

  const handleRegister = async(e) => {
    e.preventDefault();
    if (!formData.username || !formData.name || !formData.email || !formData.password || !formData.avator) {
      alert("Please fill in all fields and upload a file.");
      return;
    }
    try {
        const fd=new FormData();
        fd.append("username",formData.username);
        fd.append("name",formData.name);
        fd.append("email",formData.email);
        fd.append("password",formData.password);
        fd.append("avator",formData.avator);
        // http://localhost:3000/api/v1/users

        const res= await axios.post("http://localhost:3000/api/v1/users/register",formData,
            {
                headers:{
                    "Content-Type": "multipart/form-data",
                }
            }
        );z
        console.log(res.data);
        alert("Used Registeration suceessfully ! ")
        navigate("/login");
    } catch (error) {
        console.log(error.response?.data || "Error in registration");
    }
    // alert(`User Registered: ${formData.username}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-80 md:w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your full name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Upload Avatar (Image/PDF)</label>
          <input
            type="file"
            id="fileInput"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
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
            onClick={handleRegister}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Sign Up
          </button>
        </div>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <button onClick={onSwitch} className="text-blue-600 hover:underline">
           <Link to="/login">Log In</Link>
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;

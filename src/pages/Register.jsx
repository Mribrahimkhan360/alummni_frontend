import React, { useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { notifyMessage, notifyError } from '../utils/notify';
import { ScaleLoader } from "react-spinners";


export default function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [student_id,setStudentId] = useState("");
    const [passing_year,setPassingYear] = useState("");
    const [department,setDepartment] = useState("");
    const [gender,setGender] = useState("");
    const [image,setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [terms, setTerms] = useState(false);
    const [error, setError] = useState(null);
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        if(password !== confirmPassword) {
            notifyMessage("Password and Confirm Password do not match");
            setLoading(false);
            return;
        }
        if(!terms) {
            notifyMessage("You must agree to the terms and conditions");
            setLoading(false);
            return;
        }
        try{
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('student_id', student_id);
            formData.append('passing_year', passing_year);
            formData.append('department', department);
            formData.append('gender', gender);
            if (image) {
                formData.append('image', image);
            }

            const response = await api.post('/register', formData);
            notifyMessage("Registration successful! Redirecting to login...");
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            const errors = err.response?.data?.errors;
            const message = err.response?.data?.message;
            if (errors) {
                const firstError = Object.values(errors)[0]?.[0];
                notifyError(firstError || "Validation failed");
            } else if (message) {
                notifyError(message);
            } else {
                notifyError(err.message || "Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };
  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 py-5">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold text-center">Create an Account</h2>
            <form onSubmit={handleLogin} className="space-y-4 grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange = { (e) => setName(e.target.value) }
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="student_id" className="block text-sm font-medium text-gray-700">Student ID</label>
                    <input
                        type="number"
                        id="student_id"
                        value={student_id}
                        onChange={(e) => setStudentId(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="passing_year" className="block text-sm font-medium text-gray-700">Passing Year</label>
                    <input
                        type="number"
                        id="passing_year"
                        value={passing_year}
                        onChange={(e) => setPassingYear(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
                    <select
                        id="department"
                        onChange={(e) => setDepartment(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                    >
                        <option value="">Select Department</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Electrical Engineering">Electrical Engineering</option>
                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="Gender" className="block text-sm font-medium text-gray-700">Gender</label>
                    <select
                        id="Gender"
                        onChange={(e) => setGender(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="Image" className="block text-sm font-medium text-gray-700">Image</label>
                    <input
                        type="file"
                        id="Image"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                    <div className="col-span-2">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={terms}
                            onChange={(e) => setTerms(e.target.checked)}
                            className="form-checkbox h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2 text-sm text-gray-700">I agree to the <a href="#" className="text-blue-600 hover:underline">terms and conditions</a></span>
                    </label>
                </div>
  {loading ? (
    <button
        type="button"
        disabled
        className="w-full h-11 mt-5 flex items-center justify-center text-white bg-blue-600 rounded-md cursor-not-allowed opacity-80"
    >
        <ScaleLoader
            height={20}
            width={3}
            radius={2}
            margin={2}
            color="#ffffff"
        />
        <span className="ml-3">Creating Account...</span>
    </button>
) : (
    <button
        type="submit"
        className="cursor-pointer w-full h-11 px-4 mt-5 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
        Create Account
    </button>
)}
            </form>
            <div className="text-sm text-center">
               <div>
                 Do you have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
               </div>
            </div>
        </div>
    </div>
  )
}

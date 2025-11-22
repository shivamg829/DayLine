import { User, Mail, Lock, UserPlus } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from '../config';
const INITIAL_FORM = { name: "", email: "", password: "" };
const FIELDS = [
  { name: "name", type: "text", placeholder: "Full Name", icon: User },
  { name: "email", type: "email", placeholder: "Email Address", icon: Mail },
  { name: "password", type: "password", placeholder: "Password", icon: Lock },
];

const SignUp = ({ onSwitchMode, onSubmit }) => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/user/register`,
        formData,
        {
          timeout: 5000,
        }
      );
      if (response.data.success) {
        setMessage({
          text: "Registration successful! Redirecting...",
          type: "success",
        });
        setFormData(INITIAL_FORM);
        if (onSubmit) {
          onSubmit(response.data.user, response.data.token);
        }
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        setMessage({
          text: response.data.message || "Registration failed",
          type: "error",
        });
      }
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        setMessage({
          text: "Cannot connect to server. Please make sure the backend is running on port 5000.",
          type: "error",
        });
      } else if (error.response) {
        setMessage({
          text: error.response.data?.message || "Registration failed",
          type: "error",
        });
      } else {
        setMessage({
          text: "An error occurred. Please try again",
          type: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white shadow-xl border border-purple-200 rounded-2xl p-8">
        <div className="mb-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg">
            <UserPlus className="w-9 h-9 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Create Account
          </h2>
          <p className="text-gray-500 text-sm">
            Join DayLine to manage your tasks
          </p>
        </div>
        {message.text && (
          <div
            className={`p-4 rounded-xl text-sm mb-6 border ${
              message.type === "success"
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-red-50 text-red-700 border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {FIELDS.map(({ name, type, placeholder, icon: Icon }) => (
            <div
              key={name}
              className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-200 transition-all duration-200 bg-gray-50"
            >
              <Icon className="text-purple-500 w-5 h-5 mr-3 flex-shrink-0" />
              <input
                type={type}
                placeholder={placeholder}
                value={formData[name]}
                onChange={(e) =>
                  setFormData({ ...formData, [name]: e.target.value })
                }
                className="w-full focus:outline-none text-gray-700 bg-transparent placeholder-gray-400"
                required
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold text-sm hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          >
            {loading ? (
              "Signing Up..."
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                Sign Up
              </>
            )}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-8">
          Already have an account?{" "}
          <button
            onClick={onSwitchMode}
            className="text-purple-600 hover:text-purple-700 font-semibold transition-colors focus:outline-none focus:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
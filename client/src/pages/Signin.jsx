import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        navigate("/");
      } else {
        setError(data.message);
        return;
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <div className="flex-col gap-2 sm:mx-auto max-w-3xl p-3  my-7">
      <div className="flex sm:flex-row flex-col justify-between items-center">
        <h1 className="text-2xl">Welcome to PrimeBazaar! Please login</h1>
        <p className="text-sm">
          New member?{" "}
          <Link to={"/sign-up"} className="text-blue-500">
            Signup{" "}
          </Link>
          here
        </p>
      </div>
      <div className="bg-white rounded-lg my-5 p-5">
        <form
          className="flex flex-col sm:flex-row sm:gap-5 gap-0"
          onSubmit={handleSubmit}
        >
          <div className="flex-1">
            <div className="flex flex-col my-6">
              <span className="text-xs">Email*</span>
              <input
                type="email"
                id="email"
                required
                placeholder="Please enter your email"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col my-3">
              <span className="text-xs">Password*</span>
              <input
                type="password"
                id="password"
                required
                placeholder="Please enter your password"
                onChange={handleChange}
              />
            </div>
            <div className="items-end my-3 text-sm">
              <p>
                Forgot Password?{" "}
                <Link to={"/reset-password"} className="text-blue-500">
                  Reset
                </Link>{" "}
                here
              </p>
            </div>
          </div>
          <div className="flex-1">
            <button color="" type="submit" className="w-full button sm:mt-9">
              Sign in
            </button>
            {error && <p className="my-2 text-sm text-red-500">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}

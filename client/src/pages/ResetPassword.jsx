import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ResetPassword() {
  const [formData, setFormData] = useState({});
  console.log(formData);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [changed, setChanged] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("api/user/forgot-password-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(
          "OTP sent, Kindly check your inbox and input the code here."
        );
      } else {
        setError(data.message);
        return;
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };
  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(true);
    try {
      if (formData.password === formData.repassword) {
        const res = await fetch(`/api/user/reset-password/${formData.otp}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        console.log(res);
        const data = await res.json();
        if (res.ok) {
          navigate("/sign-in");
          setSuccess(false);
        } else {
          setError(data.message);
          setSuccess(true);
          return;
        }
      } else {
        setError("Password does not match.");
        setSuccess(true);
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <div className="flex-col gap-2 sm:mx-auto max-w-3xl p-3  my-7">
      <div className="flex sm:flex-row flex-col justify-between items-center">
        <h1 className="text-2xl">Forgot your password?</h1>
      </div>
      <div className="bg-white rounded-lg my-5 p-5">
        {success ? (
          <>
            <p className="text-lg">Fill this to reset your password.</p>
            <form
              className="flex flex-col sm:flex-row sm:gap-5 gap-0"
              onSubmit={handleSubmitPassword}
            >
              <div className="flex flex-col w-full sm:w-[50%]">
                <div className="flex flex-col my-5">
                  <input
                    type="email"
                    id="email"
                    hidden={success}
                    required
                    className="my-3"
                    placeholder="Please enter your email"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    id="otp"
                    className="my-3"
                    placeholder="Enter OTP"
                    onChange={handleChange}
                  />
                  <input
                    type="password"
                    id="password"
                    className="my-3"
                    placeholder="Enter new Password"
                    onChange={handleChange}
                  />
                  <input
                    type="password"
                    id="repassword"
                    className="mt-3"
                    placeholder="Re-enter your Password"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  {error && (
                    <p className=" text-sm text-red-500 my-2">{error}</p>
                  )}
                  <p className=" text-sm text-green-500 my-2">{success}</p>

                  <button type="submit" className="w-full button">
                    Reset Password
                  </button>
                </div>
              </div>
            </form>
          </>
        ) : (
          <>
            <p className="text-lg">
              Please enter the account that you want to reset the password.
            </p>
            <form
              className="flex flex-col sm:flex-row sm:gap-5 gap-0"
              onSubmit={handleSubmitEmail}
            >
              <div className="flex flex-col w-full sm:w-[50%]">
                <div className="flex flex-col my-5">
                  <input
                    type="email"
                    id="email"
                    required
                    className="my-3"
                    placeholder="Please enter your email"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  {error && (
                    <p className=" text-sm text-red-500 my-2">{error}</p>
                  )}
                  <button type="submit" className="w-full button">
                    Send OTP
                  </button>
                </div>
              </div>
            </form>
          </>
        )}

        <div className="mt-2">
          <p className="text-sm">
            Cancel to reset.{" "}
            <Link to={"/sign-in"} className="text-blue-400">
              Go back
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

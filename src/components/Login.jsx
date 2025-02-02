import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  // Hook to navigate programmatically
  const navigate = useNavigate();
  // Redux hook to dispatch actions
  const dispatch = useDispatch();
  // React Hook Form hooks for handling form submissions and validations
  const { register, handleSubmit } = useForm();
  // Local state to handle error messages
  const [error, setError] = useState("");

  // Async function to handle login
  const login = async (data) => {
    setError("");
    try {
      // Attempt to login using authService
      const session = await authService.login(data);
      if (session) {
        // Fetch current user data if login is successful
        const userData = await authService.getCurrentUser();
        if (userData) {
          // Dispatch login action with user data
          dispatch(authLogin(userData));
          // Navigate to the home page
          navigate("/");
        }
      }
    } catch (error) {
      // Set error message in case of failure
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" /> {/* Displaying the logo */}
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account {/* Header for the login form */}
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;{" "}
          {/* Link to sign up page if the user doesn't have an account */}
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        {/* Display error message if any */}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })} // Registering email field with validation
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })} // Registering password field with validation
            />
            <Button type="submit" className="w-full">
              Sign in {/* Button to submit the form */}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;


import { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Logo, Input } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

const Signup = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const dispatch = useDispatch(); // Redux hook to dispatch actions
  const [error, setError] = useState(""); // Local state to handle error messages
  const { register, handleSubmit } = useForm(); // React Hook Form hooks for handling form submissions and validations

  // Async function to handle signup
  const signup = async (data) => {
    setError(""); // Clear any previous errors
    try {
      const user = await authService.createAccount(data); // Attempt to create a new user account
      if (user) {
        const userData = await authService.getCurrentUser(); // Fetch current user data if signup is successful

        if (userData) dispatch(login(userData)); // Dispatch login action with user data
        navigate("/"); // Navigate to the home page
      }
    } catch (error) {
      setError(error.message); // Set error message in case of failure
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" /> {/* Displaying the logo */}
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account {/* Header for the signup form */}
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;{" "}
          {/* Link to sign in page if the user already has an account */}
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}{" "}
        {/* Display error message if any */}
        <form onSubmit={handleSubmit(signup)}>
          {" "}
          {/* Handle form submission */}
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })} // Registering full name field with validation
            />
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
              Create Account {/* Button to submit the form */}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

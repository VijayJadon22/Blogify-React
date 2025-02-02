import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Protected component to conditionally render children based on authentication status
const Protected = ({ children, authentication = true }) => {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [loader, setLoader] = useState(true); // State to manage loading status

  // Select authentication status from the Redux store
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    // if (authStatus === true) {
    //   navigate("/");
    // } else if (authStatus === false) {
    //   navigate("/login");
    // }

    // Conditional navigation based on authentication status
    if (authentication && authStatus !== authentication) {
      navigate("/login"); // Navigate to login if user is not authenticated
    } else if (!authentication && authStatus !== authentication) {
      navigate("/"); // Navigate to home if user is authenticated and accessing a non-protected route
    }
    setLoader(false); // Set loader to false after checking authentication status
  }, [authStatus, navigate, authentication]); // Dependencies to re-run the effect

  return <>{loader ? <h1>Loading...</h1> : children}</>; // Display loader or children based on loading status
};

export default Protected;
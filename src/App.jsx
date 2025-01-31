import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // Call the authService to get the current user
    authService
      .getCurrentUser()
      .then((userData) => {
        // If userData is returned, dispatch login action with userData
        if (userData) {
          dispatch(login({ userData }));
        } else {
          // If no userData, dispatch logout action
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false)); // No matter what we get response or error, finally will run
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <>
      {!loading ? (
        <div className=" flex flex-wrap content-between bg-gray-400 h-screen ">
          <div className="w-full block ">
            <Header />
            <main>
              <Outlet />
            </main>
            <Footer />
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default App;

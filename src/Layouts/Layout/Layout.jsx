
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../../Contexts/AuthContext";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

export default function Layout() {
  const {isLoading} = useContext(authContext);
  return (
    <div className="flex flex-col min-h-screen">
    {isLoading ? (
      <LoadingScreen />
    ) : (
      <>
        <Navbar />
        <div className="flex-1 container py-4">
          <Outlet />
        </div>
      </>
    )}
    <Footer />
  </div>
  );
}
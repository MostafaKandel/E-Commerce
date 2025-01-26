
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../../Contexts/AuthContext";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

export default function Layout() {
  const {isLoading} = useContext(authContext);
  return (
    <>
    {
      isLoading ? <LoadingScreen />:  <>
      <Navbar />
      <div className="container py-10">
      <Outlet/> 
      </div>
      </>
    } 
      <Footer />
    </>
  );
}
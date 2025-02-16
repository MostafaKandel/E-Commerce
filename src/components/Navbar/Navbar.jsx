import React, { useContext, useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@heroui/react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { authContext } from "../../Contexts/AuthContext";
import axios from "axios";

export default function NavbarComponent() {
  const [userData, setUserData] = useState(null);
  const navigator = useNavigate();
  const { isLoggedIn, setIsLoggedIn, userId } = useContext(authContext);
  const location = useLocation(); // Get the current path

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/users/${userId}`
        );
        setUserData(data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) fetchUserData();
  }, [userId]);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "Brands", path: "/brands" },
  ];

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigator("/login");
  }
  console.log('userDat',userData)
  return (
    <Navbar className="w-full p-6 bg-gray-900 text-white shadow-lg">
      <NavbarBrand>
        <NavLink to="/">
        <p className="font-bold text-xl">Fresh Cart</p>
        </NavLink>
        
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.name}>
            <NavLink
              to={item.path}
              className={`text-lg px-4 py-2 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-700 hover:text-gray-200"
              }`}
            >
              {item.name}
            </NavLink>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        {isLoggedIn ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="blue"
                name={userData?.name?.charAt(0) || "U"}
                size="sm"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{userData?.email || "User Email"}</p>
              </DropdownItem>
              <DropdownItem key="settings" onPress={() => navigator("/profile")}>
                My Profile
              </DropdownItem>
              <DropdownItem key="orders" onPress={() => navigator("/orders")}>
                Orders
              </DropdownItem>
              <DropdownItem key="cart" onPress={() => navigator("/cart")}>
                Cart
              </DropdownItem>
              <DropdownItem key="wishlist" onPress={() => navigator("/wishlist")}>
                Wishlist
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onPress={handleLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
          <NavLink to="/login">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Login
            </button>
          </NavLink>
          <NavLink to="/register">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Register
          </button>
        </NavLink>
        </>
        )}
      </NavbarContent>
    </Navbar>
  );
}

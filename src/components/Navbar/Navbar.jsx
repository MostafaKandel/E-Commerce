import React from "react";
import {
  Navbar as HerouiNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
   
  Button,
} from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../../Contexts/AuthContext";


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigator = useNavigate();
  const {isLoggedIn, setIsLoggedIn}= useContext(authContext);

  const menuItems = [
    "Home",
    "Categories",
    "Brands",
    "Cart", 
    "Wishlist"

  ];

 function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigator("/login");
  }

  return (
    
      <HerouiNavbar shouldHideOnScroll onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
       <Link to="/">
       <NavbarBrand>
           
           <p className="font-bold text-inherit">FreshCart</p>
         </NavbarBrand>
       </Link>
      </NavbarContent>

     {isLoggedIn &&
       <NavbarContent className="hidden sm:flex gap-4" justify="center">
       {menuItems.map((item, index) => (
             <NavbarItem key={index}>
             <Link color="foreground" to={item === "Home" ? "/" : "/"+item}>
               {item}
             </Link>
           </NavbarItem>
         ))}
         
       </NavbarContent>
     }

      {
        isLoggedIn ?
        <NavbarContent justify="end">
      <NavbarItem >
        <Button color="danger" variant="bordered" onClick={handleLogout}>Logout</Button>
      </NavbarItem>
      
    </NavbarContent>:
         <NavbarContent justify="end">
        <NavbarItem >
          <Link to="/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
        <Link to="/register">Register</Link>
        </NavbarItem>
      </NavbarContent>
       }

     {
       isLoggedIn && <NavbarMenu>
       {menuItems.map((item, index) => (
         <NavbarMenuItem key={`${item}-${index}`}>
           <Link
             className="w-full"
             color={ "foreground"
             }
             href="#"
             size="lg"
           >
             {item}
           </Link>
         </NavbarMenuItem>
       ))}
     </NavbarMenu>
     }
    </HerouiNavbar>
   
  );
}
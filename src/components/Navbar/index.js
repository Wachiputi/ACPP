// components/Navbar/index.js
 
import React from "react";
import {Nav,NavLink,Bars,NavMenu,NavBtn,NavBtnLink,} from "./NavbarElements";
 
const Navbar = () => {
    return (
        <>
            <Nav>
                <Bars />
 
                <NavMenu className="navMenu">
                    <NavLink to="/Home" activeStyle>
                        Home
                    </NavLink>
                    <NavLink to="/about-us" >
                        About
                    </NavLink>
                    <NavLink to="/predict" activeStyle>
                        Events
                    </NavLink>
                    <NavLink to="/contact" activeStyle>
                        Teams
                    </NavLink>
                    <NavLink to="/blogs" activeStyle>
                        Support
                    </NavLink>

                </NavMenu>
                
            </Nav>
        </>
    );
};
 
export default Navbar;
import React, { createContext, useContext, useState } from "react";

const NavbarContext = createContext();

export const NavbarProvider = ({ children }) => {
    const [isSearchActive, setIsSearchActive] = useState(false);

    return (
        <NavbarContext.Provider value={{ isSearchActive, setIsSearchActive }}>
            {children}
        </NavbarContext.Provider>
    );  
};

export const useNavbar = () => {
    return useContext(NavbarContext);
};

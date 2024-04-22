import React, { useEffect, useRef, useState } from "react";
import { useSettingsContext } from "../../context/SettingsContext";
import { RxHamburgerMenu } from "react-icons/rx";
import { GoX } from "react-icons/go";
import NavbarLink from "./NavbarLink";

const navlinks = [
  { name: "Cultivations", to: "/" },
  { name: "Stations", to: "/stations" },
  { name: "Resources", to: "/resources" },
  { name: "Workers", to: "/workers", onlyFor: "ADMIN" | "MANAGER" },
  { name: "Profile", to: "/profile" },
];

function Navbar() {
  const ref = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setDisableScroll } = useSettingsContext();

  const toggleMobileMenu = () => {
    setDisableScroll(!isMobileMenuOpen);
    setIsMobileMenuOpen((isMobileMenuOpen) => !isMobileMenuOpen);
  };

  return (
    <div
      className={`fixed left-0 top-0 z-20 flex w-screen flex-row items-center justify-center gap-8 bg-background-950 px-5 py-3 text-text-50 shadow-sm sm:px-24 xl:px-60 text-lg`}
    >
      <div className="flex flex-col items-center justify-center pointer-events-none">
        <p className="text-base -mb-3">Space</p>
        <p className="text-primary-500">Farm</p>
      </div>

      <div
        className={`hidden flex-row items-center justify-end gap-8 lg:flex w-full`}
      >
        {navlinks.map((n) => (
          <NavbarLink key={n.to} data={n} />
        ))}
      </div>
      <button
        ref={ref}
        className="ml-auto cursor-pointer text-3xl lg:hidden"
        onClick={toggleMobileMenu}
      >
        <RxHamburgerMenu />
      </button>
      {/* Hamburger menu */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 top-0 z-50 h-screen w-screen overflow-hidden bg-black/40">
          <div
            className="absolute inset-0"
            onClick={(e) => {
              e.stopPropagation();
              toggleMobileMenu();
            }}
          />
          <ul className="absolute right-0 top-0 flex h-full w-fit flex-col items-end gap-4 bg-background-950 p-4 px-8 text-right text-2xl shadow-md">
            <button
              className="cursor-pointer text-4xl"
              onClick={toggleMobileMenu}
            >
              <GoX />
            </button>
            {navlinks.map((n) => (
              <div
                key={n.to}
                onClick={() => {
                  toggleMobileMenu();
                }}
              >
                <NavbarLink data={n} />
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;

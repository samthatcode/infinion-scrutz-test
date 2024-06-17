import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useMediaQuery } from "react-responsive";


const Navbar = () => {
  const location = useLocation();
  const [linkText, setLinkText] = useState("Sign Up");
  const [linkDestination, setLinkDestination] = useState("/signup");
  const [additionalText, setAdditionalText] = useState(
    "New to Infinion Scrutz?"
  );
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  useEffect(() => {
    if (location.pathname === "/signup") {
      setLinkText("Sign In");
      setLinkDestination("/login");
      setAdditionalText("Already have an account?");
    } else {
      setLinkText("Sign Up");
      setLinkDestination("/signup");
      setAdditionalText("New to Infinion Scrutz?");
    }
  }, [location]);

  return (
    <nav className="p-4 flex items-center justify-between sticky top-0 z-50">
      <Link
        to="/"
        className="text-3xl text-[#247b7b] cursor-pointer uppercase font-bold"
        style={{ fontFamily: "Chiq Pro, sans-serif" }}
      >
        scrutz
      </Link>
      {isMobile ? (
        <div className="relative">
          <IconContext.Provider value={{ className: "text-[#247b7b] text-2xl cursor-pointer" }}>
            <FaBars onClick={() => setIsMenuOpen(!isMenuOpen)} />
          </IconContext.Provider>
          {isMenuOpen && (
            <div className="absolute top-12 right-0 bg-white p-2 border border-[#247b7b] rounded text-[12px] text-center">
              <div className="text-[#606060] text-sm mb-2">{additionalText}</div>
              <Link to={linkDestination} className="block text-[#247b7b] border border-[#247b7b] py-2 rounded font-bold">
                {linkText}
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="text-[#606060] text-sm">
          {additionalText} &nbsp;
          <Link
            to={linkDestination}
            className="text-[#247b7b] border border-[#247b7b] p-2 py-2 rounded font-bold"
          >
            {linkText}
          </Link>
        </div>
      )}
    </nav>
  );

};

export default Navbar;

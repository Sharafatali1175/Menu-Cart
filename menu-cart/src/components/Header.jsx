
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = ({ itemCount }) => {
  const location = useLocation();

  return (
    <div className="text-center">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
        <Link
          to="/"
          className={`mx-2 px-2 py-1 ${
            location.pathname === "/" ? "border-b-2 border-dotted border-gray-800" : ""
          }`}
        >
          Menu
        </Link>

        <Link
          to="/cart"
          className={`${
            location.pathname === "/cart" ? "border-b-2 border-dotted border-gray-800" : ""
          }`}
        >
          Cart ({itemCount})
        </Link>
      </h2>

      <hr className="w-[90%] sm:w-full border-2 border-gray-800 mx-auto my-4" />
    </div>
  );
};

export default React.memo(Header);


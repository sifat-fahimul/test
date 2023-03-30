import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="shadow-md">
      <div className="max-w-7xl px-5 mx-9 lg:px-0 flex justify-between py-3">
        <div>
          <Link to="/">LOGO</Link> | <Link to="/addPost">ADD POST</Link> |
        </div>
        <Link to="/">Home</Link>
      </div>
    </nav>
  );
};

export default NavBar;

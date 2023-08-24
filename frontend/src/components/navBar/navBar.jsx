import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <div>
            <h1>navbar</h1>
            <div>
                <Link to={"/"}>Home</Link>
            </div>
            <div>
                <Link to={"/about"}>About</Link>
            </div>
            <div>
                <Link to={"/calendar"}>Calendario</Link>
            </div>
            <div>
                <Link to={"/calendario"}>Calendario oficial</Link>
            </div>
        </div>
    );
}
 
export default NavBar;
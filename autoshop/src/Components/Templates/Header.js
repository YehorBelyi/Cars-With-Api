import { use } from "react";
import { NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { AutoContext } from "../../Context/Context";
import "./Header.css";

function HeaderComponent() {
    const { handleShow } = use(AutoContext);

    return (
        <div className="nav-bar">
            <NavLink to="/" className="autoclass">All Autos</NavLink>
            <Button variant="primary" onClick={handleShow}>
                Cart
            </Button>
        </div>
    );
}

export default HeaderComponent;

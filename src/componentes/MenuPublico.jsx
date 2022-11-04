import { NavLink, Outlet } from 'react-router-dom';
import { Text, Button } from 'rebass'
const MenuPublico = () => {

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" aria-current="page" exact to="/">KANBAN</NavLink>
                    <Button variant='primary' mr={2} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </Button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" exact to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" exact to="/login">Login</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </div>)
};

export default MenuPublico;
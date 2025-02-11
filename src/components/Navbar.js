import React, { useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const nav = useNavigate();
    // let location = useLocation();
    // useEffect(() => {
    //     console.log(location);
    // }, [location]);
    const handleLogout = () => {
        localStorage.removeItem('token');
        nav('/login');
    }
    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            {/* <Link className={`nav-link ${location.pathname === '/'?"active":""}`} aria-current="page" to="/">Home</Link> */}
                            <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            {/* <Link className={`nav-link ${location.pathname === '/about'?"active":""}`} to="/about">About</Link> */}
                            <NavLink className="nav-link" aria-current="page" to="/about">About</NavLink>
                        </li>
                    </ul>
                </div>
                {!localStorage.getItem('token')?<form className='d-flex gap-2'>
                    <Link className="btn btn-primary" type='submit' to='/login'>Login</Link>
                    <Link className="btn btn-primary" type='submit' to='/signup'>Sig up</Link>
                </form>: <button className='btn btn-primary' onClick={handleLogout}>Logout</button>}
            </div>
        </nav>
    )
}

export default Navbar

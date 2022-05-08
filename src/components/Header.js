import logo from '../images/logo.png';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
const Header = () => {

    return (

        <div>
            <Navbar bg="light" variant="light" className="md-auto" fixed="top" style={{ height: '3rem' }}>
                <Container>
                    <Navbar.Brand href="#home">
                        <img
                            src={logo}
                            width="90"
                            height="80"
                            style={{ marginLeft: '2em', marginTop: '.5em' }}
                            className="d-inline-block align-top"
                            alt="Company logo"
                        />
                    </Navbar.Brand>
                </Container>
                <Container>
                    <Nav className="ms-auto">
                        <NavLink className="px-3" to="/" style={({ isActive }) =>
                            isActive ? { color: '#fff', background: 'gray', textDecoration: 'None', marginTop: '0.5rem', padding: '7px 9px' }
                                : { color: '#000', background: '#f0f0f0', textDecoration: 'None', marginTop: '0.5rem', padding: '7px 9px' }
                        }>
                            Dashboard
                        </NavLink>
                        <NavLink className="px-3" to="/about" style={({ isActive }) =>
                            isActive ? { color: '#fff', background: 'gray', textDecoration: 'None', marginTop: '0.5rem', padding: '7px 9px' }
                                : { color: '#000', background: '#f0f0f0', textDecoration: 'None', marginTop: '0.5rem', padding: '7px 9px' }
                        }>
                            About
                        </NavLink>
                        <NavLink className="px-3" to="/contact" style={({ isActive }) =>
                            isActive ? { color: '#fff', background: 'gray', textDecoration: 'None', marginTop: '0.5rem', padding: '7px 9px' }
                                : { color: '#000', background: '#f0f0f0', textDecoration: 'None', marginTop: '0.5rem', padding: '7px 9px' }
                        }>
                            Contact
                        </NavLink>
                        <Navbar.Collapse className="justify-content-end px-3 mt-auto">
                            <Navbar.Text>
                                <NavLink className="px-3" to="/login" style={{ color: '#000', background: '#f0f0f', marginTop: '0.5rem', padding: '7px 9px' }} >Login</NavLink>
                                {/* Signed in as: <a href="#login" style={{ color: '#000', background: '#f0f0f', marginTop: '0.5rem', padding: '7px 9px' }}>SII Pune</a> */}
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Nav>
                </Container>
            </Navbar>
        </div >
    );
}

export default Header;
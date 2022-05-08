import logo from '../images/logo.png'
import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { ethers } from 'ethers';

export default function HeaderAdmin() {

    const navigate = useNavigate();
    const id = localStorage.getItem("id");
    const username = localStorage.getItem("token");
    const role = localStorage.getItem('role');
    var admin = '';
    if (role.substr(-2) === 'cd') {
        // console.log(role.substr(-2));
        admin = 'healthcadmin'
    }
    else if (role.substr(-2) == '68') {
        // console.log(role.substr(-2));
        admin = 'manufadmin'
    }
    else if (role.substr(-2) === 'cf') {
        // console.log(role.substr(-2));
        admin = 'distradmin'
    }
    else if (role.substr(-2) === '1a') {
        // console.log(role.substr(-2));
        admin = 'admin'
    }
    localStorage.setItem("admin", admin)

    const [defaultAccount, setDefaultAccount] = useState(null);
    const [accBalance, setAccBalance] = useState(null);
    const [connButtonText, setConnButtonText] = useState('Connect Metamask');
    const [errorMessage, setErrorMessage] = useState(null);

    const connectHandler = async () => {
        if (window.ethereum && window.ethereum.isMetaMask) {
            // metamask is here
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(acc => {
                    accountChangedHandler(acc[0]);
                    setConnButtonText("Wallet Connected");
                })
                .catch(error => {
                    setErrorMessage(error.message);
                })
        } else {
            setErrorMessage("Install Metamask");
        }
    }

    const accountChangedHandler = (newAccount) => {
        setDefaultAccount(newAccount);
        getAccBalance(newAccount)
    }

    const getAccBalance = (account) => {
        window.ethereum.request({ method: 'eth_getBalance', params: [account, 'latest'] })
            .then(balance => {
                setAccBalance(ethers.utils.formatEther(balance));
            })
            .catch(error => {
                setErrorMessage(error.message);
            })
    }

    const chainChangedHandler = () => {
        // reload the page to avoid any errors with chain change mid use of application
        window.location.reload();
    }
    // listen for account changes
    useEffect(() => {
        window.ethereum.on('accountsChanged', accountChangedHandler);

        window.ethereum.on('chainChanged', chainChangedHandler);

    }, [])


    const logout = () => {
        navigate("/logout");
    }
    const profile = () => {
        navigate(`/${admin}/${id}/profile`);
    }

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
                <Container style={{ marginRight: '3em' }}>
                    <Nav className="ms-auto">
                        <NavLink className="px-3" to={`/${admin}/${id}/dashboard`} style={({ isActive }) =>
                            isActive ? { color: '#fff', background: 'gray', textDecoration: 'None', marginTop: '0.5rem', padding: '7px 9px', marginRight: 'auto' }
                                : { color: '#000', background: '#f0f0f0', textDecoration: 'None', marginTop: '0.5rem', padding: '7px 9px' }
                        }>
                            Dashboard
                        </NavLink>
                        <NavLink className="px-3" to={`/${admin}/${id}/explorer`} style={({ isActive }) =>
                            isActive ? { color: '#fff', background: 'gray', textDecoration: 'None', marginTop: '0.5rem', padding: '7px 9px', marginRight: 'auto' }
                                : { color: '#000', background: '#f0f0f0', textDecoration: 'None', marginTop: '0.5rem', padding: '7px 9px' }
                        }>
                            Explorer
                        </NavLink>
                        <NavLink className="px-3" to={`/${admin}/${id}/routemap`} style={({ isActive }) =>
                            isActive ? { color: '#fff', background: 'gray', textDecoration: 'None', marginTop: '0.5rem', padding: '7px 9px', marginRight: 'auto' }
                                : { color: '#000', background: '#f0f0f0', textDecoration: 'None', marginTop: '0.5rem', padding: '7px 9px' }
                        }>
                            RouteMap
                        </NavLink>
                        {/* to={`/admin/${id}/metamaskconnect`} */}
                        {/* <NavLink className="px-3" to={`/admin/${id}/about`} style={({ isActive }) =>
                            isActive ? { color: '#fff', background: 'gray', textDecoration: 'None', marginTop: '0.5rem', padding: '7px 9px' }
                                : { color: '#000', background: '#f0f0f0', textDecoration: 'None', marginTop: '0.5rem', padding: '7px 9px' }
                        }>
                            About
                        </NavLink>                         */}
                        <Navbar.Collapse className="justify-content-end px-3 mt-auto">
                            <Navbar.Text>
                                <NavDropdown title="Metamask" id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={connectHandler}>
                                        <div>Address:{defaultAccount}</div>
                                        <div>Balance:{accBalance}</div>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Navbar.Text>
                        </Navbar.Collapse>
                        <Navbar.Collapse className="justify-content-end px-3 mt-auto">

                            <Navbar.Text>
                                {/* <NavLink className="px-3" to="login" style={{ color: '#000', background: '#f0f0f', marginTop: '0.5rem', padding: '7px 9px' }} >Login</NavLink> */}
                                {/* Signed in as: <a href="#login" style={{ color: '#000', background: '#f0f0f', marginTop: '0.5rem', padding: '7px 9px' }}>SII Pune</a> */}
                                <NavDropdown title={`Signed in as:${username}`} id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={profile}>Profile</NavDropdown.Item>
                                    <NavDropdown.Item onClick={logout} >Logout</NavDropdown.Item>
                                    {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item> */}
                                    <NavDropdown.Divider />
                                </NavDropdown>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Nav>
                </Container>
            </Navbar>
        </div >
    );
}

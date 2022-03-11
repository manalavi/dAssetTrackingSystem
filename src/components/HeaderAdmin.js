import logo from '../logo.svg';
import React, {useEffect, useState} from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import {ethers}  from 'ethers';

export default function HeaderAdmin() {

    const navigate = useNavigate();
    const id = localStorage.getItem("id");
    const username = localStorage.getItem("token");

    const [defaultAccount, setDefaultAccount] = useState(null);   
    const [accBalance, setAccBalance] = useState(null);
    const [connButtonText, setConnButtonText] = useState('Connect Metamask');   
    const [errorMessage, setErrorMessage] = useState(null);

    const connectHandler = async() => {
        if (window.ethereum && window.ethereum.isMetaMask) {
            // metamask is here
            window.ethereum.request({method: 'eth_requestAccounts'})
            .then(acc => {
                accountChangedHandler(acc[0]);
                setConnButtonText("Wallet Connected");
            })
            .catch(error => {
                setErrorMessage(error.message);
            })
        }else {
            setErrorMessage("Install Metamask");
        }    
    }

    const accountChangedHandler = (newAccount) => {
        setDefaultAccount(newAccount);
        getAccBalance(newAccount)
    }

    const getAccBalance = (account) => {
        window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
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

    },[])
	

    const logout = () => {        
        navigate("/logout");
    }
    const profile = () => {
        navigate(`/admin/${id}/profile`);
    }

    return (

        <div>
            <Navbar bg="light" variant="light" className="md-auto" fixed="top" style={{ height: '3rem' }}>
                <Container>
                    <Navbar.Brand href="#home">
                        <img
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                </Container>
                <Container style={{marginRight:'4em'}}>
                    <Nav className="ms-auto">
                        <NavLink className="px-3" to={`/admin/${id}`} style={({ isActive }) =>
                            isActive ? { color: '#fff', background: 'gray', textDecoration: 'None', marginTop: '0.5rem', padding: '7px 9px', marginRight:'auto'}
                                : { color: '#000', background: '#f0f0f0', textDecoration: 'None', marginTop: '0.5rem', padding: '7px 9px'}
                        }>
                            Dashboard
                        </NavLink>
                        <NavLink className="px-3" to={`/healthcadmin/${id}/neworder`} style={({ isActive }) =>
                            isActive ? { color: '#fff', background: 'gray', textDecoration: 'None', marginTop: '0.5rem', padding: '7px 9px', marginRight:'auto'}
                                : { color: '#000', background: '#f0f0f0', textDecoration: 'None', marginTop: '0.5rem', padding: '7px 9px'}
                        }>
                            NewOrder
                        </NavLink>
                        <NavLink className="px-3" to={`/admin/${id}/explorer`} style={({ isActive }) =>
                            isActive ? { color: '#fff', background: 'gray', textDecoration: 'None', marginTop: '0.5rem', padding: '7px 9px', marginRight:'auto'}
                                : { color: '#000', background: '#f0f0f0', textDecoration: 'None', marginTop: '0.5rem', padding: '7px 9px'}
                        }>
                            Explorer
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
                                <NavDropdown title={`Signed in as:${username}`}  id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={profile}>Profile</NavDropdown.Item>
                                    <NavDropdown.Item onClick={logout} >Logout</NavDropdown.Item>
                                    {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item> */}
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Nav>
                </Container>
            </Navbar>
        </div >
    );
}

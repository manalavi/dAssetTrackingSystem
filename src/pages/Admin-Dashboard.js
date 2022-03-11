import React, { useEffect, useState } from 'react';
import logo from '../logo.svg';
import HeaderAdmin from '../components/HeaderAdmin';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row, Card } from 'react-bootstrap';
import DoughnutChart from '../components/DoughnutChart';
import BarChart from '../components/BarChart';
import TableChart from '../components/TableChart';

// const ethers = require('ethers');
// const provider = ethers.getDefaultProvider('http://localhost:7545');

// const privateKey = "27acf13e3809a126904c97a42cb4c5e4e2cdf505776e313d481dc139904bf549";
// var signer = new ethers.Wallet(privateKey, provider);

// var contractAddress = "0x5a34c8a6Acc5Fc9a66C105358c7eBAE86C179502";// 

// // smart contract instance creation
// var contract_write = new ethers.Contract(contractAddress,abi, signer); 
// var contract_read = new ethers.Contract(contractAddress, abi, provider);

// contract_read.rolesAccess(0xe4041c13a985afece8aab653f7b77a1e7f312381bd7738ead7806eee6c03bb1a,0xCe370ab6CE3698b6E0abbe4e6476aca7cc7048f8)
// .then(res => {
//     console.log(res);
// })
// ;


// contract_write.grantRole(0xd0a4b400be36d6659138e3f30e547c7f56c77a95815f2613c74058c4e8623168,0xC6E751899c21924294Cb7C611b8c787ECe3d7528)
// .then(res =>{
//     console.log(res);
// });


const Admin = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(true);



    useEffect(() => {
        if (token == null) {
            setLoggedIn(false);
            navigate("/login");
        }

        if (loggedIn == false) {
            navigate("/login");
        }
    })

    return (
        <>
            <div><HeaderAdmin /></div>            
            <Card>
                <Card.Body>
                    <Container className="bg-light" fluid>
                        <Row>
                            <Col md={6}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title style={{textAlign:"left", marginLeft:"2px", fontSizeAdjust:"inherit"}}>Vacines Status</Card.Title>
                                        <DoughnutChart />
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card>
                                    <Card.Body>
                                    <Card.Title style={{textAlign:"left", marginLeft:"2px", fontSizeAdjust:"inherit"}}>Real Time Vaccine Production</Card.Title>
                                        <BarChart />
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col >
                                <Card>
                                    <Card.Body>
                                        <TableChart />                                    
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        </>
    );
}

export default Admin;
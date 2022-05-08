import logo from '../logo.svg';
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import HeaderAdmin from '../components/HeaderAdmin';
import { Col, Container, Row, Card, Button } from 'react-bootstrap';
import DoughnutChart from '../components/DoughnutChart';
import BarChart from '../components/BarChart';
import TableChart from '../components/TableChart';
import {useNavigate } from 'react-router-dom';

export default function HealthCAdmin() {    

    useEffect(() => {
		document.title = 'BE Project | Admin';
	}, []);

    const navigate = useNavigate();

    return (

        <div>
            <div><HeaderAdmin /></div>            
             <Card>
                <Card.Body>
                    <Container className="bg-light" fluid>
                        <Row>
                            <Col md={6}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title style={{ textAlign: "left", marginLeft: "2px", fontSizeAdjust: "inherit" }}>Vaccine Batches Status</Card.Title>
                                        <DoughnutChart />
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title style={{ textAlign: "left", marginLeft: "2px", fontSizeAdjust: "inherit" }}>Real Time Vaccine Production 
                                        <Button onClick={() => { navigate("/healthcadmin/:username/neworder") }} style={{marginLeft:'7em'}}>NewOrder</Button>
                                        </Card.Title>
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
        </div >
    );
}

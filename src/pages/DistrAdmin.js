import logo from '../logo.svg';
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import HeaderAdmin from '../components/HeaderAdmin';
import { Col, Container, Row, Card, Navbar,Nav, NavLink } from 'react-bootstrap';
import DoughnutChart from '../components/DoughnutChart';
import BarChart from '../components/BarChart';
import TableChart from '../components/TableChart';

export default function DistrAdmin(){
    return(
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
                                        <Card.Title style={{ textAlign: "left", marginLeft: "2px", fontSizeAdjust: "inherit" }}>Real Time Vaccine Production</Card.Title>
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
    )
}
import devLogo from '../images/developer-icon.jpg'
import linkedin from '../images/linkedin.png'
import github from '../images/github.png'
import '../App.css'
import logo from '../images/logo.png'
import React from 'react';
import Header from '../components/Header';
import { Card, Row, Col, Container } from 'react-bootstrap'
export default function About() {
    return (
        <div className="bgAbout">
            <div><Header /></div>
            <div style={{ padding: '8em', margin: '0' }}>
                <h2 style={{ color: 'white' }}>Decentralized Asset Tracking System - Team Members</h2>
                <Container fluid>
                    <Row>
                        <Col>
                            <Card style={{ borderColor: 'inherit', backgroundColor: 'inherit' }}>
                                <Card.Img variant="top" src={devLogo} style={{ border: '10px solid black', borderRadius: '20em' }} />
                                <Card.Body>
                                    <Card.Text>
                                        <h3 style={{ color: 'white' }}>Vinay Manala</h3>
                                        <h4 style={{ color: 'white' }}>
                                            <div style={{ marginLeft: '25%', padding: '0', width: '50%' }}>
                                                <Container style={{ textAlign: 'center' }}>
                                                    <Row >
                                                        <Col style={{ margin: '0 auto' }}><a target="_blank" href='https://www.linkedin.com/in/vinaymanala/'><img src={linkedin} alt="linkedin logo" width="25" height="25" /></a></Col>
                                                        <Col style={{ margin: '0 auto' }}><a target="_blank" href='https://github.com/VinayManala'><img style={{ backgroundColor: 'white' }} src={github} alt="github logo" width="25" height="25" /></a></Col>
                                                    </Row>
                                                </Container>
                                            </div>
                                        </h4>

                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ borderColor: 'inherit', backgroundColor: 'inherit' }}>
                                <Card.Img variant="top" src={devLogo} style={{ border: '10px solid black', borderRadius: '20em' }} />
                                <Card.Body>
                                    <Card.Text>
                                        <h3 style={{ color: 'white' }}>Yashvardhan Dwivedi</h3>
                                        <h4 style={{ color: 'white' }}>
                                            <div style={{ marginLeft: '25%', padding: '0', width: '50%' }}>
                                                <Container style={{ textAlign: 'center' }}>
                                                    <Row >
                                                        <Col style={{ margin: '0 auto' }}><a target="_blank" href='https://www.linkedin.com/in/vinaymanala/'><img src={linkedin} alt="linkedin logo" width="25" height="25" /></a></Col>
                                                        <Col style={{ margin: '0 auto' }}><a target="_blank" href='https://github.com/sirius-y'><img style={{ backgroundColor: 'white' }} src={github} alt="github logo" width="25" height="25" /></a></Col>
                                                    </Row>
                                                </Container>
                                            </div>
                                        </h4>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ borderColor: 'inherit', backgroundColor: 'inherit' }}>
                                <Card.Img variant="top" src={devLogo} style={{ border: '10px solid black', borderRadius: '20em' }} />
                                <Card.Body>
                                    <Card.Text>
                                        <h3 style={{ color: 'white' }}>Om Pancholi</h3>
                                        <h4 style={{ color: 'white' }}>
                                            <div style={{ marginLeft: '25%', padding: '0', width: '50%' }}>
                                                <Container style={{ textAlign: 'center' }}>
                                                    <Row >
                                                        <Col style={{ margin: '0 auto' }}><a target="_blank" href='https://www.linkedin.com/in/om-pancholi-a6129b1b7'><img src={linkedin} alt="linkedin logo" width="25" height="25" /></a></Col>
                                                        <Col style={{ margin: '0 auto' }}><a target="_blank" href='https://github.com/xxShinigami'><img style={{ backgroundColor: 'white' }} src={github} alt="github logo" width="25" height="25" /></a></Col>
                                                    </Row>
                                                </Container>
                                            </div>
                                        </h4>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                {/* </Card> */}
                {/* <Container>
                    <Row style={{ justifyContent: 'center' }}>
                        <Col xs lg="2">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </Col>
                        <Col md="auto">Variable width content</Col>
                        <Col xs lg="2">
                            3 of 3
                        </Col>
                    </Row>
                </Container> */}
            </div>
        </div>
    )
}
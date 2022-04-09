import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import { Card, Row, Col, Container } from 'react-bootstrap'
import { delivery } from '../utils/getFirebase'
import Map from '../components/MainRouteMap'
import CovidData from '../components/CovidData';

const Home = () => {

    const [deliveries, setDeliveries] = useState(delivery);    

    return (
        <div>
            <Header />
            <div>
                <Card>
                    <Card.Title>Vaccines Freight Tracking Map for Public Use<hr></hr></Card.Title>
                    <Container fluid style={{ margin: '0' }}>
                        <Row xl={12} md={12} style={{ margin: '0' }} >
                            <Col xl={9} md={9} style={{ margin: '0em'}}>
                            <Map data={deliveries} />
                            </Col>
                            <Col xl={3} md={3} style={{ margin: '0em'}}>
                                <Card>
                                    <Card.Title>India <b style={{color:'red'}}>LIVE</b> Covid Data</Card.Title>
                                    <Card.Body>
                                        <CovidData />
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </Card>
            </div>
        </div>
    );
}
export default Home;
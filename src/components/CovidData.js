import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

export default function CovidData() {

    const [covidData, setCovidData] = useState([]);
    var data = {}
    const getCovidData = async () => {
        try {
            const res = await fetch('https://data.covid19india.org/data.json')
            data = await res.json()
            // console.log(data.statewise[0])
            setCovidData(data.statewise[0])
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getCovidData();
    }, [])
    // console.log(covidData)
    return (
        <>
            <Card style={{marginTop:'1em'}}>
                <Card.Title>Total Active</Card.Title>
                <Card.Body>
                    <Card.Text><h3>{covidData.active}</h3></Card.Text>
                </Card.Body>
            </Card>
            <Card style={{marginTop:'1em'}}>
                <Card.Title>Total Recovered</Card.Title>
                <Card.Body>
                    <Card.Text style={{color:'green'}} ><h3>{covidData.recovered}</h3></Card.Text>
                </Card.Body>
            </Card>
            <Card style={{marginTop:'1em'}}>
                <Card.Title>Total Confirmed</Card.Title>
                <Card.Body>
                    <Card.Text style={{color:'orange'}}><h3>{covidData.confirmed}</h3></Card.Text>
                </Card.Body>
            </Card>
            <Card style={{marginTop:'1em'}}>
                <Card.Title>Total Deaths</Card.Title>
                <Card.Body>
                    <Card.Text style={{color:'red'}}><h3>{covidData.deaths}</h3></Card.Text>
                </Card.Body>
            </Card>
            <Card style={{marginTop:'1em'}}>
                <Card.Title>Last Updated</Card.Title>
                <Card.Body>
                    <Card.Text><h3>{covidData.lastupdatedtime}</h3></Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}
import React, { useState } from 'react';
import { Form, Button, Card, Row, Col, RangeSlider } from 'react-bootstrap'
import FormRange from 'react-bootstrap/esm/FormRange';
import { data } from '../components/BarChart';
import HeaderAdmin from '../components/HeaderAdmin';
import connect from '../utils/connect';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
const { create } = require('ipfs-http-client');
const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })



export default function OrderVaccine() {
    const [userRole, setUserRole] = useState('');
    const [ischecked, setIsChecked] = useState(false);
    const [vaccines, setVaccines] = useState([]);
    const [manufaccounts, setManufAccounts] = useState([]);
    const [manufdoseCount, setManufDoseCount] = useState([]);
    const [toAccountAddress, setToAccountAddress] = useState(null);
    const [toAccountName, setToAccountName] = useState(null);
    const [dosesCount, setDoseCount] = useState();
    const [vaccineCount, setVaccineCount] = useState([]);

    const navigate = useNavigate()
    const admin = localStorage.getItem('admin');
    var data = {};
    var txhash = '0x00';
    // localStorage.setItem("token",data.name);
    // localStorage.setItem("id", data.id);
    // localStorage.setItem("role", data.role);    
    const handleDoseCount = (e) => {
        const vaccine = e.target.name;
        const doseCount = e.target.id;
        const vaccinesDoseCount = vaccineCount;
        vaccines.map((dose) => {
            console.log(dose, vaccine);
            if (dose === vaccine) {
                const idx = vaccines.indexOf(vaccine);
                if (vaccinesDoseCount.indexOf(idx)) {
                    vaccinesDoseCount[idx] = doseCount
                } else {
                    vaccinesDoseCount.push(doseCount)
                }
                setVaccineCount(vaccinesDoseCount)
            }
        })
        console.log(vaccineCount);
    }


    const handleChange = (e) => {
        const isChecked = e.target.checked;
        console.log(e.target.id, e.target.checked);
        const value = e.target.id;
        const data = vaccines;
        if (isChecked) {
            data.push(value)
            setVaccines(data)
        } else {
            let index = data.indexOf(value);
            data.splice(index, 1)
            console.log(data);
            setVaccines(data);
        }

    }
    //0xe9Af5B0cDEed0a2C863481e553B09f6E341F6865 - manu acc
    const fetchManufAccounts = async (e) => {
        // setContract(connect());
        // const manufacturerCount = await contract.manufacturersCount();        
        let manufaccounts = [];
        const accounts = await connect().getManuAccounts();
        // console.log(accounts[0][1]);
        // console.log(manufaccounts);
        for (let account of accounts) {
            const dc = await (connect().getManufDoseCount(account[1]))
            manufaccounts.push([account[0], account[1], dc.toString()])
            // dosescount.push(dc.toString());
            // console.log(dosescount);
        }
        setManufAccounts(manufaccounts);
        console.log(manufaccounts);

        //  get the dataset , e.target.id and pass jSON.
        let acc = document.getElementById(e.target.parentElement.id);
        // console.log(e.target.id);
        const accName = e.target.value;
        const accAdd = e.target.id;
        setToAccountAddress(accAdd)
        setToAccountName(accName)
        // console.log(toAccountName, toAccountAddress);
    }

    const orderVaccineBatch = async () => {
        let roleid = document.getElementById('formRoleid').value;
        if ((Array.isArray(vaccineCount) && !vaccineCount.length) && (Array.isArray(vaccines) && !vaccines.length) && !roleid) {
            console.log("Select vaccine Type and dose count respectively...");
            console.log(vaccines);
            console.log(vaccineCount);
            document.getElementById('text').innerText = "Select vaccine Type and dose count respectively...";
        } else {

            const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
            const address = await tempProvider.listAccounts();
            const totalDoseCount = vaccineCount.reduce((sum, a) => parseInt(sum) + parseInt(a), 0)

            let overrides = {
                value: ethers.utils.parseEther("0.1")     // ether in this case MUST be a string
            }

            const selectedManufId = document.getElementById('manufids').value;
            console.log(selectedManufId);

            let date = new Date();
            const orderedDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}:${date.getMilliseconds()}`;
            const deliveryDate = `${date.getDate() + 3}-${date.getMonth()}-${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}:${date.getMilliseconds()}`;
            {/* <td>{(tx.date).getMonth() +'-'+(tx.date).getMonth()+ '-'+(tx.date).getFullYear()+', '+(tx.date).getHours()+':'+(tx.date).getMinutes()+':'+ (tx.date).getMilliseconds()}</td> */ }
            data = JSON.stringify({
                roleAccess: localStorage.getItem("role"),
                orderMadeBy: localStorage.getItem("token"),
                orderedTo: toAccountName,
                vaccineType: vaccines,
                to: toAccountAddress,
                from: address[0],
                orderedDate: orderedDate,
                deliveryDate: deliveryDate,
                amount: overrides.value,
                dosesCount: totalDoseCount,
                covishield: vaccineCount[0],
                covaxin: vaccineCount[1],
                sputnik: vaccineCount[2],
                temperature: "-20C",
            })
            const orderHash = await ipfs.add(data);
            // console.info(orderHash.path)
            const orderverifyHash = orderHash.path
            console.log(data);
            const tx = await connect().orderVaccineBatch(localStorage.getItem('role'), orderverifyHash, ethers.utils.getAddress(address[0]), totalDoseCount, ethers.utils.getAddress(toAccountAddress), overrides);
            txhash = tx.hash;            
            console.log(tx.hash);
            popup();
            navigate(`/healthcadmin/${localStorage.getItem("id")}/explorer?tx=${txhash}`)
        }
    }

    function popup(e) {
        // let newWin = window.open("about:blank", "hello", "width=200,height=200");
        //     let html = `<div style="font-size:30px">Welcome!</div>`;
        //     newWin.document.body.insertAdjacentHTML('afterbegin', html);        
        // 'width=300,height=300'
        let url = 'about:blank'
        let newWindow = window.open(url, 'OrderReceipt', "width=600,height=600")
        newWindow.focus();

        // alert(newWindow.location.href); // (*) about:blank, loading hasn't started yet

        newWindow.onload = function () {
            // console.log(data)
            let receiptD = JSON.parse(data)
            console.log(receiptD)     
            let amount = ethers.utils.formatEther(receiptD.amount) + ' ETH'            
            console.log(amount);
            let html = `
            <html>
            <style>
            #reciept {
                /* Center the form on the page */
                margin: 10vh auto;
                width: 500px;
                /* Form outline */
                padding: 1em;
                border: 1px solid #CCC;
                border-radius: 1em;
              }
              
              ul {
                list-style: none;
                padding: 0;
                margin: 0;
              }
              
               li + li {
                margin-top: 1em;
              }
              
              label {
                /* Uniform size & alignment */
                display: inline-block;
                width: 100px;
                text-align: right;
              }
              
              input,
              textarea {
                /* To make sure that all text fields have the same font settings
                   By default, textareas have a monospace font */
                font: 1em sans-serif;
              
                /* Uniform text field size */
                width: 350px;
                box-sizing: border-box;
              
                /* Match form field borders */
                border: 1px solid #999;
              }                                                      
              
              button {
                /* This extra margin represent roughly the same space as the space
                   between the labels and their text fields */
                padding:6px;
                margin-left: .5em;
              }              
            </style>                        
            <div id="reciept">
            <h3>Order Receipt</h3>
            <ul>
            <li>
              <label>Role:</label>
              <input type="text" id="role" value="${receiptD['roleAccess']}" disabled />
            </li>
            <li>
              <label>From:</label>
              <input type="text" id="from" value="${receiptD['orderMadeBy']}" disabled />
            </li>
            <li>
              <label>To:</label>
              <input type="text" id="to" value="${receiptD['orderedTo']}" disabled />
            </li>
            <li>
              <label>Amount:</label>
              <input type="text" id="amount" value="${amount}" disabled />
            </li>              
            <li>
            <li>
              <label>Vaccine Temperature:</label>
              <input type="text" id="temp" value="${receiptD['temperature']}" disabled />
            </li>              
              <h4>Vaccine Type:</h4>
              <label>Covaxin:</label>
              <input type="text" id="vaccineType" value="${receiptD['covaxin'] ? receiptD['covaxin'] : 0 }" disabled />
              <label>Covishield:</label>
              <input type="text" id="vaccineType" value="${receiptD['covishield'] ? receiptD['covishield'] : 0 }" disabled />
              <label>Sputnik:</label>
              <input type="text" id="vaccineType" value="${receiptD['sputnik'] ? receiptD['sputnik'] : 0}" disabled />              
            </li>
            <li>
              <label>Total:</label>
              <input type="text" id="doses" value="${receiptD['dosesCount']}" disabled />
            </li>              
            <li>            
              <label>TxHash:</label>
              <input type="text" id="txhash" value="${txhash}" disabled />
            </li>  
            <li>
              <label>Date:</label>
              <input type="text" id="date" value="${receiptD['orderedDate']}" disabled />
            </li>  
            <button onclick="document.title='${txhash}-receipt'; window.print(); return false">Print</button>                       
            </div>             
            </html>`;

            newWindow.document.body.insertAdjacentHTML('afterbegin', html);                        
        }
    }

    return (
        <div>
            <div><HeaderAdmin /></div>
            <div style={{ margin: '0 15%' }}>
                <Card>
                    <Card.Title>
                        <h3>Order Vaccine Batch</h3>
                    </Card.Title>
                    <Card.Body>
                        <Form >
                            <Form.Group as={Row} className="mb-3" controlId="formRoleid">
                                <Form.Label column sm={2}>
                                    Enter Role
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" placeholder="Role" required />
                                </Col>
                            </Form.Group>
                            <h5>Select Vaccine</h5>
                            <h4 id="text"></h4>
                            <div style={{ margin: '0 40%' }}>
                                <Form.Group as={Row} controlId="formHorizontalEmail" required>
                                    {['Covishield', 'Covaxin', 'Sputnik'].map((type) => (
                                        <div key={`${type}`} className="mt-3">
                                            <Form.Check
                                                type="checkbox"
                                                id={`${type}`}
                                                label={`${type}`}
                                                title={`${type}`}
                                                // checked={ischecked}
                                                onChange={handleChange}
                                            />

                                            {[50, 100, 150].map((dcount) => (
                                                <Form.Check
                                                    key={dcount}
                                                    id={dcount}
                                                    inline
                                                    name={`${type}`}
                                                    type="radio"
                                                    aria-label="radio"
                                                    label={`${dcount}`}
                                                    title={`${type}`}
                                                    onChange={handleDoseCount}
                                                />
                                            ))}
                                        </div>
                                    ))}
                                </Form.Group>
                            </div>                            
                            <h6 className="mt-3" >Select Manufacturer Account</h6>
                            <Form.Group className="mb-3">
                                <Form.Select id="manufids" aria-label="Default select example" onClick={fetchManufAccounts} required>
                                    <option>Select Manufacturer's Account</option>
                                    {manufaccounts.map((acc) => (
                                        <option id={acc[1]} value={acc[0]}>{`${acc[0]} - ${acc[1]}, Dose:- ${acc[2]}`}</option>
                                        // console.log(acc);
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            </Form.Group>
                            <Button variant="primary" onClick={orderVaccineBatch}>
                                {/* on submit connect with ipfs and pass tx data to explorer */}
                                {/* generate receipt function to be added */}
                                {/* add the generate receipt button to the explorer */}
                                Submit
                            </Button>
                            {/* <Button onClick={popup}>Popup</Button> */}
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>)
}
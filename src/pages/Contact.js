import '../contactStyle.css'
import { db } from '../utils/firebase'
import { ref, set } from "firebase/database";
import React, { useState, useEffect } from "react";
import Row from 'react-bootstrap/Row'
import { Container, Button, Form } from 'react-bootstrap'
import { useAlert } from "react-alert";
import Header from '../components/Header';


const userId = Date.now();

export default function Contact() {

    useEffect(() => {
		document.title = 'BE Project | Contact';
	}, []);

  const alert = useAlert();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    set(ref(db, 'contactForm/' + userId), {
      username: name,
      email: email,
      message: message
    })
      .then(() => {
        setLoader(false);
        alert.success("Thank You! We have received your details.Your Request-ID is " + userId);
      })
      .catch((error) => {
        alert.error("Shucks! We have caught up an error! Error - " + error);
        setLoader(false);
      });

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className='contact'>
      <div><Header /></div>
      <Container className="justify-content-md-center">

        <form className="contactform" onSubmit={handleSubmit}>
          <nav className="bg-dark navbar-dark navbar" id="title">
            <div className="row col-12 d-flex justify-content-center text-white">
              <h3>Contact Us</h3>
            </div>
          </nav>
          <br />
          <Form.Control placeholder="Thank You for reaching out to us. Please fill in the details and we will get back to you
    within Two business days :)" disabled />
          <label>Name</label>

          <input required
            placeholder=" We will address you by this name."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email</label>
          <input required
            placeholder="We will communicate to you via email. We never share your email."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Message</label>
          <textarea required
            placeholder="Please be precise in your message. Our team will handle your query accordingly."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <br />
          <Row className="justify-content-md-center" >
            <Button varient="primary"
              type="submit"
              id="subbtn"
            >
              Submit Details
            </Button>
          </Row>
        </form>
      </Container>
    </div>
  );
}

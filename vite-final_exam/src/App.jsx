import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Spinner, Alert, DropdownButton, Dropdown } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [joke, setJoke] = useState({ setup: '', punchline: '' });
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('en');
  const [error, setError] = useState(false);

  const translations = {
    en: {
      jokeButton: 'Get Another Joke',
      langButton: 'Change Language',
      loading: 'Loading...'

    },
    fi: {
      jokeButton: 'Hae uutta vitsiä',
      langButton: 'Vaihda kieltä',
      loading: 'Ladataan...',

    },
  };

  // Function to fetch a joke
  const fetchJoke = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setJoke(data);
    } catch (error) {
      setError(true);
      toast.error('Error fetching joke! Please try again later.');
    }
    setLoading(false);
  };

  // Fetch a joke when the component mounts
  useEffect(() => {
    fetchJoke();
  }, []);

  // Function to toggle language
  const toggleLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100">

      {/* Language DropdownButton  */}
      <Row className="justify-content-right ">
        <Col xs={6} md={4}>
          <DropdownButton variant="secondary" id="dropdown-basic-button" title={translations[language].langButton}>
            <Dropdown.Item onClick={() => toggleLanguage('en')}>English</Dropdown.Item>
            <Dropdown.Item onClick={() => toggleLanguage('fi')}>Suomi</Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>
      <br /><br />

      <Row className="justify-content-left">
        <Col xs={12} md={8} lg={6}>
          <Card className="text-center shadow">
            <Card.Body>
              {loading ? (
                <Spinner animation="border" variant="primary" />
              ) : (
                <>
                  {error && <Alert variant="danger">Error fetching joke! Please try again later.</Alert>}
                  <Card.Text className="card_text text-wrap">{joke.setup}</Card.Text>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <br /><br />
      <Row className="justify-content-right">
        <Col xs={12} md={8} lg={6}>
          <Card className="text-center shadow">
            <Card.Body>
              {loading ? (
                <Spinner animation="border" variant="primary" />
              ) : (
                <>
                  {error && <Alert variant="danger">Error fetching joke! Please try again later.</Alert>}
                  <Card.Text className="card_text text-wrap">{joke.punchline}</Card.Text>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <br /><br />
      <Row className="justify-content-left">
        <Col xs={6} md={4} className="d-flex justify-content-left">
          <Button onClick={fetchJoke} variant="primary" >
            {loading ? translations[language].loading : translations[language].jokeButton}
          </Button>
        </Col>
      </Row>

      {/* Toast Notifications */}
      <ToastContainer position="bottom-left" autoClose={5000} />
    </Container>
  );
};

export default App;

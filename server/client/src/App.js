import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import css from './App.css';
import { Button, Confirm, Message } from 'semantic-ui-react';
import { Router, Link } from '@reach/router';
import Finder from './pages/Finder';
import Sender from './pages/Sender';
import './App.css';
import axios from 'axios';

const Home = () => {
  const handleDelete = async () => {
    setIsOpen(false);
    const { data } = await axios.delete('http://localhost:8000/emails');
    if (data.status) {
      setIsMessage(true);
    } else {
      alert('Sth Wrong');
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isMessage, setIsMessage] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <p>Welcome To Email Finder</p>
        <div>
          <Button className={'btn'} primary={true} positive={true}>
            <Link to="/finder">Finding Emails</Link>
          </Button>
          <Button primary={true} className={'btn'}>
            <Link to="/sender">Sending Emails</Link>
          </Button>
          <Button
            onClick={() => setIsOpen(true)}
            negative={true}
            className={'btn'}
          >
            Delete All Emails From Data Base
          </Button>
          {isMessage && (
            <Message
              onDismiss={() => setIsMessage(false)}
              negative
              header="Emails Deleted"
            />
          )}
        </div>
        <Confirm
          content={'Delete All Emails From DB?'}
          open={isOpen}
          onCancel={() => setIsOpen(false)}
          onConfirm={handleDelete}
        />
      </header>
    </div>
  );
};
function App() {
  return (
    <Router>
      <Home path="/" />
      <Finder path="/finder" />
      <Sender path="/sender" />
    </Router>
  );
}

export default App;

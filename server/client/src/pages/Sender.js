import React, { useState, useEffect } from 'react';
import './../App.css';
import './Finder.css';
import {
  Label,
  Table,
  Message,
  Button,
  Modal,
  Header,
  Icon,
  Form,
  Input,
} from 'semantic-ui-react';
import { Link } from '@reach/router';
import axios from 'axios';

const emailMode = () => {};

const Sender = () => {
  const [isMessage, setIsMessage] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentEmail, setCurrentEmail] = useState('');
  const [refetch, setRefetch] = useState(false);
  const [emails, setEmails] = useState([]);
  const [pass, setPass] = useState('');
  const [user, setUser] = useState('');

  const handleEmail = async () => {
    const { data } = await axios.post('http://localhost:8000/email', {
      email: user,
      password: pass,
      to: currentEmail,
    });

    if (data.status) {
      return alert('done');
    }
    return alert('not done');
  };

  useEffect(() => {
    const fetcher = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/emails');
        if (data.status) {
          return setEmails([...data.data]);
        } else {
          return setIsMessage(true);
        }
      } catch (e) {
        return setIsMessage(true);
      }
    };

    fetcher();
  }, [refetch]);

  return (
    <div className="App">
      <header className="App-header">
        <p>Sender</p>
        <div></div>
        <div>
          {emails.length !== 0 && (
            <Table celled className={'table'}>
              <Table.Header>
                <Table.Row key={-1}>
                  <Table.HeaderCell>Emails</Table.HeaderCell>
                  <Table.HeaderCell>Address</Table.HeaderCell>
                  <Table.HeaderCell>timesEmailed</Table.HeaderCell>
                  <Table.HeaderCell>timesRedirected</Table.HeaderCell>
                  <Table.HeaderCell>Email</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {emails.map((email, idx) => (
                  <Table.Row key={idx}>
                    <Table.Cell>
                      <Label ribbon>{idx === 0 ? 'First' : idx + 1}</Label>
                    </Table.Cell>
                    <Table.Cell>{email.address}</Table.Cell>
                    <Table.Cell>{email.timesEmailed}</Table.Cell>
                    <Table.Cell>{email.timesRedirected}</Table.Cell>
                    <Table.Cell>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setCurrentEmail(email.address);
                          setIsOpen(true);
                        }}
                        primary
                      >
                        Email
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
          {isMessage && (
            <div>
              <Message
                className={'message'}
                negative
                header="No New Emails Found, Reload The Page, Or Try Finding Some In The Finder"
              />
              <Button
                onClick={() => {
                  setIsMessage(false);
                  setRefetch(!refetch);
                }}
              >
                Try Again
              </Button>
            </div>
          )}
          <div>
            <Modal open={isOpen} onClose={() => setIsOpen(false)} size="small">
              <Header icon>
                {/* <Icon name="email" /> */}
                Sending Email
              </Header>
              <Modal.Content>
                <Form>
                  <div style={{ display: 'flex' }}>
                    <div className={'margin'}>
                      <Label>Sender Email</Label>
                      <Input
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        type="text"
                      />
                    </div>
                    <div className={'margin'}>
                      <Label>Sender Email Pass</Label>
                      <Input
                        onChange={(e) => setPass(e.target.value)}
                        value={pass}
                        type="password"
                      />
                    </div>
                    <div className={'margin'}>
                      <p>To: {currentEmail}</p>
                    </div>
                    <div className={'margin'}>
                      <Button onClick={() => handleEmail()} primary>
                        Send Email
                      </Button>
                    </div>
                  </div>
                </Form>
              </Modal.Content>
            </Modal>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Sender;

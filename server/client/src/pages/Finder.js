import React, { useState } from 'react';
import './../App.css';
import './Finder.css';
import {
  Button,
  Form,
  Label,
  Input,
  Table,
  Menu,
  Icon,
  Message,
} from 'semantic-ui-react';
import { Link } from '@reach/router';
import axios from 'axios';

const Finder = () => {
  const [url, setUrl] = useState('http://localhost:5000');
  const [isMessage, setIsMessage] = useState(false);
  const [emails, setEmails] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post('http://localhost:8000/find_emails', {
      url,
    });

    if (data.emailsFound.length === 0) return setIsMessage(true);
    setEmails(data.emailsFound);

    if (!data.status) {
      return alert('Problem With Url, must start with http');
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <p>Finder</p>
        <div>
          <Form>
            <div>
              <Label>Search Url For Emails: </Label>
              <Input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div>
              <Button onClick={handleSubmit} positive>
                Search
              </Button>
              <Button>
                <Link to="../">Go Back</Link>
              </Button>
            </div>
          </Form>
        </div>
        <div>
          {emails.length !== 0 && (
            <Table celled className={'table'}>
              <Table.Header>
                <Table.Row key={-1}>
                  <Table.HeaderCell>Emails</Table.HeaderCell>
                  <Table.HeaderCell>Address</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {emails.map((e, idx) => (
                  <Table.Row key={idx}>
                    <Table.Cell>
                      <Label ribbon>{idx === 0 ? 'First' : idx + 1}</Label>
                    </Table.Cell>
                    <Table.Cell>{e}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
          {isMessage && (
            <Message
              className={'message'}
              onDismiss={() => setIsMessage(false)}
              negative
              header="No New Emails Found, Try Deleting All Previosly Found Emails In Main Screen"
            />
          )}
        </div>
      </header>
    </div>
  );
};

export default Finder;

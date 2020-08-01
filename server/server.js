const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const { JSDOM } = require('jsdom');
const axios = require('axios').default;
const bodyParser = require('body-parser');
const Email = require('./emailModel');

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'dev.env') });
const DB = process.env.DATABASE;

const app = express();
app.use(bodyParser.json());
app.use(cors());

function WaterfallOver(list, iterator, callback) {
  let nextItemIndex = 0;

  function report() {
    nextItemIndex++;

    if (nextItemIndex === list.length) callback();
    else iterator(list[nextItemIndex], report);
  }

  iterator(list[0], report);
}

const textTrimmer = function (text) {
  return text
    .split(' ')
    .flatMap((e) => e.split('"'))
    .filter((e) => e.length > 3)
    .map((e) => e.trim());
};

const start = function (endPoint, res) {
  endPoint = endPoint.endsWith('/')
    ? endPoint.substr(0, endPoint.length - 1)
    : endPoint;
  let onlyEmails = [];

  const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  let anchors = [endPoint];

  return WaterfallOver(
    anchors,
    async function (url, report) {
      url = url.startsWith('http') ? url : `${endPoint}${url}`;
      try {
        const dataGot = await axios.get(url);
        const { data, headers } = dataGot;
        setTimeout(function () {
          anchors.filter((e) => e !== url);
          if (headers['content-type'].startsWith('application')) {
            const jsonDom = JSON.stringify(data);
            onlyEmails = onlyEmails.concat(
              [...textTrimmer(jsonDom)].filter((e) => emailRegex.test(e))
            );

            report();
          } else if (headers['content-type'].startsWith('text')) {
            const virtualDom = new JSDOM(data).window.document;
            virtualDom.querySelectorAll('a').forEach(({ href }) => {
              anchors.push(
                href.startsWith('http') ? href : `${endPoint}${href}`
              );
            });

            onlyEmails = onlyEmails.concat(
              [
                ...textTrimmer(virtualDom.body.textContent),
                ...textTrimmer(virtualDom.head.textContent),
              ].filter((e) => emailRegex.test(e))
            );

            report();
          }
        }, Math.floor(Math.random() * 10));
      } catch (e) {
        anchors = anchors.filter((e) => e !== url);
        report();
      }

      // here we wait for random time
    },
    async function () {
      const savedEmails = (await Email.find({})).map((e) => {
        return e.address;
      });
      const emailSet = [...new Set(onlyEmails)];
      const emailObjects = emailSet
        .filter((e) => {
          return !savedEmails.includes(e);
        })
        .map((a) => {
          return { address: a };
        });

      try {
        await Email.insertMany(emailObjects);
      } catch (e) {
        return res.json({ status: false, data: 'issue', e });
      }
      return res.json({
        status: true,
        newEmailsAdded: emailObjects,
        emailsFound: emailSet,
      });
    }
  );
};

app.post('/find_emails', (req, res, next) => {
  const { url } = req.body;
  const address = url;
  const urlRegex = /^http:\/\/\w+(\.\w+)*(:[0-9]+)?\/?$/;

  if (!urlRegex.test(String(address))) {
    address = `http://${String(address)}`;
    if (!urlRegex.test(String(address))) {
      return res.json({ status: false, data: 'issue' });
    }
  }

  start(String(address), res);
});

app.delete('/emails', async (req, res, next) => {
  await Email.deleteMany({});
  return res.json({ status: true, data: 'emails deleted' });
});
app.get('/emails', async (req, res, next) => {
  const emails = await Email.find({});
  return res.json({ status: true, data: emails });
});
app.post('/email', async (req, res, next) => {
  const { email, password, to } = req.body;

  const userEm = await Email.findOne({ address: to });
  console.log(userEm, 'userEm');
  if (!userEm) {
    return res.json({ status: false, data: 'user not found' });
  }
  userEm.timesEmailed++;
  await userEm.save();
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: password,
    },
  });

  const mailOptions = {
    from: email,
    to: to,
    subject: 'Your Email Found',
    text: `That was easy! - click this localhost:8000/em/?code=${userEm.key}`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return res.json({ status: false, data: 'did not send' });
    } else {
      return res.json({ status: true, data: 'email sent' });
    }
  });
});

app.get('/em/', async (req, res, next) => {
  const { code } = req.query;
  const userEm = await Email.findOne({ key: code });
  if (!userEm) {
    return res.json({ status: false, data: 'nope did not find you' });
  }
  userEm.timesRedirected = userEm.timesRedirected + 1;

  await userEm.save();
  return res.json({ status: true, data: 'found you' });
});

app.use(express.static(path.join(__dirname, 'build')));

app.all('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('DB Connected');
    serverCreate();
  });

const serverCreate = () => {
  const server = app.listen(8000);

  server.on('close', () => {
    mongoose.connection.close();
    console.log('Server Closed');
  });
  server.on('listening', () => {
    console.log('Server Listening On http://localhost:8000');
  });
};

mongoose.connection.on('close', () => {
  console.log('DB Disconnected Successfully');
});

process.on('SIGINT', () => {
  mongoose.connection.close().then(() => {
    process.exit(1);
  });
});

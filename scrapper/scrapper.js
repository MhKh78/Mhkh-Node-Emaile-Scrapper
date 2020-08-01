const { JSDOM } = require('jsdom');
const readline = require('readline');

const axios = require('axios').default;
const fs = require('fs');

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const textTrimmer = function (text) {
  return text
    .split(' ')
    .flatMap((e) => e.split('"'))
    .filter((e) => e.length > 3)
    .map((e) => e.trim());
};

function WaterfallOver(list, iterator, callback) {
  let nextItemIndex = 0;

  function report() {
    nextItemIndex++;

    if (nextItemIndex === list.length) callback();
    else iterator(list[nextItemIndex], report);
  }

  iterator(list[0], report);
}

const start = function (endPoint) {
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
              console.log('hret', href);
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
    function () {
      console.log('anchors', anchors);
      console.log('Emails', onlyEmails);
      const emailSet = new Set(onlyEmails);
      fs.writeFileSync('anchors.txt', 'Anchors \n');
      fs.writeFileSync('emails.txt', ' Emails: \n');
      anchors.forEach((e) => fs.appendFileSync('anchors.txt', `${e} \n`));
      emailSet.forEach((e) => fs.appendFileSync('emails.txt', `${e} \n`));
      console.log('Done');
      console.log('Should We Email Them? (Y/N)');
    }
  );
};

// start('http://localhost:8000/');

let count = 0;
readlineInterface.on('line', async (line) => {
  switch (count) {
    case 0:
      const urlRegex = /^http:\/\/\w+(\.\w+)*(:[0-9]+)?\/?$/;

      if (!line) {
        return readlineInterface.close();
      }

      if (!urlRegex.test(String(line))) {
        line = `http://${String(line)}`;
        if (!urlRegex.test(String(line))) {
          return readlineInterface.close();
        }
      }

      count++;
      start(String(line));
      break;

    case 1:
      const deny = ['N', 'n'];
      const accept = ['Y', 'y'];
      if (accept.includes(String(line))) {
        console.log('Not Implemented Yet');
        readlineInterface.close();
        break;
      } else if (deny.includes(String(line))) {
        console.log('Good Luck!!!');
        readlineInterface.close();
        break;
      }
      console.log('Wrong Input');
      readlineInterface.close();
      break;
    default:
      readlineInterface.close();
      break;
  }
});

console.log('Enter Site Address: ');

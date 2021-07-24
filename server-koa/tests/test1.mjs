#!/usr/bin/env node
//
import got from "got";

const world = 133;
const URL = 'http://headers.jsontest.com/';
// const URL = 'https://hooks.slack.com/services/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'

const {statusCode, body} = 
  await got.post(URL, {
    json: {
      text: `world = ${world}`
    },
});

console.log(`statusCode = ${statusCode}`);
console.log(`body => ${body}`);

/*
(async () => {
  const {body} = await got.post('https://hooks.slack.com/services/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', {
    json: {
      text: `Hello ${world}`
    },
    responseType: 'json'
  });

  console.log(body.data);
})();
*/
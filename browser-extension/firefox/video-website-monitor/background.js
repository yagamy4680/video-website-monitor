"use strict";

const MONITOR_SERVER = 'https://nuc54250a3.t2t.io';

class Collector {
    constructor( opts={} ) {
        this.opts = opts;
        this.urls = [];
    }

    addUrl(url) {
        this.urls.push(url);
    }

    getUrls() {
        let {urls} = this;
        this.urls = [];
        return urls;
    }
}

window.collector = new Collector();


// Example POST method implementation:
// Inspired by https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
//
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    // return response.json(); // parses JSON response into native JavaScript objects
    return response.text();
  }
  
browser.webRequest.onCompleted.addListener(
    function(details) {
        let {collector} = window;
        console.log(`onCompleted.x => ${details.url}`);
        collector.addUrl(details.url);
    },
    {urls: [
        "*://*.youtube.com/*"
    ]}
);

browser.webRequest.onCompleted.addListener(
    function(details) {
        let name = 'Aaron\'s Computer (Firefox)';
        let {collector} = window;
        let urls = collector.getUrls();
        let data = {name, urls, details};
        console.log(`onCompleted.6 => ${details.url}`);
        console.log(`data => ${JSON.stringify(data)}`);
        console.log(`sending data to ${MONITOR_SERVER}`);
        postData(`${MONITOR_SERVER}/api/v1/collect`, data)
            .then(body => {
                console.log(`server responses: ${body}`)
            });
    },
    {urls: [
        // "*://*.youtube.com/*",
        "https://www.youtube.com/api/stats/watchtime*",
    ]}
);

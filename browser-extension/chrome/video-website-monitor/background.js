
// Example POST method implementation:
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  
chrome.webRequest.onCompleted.addListener(
    function(details) {
        console.log(`onCompleted.x => ${details.url}`);
    },
    {urls: [
        "*://*.youtube.com/*"
    ]}
);

chrome.webRequest.onCompleted.addListener(
    function(details) {
        console.log(`onCompleted.6 => ${details.url}`);
        postData('http://10.0.1.50:3040/api/v1/collect', details)
            .then(data => {
                console.log(`server responses ${data}`)
            });
    },
    {urls: [
        // "*://*.youtube.com/*",
        "https://www.youtube.com/api/stats/watchtime*",
    ]}
);

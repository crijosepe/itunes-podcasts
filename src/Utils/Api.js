const xml2js = require('xml2js');

const parser = new xml2js.Parser();

const xmlToJson = xml => (new Promise(resolve => (parser.parseString(xml, (err, result) => {
    if (err) {
        console.error('Error parsing', err);
    }
    resolve(result);
}))));

const Api = {
    fetchJson: url => (fetch(url)
        .then(res => res.json())),

    fetchXml: url => (fetch(url)
        .then(res => res.text()) // a xml is being received
        .then(res => xmlToJson(res))),
};

export default Api;

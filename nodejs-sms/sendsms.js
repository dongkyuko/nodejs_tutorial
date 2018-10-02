var c = require('./conf');
var https = require("https");
var credential = 'Basic '+new Buffer(c.APPID+':'+c.APIKEY).toString('base64');


const data = {
  "sender"     : c.SENDER,
  "receivers"  : c.RECEIVERS,
  "content"    : c.CONTENT
}
const body = JSON.stringify(data);

const options = {
  host: 'api.bluehouselab.com',
  port: 443,
  path: '/smscenter/v1.0/sendsms',
  headers: {
    'Authorization': credential,
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body)
  },
  method: 'POST'
};
const sms_req = https.request(options, function(sms_res) {
  console.log(sms_res.statusCode);
  let body = "";
  sms_res.on('data', function(d) {
    body += d;
  });
  sms_res.on('end', function(d) {
  	if(sms_res.statusCode==200)
		console.log(JSON.parse(body));
	else
		console.log(body);
  });
});
sms_req.write(body);
sms_req.end();
sms_req.on('error', function(e) {
	console.error(e);
});

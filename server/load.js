const newRelic = require('newrelic');
const express = require('express');
const request = require('request')


const servers = ['http://18.223.116.240:3000', 'http://3.21.76.41:3000', 'http://13.58.92.215:3000', 'http://3.135.223.3:3000', 'http://3.138.139.204:3000']

let cur = 0

const handler = (req, res) => {
  req.pipe(request({ url: servers[cur] + req.url })).pipe(res);
  cur = (cur + 1) % servers.length;
};

const server = express().get('*', handler).post('*', handler);
server.listen(3000, () => {
  console.log('load balancer is listening')
});
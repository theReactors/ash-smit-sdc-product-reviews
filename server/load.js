const express = require('express');
const request = require('request')


const servers = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003', 'http://localhost:3004']

let cur = 0

const handler = (req, res) => {
  req.pipe(request({ url: servers[cur] + req.url })).pipe(res);
  cur = (cur + 1) % servers.length;
};

const server = express().get('*', handler).post('*', handler);
server.listen(8080, () => {
  console.log('load balancer is listening')
});
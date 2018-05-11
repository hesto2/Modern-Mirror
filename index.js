#!/usr/bin/env node
const express = require('express');
const app = express();
const fs = require('fs');
const glob = require('glob');
let program = require('commander');
program = initCli(program);

let path = program.routeDirectory || '~/modern-mirror-routes';
let port = program.port || 3000;

app.use('/', (req, res) => {
  res = prepareResponse(req, res)
  let matchPath = `${path}${req.url}*`;
  glob(matchPath, (err, files) =>{
    if(files.length == 0){
      console.log(`Couldn't find any matching file at ${matchPath}`);
      res.status(404).send();
      return;
    }
    err ? sendErr(res, err) : processFile(res, files[0]);
  })
})

app.listen(port, () => console.log(`Modern Mirror listening on port ${port}. \nRouting to ${path}`))

function processFile(res, file){
  fs.readFile(file, 'utf-8', (err, data)=>{
    console.log(`Sending file ${file}`);
    err ? sendErr(res, err) : sendData(res, data);
  })
}

function sendErr(res, err){
  console.log(`ERROR: ${err}`);
  res.status(500).send(err);
}

function sendData(res, data){
  res.status(200).send(data);
}

function prepareResponse(req, res){
  res.set('content-type', req.headers['content-type']);
  return res;
}

function initCli(program){
  return program
          .option('-d, --route-directory <s>', 'Directory of the routes file structure (defaults to ~/modern-mirror')
          .option('-p --port <n>', 'The port that Modern Mirror should run on (defaults to 3000)')
          .parse(process.argv)
}
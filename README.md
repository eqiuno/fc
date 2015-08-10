# flowc
flowc is a tool to controll flows of promises/functions. 

## usage

### 1. promise flowing
```
var bb = require('bluebird'); // bluebird is not neccessary, only for testing
var fc = require('flows');
function a() {
  return bb.resolve(1);
}

function b() {
  return bb.resolve(2);
}

fc(a, b).then(function(v) {
  console.log(v); //print 2
}).catch(function(err) {
});
```

### 2. passing value 
```
var bb = require('bluebird'); // bluebird is not neccessary, only for testing
var fc = require('flows');
function a() {
  return bb.resolve(1);
}

function b(v) {
  return bb.resolve(2 + v);
}

fc(a, b).then(function(v) {
  console.log(v); //print 3
}).catch(function(err) {
});
```
### 3. handle error
```
var bb = require('bluebird'); // bluebird is not neccessary, only for testing
var fc = require('flows');
function a() {
  return bb.resolve(1);
}

function b(v) {
  return bb.reject(new Error('test));
}

fc(a, b).then(function(v) {
  console.log(v); //can't come here
}).catch(function(err) {
  console.log(err.message); //test
});
```
### 4. mix promise and sync function
```
var bb = require('bluebird'); // bluebird is not neccessary, only for testing
var fc = require('flows');
function a() {
  return bb.resolve(1);
}

function b(v) {
  return bb.resolve(v + 3);
}

function c(v) {
  return v + 100;
}

fc(a, b).then(function(v) {
  console.log(v); // 104
}).catch(function(err) {
});
```

# flowc
flowc is a tool to controll flows of promises/functions. 

## examples

```
var bb = require('bluebird');
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


# inline

An experiment on JavaScript runtime inlining created and maintained by
[Arnaud Buchholz](http://gpf-js.blogspot.com/).

# API

The goal is to optimize the following function...

```javascript
function somefunction (array) {
    array.forEach(function (item, index) {
        subProcess(item, index);
    });
}
```

... just by changing it into:

```javascript
var somefunction = inline (function (array) {
    array.forEach(function (item, index) {
        subProcess(item, index);
    });
});
```

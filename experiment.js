//region setup
"use strict";

// simple cscript wrapper for console
if ("undefined" === typeof console) {
    /*global console:true, WScript*/
    console = {
        log: function (t) {WScript.Echo("    " + t);},
        info: function (t) {WScript.Echo("[?] " + t);},
        warn: function (t) {WScript.Echo("/!\\ " + t);},
        error: function (t) {WScript.Echo("(X) " + t);}
    };
}

function experiment(label, testFunction, callParameters) {
    // allocate 10 seconds and see how many times we can call the function
    var startDT = new Date(),
        count = 0;
    while (new Date() - startDT < 600) {
        testFunction.apply(null, callParameters);
        ++count;
    }
    console.log(label + ": " + count);
    return count;
}

function compare(list) {
    var idx,
        item,
        result,
        comparison,
        label,
        last;
    for (idx = 0; idx < list.length; ++idx) {
        item = list[idx];
        item.result = result = experiment.apply(null, item);
    }
    list.sort(function (a, b) {
        return b.result - a.result;
    });
    comparison = [];
    for (idx = 0; idx < list.length; ++idx) {
        item = list[idx];
        label = item[0];
        result = item.result;
        if (0 === idx) {
            last = result;
        } else {
            label += " (" + Math.floor(100 * (result - last) / last) + "%)";
        }
        comparison.push(label);
    }
    console.log(comparison.join(" < "));
}

//endregion

function objectForEach(object, callback) {
    var property;
    for (property in object) {
        if (object.hasOwnProperty(property)) {
            callback(object[property], property, object);
        }
    }
}

function objectNotInlined(data) {
    var sum = 0;
    objectForEach(data, function (value/*, name, object*/) {
        sum += value;
    });
    return sum;
}

function objectInlined(data) {
    var property,
        sum = 0,
        value;
    for (property in data) {
        if (data.hasOwnProperty(property)) {
            value = data[property];
            sum += value;
        }
    }
    return sum;
}

var testObject = {a: 1, b: 2, c: 3, d: 4, e: 5};

compare([
    ["objectNotInlined", objectNotInlined, [testObject]],
    ["objectInlined", objectInlined, [testObject]]
]);

function arrayNotInlined(data) {
    var sum = 0;
    data.forEach(function (value/*, index, array*/) {
        sum += value;
    });
    return sum;
}

function arrayInlined(data) {
    var index,
        length = data.length,
        sum = 0,
        value;
    for (index = 0; index < length; ++index) {
        value = data[index];
        sum += value;
    }
    return sum;
}

var testArray = [1, 2, 3, 4, 5];

compare([
    ["arrayNotInlined", arrayNotInlined, [testArray]],
    ["arrayInlined", arrayInlined, [testArray]]
]);

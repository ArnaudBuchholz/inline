// simple cscript wrapper for console
if ("undefined" === typeof console) {
    console = {
        log: function (t) {WScript.Echo("    " + t);},
        info: function (t) {WScript.Echo("[?] " + t);},
        warn: function (t) {WScript.Echo("/!\\ " + t);},
        error: function (t) {WScript.Echo("(X) " + t);}
    };
}

console.log("Test");
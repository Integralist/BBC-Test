var require = curl; // needed for r.js optimizer to work (+ replace all calls to `curl` with `require`)

var config = {
    baseUrl: 'Assets/Scripts',
    pluginPath: 'Assets/Scripts/Plugins',
    paths: {
        'jquery': 'Libraries/jquery'
    }
};

require(config, ['a', 'b', 'c'], init, error);

function init (a, b, c) {
    console.log(a);
    console.log(b);
    console.log(c);
}

function error (err) {
    console.warn(err);
}
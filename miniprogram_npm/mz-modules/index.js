module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1681529022232, function(require, module, exports) {


module.exports = {
  mkdirp: require('./mkdirp'),
  rimraf: require('./rimraf'),
  glob: require('./glob'),
  sleep: require('./sleep'),
  nextTick: require('./nextTick'),
  setImmediate: require('./setImmediate'),
  pump: require('./pump'),
};

}, function(modId) {var map = {"./mkdirp":1681529022233,"./rimraf":1681529022235,"./glob":1681529022236,"./sleep":1681529022237,"./nextTick":1681529022238,"./setImmediate":1681529022239,"./pump":1681529022240}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1681529022233, function(require, module, exports) {


const mkdirp = require('mkdirp');
const wrap = require('./lib/wrap');

module.exports = wrap(mkdirp);

}, function(modId) { var map = {"mkdirp":1681529022233,"./lib/wrap":1681529022234}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1681529022234, function(require, module, exports) {


module.exports = mod => {
  const wrapped = (args1, args2, args3, args4) => {
    // arrow function can't bind arguments, and can't use rest in node@4, sign
    const args = [ args1, args2, args3, args4 ];
    for (let i = args.length - 1; i >= 0; i--) {
      if (args[i] !== undefined) break;
      args.pop();
    }

    return new Promise((resolve, reject) => {
      args.push(function mZmodulesWrapCallback(err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
      mod.apply(null, args);
    });
  };

  for (const key in mod) {
    wrapped[key] = mod[key];
  }

  return wrapped;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1681529022235, function(require, module, exports) {


const rimraf = require('rimraf');
const wrap = require('./lib/wrap');

module.exports = wrap(rimraf);

}, function(modId) { var map = {"rimraf":1681529022235,"./lib/wrap":1681529022234}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1681529022236, function(require, module, exports) {


const glob = require('glob');
const wrap = require('./lib/wrap');

module.exports = wrap(glob);

}, function(modId) { var map = {"glob":1681529022236,"./lib/wrap":1681529022234}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1681529022237, function(require, module, exports) {


module.exports = require('ko-sleep');

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1681529022238, function(require, module, exports) {


module.exports = () => Promise.resolve();

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1681529022239, function(require, module, exports) {


module.exports = () => new Promise(resolve => setImmediate(resolve));

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1681529022240, function(require, module, exports) {


const pump = require('pump');
const wrap = require('./lib/wrap');

module.exports = wrap(pump);

}, function(modId) { var map = {"pump":1681529022240,"./lib/wrap":1681529022234}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1681529022232);
})()
//miniprogram-npm-outsideDeps=["ko-sleep"]
//# sourceMappingURL=index.js.map
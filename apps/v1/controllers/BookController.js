var _ = require('lodash');
var Echo = module.exports = function (data) {
  _.extend(this, data);


  //define express routes
  this.app.get("/", this.hello.bind(this));
};

Echo.prototype.hello = function (req, res) {
  res.send('Hello World')
};
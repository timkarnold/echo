var _ = require('lodash');
var Echo = module.exports = function (data) {
  _.extend(this, data);


  //define express routes
  this.app.get("/", this.hello.bind(this));
};

Echo.prototype.hello = function (req, res) {
  var response = {
    "version": "1.0",
    "response": {
      "outputSpeech": {
        "type": "PlainText",
        "text": "Greetings, from node!"
      },
      "shouldEndSession": true
    }
  };
  res.json(response);
};
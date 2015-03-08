var _ = require('lodash');
var Echo = module.exports = function (data) {
  _.extend(this, data);
  
  //define express routes
  this.app.post("/", this.request.bind(this));
};

Echo.prototype.request = function (req, res) {
  var self = this;
  self.log.info(req);

  if (!req.hasOwnProperty("request") || !req.request.hasOwnProperty("type")) {
    // request failed validation
    self.failed(req, res);
  } else {
    if (req.request.type === "LaunchRequest") {
      // user opened app
      self.launch(req, res);
    } else if (req.request.type === "IntentRequest") {
      // user made request
      switch (req.request.intent.name) {
        case "HelloWorld":
          self.helloWorld(req,res);
          break;
      }
    } else {
      // unsupported request type
      self.failed(req, res);
    }
  }

};

Echo.prototype.failed = function (req, res) {
  var response = {
    "version": "1.0",
    "response": {
      "outputSpeech": {
        "type": "PlainText",
        "text": "Sorry, your request could not be processed."
      },
      "shouldEndSession": true
    }
  };
  res.json(response);
};

Echo.prototype.launch = function (req, res) {
  var response = {
    "version": "1.0",
    "response": {
      "outputSpeech": {
        "type": "PlainText",
        "text": "Greetings, from node!"
      },
      "shouldEndSession": false
    }
  };
  res.json(response);
};

Echo.prototype.helloWorld = function (req, res) {
  var response = {
    "version": "1.0",
    "response": {
      "outputSpeech": {
        "type": "PlainText",
        "text": "Hello World!"
      },
      "shouldEndSession": false
    }
  };
  res.json(response);
};
var _ = require('lodash');
var request = require('request');
var Echo = module.exports = function (data) {
  _.extend(this, data);

  //define express routes
  this.app.post("/", this.request.bind(this));
};

Echo.prototype.request = function (req, res) {
  var self = this;
  var body = req.body;
  self.log.info(req);

  if (!body.hasOwnProperty("request") || !body.request.hasOwnProperty("type")) {
    // request failed validation
    self.failed(req, res);
  } else {
    if (body.request.type === "LaunchRequest") {
      // user opened app
      self.launch(req, res);
    } else if (body.request.type === "IntentRequest") {
      // user made request
      switch (body.request.intent.name) {
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
  var body = req.body;
  var opts = {
    url: "https://hooks.slack.com/services/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",
    json: {
      username: "Echo",
      text: "Hello world!"
    }
  };

  request.post(opts, function (err, resp, body) {});


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
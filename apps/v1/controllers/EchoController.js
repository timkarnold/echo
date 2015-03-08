var _ = require('lodash');
var request = require('request');
var TVRage = require("tvragejson");
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
        case "helloWorld":
          self.helloWorld(req,res);
          break;
        case "postToSlack":
          self.postToSlack(req,res);
          break;
        case "getNextEpisode":
          self.getNextEpisode(req,res);
          break;
      }
    } else {
      // unsupported request type
      self.failed(req, res);
    }
  }

};

Echo.prototype.failed = function (req, res) {
  var self = this;
  self.outputSpeech('Sorry, your request could not be processed.', res);
};

Echo.prototype.launch = function (req, res) {
  var self = this;
  self.outputSpeech('Echobot at your service.', res);
};

Echo.prototype.helloWorld = function (req, res) {
  var self = this;
  self.outputSpeech('Hi there.', res);
};

Echo.prototype.postToSlack = function (req, res) {
  var self = this;
  var body = req.body;
  var channel;

  if (!body.request.intent.slots.hasOwnProperty('message')) {
    self.outputSpeech("Sorry, I didn't hear a message to post", res);
  } else if (!body.request.intent.slots.message.value) {
    self.outputSpeech("Sorry, I didn't catch what your message was", res);
  } else {
    if (body.request.intent.slots.hasOwnProperty('channel') && body.request.intent.slots.channel.hasOwnProperty('value')) {
      channel = body.request.intent.slots.channel.value;
    } else {
      channel = "random";
    }
    var opts = {
      url: "https://hooks.slack.com/services/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",
      json: {
        username: "Echo",
        channel: '#'+channel,
        text: body.request.intent.slots.message.value
      }
    };

    request.post(opts, function (err, resp, body) {
      if (err) {
        self.log.info('Slack Posting Error', err);
        self.outputSpeech("Sorry, there was a problem sending your message.", res);
      } else {
        self.outputSpeech("Message sent!", res);
      }
    });
  }
};

Echo.prototype.getNextEpisode = function (req, res) {
  var self = this;
  var body = req.body;

  if (!body.request.intent.slots.hasOwnProperty('show')) {
    self.outputSpeech("Sorry, I didn't hear what show you were looking for", res);
  } else if (!body.request.intent.slots.show.value) {
    self.outputSpeech("Sorry, I didn't catch what show you are looking for.", res);
  } else {
    // Search for a show by name
    TVRage.search(body.request.intent.slots.show.value, function(err, searchResponse) {
      if (err) {
        self.log.info(err);
        self.outputSpeech("Sorry, I seem to be having issues finding that show", res);
      } else {
        self.outputSpeech("That show's ID is "+searchResponse["Results"]["show"][0]["showid"], res);
        self.info.log(searchResponse);
        /*
        // Get information for a particular show
        TVRage.search(searchResponse["Results"]["show"][0]["showid"], function(err, listingResponse) {
          if (err) {
            self.log.info(err);
            self.outputSpeech("Sorry, I seem to be having issues finding the next episode of show", res);
          } else {
            self.info.log(listingResponse);
            self.outputSpeech("I should be able to tell you that soon!", res);
          }
        });
        */
      }
    });
  }
};


Echo.prototype.outputSpeech = function(text, res){
  var response = {
    "version": "1.0",
    "response": {
      "outputSpeech": {
        "type": "PlainText",
        "text": text
      },
      "shouldEndSession": false
    }
  };
  res.json(response);
};

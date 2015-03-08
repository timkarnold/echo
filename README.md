Echo
=========

Intents JSON
----
```
{
    "intents":[
        {
            "intent":"helloWorld",
            "slots":[
                {
                    "name":"greeting",
                    "type":"LITERAL"
                }
            ]
        },
        {
            "intent": "postToSlack",
            "slots": [
                {
                    "name": "message",
                    "type": "LITERAL"
                },
                {
                    "name": "channel",
                    "type": "LITERAL"
                }
            ]
        },
        {
            "intent":"getNextEpisode",
            "slots":[
                {
                    "name":"show",
                    "type":"LITERAL"
                }
            ]
        }
    ]
}
```

Sample Utterances
----
```
helloWorld      hello {there|greeting}
postToSlack     post to slack {hi|message}
postToSlack     post in slack channel {general|channel}, {greetings|message}
postToSlack     send to slack {test|message}
postToSlack     send to slack channel {random|channel}, {hello|message}
getNextEpisode  when is the next episode of {big bang theory|show}
getNextEpisode  when is the next episode of {walking dead|show}
getNextEpisode  when is the next episode of {top gear|show}
```

Contributors
----
Tim Arnold


License
----

Copyright (c) 2015, Tim Arnold

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
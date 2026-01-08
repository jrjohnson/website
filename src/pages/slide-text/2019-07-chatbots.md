---
layout: ../layouts/Layout.astro
---

## Handling Complicated Tasks with a Chatbot

This is a text summary of [slides for a talk](/talks/2019-07-chatbots).

---
## Who am I?
- Web Platform Engineer and Manager [@ucsf_library](https://twitter.com/ucsf_library) (PHP, Javascript)
- Technical lead for the [Ilios Project](http://iliosproject.org) open source curriculum management system
for health science education.
- UCTech Slack Ambassador

---


## Ilios Story
  - Ilios is a 20 year old project which started as an MS Access Database
  - Built by UCSF, but available for free (and supported)
  - Installed at medical, dental, pharmacy, nursing, around the world including UCI and maybe soon UCSD
  - Been through several revisions since then, but in 2014 we decided to rewrite it

---

## @greeterbot 
### Your First UCTech Friend

https://github.com/stopfstedt/uctech-greeter


- If you want to get your feet wet with bots we could always use help with greeterbot
- If you don't remember what it does just say `greet me` to that app in Slack

---

## @Zorgbort 
### Or whatever stupid name you want to give your bot 

https://github.com/ucsf-ckm/zorgbort


- The Ilios project bot
- Mainly what I'll be talking about today

---

## Automate Everything

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">If you&##39;re scared to deploy on Fridays, you should be scared to deploy ever. <br><br>Don&##39;t you have tests? Backups? Roll back? Come on.</p>&mdash; Jessica Mauerhan (@JessicaMauerhan) <a href="https://twitter.com/JessicaMauerhan/status/1022901553479512064?ref_src=twsrc%5Etfw">July 27, 2018</a></blockquote>

---

## Automation Brings Speed


- Jason is always 'Dialing it in'
- This is a task which may never be completely done, but like CI setup it's always worth getting right
- Good, reliable, automation truly pays off over the long term


### and sometimes money!


- UCSF was able to offer paid hosting support to Stanford (and soon OHSU and USF)
- We were able to do this because we made the administrative costs very low for each instance

---


## Our Automation Goal

Tag Code
1. Tag Code as v65.4.3
2. Go To Lunch
3. v65.4.3 is now in *Production*
4. Repeat

---

## Zorgbort is just the fancy UI


### The hard part is building automated processes


#### But knowing a UI can be built can make the automation process simpler


- Our first iteration was entirely conversational
- You would say `release the frontend` and Zorg would answer back with questions
- It wasn't as pretty, but it mostly got the job done.
---

## Git tags
- We use git tags to drive our process
- Once something is tagged in github it kicks off automation
- Tagging things is easy
- Discovering tags is easy

---

## Slack

- I'm going to be focusing on Slackbots
- There are all kinds of other chatbot options
- Whatever your team is most familiar with should work
- The bot is just a UI on top of a process
- We're using the slack conversation API, there is a newer Blocks API that you should check out.

---

## Node.js

### Easy to deploy lots of places
### Botkit (and many other) frameworks
### Cuz javascript is the BEST!

---

## Home is where the bot lives

- Your bot will probably be portable so you can go with whatever makes you happy
- Lots of options for free bot hosts, or at the very least super cheap
- Some of the biggest names in hosting will host your app
- But probably anything you trust will do
- So what are the minimum requirements

---
## Slackbot anatomy
### ... first of all they're called apps now

<br />
> Don't call us, we'll call you
> Subscribe to the event types you need
> Governed by OAuth permission scopes
> Bot users served here
> Everything is eventual

https://api.slack.com/

---
##  Don't call us, we'll call you
### POST
```json
{
  "token": "XXYYZZ",
  "team_id": "TXXXXXXXX",
  "api_app_id": "AXXXXXXXXX",
  "event": {
          "type": "name_of_event",
          "event_ts": "1234567890.123456",
          "user": "UXXXXXXX1",
          ...
  },
  "type": "event_callback",
  "authed_users": [
          "UXXXXXXX1",
          "UXXXXXXX2"
  ],
  "event_id": "Ev08MFMKH6",
  "event_time": 1234567890
}
```
---
## Everything is eventual
### POST /api/chat.postMessage

```json
{
  "channel":"C061EG9SL",
  "text":"I hope the tour went well, Mr. Wonka.",
  "attachments":[
      {
        "text":"Who wins the lifetime supply of chocolate?",
        "fallback":"You could be telling the computer exactly what it can do with a lifetime supply of chocolate.",
        "color":"##3AA3E3",
        "attachment_type":"default",
        "callback_id":"select_simple_1234",
        "actions":[
            {
              "name":"winners_list",
              "text":"Who should win?",
              "type":"select",
              "data_source":"users"
            }
        ]
      }
  ]
}
```
---
## Botkit
### Our Hero

```javascript
const Botkit = require('botkit');

const hal = new Botkit();
hal.hears('Open the pod bay doors', async (bot, message) => {
  await bot.reply(message, "I'm Sorry Dave, I'm afraid I can't do that.");
});

```
---
## Intelligent Conversation

```javascript
const Botkit = require('botkit');
const Skynet = require('skynet');

const controller = new Botkit();
controller.hears(async (bot, message) => {
  const reply = Skynet.process(message.text);
  await bot.reply(message, reply);
});

```

- Services like AWS Lex can be used to make your bot easier to talk to
- If the bot is just a UI you could attach other UIs to the same structure

---
## Don't trust the Developers at SlackHQ
### Slack should be a thin layer on top of functionality
#### Because the slack API will change
##### Not without warning

- They're paid to invent new things
- they do this a lot
- so your bot will probably be old fast, that's ok.

---
## @Zorgbort

```javascript
module.exports = bot => {
  bot.hears(['start release', 'release'], ['direct_message', 'direct_mention', 'mention'], startRelease);
  bot.on('interactive_message_callback', chooseReleaseType);
  bot.on('interactive_message_callback', confirmRelease);
  bot.on('interactive_message_callback', doRelease);
};
```
https://github.com/ucsf-ckm/zorgbort


- Bot listens for different types of events or keywords and then passes execution
  off to another function.

---
## @Zorgbort
### chooseReleaseType

```javascript
const startRelease = async (bot, message) => {
  bot.reply(message, createActionReply(':cool: I just need to know:', releaseProject, [
    {
      name: 'project',
      text: 'Which Project?',
      type: 'select',
      options: [
        {
          text: 'Ilios Frontend',
          value: 'frontend',
        },
        {
          text: 'Ember Simple Charts',
          value: 'simple-charts',
        },
      ]
    },
  ]));
};
```
https://github.com/ucsf-ckm/zorgbort


- Some of those functions send messages back for clarification / authentication
---
## @Zorgbort
### releaseAndTag

```javascript
const releaseAndTag = async (owner, repo, releaseType, namer) => {
  const { nextVersion, currentVersion } = await incrementPackageVersion(dir, releaseType);
  await commitAndTag(dir, version, releaseName);
  const release = await Github.repos.createRelease({
    owner,
    repo,
    tag_name: version,
    name: releaseName,
    body: releaseNotes,
    draft: false,
    prerelease: false,
  });

  return {
    version,
    releaseName,
    releaseUrl: release.data.html_url
  };
};
```
https://github.com/ucsf-ckm/zorgbort


- But the real meat is done without the bot at all, this makes it easier to switch
  out the conversational parts and to test the non-bot stuff.

---

# Start the Conversation
## Send Alerts
## Start a Virtual Standup
### Remind Yourself to Drink More Water

```javascript
await bot.startConversationInChannel(SLACK_CHANNEL_ID);
await bot.say('The Server is On Fire!!! :fire:');
await bot.say('Everybody Blame Jon');
await bot.say("PS: don't tell Jon!");
```
---

## Security
### Depends on the specific threat
### Slack requires token auth and SSL
### You may need to validate users yourself

---

## Authorize Users

```javascript
if (validUsers.includes(user)) {
  try {
    return await releaseAndTag(owner, repo, releaseType, namer);
  } catch (e) {
    bot.reply(message, `Error: ${e.message} (stack trace in logs)`);
    console.error(e);
}
```

- Slack UserIds are persistent
- Only as good as slack's account security
---
## Testing locally

```bash
$ npm start
> zorgbort@1.0.0 start
> node zorgbort.js

Initializing Botkit v0.7.4
info: ** Using simple storage. Saving data to .data/db/
info: ** Starting webserver on port 3000
info: ** Serving webhook endpoints for Slash commands and outgoing webhooks at: http://0.0.0.0:3000/slack/receive
info: ** Serving login URL: http://0.0.0.0:8899/login
info: ** Serving oauth return endpoint: http://0.0.0.0:3000/oauth
```

### So how to we hookup slack to port 3000?

```bash
$ npm install -g localtunnel
```

```bash
$ lt --port 3000 -s zorgbort-stage
your url is: https://zorgbort-stage.localtunnel.me
```

![Screenshot of Slack's Interactive setup process](media/slack-interactive.png)


- The localtunnel NPM module is mad sweet
- Slack let's you pick any URL to send things to, create a test-bot app and a real one.

---

## Let's Review
### Bots Are Cool
#### But They're Really Just Window Dressing

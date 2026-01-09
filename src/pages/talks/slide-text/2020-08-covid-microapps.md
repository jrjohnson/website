---
layout: ../../../layouts/MarkdownLayout.astro
title: 'Microapps: A Covid-19 Case Study Text'
---

# [Microapps: A Covid-19 Case Study](https://www.jrjohnson.dev/talks/2020-08-covid-microapps)

## Along Came Covid

### Went through the same transition as all of you:

- Preparation for remote work
- Sheltering in Place and freaking out as a community
- How can we help?

## No one asks technologists for help any more

- We've trained everyone that technology is only a solution for really big problems
- We've conditioned everyone that asking for help is an invitation to a thousand questions and no solution
- We've taught everyone to fear technology and the people who build it
- We've ensured that everyone knows technology is EXPENSIVE so should only be a solution for really big problems

## Seems like all I ever get to do is say no.

- I have a "gift" from a former team to celebrate my "personality" as the Turtle, always slowing things down and asking lots of questions
<blockquote class="twitter-tweet" data-lang="en" data-dnt="true"><p lang="en" dir="ltr">my primary skillset as an engineer is saying &quot;it depends&quot; and &quot;it&##39;s more complicated than that&quot; until we all decide computers were a mistake</p>&mdash; brianloveswords (@brianloveswords) <a href="https://twitter.com/brianloveswords/status/1291093391133081602?ref_src=twsrc%5Etfw">August 5, 2020</a></blockquote>

## So Tired of saying no

Let's break out of this pattern, we have the tools and experience to build wonderful solutions to every day problems

## Microapps

[Web Development with the Microapplication Pattern](https://www.jrjohnson.dev/talks/2017-08-microapps-uccsc)

-Custom built to solve a problem
-Can be developed quickly by trusting in infrastructure and frameworks
-Are not "hacks", they are designed to go into production and be stable for years
-Can be handed off to another developer instantly (batteries included)

### Dreams We've Been Sold

- Intranet
- Enterprise Service Bus
- Content Management Systems

### The FutureMight actually be here

## So with some trepidation and no little excitement

I asked... how can we help?
and surprisingly there was something we could do

## Problem: Send A Message Everyday at 4am

### Everyday Task

- 4am email must go out every day
- Needs to come from a specific trusted user
- Respondents click a link and answer some questions

### Not a complicated problem

- Exactly the kind of task that used to keep me up at night
- If we have to start from scratch it is going to cost WAY more than just hiring a temp to do it

## Timeline

- Friday 4/10 - First Contact
- Monday 4/13 (morning) - Initial Requirements
- Monday 4/13 (afternoon) - Test Email Delivered for Approval
- Tuesday 4/14 (morning) - Approved for Production Thursday Morning
- Tuesday 4/14 (afternoon) - Requirements change, goes out only MWF

> I received the email and the links worked. Seems like this is all set, thank you!

- Friday 4/17 5am - First Messages Sent Successfully

> I just received a request to stop the automated emails. The campus is no longer needing this information.

- Friday 5/15 Service No Longer Needed

## Sending Email

### With Node.js

```javascript
async function sendReminderEmails(BccAddresses = [], CcAddresses = [], Source) {
  const params = {
    Destination: {
      BccAddresses,
      CcAddresses,
    },
    Message: {
      Body: getEmailBody(),
      Subject: {
        Charset: 'UTF-8',
        Data: 'Urgent: Completion of GME DAILY Staffing Report Survey',
      },
    },
    Source,
  };
  const ses = new AWS.SES();
  await ses.sendEmail(params).promise();
}

exports.sendReminderEmails = sendReminderEmails;
```

## Sending Email is Difficult to Automate

### Problem isn't creating the email, it is delivering it

- You need a server to send the message from
- If the server doesn't have a relationship with recipients mail may be lost
- Sender must be verified or it will get rejected
- If you don't get all the details right it goes straight to the SPAM folder

## [AWS Lambda](https://aws.amazon.com/lambda/)

### "serverless"

![lambda description: upload code, create a trigger to run it, only pay for what you use](/slides/2020-08-covid-microapps/media/lambda.png)

## [AWS Simple Email Service (SES)](https://aws.amazon.com/ses/)

-API Based Email
-No Sendmail Configuration
-SPF / DKIM

- Delivery Dashboard

## Where does the code live?

- Where do you physically locate the code?
  - Will it be safe there if this is running for a year?
- Where can other people review / take over the code?
- How do changed get into test / production environments
- Where does documentation live

## Github

![GME Github Front Page showing code, issue tracker and documentation](/slides/2020-08-covid-microapps/media/gme-github.png)

## Github Actions

```yaml
on:
  push:
    tags:
      - '*'
  deploy:
    steps:
      - uses: actions/checkout@v1
      - uses: actions/setup-node@v1
        with:
          node-version: 12
      - run: npm ci
      - run: npm run deploy:production
```

- Provides Continuous Integration and Delivery for all Github Repositories
- This Action waits to see a new git tag and then deploys our app to production
- Super configurable to do a LOT of things:
  - Run Tests
  - Deploy Docker Containers
  - Calculate file size changes
  - Update Dependencies on Monday Morning
  - Add labels, notify maintainers, create comments
  - ... basically anything you can automate actions can run

## [Serverless Framework](https://www.serverless.com/)

### serverless.yml

```yaml
service: gme-daily-resident-staffing-survey
provider:
  name: aws
  runtime: nodejs12.x
  iamRoleStatements:
    - Effect: 'Allow'
      Action:
        - SES:SendEmail
      Resource: arn:aws:ses:us-west-2:********:identity/*****

functions:
  send:
    handler: handler.sendEmails
    events:
      - schedule:
          rate: cron(00 12 ? * MON,WED,FRI *) ##UTC
      - schedule:
          rate: rate(15 minutes)
          enabled: false ## manually enable in the console in CloudWatch Events to start sending test Emails
    environment:
      SENDER_ADDRESS: ${self:custom.senderAddress.${self:provider.stage}}
      SENDER_NAME: ${self:custom.senderName.${self:provider.stage}}
      RECIPIENT_ADDRESSES: ${self:custom.recipients.${self:provider.stage}}
```

- Setup a server to run on a schedule
  - Start up
  - Run Script
  - Shut Down
- Bill us in 100ms increments, we might spend $20 this year

## [Something a bit more permanent](https://github.com/ucsf-ckm/som-qualtrics-survey-responses)

- Pull data from Qualtrics API
- Convert to CSV and Save to S3
- Easy to add new surveys
- Runs every 15 minutes

### Details

- Response to an emergency (Missed notifications of Qualtrics API Change)
- Discontinuing March 31st
- In production April 1st
  - Complete Documentation
  - Process for adding new surveys
  - Automatic deployment of staging and production environments

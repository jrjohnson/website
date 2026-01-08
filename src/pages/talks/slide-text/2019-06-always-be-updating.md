---
layout: ../../../layouts/ContentLayout.astro
---

## Always Be Updating

This is a text summary of [slides for a talk](/talks/2019-06-always-be-updating).

## Who am I?

- Web Platform Engineer and Manager [@ucsf_library](https://twitter.com/ucsf_library) (PHP, Javascript)
- Technical lead for the [Ilios Project](http://iliosproject.org) open source curriculum management system
  for health science education.
- Making my second trip to ISS (first since the oughts)

---

## Our Story

- Ilios is a 20 year old project which started as an MS Access Database
- Built by UCSF, but available for free (and supported)
- Installed at medical, dental, pharmacy, nursing, around the world including here at the UC Davis veterinary school
- Been through several revisions since then, but in 2014 we decided to rewrite it

---

## Stack

### LAMP + JAM

- LAMP: Linux, Apache, MySQL, PHP
- PHP API written in Symfony
- JAM: Javascript and Markup
- Javascript single page app using Ember.js
- Hosted on AWS

---

## Small Team

- Three Engineers (code + operations)
- Two Product Folks (ownership + management + support)

---

## Sensitive Data

- Account data (username, email, password)
- Email and other contact details
- Class schedules
- FERPA protected education data

#### If you want to know how we handle access to data I'd recommend tomorrows Robot Permission Overlord Talk

---

## Our Biggest Risks

### Same as everyone else:

- OWASP Top 10

#### Huge dependency graph

- No time for keeping OS packages up to date

---

## OWASP Top 10 2017

### Three Items Address Dependencies Directly

- A4:2017 XML External Entities (XXE)
- A8:2017 Insecure Deserialization
- A9:2017 Using Components with Known Vulnerabilities
  <br><br><br>

## So how many components do we use?

---

## A Lot!

<i class="huge fas fa-tally"></i>

---

## Like, A Lot, A Lot!

<i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i>

<i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i>

<i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i><i class="fal fa-tally"></i>

---

## Dependencies

### Direct (Production)

- 39 PHP
- 88 Javascript

### Transitive

- 153 PHP
- 7668 Javascript

- PHP app another 8 just for tests
- Our javascript is missing a standard library, thus, CHAOS!

---

## Not the Whole Story

#### Another three similar javascript apps to maintain

#### No way to count the number of things needed to run PHP, Apache, and Linux. It's HUGE!

---

## [infinity gif goes here]

### [if I had ever found one that didn't make dizzy]

---

## Are we building on a house of cards?

![image of worlds largest playing card stack](media/card-stack.jpg)

https://www.guinnessworldrecords.com/world-records/tallest-house-of-cards

---

## Maybe

### But We Still Need to Keep it Updated

#### <i class="fas fa-grin-wink"></i> Hopefully that's what you're all **here for** <i class="fas fa-grin-wink"></i>

---

## But How?

### 1) Don't Panic!

### 2) Split updates into small testable chunks

### 3) Write tests until you're confident in them

### 4) Just put it in the cloud

### 5) Use the time you're saving to automate everything

### (BONUS) Give this talk: 😱 `goto Step One`

---

## Pull Request Model <i class="fab fa-github"></i>

![screen capture of status checks](media/status-checks.png)

- Fork an pull
- PRs
- Code Review
- Greenkeeper
- Code Climate
- Waffle IO
- Comfortable standard process for new contributors

---

## Continuous Integration / Delivery

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Hey, everyone working on <a href="https://twitter.com/nodejs?ref_src=twsrc%5Etfw">@nodejs</a> core tests and continuous integration! Congratulations on a full week of node-daily-master jobs! It&#39;s been a while since we had a string of green like that. <a href="https://t.co/wCxpRKynuu">https://t.co/wCxpRKynuu</a></p>&mdash; Rich Trott (@trott) <a href="https://twitter.com/trott/status/1022892277885165568?ref_src=twsrc%5Etfw">July 27, 2018</a></blockquote>
<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">continuous delivery is never having to say you&#39;re sorry</p>&mdash; just the saddest server (@sadserver) <a href="https://twitter.com/sadserver/status/831662255594889216?ref_src=twsrc%5Etfw">February 15, 2017</a></blockquote>
<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Dropping columns in a rails migration is such a big foot gun. If you follow all the guides and stack overflow answers, you will break your production application during deploys.</p>&mdash; Robin Ward (@eviltrout) <a href="https://twitter.com/eviltrout/status/975838465823780865?ref_src=twsrc%5Etfw">March 19, 2018</a></blockquote>
<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Continuous Integration <a href="https://t.co/OuFnPERgKU">https://t.co/OuFnPERgKU</a></p>&mdash; Ire Aderinokun (@ireaderinokun) <a href="https://twitter.com/ireaderinokun/status/727100957654405120?ref_src=twsrc%5Etfw">May 2, 2016</a></blockquote>

- CI / CD have buzzword aspirations for sure
- Loosely Integration is the process of constantly testing changes
- Always be merging - we should always keep our `master` branch deployable; that means
  at any given moment we're sure we can ship master to production.
- continuous delivery generally means that every change is immediately sent to production
- We don't do continuous delivery at all. What we do instead is ensure that we _could_ deliver
  at any time very rapidly. We're all setup for automated delivery, but we hold off on shipping releases
  until we accumulate enough meaningful changes. Usually this happens at the end of the week, but it could
  happen any time.

---

## TravisCI

![screenshot of Travis Building many pull requests](media/travis.png)

---

## Azure

![screenshot of azure Build Split Into Chunks](media/azure.png)

- Our build can be split into chunks to run faster

---

## Functional Review

![functional review comment says click tests look fine](media/functional-review.png)

- Every change needs a testable build
- We automate this with Netlify

---

## Let's Talk about tests

- I've never met anyone who didn't want to ship well tested quality software. So why don't we all? It's a lot of work. Start small. Make writing tests easy. Spend a lot if time on your test harness. You're the user. Focus on your experience.
- I'm incredibly lazy and super forgetful so I need the computer to handle checks.
- I'm sloppy and I can't spell
- Tests also include code style rules
- You can do Test Driven Development or Test Reminder Development or Write Tests When Done Development, just write the tests

---

## <i class="fas fa-magic"></i> Magic? <i class="fas fa-magic"></i>

![Harry potter holding a wand for the first time](media/harry-potter.gif)

## No. Just Good Test Coverage.

- When we set out to rewrite I wanted to focus hard on testing
  - Lots of reason to do this
  - Save time on hunting down regressions
  - on board new team members more effectively

### What I didn't know was how much more secure they would make us

---

## Easier to Test with a Solid Foundation

![ember testing docs screenshot](media/ember-testing.png)
![symfony testing docs screenshot](media/symfony-testing.png)

- We built on top of Ember.js and Symfony
- Prominent testing documentation
- Up to date and community maintained documentation
- We knew we wouldn't have to document our tools
- The more integrated the framework the easier it is to hire productive people
- STAY UP TO DATE (semver, release plans, BC promises)

---

## Tests are a Speed Multiplier

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">I know it seems counterintuitive but just hear me out: It gets faster to do things correctly if you keep doing them correctly. It might be slow at first if you’ve just been chucking things in the bin- change can be hard but don’t give up!! You deserve good code too.</p>&mdash; Melanie Sumner 💥 🐹 (@melaniersumner) <a href="https://twitter.com/melaniersumner/status/1026934392160104454?ref_src=twsrc%5Etfw">August 7, 2018</a></blockquote>

- Writing tests can be painful
- Writing tests can be slow
- Running tests takes time
- Still worth it
- 2760 Merged PRs on Frontend in 4 years (something like 13 changes / week)
- Test unlock staying up to date

---

## Dependabot Handles Updates

![Dependabot Pull Request](media/dependabot.png)

- Every weekday our team wakes up to pull requests from dependabot
- If tests pass we usually merge them
- Some libraries are more visual and we hand test those changes
- Almost everything else can be merged automatically

---

## Our Dependabot Config

```yaml
version: 1

update_configs:
  - package_manager: php:composer
    directory: "/"
    update_schedule: daily
    ignored_updates:
      - match:
          dependency_name: "symfony/*"
    automerged_updates:
      - match:
          dependency_type: all
          update_type: all
```

## https://github.com/ilios/ilios/blob/master/.dependabot/config.yaml

## More than just convenience

![Dependabot PR which indicates a new person did the release](media/dependabot-new-releaser.jpg)

---

## <i class="fas fa-cloud"></i> In the Cloud <i class="fas fa-cloud"></i>

.boxes[

#### <i class="fab fa-aws"></i>

#### <i class="fab fa-google"></i>

#### <i class="fal fa-database"></i>

![sentry.io logo](media/sentry-logo-black.svg)
]

- Error reporting as a service
- Let someone else handle infrastructure wherever possible
- Save this time! (you're going to need it in a minute)
- AWS RDS database is slightly more expensive that EC2, but you don't have to manage it
- Aurora even better and cheaper when load is variable and still less to manage

---

## On that subject <i class="fas fa-cloud"></i>...

### Let's talk about containers!

<i class="fal big fa-server"></i>

---

<i class="fas fa-fire-alt"></i><i class="fas fa-fire-alt"></i><i class="fas fa-fire-alt"></i><i class="fas fa-fire-alt"></i><i class="fas fa-fire-alt"></i><i class="fas fa-fire-alt"></i><i class="fas fa-fire-alt"></i><i class="fas fa-fire-alt"></i><i class="fas fa-fire-alt"></i><i class="fas fa-fire-alt"></i><i class="fas fa-fire-alt"></i><i class="fas fa-fire-alt"></i>

## Docker <i class="fab fa-docker"></i>

<i class="fas fa-fire-alt"></i><i class="fas fa-fire-alt"></i><i class="fas fa-fire-alt"></i><i class="fas fa-fire-alt"></i><i class="fas fa-fire-alt"></i><i class="fas fa-fire-alt"></i><i class="fas fa-fire-alt"></i><i class="fas fa-fire-alt"></i><i class="fas fa-fire-alt"></i><i class="fas fa-fire-alt"></i><i class="fas fa-fire-alt"></i><i class="fas fa-fire-alt"></i>

---

## Docker is environment as code

```docker
FROM php:7.2-apache-stretch

RUN \
    /usr/bin/composer install \
    --prefer-dist \
    --no-dev \
    --no-progress \
    --no-interaction \
    --no-suggest \
    --classmap-authoritative

RUN /usr/bin/composer dump-env $APP_ENV
RUN /usr/bin/composer clear-cache
RUN bin/console assets:install

EXPOSE 80

```

Our Dockerfile: https://github.com/ilios/ilios/blob/master/Dockerfile

#### What does this mean

- We're relying on a base provided by PHP the language
- It relies on debian stretch and apache in turn
- Each of this organizations can release new versions at any time
- We then layer on anything special we need to run our app

---

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewbox="0 0 392.11 392.11" aria-hidden="true">
  <title>Ilios Logo</title>
  <path d="M371.83,461.83c-77.62-89.13-98.6-113.11-30.25-93.76-62.12-34.35-30.23-36.41,87.67-44.87-117.91-8.47-149.8-10.52-87.67-44.87-68.34,19.35-47.37-4.63,30.26-93.76-89.12,77.62-113.11,98.6-93.76,30.25-34.35,62.12-36.41,30.23-44.87-87.68-8.47,117.91-10.53,149.8-44.87,87.68,19.35,68.34-4.64,47.37-93.76-30.26,77.62,89.13,98.59,113.11,30.25,93.76,62.12,34.35,30.23,36.41-87.68,44.87,117.91,8.47,149.8,10.52,87.68,44.87,68.34-19.35,47.37,4.63-30.25,93.76,89.12-77.62,113.11-98.6,93.76-30.25,34.35-62.12,36.41-30.23,44.87,87.68,8.47-117.91,10.52-149.8,44.87-87.68C258.71,363.23,282.7,384.21,371.83,461.83Z" transform="translate(-37.14 -127.14)"/>
  <text x="50%" y="50%" alignment-baseline="middle" text-anchor="middle">Ilios</text>
</svg>
### <i class="fal huge fa-water-rise"></i>
## Updates

- From distro to apache to php to us every layer is constantly updating
- All we need to do is listen and re-build our own image when these changes happen
- Docker hub does this for us

---

## New PHP Version?

`FROM php:7.2-apache-stretch`
FROM php:**7.2**-apache-stretch
FROM php:**7.3**-apache-stretch

---

## Installation Optimizations

RUN composer install \<br>
**--prefer-dist** \<br>
--no-dev \<br>
--no-progress \<br>
--no-interaction \<br>
**--no-suggest** \<br>
--classmap-authoritative

---

## Automation

### <i class="fab fa-slack"></i> <i class="fal fa-arrow-right"></i><i class="fal fa-robot"></i> <i class="fal fa-arrow-right"></i> <i class="fab fa-github"></i> <i class="fal fa-arrow-right"></i> <i class="fab fa-docker"></i> <i class="fal fa-arrow-right"></i> <i class="fab fa-aws"></i> <i class="fal fa-arrow-right"></i> <i class="fal fa-users"></i>

## You

### <i class="fal fa-laptop"></i> <i class="fal fa-arrow-from-left"></i> <i class="fal fa-coffee"></i> <i class="fal fa-arrow-from-left"></i><i class="fal fa-smile"></i>

Tag Code

1. Tag Code as v65.4.3
2. Go To Lunch
3. v65.4.3 is now in _Production_
4. Repeat

---

## How does this help us stay secure?

1. We update the underlying OS as often as we deploy (~ 2 weeks)
2. Every version is completely atomic and can be tested top to bottom (we're not good at this yet)
3. The more often we update the less each update impacts us
4. More time to write tests.

---

## Automate Everything

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">If you&#39;re scared to deploy on Fridays, you should be scared to deploy ever. <br><br>Don&#39;t you have tests? Backups? Roll back? Come on.</p>&mdash; Jessica Mauerhan (@JessicaMauerhan) <a href="https://twitter.com/JessicaMauerhan/status/1022901553479512064?ref_src=twsrc%5Etfw">July 27, 2018</a></blockquote>

---

## Automation Brings Speed

- Jason is always 'Dialing it in'
- This is a task which may never be completely done, but like CI setup it's always worth getting right
- Good, reliable, automation truly pays off over the long term

### and sometimes money!

---

## @Zorgbort <i class="fas fa-robot"></i>

### Or whatever stupid name you want to give your bot <i class="fas fa-smile"></i>

#### Automate Everything

https://github.com/ucsf-ckm/zorgbort

### Interested? I'll be talking about our chatbot at UCTech this year. Love to see you there!

---

## Discussion / Questions?

### UCTech Slack: https://uctech.slack.com <br><br>

#### Slides at:

##### https://jrjohnson.dev/talks/2019-06-always-be-updating.html

## Thanks

- ISS for the invitation
- UCSF Library
- My Team

## This is the first time I've given this talk so please ask me

## at least three questions so I know what needs improvement!

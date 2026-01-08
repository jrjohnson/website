---
layout: ../../../layouts/ContentLayout.astro
---

# Automagic Deployment with Github Actions

## Jon Johnson <span class="pronouns">(he/him)</span>

UCSF Library Educational Technology

- Team Supports, Hosts, and Develops Moodle, Kaltura and Ilios

# The Problem

## Building Something People Enjoy Using is Stressful

- They want them to work
- and be fast
- and be accurate
- and have new useful features

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">It&#39;s Friday the 13th in 2020, I double dog dare you to deploy to production!</p>&mdash; Molly Struve 🦄 (@molly_struve) <a href="https://twitter.com/molly_struve/status/1327243228626755584?ref_src=twsrc%5Etfw">November 13, 2020</a></blockquote>

# Some Things That Can Help

- Agile Process
- Tests
- Continuous Integration
- Continuous Delivery(or at least easy to start deploys)

# The UCTech Connection

- 2009 Agile all the things!
- 2011 Test all the things!
- 2012 Automate all the things!
- 2013 CI _is_ all the things!
- I'm constantly building on things I've learned at UCTech
- UCTech is the first place I realized that some of this fancy stuff could work in our structure
- Leaned about CI at Irvine. Afterwards I was so blown away I had to take a walk and ended up sitting under a tree thinking about how amazing it would be to test every change. How freeing that would be (I was pretty bogged down in an endless cycle of fixing bugs and causing other bugs)

# Let's Talk About Agile

- Make It Whatever You Want
- As Long as You Can Get Feedback Fast
- There are a bunch of ways to do agile well
- One of the only ways to do it wrong is to get too caught up in trying to do it by someones else's definition
- I lead two "agile" teams with 80% of the same people and they run totally different processes
  - Both of them can get code into production in under an hour

# Let's Talk About Tests

<blockquote class="twitter-tweet" data-lang="en" data-dnt="true"><p lang="en" dir="ltr">The first rule of magic: have a clear intent.This is why TDD works. You express your intent by writing a test. That way the fae running around the CPU can’t twist your spell into a curse.</p>&mdash; Beth (@bethcodes) <a href="https://twitter.com/bethcodes/status/1557497868197453824?ref_src=twsrc%5Etfw">August 10, 2022</a></blockquote>

- I'm incredibly lazy and super forgetful so I need the computer to handle checks.
- I'm sloppy and I can't spell
- Tests also include code style rules
- You can do Test Driven Development or Test Reminder Development or Write Tests When Done Development, just write the tests
- It will take at least a week to write your first test
- It will take another two weeks to get it running automatically

### Great First Tests

```
1!=2
```

```
visit(url) get 200 code
```

```
Output name of favorite dog
```

# Let's Talk About Tests

- Bad Tests are Still Great Tests
- Ilios Had Bad Tests
  - Getting them to run was a perfect first day.
  - Getting them to fail was a great second day.
  - In my second week the "terrible" tests saved me from a horrible mistake
    Write bad tests!!!

# Easier to Test with a Solid Foundation

- We built on top of Ember.js and Symfony
- Prominent testing documentation
- Up to date and community maintained documentation
- We knew we wouldn't have to document our tools
- The more integrated the framework the easier it is to hire productive people
- STAY UP TO DATE (semver, release plans, BC promises)

# Tests are a Speed Multiplier

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">I know it seems counterintuitive but just hear me out: It gets faster to do things correctly if you keep doing them correctly. It might be slow at first if you’ve just been chucking things in the bin- change can be hard but don’t give up!! You deserve good code too.</p>&mdash; Melanie Sumner 💥 🐹 (@melaniersumner) <a href="https://twitter.com/melaniersumner/status/1026934392160104454?ref_src=twsrc%5Etfw">August 7, 2018</a></blockquote>

- Writing tests can be painful
- Writing tests can be slow
- Running tests takes time
- Still worth it
- 4144 Merged PRs on Frontend since September 2014
- 2396 Merged PRs in common Since July 2017 over 264 weeks
- Something like 20 changes / week (just in the UI)
- Test unlock staying up to date (and Secure!!!!)

# Continuous Integration With Github Actions

## Choose When it Runs

```yaml
on:
  push:
    branches:
      - master
  pull_request:
  schedule:
    - cron: "33 2 * * 1" # weekly, on Monday morning
```

https://github.com/ilios/ilios/blob/master/.github/workflows/ci.yml

# Continuous Integration With Github Actions

## Jobs and Steps

```yaml
---
jobs:
  code_style:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: shivammathur/setup-php@v2
        with:
          coverage: none
          php-version: 8.1
          extensions: apcu
      - run: vendor/bin/phpunit
```

https://github.com/ilios/ilios/blob/master/.github/workflows/ci.yml

## Checkout

- Actions (or workflows) are a blank slate
- You even have to tell them to checkout your code

## Github Runners:

- Ubuntu
- Windows Server
- OSX
- You can also host your own bespoke runner

## We're using a community action here to install PHP

- Github Maintains a Marketplace of Such Actions
- You can also write your own

## Last part is "run"

- Run a CLI command to do whatever you want

# Continuous Integration With Github Actions

## Jobs (Code Style)

```yaml
---
code_style:
  steps:
    - run: composer install --no-interaction --prefer-dist
    - run: vendor/bin/phpcs
    - run: bin/console lint:twig templates custom
    - run: |
        bin/console cache:warmup --env=dev
        vendor/bin/phpstan analyse --no-progress
    - run: |
        bin/console cache:warmup --env=test
        vendor/bin/phpstan analyse -c tests/phpstan.neon.dist tests --no-progress
```

https://github.com/ilios/ilios/blob/master/.github/workflows/ci.yml

## It's a confusing time in PHP land

- Lots of ways to analyze your code
- Here we have two linters which look at code style
- And a static analysis tool which can catch all kinds of other interesting bugs

# Continuous Integration With Github Actions

## Tests (PHPUnit)

```yaml
tests:
  strategy:
    matrix:
      php-version: [8.1,8.2]

  steps:
  ...
  - name: Use PHP ${{ matrix.php-version }}
    uses: shivammathur/setup-php@v2
    with:
      php-version: ${{ matrix.php-version }}
  - name: install dependencies
    run: composer install --no-interaction --prefer-dist
  - name: Run Tests
    run: vendor/bin/phpunit
```

https://github.com/ilios/ilios/blob/master/.github/workflows/ci.yml

## Matrix of Versions

- Our official policy is to support the most recently released version of PHP
- But for at least 3 months after that release we support the previous version
- We run our tests against both
- We also run regular weekly tests against the upcoming beta releases so we can report any issues

# Continuous Integration With Github Actions

## MySQL Migrations

```yaml
test_migrations_against_mysql:
  name: Test Migrations Against MySQL
  steps:
  ...
  - name: Drop, Create, Migrate, and Validate DB
    env:
      ILIOS_DATABASE_URL: mysql://root:root@127.0.0.1:3306/ilios?serverVersion=8.0
    run: |
      sudo systemctl start mysql.service
      bin/console doctrine:database:drop --if-exists --force
      bin/console doctrine:database:create
      bin/console doctrine:migrations:migrate  --no-interaction
      bin/console doctrine:schema:validate
```

https://github.com/ilios/ilios/blob/master/.github/workflows/ci.yml

## MySQL is installed already

- The Github runner has mysql on it, we just need to start it

# Continuous Integration With Github Actions

## Combine Jobs

```yaml
...
build_containers:
  steps:
  ...
  - name: Build fpm
    uses: docker/build-push-action@v3
    with:
      target: fpm
run_containers:
  steps:
  ...
  - run: docker load --input /tmp/fpm-image/fpm.tar
  - run: |
      docker run -d --name ilios-fpm fpm:testing
      docker exec ilios-fpm php bin/console monitor:health
  - if: failure()
    run: docker logs ilios-fpm
```

https://github.com/ilios/ilios/blob/master/.github/workflows/ci.yml

# Let's Talk About Deployment

![Jackson, a brown and black chihuahua min-pin mix waiting with his toy ball](media/jackson-with-ball.jpg)

# The Many Deploys of Ilios

- Preview UI Changes
- Publish NPM Packages
- Push Code to AWS
- Push Containers to Registry

# Publish Packages

- Tag Version
- Create Release
- Publish Package

# Tag Version

```yaml
on:
workflow_dispatch:
  inputs:
    releaseType:
      description: "Semver Release Type (major,minor,patch)"
jobs:
  tag:
    steps:
      - uses: actions/checkout@v3
        with:
          token: ${{ secrets.ZORGBORT_TOKEN }}
      - name: Increment Version
        run: npm version ${{ github.event.inputs.releaseType }}
      - name: Push Changes
        run: git push --follow-tags
```

https://github.com/ilios/common/blob/master/.github/workflows/tag_version.yaml

### WTF Is Zorgbort

- It's our robot name, we use it for our chatbot and for resource accounts
- Talked about it at UCTech a few years ago (slides on my site)

### Changes Since Then

- Slack Bolt Framework
- Deployed to Lambda with serverless Framework
- Provides a friendly chatbot experience on top of actions

# Create Release

```yaml
on:
  push:
    tags:
      - "*"

jobs:
  notes:
    steps:
      - name: Generate Release Notes
        id: notes
        run: |
          NOTES=$(npx generate-github-release-notes ilios common ${{ steps.previousTag.outputs.tag }} ${{steps.nextTag.outputs.tag}})
          echo ${NOTES}
          # remove line breaks from notes so they can be passed around
          NOTES="${NOTES//$'\n'/'%0A'}"
          echo "::set-output name=releaseNotes::$NOTES"
      - uses: ncipollo/release-action@v1
        with:
          body: ${{steps.notes.outputs.releaseNotes}}
          token: ${{ secrets.ZORGBORT_TOKEN }}
```

https://github.com/ilios/common/blob/master/.github/workflows/create_release.yaml

# Create Release https://github.com/ilios/common/releases/tag/v69.2.0

# Publish Package

```yaml
name: Publish NPM Package

on:
release:
  types: [published]

jobs:
  publish-npm:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: install dependencies
        run: npm ci --ignore-scripts
      - name: publish
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.npm_token}}
```

https://github.com/ilios/common/blob/master/.github/workflows/release.yaml

# Push Code to <i class="fa-brands fa-aws" title="AWS"></i>

- Tag Version
- Create Release
- Pack and Push Files
- Send Release Data to Sentry

# Pack and Push Files

- Compile Styles
- Transpile Javascript
- Minify and Compress Files(brotli, gzip, plain)
- Send it to S3<i class="fa-brands fa-aws" title="AWS"></i>

# Pack and Push Files

```yaml
on:
  push:
    tags:
      - "*"

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - name: install dependencies
        run: npm ci
      - name: Ember CLI Deploy
        run: npm run deploy:production
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

https://github.com/ilios/frontend/blob/master/.github/workflows/deploy-production.yml

## Framework FTW!

- Zero Config or Convention over Configuration Frameworks can often do really nice builds
- As long as it will run on Ubuntu, Windows, or OSX you can run it in a workflow

# Send Release Data to Sentry

```yaml
  deploy:
    steps:
    ...
    - name: Install Sentry CLI
      run: npm install -g @sentry/cli
    - name: Create a Sentry.io release
      run: |
        # Create new Sentry release
        export SENTRY_RELEASE=$(sentry-cli releases propose-version)
        sentry-cli releases new $SENTRY_RELEASE
        sentry-cli releases set-commits --auto $SENTRY_RELEASE
        sentry-cli releases files $SENTRY_RELEASE upload-sourcemaps tmp/deploy-dist/
        sentry-cli releases finalize $SENTRY_RELEASE
      env:
        SENTRY_AUTH_TOKEN: ${{ secrets.SENTRY_AUTH_TOKEN }}
```

https://github.com/ilios/frontend/blob/master/.github/workflows/deploy-production.yml

# Let's talk about containers!

## Docker is environment as code

```docker
FROM php:8.1-fpm
RUN composer install --prefer-dist --no-dev --no-progress --no-scripts --no-interaction; \
  composer dump-autoload --classmap-authoritative --no-dev; \
  composer symfony:dump-env prod; \
  composer run-script --no-dev post-install-cmd; \
  chmod +x bin/console; \
  bin/console cache:warmup;
VOLUME /srv/app/var

COPY docker/fpm/ilios.ini $PHP_INI_DIR/conf.d/ilios.ini
COPY docker/fpm/zz-docker.conf /usr/local/etc/php-fpm.d/zz-docker.conf

COPY docker/fpm/docker-entrypoint.sh /usr/local/bin/docker-entrypoint
RUN chmod +x /usr/local/bin/docker-entrypoint

ENTRYPOINT ["docker-entrypoint"]
CMD ["php-fpm"]

```

Our Dockerfile: https://github.com/ilios/ilios/blob/master/Dockerfile

### What does this mean

- We're relying on a base provided by PHP the language
- It relies on Debian in turn
- Each of this organizations can release new versions at any time
- We then layer on anything special we need to run our app
- From distro to php to us every layer is constantly updating
- All we need to do is listen and re-build our own image when these changes happen

# Installation Optimizations

RUN composer install **--prefer-dist**;
composer dump-autoload **--classmap-authoritative**;
composer symfony:dump-env prod;

# Push Containers to Registry

- Tag Version
- Create Release
- Build Multi Platform Containers
- Push To Docker Hub

# Build Multi Platform Containers

```yaml
---
steps:
  - uses: docker/setup-qemu-action@v2
    with:
      image: tonistiigi/binfmt:latest
      platforms: linux/amd64,linux/arm64
  - uses: docker/build-push-action@v3
    with:
      platforms: linux/amd64,linux/arm64
```

https://github.com/ilios/ilios/blob/master/.github/workflows/deploy-tag.yml

- Using emulation we can build for different architectures
  - Which turns out to be really important when your team starts getting apple silicon

# Push To Docker Hub

```yaml
jobs:
  tags:
    steps:
    - id: tag
      run: |
        MAJOR_VERSION=$(echo $GITHUB_REF | sed -rn 's#^refs/tags/(v3)\.([0-9]+)\.([0-9]+)$#\1#p')
        MINOR_VERSION=$(echo $GITHUB_REF | sed -rn 's#^refs/tags/(v3)\.([0-9]+)\.([0-9]+)$#\1.\2#p')
        PATCH_VERSION=$(echo $GITHUB_REF | sed -rn 's#^refs/tags/(v3)\.([0-9]+)\.([0-9]+)$#\1.\2.\3#p')
  deploy-docker-containers:
    needs: tags
    runs-on: ubuntu-latest
    - uses: docker/build-push-action@v3
      with:
        tags: ilios/fpm:${{major}},ilios/fpm:${{minor}},ilios/fpm:${{patch}}
        push: true
```

# Push To Docker Hub

![Listing of Ilios build tags showing v3.102.2, v3.102, and v3](./media/docker-hub-tags.png)

# Nightly Re-Tag

## (the latest debian,php,mysql,etc...)

```yaml
on:
  workflow_dispatch:
  schedule:
    - cron: '21 10 * * *' # daily, in the morning (UTC)
jobs:
  tags:
    steps:
    - run: |
        LATEST_TAG=$(git describe --tags --abbrev=0)
        MAJOR_VERSION=$(echo $LATEST_TAG | sed -rn 's#^(v3)\.([0-9]+)\.([0-9]+)$#\1#p')
        ...
  deploy-docker-containers:
    steps:
    - uses: actions/checkout@v3
      with:
          ref: ${{needs.tags.outputs.latestTag}}
    ...
    - uses: docker/build-push-action@v3
      with:
        tags: ilios/${{ matrix.image }}:${{major}},ilios/${{ matrix.image }}:${{minor}}...
        platforms: linux/amd64,linux/arm64
```

https://github.com/ilios/ilios/blob/master/.github/workflows/deploy-nightly.yml

## Going back to that mind-blowing talk at UCI that sent me to this tree for a timeout

- We're really close now

Tag Code

1. Tag Code as v65.4.3
2. Go To Lunch
3. v65.4.3 is now in _Production_
4. Repeat

# Explore The Limits

- Weekly Dependency Reset
- Special Preview for Testing
- Test Updates for Asset Bloat
- Run Cron Jobs

---
layout: ../layouts/Layout.astro
---

# Ilios Architecture

## How Form Follows Function

### Let's go back in time

- The year is 2013, and Ilios is in trouble
- The lead dev just left for IT, and handed me a book.
- We need to update everything right now, but we also need to add features, oh and we need it fast.

## Good, Fast, Cheap

### Pick Three

## What is Ilios?

Ilios is a curriculum management platform for the Health Professions educational community. It is a user-friendly, flexible, and robust web application. Ilios collects, manages, analyzes, and delivers curricular information.

Built by and for the health professions, Ilios supports the sharing of curriculum outcomes and materials among programs, departments, schools and institutions, while maintaining the flexibility to accommodate the unique practices within our diverse health professions community.

## A Segment of Ilios Data

### Session, Course, and Program Objectives Linked to Competencies

## Ilios is a Data Management Productivity Application

### Data Access

#### Easy to read, writes, and integrate with

#### Everything should be accessible through the API

#### Without support!

### Productivity

#### Feels like an application

####

#### Adding features should be easy

#### Support for all types of devices

## a single hour of downtime at the wrong time is a disaster

## My Philosophy, Buy the Bikeshed

### The Best Code is No Code At All

### If You Have to Build It, Make Sure You Can Maintain It

### If You Have to Maintain It, Make It Easy

#### Build What You Have the Expertise to Maintain

#### Build What You Have the FTE to Fix **CONSTANTLY**

## Focus on the Solution

### If the goal is to build a fast airplane why are you manufacturing bricks?

## The Ilios Architecture

### Finally, he get's to the point!

### API Server aka Backend

#### PHP

#### Symfony

#### Doctrine

#### JSON:API

#### GraphQL

https://github.com/ilios/ilios

### Single Page Application (SPA) aka Frontend

#### JavaScript

#### Ember.js

#### JSON:API

#### GraphQL

https://github.com/ilios/frontend

- PHP is where expertise was already, we considered other frameworks and languages, but ultimately didn't want to absorb the training cost.
- A lot more time went into picking Ember.js. At the time Angular was going through a huge internal upgrade struggle, and React didn't exist.
- Will talk a bit more about why each of these choices in a bit.

## Why the split?

### Significantly easier to maintain, monorepos didn't really exist yet

### Tests are easier to run (we were on Travis at the time, which was language specific)

### Easier to deploy

### Easier to understand

### Tried it all together, but it was hard, and not standard.

## The Ilios Architecture

### Containers

#### What runs on my machine, runs in production

https://hub.docker.com/orgs/ilios

## The Ilios Architecture, Containers

### Dockerfile

```dockerfile
FROM php:8.4-fpm AS php-base
COPY from=composer:latest /usr/bin/composer /usr/bin/composer
COPY from=src /src/app /srv/app/

## configure PHP extensions required for Ilios and delete the source files after install
RUN set -eux; \
    mkdir -p var/cache var/log; \
    composer install prefer-dist no-dev no-progress no-scripts no-interaction; \
    composer dump-autoload
    composer symfony:dump-env prod; \
    composer run-script no-dev post-install-cmd; \
    sync

COPY docker/fpm/symfony.prod.ini $PHP_INI_DIR/conf.d/symfony.ini
COPY docker/fpm/ilios.ini $PHP_INI_DIR/conf.d/ilios.ini

ENTRYPOINT ["docker-entrypoint"]
CMD ["php-fpm"]
```

https://github.com/ilios/ilios/blob/dc8174b62c9fb5e5e9ea77b76207754408eaeefe/Dockerfile

## The Ilios Architecture, Containers

### Testing and Building

```yaml
build_containers:
  strategy:
    matrix:
      arch:
        - amd64
        - arm64
      image:
        - php-apache
        - nginx
        - fpm
  steps:
    - uses: docker/setup-buildx-action@v3
    - uses: docker/build-push-action@v6
      with:
        target: ${{ matrix.image }}
        push: false
        outputs: type=docker,dest=/tmp/${{ matrix.image }}-${{ matrix.arch }}.tar,compression=gzip
        tags: ${{ matrix.image }}:${{ matrix.arch }}-testing
        platforms: linux/${{ matrix.arch }}
```

https://github.com/ilios/ilios/blob/dc8174b62c9fb5e5e9ea77b76207754408eaeefe/.github/workflows/ci.yml#L145-L340

## The Ilios Architecture, Containers

### Testing and Building

```yaml
  run_containers:
      matrix:
        arch:
          - amd64
          - arm64
    steps:
    - uses: actions/checkout@v4
    - name: FPM
      if: ${{ always() }}
      run: |
        docker image load input /tmp/fpm-${{ matrix.arch }}.tar
        docker run -d name ilios-fpm fpm:${{ matrix.arch }}-testing
        docker ps
        docker ps | grep -q ilios-fpm
        docker exec ilios-fpm php bin/console monitor:health
        docker stop ilios-fpm
        docker rm volumes ilios-fpm
        docker image rm fpm:${{ matrix.arch }}-testing

```

https://github.com/ilios/ilios/blob/dc8174b62c9fb5e5e9ea77b76207754408eaeefe/.github/workflows/ci.yml#L145-L340

## The Ilios Architecture, Containers

### Deploying Tags

#### v3,v3.123,v3.123.0

```yaml
jobs:
  deploy-docker-containers:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        image:
          - php-apache
          - ...
    steps:
      - name: ${{ matrix.image }} to Docker Registry
        uses: docker/build-push-action@v6
        with:
          tags: ilios/${{ matrix.image }}:${{needs.tags.outputs.major}},ilios/${{ matrix.image }}:${{needs.tags.outputs.minor}},ilios/${{ matrix.image }}:${{needs.tags.outputs.patch}}
          target: ${{ matrix.image }}
          push: true
          provenance: false #https://github.com/gabrieldemarmiesse/python-on-whales/issues/407
          platforms: linux/amd64,linux/arm64
```

https://github.com/ilios/ilios/blob/dc8174b62c9fb5e5e9ea77b76207754408eaeefe/.github/workflows/deploy-tag.yml

## The Ilios Architecture, Containers

### Nightly Rebuild

#### v3,v3.123,v3.123.0

```yaml
jobs:
  tags:
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
          token: ${{ secrets.ZORGBORT_TOKEN }}
      - id: tag
        run: |
          LATEST_TAG=$(git describe tags abbrev=0)
          echo ${LATEST_TAG}
  deploy-docker-containers:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        image:
          - php-apache
          - ...
```

https://github.com/ilios/ilios/blob/dc8174b62c9fb5e5e9ea77b76207754408eaeefe/.github/workflows/deploy-nightly.yml

## The Ilios Architecture

### Symfony API Server

https://github.com/ilios/ilios

- Why Symfony?
  - Awesome Documentation
  - Great Testing Story
  - Great Upgrade Story

## The Ilios Architecture, Symfony API Server

### Testing

#### Code Style

```yaml
code_style:
runs-on: ubuntu-latest
steps:
  - run: composer validate no-check-all no-check-version strict
  - run: vendor/bin/phpcs
  - name: lint markdown
    uses: DavidAnson/markdownlint-cli2-action@v19
    with:
      globs: |
        CHANGELOG.md
        README.md
        docs/*.md
  - name: lint yaml
    run: |
      vendor/bin/yaml-lint .github
      vendor/bin/yaml-lint docs
      vendor/bin/yaml-lint compose.yaml
  - name: phpstan
    run: |
      vendor/bin/phpstan analyse no-progress
```

https://github.com/ilios/ilios/blob/dc8174b62c9fb5e5e9ea77b76207754408eaeefe/.github/workflows/ci.yml#L25-L64

- My thinking on code style, you can never comment on the style of the code in a PR if you don't have a linting rule preventing it
- Style rules cause all the code in Ilios to look very similar
- Styles tests build confidence when contributing for the first time

## The Ilios Architecture, Symfony API Server

### Testing

#### Continuous Integration

```yaml
tests:
strategy:
  matrix:
    php-version: [8.4, 8.3]
steps:
  - name: Use PHP ${{ matrix.php-version }}
    uses: shivammathur/setup-php@v2
    with:
      coverage: pcov
      php-version: ${{ matrix.php-version }}
  - name: Run Tests
    run: vendor/bin/phpunit coverage-clover build/coverage.xml
  - name: Archive Coverage Report
    uses: actions/upload-artifact@v4
    with:
      name: coverage-output
      path: build/coverage.xml
      overwrite: true
      retention-days: 1
```

https://github.com/ilios/ilios/blob/dc8174b62c9fb5e5e9ea77b76207754408eaeefe/.github/workflows/ci.yml#L65-L93

- Absolutely nothing beats tests

## The Ilios Architecture

### AWS

![Diagram of Ilios AWS Architecture](./media/aws.png)

- We rely on AWS services to run. For example RDS instead of our own DB and Fargate instead of Kubernetes
- again, buy the Bikeshed

## The Ilios Architecture, The Frontend

### Monorepo

#### https://github.com/ilios/frontend

- Contains multiple apps
- The frontend that almost everyone uses as well as two LTIs
- LTI is very cool, it puts Ilios in Moodle, will work just as well with Canvas. 5 minutes to setup.

## The Ilios Architecture, The Frontend

### Ember.js SPA

#### https://demo.iliosproject.org

## The Ilios Architecture, The Frontend

### Netlify

![Netlify Pull Request Preview](./media/netlify.png)

## The Ilios Architecture, The Frontend

### Percy

![Percy Pull Request Visual Diff](./media/percy.png)

## The Ilios Architecture, The Frontend

### Deploy

- We have to absorb some complexity in our frontend deployment because Ilios isn't run only at UCSF
- Because other schools download and run Ilios we can't just deploy the html to a web server, which would be awesome
- Instead we package the entire app into an archive and upload it to S3
- Each API server then download the archive that matches their API version and can serve it

## The Ilios Architecture, Frontend

### Deploy

#### Ember CLI Deploy

```javascript
const API_VERSION = require("ilios-common/config/api-version.js");

module.exports = function (deployTarget) {
  var ENV = {
    "s3-index": {
      region: "us-west-2",
      filePattern(context) {
        return context.archiveName;
      },
      distDir(context) {
        return context.archivePath;
      },
    },
    brotli: {
      filePattern: "**/*.{js,css,json,ico,map,xml,txt,svg,eot,ttf,webmanifest}",
      ignorePattern: "index.json",
      keep: true,
    },
  };
};
```

https://github.com/ilios/frontend/blob/2f241c90bc7a737ad01898c05c08f6190337910a/packages/frontend/config/deploy.js

## The Ilios Architecture, Frontend

### Deploy

#### index.json

```json
{
  "meta": [
    { "charset": "utf-8" },
    { "name": "description", "content": "" },
    { "name": "viewport", "content": "width=device-width, initial-scale=1" },
    { "name": "theme-color", "content": "#cc6600" },
    { "name": "apple-mobile-web-app-capable", "content": "yes" },
    { "name": "apple-mobile-web-app-status-bar-style", "content": "black" }
  ],
  "script": [
    {},
    {
      "src": "/ilios-loading/display-loader.d911ede498a82bcd652f366f4cd0fd8a.js"
    },
    {},
    { "src": "/assets/vendor.9c86d0ff26b2efa7b46bf1fc458df517.js" },
    { "src": "/assets/chunk.cd5e4b4b99b2dfbe70c3.js" },
    { "src": "/assets/chunk.8cfb67599df1b87bece5.js" },
    {}
  ]
}
```

#### Github Actions Deploys

```yaml
jobs:
  deploy-frontend:
    name: Deploy Frontend and Create Sentry Release
    steps:
      - name: Ember CLI Deploy
        run: pnpm filter frontend run deploy:production
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

https://github.com/ilios/frontend/blob/2f241c90bc7a737ad01898c05c08f6190337910a/.github/workflows/deploy-production.yml

#### Sentry

```yaml
jobs:
  deploy-frontend:
    name: Deploy Frontend and Create Sentry Release
    steps:
      - name: Create a Sentry.io release
        run: |
          ## Create new Sentry release
          sentry-cli releases new ${{github.ref_name}}
          sentry-cli releases set-commits auto ${{github.ref_name}}
          sentry-cli releases files ${{github.ref_name}} upload-sourcemaps packages/frontend/tmp/deploy-dist/
          sentry-cli releases finalize ${{github.ref_name}}
```

https://github.com/ilios/frontend/blob/2f241c90bc7a737ad01898c05c08f6190337910a/.github/workflows/deploy-production.yml

- Sentry is its own talk, next time!

### Prettier

#### Opinionated Code Formatter

https://prettier.io

- Event better than linting, prettier just formats the code for you

### Tests as Code

#### package.json

```json
{
  "scripts": {
    "preinstall": "npx only-allow pnpm",
    "format": "pnpm run parallel format",
    "lint": "pnpm run parallel \"/^lint:(hbs|js|css|format)$/\"",
    "lint:js": "pnpm run parallel lint:js",
    "lint:hbs": "pnpm run parallel lint:hbs",
    "lint:css": "pnpm run parallel lint:css",
    "lint:fix": "pnpm run parallel lint:fix",
    "lint:deps": "pnpm run parallel lint:deps",
    "lint:format": "pnpm run parallel lint:format",
    "start": "pnpm filter frontend exec ember serve",
    "test:frontend": "pnpm filter frontend exec ember exam parallel=8 load-balance",
    "test:test-app": "pnpm filter test-app exec ember exam parallel=8 load-balance",
    "prepare": "husky"
  }
}
```

### Tests

#### Code Style

```yaml
jobs:
  lint:
    name: Lint
    runs-on: ubuntu-latest
    timeout-minutes: 10

    steps:
      - name: Lint
        run: pnpm run lint
      - name: Test Dependency Installation
        run: pnpm install resolution-only no-frozen-lockfile
```

https://github.com/ilios/frontend/blob/2f241c90bc7a737ad01898c05c08f6190337910a/.github/workflows/ci.yml

### Tests

#### Tests

```yaml
jobs:
  test:
    strategy:
      matrix:
        node-version: [20]
        workspace:
          - frontend
          - test-app
          - lti-course-manager
          - lti-dashboard
    steps:
      - name: Run Tests
        run: pnpm filter ${{matrix.workspace}} exec ember exam parallel=3 load-balance write-execution-file
        env:
          COVERAGE: true
```

https://github.com/ilios/frontend/blob/2f241c90bc7a737ad01898c05c08f6190337910a/.github/workflows/ci.yml

![Poorly Drawn Lines, mouse says it's time to be productive](./media/productive.png)

https://poorlydrawnlines.com/comic/productive/

## Thanks!

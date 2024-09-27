# Code for https://www.jrjohnson.dev

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)
- [Ember CLI](https://cli.emberjs.com/release/)
- [Google Chrome](https://google.com/chrome/)

## Installation

- `git clone <repository-url>` this repository
- `cd jrjohnson`
- `pnpm install`

## Running / Development

- `pnpm start`
- Visit your app at [http://localhost:4200](http://localhost:4200).
- Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

- `pnpm test`
- `pnpm test:ember --server`

### Linting

- `pnpm lint`
- `pnpm lint:fix`

### Building

- `pnpm ember build` (development)
- `pnpm build` (production)

### Deploying

Commits to `master` are auto deployed by Netlify.

### Building a PDF Resume
1. Add Name to the top
2. modify media paths to be local (remove /media/)
3. Remove PDF link
4. Convert to HTML `multimarkdown markdown/pages/resume.md -o public/resume-output.html`
5. Generate PDF from HTML `npx electron-pdf http://localhost:4200/resume-output.html public/media/resume.pdf -p=Letter -m=0`
6. Remove HTML `rm public/resume-output.html`

- [ember.js](https://emberjs.com/)
- [ember-cli](https://cli.emberjs.com/release/)
- Development Browser Extensions
  - [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  - [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

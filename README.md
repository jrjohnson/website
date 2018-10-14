## About

This is the code-base for my personal website

## Development

`ruby`, `gem` and `bundler` are assumed to be installed.

### Installation

```bash
bundle install
```

### Running the site locally

```
bundle exec jekyll serve
```

### Building a PDF Resume
1. Add Name to the top
2. modify media paths to be local (remove /media/)
3. Remove PDF link
4. Remove frontmatter
5. Add White space with \`(space)\`(space)(space)(space)(space)
6. Run generator `docker run -v ${PWD}:/resume there4/markdown-resume md2resume pdf --template modern resume.md media/`

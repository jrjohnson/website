# Code for https://www.jrjohnson.dev

### Deploying

Commits to `master` are auto deployed by Netlify.

### Building a PDF Resume
1. Add Name to the top
2. modify media paths to be local (remove /media/)
3. Remove PDF link
4. Remove frontmatter
5. Add White space with \`(space)\`(space)(space)(space)(space)
6. Run generator `docker run -v ${PWD}:/resume there4/markdown-resume md2resume pdf --template modern resume.md media/`

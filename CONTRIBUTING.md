# Contributing

<p align="center">
<a href="#best-practices">Best practices</a> ·
<a href="#quickstart">Quickstart</a> ·
<a href="#pull-request-process">Pull request process</a> ·
<a href="#code-of-conduct">Code of conduct</a>
</p>

First of all, thanks for taking the time to contribute!

This file includes best practices and guidelines for contributing to our
project. We encourage you to follow them and help us create a better product!

## Best practices

- We follow a [code of conduct](#code-of-conduct), review it and honor it in all
  your interactions with the project.
- When contributing to this repository, first create an issue to explain the
  change you want to make.
  - The issues will be preferably written in English, although Spanish is
    also acceptable.
  - The issue title should briefly summarize the proposal.
  - The issue body should include a description of the proposal with all the
    details, conditions, dependencies affected, charts, screenshots, etc.,
    that can help to further understand and evaluate the proposal.
- Create a new branch before making any change in the repository. This branch
  should follow this format: issue_ID-and-summary (for example,
  23-add-new-provider).
- Create commit messages following [conventional commit](https://conventionalcommits.org) specification.

## Quickstart

### Dependencies

To install dependencies, after cloning the repository, run:

```bash
npm ci
```

### Build

To build the application, run:

```bash
npm run build
```

### Usage

To execute the application run:

```bash
npm start -- -i input/file.yaml
```

### Clean

To clean output & build path run:

```bash
npm run clean
```

You can find all the options in our [README](./README.md) file

### Putting all together

When you are developing a new feature you must clean output & build path, rebuild the app and execute it. So this is a good command to _remember_:

```bash
npm run clean && npm start -- -i input/file.yaml
```

## Pull request process

1. Ensure any install or build dependencies are solved before doing a build.
1. Update the README.md file with details of the changes. This includes new
   environment variables, exposed ports, useful file locations and container
   parameters.
1. Set a commit message following [Conventional Commits](https://www.conventionalcommits.org/).
1. If your Pull Request updates the documentation, label it as `documentation`.
1. You may squash and merge the pull request once you have the sign-off of one
   maintainer. Maintainers will merge the pull request for you.

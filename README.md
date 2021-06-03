[ryanrishi.com](https://ryanrishi.com)
===

Code for my personal website. Built using [Next.js](https://nextjs.org/).

# Development
Install dependencies:
```sh
$ yarn install
```

Start the development server:
```sh
$ yarn dev
```

Visit [localhost:3000](http://localhost:3000).

Note: if working on the contact form, add an entry in `/etc/hosts` that is a subdomain of the allowed domains configured in Formspree.
For example:
```
local.ryanrishi.com  127.0.0.1
```

# Testing
Tests are run via [Cypress](https://www.cypress.io/);

Run tests:
```sh
$ yarn test
```

This will open up Cypress, and from there you can select which tests to run.

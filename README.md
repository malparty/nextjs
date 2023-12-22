# NextJS CLI & Template

## Intro

This repo is a test to get 2 distinct packages:

- CLI: contains the NodeJS script to scaffold the template.
- Template: contains the template files.

## Getting started

To scaffold a new app, run:

```shell
npx @malparty/nextjs-cli --brand NAME_OF_BRAND
```

This will

- Run the `npm pack` command to get the source files from the latest `@malparty/nextjs-template` package.
- Decompress the tar into a sub-folder with a name that includes the `brand` argument.
- WIP Perform any changes to make the template fully customized to the `brand`.
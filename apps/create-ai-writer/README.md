# create-ai-writer

## Introduction

This is a package to create a new ai-writer project.
Use as follows:

```bash 
npx create-ai-writer ai-writer-my-project
```

or

```bash
npx create-ai-writer ../../ai-writer-my-project
```

## Publishing to npm
To publish packages to npm you have to be logged in. To login execute the following command:

```bash
npm login
```

To publish the package `create-ai-writer`execute the following command:

```bash
npm publish
```

If you make changes to your package and want to publish a new version, you need to update the version number in your package.json file. You can do this manually, or you can use the npm version command:

```bash
npm version patch
```

This will increase the patch version by 1 (e.g., from 1.0.0 to 1.0.1). You can also use minor or major instead of patch to increase the minor or major version number.

Once you've updated the version number, you can run npm publish again to publish the new version.
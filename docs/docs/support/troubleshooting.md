---
sidebar_position: 10
---

# Troubleshooting

When you get into trouble...

Every system has its quirks, and every user has their own way of doing things. This page is a collection of common issues and their solutions. If issues can't be solved by the solutions here, please [open an issue](https://github.com/svdoever/ai-writer/issues) on GitHub.

## Troubleshooting using ai-writer

### 429 error

When you encounter a 429 error, it means that you have exceeded the rate limit of the OpenAI API. This can happen when you run a large number of recipes. Although I sometimes get this error executing a single recipe as well, just try again...

### 401 error

When you encounter a 401 error, it means that you have not set the `OPENAI_API_KEY` variable in the `.env` file correctly. You can find your API key on the [OpenAI dashboard](https://platform.openai.com/account/api-keys).

## Troubleshooting executing TypeScript files using tsx

When you execute a TypeScript file using `npx tsx <file>` and you get an error similar to:

```bash
node:internal/errors:490
    ErrorCaptureStackTrace(err);
    ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/home/svdoever/p/ai-writer/apps/ai-writer-examples/eli5-multiple.ts' imported from /home/svdoever/p/ai-writer/apps/ai-writer-examples/
    at __node_internal_captureLargerStackTrace (node:internal/errors:490:5)
    at new NodeError (node:internal/errors:399:5)
    at finalizeResolution (node:internal/modules/esm/resolve:326:11)
    at moduleResolve (node:internal/modules/esm/resolve:945:10)
    at defaultResolve (node:internal/modules/esm/resolve:1153:11)
    at nextResolve (node:internal/modules/esm/loader:163:28)
    at u (file:///home/svdoever/p/ai-writer/node_modules/@esbuild-kit/esm-loader/dist/index.js:1:2406)
    at nextResolve (node:internal/modules/esm/loader:163:28)
    at ESMLoader.resolve (node:internal/modules/esm/loader:838:30)
    at ESMLoader.getModuleJob (node:internal/modules/esm/loader:424:18)
    at ESMLoader.import (node:internal/modules/esm/loader:525:22)
    at node:internal/modules/run_main:58:28
    at loadESM (node:internal/process/esm_loader:91:11)
    at async handleMainPromise (node:internal/modules/run_main:65:12) {
  code: 'ERR_MODULE_NOT_FOUND'
}
```

Look at the path not found, your specified file is taken relative to the project root folder. Specifying the complete relative path can help, e.g. `npx tsx scripts/eli-multiple.ts`.

When `tsx` is installed globally using `npm install tsx -g` the script can be executed using `tsx ./eli5-multiple.ts`.
 
## Troubleshooting developing ai-writer

### Can't execute ai-writer

I do all my development on WSL, the Windows Subsystem for Linux. If I try to execute `npx ai-writer` in the folder `ai-writer-examples` I get the following error: "sh: 1: ai-writer: Permission denied". Fix this by executing `chmod +x dist/index.js` in the folder `apps/ai-writer`.

---
sidebar_position: 9999
---

# Troubleshooting

Every system has its quirks, and every user has their own way of doing things. This page is a collection of common issues and their solutions. If issues can't be solved by the solutions here, please [open an issue](https://github.com/svdoever/ai-writer/issues) on GitHub.

## Troubleshooting using ai-writer

### 429 error

When you encounter a 429 error, it means that you have exceeded the rate limit of the OpenAI API. This can happen when you run a large number of recipes. Although I sometimes get this error executing a single recipe as well, just try again...

### 401 error

When you encounter a 401 error, it means that you have not set the `OPENAI_API_KEY` variable in the `.env` file correctly. You can find your API key on the [OpenAI dashboard](https://platform.openai.com/account/api-keys).

## Troubleshooting developing ai-writer

### Can't execute ai-writer

I do all my development on WSL, the Windows Subsystem for Linux. If I try to execute `npx ai-writer` in the folder `ai-writer-examples` I get the following error: "sh: 1: ai-writer: Permission denied". Fix this by executing `chmod +x dist/index.js` in the folder `apps/ai-writer`.
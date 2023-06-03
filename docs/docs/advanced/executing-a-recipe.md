---
sidebar_position: 30
---

# Execute from script

Executing a recipe from a script.

A recipe can also be executed from a script. For example, to execute the `eli5` recipe for an elephant from a script, create the script `sample.sh` on Linux or macOS:

```bash
#!/bin/bash

npx ai-writer eli5 --topic elephant --output eli5/elephant
```
And execute this script with the following command:

```bash
sh ./sample.sh
```

Or `sample.bat` on Windows, with the following content:

```cmd
npx ai-writer eli5 --topic elephant --output eli5/elephant
```

And execute this script with the following command:

```cmd
sample.bat
```

Also PowerShell is a powerful scripting language for the execution of recipes, especially because PowerShell scripts can run on Windows, Linux, and macOS. For example, to execute the `eli5` recipe for a collection of topics, create the script `sample-multiple.ps1`:

```powershell
#!/usr/bin/env pwsh

$topics = "elephant", "giraffe", "lion", "tiger", "zebra"
for ($i=0; $i -lt $topics.length; $i++) {
    $topic = $topics[$i]
    npx ai-writer eli5 --topic $topic --output "eli5/$topic" --dry-run
}
```

To execute on Linux or macOS, either execute the following command:

```bash
pwsh ./sample-multiple.ps1
```

Or make the script executable with the following command:

```bash
chmod +x ./sample-multiple.ps1
```

And execute the script with the following command:

```bash
./sample-multiple.ps1
```

See [PowerShell](https://learn.microsoft.com/en-us/powershell/scripting/overview)) for more information on PowerShell.

See [PowerShell Installation](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell) for more information on how to install PowerShell on Windows, Linux, and macOS.
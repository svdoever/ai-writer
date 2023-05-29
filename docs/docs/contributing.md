---
sidebar_position: 1000
---

# Contributing

AI Writer is an open-source project under the simple and permissive MIT license. Any contribution to AI Writer is welcome. This can be contributions for the documentation, contributions for the code, or contributions to the set of examples.

# Contributions to documentation

Documentation is really important in an open-source project. It helps users understand the available tooling and how to use it. Any contribution to the documentation of AI Writer is immensely appreciated and is easy to do through the features provided by GitHub to propose a change request. Every documentation page has an "Edit this page" link at the bottom of the text. Clicking this link will take you to the GitHub repository where you can propose a change to the documentation. The change will be reviewed and merged into the main branch if the changes are approved.


# Contributions to code

AI Writer is an open-source project. The source code is available on GitHub. Any contribution to the code is welcome. The easiest way to contribute to the code is to create a pull request with the changes. The pull request will be reviewed and merged into the main branch if the changes are approved.

## "Running" the documentation

The documentation is generated with [Docusaurus](https://docusaurus.io/). The documentation is written in Markdown and the site is generated using Docusaurus. When you check out the repository, you can run the documentation locally by running the following command from the root of the repository:

```bash
npm run dev
```

## Writing documentation

All documentation for AI Writer is written in Markdown. The easiest way to write documentation is in a short-lived branch with Visual Studio Code, and create a pull request for the changes so the changes can be reviewed.

When using Visual Studio Code (VSCode) there are some handy extensions to use:

1. Markdown All in One - [yzhang.markdown-all-in-one](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
2. Excalidraw - [pomdtr.excalidraw-editor](https://marketplace.visualstudio.com/items?itemName=pomdtr.excalidraw-editor)
3. Paste Image - [mushan.vscode-paste-image](https://marketplace.visualstudio.com/items?itemName=mushan.vscode-paste-image)

## Markdown All in One

This extension is great when writing Markdown because it provides a large set of keyboard commands to work on your Markdown as described in the [documentation](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one).

Note that to work from a VSCode started from WSL, you need to install it to WSL as well.

## Excalidraw

Excalidraw is a great tool to create sketches. In combination with VSCode, you can create an empty file `myimage.excalidraw.png`, and double-click it to open it within an embedded version of Excalidraw within Visual Studio Code. The image data will be saved as metadata within the `myimage.excalidraw.png` image, and the resulting image will be the png file. The Excalidraw extension can be installed in the Windows version of Visual Studio Code and does not have to be installed within WSL.

## Paste Image

> NOTE: I could not get Paste Image working under WSL2. It generates a `.png` file, but this file is empty. Work-around: right-click on folder and select **Reveal in File Explorer**, this will open a Windows File Explorer. Now open the wanted folder in VSCode, and edit the Markdown and paste images under the Windows version of VSCode, which points to the code files in WSL through a filesystem mapping, e.g. `\\wsl.localhost\Ubuntu-20.04\home\svdoever\p\azure-devops-extensions`.

The Paste Image extension allows you to paste an image from the clipboard to a file and embed a link within your Markdown. Paste the image with `CTRL-ALT-V`. Note that `Paste Image` MUST be installed to WSL to work from VSCode by pressing this button under the installed extension.

Note that some extra steps are needed to make **Paste Image** work under WSL2, as described below.

### Paste Image under WSL 2

When opening the project under WSL, the `Paste Image` extension requires the tool `xclip`. The `apt` package for `xclip` does not work, use the following version for WSL 2: https://github.com/Konfekt/win-bash-xclip-xsel and follow the installation instructions:

```
mkdir ~/bin && cd ~/bin
git clone https://github.com/Konfekt/win-bash-xclip-xsel
```

I had to add the following line to `~/.profile` and restart VSCode to get it working:

```
export PATH="$HOME/bin/win-bash-xclip-xsel:$PATH"
```
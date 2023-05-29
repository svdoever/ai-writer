"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7080],{5318:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>h});var o=n(7378);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,i=function(e,t){if(null==e)return{};var n,o,i={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=o.createContext({}),d=function(e){var t=o.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},c=function(e){var t=d(e.components);return o.createElement(s.Provider,{value:t},e.children)},u="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=d(n),m=i,h=u["".concat(s,".").concat(m)]||u[m]||p[m]||a;return n?o.createElement(h,r(r({ref:t},c),{},{components:n})):o.createElement(h,r({ref:t},c))}));function h(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,r=new Array(a);r[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:i,r[1]=l;for(var d=2;d<a;d++)r[d]=n[d];return o.createElement.apply(null,r)}return o.createElement.apply(null,n)}m.displayName="MDXCreateElement"},4115:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>r,default:()=>p,frontMatter:()=>a,metadata:()=>l,toc:()=>d});var o=n(5773),i=(n(7378),n(5318));const a={sidebar_position:1e3},r="Contributing",l={unversionedId:"contributing",id:"contributing",title:"Contributing",description:"AI Writer is an open-source project under the simple and permissive MIT license. Any contribution to AI Writer is welcome. This can be contributions for the documentation, contributions for the code, or contributions to the set of examples.",source:"@site/docs/contributing.md",sourceDirName:".",slug:"/contributing",permalink:"/ai-writer/docs/contributing",draft:!1,editUrl:"https://github.com/svdoever/ai-writer/tree/main/docs/docs/contributing.md",tags:[],version:"current",sidebarPosition:1e3,frontMatter:{sidebar_position:1e3},sidebar:"docSidebar",previous:{title:"The terminal window",permalink:"/ai-writer/docs/terminal-window"},next:{title:"MIT license",permalink:"/ai-writer/docs/MIT-license"}},s={},d=[{value:"&quot;Running&quot; the documentation",id:"running-the-documentation",level:2},{value:"Writing documentation",id:"writing-documentation",level:2},{value:"Markdown All in One",id:"markdown-all-in-one",level:2},{value:"Excalidraw",id:"excalidraw",level:2},{value:"Paste Image",id:"paste-image",level:2},{value:"Paste Image under WSL 2",id:"paste-image-under-wsl-2",level:3}],c={toc:d},u="wrapper";function p(e){let{components:t,...n}=e;return(0,i.kt)(u,(0,o.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"contributing"},"Contributing"),(0,i.kt)("p",null,"AI Writer is an open-source project under the simple and permissive MIT license. Any contribution to AI Writer is welcome. This can be contributions for the documentation, contributions for the code, or contributions to the set of examples."),(0,i.kt)("h1",{id:"contributions-to-documentation"},"Contributions to documentation"),(0,i.kt)("p",null,'Documentation is really important in an open-source project. It helps users understand the available tooling and how to use it. Any contribution to the documentation of AI Writer is immensely appreciated and is easy to do through the features provided by GitHub to propose a change request. Every documentation page has an "Edit this page" link at the bottom of the text. Clicking this link will take you to the GitHub repository where you can propose a change to the documentation. The change will be reviewed and merged into the main branch if the changes are approved.'),(0,i.kt)("h1",{id:"contributions-to-code"},"Contributions to code"),(0,i.kt)("p",null,"AI Writer is an open-source project. The source code is available on GitHub. Any contribution to the code is welcome. The easiest way to contribute to the code is to create a pull request with the changes. The pull request will be reviewed and merged into the main branch if the changes are approved."),(0,i.kt)("h2",{id:"running-the-documentation"},'"Running" the documentation'),(0,i.kt)("p",null,"The documentation is generated with ",(0,i.kt)("a",{parentName:"p",href:"https://docusaurus.io/"},"Docusaurus"),". The documentation is written in Markdown and the site is generated using Docusaurus. When you check out the repository, you can run the documentation locally by running the following command from the root of the repository:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"npm run dev\n")),(0,i.kt)("h2",{id:"writing-documentation"},"Writing documentation"),(0,i.kt)("p",null,"All documentation for AI Writer is written in Markdown. The easiest way to write documentation is in a short-lived branch with Visual Studio Code, and create a pull request for the changes so the changes can be reviewed."),(0,i.kt)("p",null,"When using Visual Studio Code (VSCode) there are some handy extensions to use:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Markdown All in One - ",(0,i.kt)("a",{parentName:"li",href:"https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one"},"yzhang.markdown-all-in-one")),(0,i.kt)("li",{parentName:"ol"},"Excalidraw - ",(0,i.kt)("a",{parentName:"li",href:"https://marketplace.visualstudio.com/items?itemName=pomdtr.excalidraw-editor"},"pomdtr.excalidraw-editor")),(0,i.kt)("li",{parentName:"ol"},"Paste Image - ",(0,i.kt)("a",{parentName:"li",href:"https://marketplace.visualstudio.com/items?itemName=mushan.vscode-paste-image"},"mushan.vscode-paste-image"))),(0,i.kt)("h2",{id:"markdown-all-in-one"},"Markdown All in One"),(0,i.kt)("p",null,"This extension is great when writing Markdown because it provides a large set of keyboard commands to work on your Markdown as described in the ",(0,i.kt)("a",{parentName:"p",href:"https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one"},"documentation"),"."),(0,i.kt)("p",null,"Note that to work from a VSCode started from WSL, you need to install it to WSL as well."),(0,i.kt)("h2",{id:"excalidraw"},"Excalidraw"),(0,i.kt)("p",null,"Excalidraw is a great tool to create sketches. In combination with VSCode, you can create an empty file ",(0,i.kt)("inlineCode",{parentName:"p"},"myimage.excalidraw.png"),", and double-click it to open it within an embedded version of Excalidraw within Visual Studio Code. The image data will be saved as metadata within the ",(0,i.kt)("inlineCode",{parentName:"p"},"myimage.excalidraw.png")," image, and the resulting image will be the png file. The Excalidraw extension can be installed in the Windows version of Visual Studio Code and does not have to be installed within WSL."),(0,i.kt)("h2",{id:"paste-image"},"Paste Image"),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"NOTE: I could not get Paste Image working under WSL2. It generates a ",(0,i.kt)("inlineCode",{parentName:"p"},".png")," file, but this file is empty. Work-around: right-click on folder and select ",(0,i.kt)("strong",{parentName:"p"},"Reveal in File Explorer"),", this will open a Windows File Explorer. Now open the wanted folder in VSCode, and edit the Markdown and paste images under the Windows version of VSCode, which points to the code files in WSL through a filesystem mapping, e.g. ",(0,i.kt)("inlineCode",{parentName:"p"},"\\\\wsl.localhost\\Ubuntu-20.04\\home\\svdoever\\p\\azure-devops-extensions"),".")),(0,i.kt)("p",null,"The Paste Image extension allows you to paste an image from the clipboard to a file and embed a link within your Markdown. Paste the image with ",(0,i.kt)("inlineCode",{parentName:"p"},"CTRL-ALT-V"),". Note that ",(0,i.kt)("inlineCode",{parentName:"p"},"Paste Image")," MUST be installed to WSL to work from VSCode by pressing this button under the installed extension."),(0,i.kt)("p",null,"Note that some extra steps are needed to make ",(0,i.kt)("strong",{parentName:"p"},"Paste Image")," work under WSL2, as described below."),(0,i.kt)("h3",{id:"paste-image-under-wsl-2"},"Paste Image under WSL 2"),(0,i.kt)("p",null,"When opening the project under WSL, the ",(0,i.kt)("inlineCode",{parentName:"p"},"Paste Image")," extension requires the tool ",(0,i.kt)("inlineCode",{parentName:"p"},"xclip"),". The ",(0,i.kt)("inlineCode",{parentName:"p"},"apt")," package for ",(0,i.kt)("inlineCode",{parentName:"p"},"xclip")," does not work, use the following version for WSL 2: ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/Konfekt/win-bash-xclip-xsel"},"https://github.com/Konfekt/win-bash-xclip-xsel")," and follow the installation instructions:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"mkdir ~/bin && cd ~/bin\ngit clone https://github.com/Konfekt/win-bash-xclip-xsel\n")),(0,i.kt)("p",null,"I had to add the following line to ",(0,i.kt)("inlineCode",{parentName:"p"},"~/.profile")," and restart VSCode to get it working:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'export PATH="$HOME/bin/win-bash-xclip-xsel:$PATH"\n')))}p.isMDXComponent=!0}}]);
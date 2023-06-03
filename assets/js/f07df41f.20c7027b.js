"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5065],{5318:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>f});var r=n(7378);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),p=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},s=function(e){var t=p(e.components);return r.createElement(c.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),u=p(n),d=a,f=u["".concat(c,".").concat(d)]||u[d]||m[d]||i;return n?r.createElement(f,o(o({ref:t},s),{},{components:n})):r.createElement(f,o({ref:t},s))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[u]="string"==typeof e?e:a,o[1]=l;for(var p=2;p<i;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},1709:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>m,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var r=n(5773),a=(n(7378),n(5318));const i={sidebar_position:30},o="Execute from script",l={unversionedId:"advanced/executing-a-recipe",id:"advanced/executing-a-recipe",title:"Execute from script",description:"Executing a recipe from a script.",source:"@site/docs/advanced/executing-a-recipe.md",sourceDirName:"advanced",slug:"/advanced/executing-a-recipe",permalink:"/ai-writer/docs/advanced/executing-a-recipe",draft:!1,editUrl:"https://github.com/svdoever/ai-writer/tree/main/docs/docs/advanced/executing-a-recipe.md",tags:[],version:"current",sidebarPosition:30,frontMatter:{sidebar_position:30},sidebar:"docSidebar",previous:{title:"Advanced features",permalink:"/ai-writer/docs/advanced/advanced-features-of-ai-writer"},next:{title:"The terminal window",permalink:"/ai-writer/docs/advanced/terminal-window"}},c={},p=[],s={toc:p},u="wrapper";function m(e){let{components:t,...n}=e;return(0,a.kt)(u,(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"execute-from-script"},"Execute from script"),(0,a.kt)("p",null,"Executing a recipe from a script."),(0,a.kt)("p",null,"A recipe can also be executed from a script. For example, to execute the ",(0,a.kt)("inlineCode",{parentName:"p"},"eli5")," recipe for an elephant from a script, create the script ",(0,a.kt)("inlineCode",{parentName:"p"},"sample.sh")," on Linux or macOS:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"#!/bin/bash\n\nnpx ai-writer eli5 --topic elephant --output eli5/elephant\n")),(0,a.kt)("p",null,"And execute this script with the following command:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"sh ./sample.sh\n")),(0,a.kt)("p",null,"Or ",(0,a.kt)("inlineCode",{parentName:"p"},"sample.bat")," on Windows, with the following content:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-cmd"},"npx ai-writer eli5 --topic elephant --output eli5/elephant\n")),(0,a.kt)("p",null,"And execute this script with the following command:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-cmd"},"sample.bat\n")),(0,a.kt)("p",null,"Also PowerShell is a powerful scripting language for the execution of recipes, especially because PowerShell scripts can run on Windows, Linux, and macOS. For example, to execute the ",(0,a.kt)("inlineCode",{parentName:"p"},"eli5")," recipe for a collection of topics, create the script ",(0,a.kt)("inlineCode",{parentName:"p"},"sample-multiple.ps1"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-powershell"},'#!/usr/bin/env pwsh\n\n$topics = "elephant", "giraffe", "lion", "tiger", "zebra"\nfor ($i=0; $i -lt $topics.length; $i++) {\n    $topic = $topics[$i]\n    npx ai-writer eli5 --topic $topic --output "eli5/$topic" --dry-run\n}\n')),(0,a.kt)("p",null,"To execute on Linux or macOS, either execute the following command:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"pwsh ./sample-multiple.ps1\n")),(0,a.kt)("p",null,"Or make the script executable with the following command:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"chmod +x ./sample-multiple.ps1\n")),(0,a.kt)("p",null,"And execute the script with the following command:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"./sample-multiple.ps1\n")),(0,a.kt)("p",null,"See ",(0,a.kt)("a",{parentName:"p",href:"https://learn.microsoft.com/en-us/powershell/scripting/overview"},"PowerShell"),") for more information on PowerShell."),(0,a.kt)("p",null,"See ",(0,a.kt)("a",{parentName:"p",href:"https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell"},"PowerShell Installation")," for more information on how to install PowerShell on Windows, Linux, and macOS."))}m.isMDXComponent=!0}}]);
"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7393],{5318:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>m});var r=n(7378);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var p=r.createContext({}),c=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},s=function(e){var t=c(e.components);return r.createElement(p.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,p=e.parentName,s=a(e,["components","mdxType","originalType","parentName"]),d=c(n),f=o,m=d["".concat(p,".").concat(f)]||d[f]||u[f]||i;return n?r.createElement(m,l(l({ref:t},s),{},{components:n})):r.createElement(m,l({ref:t},s))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,l=new Array(i);l[0]=f;var a={};for(var p in t)hasOwnProperty.call(t,p)&&(a[p]=t[p]);a.originalType=e,a[d]="string"==typeof e?e:o,l[1]=a;for(var c=2;c<i;c++)l[c]=n[c];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},8508:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>l,default:()=>u,frontMatter:()=>i,metadata:()=>a,toc:()=>c});var r=n(5773),o=(n(7378),n(5318));const i={sidebar_position:15},l="The .env file",a={unversionedId:"project/dotenv",id:"project/dotenv",title:"The .env file",description:"The place for secrets and folders.",source:"@site/docs/project/dotenv.md",sourceDirName:"project",slug:"/project/dotenv",permalink:"/ai-writer/docs/project/dotenv",draft:!1,editUrl:"https://github.com/svdoever/ai-writer/tree/main/docs/docs/project/dotenv.md",tags:[],version:"current",sidebarPosition:15,frontMatter:{sidebar_position:15},sidebar:"docSidebar",previous:{title:"The project folder",permalink:"/ai-writer/docs/project/the-project-folder"},next:{title:"models.json",permalink:"/ai-writer/docs/project/models.json"}},p={},c=[],s={toc:c},d="wrapper";function u(e){let{components:t,...n}=e;return(0,o.kt)(d,(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"the-env-file"},"The .env file"),(0,o.kt)("p",null,"The place for secrets and folders."),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},".env")," file is in the root of your AI Writer project folder. "),(0,o.kt)("p",null,"This file contains the environment variables that are used by AI Writer. "),(0,o.kt)("p",null,"When using the OpenAI API you will need to set the following environment variable:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"OPENAI_API_KEY"))),(0,o.kt)("p",null,"When using Azure OpenAI Service you will need to set the following environment variables:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"AZURE_OPENAI_API_KEY")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"AZURE_OPENAI_ENDPOINT"))),(0,o.kt)("p",null,"The following variables can be changed as needed:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"AIWRITER_RECIPES_FOLDER")," - the folder where the recipes live. Default this is the ",(0,o.kt)("inlineCode",{parentName:"li"},"recipes")," folder root of the AI Writer project"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"AIWRITER_STORAGE_FOLDER")," - the folder where the results (completions) are written to\n")),(0,o.kt)("p",null,"You can add additional environment variables to this file, when needed for your custom scripts."),(0,o.kt)("p",null,"Note that the file ",(0,o.kt)("inlineCode",{parentName:"p"},".env.template")," contains an example of the environment variables that can be set. Copy this file to ",(0,o.kt)("inlineCode",{parentName:"p"},".env")," and change where needed."))}u.isMDXComponent=!0}}]);
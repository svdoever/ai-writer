"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4938],{5318:(e,n,t)=>{t.d(n,{Zo:()=>l,kt:()=>u});var r=t(7378);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var p=r.createContext({}),s=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},l=function(e){var n=s(e.components);return r.createElement(p.Provider,{value:n},e.children)},d="mdxType",f={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,i=e.mdxType,o=e.originalType,p=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),d=s(t),m=i,u=d["".concat(p,".").concat(m)]||d[m]||f[m]||o;return t?r.createElement(u,a(a({ref:n},l),{},{components:t})):r.createElement(u,a({ref:n},l))}));function u(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var o=t.length,a=new Array(o);a[0]=m;var c={};for(var p in n)hasOwnProperty.call(n,p)&&(c[p]=n[p]);c.originalType=e,c[d]="string"==typeof e?e:i,a[1]=c;for(var s=2;s<o;s++)a[s]=t[s];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},8809:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>a,default:()=>f,frontMatter:()=>o,metadata:()=>c,toc:()=>s});var r=t(5773),i=(t(7378),t(5318));const o={sidebar_position:3},a="aiconfig.json",c={unversionedId:"recipes/recipe-ingredients/aiconfig.json",id:"recipes/recipe-ingredients/aiconfig.json",title:"aiconfig.json",description:"The configuration of the AI model.",source:"@site/docs/recipes/recipe-ingredients/aiconfig.json.md",sourceDirName:"recipes/recipe-ingredients",slug:"/recipes/recipe-ingredients/aiconfig.json",permalink:"/ai-writer/docs/recipes/recipe-ingredients/aiconfig.json",draft:!1,editUrl:"https://github.com/svdoever/ai-writer/tree/main/docs/docs/recipes/recipe-ingredients/aiconfig.json.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"docSidebar",previous:{title:"prompt.ejs",permalink:"/ai-writer/docs/recipes/recipe-ingredients/prompt.ejs"},next:{title:"functions.js",permalink:"/ai-writer/docs/recipes/recipe-ingredients/functions.js"}},p={},s=[],l={toc:s},d="wrapper";function f(e){let{components:n,...t}=e;return(0,i.kt)(d,(0,r.Z)({},l,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"aiconfigjson"},"aiconfig.json"),(0,i.kt)("p",null,"The configuration of the AI model."),(0,i.kt)("p",null,"The `aiconfig.json file contains the model configuration of a recipe. The model configuration is used by AI Writer in the interaction with the OpenAI API."),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"aiconfig.json")," file looks something like this:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n    "type": "completion | chat.completion",\n    "completion": {\n        "model": "model-id",\n        "temperature": 0.7,\n        "max_tokens": 64,\n        "top_p": 1,\n        "frequency_penalty": 0,\n        "presence_penalty": 0\n    }\n}\n')),(0,i.kt)("p",null,"There are two types of completions: ",(0,i.kt)("inlineCode",{parentName:"p"},"completion")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"chat.completion"),". The ",(0,i.kt)("inlineCode",{parentName:"p"},"completion")," type is used for completion models like ",(0,i.kt)("inlineCode",{parentName:"p"},"text-davinci-003"),", and the ",(0,i.kt)("inlineCode",{parentName:"p"},"chat.completion")," type is used for chatbot models that are also really good at completion like ",(0,i.kt)("inlineCode",{parentName:"p"},"gtp-3.5-turbo")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"gpt-4"),"."),(0,i.kt)("p",null,"See the ",(0,i.kt)("a",{parentName:"p",href:"https://platform.openai.com/docs/api-reference/completions/create"},"OpenAI API documentation")," for more information about the model configuration fields."))}f.isMDXComponent=!0}}]);
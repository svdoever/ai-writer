"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5962],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>f});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var p=r.createContext({}),c=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},m=function(e){var t=c(e.components);return r.createElement(p.Provider,{value:t},e.children)},d="mdxType",s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,p=e.parentName,m=l(e,["components","mdxType","originalType","parentName"]),d=c(n),u=o,f=d["".concat(p,".").concat(u)]||d[u]||s[u]||i;return n?r.createElement(f,a(a({ref:t},m),{},{components:n})):r.createElement(f,a({ref:t},m))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=u;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[d]="string"==typeof e?e:o,a[1]=l;for(var c=2;c<i;c++)a[c]=n[c];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},1603:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>a,default:()=>s,frontMatter:()=>i,metadata:()=>l,toc:()=>c});var r=n(7462),o=(n(7294),n(3905));const i={sidebar_position:4},a="AI config file",l={unversionedId:"tutorial-eli5/aiconfig-file",id:"tutorial-eli5/aiconfig-file",title:"AI config file",description:"The AI config file contains the configuration for the AI model. The AI model is used to generate the completion text, given a prompt.",source:"@site/docs/tutorial-eli5/04-aiconfig-file.md",sourceDirName:"tutorial-eli5",slug:"/tutorial-eli5/aiconfig-file",permalink:"/ai-writer/docs/tutorial-eli5/aiconfig-file",draft:!1,editUrl:"https://github.com/svdoever/ai-writer/tree/main/docs/docs/tutorial-eli5/04-aiconfig-file.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"docSidebar",previous:{title:"Prompt template file",permalink:"/ai-writer/docs/tutorial-eli5/prompt-template-file"},next:{title:"Executing the recipe",permalink:"/ai-writer/docs/tutorial-eli5/executing-the-recipe"}},p={},c=[],m={toc:c},d="wrapper";function s(e){let{components:t,...n}=e;return(0,o.kt)(d,(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"ai-config-file"},"AI config file"),(0,o.kt)("p",null,"The AI config file contains the configuration for the AI model. The AI model is used to generate the completion text, given a prompt."),(0,o.kt)("p",null,"The AI config file is a JSON file. The file name is ",(0,o.kt)("inlineCode",{parentName:"p"},"aiconfig.json"),"."),(0,o.kt)("p",null,"The AI config file looks like:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n    "type": "completion",\n    "completion": {\n      "model": "text-davinci-003",\n      "max_tokens": 1000,\n      "temperature": 0.0,\n      "top_p": 1,\n      "presence_penalty": 0.0,\n      "frequency_penalty": 0.0\n    }\n}\n')),(0,o.kt)("p",null,"AI Writer is all about completion models. Completion models are models that generate text, given a prompt. The AI config file contains the configuration for the completion model. The type of completion is either ",(0,o.kt)("inlineCode",{parentName:"p"},"completion")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"chat.completion"),", depending on the model used."),(0,o.kt)("p",null,"Currently the following models are the most interesting models supported:"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"provider"),(0,o.kt)("th",{parentName:"tr",align:null},"Model"),(0,o.kt)("th",{parentName:"tr",align:null},"Type"),(0,o.kt)("th",{parentName:"tr",align:null},"Description"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"OpenAI"),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"gpt-4")),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"chat.completion")),(0,o.kt)("td",{parentName:"tr",align:null},"The GPT-4 model is the most powerful, but also the slowest, chat completion model currently available. It is the most expensive model to use.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"OpenAI"),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"gpt-3.5-turbo")),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"chat.completion")),(0,o.kt)("td",{parentName:"tr",align:null},"The GPT 3.5 Turbo chat completion model is a powerful model that corresponds with the current free available ChatGPT. It is less expensive than the ",(0,o.kt)("inlineCode",{parentName:"td"},"gpt-4")," model, and even less expensive than ",(0,o.kt)("inlineCode",{parentName:"td"},"text-davinci-003"))),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"OpenAI"),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"text-davinci-003")),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"completion")),(0,o.kt)("td",{parentName:"tr",align:null},"The Davinci model is the most powerful completion model, but chat models like ",(0,o.kt)("inlineCode",{parentName:"td"},"gpt-3.5-turbo")," can be used as very good completion models as well.")))),(0,o.kt)("p",null,"See the documentation ",(0,o.kt)("a",{parentName:"p",href:"https://platform.openai.com/docs/api-reference/completions/create"},"https://platform.openai.com/docs/api-reference/completions/create")," for more information on the different settings, and other settings that are available.\nNote that AI Writer only uses the first produced completion."))}s.isMDXComponent=!0}}]);
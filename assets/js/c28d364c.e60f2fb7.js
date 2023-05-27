"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5217],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>f});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),s=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},c=function(e){var t=s(e.components);return n.createElement(p.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=s(r),d=a,f=m["".concat(p,".").concat(d)]||m[d]||u[d]||o;return r?n.createElement(f,i(i({ref:t},c),{},{components:r})):n.createElement(f,i({ref:t},c))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=d;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[m]="string"==typeof e?e:a,i[1]=l;for(var s=2;s<o;s++)i[s]=r[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},5645:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>s});var n=r(7462),a=(r(7294),r(3905));const o={sidebar_position:3},i="Prompt template file",l={unversionedId:"tutorial-eli5/prompt-template-file",id:"tutorial-eli5/prompt-template-file",title:"Prompt template file",description:"The prompt.ejs file is a special file that contains the template for the prompt text. It is written in EJS (Embedded JavaScript) format, which allows for dynamic content generation. This file serves as a blueprint or guide for creating the final prompt by combining the template with specific data.",source:"@site/docs/tutorial-eli5/03-prompt-template-file.md",sourceDirName:"tutorial-eli5",slug:"/tutorial-eli5/prompt-template-file",permalink:"/ai-writer/docs/build/index.html/docs/tutorial-eli5/prompt-template-file",draft:!1,editUrl:"https://github.com/ai-writer/docs/docs/docs/tutorial-eli5/03-prompt-template-file.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"docSidebar",previous:{title:"Parameters file",permalink:"/ai-writer/docs/build/index.html/docs/tutorial-eli5/parameters-file"},next:{title:"AI config file",permalink:"/ai-writer/docs/build/index.html/docs/tutorial-eli5/aiconfig-file"}},p={},s=[],c={toc:s},m="wrapper";function u(e){let{components:t,...r}=e;return(0,a.kt)(m,(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"prompt-template-file"},"Prompt template file"),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"prompt.ejs")," file is a special file that contains the template for the prompt text. It is written in EJS (Embedded JavaScript) format, which allows for dynamic content generation. This file serves as a blueprint or guide for creating the final prompt by combining the template with specific data."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ejs"},"Act like a schoolteacher who is the best\nat explaining topics to young kids. \nCan you explain the topic <%= topic %> \nin <%= words %> words to a 5 year old \nin the simplest way possible?\n\nPlease explain the topic in the \nlanguage <%= language %>.\n")),(0,a.kt)("p",null,"The EJS template engine receives both the prompt template and the data. In this situation, the data corresponds to the values specified for the options. Consequently, the engine generates the final prompt based on the template and these data values."),(0,a.kt)("p",null,"The data is presented in ",(0,a.kt)("a",{parentName:"p",href:"https://www.json.org/"},"JSON")," format, which is a structured and easily readable format for computers."),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"To explain JSON like you're five (ELI5), let's imagine you have a bunch of toys and you want to write down the information about each toy on a piece of paper. JSON is like a special way to write down that information so that other people or computers can easily understand and use it.\nJSON uses curly braces {} to represent objects and uses colons : to separate property names from their values. Multiple properties are separated by commas. So, a JSON representation of a toy might look like this:"),(0,a.kt)("pre",{parentName:"blockquote"},(0,a.kt)("code",{parentName:"pre"},'{\n  "name": "Teddy Bear",\n  "color": "brown",\n  "price": 19.99\n}\n'))),(0,a.kt)("p",null,"AI Writer will use the data in JSON format in combination with the EJS prompt template to generate the prompt text. The data will be in the format:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "topic": "elephant",\n  "language": "English",\n  "words": 50,\n  "output": "eli5/elephant.txt"\n}\n')),(0,a.kt)("p",null,"The EJS templating language is a powerful language that can be used to generate the prompt text given data. For more information, see the ",(0,a.kt)("a",{parentName:"p",href:"https://ejs.co/"},"EJS documentation"),"."))}u.isMDXComponent=!0}}]);
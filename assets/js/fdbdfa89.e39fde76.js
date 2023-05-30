"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[9781],{5318:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var r=n(7378);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},p="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,c=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=l(n),d=o,m=p["".concat(c,".").concat(d)]||p[d]||f[d]||i;return n?r.createElement(m,a(a({ref:t},u),{},{components:n})):r.createElement(m,a({ref:t},u))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[p]="string"==typeof e?e:o,a[1]=s;for(var l=2;l<i;l++)a[l]=n[l];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5247:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>f,frontMatter:()=>i,metadata:()=>s,toc:()=>l});var r=n(5773),o=(n(7378),n(5318));const i={sidebar_position:4},a="functions.js",s={unversionedId:"recipe-ingredients/functions.js",id:"recipe-ingredients/functions.js",title:"functions.js",description:"Functions provide a powerful way to enhance the prompt with dynamic data. Functions export from functions.js can be used in the prompt.ejs file.",source:"@site/docs/recipe-ingredients/functions.js.md",sourceDirName:"recipe-ingredients",slug:"/recipe-ingredients/functions.js",permalink:"/ai-writer/docs/recipe-ingredients/functions.js",draft:!1,editUrl:"https://github.com/svdoever/ai-writer/tree/main/docs/docs/recipe-ingredients/functions.js.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"docSidebar",previous:{title:"aiconfig.json",permalink:"/ai-writer/docs/recipe-ingredients/aiconfig.json"},next:{title:"dependencies.json",permalink:"/ai-writer/docs/recipe-ingredients/dependencies.json"}},c={},l=[{value:"Create and use functions",id:"create-and-use-functions",level:2},{value:"Use functions from other files",id:"use-functions-from-other-files",level:2}],u={toc:l},p="wrapper";function f(e){let{components:t,...n}=e;return(0,o.kt)(p,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"functionsjs"},"functions.js"),(0,o.kt)("p",null,"Functions provide a powerful way to enhance the prompt with dynamic data. Functions export from ",(0,o.kt)("inlineCode",{parentName:"p"},"functions.js")," can be used in the ",(0,o.kt)("inlineCode",{parentName:"p"},"prompt.ejs")," file."),(0,o.kt)("h2",{id:"create-and-use-functions"},"Create and use functions"),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"functions.js")," file can export functions that will be made available in the data provided to the ",(0,o.kt)("inlineCode",{parentName:"p"},"prompt.js")," file."),(0,o.kt)("p",null,"So for example if the ",(0,o.kt)("inlineCode",{parentName:"p"},"functions.js")," file contains the following code:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"module.exports.getFullName = function (user) {\n    return `${user.firstName} ${user.lastName}`;\n};\n\nmodule.exports.formatDate = function (date) {\n    return date.toLocaleDateString();\n};\n")),(0,o.kt)("p",null,"The functions can be used in the ",(0,o.kt)("inlineCode",{parentName:"p"},"prompt.ejs")," file like this:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ejs"},"<%\n    const user = {\n        firstName: 'John',\n        lastName: 'Doe'\n    };\n%>\nMy name is <%= getFullName(user) %>.\nToday it is <%= formatDate(new Date()) %>.\n")),(0,o.kt)("p",null,"Nothe that there must not be an overlap between the names of the options and the names of the exported functions."),(0,o.kt)("h2",{id:"use-functions-from-other-files"},"Use functions from other files"),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"functions.js")," file can also import functions from other files. For example, the ",(0,o.kt)("inlineCode",{parentName:"p"},"functions.js")," file contains the following code:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},'const { getAuthorPrefix } = require( "./util");\n\nmodule.exports.getFullName = function (user) {\n    return `${getAuthorPrefix("##")} - ${user.firstName} ${user.lastName}`;\n};\n\nmodule.exports.formatDate = function (date) {\n    return date.toLocaleDateString();\n};\n')),(0,o.kt)("p",null,"and the ",(0,o.kt)("inlineCode",{parentName:"p"},"util.js")," file contains the following code:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"module.exports.getAuthorPrefix = function(sep) {\n  return sep + 'author' + sep;\n}\n")))}f.isMDXComponent=!0}}]);
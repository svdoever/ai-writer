"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1426],{3905:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>h});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),p=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},s=function(e){var t=p(e.components);return n.createElement(c.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),u=p(r),f=a,h=u["".concat(c,".").concat(f)]||u[f]||d[f]||i;return r?n.createElement(h,o(o({ref:t},s),{},{components:r})):n.createElement(h,o({ref:t},s))}));function h(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=f;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[u]="string"==typeof e?e:a,o[1]=l;for(var p=2;p<i;p++)o[p]=r[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},3971:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>d,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var n=r(7462),a=(r(7294),r(3905));const i={sidebar_position:1},o="Create a recipe",l={unversionedId:"tutorial-eli5/create-a-recipe",id:"tutorial-eli5/create-a-recipe",title:"Create a recipe",description:"To create a new recipe, create a new folder in the recipes folder. The folder name will be the name of the recipe.",source:"@site/docs/tutorial-eli5/01-create-a-recipe.md",sourceDirName:"tutorial-eli5",slug:"/tutorial-eli5/create-a-recipe",permalink:"/ai-writer/docs/docs/tutorial-eli5/create-a-recipe",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/tutorial-eli5/01-create-a-recipe.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"docSidebar",previous:{title:"Tutorial - eli5 recipe",permalink:"/ai-writer/docs/docs/category/tutorial---eli5-recipe"},next:{title:"Parameters file",permalink:"/ai-writer/docs/docs/tutorial-eli5/parameters-file"}},c={},p=[{value:"Create the recipe folder",id:"create-the-recipe-folder",level:2}],s={toc:p},u="wrapper";function d(e){let{components:t,...r}=e;return(0,a.kt)(u,(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"create-a-recipe"},"Create a recipe"),(0,a.kt)("p",null,"To create a new recipe, create a new folder in the ",(0,a.kt)("inlineCode",{parentName:"p"},"recipes")," folder. The folder name will be the name of the recipe."),(0,a.kt)("p",null,"In this tutorial, we will create a recipe that explains a topic to a 5 years old in a given number of words, in a given language."),(0,a.kt)("p",null,"If we would ask this at ChatGPT, we would type in the following question:"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},(0,a.kt)("strong",{parentName:"p"},"Act like a schoolteacher who is the best at explaining topics to young kids. Can you explain the topic ",(0,a.kt)("span",{style:{color:"blue"}},"elephant")," in ",(0,a.kt)("span",{style:{color:"blue"}},"50")," words to a 5 year old in the simplest way possible? Please explain the topic in the language ",(0,a.kt)("span",{style:{color:"blue"}},"English"),"."))),(0,a.kt)("p",null,"And ChatGTP will respond with something like:"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},(0,a.kt)("strong",{parentName:"p"},"An elephant is a big, grey animal with a long trunk. Elephants have big ears and four long legs. They use their trunk to pick up food and to drink water. Elephants live in Africa and Asia and they eat leaves, fruit, and grass. They are very strong and can carry heavy things. Elephants are very smart and they like to play."))),(0,a.kt)("h2",{id:"create-the-recipe-folder"},"Create the recipe folder"),(0,a.kt)("p",null,"Create a new folder in the ",(0,a.kt)("inlineCode",{parentName:"p"},"recipes")," folder. The folder name will be the name of the recipe. In this case, we will name it ",(0,a.kt)("inlineCode",{parentName:"p"},"eli5"),"."),(0,a.kt)("p",null,"In this folder we will create the following files:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"parameters.json")," - this file contains the options for the recipe"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"prompt.ejs")," - this file contains the prompt template that will be used to generate the text"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"aiconfig.json")," - this file contains the configuration for the AI model")),(0,a.kt)("p",null,"This set of files in the minimal set that is needed to create a recipe."))}d.isMDXComponent=!0}}]);
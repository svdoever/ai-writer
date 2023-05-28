import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/ai-writer/__docusaurus/debug',
    component: ComponentCreator('/ai-writer/__docusaurus/debug', '9e9'),
    exact: true
  },
  {
    path: '/ai-writer/__docusaurus/debug/config',
    component: ComponentCreator('/ai-writer/__docusaurus/debug/config', '90a'),
    exact: true
  },
  {
    path: '/ai-writer/__docusaurus/debug/content',
    component: ComponentCreator('/ai-writer/__docusaurus/debug/content', 'd40'),
    exact: true
  },
  {
    path: '/ai-writer/__docusaurus/debug/globalData',
    component: ComponentCreator('/ai-writer/__docusaurus/debug/globalData', '79d'),
    exact: true
  },
  {
    path: '/ai-writer/__docusaurus/debug/metadata',
    component: ComponentCreator('/ai-writer/__docusaurus/debug/metadata', '2f7'),
    exact: true
  },
  {
    path: '/ai-writer/__docusaurus/debug/registry',
    component: ComponentCreator('/ai-writer/__docusaurus/debug/registry', 'c60'),
    exact: true
  },
  {
    path: '/ai-writer/__docusaurus/debug/routes',
    component: ComponentCreator('/ai-writer/__docusaurus/debug/routes', 'cb1'),
    exact: true
  },
  {
    path: '/ai-writer/blog',
    component: ComponentCreator('/ai-writer/blog', 'a9b'),
    exact: true
  },
  {
    path: '/ai-writer/blog/archive',
    component: ComponentCreator('/ai-writer/blog/archive', 'a3b'),
    exact: true
  },
  {
    path: '/ai-writer/blog/first-blog-post',
    component: ComponentCreator('/ai-writer/blog/first-blog-post', '9d0'),
    exact: true
  },
  {
    path: '/ai-writer/blog/long-blog-post',
    component: ComponentCreator('/ai-writer/blog/long-blog-post', '8c0'),
    exact: true
  },
  {
    path: '/ai-writer/blog/mdx-blog-post',
    component: ComponentCreator('/ai-writer/blog/mdx-blog-post', '76f'),
    exact: true
  },
  {
    path: '/ai-writer/blog/tags',
    component: ComponentCreator('/ai-writer/blog/tags', '833'),
    exact: true
  },
  {
    path: '/ai-writer/blog/tags/docusaurus',
    component: ComponentCreator('/ai-writer/blog/tags/docusaurus', '733'),
    exact: true
  },
  {
    path: '/ai-writer/blog/tags/facebook',
    component: ComponentCreator('/ai-writer/blog/tags/facebook', '4ff'),
    exact: true
  },
  {
    path: '/ai-writer/blog/tags/hello',
    component: ComponentCreator('/ai-writer/blog/tags/hello', 'ed6'),
    exact: true
  },
  {
    path: '/ai-writer/blog/tags/hola',
    component: ComponentCreator('/ai-writer/blog/tags/hola', '29d'),
    exact: true
  },
  {
    path: '/ai-writer/blog/welcome',
    component: ComponentCreator('/ai-writer/blog/welcome', '74c'),
    exact: true
  },
  {
    path: '/ai-writer/markdown-page',
    component: ComponentCreator('/ai-writer/markdown-page', '077'),
    exact: true
  },
  {
    path: '/ai-writer/docs',
    component: ComponentCreator('/ai-writer/docs', 'f10'),
    routes: [
      {
        path: '/ai-writer/docs/aiwriter-and-sourcecontrol',
        component: ComponentCreator('/ai-writer/docs/aiwriter-and-sourcecontrol', 'c1d'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/ai-writer/docs/category/recipe-ingredients',
        component: ComponentCreator('/ai-writer/docs/category/recipe-ingredients', '44a'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/ai-writer/docs/category/tutorial---eli5-recipe',
        component: ComponentCreator('/ai-writer/docs/category/tutorial---eli5-recipe', '290'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/ai-writer/docs/colors',
        component: ComponentCreator('/ai-writer/docs/colors', 'd28'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/ai-writer/docs/concepts',
        component: ComponentCreator('/ai-writer/docs/concepts', '8a3'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/ai-writer/docs/contributing',
        component: ComponentCreator('/ai-writer/docs/contributing', '824'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/ai-writer/docs/create-a-project',
        component: ComponentCreator('/ai-writer/docs/create-a-project', 'a3b'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/ai-writer/docs/how-does-aiwriter-work',
        component: ComponentCreator('/ai-writer/docs/how-does-aiwriter-work', '62f'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/ai-writer/docs/installation',
        component: ComponentCreator('/ai-writer/docs/installation', 'ebd'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/ai-writer/docs/intro',
        component: ComponentCreator('/ai-writer/docs/intro', 'ab1'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/ai-writer/docs/models.json',
        component: ComponentCreator('/ai-writer/docs/models.json', '981'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/ai-writer/docs/output-formats.json',
        component: ComponentCreator('/ai-writer/docs/output-formats.json', 'ce9'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/ai-writer/docs/recipe-ingredients/aiconfig.json',
        component: ComponentCreator('/ai-writer/docs/recipe-ingredients/aiconfig.json', 'b7c'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/ai-writer/docs/recipe-ingredients/dependencies.json',
        component: ComponentCreator('/ai-writer/docs/recipe-ingredients/dependencies.json', '9e5'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/ai-writer/docs/recipe-ingredients/functions.json',
        component: ComponentCreator('/ai-writer/docs/recipe-ingredients/functions.json', '0af'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/ai-writer/docs/recipe-ingredients/getData.js',
        component: ComponentCreator('/ai-writer/docs/recipe-ingredients/getData.js', 'df3'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/ai-writer/docs/recipe-ingredients/parameters.json',
        component: ComponentCreator('/ai-writer/docs/recipe-ingredients/parameters.json', 'ebc'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/ai-writer/docs/recipe-ingredients/prompt.ejs',
        component: ComponentCreator('/ai-writer/docs/recipe-ingredients/prompt.ejs', '02b'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/ai-writer/docs/recipes',
        component: ComponentCreator('/ai-writer/docs/recipes', 'a4d'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/ai-writer/docs/terminal-window',
        component: ComponentCreator('/ai-writer/docs/terminal-window', 'a0d'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/ai-writer/docs/the-project-folder',
        component: ComponentCreator('/ai-writer/docs/the-project-folder', '0a4'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/ai-writer/docs/tutorial-eli5/aiconfig-file',
        component: ComponentCreator('/ai-writer/docs/tutorial-eli5/aiconfig-file', '71c'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/ai-writer/docs/tutorial-eli5/congratulations',
        component: ComponentCreator('/ai-writer/docs/tutorial-eli5/congratulations', '0f1'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/ai-writer/docs/tutorial-eli5/create-a-recipe',
        component: ComponentCreator('/ai-writer/docs/tutorial-eli5/create-a-recipe', 'ea9'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/ai-writer/docs/tutorial-eli5/executing-the-recipe',
        component: ComponentCreator('/ai-writer/docs/tutorial-eli5/executing-the-recipe', 'cf2'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/ai-writer/docs/tutorial-eli5/parameters-file',
        component: ComponentCreator('/ai-writer/docs/tutorial-eli5/parameters-file', '82f'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/ai-writer/docs/tutorial-eli5/prompt-template-file',
        component: ComponentCreator('/ai-writer/docs/tutorial-eli5/prompt-template-file', 'ee4'),
        exact: true,
        sidebar: "docSidebar"
      }
    ]
  },
  {
    path: '/ai-writer/',
    component: ComponentCreator('/ai-writer/', 'a7a'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];

import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
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
    component: ComponentCreator('/ai-writer/docs', '646'),
    routes: [
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
        path: '/ai-writer/docs/intro',
        component: ComponentCreator('/ai-writer/docs/intro', 'ab1'),
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

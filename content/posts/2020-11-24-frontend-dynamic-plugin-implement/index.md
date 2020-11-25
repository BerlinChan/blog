---
title: 前端动态插件的实现 with Apollo & React
date: 2020-11-24T10:46:37.121Z
template: post
featured_top: false
featured_media: ./alternative-energy-1042411_1280.jpg
draft: false
slug: /2020/11/frontend-dynamic-plugin-implement
categories: 
    - 前端
tags:
    - Apollo
    - React
    - 插件
description: 
---

如何在前端动态安装、运行插件？之前一直好奇这个问题，正巧最近看到一篇文章《[Creating a Frontend Architecture With Dynamic Plugins](https://dzone.com/articles/dynamically-pluggable-frontend-architecture)》，于是我参照大体思路，用 Apollo & React 做一个[实现 Demo](https://github.com/BerlinChan/frontend-dynamic-plugin-demo)。

<!-- endExcerpt -->

## Demo Repository

[frontend-dynamic-plugin-demo](https://github.com/BerlinChan/frontend-dynamic-plugin-demo)

## 思路

前端动态加载插件，最小化情况的关键两点：

1. 获取已安装插件的列表，按照插件的 metadata 信息，**显示插件模块入口**。入口可以是导航菜单、Tab页、按钮等。
2. **加载并运行**插件入口 js 文件。入口文件运行后，可以是将插件内容渲染进核心程序界面预留的标签中，或弹出 Modal窗口等。

## 更多考虑

- 真实情况中，已安装插件的信息肯定是在数据库中维护的。本例为简单从文件中读取。
- 在大型项目中，需要为插件开发提供便于调试的环境，和打包插件的构建程序。
- 核心程序与插件、插件与插件之间的通讯，可以用抽象出的 store 实现。

还有更多复杂场景，在参照的文章作者写的第二篇 [Scale Your Frontend Application](https://dzone.com/articles/scale-your-frontend-application-dynamically) 中讨论了很多。

## Reference

- [Creating a Frontend Architecture With Dynamic Plugins](https://dzone.com/articles/dynamically-pluggable-frontend-architecture)
- [Scale Your Frontend Application](https://dzone.com/articles/scale-your-frontend-application-dynamically)

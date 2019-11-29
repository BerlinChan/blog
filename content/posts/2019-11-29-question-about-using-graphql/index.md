---
title: 学习 GraphQL 及使用疑问
date: 2019-11-29T10:46:37.121Z
template: post
featured_top: false
featured_media: ./featured_media.jpg
draft: false
slug: /2019/11/question-about-using-graphql
categories: 
    - 前端
tags:
    - GraphGL
    - API
description: 在试用 GraphQL 读写数据库和包装现有 REST 后，觉得确实是新鲜实用的 API 方案。对于这种 Schema First Development 的开发实践方法也很赞同。但留下了一些疑问(和解决方法)，于是记载一下。
---

<!-- endExcerpt -->

## 先扯点别的

上一篇准备翻译 [10++ TypeScript Pro tips/patterns with (or without) React](https://medium.com/@martin_hotell/10-typescript-pro-tips-patterns-with-or-without-react-5799488d6680) 的，但翻译到一半后决定弃坑，强烈的挫败感，原因如下：

原文最初写于 2018-10-29，自那以后 Typescript 和 React 都有很多更新(JS 的世界真实日新月异)，文中有些内容已不再适用。而且我觉得本文中有些建议，包括 Typescript 本身，过于追求了严格和限制，反而丧失 Javascript 的灵活优势(双刃剑，莫抬杠)。没有深入使用过 TS，所以还抱着怀疑的态度在学习中。

技术文章有很多术语，翻译后反而不容易理解，原有单词放在英语语境中反而容易理解，有时候一整句保留所有术语后，翻译出来的中文就是几个"的"、"在"、"上"、"使用"，都怀疑还有没有必要翻译。

下面正文开始。

---
 
## 学习 GraphQL

老有人拿 RESTful 和 GraphQL 比较，一直很好奇，最近我就看了看。跟官方教程走了一遍后，我更喜欢 GraphQL 的另一种实现 Apollo，相比 GraphQL 更容易理解，写起来更简洁。而且与之配合的客户端 Apollo Client 要比 Relay 也更简单(虽然客户端是非必选的)，于是就选择 Apollo 全家桶了。

在用 GraphQL 读写数据库，和用 Apollo Server 包装了两个现有 REST API 初步试用后，觉得这确实是个很新鲜实用的 API 方案。对于这种 [Schema First Development](https://www.apollographql.com/docs/tutorial/schema/#write-your-graphs-schema) 的开发实践方法也很赞同。但留下了一些疑问(逐渐更新，找到解决方法也会更新，求教各位)，于是记载一下。

## 1. 如何模块化的管理本地状态?

[Apollo cache](https://www.apollographql.com/docs/react/caching/cache-configuration/) 缓存从远程拉取的数据，同时也具有了管理本地状态数据的能力。Apollo 官方也[推荐这么做](https://www.apollographql.com/docs/react/why-apollo/#combine-local--remote-data):

> Managing all your data with Apollo Client allows you to take advantage of GraphQL as a unified interface to all of your data.

这样做的好处是，可以不再关心状态数据从远端还是本地来，一概都用 GraphQL 的 Query 来查询，用 Mutation 来更改。但随着应用的功能增加和业务复杂化，所有的状态在一个 Apollo cache 中，且所有 `typeDefs`、`resolvers` 都写在一起，**很快会变得无法维护**。

在专门的状态管理方案中都有解决模块化问题的方案:

- Redux 中的 [combineReducers](https://redux.js.org/recipes/structuring-reducers/using-combinereducers#using-combinereducers)
- Vuex 的[将 store 分割成模块（module）](https://vuex.vuejs.org/zh/guide/modules.html)

### 解决方案(部分)

在官方文档 [Code splitting](https://www.apollographql.com/docs/react/data/local-state/#code-splitting) 中提到了一点这个问题，用 `client` 实例的方法 `addResolvers`，添加模块中的 resolvers。但还是有问题：怎么分离 `typeDefs` 呢？

现在看 Client 端 typeDefs 还是要写到一起去。虽然直接在 resolvers 中定义一个 typeDefs 中不存在的 [field](https://graphql.org/learn/queries/#fields) 不会报错并可以用，但显然是个**不优雅**的做法。

那目前我选择**不用 Apollo Client 管理本地状态**，还是交给 Redux 或者 MobX 这类专门工具吧。

## 2. 模板代码名称多

比如我要取值 `someList`，用 Apollo Client 操作前先定义这个 schema:

```javascript
export const GET_SOME_LIST = gql`
    query GetSomeList{
        someList
    }
`
```

`GET_SOME_LIST`、`GetSomeList`、`someList` 这三个名称分别是:

- 给 `useQuery`(或 `useMutation`)传参数的常量，可类比 [Redux 中的 Action type](https://redux.js.org/basics/actions#note-on-boilerplate)
- [GraphQL 操作名](https://graphql.org/learn/queries/#operation-name)，非必须
- GraphQL [field](https://graphql.org/learn/queries/#fields) 名

这三个名称看起来很类似，但是为了程序可读性它们都按这样的模板写好。现在名称很短还不成问题，但在上一个模块问题没解决前，可能需要用加前缀当作命名空间，避免名称重复，比如：

```javascript
export const SET_DASHBOARD_LIST_EXPANDED = gql`
    mutation SetDashBoardListExpanded($ids:[ID]!){
        setDashBoardListExpanded(ids:$ids):[ID]!
    }
`
```

啊，看不清了 😵

### 解决方案

老老实实写。用 [GraphQL Code Generator](https://graphql-code-generator.com/) 辅助生成，能缓解部分手工写模板代码的工作。

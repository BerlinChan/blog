---
title: 学习 GraphQL 的疑问和解決方案
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

### 结论

那目前我选择**不用 Apollo Client 管理本地状态**，若需要，还是交给 Redux 或者 MobX 这类专门工具，这样客户端几乎不用写 `typeDefs` 和 `resolvers` 从而避开模块化问题了。

值得反思的是，在事情复杂到需要模块化之前，你可能不需要什么状态管理，如 Redux 作者之一  Dan Abramov 说：

> [I would like to amend this: don't use Redux until you have problems with vanilla React.](https://redux.js.org/faq/general#when-should-i-use-redux)

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

这三个名称看起来很类似，但是为了程序可读性它们都按这样的模板写好。现在名称很短还不成问题，但在上一个模块问题没解决前，可能需要用加前缀当作命名空间，避免命名冲突，比如：

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

#### 2019-12-24 更新

GraphQL Code Generator 的使用案例参考：[Build a GraphQL + React App with TypeScript](https://levelup.gitconnected.com/build-a-graphql-react-app-with-typescript-9661f908b26)

## 3. 如何身份验证？(2019-12-04 更新)

这是我接触 GraphQL 的第一个问题。GraphQL 给我最初的感觉是将数据库读写直接暴露给应用程序端了，当然这是个**错误(或浅显)的认识**。身份验证怎么办？这样岂不是可以瞎搞？🤪

### 解决方案

在 Apollo Server、Client 加上身份验证的逻辑就行，官方教程与文档已经写得很清楚了。请参考：

- [教程：Apollo 身份验证](https://www.apollographql.com/docs/tutorial/resolvers/#authenticate-users)
- [文档：Apollo 服务端身份验证](https://www.apollographql.com/docs/apollo-server/security/authentication/)
- [文档：Apollo 客户端身份验证](https://www.apollographql.com/docs/react/networking/authentication/)

## 4. 如何更方便将数据库接入 Apollo Server？(2019-12-05 更新)

Apollo Server 结合 npm 包 `pg-promise`、`monk` 这类工具很方便将 Postgre、MongoDB 数据库作为数据源接入，代码如下：

```javascript
const { ApolloServer } = require('apollo-server')
const { gql } = require('apollo-server')
const pgp = require('pg-promise')()
const connectionString = 'postgres://username:password@host:port/database'
const db = pgp(connectionString)

const typeDefs = gql`
    type Query {
        user(id:ID!):User
    }

    type User{
        id:ID!
        name:String
        email:String
    }
`

const resolvers = {
  Query: {
    user: async (parent, { id }, context, info) => {
      const query = `SELECT id,name,email FROM table_user WHERE id = '${id}'`

      return await db.one(query)
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
```

但显然有个不够自动化的问题——**需要根据数据库表结构定义手工写 schema**，如上例中的 `User`，对于不同的查询参数也需要手动写 resolver。我想，数据库中定义好的表结构应该能根据一定的规则转换为 schema，于是朋友推荐看了 [Prisma](https://www.prisma.io/)。

### 解决方案

[Prisma](https://www.prisma.io/) 可以解决上面的问题，自动根据现有数据表派生 datamodel（即 GraphQL 术语中的 schema，或者反过来，根据 datamodel 建立数据库表），并自动生成客户端。

> Prisma 替代传统 ORMs 并简化数据库工作流程

ORM(Object Relational Mapping)意为对象关系映射，将面向对象语言程序中的对象自动持久化到关系数据库中。关于它的解释请见[ORM 实例教程](http://www.ruanyifeng.com/blog/2019/02/orm-tutorial.html)。

之前看 Java 同事用 [Hibernate](https://hibernate.org/orm/) 操作数据库好爽的，原来 JS 里面也可以了。

这东西给我（作为前端开发）感觉是，**轻松拉近应用程序端与数据库的距离**，在开发中有了更多想象与尝试空间。

## 5. Field 为 List 时的两个感叹号？(2019-12-27 更新)

例如定义 Field `list` 为如下：

```graphql
type TwoExclamation {
    tags: [String!]!
}
```

`[String!]!` 有两个感叹号。

- **第一个** `!`(String 后面) 表示 `tags` 中没有元素可为 `null`，比如这个是无效的：["Software", null, "Prisma"]。可以期望请求结果中 `tags` 的每个元素都为 `String`。
- **第二个** `!`(] 后面) 表示该 List 不可为 `null`，尽管可为空列表。所以对于 `tags`，`null` 是无效值而 `[]` 有效。可以期望请求结果中 `tags` 一定是个数组。

这样明确定义，让我们在处理数据时省掉类型判断与容错，而不必担心`类型错误`的出现。

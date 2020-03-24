---
title: 几款多端实时协作、同步的开发工具
date: 2020-03-22T10:46:37.121Z
template: post
featured_top: false
featured_media: ./featured_media.png
draft: false
slug: /2020/03/real-time-multi-device-collaboration-devtools
categories:
  - 前端
tags:
  - pubsub
  - realtime
  - GraphQL
  - Askent
description: 在做一个消息列表同步时，使用 PubSub 模式针对各种场景补漏，代码越来越多且复杂难以维护。展开搜索，发现一些有用的工具
---

<!-- endExcerpt -->

在开发 [Askent](/2020/03/askent-give-up-prisma2) 的 Question 列表中，需要在 _管理、用户、演示_ 三端之间同步用户提问 Question 的状态。该列表需支持筛选、关键词搜索、排序、分页，使用 [Apollo Subscription](https://www.apollographql.com/docs/apollo-server/data/subscriptions/)(实质是 PubSub 模式) 做了很久，同步总是存在问题，如场景：

> 管理端置顶一条用户端当前分页中不存在的 _Question_，用户端相当于新增一条，而用户端当前分页中有该条的，则需更新

针对各种场景进行补漏，代码越来越多且复杂难以维护（回顾迭代过程类似 [deepstream 介绍 realtime search](https://deepstream.io/blog/20191104-realtime-search/) 的这篇文章），我意识到在这里使用 [PubSub 模式](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern)可能是个错误。

于是展开一番搜索，发现如下开发工具：

- [deepstream](https://deepstream.io/)
- [Emitter](https://emitter.io)
- [Kuzzle](https://kuzzle.io)
- [PubNub](https://www.pubnub.com)

先记下来再逐一细看，也想起来之前要做一个多人协作文档编辑工具，找了些 OT 算法的实现库，但对于状态同步，那时没找到好用的工具，配合上面几个工具应该可以实现。

找软件工具时，[AlternativeTo](https://alternativeto.net/) 是个很好的参考，非常适合寻找类似工具，进行横向对比选择。**有个搜索关键词的技巧**，在要找的软件后面加 `like` 并 Google 之，如搜：`pubnub like`。

另外找到一篇有趣的文章 [A single data structure holding program's state has a name - database](https://glebbahmutov.com/blog/redux-and-rethinkdb/)，探讨了将 [Redux](https://redux.js.org/) and [RethinkDB](https://rethinkdb.com) 结合使用，持久化、实时同步客户端状态，作者网站还有很多 Javascript 开发、测试主题文章，并且作者十分关注全球气候问题。

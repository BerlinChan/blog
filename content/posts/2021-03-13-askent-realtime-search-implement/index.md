---
title: Askent 实时消息搜索的实现
date: 2021-03-13T10:46:37.121Z
template: post
featured_top: false
featured_media: ./featured_media.png
draft: true
slug: /2021/03/askent-realtime-search-implement
categories: 
    - 前端
tags:
    - GraphQL
    - Postgres
    - Hasura
    - Askent
    - websocket
    - realtime
    - 翻译
description: 
---

<!-- endExcerpt -->

## 问题

在项目 [Askent](/2020/03/real-time-multi-device-collaboration-devtools) 开发中，需要同步管理后台、客户端、演示大屏，三端上的消息显示，继之前[使用 Apollo Subscription 基于 Pub/Sub 开发遇到问题](/2020/03/real-time-multi-device-collaboration-devtools)，然后参照 [DeepStrem 的 Realtime Search 思路](https://deepstream.io/blog/20191104-realtime-search/)实现一版后，仍有一个严重的性能问题无法解决每个客户端会话权限、查询变量各不同，因此一个提问的 Pub 事件需要为每个客户端执行一次（实际是两次，见下文流程图）查询，再计算 diff 后向对应客户端推送增量数据。

---
title: 使用 ImgBot 自动为 Github Pages 项目优化图片
date: "2019-08-11T18:46:37.121+08"
template: "post"
index: false
featured_media: ''
draft: false
slug: "imgBot-optimize-image-asset-for-github-pages-project"
category: "前端"
tags:
    - "前端"
    - "性能"
    - "Github"
description: "用 Github Pages 做 blog 时，经常会插入很多图片，利用 ImgBot 可以自动为我们优化图片大小，加快图片加载"
---

## 起因
我在建[旧站博物馆](https://github.com/BerlinChan/museum)时，旧站内容中有不少图片，数量巨大不便于逐个处理，部分人工筛选和压缩后在 [Github Marketplace](https://github.com/marketplace) 中看到了这个 [ImgBot](https://github.com/marketplace/imgbot)。

## 介绍 ImgBot
官方介绍翻译：

_ImgBot 是一个为你节省时间优化图片的机器人。优化图片意味着不牺牲图片质量和更小的文件大小。_

_安装后不久，你会收到一个优化图片的 pull request。合并这个 pull request 就行了！Imgbot 会伴随你的工作，保持图片的优化。_

_ImgBot 默认使用无损压缩。_

## 使用 ImgBot
[ImgBot](https://github.com/marketplace/imgbot) 对开源项目是免费的，点最下面的安装按钮然后选择要安装的项目就完成，太简单就不放图了，过几分钟我就收到优化图片后的 pull request，如下：

![pull-request-from-ImgBot](/media/2019/08/12/pull-request-from-ImgBot.jpg)

被优化图片的报告可见，png 图片文件大小最高被优化掉88.43%，很可观的数字！总体被优化掉4.48%。

ImgBot 默认是无损压缩的，可以按需进行[配置](https://imgbot.net/docs/#configuration)为有损压缩，对文件大小进一步压榨。

配置方法是在根目录放置文件 `.imgbotconfig`,内容如下
```json
{
    "aggressiveCompression": "true" // 使用有损压缩 true|false
}
```

还有更多配置项，完整说明请见[官方文档](https://imgbot.net/docs/#configuration)
```json
{
    "schedule": "daily", // 执行周期 daily|weekly|monthly
    "ignoredFiles": [
        "*.jpg",                   // ignore by extension
        "image1.png",              // ignore by filename
        "public/special_images/*", // ignore by folderpath
    ],
    "aggressiveCompression": "true" // 使用有损压缩 true|false
}
```

## 另外推荐 TinyPNG
后来我将经 ImgBot 无损压缩优化后的图片放到 [TinyPNG](https://tinypng.com/) 中，竟然还能压榨掉很多字节，因为 TinyPNG 采用的是**有损压缩**，官方说明翻译：

_TinyPNG 采用智能有损压缩技术来优化 PNG 文件大小。有选择地减少图片中的颜色，用更少的字节数存储。图片损失几乎不可见，但文件大小有很大改善。_

TingPNG 是个不错的另外选择，他还提供压缩、智能裁剪的 API 用于批量处理。不过 ImgBot 也可以配置为有损压缩的，对于图片多的还是配置 ImgBot 简单又省事。

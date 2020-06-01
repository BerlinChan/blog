---
title: 临时解决 Gatsby 中文链接 activeClass 无效问题
date: 2019-10-18T10:46:37.121Z
template: post
featured_top: false
featured_media: ./featured_media.png
draft: false
slug: /2019/10/fix-gatsby-link-active-class
categories:
  - 前端
tags:
  - Gatsby
  - blog
description: Gatsby Link 组件在检查当前激活时，没有对当前 href 转义，导致链接中包含中文字符时判断不准确，activeClass 无效问题。
---

<!-- endExcerpt -->

## 2020-03-10 更新：

该问题在 Gatsby v2.19.32 已修正，[pull request #21171](https://github.com/gatsbyjs/gatsby/pull/21171) 已对 reach-router 更新，解决该问题。

---

Gatsby [`Link`](https://www.gatsbyjs.org/docs/gatsby-link/) 组件在检查当前激活时，没有对当前 href 转义（encodeURI），导致链接中包含中文字符时判断不准确，activeClass 无效问题。其他非拉丁字符应该都有这个问题。

![](./featured_media.png)

该问题实际是包 [@reach/router](https://github.com/reach/router) 导致的，并已在[这次 commit](https://github.com/reach/router/commit/137a1ae931d62afe1e1bb0f6180ad9347baacb4c) 中解决，并更新 npm 为 `1.3.0-beta.0`。

不过当前 Gatsby 依赖的 `@reach/router` 版本是 1.2.1，该版本**未包含**此 bug 修正。

## 临时解决

当初我提了 [issues](https://github.com/gatsbyjs/gatsby/issues/18597) 和 [PR](https://github.com/gatsbyjs/gatsby/pull/18600)，结果[找错了](https://github.com/gatsbyjs/gatsby/pull/18600#event-2709702550)问题根本所在 😂。随后用户 `pieh` 给出了[临时解决方案](https://github.com/gatsbyjs/gatsby/pull/18600#issuecomment-541575112)。

使用 [Yarn resolutions](https://yarnpkg.com/lang/en/docs/selective-version-resolutions/) 配置，在 `package.json` 中添加如下：

```json
  "resolutions": {
      "@reach/router": "1.3.0-beta.0"
  },
```

## 版本

- gatsby: 2.15.36
- gatsby-link: 2.2.20

等 Gatsby 的依赖更新了，要记得去掉这个临时配置。感谢热心 ❤ 的**了不起的盖茨比**社区成员。

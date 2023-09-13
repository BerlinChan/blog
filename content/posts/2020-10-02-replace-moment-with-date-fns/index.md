---
title: Moment.js 使命完成，替代品推荐
date: 2020-10-02T10:46:37.121Z
template: post
featured_top: false
featured_media: ./featured_media.jpg
draft: false
slug: /2020/10/replace-moment-with-date-fns
categories: 
    - 前端
tags:
    - Moment.js
    - 内卷化
description: 流行 JS 时间日期库 Moment.js 宣布进入维护模式，他已完成属于他时代的使命。本文翻译官方声明的开头部分，推荐替代品，并向他表示我的感谢。
---

<!-- endExcerpt -->

看到新闻 [Moment.js 宣布进入遗留状态](https://society.solidot.org/story?sid=65553) 的当天觉得挺惊奇，没想到这一天这么快就到来，不禁感叹前端开发、Javascript 世界变化之快以及高效。到 [Moment.js 官网](https://momentjs.com/docs/#/-project-status/)看了声明，很清楚的说明项目的情况和考虑，前面一部分翻译如下：

---

## 项目状态

Moment.js 已被数百万个项目运用，我们为在 Web 上更好使用时间日期作出贡献而感到高兴。截至 2020年9月，Moment 每周的下载量超过 1200万！然而，Moment 是为 JavaScript 生态系统的上一个时代构建的。如今的现代 Web 看起来已大不相同。这些年来，Moment 有所发展，但其设计基本上与 2011年创建时相同。鉴于有众多项目依赖它，我们选择优先考虑稳定性而不是新功能。

例如，Moment 对象是可变的。这是有关 Moment 的常见抱怨来源。我们在[使用指南](https://momentjs.com/guides/#/lib-concepts/mutability/)中提到了该问题，但仍给大多数新用户带来意外困扰。对于每个使用 Moment 的项目，更改为不可变对象将是一项重大的断层式更新。创建不可变的 “Moment v3” 将是一项艰巨的任务，并将使 Moment 完全成为一个不同的库。由于这已在其他库中完成，因此我们认为保留可变的 API 更为重要。

在现代应用程序中针对 Moment 的另外一个问题是他的大小。Moment 在流行的 “tree shaking” 算法中工作的不太好，导致 Web 应用程序包的曾大。若需要国际化或时区支持，Moment 会非常大（译注：当前的 v2.29.0 官网上显示 moment.min.js gz压缩后为 18.2k，moment-with-locales.js gz压缩则增至 73.2k）。现代 Web浏览器（和 Node.js）通过规范编号为 [ECMA-402](https://ecma-international.org/ecma-402/) 的[`Intl`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl) 对象暴露对国际化和时区支持。[Luxon](https://moment.github.io/luxon/) 等其他库利用这一优势，减少或取消自己提供数据文件的需要。

最近，Chrome 开发工具[开始因其大小而建议替换掉 Moment](https://twitter.com/addyosmani/status/1304676118822174721)。我们普遍支持这一举措。

你可能想阅读：
- [你可能不再需要 Moment.js](https://dockyard.com/blog/2020/02/14/you-probably-don-t-need-moment-js-anymore)
- [你（可能）不需要 Moment.js](https://github.com/you-dont-need/You-Dont-Need-Momentjs/blob/master/README.md)
- [为什么你不应该用 Moment.js](https://inventi.studio/en/blog/why-you-shouldnt-use-moment-js)
- [4 个日期国际化的 moment.js 替代品](https://blog.logrocket.com/4-alternatives-to-moment-js-for-internationalizing-dates/)

Moment 团队已详细讨论了这些问题。我们认识到许多现有项目可能会继续使用 Moment，但是我们不鼓励在以后的新项目中使用。作为替换，我们推荐当今在现代应用中使用的[绝佳选择](https://momentjs.com/docs/#/-project-status/recommendations/)。我们还想推广 JavaScript 的 [`Temporal`](https://momentjs.com/docs/#/-project-status/future/) 新增提案，该功能正在寻求反馈和贡献者。

*我们认定 Moment 现在是处于维护模式下的遗留项目。他并没有死，但他确实已完成使命。*

这意味着：

- 不再添加新功能特性。
- 不再修改 Moment 的 API 为不可变对象。
- 不再解决 tree shaking 和包大小问题。
- 不再有大版本更新（没有 version 3）。
- 可能不再修正 bug，特别是较久远的问题。

对于 Moment 国际化语言文件：

- 我们可能不接受对区域设置字符串或本地化日期格式的修正，特别是在它们的当前形式已经被成功地论证过的情况下。
- 您必须使用重要的，非轶事证据来为地区变更提出新的令人信服的论据，以支持您的立场。
- 如果您要更改的字符串或格式反映在 [CLDR](http://cldr.unicode.org/) 中，那么您必须首先在此处提交更改并接受它。

但由于 Moment 已在数百万个现有项目中使用：

- 当出现严重安全问题时，我们将予以解决。
- 在 [IANA时区数据库](https://www.iana.org/time-zones) 发布后更新 Moment-Timezone 的数据。

---

## 替代品

[官方推荐](https://momentjs.com/docs/#/-project-status/recommendations/)如下几个库：

- [Luxon](https://moment.github.io/luxon/)
- [Day.js](https://day.js.org/)
- [date-fns](https://date-fns.org/)
- [js-Joda](https://js-joda.github.io/js-joda/)

我建议你去每个库的官网看看他们各自的特色和优点，然后再决定选择哪个作为替代。

*其中 [Luxon](https://moment.github.io/luxon/) 的作者是 Moment 长期贡献者 [Isaac Cambron](https://github.com/icambron)，算是 Moment 的灵魂续作。[Day.js](https://day.js.org/) 有着与 Moment 类似的 API，快速替换的好选择。[date-fns](https://date-fns.org/) 遵循函数式编程规范，直接操作 JS Date 对象，这是我的首选。*

## 我与 Moment 的故事

[2015下半年转行 Web 开发](/2016/12/why-quit-media-field/)的第一份工作中，首次看到同事使用 Moment 后，我就对他[格式化日期操作](https://momentjs.com/docs/#/displaying/format/)的便利性所吸引（不用再 getFullYear, getMonth ...），然后被我运用到各种不同项目中。

上面提到的可变对象问题，今年在公司一个可视化大屏项目中，确实令我困扰了一下，直到我反复试验后才注意到 [`add()`](https://momentjs.com/docs/#/manipulating/add/) 操作后可变对象的问题。不过这只是一个小插曲而已，仍然要感谢 Moment 在这段时间中给我开发所带来的便利和愉悦。

Moment 的发展现状正是 Javascript 生态*增长且发展*的一个正面例子，是当今热门词汇[*内卷化*](https://youtu.be/nURtMLCanp0)的一个反面例证。

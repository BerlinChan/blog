---
title: 使用 Lodash 避免 TypeError Cannot read property 错误
date: 2019-10-08T10:46:37.121Z
template: post
featured_top: false
featured_media: ./avoid-js-typeerror-cannot-read-property-with-lodash.png
draft: false
slug: /2019/10/avoid-js-typeerror-cannot-read-property-with-lodash
categories: 
    - 前端
tags:
    - Javascript
description: "JS 中访问某个对象的属性时，经常会碰到 Uncaught TypeError: Cannot read property 错误，短路 && 写法简单安全但不优雅，工具库 Lodash 的 get 方法是个替代方法。"
---

<!-- endExcerpt -->

## 问题
在 Javascript 中访问某个对象的属性时，经常会碰到 `Uncaught TypeError: Cannot read property 'bar' of undefined` 错误，例如这样：

```javascript
let foo
console.log(foo.bar)
```

该问题之常见，以至于在[6个经典的JavaScript报错分析](https://juejin.im/post/5a73e3ad5188257a6d63521a)的统计中位列第一。

我最常碰到的情况是 API 返回数据结构变化或值为 `null` 时，我不得不小心翼翼地处理它们。

## 使用 && 短路
在有潜在该问题的地方，一直以来我使用 && 短路写法解决。例如访问如下对象：

```javascript
let modal = {
  visibility: true,
  formData: {
    name: 'foo',
  },
  config: {
    layout:{
        margin: '4px',
    },
  },
}
console.log(modal.formData && modal.formData.name)
```

因为 `modal` 我能确保它是定义过的对象，但 `formData` 的值可能来自于 API 的返回，所以访问它的下属属性前先判断之，若存在该对象则可访问它的 `name` 属性，否则就**短路**在 `&&` 之前，返回 `undefined` 而不是报错。

但当对象嵌套多层后这样写就很冗长，比如访问上面对象中的 `margin` 属性，可能会写成这样：

```javascript
console.log(modal.config && modal.config.layout && modal.config.layout.margin)
```

事实上我也这样写了很久，虽然不优雅，但是最安全最保险的方法。

## 使用 Lodash
对于大型项目可以使用工具库 Lodash 的 get 方法，安全访问深度嵌套的对象，[官方示例](https://lodash.com/docs/4.17.15#get)如下：

```javascript
var object = { 'a': [{ 'b': { 'c': 3 } }] };
 
_.get(object, 'a[0].b.c');
// => 3
 
_.get(object, ['a', '0', 'b', 'c']);
// => 3
 
_.get(object, 'a.b.c', 'default');
// => 'default'
```

这样就不会有短路写法一长串的 `&&` 了，最近将本博客中很多短路写法都换成该方法。[Ramda.js](https://ramdajs.com/) 中的 path 方法也能实现同样功能。阮一峰更推荐这个库，原因看他的文章《[Ramda 函数库参考教程](http://www.ruanyifeng.com/blog/2017/03/ramda.html)》

## 参考
[[译] 避免那些可恶的 "cannot read property of undefined" 错误](https://juejin.im/post/5c810170e51d450a453fb48e)([英文原文](https://css-tricks.com/%E2%80%8B%E2%80%8Bavoiding-those-dang-cannot-read-property-of-undefined-errors/))

[6个经典的JavaScript报错分析](https://juejin.im/post/5a73e3ad5188257a6d63521a)

[Ramda 函数库参考教程](http://www.ruanyifeng.com/blog/2017/03/ramda.html)

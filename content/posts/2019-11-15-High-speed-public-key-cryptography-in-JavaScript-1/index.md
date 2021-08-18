---
title: 在 Javascript 中实现高速公钥加密(一)
date: 2019-11-15T10:46:37.121Z
template: post
featured_top: false
featured_media: ./featured_media.jpg
draft: false
slug: /2019/11/High-speed-public-key-cryptography-in-JavaScript-1
categories: 
    - 信息安全
tags:
    - Javascript
    - Node.js
    - 公钥加密
    - 翻译
description: 本文介绍了如何在 JavaScript 中使用 TweetNaCL.js 库来实现公钥加密。NaCl 是一个新的易于使用的高速软件库，用于网络通信、加密解密、签名等。
---

<!-- endExcerpt -->

这是一篇翻译。翻译已获得原作者授权。  
原文：[https://medium.com/sharenowtech/high-speed-public-key-cryptography-in-javascript-part-1-3eefb6f91f77](https://medium.com/sharenowtech/high-speed-public-key-cryptography-in-javascript-part-1-3eefb6f91f77)  
作者：[Rolando Santamaria Maso](https://medium.com/@kyberneees)  
翻译：陈柏林

---

本文将讨论如何在 Javascript 中实现端到端的安全通信。
使用最先进的加密库，我们展示了一个健壮的加密系统的基础。

# 基础

在开始前，我们要讲两个入门概念。

## 公钥加密

"公钥加密"([Public Key Cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography))是一种使 Internet 安全的加密机制。

**公钥加密** 或称 **非对称加密**，是一种使用密钥对的加密系统，其 _公钥_ 可以广泛散播，_私钥_ 只有所有者才知道。
它可运用于两方面：

- 身份验证（用公钥验证配对的私钥的持有者发送的消息）
- 加密（私钥持有者解密用公钥加密的消息）

使用公钥加密系统的示例：

* SSL/TLS 握手
* [Whatsapp](https://www.whatsapp.com/)
* [Threema](https://threema.ch/en)
* PGP & [OpenPGP](https://www.openpgp.org/)
* 其他成千上万的应用……

## NaCL & TweetNaCL.js

> [NaCl](http://nacl.cr.yp.to/)(发音"salt"、"氯化钠"或"盐") 是一个新的易于使用的高速软件库，用于网络通信、加密、解密、签名等。NaCl 的目标是提供构建高级加密工具所需的所有核心操作。

NaCL 项目由我们时代最杰出的计算机科学家之一 [_Daniel J.Bernstein_](http://cr.yp.to/djb.html) 领导。

> 参考阅读 [Aaron Swartz](http://www.aaronsw.com/) 对 Daniel J.Bernstein 的评论：[http://www.aaronsw.com/weblog/djb](http://www.aaronsw.com/weblog/djb)

> [具体来说，NaCl 使用椭圆曲线密码术，而不是 RSA；它使用椭圆曲线 Curve25519，具有几个高级的安全特性；它使用 Salsa20，而不是 AES(尽管它在边上包含了一个 AES实现)；它使用的是 Poly1305，而不是 HMAC；它使用的是 EdDSA，而不是 ECDSA。](https://cryptojedi.org/papers/coolnacl-20111201.pdf)

NaCL 被证明是安全的，因为从理论上讲，暴力破解 Salsa20 比相应的 AES 更昂贵。
另一方面，Salsa20 在设计时考虑了速度，即使在低速 CPU 下也能提供出色的性能。Salsa20 速度的更详细的解释在这里：[https://cr.yp.to/snuffle/speed.pdf](https://cr.yp.to/snuffle/speed.pdf)

**TweetNaCL**

> [TweetNaCl](http://tweetnacl.cr.yp.to/) 是世界上第一个可审计的高安全性密码库。TweetNaCl 仅有 100条推文那么大，包含了 C [NaCl](http://nacl.cr.yp.to/) 的全部 25个函数。TweetNaCl 是一个自包含的公共 C 库，因此可以轻松地将其集成到应用程序中。

[**_TweetNaCL.js_**](https://tweetnacl.js.org) 将 TweetNaCL 引入了 JavaScript，因此也引入了 Node.js 和 Web。它使用 [**_XSalsa20_**](https://cr.yp.to/snuffle/xsalsa-20110204.pdf)(longer nonce) 流密码(stream cipher)代替 Salsa20。

> Javascript Benchmarks: [https://github.com/dchest/tweetnacl-js/blob/master/README.md#benchmarks](https://github.com/dchest/tweetnacl-js/blob/master/README.md#benchmarks)

# 开启 JavaScript 加密之旅

译注：可直接运行的 [Demo 下载](TweetNaClJsDemo.zip)

## Bob 加密消息给 Alice

```javascript
const nacl = require('tweetnacl')
nacl.util = require('tweetnacl-util')

// reading Bob key pair from secret key
const bob = nacl.box.keyPair.fromSecretKey(/* Uint8Array with 32-byte secret key */)
// reading Alice public key
const alice = {publicKey: /* Uint8Array with 32-byte secret key */}

// generating one time nonce for encryption
const nonce = nacl.randomBytes(24)
// message for Alice
const utf8 = 'Hello Alice'
// Bob encrypts message for Alice
const box = nacl.box(
  nacl.util.decodeUTF8(utf8),
  nonce,
  alice.publicKey,
  bob.secretKey
)
 
// somehow send this message to Alice
const message = {box, nonce} 
```

_TweetNaCL.js 公钥加密的例子_

## Alice 解密来自 Bob 的消息

```javascript
const nacl = require('tweetnacl')
nacl.util = require('tweetnacl-util')

// reading Alice key pair from secret key
const alice = nacl.box.keyPair.fromSecretKey(/* Uint8Array with 32-byte secret key */)
// reading Bob public key
const bob = {publicKey: /* Uint8Array with 32-byte secret key */}
             
// const message = ... the message object from Bob
// Alice decrypts message from Bob
const payload = nacl.box.open(message.box, message.nonce, bob.publicKey, alice.secretKey)
const utf8 = nacl.util.encodeUTF8(payload) // <-- 'Hello Alice'
```

_TweetNaCL.js 私钥解密的例子_

## 使用预先计算的共享密钥

对等两点之间的加密/解密会话，建议使用预先计算的共享密钥：

```javascript
// Bob pre-computes shared key with Alice (one time)
const sharedKey = nacl.box.before(alice.publicKey, bob.secretKey)

// generating one time nonce for encryption
const nonce = nacl.randomBytes(24)

// Bob encrypt message for Alice
const box = nacl.box.after(
  nacl.util.decodeUTF8('Hello Alice'),
  nonce,
  sharedKey // <-- using shared key
)
const message = {box, nonce}
```

_TweetNaCL.js 使用共享密钥加密的例子_


```javascript
// Alice pre-computes shared key with Bob (one time)
const sharedKey = nacl.box.before(bob.publicKey, alice.secretKey)

const message // <-- message object from Bob side
const payload = nacl.box.open.after(
  message.box, 
  message.nonce, 
  sharedKey // <-- using shared key
)

// assert.equal('Hello Alice', nacl.util.encodeUTF8(payload))
```

_TweetNaCL.js 使用共享密钥解密的例子_

# 维护密钥

## 公钥

"_公钥加密架构_"需要适当的方案来维护和认证某公钥确实属于某用户。尽管此过程不在本文讨论范围之内，但常见的解决方案包括将用户的公钥作为其个人资料页面的一部分进行维护，使其联系人可以通过查找目录来访问它。(译注：这类服务叫 [Key Server](https://en.wikipedia.org/wiki/Key_server_(cryptographic))，例如 [OpenPGPkeyserver](http://keys.gnupg.net/))

## 私钥

维护密钥要复杂得多，因为这是用户希望保密的非常敏感的信息。
通常，这个过程是由用户负责的，并且在某种程度上，实现公钥加密的应用程序需要允许用户输入其私钥(绝不要将其传到服务器端，译注：参考[该文章](https://github.com/mdrights/Digital-rights/blob/master/E%E5%8A%A0%E5%AF%86%E6%8A%80%E8%A1%93/2019-09-21-%E4%BD%A0%E7%9C%9F%E7%9A%84%E4%BA%86%E8%A7%A3%E7%AB%AF%E5%88%B0%E7%AB%AF%E5%8A%A0%E5%AF%86%E4%B9%88.md))。

密钥通常使用离线安全存储机制或在线存储，使用强对称加密方法(如 _AES_)来保护密钥。
将私钥在线存储，简化了将私钥添加进应用程序的过程(_仅用于客户端解密_)，例如：在登录阶段。

# **结论**

本文介绍了 _公钥加密_，以及如何在 JavaScript中使用 _TweetNaCL.js_ 库来实现它。

> 使用 _XSalsa20_ 而不是 _RSA_，_CPU_ 使用和 _电池_ 消耗降低到历史最低，同时保持强大的 _256位安全_ 级别。
> —— 给你 App 的提示 ;)

使用 _TweetNaCL.js_ 进行 **_数字签名_** 将在该系列的第二篇文章中进行讨论：[在此处阅读](https://medium.com/@kyberneees/high-speed-public-key-cryptography-in-javascript-part-2-digital-signatures-3e58876d1dff)。

一如既往地感谢您的留言与反馈!

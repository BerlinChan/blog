---
title: 在 Javascript 中实现高速公钥加密(一)
date: 2019-11-16T10:46:37.121Z
template: post
featured_top: false
featured_media: ./featured_media.png
draft: true
slug: /2019/11/High-speed-public-key-cryptography-in-JavaScript-1
categories: 
    - 安全
tags:
    - Javascript
    - Node.js
    - 加密
    - 翻译
description: 
---

<!-- endExcerpt -->

这是一篇翻译。  
作者：[Rolando Santamaria Maso](https://medium.com/@kyberneees)  
原文：[https://medium.com/sharenowtech/high-speed-public-key-cryptography-in-javascript-part-1-3eefb6f91f77](https://medium.com/sharenowtech/high-speed-public-key-cryptography-in-javascript-part-1-3eefb6f91f77)

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

Example of systems using Public Key Cryptography:

*   SSL/TLS Handshake
*   [Whatsapp](https://www.whatsapp.com/)
*   [Threema](https://threema.ch/en)
*   PGP & [OpenPGP](https://www.openpgp.org/)
*   other billion examples…

## NaCL & TweetNaCL.js

> NaCl (pronounced “salt”) is a new easy-to-use high-speed software library for network communication, encryption, decryption, signatures, etc. NaCl’s goal is to provide all of the core operations needed to build higher-level cryptographic tools.

## 

<div class="ay ki ba bb kj bd">Introduction</div>

### 

<div class="ay ki ba bb kj bd">NaCl was initiated under the CACE (Computer Aided Cryptography Engineering) project funded by the European Commission's…</div>

#### 

](http://nacl.cr.yp.to/?source=post_page-----3eefb6f91f77----------------------)</div>

The NaCL project is being lead by [_Daniel J.Bernstein_](http://cr.yp.to/djb.html), one of the most prominent Computer Scientists of our era.

> Optionally you can read [Aaron Swartz](http://www.aaronsw.com/) comment on Daniel J. Bernstein: [http://www.aaronsw.com/weblog/djb](http://www.aaronsw.com/weblog/djb)

> [Specifically, NaCl uses elliptic-curve cryptography, not RSA; it uses an elliptic curve, Curve25519, that has several advanced security features; it uses Salsa20, not AES (although it does include an AES implementation on the side); it uses Poly1305, not HMAC; and it uses EdDSA, not ECDSA.](https://cryptojedi.org/papers/coolnacl-20111201.pdf)

NaCL is proven to be secure, as breaking every round of Salsa20 is theoretically more expensive than breaking correspondent AES rounds.  
In the other hand Salsa20 was designed with speed in mind, offering great performance even under low speed CPUs. A more detailed explanation of Salsa20 speed is available here: [https://cr.yp.to/snuffle/speed.pdf](https://cr.yp.to/snuffle/speed.pdf)

**TweetNaCL**

> TweetNaCl is the world’s first **auditable** high-security cryptographic library. TweetNaCl fits into just 100 tweets while supporting all 25 of the C [NaCl](http://nacl.cr.yp.to/) functions used by applications. TweetNaCl is a self-contained public-domain C library, so it can easily be integrated into applications.

## 

<div class="ay ki ba bb kj bd">TweetNaCl: Introduction</div>


### 

<div class="ay ki ba bb kj bd">TweetNaCl is the world's first auditable high-security cryptographic library. TweetNaCl fits into just 100 tweets while…</div>

#### 

<div class="ay ki ba bb kj bd">tweetnacl.cr.yp.to</div>

](http://tweetnacl.cr.yp.to/?source=post_page-----3eefb6f91f77----------------------)</div>

The[**_TweetNaCL.js_**](https://tweetnacl.js.org) project brings TweetNaCL to JavaScript and therefore to Node.js and the Web. It uses [**_XSalsa20_**](https://cr.yp.to/snuffle/xsalsa-20110204.pdf)_(longer nonce)_ stream cipher instead of Salsa20.

> JavaScript Benchmarks: [https://github.com/dchest/tweetnacl-js/blob/master/README.md#benchmarks](https://github.com/dchest/tweetnacl-js/blob/master/README.md#benchmarks)

# Joining the JavaScript puzzle

## Bob encrypts message for Alice

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

<figcaption class="bk bw hu hv hw et er es hx hy au fx">TweetNaCL.js public key encryption example</figcaption>


## Alice decrypts message from Bob

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

<figcaption class="bk bw hu hv hw et er es hx hy au fx">TweetNaCL.js public key decryption example</figcaption>


## Using pre-computed shared keys

For encryption/decryption sessions between peers, using pre-computed shared keys is recommended:

```javascript
// Bob precomputes shared key with Alice (one time)
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

<figcaption class="bk bw hu hv hw et er es hx hy au fx">TweetNaCL.js encryption using shared keys</figcaption>


```javascript
// Alice precomputes shared key with Bob (one time)
const sharedKey = nacl.box.before(bob.publicKey, alice.secretKey)

const message // <-- message object from Bob side
const payload = nacl.box.open.after(
  message.box, 
  message.nonce, 
  sharedKey // <-- using shared key
)

// assert.equal('Hello Alice', nacl.util.encodeUTF8(payload))
```

<figcaption class="bk bw hu hv hw et er es hx hy au fx">TweetNaCL.js decryption using shared keys</figcaption>


# Maintaining the keys

## Public Key

A “_Public Key Infrastructure_” requires proper solutions for the maintenance and authentication of the users public key. While this process is out of scope in this article, a common solution consist on maintaining the users public key as part of their profile page and make it accessible to their contacts through a directory-like API.

## Private Key

Maintaining secret keys is a lot more complicated, as this is a very sensitive piece of information users want to keep in secret. Commonly this process is a user responsibility and somehow the applications implementing public-key cryptography are required to allow the users to enter their secret keys (_never transmitting it to the server-side_).

Secret keys are often stored using offline secure storage mechanisms or online, using strong symmetric encryption methods such as _AES_ to protect the key. The second method simplifies the process of “injecting” the private key into the application(_client-side decryption only_), for instance: during the login phase.

# **Conclusions**

In this article we have introduced _Public-key Cryptography_ and how it can be implemented in JavaScript using the _TweetNaCL.js_ library.

> Using _XSalsa20_ instead of _RSA_, _CPU_ usage and _battery_ consumption are reduced to historical minimums, while keeping strong `256-bit security` levels.  
> — a message for your apps ;)

**_Digital Signatures_** using _TweetNaCL.js_ will be discussed on a second post in this serie: [_read it here_](/@kyberneees/high-speed-public-key-cryptography-in-javascript-part-2-digital-signatures-3e58876d1dff).

As always, your feedback is appreciated!

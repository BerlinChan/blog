---
title: 升级 07 年的 HP Compaq v3000 笔记本电脑
date: 2020-07-02T10:46:37.121Z
template: post
featured_top: true
featured_media: ./upgrade-hp-compaq-v3000.jpg
draft: false
slug: /2020/07/upgrade-old-hp-compaq-v3000-notebook
categories: 
    - 小玩意
    - 短片
tags:
    - 笔记本
    - 升级
    - BIOS
description: 给 07年买的 HP v3000 笔记本电脑升级硬件包括 CPU、内存、硬盘和无线网卡
---

<!-- endExcerpt -->

`video: https://youtu.be/-p64Iaf7dio`

一台 2007 年买的 HP Compaq v3000 笔记本电脑，陪伴我整个大学年代，学网页制作、3D动画、校报编辑、摄影、玩 PSP，毕业前夕出去找网页制作的工作，都把它装在我的斜挎运动包里带着给别人演示作品，对它有很多回忆。

13 年过去，现在运行 Win10 速度很慢，花 202元买了些部件给它升级下。包括：

- CPU: Intel Core Duo T2050 1.6GHz -> T7200 2GHz
- RAM: 2.5G -> 4G
- Storage: 80G HDD -> 120G SSD
- Wireless: 3945ABG -> 4965 AGN

## 升级无线网卡 3945

升级换掉 3945 无线网卡遇到问题，v3000 主板的 BIOS 中有硬件白名单 whitelist，在 [bios-mods](https://www.bios-mods.com/) 论坛中有找到个 [HP DV2000 白名单修改的 BIOS](https://www.bios-mods.com/forum/Thread-REQUEST-HP-DV2000-Wifi-whitelist-removal-sp36869?pid=65656#pid65656)，被修改的原 DV2000 BIOS 更新文件与 v3000 的更新文件，文件名相同为 sp36869.exe，且 MD5 hash 相同，所以判断修改后的 BIOS 应该也可以通用。

赌一把刷了试试，反而 3945、4965 两个都不能用了。修改的 BIOS 应该不是移除白名单，而是将白名单中的 3945 修改为其他型号。再进一步，只能自己修改 BIOS，考虑再三我还是放弃并刷回原 BIOS。

## 可用内存为 3G

T7200 CPU 是 64bit 的，也装了 64位的 Win10，已安装内存显示 4G，但可用内存为 3G，有 1G为硬件保留的内存，上网查说这好像是正常的，就没再研究。

## 升级效果

升级后开机和操作响应速度快了很多，特别是硬盘的速度，不再动不动就 100%。足够下载、上网、文本处理等日常用途了。老机器再战 5年不成问题。

## 补充 by 网友-老丹

朋友也是这款笔记本，升级2G内存，但外侧插槽不工作不知缘故，算了。Wifi 模块坏了，所以必须更换。[BCM94322MC](https://item.taobao.com/item.htm?spm=a1z09.2.0.0.28392e8dSnWf6N&id=520474293817&_u=t22tep0ba70) 是 Dell 的，必须更换这个名，同时更改硬件ID：PCIVEN 14E48 DEV 432B SUBSYS 1380 103C，商家给的1379是错的。参见文章[BiosRepair-修改BIOS添加网卡白名单问题](http://www.biosrepair.com/bios/ibmbmd.htm)。
 
由于给他升级，勾起想换 CPU 的心，再说吧。目标可能是 T7400，三十多块钱。

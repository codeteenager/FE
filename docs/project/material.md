# 物料平台建设

## 什么是物料？
物料(Material) 这个概念在前端领域大家都不陌生，在阿里飞冰中的解释物料即组成一个前端项目的不同单位，根据抽象粒度的不同，我们将物料从小到大分为组件（component）、区块（block）和模板（scaffold）。其实在这里可以理解为前端可复用的组件模块都可理解成物料。

## 为什么要有物料？
在企业级前端开发中，我们经常会遇到一些问题，例如：

* 项目中有很多重复的功能，你如何去优化？
* 我想做一个新功能，有没有谁做过类似的功能可以拿来用
* 大家写过的组件各具风格，不好交流

针对这种情况我们不得不去搭建一个物料平台，建设前端物料体系，统一前端的开发流程和技术栈，保证资源复用率。

## 物料平台建设
物料平台主要分为两部分内容，物料开发脚手架和物料管理平台。整体流程图如下：
![](/project/24.png)

### 脚手架
在这里我们主要借鉴了阿里飞冰提供的物料开发工具iceworks-cli，由于阿里飞冰提供的主要是React生态工具，而我们偏向于Vue技术栈，所以将其进行修改定制化。提供的功能主要有：

* 物料的创建
* 物料的开发
* 物料文档的生成
* 物料的截图
* 物料的上传发布
* 物料数据的生成与同步管理平台

对于物料的创建，我们事先定义了物料的模板，主要是物料开发的一个标准规范。包括以下内容：

* 物料命名规范
* 物料文档规范
* 物料代码规范
* 物料发布规范

### 物料管理平台
物料管理我们使用npm仓库对前端物料进行管理，私有化npm仓库有很多例如Verdaccio、cnpm、nexus，在这里我们使用nexus进行npm包管理。但是nexus仓库只能够展示npm包，如下

![](/project/25.png)

我们不能直接把npm仓库暴露给用户，体验上也不够好，所以我们需要自定义物料管理平台去展示用户上传的物料，并提供检索功能，供用户快速查找他所需要的物料。

![](/project/26.png)

那么我们管理平台如何去获取私有库的数据呢，这时候我们需要一个媒介unpkg去帮平台拉取私有库的数据，unpkg 是一个前端常用的公共 CDN，你可以通过URL形式访问npm包中的资源，例如：[https://unpkg.com/react@16.14.0/umd/react.production.min.js](https://unpkg.com/react@16.14.0/umd/react.production.min.js)。具体可以看[使用unpkg来读取我们私有库的包](https://zhuanlan.zhihu.com/p/84119287)。整体流程如下：

![](/project/27.png)

## 其他物料平台
* [ice](https://appworks.site/materials/about.html#%E6%A6%82%E5%BF%B5%E8%A7%A3%E9%87%8A)
* [YouBuilder](https://package.yonyoucloud.com/home)
* [Next](https://next.startdt.com/)
* [Vusion](https://vusion.163yun.com/#/docs/introduction?teamId=039fc100105411ea8f8f9f5d7f78ba77)
* [羚珑](https://ling.jd.com/jdw/)
* [Bit](https://docs.bit.dev/docs/quick-start)
* [Fuep](http://www.fuep.net/)

## 参考资料
* [物料前端中台建设](https://segmentfault.com/a/1190000020125448)
* [从生产到消费，设计基于物料的前端开发链路](https://zhuanlan.zhihu.com/p/246712012)
* [实战：打造团队的共享组件平台！](https://juejin.cn/post/6844904033514160141)
* [从业务组件库看前端物料生态](https://segmentfault.com/a/1190000041079239)
* [阿里 CBU 体验技术部 – 结合组件设计监控策略](https://www.bilibili.com/read/cv7598746?from=search&spm_id_from=333.337.0.0)
* [京东零售平台：前端组件资源共享与中心化管理实践](https://www.infoq.cn/article/MgILbHevE0WOp87VRAuA)
* [基于 MF 的组件化共享工作流](https://mp.weixin.qq.com/s/u5oAcIYiGrl1qOujOYjzqw)

# npm
前端工程化离不开 npm（node package manager） 或者 Yarn 这些管理工具。npm 或 Yarn 在工程项目中，除了负责依赖的安装和维护以外，还能通过 npm scripts 串联起各个职能部分，让独立的环节自动运转起来。

## npm诞生背景
npm由程序员isaacs(https://github.com/isaacs)发明，他的初步思路是集中管理所有的模块，所有的模块都上传到仓库中(registry)。在模块内创建package.json标注模块的基本信息，像模块名、版本、依赖库等等，然后通过npm publish发布模块上传倒npm仓库中(registry)，最后通过npm install安装模块，模块安装到node_modules目录下。npm于2014年商业化，2020年被Github收购。

## npm介绍
npm解决的核心问题是模块管理问题，npm包含cli脚手架、模块仓库、官网(https://www.npmjs.com/)三大部分。

::: tip
关于npm的相关信息可以查阅：https://docs.npmjs.com/about-npm
:::

## npm内部机制和核心原理
我们先来看看 npm 的核心目标：
> Bring the best of open source to you, your team and your company.
> 给你和你的团队、你的公司带来最好的开源库和依赖。

通过这句话，我们可以知道 npm 最重要的一环是安装和维护依赖。在平时开发中，“删除 node_modules，重新 npm install”是一个百试不爽的解决 npm 安装类问题的方法。

### npm 的安装机制和背后思想
它会优先安装依赖包到当前项目目录，使得不同应用项目的依赖各成体系，同时还减轻了包作者的 API 兼容性压力，但这样做的缺陷也很明显：如果我们的项目 A 和项目 B，都依赖了相同的公共库 C，那么公共库 C 一般都会在项目 A 和项目 B 中，各被安装一次。这就说明，同一个依赖包可能在我们的电脑上进行多次安装。

当然，对于一些工具模块比如 supervisor 和 gulp，你仍然可以使用全局安装模式，这样方便注册 path 环境变量，我们可以在任何地方直接使用 supervisor、 gulp 这些命令。（不过，一般还是建议不同项目维护自己局部的 gulp 开发工具以适配不同项目需求。）



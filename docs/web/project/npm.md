# npm
前端工程化离不开 npm（node package manager） 或者 Yarn 这些管理工具。npm 或 Yarn 在工程项目中，除了负责依赖的安装和维护以外，还能通过 npm scripts 串联起各个职能部分，让独立的环节自动运转起来。

## npm诞生背景
npm由程序员isaacs(https://github.com/isaacs)发明，他的初步思路是集中管理所有的模块，所有的模块都上传到仓库中(registry)。在模块内创建package.json标注模块的基本信息，像模块名、版本、依赖库等等，然后通过npm publish发布模块上传倒npm仓库中(registry)，最后通过npm install安装模块，模块安装到node_modules目录下。npm于2014年商业化，2020年被Github收购。

## npm介绍
npm解决的核心问题是模块管理问题，npm包含cli脚手架、模块仓库、官网(https://www.npmjs.com/)三大部分。

::: tip
关于npm的相关信息可以查阅：https://docs.npmjs.com/about-npm
:::

![](/web/project/2.png)

产生一个模块首先通过npm init来创建一个模块，创建的模块中包含package.json，我们通过修改name、version、dependencies来确定模块的基本信息，如果模块想使用其他的模块则需要使用npm install来安装其他的模块，将模块下载到node_modules目录中，其中模块也包含package.json和node_modules这就是npm的规范。

当module1开发完成后，调用npm publish上传到npm registry中，registry包含两部分，一部分是public公开的，任何人都能使用，另一部分是private私有的，现在npm商业化后主要靠私有仓库收费。

public共有仓库又分为两种，一种是普通的仓库，一种是组织的仓库。

常见的npm命令如下：
* npm init：创建模块
* npm install：安装模块
* npm publish：发布模块
* npm link：关联本地模块进行本地开发
* npm config：查看或调整本地配置
* npm run：调用scripts

## npm的局限
npm只能解决模块的高校管理和获取问题，无法解决性能加载性能问题。所以模块化发明后，制约其广泛应用的因素就是性能因素。


## npm内部机制和核心原理
我们先来看看 npm 的核心目标：
> Bring the best of open source to you, your team and your company.
> 给你和你的团队、你的公司带来最好的开源库和依赖。

通过这句话，我们可以知道 npm 最重要的一环是安装和维护依赖。在平时开发中，“删除 node_modules，重新 npm install”是一个百试不爽的解决 npm 安装类问题的方法。

### npm 的安装机制和背后思想
它会优先安装依赖包到当前项目目录，使得不同应用项目的依赖各成体系，同时还减轻了包作者的 API 兼容性压力，但这样做的缺陷也很明显：如果我们的项目 A 和项目 B，都依赖了相同的公共库 C，那么公共库 C 一般都会在项目 A 和项目 B 中，各被安装一次。这就说明，同一个依赖包可能在我们的电脑上进行多次安装。

当然，对于一些工具模块比如 supervisor 和 gulp，你仍然可以使用全局安装模式，这样方便注册 path 环境变量，我们可以在任何地方直接使用 supervisor、 gulp 这些命令。（不过，一般还是建议不同项目维护自己局部的 gulp 开发工具以适配不同项目需求。）



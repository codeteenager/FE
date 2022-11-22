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

npm的安装机制如下图所示：

![](/web/project/3.png)

npm install 执行之后，首先，检查并获取 npm 配置，这里的优先级为：项目级的 .npmrc 文件 > 用户级的 .npmrc 文件> 全局级的 .npmrc 文件 > npm 内置的 .npmrc 文件。

然后检查项目中是否有 package-lock.json 文件。

如果有，则检查 package-lock.json 和 package.json 中声明的依赖是否一致：

* 一致，直接使用 package-lock.json 中的信息，从缓存或网络资源中加载依赖；
* 不一致，按照 npm 版本进行处理（不同 npm 版本处理会有不同，具体处理方式如图所示）。

如果没有，则根据 package.json 递归构建依赖树。然后按照构建好的依赖树下载完整的依赖资源，在下载时就会检查是否存在相关资源缓存：

* 存在，则将缓存内容解压到 node_modules 中；
* 否则就先从 npm 远程仓库下载包，校验包的完整性，并添加到缓存，同时解压到 node_modules。

最后生成 package-lock.json。

构建依赖树时，当前依赖项目不管其是直接依赖还是子依赖的依赖，都应该按照扁平化原则，优先将其放置在 node_modules 根目录（最新版本 npm 规范）。在这个过程中，遇到相同模块就判断已放置在依赖树中的模块版本是否符合新模块的版本范围，如果符合则跳过；不符合则在当前模块的 node_modules 下放置该模块（最新版本 npm 规范）。

::: tip
图中标明的 npm 不同版本的不同处理情况，并学会从这种“历史问题”中总结 npm 使用的团队最佳实践：同一个项目团队，应该保证 npm 版本的一致。
:::

### npm缓存机制
对于一个依赖包的同一版本进行本地化缓存，是当代依赖包管理工具的一个常见设计。使用时要先执行以下命令：

```sh
npm config get cache
```

通过这行命令可以得到配置缓存的根目录在C:\Users\用户名\AppData\Local\npm-cache(mac在/Users/用户名/.npm)，我们 cd 进入C:\Users\用户名\AppData\Local\npm-cache中可以发现_cacache文件。在 npm v5 版本之后，缓存数据均放在根目录中的_cacache文件夹中。

![](/web/project/4.png)

可以使用以下命令清除C:\Users\用户名\AppData\Local\npm-cache\_cacache 中的文件

```sh
npm cache clean --force
```

在_cacache目录下，有三个目录：

1. content-v2
2. index-v5
3. tmp

其中 content-v2 里面基本都是一些二进制文件。为了使这些二进制文件可读，我们把二进制文件的扩展名改为 .tgz，然后进行解压，得到的结果其实就是我们的 npm 包资源。

而 index-v5 文件中，我们采用跟刚刚一样的操作就可以获得一些描述性的文件，事实上这些内容就是 content-v2 里文件的索引。

那么这些缓存是如何生成的呢?

当 npm install 执行时，通过[pacote](https://www.npmjs.com/package/pacote)把相应的包解压在对应的 node_modules 下面。npm 在下载依赖时，先下载到缓存当中，再解压到项目 node_modules 下。pacote 依赖[npm-registry-fetch](https://github.com/npm/npm-registry-fetch#npm-registry-fetch)来下载包，npm-registry-fetch 可以通过设置 cache 属性，在给定的路径下根据[IETF RFC 7234](https://datatracker.ietf.org/doc/rfc7234/)生成缓存数据。

然后在每次安装资源时，根据 package-lock.json 中存储的 integrity、version、name 信息生成一个唯一的 key，这个 key 能够对应到 index-v5 目录下的缓存记录。如果发现有缓存资源，就会找到 tar 包的 hash，根据 hash 再去找缓存的 tar 包，并再次通过pacote把对应的二进制文件解压到相应的项目 node_modules 下面，省去了网络下载资源的开销。

::: warning 注意
这里提到的缓存策略是从 npm v5 版本开始的。在 npm v5 版本之前，每个缓存的模块在 ~/.npm 文件夹中以模块名的形式直接存储，储存结构是：{cache}/{name}/{version}。
:::

## npm的使用技巧
### 配置 npm init 默认字段来自定义 npm init 的内容
```js
npm config set init.author.name "test"
npm config set init.author.email "test@gmail.com"
npm config set init.author.url "test.com"
npm config set init.license "MIT"
```
> 更多信息见：[npm-config](https://docs.npmjs.com/cli/v9/commands/npm-config)

### 利用 npm link，高效率在本地调试以验证包的可用性
使用 npm link可以将模块链接到对应的业务项目中运行，从工作原理上总结，npm link 的本质就是软链接，它主要做了两件事：

* 为目标 npm 模块创建软链接，将其链接到全局 node 模块安装路径 C:\Users\用户名\AppData\Roaming\npm\node_modules(mac在/usr/local/lib/node_modules/)中
* 为目标 npm 模块的可执行 bin 文件创建软链接，将其链接到全局 node 命令安装路径 /usr/local/bin/ 中。

### npx 的作用
npx 由 npm v5.2 版本引入，解决了 npm 的一些使用快速开发、调试，以及项目内使用全局模块的痛点。

在传统 npm 模式下，如果我们需要使用代码检测工具 ESLint，就要先通过 npm install 安装

```sh
npm install eslint --save-dev
```

然后在项目根目录下执行：
```sh
./node_modules/.bin/eslint --init
./node_modules/.bin/eslint yourfile.js
```

而使用 npx 就简单多了，你只需要下面 2 个操作步骤：
```sh
npx eslint --init
npx eslint yourfile.js
```

这是因为它可以直接执行 node_modules/.bin 文件夹下的文件。在运行命令时，npx 可以自动去 node_modules/.bin 路径和环境变量 $PATH 里面检查命令是否存在，而不需要再在 package.json 中定义相关的 script。

npx 另一个更实用的好处是：npx 执行模块时会优先安装依赖，但是在安装执行后便删除此依赖，这就避免了全局安装模块带来的问题。
例如我们使用create-react-app创建工程。
```sh
npx create-react-app cra-project
```

npx 会将 create-react-app 下载到一个临时目录，使用以后再删除

## 相关文章
* [前端工程化 - 剖析npm的包管理机制](https://juejin.cn/post/6844904022080667661)



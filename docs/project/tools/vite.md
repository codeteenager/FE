# Vite
Vie是vue的作者尤雨溪在开发vue3.0的时候开发的一个web开发构建工具。由于其原生ES模块导入方式，可以实现闪电般的冷服务器启动。Vite是一种新型前端构建工具，能够显著提升前端开发体验。它主要由两部分组成：

* 一个开发服务器，它基于 原生 ES 模块 提供了 丰富的内建功能，如速度快到惊人的 模块热更新（HMR）。
* 一套构建指令，它使用 Rollup 打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源。

Vite意在提供开箱即用的配置，同时它的插件API和JavaScript API带来了高度的可扩展性，并有完整的类型支持。

## ESBuild
ESBuild是基于Go语言开发的JavaScript Bundler，它的构建速度是webpack的几十倍。由Figma前CTO Evan Wallace开发，并且也被Vite用于开发环境的依赖解析和Transform。

### 实现原理
* 由Go实现并编译成本地代码：多数Bundler都是由JavaScript实现的，但是CLI应用对于JIT编译语言来说是性能表现最不好的。每次运行Bundler的时候，JS虚拟机都是以第一次运行代码的视角来解析Bundler(比如Webpack)的代码，没有优化信息。当ESBuild在解析JavaScript的时候，Node还在解析Bundler的JS代码。
* 重度使用并行计算：Go语言本身的设计就很重视并行计算，所以ESBuild对这一点会加以利用。在构建中主要由三个环节：解析(Parsing)，链接(Linking)和代码生成(Code generation)。在解析和代码生成环节会尽可能使用多核进行并行计算。
* ESBuild中的一切代码从零实现：通过自行实现所有逻辑来避免第三方库带来的性能问题，统一的数据结构可以减少数据转换开销，并且可以根据需要改变架构，当然最大的缺点就是工作量倍增。
* 对内存的高校使用：ESBuild在实现时尽量减少数据的传递以及数据的转换，ESBuild尽量减少对整体AST的传递，并且尽可能复用AST数据，其他的Bundler可能会在编译的不同阶段往复转换数据格式(string->TS->JS->older JS->string....)，在内存存储效率方面Go也比JavaScript更高效。

### 使用方式
1. 全局安装Esbuild命令，安装完成后可以通过esbuild --version查看版本号

```shell
npm install esbuild -g
```

2. 创建文件，添加测试文件

```js
//index.js
const {cloneDeep} = 'lodash'
console.log(cloneDeep);
```

3. 执行构建命令

```shell
esbuild ./index.js --bundle --outfile=out_esb.js --minify
```

4. 查看构建后的文件

### 优缺点

#### 优点：
* Golang开发：采用Go语言开发，可以充分利用多线程打包，并且线程之间共享内容，直接编译成机器码，大大节省了程序运行时间。
* 多核并行：得益于Go当中多线程共享内存的优势，内部打包算法充分利用多核CPU优势
* 从零造轮子：没有任何第三方库的黑盒逻辑，保证极致的代码性能
* 高效利用内存：Esbuild中从头到尾尽可能地复用一份AST节点数据，从而大大提高了内存的利用效率，提升编译性能

#### 缺点：
* 没有TS类型检查
* 不能操作AST
* 不支持装饰器语法
* 产物target无法降级到ES5及以下

## SWC
SWC是一个用Rust写的高性能TypeScript/JavaScript转译器，类似于babel。是基于Rust的JavaScript Compiler(其生态中也包含打包工具spack)，目前为NextJS/parcel/Deno等前端圈知名项目使用。

### 实现原理
> 参考文档：[https://zhuanlan.zhihu.com/p/437529362](https://zhuanlan.zhihu.com/p/437529362)


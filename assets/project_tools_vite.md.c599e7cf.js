import{_ as s,v as a,b as l,R as n}from"./chunks/framework.a626a558.js";const e="/FE/project/70.png",p="/FE/project/71.png",F=JSON.parse('{"title":"Vite","description":"","frontmatter":{},"headers":[],"relativePath":"project/tools/vite.md","filePath":"project/tools/vite.md","lastUpdated":1683265897000}'),o={name:"project/tools/vite.md"},t=n('<h1 id="vite" tabindex="-1">Vite <a class="header-anchor" href="#vite" aria-label="Permalink to &quot;Vite&quot;">​</a></h1><p>Vie是vue的作者尤雨溪在开发vue3.0的时候开发的一个web开发构建工具。由于其原生ES模块导入方式，可以实现闪电般的冷服务器启动。Vite是一种新型前端构建工具，能够显著提升前端开发体验。它主要由两部分组成：</p><ul><li>一个开发服务器，它基于 原生 ES 模块 提供了 丰富的内建功能，如速度快到惊人的 模块热更新（HMR）。</li><li>一套构建指令，它使用 Rollup 打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源。</li></ul><p>Vite意在提供开箱即用的配置，同时它的插件API和JavaScript API带来了高度的可扩展性，并有完整的类型支持。</p><p>vite创建的项目开发依赖非常简单，只有vite和@vue/compiler-sfc。</p><p>vite项目提供了两个子命令vite serve和vite build。</p><p>vite serve开启一个用于开发的web服务器，在启动服务器的时候不需要编译所有的代码文件，启动速度很快。 <img src="'+e+'" alt=""></p><p>而vue-cli启动项目的时候使用vue-cli-service serve，它内部会先用webpack打包模块，如果模块比较多，打包速度会变慢，把打包的结果存储在内存中，然后开启web服务器供浏览器访问。 <img src="'+p+`" alt=""></p><p>vite利用现代浏览器支持的ES Module模块化的特性，省略了对模块的打包。对于需要编译的组件，例如单文件组件、样式模块等，vite采用即时编译，就是说具体请求某个文件的时候才会在服务端编译这个文件，这种即时编译的好处就是按需编译，速度会更快。</p><p>vite也支持HMR，相比webpack更好，webpack HMR会自动以这个文件为入口重新build一次，所有涉及的依赖也都会被加载一遍，而Vite HMR是立即编译当前所修改的文件。</p><p>vite在生产中使用vite build命令，这个命令内部采用rollup进行打包，最终还是会把文件提前编译并打包到一起。对于代码分割，vite内部使用原生的动态导入的特性实现的，所以打包结果只支持现代浏览器。</p><p>vite出现引起了一个疑问，有没有必要打包应用？之前使用webpack打包，会把所有的模块打包到bundle.js中，这里有两个原因，一个是浏览器环境并不支持模块化，另一个是零散的模块文件会产生大量的HTTP请求。这两个问题目前都有所解决，第一个浏览器支持ES Module模块化，第二个大量HTTP请求可以使用HTTP2来复用连接。</p><h2 id="vite核心原理模拟" tabindex="-1">vite核心原理模拟 <a class="header-anchor" href="#vite核心原理模拟" aria-label="Permalink to &quot;vite核心原理模拟&quot;">​</a></h2><p>web服务器模拟，先安装koa和koa-send，然后编写执行脚本</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">#!/usr/bin/env node</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> koa </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">koa</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> send </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">koa-send</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> app </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Koa</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//1. 静态文件服务器</span></span>
<span class="line"><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">use</span><span style="color:#A6ACCD;">(</span><span style="color:#C792EA;">async</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">ctx</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;font-style:italic;">next</span><span style="color:#89DDFF;">)</span><span style="color:#C792EA;">=&gt;</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">send</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">ctx</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">ctx</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">path</span><span style="color:#89DDFF;">,{</span><span style="color:#F07178;">root</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">process</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">cwd</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;">index</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">index.html</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">next</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">listen</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">3000</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Server running @ http://localhost:3000</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h2 id="esbuild" tabindex="-1">ESBuild <a class="header-anchor" href="#esbuild" aria-label="Permalink to &quot;ESBuild&quot;">​</a></h2><p>ESBuild是基于Go语言开发的JavaScript Bundler，它的构建速度是webpack的几十倍。由Figma前CTO Evan Wallace开发，并且也被Vite用于开发环境的依赖解析和Transform。</p><h3 id="实现原理" tabindex="-1">实现原理 <a class="header-anchor" href="#实现原理" aria-label="Permalink to &quot;实现原理&quot;">​</a></h3><ul><li>由Go实现并编译成本地代码：多数Bundler都是由JavaScript实现的，但是CLI应用对于JIT编译语言来说是性能表现最不好的。每次运行Bundler的时候，JS虚拟机都是以第一次运行代码的视角来解析Bundler(比如Webpack)的代码，没有优化信息。当ESBuild在解析JavaScript的时候，Node还在解析Bundler的JS代码。</li><li>重度使用并行计算：Go语言本身的设计就很重视并行计算，所以ESBuild对这一点会加以利用。在构建中主要由三个环节：解析(Parsing)，链接(Linking)和代码生成(Code generation)。在解析和代码生成环节会尽可能使用多核进行并行计算。</li><li>ESBuild中的一切代码从零实现：通过自行实现所有逻辑来避免第三方库带来的性能问题，统一的数据结构可以减少数据转换开销，并且可以根据需要改变架构，当然最大的缺点就是工作量倍增。</li><li>对内存的高校使用：ESBuild在实现时尽量减少数据的传递以及数据的转换，ESBuild尽量减少对整体AST的传递，并且尽可能复用AST数据，其他的Bundler可能会在编译的不同阶段往复转换数据格式(string-&gt;TS-&gt;JS-&gt;older JS-&gt;string....)，在内存存储效率方面Go也比JavaScript更高效。</li></ul><h3 id="使用方式" tabindex="-1">使用方式 <a class="header-anchor" href="#使用方式" aria-label="Permalink to &quot;使用方式&quot;">​</a></h3><ol><li>全局安装Esbuild命令，安装完成后可以通过esbuild --version查看版本号</li></ol><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">esbuild</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-g</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ol start="2"><li>创建文件，添加测试文件</li></ol><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">//index.js</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;">cloneDeep</span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">lodash</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(cloneDeep)</span><span style="color:#89DDFF;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ol start="3"><li>执行构建命令</li></ol><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">esbuild</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">./index.js</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--bundle</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--outfile=out_esb.js</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--minify</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ol start="4"><li>查看构建后的文件</li></ol><h3 id="优缺点" tabindex="-1">优缺点 <a class="header-anchor" href="#优缺点" aria-label="Permalink to &quot;优缺点&quot;">​</a></h3><h4 id="优点" tabindex="-1">优点： <a class="header-anchor" href="#优点" aria-label="Permalink to &quot;优点：&quot;">​</a></h4><ul><li>Golang开发：采用Go语言开发，可以充分利用多线程打包，并且线程之间共享内容，直接编译成机器码，大大节省了程序运行时间。</li><li>多核并行：得益于Go当中多线程共享内存的优势，内部打包算法充分利用多核CPU优势</li><li>从零造轮子：没有任何第三方库的黑盒逻辑，保证极致的代码性能</li><li>高效利用内存：Esbuild中从头到尾尽可能地复用一份AST节点数据，从而大大提高了内存的利用效率，提升编译性能</li></ul><h4 id="缺点" tabindex="-1">缺点： <a class="header-anchor" href="#缺点" aria-label="Permalink to &quot;缺点：&quot;">​</a></h4><ul><li>没有TS类型检查</li><li>不能操作AST</li><li>不支持装饰器语法</li><li>产物target无法降级到ES5及以下</li></ul><h2 id="swc" tabindex="-1">SWC <a class="header-anchor" href="#swc" aria-label="Permalink to &quot;SWC&quot;">​</a></h2><p>SWC是一个用Rust写的高性能TypeScript/JavaScript转译器，类似于babel。是基于Rust的JavaScript Compiler(其生态中也包含打包工具spack)，目前为NextJS/parcel/Deno等前端圈知名项目使用。</p><h3 id="实现原理-1" tabindex="-1">实现原理 <a class="header-anchor" href="#实现原理-1" aria-label="Permalink to &quot;实现原理&quot;">​</a></h3><blockquote><p>参考文档：<a href="https://zhuanlan.zhihu.com/p/437529362" target="_blank" rel="noreferrer">https://zhuanlan.zhihu.com/p/437529362</a></p></blockquote>`,36),r=[t];function c(i,y,D,d,u,C){return a(),l("div",null,r)}const b=s(o,[["render",c]]);export{F as __pageData,b as default};
import{_ as s,c as a,o as e,a as n}from"./app.9c4e2ceb.js";const C=JSON.parse('{"title":"脚手架","description":"","frontmatter":{},"headers":[{"level":2,"title":"常用的脚手架工具","slug":"常用的脚手架工具","link":"#常用的脚手架工具","children":[]},{"level":2,"title":"Yeoman","slug":"yeoman","link":"#yeoman","children":[]},{"level":2,"title":"脚手架的工作原理","slug":"脚手架的工作原理","link":"#脚手架的工作原理","children":[]}],"relativePath":"project/tools/cli.md","lastUpdated":1670864107000}'),l={name:"project/tools/cli.md"},p=n(`<h1 id="脚手架" tabindex="-1">脚手架 <a class="header-anchor" href="#脚手架" aria-hidden="true">#</a></h1><p>脚手架它的本质作用就是帮助开发者创建项目基础结构、提供项目规范和约定，使开发者可以方便地将注意力集中到业务开发本身。当我们开发相同类型项目时都会有一些相同的约定，包括：</p><ul><li>相同的文件组织结构</li><li>相同的开发范式</li><li>相同的模块依赖</li><li>相同的工具配置</li><li>相同的基础代码</li></ul><p>那么这样就会导致我们在搭建新项目时有大量的重复性工作要去做，脚手架工具就是为了解决这样问题的。我们可以通过脚手架工具去搭建特定项目类型的骨架，然后基于骨架去完成后续的开发工作，例如IDE(Android Studio)创建项目的过程就是一个脚手架的工作流程。</p><p>由于前端技术选型多样，没有统一的标准，所以它的脚手架一般不会放在IDE中，都是以独立的工具存在，而且相对复杂一些。</p><h2 id="常用的脚手架工具" tabindex="-1">常用的脚手架工具 <a class="header-anchor" href="#常用的脚手架工具" aria-hidden="true">#</a></h2><p>市面上有很多的脚手架工具，但是大都是为了特定项目类型服务的。例如：</p><ul><li>React项目使用create-react-app</li><li>Vue项目使用vue-cli</li><li>Angular项目使用angular-cli</li></ul><p>这些工具都大同小异，根据开发者提供的信息自动的生成项目的特定文件、相关的配置等项目基础结构。</p><p>还有一类像Yeoman为代码的通用型脚手架工具，它可以根据一套模板生成对应的项目结构，这种类型的脚手架工具很灵活也很容易去扩展。</p><p>还有一类脚手架工具Plop，它们在项目开发的过程中创建特定类型的文件，例如创建一个组件或模块所需要的文件，这类模块一般是由特定的文件组成的，而且都有基本的代码结构，相比手动创建，脚手架有更为便捷的创建方式。</p><h2 id="yeoman" tabindex="-1">Yeoman <a class="header-anchor" href="#yeoman" aria-hidden="true">#</a></h2><p>Yeoman的slogan是“THE WEB&#39;S SCAFFOLDING TOOL FOR MODERN WEBAPPS”——面向webapp的脚手架工具。Yeoman不能直接创建项目文件，它提供了一套完整的脚手架开发者API，使用这些API可以定制符合自己业务需求的任意脚手架方案。换句话说，Yeoman不封装任何方案，它是完全开放、高度可扩展的。</p><h2 id="脚手架的工作原理" tabindex="-1">脚手架的工作原理 <a class="header-anchor" href="#脚手架的工作原理" aria-hidden="true">#</a></h2><p>大部分脚手架工具都很简单，在启动脚手架之后，会自动询问一些预设的问题，然后根据开发者回答的结果结合模板文件生成项目的结构。脚手架工具就是一个Node cli应用，那我们可以创建一个cli应用。</p><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">mkdir</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">test-cli</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">test-cli</span></span>
<span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">init</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>创建完项目后可以新建一个cli.js，在文件中先声明一个文件头。</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">//cli.js</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">usr</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">bin</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">env node</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//Node cli应用入口必须要有这样的文件头</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>脚手架的工作过程分为两点：1. 通过命令行交互询问用户问题，2. 根据用户回答的结果生成文件</p><p>命令行交互询问使用<a href="https://github.com/SBoudrias/Inquirer.js" target="_blank" rel="noreferrer">inquirer</a>库来实现。</p><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">inquirer</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--save</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>生成文件可以使用<a href="https://github.com/mde/ejs" target="_blank" rel="noreferrer">ejs</a>模板引擎来实现</p>`,22),r=[p];function o(i,t,c,d,u,h){return e(),a("div",null,r)}const y=s(l,[["render",o]]);export{C as __pageData,y as default};
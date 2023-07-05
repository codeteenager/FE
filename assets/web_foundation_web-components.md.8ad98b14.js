import{_ as e,o,c as t,V as n}from"./chunks/framework.35cad8a6.js";const h=JSON.parse('{"title":"Web Components","description":"","frontmatter":{},"headers":[],"relativePath":"web/foundation/web-components.md","filePath":"web/foundation/web-components.md","lastUpdated":1687689030000}'),a={name:"web/foundation/web-components.md"},p=n('<h1 id="web-components" tabindex="-1">Web Components <a class="header-anchor" href="#web-components" aria-label="Permalink to &quot;Web Components&quot;">​</a></h1><p>如果问你开发项目的时候，为什么不手写原生JS，而是用现如今非常流行的前端框架呢？原因肯定非常多，比如良好的生态、数据驱动视图、模块化、组件化等等，Web Components就是为了解决组件化这个问题而诞生的，它是浏览器原生支持的组件化，不依赖于任何库或框架以及各种编辑打包工具，便可以在浏览器中运行。组件化的好处相必不便多说，大家都用过vue、react这类知名框架，懂得都懂。但是这类框架的组件化不是真正的组件化，虽然写代码时写得是组件化的代码，但是编译过后就不再是组件化了。</p><p>比如我们用Vue + Element UI开发了一套后台管理系统，Element UI提供的组件都是以el开头的，像<code>&lt;el-button&gt;</code>，但是编译过后显示在页面上就不是el-button标签了，这有点类似于CSS预处理器，那些像Saas、Less在开发阶段定义的变量其实并不是真正的变量，而是伪变量，在编译过后就没有变量这个概念了，所以很难跟JS进行通信。同理，框架的组件化也都不是真正的组件化，各家都是各家的组件化标准，这就导致了生态的分裂。而且框架的组件化都是要靠编译才能实现的。并且非常依赖于这个框架，是一种共生的关系。就像我们写xxx.vue是vue的组件，它没办法在浏览器中运行。</p><p>通常来说浏览器厂商会吸收一些流行的前端框架的可取之处，然后推动其成为标准，并在浏览器中原生实现其功能。Web Components与现在非常流行的mvvm框架是一种可以共存的关系，而不是一种互斥的关系。像saas变量和css变量，两者可以完美的互补。</p><p>Web Components不是单一的技术，而是由4门技术组合来的。这四门技术分别是HTML Imports、HTML templates、Custom Elements、Shadow DOM。</p><h2 id="web-components-的历史" tabindex="-1">Web Components 的历史 <a class="header-anchor" href="#web-components-的历史" aria-label="Permalink to &quot;Web Components 的历史&quot;">​</a></h2><p>其实 Web Components 并不是近几年才出现的规范。</p><p>最早在 2011 年的时候 Google 就推出了 Web Components 的概念，也算是前端发展的早期了。那时候前端还处于百废待兴的一个状态，前端甚至都没有「组件化」的概念，但是就是这个时候 Google 就已经凭明锐的嗅觉察觉到「组件化」是未来发展的趋势，所以提出了 Web Components 。不过在最开始时 Google 也只是提出了这样一个概念，并没有去实现它，所以并没有出现太大的浪花。</p><blockquote><p>2011 年 React 框架也诞生了。</p></blockquote><p>到了 2013 年，Google 浏览器和 Opera 浏览器联合推出 Web Components 规范的 v0 版本。这也算是 Web Components 最早的版本了。</p><blockquote><p>2013 年 React 框架开源。 2014 年 Vue 框架诞生，这里为什么要提到 Vue 框架了？因为 Vue 作者在创建 Vue 的时候大量参考了 Web Components 的语法。</p></blockquote><p>在 2016 年 2 月， Shadow DOM 和 Custom Element 被并入 DOM 标准规范里面，而不再作为独立的规范存在。</p><p>在 2017 年 Google I/O 上，Polymer 框架发布2.0 版本，而这次升级的最主要意义就是将 Shadow Dom 和 Custom Elements 升级到 v1 版本，从而获得更多浏览器支持下一 代 Web Components 规范。</p><p>然后在 2018 年，Shadow DOM 和 Custom Element v2 在 Chrome、Safari、三星浏览器上已经支持，还被 Firefox 列为要支持的特性。</p><p>所以 Web Components 并不是一个新的概念，它已经存在很长时间了，只是可能还没有全面的进入研发者的视野。</p><h2 id="html-imports" tabindex="-1">HTML Imports <a class="header-anchor" href="#html-imports" aria-label="Permalink to &quot;HTML Imports&quot;">​</a></h2><p>HTML Imports 已经被废弃，如果想正常使用 HTML Imports 代码查看效果，可以安装低版本浏览器。</p>',17),s=[p];function m(r,l,c,b,d,i){return o(),t("div",null,s)}const _=e(a,[["render",m]]);export{h as __pageData,_ as default};
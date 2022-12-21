import{_ as e,c as t,o as l,a}from"./app.9879908b.js";const n="/FE/framework/4.png",f=JSON.parse('{"title":"Nuxt","description":"","frontmatter":{},"headers":[{"level":2,"title":"Nuxt使用","slug":"nuxt使用","link":"#nuxt使用","children":[{"level":3,"title":"Nuxt.js的使用方式","slug":"nuxt-js的使用方式","link":"#nuxt-js的使用方式","children":[]},{"level":3,"title":"初始化Nuxt应用的方式","slug":"初始化nuxt应用的方式","link":"#初始化nuxt应用的方式","children":[]}]},{"level":2,"title":"核心原理","slug":"核心原理","link":"#核心原理","children":[]}],"relativePath":"framework/nuxt.md","lastUpdated":1671635276000}'),r={name:"framework/nuxt.md"},i=a('<h1 id="nuxt" tabindex="-1">Nuxt <a class="header-anchor" href="#nuxt" aria-hidden="true">#</a></h1><blockquote><p>地址：<a href="https://www.nuxtjs.cn/" target="_blank" rel="noreferrer">https://www.nuxtjs.cn/</a></p></blockquote><p>为什么要有Nuxt呢？我们都知道用SPA的时候会有以下两个缺点：</p><ul><li>不利于SEO：即不利于搜索引擎的优化，搜索引擎例如：百度、谷歌之类的，搜索引擎会爬取网页，对网页内容进行分析，做搜索排名。单页面的内容都是通过接口的方式获取，搜索引擎爬取网页的时候是没有任何内容的，当用户在浏览器搜索内容的时候，网站就不会出现在搜索的结果中。</li><li>首屏渲染时间长：单页应用提供的html是一个空壳，里面是没有内容的，当js加载完，通过接口的形式返回内容，然后再渲染页面。这样会导致页面白屏时间会长一些，</li></ul><p>针对以上这两个目前有相对应的方案，对于SEO使用服务端渲染SSR，对于首屏渲染时间长可以进行预渲染Prerendering。</p><ul><li>预渲染Prerendering适合静态站点</li><li>SSR比较适合动态渲染，但是配置繁琐</li></ul><p>针对以上的问题，Nuxt帮助解决了这样的问题：</p><ul><li>静态站点</li><li>动态渲染</li><li>简化配置</li></ul><h2 id="nuxt使用" tabindex="-1">Nuxt使用 <a class="header-anchor" href="#nuxt使用" aria-hidden="true">#</a></h2><h3 id="nuxt-js的使用方式" tabindex="-1">Nuxt.js的使用方式 <a class="header-anchor" href="#nuxt-js的使用方式" aria-hidden="true">#</a></h3><p>它的使用方式有三种</p><ul><li>初始化一个全新的项目来开发同构渲染应用</li><li>在已有的Node.js服务端项目中来使用Nuxt，直接把Nuxt当做一个中间件集成到Node Web Server中</li><li>在现有的Vue.js项目中使用</li></ul><h3 id="初始化nuxt应用的方式" tabindex="-1">初始化Nuxt应用的方式 <a class="header-anchor" href="#初始化nuxt应用的方式" aria-hidden="true">#</a></h3><p>按照<a href="https://www.nuxtjs.cn/guide/installation" target="_blank" rel="noreferrer">官方文档</a>提供的两种方式：</p><ul><li>使用 create-nuxt-app 脚手架工具</li><li>手动创建</li></ul><h2 id="核心原理" tabindex="-1">核心原理 <a class="header-anchor" href="#核心原理" aria-hidden="true">#</a></h2><p>从图中可以看出在Vue打包的时候提供了两个入口文件，一个是供服务端使用的，一个是供客户端使用的。服务端的入口文件主要是返回新创建的Vue实例，客户端的入口文件则是将Vue实例挂载到dom元素上，平时开发的都是使用客户端的入口文件。webpack打包后会生成两个bundle文件，服务器会根据请求在Node层生成预渲染的html文件返回给请求的客户端完成初始的渲染。虽然页面中有初始的内容像按钮之类的，但是不可用，这时候需要客户端的bundle文件进行混合才能够使用。 <img src="'+n+'" alt="flow"></p>',17),u=[i];function s(d,h,o,c,x,p){return l(),t("div",null,u)}const N=e(r,[["render",s]]);export{f as __pageData,N as default};

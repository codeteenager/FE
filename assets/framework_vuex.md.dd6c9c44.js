import{_ as s,c as n,o as a,a as l}from"./app.c7d605d1.js";const e="/FE/framework/1.png",p="/FE/framework/2.png",o="/FE/framework/6.png",A=JSON.parse('{"title":"Vuex","description":"","frontmatter":{},"headers":[{"level":2,"title":"组件间通信方式","slug":"组件间通信方式","link":"#组件间通信方式","children":[{"level":3,"title":"父组件给子组件传值","slug":"父组件给子组件传值","link":"#父组件给子组件传值","children":[]},{"level":3,"title":"子组件给父组件传值 (Event Up)","slug":"子组件给父组件传值-event-up","link":"#子组件给父组件传值-event-up","children":[]},{"level":3,"title":"不相关组件传值 Event Bus","slug":"不相关组件传值-event-bus","link":"#不相关组件传值-event-bus","children":[]}]},{"level":2,"title":"核心概念","slug":"核心概念","link":"#核心概念","children":[]},{"level":2,"title":"底层原理","slug":"底层原理","link":"#底层原理","children":[]},{"level":2,"title":"最佳实践","slug":"最佳实践","link":"#最佳实践","children":[]}],"relativePath":"framework/vuex.md","lastUpdated":1671372161000}'),t={name:"framework/vuex.md"},r=l('<h1 id="vuex" tabindex="-1">Vuex <a class="header-anchor" href="#vuex" aria-hidden="true">#</a></h1><blockquote><p>Vuex官网地址：<a href="https://vuex.vuejs.org/zh/" target="_blank" rel="noreferrer">https://vuex.vuejs.org/zh/</a></p></blockquote><p>在官网上对Vuex有一个说明，Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式 + 库。</p><p>这个状态管理主要包含以下三个部分：</p><ul><li>状态，驱动应用的数据源；</li><li>视图，以声明方式将状态映射到视图；</li><li>操作，响应在视图上的用户输入导致的状态变化。</li></ul><p><img src="'+e+'" alt=""></p><p>从图中可以看到整个系统的运行是一个单向的，我们的数据驱动视图的更新，用户在视图上进行一些操作，然后触发action，通过action的方式去更改state，而不是视图直接更改state，</p><p>然后看一下Vuex的运行机制，它不和组件进行强关联，可以独立的提供响应式数据。在图中可以看到Vuex提供的state数据驱动Vue Components视图，视图通过Dispatch派发action，我们在action中可以进行一些异步的操作，比如通过ajax请求接口获取后端数据，然后通过commit方式提交到Mutation，然后由mutation最终更改state。那么为什么要经过一层mutation呢？主要是为了在Devtools中记录数据的变化，这样我们可以通过插件来调试。所以说mutation是一个纯同步的操作，如果你有异步的操作需要在action中处理。如果没有异步的操作，可以从组件直接commit到mutation的。</p><p><img src="'+p+'" alt=""></p><h2 id="组件间通信方式" tabindex="-1">组件间通信方式 <a class="header-anchor" href="#组件间通信方式" aria-hidden="true">#</a></h2><p>大多数场景下的组件都并不是独立存在的，而是相互协作共同构成了一个复杂的业务功能。在 Vue 中为 不同的组件关系提供了不同的通信规则。</p><p>常见组件间通信方式分为三类：</p><ul><li>父组件给子组件传值</li><li>子组件给父组件传值</li><li>不相关组件之间传值</li></ul><p><img src="'+o+`" alt=""></p><h3 id="父组件给子组件传值" tabindex="-1"><a href="https://cn.vuejs.org/v2/guide/components.html#%E9%80%9A%E8%BF%87-Prop-%E5%90%91%E5%AD%90%E7%BB%84%E4%BB%B6%E4%BC%A0%E9%80%92%E6%95%B0%E6%8D%AE" target="_blank" rel="noreferrer">父组件给子组件传值</a> <a class="header-anchor" href="#父组件给子组件传值" aria-hidden="true">#</a></h3><p>子组件中通过props接收数据，父组件中给子组件通过相应属性传值。</p><div class="language-html line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">blog-post</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">title</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">My journey with Vue</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">blog-post</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">Vue</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">component</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">blog-post</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">props</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">title</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">&lt;h3&gt;{{ title }}&lt;/h3&gt;</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="子组件给父组件传值-event-up" tabindex="-1"><a href="https://cn.vuejs.org/v2/guide/components.html#%E7%9B%91%E5%90%AC%E5%AD%90%E7%BB%84%E4%BB%B6%E4%BA%8B%E4%BB%B6" target="_blank" rel="noreferrer">子组件给父组件传值 (Event Up)</a> <a class="header-anchor" href="#子组件给父组件传值-event-up" aria-hidden="true">#</a></h3><p>在子组件中使用 $emit 发布一个自定义事件：</p><div class="language-html line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-on:click</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">$emit(&#39;enlargeText&#39;, 0.1)</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">Enlarge text</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>在使用这个组件的时候，使用 v-on 监听这个自定义事件</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">blog-post</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-on</span><span style="color:#89DDFF;">:</span><span style="color:#C792EA;">enlargeText</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">hFontSize += $event</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#FFCB6B;">blog-post</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="不相关组件传值-event-bus" tabindex="-1"><a href="https://v2.cn.vuejs.org/v2/guide/migration.html#dispatch-%E5%92%8C-broadcast-%E6%9B%BF%E6%8D%A2" target="_blank" rel="noreferrer">不相关组件传值 Event Bus</a> <a class="header-anchor" href="#不相关组件传值-event-bus" aria-hidden="true">#</a></h3><p>我们可以使用一个非常简单的 Event Bus 来解决这个问题：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">//eventbus.js</span></span>
<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Vue</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>然后在需要通信的两端： 使用 $on 订阅：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">// 没有参数</span></span>
<span class="line"><span style="color:#A6ACCD;">bus</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">$on</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">自定义事件名称</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#676E95;">// 执行操作</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#676E95;">// 有参数</span></span>
<span class="line"><span style="color:#A6ACCD;">bus</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">$on</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">自定义事件名称</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">data</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#676E95;">// 执行操作</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>使用 $emit 发布：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">// 没有自定义传参</span></span>
<span class="line"><span style="color:#A6ACCD;">bus</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">$emit</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">自定义事件名称</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;">// 有自定义传参</span></span>
<span class="line"><span style="color:#A6ACCD;">bus</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">$emit</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">自定义事件名称</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> 数据)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>除了上述常见的传值之外，还有其他常见的方式：</p><ul><li>$root</li><li>$parent</li><li>$children</li><li>$refs</li></ul><p>通过这些相关的属性获取父子组件，调用组件上对应的成员，实现组件间的通信。只是这些都是不被推荐的使用方式，只有当项目非常小，或者开发自定义组件时才会使用。如果是大型项目还是推荐使用vuex来管理状态。</p><h2 id="核心概念" tabindex="-1">核心概念 <a class="header-anchor" href="#核心概念" aria-hidden="true">#</a></h2><p>核心概念共分为以下五个部分：</p><ul><li>State：<a href="http://this.$store.state.xxx" target="_blank" rel="noreferrer">this.$store.state.xxx</a> 取值</li><li>Getter：<a href="http://this.$store.getters.xxx" target="_blank" rel="noreferrer">this.$store.getters.xxx</a> 取值，有一个缓存的效果</li><li>Mutation：this.$store.commit(&quot;xxx&quot;) 赋值</li><li>Action：this.$store.dispatch(&quot;xxx&quot;) 赋值，经过commit</li><li>Module</li></ul><h2 id="底层原理" tabindex="-1">底层原理 <a class="header-anchor" href="#底层原理" aria-hidden="true">#</a></h2><ul><li>State：最核心的提供了一个响应式数据</li><li>Getter：借助Vue的计算属性computed来实现缓存</li><li>Mutation：更改state方法</li><li>Action：触发mutation方法</li><li>Module：Vue.set动态添加state到响应式数据中</li></ul><h2 id="最佳实践" tabindex="-1">最佳实践 <a class="header-anchor" href="#最佳实践" aria-hidden="true">#</a></h2><h4 id="使用常量替代mutation事件类型" tabindex="-1">使用常量替代Mutation事件类型 <a class="header-anchor" href="#使用常量替代mutation事件类型" aria-hidden="true">#</a></h4><p>通过使用常量来替代Mutation事件类型，这样可以把事件类型单独放在一个文件中，使用起来很方便，有助于团队协作。</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">//mutation-types.js</span></span>
<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> SOME_MUTATION </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">SOME_MUTATION</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">//store.js</span></span>
<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> Vuex </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vuex</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;">SOME_MUTATION</span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./mutation-types</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> store </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> Vuex</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Store</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">state</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{...},</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">mutations</span><span style="color:#89DDFF;">:{</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;">//计算属性命名功能：使用一个常量作为函数名</span></span>
<span class="line"><span style="color:#A6ACCD;">        [SOME_MUTATION]</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">state</span><span style="color:#89DDFF;">){</span></span>
<span class="line"><span style="color:#89DDFF;">            </span><span style="color:#676E95;">//mutate state</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h4 id="开启命名空间" tabindex="-1">开启命名空间 <a class="header-anchor" href="#开启命名空间" aria-hidden="true">#</a></h4><p>随着项目的扩大，我们有很多的状态需要管理，这里建议对所有的模块开始命名空间namespaced:true，嵌套模块不要太深，尽量扁平化，灵活应用createNamespacedHelpers。</p>`,45),c=[r];function i(D,F,y,u,d,C){return a(),n("div",null,c)}const m=s(t,[["render",i]]);export{A as __pageData,m as default};

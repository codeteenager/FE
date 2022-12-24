import{_ as s,c as a,o as l,a as e}from"./app.73463a62.js";const F=JSON.parse('{"title":"vue-loader","description":"","frontmatter":{},"headers":[{"level":2,"title":"webpack loader执行流程","slug":"webpack-loader执行流程","link":"#webpack-loader执行流程","children":[]},{"level":2,"title":"loader循环解析","slug":"loader循环解析","link":"#loader循环解析","children":[]},{"level":2,"title":"手动干预loader执行","slug":"手动干预loader执行","link":"#手动干预loader执行","children":[]},{"level":2,"title":"VueLoaderPlugin","slug":"vueloaderplugin","link":"#vueloaderplugin","children":[]},{"level":2,"title":"相关参考","slug":"相关参考","link":"#相关参考","children":[]}],"relativePath":"framework/vue-loader.md","lastUpdated":1671902193000}'),n={name:"framework/vue-loader.md"},p=e(`<h1 id="vue-loader" tabindex="-1">vue-loader <a class="header-anchor" href="#vue-loader" aria-hidden="true">#</a></h1><p>我们都知道loader是webpack最为复杂的部分，vue-loader又是应用了各种loader的高级特性，所以它更加复杂。为了理解vue-loader的源码，我们首先需要理解以下知识点：</p><ul><li>webpack loader执行流程</li><li>loader循环解析</li><li>手动干预loader执行</li></ul><h2 id="webpack-loader执行流程" tabindex="-1">webpack loader执行流程 <a class="header-anchor" href="#webpack-loader执行流程" aria-hidden="true">#</a></h2><p>在webpack中loader的执行流程是从右向左被调用的，有些情况下，loader 只关心 request 后面的 元数据(metadata)，并且忽略前一个 loader 的结果。在实际（从右到左）执行 loader 之前，会先 从左到右 调用 loader 上的 pitch 方法，这就是Pitching Loader。</p><h2 id="loader循环解析" tabindex="-1">loader循环解析 <a class="header-anchor" href="#loader循环解析" aria-hidden="true">#</a></h2><p>我们都知道vue模板文件是下面这样的格式</p><div class="language-vue line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">111</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">data</span><span style="color:#89DDFF;">(){</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">                value</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">style</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">lang</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">css</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>那么这样的vue模板文件是如何在浏览器中运行起来的呢？这就涉及到将源码进行转换，不知转换一次，而是转换多次。具体它是怎么转换的呢？ 首先他要将template部分其变成<code>import &#39;./App.vue?vue&amp;type=template&amp;id=123456&#39;</code>这样的import结构，然后webpack会对其重新解析，相当于产生了一个新的依赖，每个模块依赖会进行build，编译的话又会找到App.vue，这就是循环编译的概念。</p><p>在vue中会把.vue文件拆分成新的import，然后loader会重新执行一轮。</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./App.vue?vue&amp;type=template</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./App.vue?vue&amp;type=script</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./App.vue?vue&amp;type=style&amp;id=1</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./App.vue?vue&amp;type=style&amp;id=2</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="手动干预loader执行" tabindex="-1">手动干预loader执行 <a class="header-anchor" href="#手动干预loader执行" aria-hidden="true">#</a></h2><p>在我们拆分成import新的模块之后，我们可以决定这个模块的loader该如何执行。例如我们把vue模板拆分成一个一个的import，它仍然把所有的loader执行了一遍，是因为遵循了我们webpack的配置。那么我们如何去干预loader的执行呢，webpack提供了这样的能力。首先在import导入模块前加入-!，加上之后所有的loader都不会执行，如果想要执行则加上loader的路径。</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">-!./App.vue?vue&amp;type=template</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">-!loader2.js!./App.vue?vue&amp;type=template</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="vueloaderplugin" tabindex="-1">VueLoaderPlugin <a class="header-anchor" href="#vueloaderplugin" aria-hidden="true">#</a></h2><p>vue-loader分为两部分，vue-loader-plugin和vue-loader，vue-loader-plugin会在webpack执行过程中运行，在执行过程中的compilation也就是编译阶段做一些事情。插件执行完后就会在loader阶段执行vue-loader核心源码。</p><h2 id="相关参考" tabindex="-1">相关参考 <a class="header-anchor" href="#相关参考" aria-hidden="true">#</a></h2><ul><li><a href="https://github.com/xixizhangfe/vue-loader" target="_blank" rel="noreferrer">https://github.com/xixizhangfe/vue-loader</a></li></ul>`,18),o=[p];function r(t,c,i,d,u,D){return l(),a("div",null,o)}const b=s(n,[["render",r]]);export{F as __pageData,b as default};

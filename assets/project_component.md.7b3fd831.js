import{_ as s,c as n,o as a,a as l}from"./app.f11a0a52.js";const o="/FE/project/64.png",p="/FE/project/65.png",A=JSON.parse('{"title":"组件化开发","description":"","frontmatter":{},"headers":[{"level":2,"title":"处理组件边界情况","slug":"处理组件边界情况","link":"#处理组件边界情况","children":[]},{"level":2,"title":"Storybook","slug":"storybook","link":"#storybook","children":[{"level":3,"title":"Storybook安装","slug":"storybook安装","link":"#storybook安装","children":[]}]}],"relativePath":"project/component.md","lastUpdated":1672219679000}'),e={name:"project/component.md"},r=l(`<h1 id="组件化开发" tabindex="-1">组件化开发 <a class="header-anchor" href="#组件化开发" aria-hidden="true">#</a></h1><p>我们平时开发业务系统的时候，可能只关注如何把功能实现，并没有把精力关注在代码或组件在最大程度上可以被重用，这样导致每次开发不同项目的时候都会有不同程度重复性的工作。而一些持续运营的项目，或者一些业务相似的项目在开发过程中，为了提高开发效率，避免重复工作，可能会有专人来开发相应的组件库。很多的开源组件库都是为了提高公司内部的开发效率，在公司内部孵化出来的，比如我们常用的Element-UI就是饿了么内部使用的、以及iView是其公司内部创新的产物，最终都开源被更多人使用。实际在公司内部也会有满足自己业务需求的组件库。</p><p>其实还有一种组件优先的开发方式叫做CDD(Component-Driven Development)组件驱动开发。</p><ul><li>是一种自下而上构建UI的过程</li><li>从组件级别开始，到页面级别结束。也就是先从相对完善的设计中抽象出组件，先隔离开发组件，然后再开发页面。</li></ul><p>使用CDD开发的好处主要有：</p><ul><li>可以让组件在最大程度被重用</li><li>并行开发，对单个组件的开发使用CDD可以让你页面级开发无法实现的方式在不同团队间共享任务，这个任务就是开发相对隔离的组件。</li><li>可视化测试，通过一些工具可以直接浏览我们的组件，而不需要到业务系统中测试组件，可以对组件的不同状态进行测试。</li></ul><h2 id="处理组件边界情况" tabindex="-1">处理组件边界情况 <a class="header-anchor" href="#处理组件边界情况" aria-hidden="true">#</a></h2><p>在开发组件前先回顾vue文档中处理组件边界情况的api。</p><ul><li>$root，通过$root访问到vue的根实例，操作根实例中的成员。只有在小型的少量组件的应用中会在根实例存储共享数据，这样很方便。但是在大型应用还是推荐使用Vuex管理应用的状态。</li><li>$parent/$children</li><li>$refs</li><li>依赖注入provide/inject</li></ul><h2 id="storybook" tabindex="-1">Storybook <a class="header-anchor" href="#storybook" aria-hidden="true">#</a></h2><p><a href="https://storybook.js.org/docs/react/get-started/introduction" target="_blank" rel="noreferrer">Storybook</a>翻译过来是故事书，我们可以把每个组件想象成一个故事，Storybook就好像在讲一个一个的故事。Storybook是一个可视化的组件展示平台，可以使用Storybook在独立的环境中创建组件，在隔离的开发环境中，以交互式的方式展示组件。Storybook在主程序之外运行，因此用户可以独立开发组件库，而不必担心应用程序特定的依赖关系，也就是它把程序的开发和组件的开发分离，在Storybook中开发组件并预览测试。组件开发完毕可以直接在主程序中或者让其他人使用我们开发好的组件。Storybook支持非常多的框架，它可以开发下面这些框架的组件，例如：</p><ul><li>React、React Native、Vue、Angular</li><li>Ember、HTML、Svelte、Mithril、Riot</li></ul><p>另外，Storybook还支持很多插件，提供灵活的api，可以根据需要自定义Storybook，还可以构建Storybook的静态版本，并将其部署到HTTP服务器。</p><h3 id="storybook安装" tabindex="-1">Storybook安装 <a class="header-anchor" href="#storybook安装" aria-hidden="true">#</a></h3><p>自动安装方式：</p><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">npx</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-p</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">@storybook/cli</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">sb</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">init</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--type</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">vue</span></span>
<span class="line"><span style="color:#FFCB6B;">yarn</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">add</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">vue</span></span>
<span class="line"><span style="color:#FFCB6B;">yarn</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">add</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">vue-loader</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">vue-template-compiler</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--dev</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>整体目录结构如下： <img src="`+o+`" alt=""> 看一下package.json的scripts命令</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">scripts</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">: </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">storybook</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">start-storybook -p 6006</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">build-storybook</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">build-storybook</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>storybook命令为启动storybook，build-storybook命令用来打包生成静态网站。</p><p>.storybook中main.js相当于是storybook的配置文件，这里设置了storybook的路径stories，storybook就是stories的集合，stories就是用来创建界面上呈现的内容。addons是插件，actions是用来快速注册事件的，links是用来设置链接。</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">//.storybook/main.js</span></span>
<span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">stories</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">../stories/**/*.stories.mdx</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">../stories/**/*.stories.@(js|jsx|ts|tsx)</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  ]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">addons</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@storybook/addon-links</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@storybook/addon-essentials</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@storybook/addon-interactions</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  ]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">framework</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@storybook/vue</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>stories中有Butoon、Header组件，stories引用对应的组件并呈现到界面上。 <img src="`+p+`" alt=""></p><p>export default导出的组件，title就是界面上对应的大组，</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">//stories/Button.stories.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">title</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Example/Button</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">component</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> MyButton</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// More on argTypes: https://storybook.js.org/docs/vue/api/argtypes</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">argTypes</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">backgroundColor</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">control</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">color</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">size</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">control</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">select</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">options</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">small</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">medium</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">large</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>export const是一些函数也就是导出一个个的故事</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> Secondary </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> Template</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">bind</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">Secondary</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">args </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">label</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Button</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>我们在这个项目中可以先开发组件，等组件开发完成后，我们就可以写stories来查看组件渲染的结果。</p>`,27),t=[r];function c(D,y,i,F,C,b){return a(),n("div",null,t)}const d=s(e,[["render",c]]);export{A as __pageData,d as default};

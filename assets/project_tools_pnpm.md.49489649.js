import{_ as s,o as a,c as n,Q as p}from"./chunks/framework.ea1f6e24.js";const h=JSON.parse('{"title":"pnpm","description":"","frontmatter":{},"headers":[],"relativePath":"project/tools/pnpm.md","filePath":"project/tools/pnpm.md","lastUpdated":1683265897000}'),l={name:"project/tools/pnpm.md"},e=p(`<h1 id="pnpm" tabindex="-1">pnpm <a class="header-anchor" href="#pnpm" aria-label="Permalink to &quot;pnpm&quot;">​</a></h1><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>地址为：<a href="https://pnpm.io/" target="_blank" rel="noreferrer">https://pnpm.io/</a></p></div><p>pnpm 是新一代的包管理工具，号称是最先进的包管理器。按照官网说法，可以实现节约磁盘空间并提升安装速度和创建非扁平化的 node_modules 文件夹两大目标，具体原理可以参考 <a href="https://pnpm.io/zh/motivation" target="_blank" rel="noreferrer">pnpm 官网</a>。</p><p>pnpm 提出了 workspace 的概念，内置了对 monorepo 的支持，那么为什么要用 pnpm 取代之前的 lerna 呢？</p><ul><li>lerna 已经不再维护，后续有任何问题社区无法及时响应</li><li>pnpm装包效率更高，并且可以节约更多磁盘空间</li><li>pnpm本身就预置了对monorepo的支持，不需要再额外第三方包的支持</li></ul><h2 id="monorepo工程的搭建" tabindex="-1">monorepo工程的搭建 <a class="header-anchor" href="#monorepo工程的搭建" aria-label="Permalink to &quot;monorepo工程的搭建&quot;">​</a></h2><p>首先需要安装pnpm</p><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">npm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-g</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pnpm</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">npm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-g</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pnpm</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>然后创建工程基本结构，先通过npm init初始化，然后在工程根目录下创建packages目录，在packages目录中创建子包core和web-sdk，在core和web-sdk再分别去使用npm init初始化工程，使用tsc --init去创建ts.config.js。</p><p>为了防止根目录被发布出去，需要设置工程工程个目录下 package.json配置文件的 private 字段为 true。</p><p>使用pnpm的workspace功能，需要在工程根目录下添加pnpm-workspace.yaml文件，并且在pnpm-workspace.yaml中指定空间的目录。</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">packages</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;packages/*&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">packages</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;packages/*&#39;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>workspace 中的包版本管理是一个复杂的任务，pnpm 目前也并未提供内置的解决方案。 不过，有两个不错且支持 pnpm 的版本控制工具可以使用：</p><ul><li><a href="https://github.com/changesets/changesets" target="_blank" rel="noreferrer">changesets</a></li><li><a href="https://rushjs.io/" target="_blank" rel="noreferrer">Rush</a></li></ul><p>这里使用changesets进行包管理。</p><ol><li>安装</li></ol><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">pnpm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-Dw</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">@changesets/cli</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">pnpm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">add</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-Dw</span><span style="color:#24292E;"> </span><span style="color:#032F62;">@changesets/cli</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ol start="2"><li>初始化changesets</li></ol><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">pnpm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">changeset</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">init</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">pnpm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">changeset</span><span style="color:#24292E;"> </span><span style="color:#032F62;">init</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>执行完初始化命令后，会在工程的根目录下生成 .changeset 目录，其中的 config.json 作为默认的 changeset 的配置文件。配置文件内容如下：</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;$schema&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;https://unpkg.com/@changesets/config@2.3.0/schema.json&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;changelog&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;@changesets/cli/changelog&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;commit&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;fixed&quot;</span><span style="color:#E1E4E8;">: [],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;linked&quot;</span><span style="color:#E1E4E8;">: [],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;access&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;restricted&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;baseBranch&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;main&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;updateInternalDependencies&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;patch&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;ignore&quot;</span><span style="color:#E1E4E8;">: []</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;$schema&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;https://unpkg.com/@changesets/config@2.3.0/schema.json&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;changelog&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;@changesets/cli/changelog&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;commit&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;fixed&quot;</span><span style="color:#24292E;">: [],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;linked&quot;</span><span style="color:#24292E;">: [],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;access&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;restricted&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;baseBranch&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;main&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;updateInternalDependencies&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;patch&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;ignore&quot;</span><span style="color:#24292E;">: []</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><ul><li>changelog: changelog 生成方式</li><li>commit: 不要让 changeset 在 publish 的时候帮我们做 git add</li><li>linked: 配置哪些包要共享版本</li><li>access: 公私有安全设定，内网建议 restricted ，开源使用 public</li><li>baseBranch: 项目主分支</li><li>updateInternalDependencies: 确保某包依赖的包发生 upgrade，该包也要发生 version upgrade 的衡量单位（量级）</li><li>ignore: 不需要变动 version 的包</li><li>___experimentalUnsafeOptions_WILL_CHANGE_IN_PATCH: 在每次 version 变动时一定无理由 patch 抬升依赖他的那些包的版本，防止陷入 major 优先的未更新问题</li></ul><p>初始化完毕后的工程目录结构如下：</p><h2 id="相关文章" tabindex="-1">相关文章 <a class="header-anchor" href="#相关文章" aria-label="Permalink to &quot;相关文章&quot;">​</a></h2><ul><li><a href="https://juejin.cn/post/6969450118839795749" target="_blank" rel="noreferrer">关于现代包管理器的深度思考——为什么现在我更推荐 pnpm 而不是 npm/yarn?</a></li></ul>`,25),o=[e];function t(c,r,i,E,u,y){return a(),n("div",null,o)}const m=s(l,[["render",t]]);export{h as __pageData,m as default};

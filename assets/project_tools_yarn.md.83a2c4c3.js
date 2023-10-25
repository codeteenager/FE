import{_ as s,o as a,c as n,Q as p}from"./chunks/framework.ea1f6e24.js";const l="/FE/project/79.png",e="/FE/project/80.png",o="/FE/project/81.png",c="/FE/project/82.png",r="/FE/project/83.png",k=JSON.parse('{"title":"Yarn","description":"","frontmatter":{},"headers":[],"relativePath":"project/tools/yarn.md","filePath":"project/tools/yarn.md","lastUpdated":1683265897000}'),t={name:"project/tools/yarn.md"},i=p(`<h1 id="yarn" tabindex="-1">Yarn <a class="header-anchor" href="#yarn" aria-label="Permalink to &quot;Yarn&quot;">​</a></h1><p>Yarn 是一个由 Facebook、Google、Exponent 和 Tilde 构建的新的 JavaScript 包管理器。它的出现是为了解决历史上 npm 的某些不足（比如 npm 对于依赖的完整性和一致性保障，以及 npm 安装速度过慢的问题等），虽然 npm 目前经过版本迭代汲取了 Yarn 一些优势特点（比如一致性安装校验算法等），但我们依然有必要关注 Yarn 的思想和理念。</p><p>当 npm 还处在 v3 时期时，一个叫作 Yarn 的包管理方案横空出世。2016 年，npm 还没有 package-lock.json 文件，安装速度很慢，稳定性也较差，而 Yarn 的理念很好地解决了以下问题。</p><ul><li>确定性：通过 yarn.lock 等机制，保证了确定性。即不管安装顺序如何，相同的依赖关系在任何机器和环境下，都可以以相同的方式被安装。（在 npm v5 之前，没有 package-lock.json 机制，只有默认并不会使用的<a href="https://docs.npmjs.com/cli/shrinkwrap" target="_blank" rel="noreferrer">npm-shrinkwrap.json</a>。）</li><li>采用模块扁平安装模式：将依赖包的不同版本，按照一定策略，归结为单个版本，以避免创建多个副本造成冗余（npm 目前也有相同的优化）。</li><li>网络性能更好：Yarn 采用了请求排队的理念，类似并发连接池，能够更好地利用网络资源；同时引入了更好的安装失败时的重试机制。</li><li>采用缓存机制，实现了离线模式（npm 目前也有类似实现）。</li></ul><p>我们先来看看 yarn.lock 结构：</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">&quot;@babel/cli@^7.1.6&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;@babel/cli@^7.5.5&quot;</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  version </span><span style="color:#9ECBFF;">&quot;7.8.4&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  resolved </span><span style="color:#9ECBFF;">&quot;http://npm.in.zhihu.com/@babel%2fcli/-/cli-7.8.4.tgz#505fb053721a98777b2b175323ea4f090b7d3c1c&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  integrity sha1</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">UF</span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">wU3IamHd7KxdTI</span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">pPCQt9PBw</span><span style="color:#F97583;">=</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">dependencies</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    commander </span><span style="color:#9ECBFF;">&quot;^4.0.1&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    convert</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">source</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">map </span><span style="color:#9ECBFF;">&quot;^1.1.0&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    fs</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">readdir</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">recursive </span><span style="color:#9ECBFF;">&quot;^1.1.0&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    glob </span><span style="color:#9ECBFF;">&quot;^7.0.0&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    lodash </span><span style="color:#9ECBFF;">&quot;^4.17.13&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    make</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">dir </span><span style="color:#9ECBFF;">&quot;^2.1.0&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    slash </span><span style="color:#9ECBFF;">&quot;^2.0.0&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    source</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">map </span><span style="color:#9ECBFF;">&quot;^0.5.0&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">optionalDependencies</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    chokidar </span><span style="color:#9ECBFF;">&quot;^2.1.8&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">&quot;@babel/cli@^7.1.6&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;@babel/cli@^7.5.5&quot;</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  version </span><span style="color:#032F62;">&quot;7.8.4&quot;</span></span>
<span class="line"><span style="color:#24292E;">  resolved </span><span style="color:#032F62;">&quot;http://npm.in.zhihu.com/@babel%2fcli/-/cli-7.8.4.tgz#505fb053721a98777b2b175323ea4f090b7d3c1c&quot;</span></span>
<span class="line"><span style="color:#24292E;">  integrity sha1</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">UF</span><span style="color:#D73A49;">+</span><span style="color:#24292E;">wU3IamHd7KxdTI</span><span style="color:#D73A49;">+</span><span style="color:#24292E;">pPCQt9PBw</span><span style="color:#D73A49;">=</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">dependencies</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    commander </span><span style="color:#032F62;">&quot;^4.0.1&quot;</span></span>
<span class="line"><span style="color:#24292E;">    convert</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">source</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">map </span><span style="color:#032F62;">&quot;^1.1.0&quot;</span></span>
<span class="line"><span style="color:#24292E;">    fs</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">readdir</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">recursive </span><span style="color:#032F62;">&quot;^1.1.0&quot;</span></span>
<span class="line"><span style="color:#24292E;">    glob </span><span style="color:#032F62;">&quot;^7.0.0&quot;</span></span>
<span class="line"><span style="color:#24292E;">    lodash </span><span style="color:#032F62;">&quot;^4.17.13&quot;</span></span>
<span class="line"><span style="color:#24292E;">    make</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">dir </span><span style="color:#032F62;">&quot;^2.1.0&quot;</span></span>
<span class="line"><span style="color:#24292E;">    slash </span><span style="color:#032F62;">&quot;^2.0.0&quot;</span></span>
<span class="line"><span style="color:#24292E;">    source</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">map </span><span style="color:#032F62;">&quot;^0.5.0&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">optionalDependencies</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    chokidar </span><span style="color:#032F62;">&quot;^2.1.8&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>该结构整体和 package-lock.json 结构类似，只不过 yarn.lock 并没有使用 JSON 格式，而是采用了一种自定义的标记格式，新的格式仍然保持了较高的可读性。</p><p>相比 npm，Yarn 另外一个显著区别是 yarn.lock 中子依赖的版本号不是固定版本。这就说明单独一个 yarn.lock 确定不了 node_modules 目录结构，还需要和 package.json 文件进行配合。</p><p>其实，不管是 npm 还是 Yarn，说到底它们都是一个包管理工具，在项目中如果想进行 npm/Yarn 切换，并不是一件麻烦的事情。甚至还有一个专门的 <a href="https://github.com/imsnif/synp" target="_blank" rel="noreferrer">synp</a> 工具，它可以将 yarn.lock 转换为 package-lock.json，反之亦然。</p><p>关于 Yarn 缓存，我们可以通过这个命令查看缓存目录，并通过目录查看缓存内容：</p><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">yarn</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">cache</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">dir</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">yarn</span><span style="color:#24292E;"> </span><span style="color:#032F62;">cache</span><span style="color:#24292E;"> </span><span style="color:#032F62;">dir</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><img src="`+l+`" alt=""></p><p>值得一提的是，Yarn 默认使用 prefer-online 模式，即优先使用网络数据。如果网络数据请求失败，再去请求缓存数据。</p><p>最后，我们来看一看一些区别于 npm，Yarn 所独有的命令：</p><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">yarn</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">import</span></span>
<span class="line"><span style="color:#B392F0;">yarn</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">licenses</span></span>
<span class="line"><span style="color:#B392F0;">yarn</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pack</span></span>
<span class="line"><span style="color:#B392F0;">yarn</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">why</span></span>
<span class="line"><span style="color:#B392F0;">yarn</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">autoclean</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">yarn</span><span style="color:#24292E;"> </span><span style="color:#032F62;">import</span></span>
<span class="line"><span style="color:#6F42C1;">yarn</span><span style="color:#24292E;"> </span><span style="color:#032F62;">licenses</span></span>
<span class="line"><span style="color:#6F42C1;">yarn</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pack</span></span>
<span class="line"><span style="color:#6F42C1;">yarn</span><span style="color:#24292E;"> </span><span style="color:#032F62;">why</span></span>
<span class="line"><span style="color:#6F42C1;">yarn</span><span style="color:#24292E;"> </span><span style="color:#032F62;">autoclean</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>npm 独有的命令是：npm rebuild。</p><h2 id="yarn-安装机制和背后思想" tabindex="-1">Yarn 安装机制和背后思想 <a class="header-anchor" href="#yarn-安装机制和背后思想" aria-label="Permalink to &quot;Yarn 安装机制和背后思想&quot;">​</a></h2><p>Yarn 的安装过程主要有以下 5 大步骤：</p><p>检测（checking）→ 解析包（Resolving Packages） → 获取包（Fetching Packages）→ 链接包（Linking Packages）→ 构建包（Building Packages）</p><p><img src="`+e+'" alt=""></p><h3 id="检测包-checking" tabindex="-1">检测包（checking） <a class="header-anchor" href="#检测包-checking" aria-label="Permalink to &quot;检测包（checking）&quot;">​</a></h3><p>这一步主要是检测项目中是否存在一些 npm 相关文件，比如 package-lock.json 等。如果有，会提示用户注意：这些文件的存在可能会导致冲突。在这一步骤中，也会检查系统 OS、CPU 等信息。</p><h3 id="解析包-resolving-packages" tabindex="-1">解析包（Resolving Packages） <a class="header-anchor" href="#解析包-resolving-packages" aria-label="Permalink to &quot;解析包（Resolving Packages）&quot;">​</a></h3><p>这一步会解析依赖树中每一个包的版本信息。</p><p>首先获取当前项目中 package.json 定义的 dependencies、devDependencies、optionalDependencies 的内容，这属于首层依赖。</p><p>接着采用遍历首层依赖的方式获取依赖包的版本信息，以及递归查找每个依赖下嵌套依赖的版本信息，并将解析过和正在解析的包用一个 Set 数据结构来存储，这样就能保证同一个版本范围内的包不会被重复解析。</p><ul><li>对于没有解析过的包 A，首次尝试从 yarn.lock 中获取到版本信息，并标记为已解析；</li><li>如果在 yarn.lock 中没有找到包 A，则向 Registry 发起请求获取满足版本范围的已知最高版本的包信息，获取后将当前包标记为已解析。</li></ul><p>总之，在经过解析包这一步之后，我们就确定了所有依赖的具体版本信息以及下载地址。</p><p><img src="'+o+'" alt=""></p><h3 id="获取包-fetching-packages" tabindex="-1">获取包（Fetching Packages） <a class="header-anchor" href="#获取包-fetching-packages" aria-label="Permalink to &quot;获取包（Fetching Packages）&quot;">​</a></h3><p>这一步我们首先需要检查缓存中是否存在当前的依赖包，同时将缓存中不存在的依赖包下载到缓存目录。说起来简单，但是还是有些问题值得思考。</p><p>比如：如何判断缓存中是否存在当前的依赖包？其实 Yarn 会根据 cacheFolder+slug+node_modules+pkg.name 生成一个 path，判断系统中是否存在该 path，如果存在证明已经有缓存，不用重新下载。这个 path 也就是依赖包缓存的具体路径。</p><p>对于没有命中缓存的包，Yarn 会维护一个 fetch 队列，按照规则进行网络请求。如果下载包地址是一个 file 协议，或者是相对路径，就说明其指向一个本地目录，此时调用 Fetch From Local 从离线缓存中获取包；否则调用 Fetch From External 获取包。最终获取结果使用 fs.createWriteStream 写入到缓存目录下。</p><p><img src="'+c+'" alt=""></p><h3 id="链接包-linking-packages" tabindex="-1">链接包（Linking Packages） <a class="header-anchor" href="#链接包-linking-packages" aria-label="Permalink to &quot;链接包（Linking Packages）&quot;">​</a></h3><p>上一步是将依赖下载到缓存目录，这一步是将项目中的依赖复制到项目 node_modules 下，同时遵循扁平化原则。在复制依赖前，Yarn 会先解析 peerDependencies，如果找不到符合 peerDependencies 的包，则进行 warning 提示，并最终拷贝依赖到项目中。</p><p><img src="'+r+'" alt=""></p><h3 id="构建包-building-packages" tabindex="-1">构建包（Building Packages） <a class="header-anchor" href="#构建包-building-packages" aria-label="Permalink to &quot;构建包（Building Packages）&quot;">​</a></h3><p>如果依赖包中存在二进制包需要进行编译，会在这一步进行。</p>',39),y=[i];function E(u,d,h,m,F,b){return a(),n("div",null,y)}const q=s(t,[["render",E]]);export{k as __pageData,q as default};

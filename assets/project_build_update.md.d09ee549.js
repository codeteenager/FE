import{_ as s,o as a,c as n,V as l}from"./chunks/framework.980dd5bd.js";const p="/FE/project/35.jpg",e="/FE/project/36.jpg",o="/FE/project/37.jpg",b=JSON.parse('{"title":"增量更新","description":"","frontmatter":{},"headers":[],"relativePath":"project/build/update.md","filePath":"project/build/update.md","lastUpdated":1683265897000}'),t={name:"project/build/update.md"},c=l('<h1 id="增量更新" tabindex="-1">增量更新 <a class="header-anchor" href="#增量更新" aria-label="Permalink to &quot;增量更新&quot;">​</a></h1><p>增量更新是目前大部分团队采用的缓存更新方案，结合HTTP强制缓存策略，既能够保证用户在第一时间获取最新资源，又可以减少网络资源消耗，提高Web应用程序的执行速度。</p><p>前端工程体系在此中的作用如下。</p><ul><li>构建产出文件hash指纹，这是实现增量更新的必要条件。</li><li>构建更新html文件对其他静态资源的引用URL。</li></ul><h2 id="http缓存" tabindex="-1">HTTP缓存 <a class="header-anchor" href="#http缓存" aria-label="Permalink to &quot;HTTP缓存&quot;">​</a></h2><p>浏览器对静态资源的缓存本质上是HTTP协议的缓存策略，其中又可以分为强制缓存和协商缓存。两种缓存策略都会将资源缓存到本地，强制缓存策略根据过期时间决定使用本地缓存还是请求新资源；而协商缓存每次都会发出请求，经过服务器进行对比后决定采用本地缓存还是新资源。具体采用哪种缓存策略，由HTTP协议的首部（Headers）信息决定。</p><h3 id="expires和max-age" tabindex="-1">Expires和max-age <a class="header-anchor" href="#expires和max-age" aria-label="Permalink to &quot;Expires和max-age&quot;">​</a></h3><p>Expires和max-age是强制缓存策略的关键信息，两者均是响应首部信息的。Expires是HTTP 1.0加入的特性，通过指定一个明确的时间点作为缓存资源的过期时间，在此时间点之前客户端将使用本地缓存的文件应答请求，而不会向服务器发出实体请求（在浏览器调试面板中可以看到此请求并且状态码为200）。Expires的优点是可以在缓存过期时间内减少客户端的HTTP请求，不仅节省了客户端处理时间和提高了Web应用的执行速度，而且也减少了服务器负载以及客户端网络资源的消耗。一个典型的Expires首部信息如下：</p><div class="language-html line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">Expires:Wed, 23 Aug 2017 14:00:00 GMT</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>上述信息指定对应资源的缓存过期时间为2017年8月23日14点。</p><p>Expires有一个致命的缺陷是：它所指定的时间点是以服务器为准的时间，但是客户端进行过期判断时是将本地的时间与此时间点对比。也就是说，如果客户端的时间与服务器存在误差，比如服务器的时间是2017年8月23日13点，而客户端的时间是2017年8月23日15点，那么通过上述Expires控制的缓存资源将会失效，客户端将会发送实体请求获取对应资源。这显然是不合理的。</p><p>针对这个问题，HTTP 1.1新增了Cache-control首部信息以便更精准地控制缓存。常用的Cache-control信息有以下几种。</p><ul><li>no-cache和no-store:&quot;no-cache&quot;并非禁止缓存，而是需要先与服务器确认返回的响应是否发生了变化，如果资源未发生变化，则可使用缓存副本从而避免下载。&quot;no-store&quot;是真正意义上的禁止缓存，禁止浏览器以及所有中间缓存存储任何版本的返回响应。每次用户都会向服务器发送请求，并下载完整的响应。</li><li>public和private:&quot;public&quot;表示此响应可以被浏览器以及中间缓存器无限期缓存，此信息并不常用，常规方案是使用max-age指定精确的缓存时间。&quot;private&quot;表示此响应可以被用户浏览器缓存，但是不允许任何中间缓存器对其进行缓存。例如，用户的浏览器可以缓存包含用户私人信息的HTML网页，但CDN却不能缓存。</li><li>max-age：指定从请求的时刻开始计算，此响应的缓存副本有效的最长时间（单位：秒）。例如，&quot;max-age=3600&quot;表示浏览器在接下来的1小时内使用此响应的本地缓存，不会发送实体请求到服务器。</li></ul><p>max-age指定的是缓存的时间跨度，而非缓存失效的时间点，不会受到客户端与服务器时间误差的影响。所以，与Expires相比，max-age可以更精确地控制缓存，并且比Expires有更高的优先级。强制缓存策略下（Cache-control未指定no-cache和no-store）的缓存判断流程如图所示。 <img src="'+p+'" alt=""></p><h3 id="etag和if-none-match" tabindex="-1">Etag和If-none-match <a class="header-anchor" href="#etag和if-none-match" aria-label="Permalink to &quot;Etag和If-none-match&quot;">​</a></h3><p>Etag是服务器为资源分配的字符串形式唯一性标识，作为响应首部信息返回给浏览器。浏览器在Cache-control指定no-cache或者max-age和Expires均过期之后，将Etag值通过If-none-match作为请求首部信息发送给服务器。服务器接收到请求之后，对比所请求资源的Etag值是否改变，如果未改变将返回304 Not Modified，并且根据既定的缓存策略分配新的Cache-control信息；如果资源发生了改变，则会返回最新的资源以及重新分配的Etag值。整体流程如图所示。</p><p><img src="'+e+`" alt=""></p><p>如果强制浏览器使用协商缓存策略，需要将Cache-control首部信息设置为no-cache，这样便不会判断max-age和Expires过期时间，从而每次资源请求都会经过服务器对比。</p><p>协商缓存并非是一种比强制缓存“低级”的策略，对于一些特殊的应用场景或资源，协商缓存是优于强制缓存的。比如项目中的HTML文档，由于它是所有其他静态资源的引用者，所以必须保证每次请求到的资源都是最新的。同时，为了便于服务器解析和保证网站地址的唯一性，html文件不能应用hash指纹。在这种场景下只能使用协商缓存。</p><h2 id="增量更新方案" tabindex="-1">增量更新方案 <a class="header-anchor" href="#增量更新方案" aria-label="Permalink to &quot;增量更新方案&quot;">​</a></h2><p>增量更新将hash指纹作为资源文件名的一部分，例如：</p><div class="language-html line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">head</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">link</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">rel</span><span style="color:#89DDFF;">=</span><span style="color:#C3E88D;">“stylesheet”</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#C3E88D;">“main.home.858d5483.css”</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">head</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">body</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">    &lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">text/javascript</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">src</span><span style="color:#89DDFF;">=</span><span style="color:#C3E88D;">“main.home.bbcdaf73.js”</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#A6ACCD;">body</span><span style="color:#89DDFF;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>在静态资源使用增量更新策略的前提下，可以将静态资源先于动态HTML部署，此时静态资源没有引用入口，不会对线上环境产生影响；动态HTML部署后即可在第一时间访问已存的最新静态资源。另外，增量更新修改了资源文件名，不会覆盖已存的旧版本文件，运维人员进行回滚操作时只需回滚HTML即可。这样不仅优化了版本控制，而且还可以支持多版本共存的需求。</p><p>所以，大公司的静态资源优化方案，基本上要实现这么几个东西：</p><ul><li>配置超长时间的本地缓存 —— 节省带宽，提高性能</li><li>采用内容摘要作为缓存更新依据 —— 精确的缓存控制</li><li>静态资源CDN部署 —— 优化网络请求更资源发布路径</li><li>实现非覆盖式发布 —— 平滑升级</li></ul><h2 id="按需加载与多模块架构场景下的增量更新" tabindex="-1">按需加载与多模块架构场景下的增量更新 <a class="header-anchor" href="#按需加载与多模块架构场景下的增量更新" aria-label="Permalink to &quot;按需加载与多模块架构场景下的增量更新&quot;">​</a></h2><p>多模块架构指的是存在多个互不干扰的模块体系，这些模块体系可能存在于同一页面中，也可能存在于两个独立页面。对于按需加载需求和在多模块架构场景下实现增量更新，需要考虑以下几个问题。</p><ul><li>同步模块的修改对异步文件和主文件hash指纹产生的影响。</li><li>异步模块的修改对主文件hash指纹产生的影响。</li></ul><h3 id="同步模块的修改对异步文件和主文件hash指纹的影响" tabindex="-1">同步模块的修改对异步文件和主文件hash指纹的影响 <a class="header-anchor" href="#同步模块的修改对异步文件和主文件hash指纹的影响" aria-label="Permalink to &quot;同步模块的修改对异步文件和主文件hash指纹的影响&quot;">​</a></h3><p><img src="`+o+`" alt=""></p><ul><li>主模块main.app.js。</li><li>同步模块module.sync.js，构建后与主模块合并为主文件main.app. [hash].js，同步加载。</li><li>异步模块module.async.js，单独构建为异步文件app.async.[hash].js，按需加载。</li></ul><p>构建输出的文件[hash]值是经过md5计算所得的，参与计算的模块内容改动后必然影响计算后的结果。同步模块module.async.js的内容作为计算因子参与主文件的hash指纹计算，并未参与异步文件hash指纹的计算。所以可以确定的是，同步模块的修改影响主模块的hash指纹，对异步文件无影响。</p><h3 id="异步模块的修改对主模块的hash指纹产生的影响" tabindex="-1">异步模块的修改对主模块的hash指纹产生的影响 <a class="header-anchor" href="#异步模块的修改对主模块的hash指纹产生的影响" aria-label="Permalink to &quot;异步模块的修改对主模块的hash指纹产生的影响&quot;">​</a></h3><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">onload</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(){</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">var</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">script</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">createElement</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">script</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">sciprt</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">src</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">https://static.app.com/async.js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">//异步文件URL</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">document</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">head</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">append</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">script</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>异步文件的URL被固定写死在负责加载它的主文件中，如果应用了hash指纹，上述代码经过构建之后的内容如下：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">onload</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(){</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">var</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">script</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">createElement</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">script</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">sciprt</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">src</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">https://static.app.com/async.2483fae1.js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">//异步文件URL</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">document</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">head</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">append</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">script</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>假设此时主文件为main.home.bbcdaf73.js，当前版本的所有资源被缓存在用户本地。经过新版迭代之后只改动了异步模块的内容，经过构建后异步文件的hash指纹更新为async.6203b33c.js，那么主文件的hash指纹是否变化呢？</p><p>我们首先假设主文件的hash指纹没有变化，新版发布之后，HTML文档中对于主文件的引用URL没有改动，浏览器仍旧使用缓存副本main.home. bbcdaf73.js。主文件中异步文件的URL仍旧是<code>https://static.app.com/async.2483fae1.js</code>，也就是说，即使我们更新了异步文件的hash指纹，也并没有令浏览器请求到最新的资源，这显然是不合理的。所以，异步模块的修改不仅仅影响其对应异步文件的hash指纹，主文件的hash指纹也必须同步修改，这样才能保证用户得到最新的异步文件。</p><h2 id="webpack增量更新构建方案" tabindex="-1">Webpack增量更新构建方案 <a class="header-anchor" href="#webpack增量更新构建方案" aria-label="Permalink to &quot;Webpack增量更新构建方案&quot;">​</a></h2>`,39),r=[c];function i(F,h,y,D,d,m){return a(),n("div",null,r)}const C=s(t,[["render",i]]);export{b as __pageData,C as default};

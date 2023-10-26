import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.ea1f6e24.js";const F=JSON.parse('{"title":"ESLint","description":"","frontmatter":{},"headers":[],"relativePath":"project/standard/eslint.md","filePath":"project/standard/eslint.md","lastUpdated":1698249065000}'),p={name:"project/standard/eslint.md"},o=l(`<h1 id="eslint" tabindex="-1">ESLint <a class="header-anchor" href="#eslint" aria-label="Permalink to &quot;ESLint&quot;">​</a></h1><h2 id="抽象语法树" tabindex="-1">抽象语法树 <a class="header-anchor" href="#抽象语法树" aria-label="Permalink to &quot;抽象语法树&quot;">​</a></h2><ul><li>抽象语法树(Abstract Syntax Tree，AST)是源代码语法结构的一种表示</li><li>它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构</li></ul><h2 id="抽象语法树的用途" tabindex="-1">抽象语法树的用途 <a class="header-anchor" href="#抽象语法树的用途" aria-label="Permalink to &quot;抽象语法树的用途&quot;">​</a></h2><ul><li>代码语法的检查、代码风格的检查、代码的格式化、代码的高亮、代码错误提示、代码自动补全等等</li><li>优化变更代码，改变代码结构使达到想要的结构</li></ul><h2 id="javascript-parser" tabindex="-1">JavaScript Parser <a class="header-anchor" href="#javascript-parser" aria-label="Permalink to &quot;JavaScript Parser&quot;">​</a></h2><p>JavaScript Parser是把JavaScript源码转化为抽象语法树的解析器</p><h2 id="代码转换" tabindex="-1">代码转换 <a class="header-anchor" href="#代码转换" aria-label="Permalink to &quot;代码转换&quot;">​</a></h2><ul><li><ol><li>将代码转换成ast语法树</li></ol></li><li><ol start="2"><li>深度优先遍历，遍历ast抽象语法树</li></ol></li><li><ol start="3"><li>代码生成</li></ol></li></ul><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">pnpm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">esprima</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">estraverse</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">escodegen</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-s</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">pnpm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#032F62;">esprima</span><span style="color:#24292E;"> </span><span style="color:#032F62;">estraverse</span><span style="color:#24292E;"> </span><span style="color:#032F62;">escodegen</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-s</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">esprima</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;esprima&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">estraverse</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;estraverse&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">escodegen</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;escodegen&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> code </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;function a(){}&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//就是将我们的代码转换成ast语法树</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">ast</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> esprima.</span><span style="color:#B392F0;">parseScript</span><span style="color:#E1E4E8;">(code);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//访问模式，就是遍历节点的时候，会有两个过程，一个是进入，一个是离开</span></span>
<span class="line"><span style="color:#E1E4E8;">estraverse.</span><span style="color:#B392F0;">traverse</span><span style="color:#E1E4E8;">(ast,{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">enter</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">node</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">        console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(node);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(node.type </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;FunctionDeclaration&#39;</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">            node.id.name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;ast&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">leave</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">node</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">        console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(node);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(escodegen.</span><span style="color:#B392F0;">generate</span><span style="color:#E1E4E8;">(ast));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//es6-&gt;es5语法，典型的语法转化，将箭头函数转换成普通函数</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">esprima</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;esprima&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">estraverse</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;estraverse&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">escodegen</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;escodegen&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> code </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;function a(){}&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//就是将我们的代码转换成ast语法树</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">ast</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> esprima.</span><span style="color:#6F42C1;">parseScript</span><span style="color:#24292E;">(code);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//访问模式，就是遍历节点的时候，会有两个过程，一个是进入，一个是离开</span></span>
<span class="line"><span style="color:#24292E;">estraverse.</span><span style="color:#6F42C1;">traverse</span><span style="color:#24292E;">(ast,{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">enter</span><span style="color:#24292E;">(</span><span style="color:#E36209;">node</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">        console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(node);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(node.type </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;FunctionDeclaration&#39;</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">            node.id.name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;ast&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">leave</span><span style="color:#24292E;">(</span><span style="color:#E36209;">node</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">        console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(node);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(escodegen.</span><span style="color:#6F42C1;">generate</span><span style="color:#24292E;">(ast));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//es6-&gt;es5语法，典型的语法转化，将箭头函数转换成普通函数</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h2 id="babel插件" tabindex="-1">babel插件 <a class="header-anchor" href="#babel插件" aria-label="Permalink to &quot;babel插件&quot;">​</a></h2><h3 id="转换箭头函数" tabindex="-1">转换箭头函数 <a class="header-anchor" href="#转换箭头函数" aria-label="Permalink to &quot;转换箭头函数&quot;">​</a></h3><ul><li><code>@babel/core</code> Babel的编译器，核心API都在这里面，比如常见的transform、parse，并实现了插件功能</li><li><code>@babel/types</code> 用于AST节点的lodash式工具库，它包含了构造、验证以及变换AST节点的方法，对编写处理AST逻辑非常有用</li><li><code>babel-plugin-transform-es2015-arrow-functions</code>转换箭头函数插件</li></ul><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">babel</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;@babel/core&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">types</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;@babel/types&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">arrowFunctions</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;babel-plugin-transform-es2015-arrow-functions&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">code</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`const sum = (a,b) =&gt; a+b\`</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//转化代码，通过arrowFunctions插件</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">result</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> babel.</span><span style="color:#B392F0;">transform</span><span style="color:#E1E4E8;">(code,{</span></span>
<span class="line"><span style="color:#E1E4E8;">    plugins: [arrowFunctions]</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(result.code);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">babel</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;@babel/core&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">types</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;@babel/types&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">arrowFunctions</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;babel-plugin-transform-es2015-arrow-functions&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">code</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`const sum = (a,b) =&gt; a+b\`</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//转化代码，通过arrowFunctions插件</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">result</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> babel.</span><span style="color:#6F42C1;">transform</span><span style="color:#24292E;">(code,{</span></span>
<span class="line"><span style="color:#24292E;">    plugins: [arrowFunctions]</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(result.code);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="eslint使用" tabindex="-1">ESLint使用 <a class="header-anchor" href="#eslint使用" aria-label="Permalink to &quot;ESLint使用&quot;">​</a></h2><p>ESLint是一个开源的工具，ESLint采用静态分析找到并修复JavaScript代码中的问题</p><ul><li>ESLint使用Espree进行JavaScript解析</li><li>ESLint使用AST来评估代码中的模式</li><li>ESLint是完全可插拔的，每一条规则都是一个插件，你可以在运行时添加更多</li><li>esprima - 经典的解析器</li><li>acorn - 造轮子媲美Esprima</li><li>@babel/parser (babylon)基于acorn的</li><li>espree最初从Esprima中fork出来的，现在基于acron</li></ul><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">pnpm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">init</span></span>
<span class="line"><span style="color:#B392F0;">pnpm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">i</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">eslint</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-D</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#安装eslint</span></span>
<span class="line"><span style="color:#B392F0;">pnpm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">create</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">@eslint/config</span><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">#初始化eslint的配置文件</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">pnpm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">init</span></span>
<span class="line"><span style="color:#6F42C1;">pnpm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">i</span><span style="color:#24292E;"> </span><span style="color:#032F62;">eslint</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-D</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#安装eslint</span></span>
<span class="line"><span style="color:#6F42C1;">pnpm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">create</span><span style="color:#24292E;"> </span><span style="color:#032F62;">@eslint/config</span><span style="color:#24292E;">  </span><span style="color:#6A737D;">#初始化eslint的配置文件</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><blockquote><p>生成的配置文件是：</p></blockquote><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    env: { </span><span style="color:#6A737D;">//指定环境</span></span>
<span class="line"><span style="color:#E1E4E8;">        browser: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">//浏览器环境</span></span>
<span class="line"><span style="color:#E1E4E8;">        es2021: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,  </span><span style="color:#6A737D;">//ECMAScript语法</span></span>
<span class="line"><span style="color:#E1E4E8;">        node: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">     </span><span style="color:#6A737D;">// node环境</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// extends和plugin的区别</span></span>
<span class="line"><span style="color:#E1E4E8;">    extends: </span><span style="color:#9ECBFF;">&quot;eslint:recommended&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">//如果集成后，就可以使用别人写好的规则</span></span>
<span class="line"><span style="color:#E1E4E8;">    parserOptions: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        ecmaVersion: </span><span style="color:#9ECBFF;">&quot;latest&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">//这个是描述语法的</span></span>
<span class="line"><span style="color:#E1E4E8;">        sourceType: </span><span style="color:#9ECBFF;">&quot;module&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        ecmaFeature: {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">&quot;jsx&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    rules:{ </span><span style="color:#6A737D;">//eslint规则</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//0 off 1 warn  2 error</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;quotes&quot;</span><span style="color:#E1E4E8;"> : [</span><span style="color:#9ECBFF;">&quot;error&quot;</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&quot;double&quot;</span><span style="color:#E1E4E8;">] </span><span style="color:#6A737D;">//这个是覆盖掉了之前的规则</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//ts解析器</span></span>
<span class="line"><span style="color:#E1E4E8;">    plugin: [</span><span style="color:#9ECBFF;">&#39;@typescript-eslint/eslint-plugin&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">    parser: </span><span style="color:#9ECBFF;">&#39;@typescript-eslint/parser&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">//内部用的是espress</span></span>
<span class="line"><span style="color:#E1E4E8;">    globals:{</span></span>
<span class="line"><span style="color:#E1E4E8;">        custom: </span><span style="color:#9ECBFF;">&#39;readonly&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    env: { </span><span style="color:#6A737D;">//指定环境</span></span>
<span class="line"><span style="color:#24292E;">        browser: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">//浏览器环境</span></span>
<span class="line"><span style="color:#24292E;">        es2021: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,  </span><span style="color:#6A737D;">//ECMAScript语法</span></span>
<span class="line"><span style="color:#24292E;">        node: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">     </span><span style="color:#6A737D;">// node环境</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// extends和plugin的区别</span></span>
<span class="line"><span style="color:#24292E;">    extends: </span><span style="color:#032F62;">&quot;eslint:recommended&quot;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">//如果集成后，就可以使用别人写好的规则</span></span>
<span class="line"><span style="color:#24292E;">    parserOptions: {</span></span>
<span class="line"><span style="color:#24292E;">        ecmaVersion: </span><span style="color:#032F62;">&quot;latest&quot;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">//这个是描述语法的</span></span>
<span class="line"><span style="color:#24292E;">        sourceType: </span><span style="color:#032F62;">&quot;module&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        ecmaFeature: {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">&quot;jsx&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    rules:{ </span><span style="color:#6A737D;">//eslint规则</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//0 off 1 warn  2 error</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;quotes&quot;</span><span style="color:#24292E;"> : [</span><span style="color:#032F62;">&quot;error&quot;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&quot;double&quot;</span><span style="color:#24292E;">] </span><span style="color:#6A737D;">//这个是覆盖掉了之前的规则</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//ts解析器</span></span>
<span class="line"><span style="color:#24292E;">    plugin: [</span><span style="color:#032F62;">&#39;@typescript-eslint/eslint-plugin&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">    parser: </span><span style="color:#032F62;">&#39;@typescript-eslint/parser&#39;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">//内部用的是espress</span></span>
<span class="line"><span style="color:#24292E;">    globals:{</span></span>
<span class="line"><span style="color:#24292E;">        custom: </span><span style="color:#032F62;">&#39;readonly&#39;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div>`,21),e=[o];function r(c,t,E,y,i,u){return n(),a("div",null,e)}const d=s(p,[["render",r]]);export{F as __pageData,d as default};
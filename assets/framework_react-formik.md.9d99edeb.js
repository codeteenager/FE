import{_ as s,o as n,c as a,V as l}from"./chunks/framework.980dd5bd.js";const A=JSON.parse('{"title":"Formik","description":"","frontmatter":{},"headers":[],"relativePath":"framework/react-formik.md","filePath":"framework/react-formik.md","lastUpdated":1683265897000}'),p={name:"framework/react-formik.md"},o=l(`<h1 id="formik" tabindex="-1">Formik <a class="header-anchor" href="#formik" aria-label="Permalink to &quot;Formik&quot;">​</a></h1><p>Formik是React官方推荐给我们用于增强React表单功能的第三方模块，有了Formik以后我们就可以更加专注的处理我们自己的业务逻辑，而不再分心处理表单技术上的细节。</p><h2 id="formik简介" tabindex="-1">Formik简介 <a class="header-anchor" href="#formik简介" aria-label="Permalink to &quot;Formik简介&quot;">​</a></h2><p>Formik官方介绍说增强表单处理能力，简化表单处理流程。<a href="https://jaredpalmer.com/formik/" target="_blank" rel="noreferrer">官⽹</a>。</p><p>首先，我们通过npm安装一下</p><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">formik</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>然后使⽤ formik 进⾏表单数据绑定以及表单提交处理</p><div class="language-jsx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">useFormik</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">formik</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">App</span><span style="color:#89DDFF;">(){</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">formik</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">useFormik</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span><span style="color:#F07178;">initialValues</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> username</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">张三</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">},</span><span style="color:#82AAFF;">onSubmit</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;font-style:italic;">values</span><span style="color:#C792EA;">=&gt;</span><span style="color:#89DDFF;">{}}</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">form</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">onSubmit</span><span style="color:#89DDFF;">={</span><span style="color:#A6ACCD;">formik</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">handleSubmit</span><span style="color:#89DDFF;">}&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">input</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">text</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">name</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">username</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">            </span><span style="color:#C792EA;">value</span><span style="color:#89DDFF;">={</span><span style="color:#A6ACCD;">formik</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">values</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">username</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">            </span><span style="color:#C792EA;">onChange</span><span style="color:#89DDFF;">={</span><span style="color:#A6ACCD;">formik</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">handleChange</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">        /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">input</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">submit</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">form</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>初始验证方式：</p><div class="language-jsx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> formik </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">useFormik</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">validate</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">values</span><span style="color:#C792EA;">=&gt;</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">errors</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{};</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">values</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">username</span><span style="color:#F07178;">) </span><span style="color:#A6ACCD;">errors</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">username</span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">请输入用户名</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">errors</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">form</span><span style="color:#89DDFF;">&gt;{</span><span style="color:#A6ACCD;">formik</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">errors</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">username</span><span style="color:#89DDFF;">?&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;{</span><span style="color:#A6ACCD;">formik</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">erros</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">username</span><span style="color:#89DDFF;">}&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;:null}&lt;/</span><span style="color:#F07178;">form</span><span style="color:#89DDFF;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>完善错误信息提示时的用户体验：</p><ol><li>开启离开焦点时触发验证</li></ol><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">onBlur</span><span style="color:#89DDFF;">={</span><span style="color:#A6ACCD;">formik.handleBlur</span><span style="color:#89DDFF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ol start="2"><li>提示信息时检查表单元素的值是否被改动过</li></ol><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;">formik</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">touched</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">username</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">formik</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">errors</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">username</span><span style="color:#89DDFF;">?&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;{</span><span style="color:#A6ACCD;">formik</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">errors</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">username</span><span style="color:#89DDFF;">}&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;:null}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>使用Yup进行表单验证：</p><p>首先安装yup</p><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">yup</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>引入yup</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">as</span><span style="color:#A6ACCD;"> Yup </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">yup</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>然后定义验证规则</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">validationSchema</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> Yup</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">object</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">username</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> Yup</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">string</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">max</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">15</span><span style="color:#89DDFF;">,</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">用户名的长度不能大于15</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">required</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">请输入用户名</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">passowrd</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> Yup</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">string</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">max</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">20</span><span style="color:#89DDFF;">,</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">密码的长度不能大于20</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">required</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">请输入密码</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>减少样板代码，通过使用formik.getFieldProps方法来替代<code>value</code>、<code>onChange</code>和<code>onBrlur</code>。</p><div class="language-jsx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">form</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">onSubmit</span><span style="color:#89DDFF;">={</span><span style="color:#A6ACCD;">formik</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">handleSubmit</span><span style="color:#89DDFF;">}&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">input</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">text</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">name</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">username</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">        {...</span><span style="color:#A6ACCD;">formik</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getFieldProps</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">username</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">    /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">input</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">submit</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">/&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">form</span><span style="color:#89DDFF;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>在Formik中提供了一系列的组件来帮助我们构建表单。它的好处是让我们表单的代码看起来更加整洁。</p><div class="language-jsx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;">Formik</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">Form</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">Field</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">ErrorMessage</span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">formik</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">App</span><span style="color:#89DDFF;">(){</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> (</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Formik</span></span>
<span class="line"><span style="color:#89DDFF;">            </span><span style="color:#C792EA;">initialValues</span><span style="color:#89DDFF;">={</span><span style="color:#A6ACCD;">initialValues</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">            </span><span style="color:#C792EA;">onSubmit</span><span style="color:#89DDFF;">={</span><span style="color:#A6ACCD;">handleSubmit</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">            </span><span style="color:#C792EA;">validationSchema</span><span style="color:#89DDFF;">={</span><span style="color:#A6ACCD;">schema</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">        &gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Form</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Field</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">name</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">username</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">ErrorMessage</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">name</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">username</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">submit</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">提交</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#FFCB6B;">Form</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#FFCB6B;">Formik</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#F07178;">    )</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>默认情况下, Field组件渲染的是⽂本框. 如要⽣成其他表单元素可以使⽤以下语法</p><div class="language-jsx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Field</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">name</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">content</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">as</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">textarea</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">/&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Field</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">name</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">content</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">as</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">textarea</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">option</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">value</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">前端</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">前端</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">option</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">option</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">value</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Java</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Java</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">option</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">option</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">value</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">python</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">python</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">option</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#FFCB6B;">Field</span><span style="color:#89DDFF;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>使⽤ useField 构建 ⾃定义表单控件</p><div class="language-jsx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">useField</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">formik</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">MyInputField</span><span style="color:#89DDFF;">({</span><span style="color:#A6ACCD;font-style:italic;">label</span><span style="color:#89DDFF;">,...</span><span style="color:#A6ACCD;font-style:italic;">props</span><span style="color:#89DDFF;">}){</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">field</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">meta</span><span style="color:#89DDFF;">]</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">useField</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">props</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">label</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">htmlFor</span><span style="color:#89DDFF;">={</span><span style="color:#A6ACCD;">props</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">id</span><span style="color:#89DDFF;">}&gt;{</span><span style="color:#A6ACCD;">label</span><span style="color:#89DDFF;">}&lt;/</span><span style="color:#F07178;">label</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">input</span><span style="color:#89DDFF;"> {...</span><span style="color:#A6ACCD;">field</span><span style="color:#89DDFF;">} {...</span><span style="color:#A6ACCD;">props</span><span style="color:#89DDFF;">} /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;">meta</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">touched </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> meta</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">error </span><span style="color:#89DDFF;">?</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">meta.error</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">MyInputField</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">label</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">密码</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">password</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">name</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">password</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">placeholder</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">请输入密码</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div>`,30),e=[o];function r(t,c,D,F,y,i){return n(),a("div",null,e)}const u=s(p,[["render",r]]);export{A as __pageData,u as default};

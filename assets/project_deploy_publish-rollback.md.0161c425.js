import{_ as s,c as a,o as e,a as l}from"./app.f710d21f.js";const _=JSON.parse('{"title":"发布回滚","description":"","frontmatter":{},"headers":[{"level":2,"title":"上线流程","slug":"上线流程","link":"#上线流程","children":[]},{"level":2,"title":"回滚流程","slug":"回滚流程","link":"#回滚流程","children":[]},{"level":2,"title":"相关文章","slug":"相关文章","link":"#相关文章","children":[]}],"relativePath":"project/deploy/publish-rollback.md","lastUpdated":1670949289000}'),n={name:"project/deploy/publish-rollback.md"},i=l(`<h1 id="发布回滚" tabindex="-1">发布回滚 <a class="header-anchor" href="#发布回滚" aria-hidden="true">#</a></h1><h2 id="上线流程" tabindex="-1">上线流程 <a class="header-anchor" href="#上线流程" aria-hidden="true">#</a></h2><ol><li>将测试完成的代码提交到git版本库的master分支</li><li>将当前服务器的代码全部打包并记录版本号，备份</li><li>将master分支的代码提交覆盖到线上服务器，生成新版本号</li></ol><h2 id="回滚流程" tabindex="-1">回滚流程 <a class="header-anchor" href="#回滚流程" aria-hidden="true">#</a></h2><p>每次系统部署都存在着引入漏洞的隐患，没有人能保证部署的代码是完美无缺的。当部署的代码出现问题时，开发人员应该立刻进行回滚，先确保生产环境处于正常可用的状态，再去排查产生问题的原因。</p><p>覆盖式发布会覆盖掉发布前的资源。当发布导致生产环境出现问题时，需要使用稳定版本的代码进行重新构建并再次进行发布覆盖，才能让生产环境恢复正常。当使用非覆盖式发布进行发布时，资源回滚的问题解决了，作为入口页面的index.html却没有回滚。</p><p>在发布导致生产环境出现问题时，最常用的手段就是发布回滚。当项目体积变大后，代码的构建会非常缓慢。如果采取重新构建的方案进行回滚，那么会浪费大量时间和精力，一旦生产环境出现的问题在等待回滚的过程中进一步扩大了，那么还会收到用户的投诉。</p><p>回滚流程如下：</p><ol><li>将当前服务器的代码打包并记录版本号，备份</li><li>将备份的上一个版本号解压，覆盖到线上服务器，并生成新的版本号</li></ol><p>发布回滚的方法非常简单。系统每次部署时都会将构建好的资源输出到build目录，开发人员只需使用zip命令将build下面所有的资源进行压缩即可。</p><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># 进入构建好的资源目录</span></span>
<span class="line"><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> build/</span></span>
<span class="line"><span style="color:#676E95;"># 使用zip进行压缩，-r代表递归文件目录压缩，* 代表将当前目录下的所有文件及文件夹</span></span>
<span class="line"><span style="color:#A6ACCD;">zip -r 20211001130000.zip </span><span style="color:#89DDFF;">*</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>压缩文件可以根据实际情况进行命名，例如，可以选择发布时间、commit hash等信息进行命名。如果以发布时间命名，那么可以将2021年10月01日13点00时00分发布的文件压缩包命名为20211001130000.zip。</p><p>当需要进行发布回滚时，直接使用unzip对需要回滚的代码包进行解压。</p><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">unzip 20211001130000.zip</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>最后，将解压后的代码上传到服务器即可快速完成发布回滚。</p><h2 id="相关文章" tabindex="-1">相关文章 <a class="header-anchor" href="#相关文章" aria-hidden="true">#</a></h2><ul><li><a href="https://juejin.cn/post/7170866669231800351" target="_blank" rel="noreferrer">实战发布平台——原来「回滚」可以这样玩！</a></li></ul>`,17),p=[i];function r(t,c,o,d,h,u){return e(),a("div",null,p)}const m=s(n,[["render",r]]);export{_ as __pageData,m as default};

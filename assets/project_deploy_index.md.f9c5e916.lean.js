import{_ as s,v as a,b as n,R as e}from"./chunks/framework.a626a558.js";const p="/FE/project/50.png",_=JSON.parse('{"title":"介绍","description":"","frontmatter":{},"headers":[],"relativePath":"project/deploy/index.md","filePath":"project/deploy/index.md","lastUpdated":1683265897000}'),l={name:"project/deploy/index.md"},t=e(`<h1 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-label="Permalink to &quot;介绍&quot;">​</a></h1><p>系统部署指将代码部署到服务器上，它作为工程化中一个至关重要的环节，同样经历了长时间的发展。</p><p>早期的前端代码结构如下所示：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">assets</span></span>
<span class="line"><span style="color:#A6ACCD;">css</span></span>
<span class="line"><span style="color:#A6ACCD;">html</span></span>
<span class="line"><span style="color:#A6ACCD;">index</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">html</span></span>
<span class="line"><span style="color:#A6ACCD;">js</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>index.html文件是前端页面的首页，assets文件夹下存放着网站用到的静态资源，css文件夹下存放用到的样式文件，js文件夹下通常存放着诸如jQuery的三方JavaScript库和业务脚本，html文件夹下则存放着各个子页面的.html文件。此时前端部署简单粗暴，在大多数情况下都是直接通过FTP工具或者shell脚本将文件上传到服务器的。</p><p>随着页面功能复杂度的上升和前端生态圈的不断丰富，前端工程开始引入状态管理、路由管理等方案，项目工程结构也变得越来越复杂。随着用户量的增加，页面的性能和稳定性开始受到挑战，为了应对大量的页面请求，不得不增加服务端机器的数量。综合以上原因，简单粗暴地直接将文件上传到服务器的部署方式开始受到各种各样的挑战和质疑，并逐渐被弃用，前端工程师们开始寻求更加稳定可靠的工程化部署方案。</p><h2 id="前端部署流程图" tabindex="-1">前端部署流程图 <a class="header-anchor" href="#前端部署流程图" aria-label="Permalink to &quot;前端部署流程图&quot;">​</a></h2><p>以下为阿里标准的前端部署流程图 <img src="`+p+'" alt=""></p>',8),r=[t];function o(i,c,d,m,h,u){return a(),n("div",null,r)}const C=s(l,[["render",o]]);export{_ as __pageData,C as default};

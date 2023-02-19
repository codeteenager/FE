import{_ as s,c as e,o as n,a as p}from"./app.c61d38ee.js";const a="/FE/project/5.jpeg",l="/FE/project/6.png",r="/FE/project/21.png",t="/FE/project/7.jpg",o="/FE/project/8.jpg",i="/FE/project/9.jpg",c="/FE/project/10.jpg",d="/FE/project/11.jpg",m="/FE/project/12.jpg",h="/FE/project/13.jpg",u="/FE/project/14.jpg",g="/FE/project/15.jpg",y="/FE/project/16.jpg",b="/FE/project/17.jpg",C="/FE/project/18.jpg",x="/FE/project/19.jpg",_="/FE/project/20.jpg",M=JSON.parse('{"title":"npm仓库","description":"","frontmatter":{},"headers":[{"level":2,"title":"介绍","slug":"介绍","link":"#介绍","children":[]},{"level":2,"title":"下载","slug":"下载","link":"#下载","children":[]},{"level":2,"title":"配置","slug":"配置","link":"#配置","children":[]},{"level":2,"title":"启动与关闭","slug":"启动与关闭","link":"#启动与关闭","children":[]},{"level":2,"title":"访问","slug":"访问","link":"#访问","children":[]},{"level":2,"title":"配置npm私有仓库","slug":"配置npm私有仓库","link":"#配置npm私有仓库","children":[{"level":3,"title":"npm-hosted","slug":"npm-hosted","link":"#npm-hosted","children":[]},{"level":3,"title":"npm-proxy","slug":"npm-proxy","link":"#npm-proxy","children":[]},{"level":3,"title":"npm-group","slug":"npm-group","link":"#npm-group","children":[]}]},{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]}],"relativePath":"project/deploy/registry.md","lastUpdated":1670674756000}'),E={name:"project/deploy/registry.md"},A=p('<h1 id="npm仓库" tabindex="-1">npm仓库 <a class="header-anchor" href="#npm仓库" aria-hidden="true">#</a></h1><h2 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-hidden="true">#</a></h2><blockquote><p>之前写过一篇前端物料平台的搭建，其中涉及到使用私有npm仓库来管理前端物料，为此写一下企业的npm仓库搭建。</p></blockquote><p>那么企业为什么要搭建私有的npm仓库呢，我们平时大部分使用的是npm官方仓库的一些依赖库，但是针对企业级，企业需要开发自己的一些组件库和工具库，这些库需要在组织内部进行管理和共享，不能够上传npm公有仓库中，因此我们需要搭建企业私有仓库来解决这种问题。同时搭建私有仓库，能够提升npm包的安装下载速度和源的稳定性，比如淘宝镜像，本质上也是私有仓库。</p><p>接下来我们介绍一下常用npm私有仓库框架。</p><ol><li>Nexus Nexus 是Maven 仓库管理器，管理开发所需要的构件。如果每次都是从 Apache 提供的 Maven中央仓库去下载所需要的构件，那么这通常不是一个好的做法。应该在本地架设一个Maven仓库服务器，再代理远程仓库的同时维护本地仓库，以节省带宽和时间，那么Nexus可以满足这样的需求。</li></ol><p><img src="'+a+'" alt=""></p><p>Nexus Repository Manager 仓库管理分为专业版和oss版，oss版是免费的，专业版是收费的。</p><p>nexus 的功能非常强大。Nexus 2.x 和 Nexus 3.x 的差别也是非常大；Nexus 3.x 版本更增加了对 Docker、NuGet、npm、Bower的支持。全面升级了页面，增加管理接口以自动管理任务，性能和用户体验也都有所改善。</p><ol start="2"><li>cnpm CNPM 是一个Nodejs的库，由国内Alibaba团队开发维护，致力于打造私有的 NPM 注册服务。当然，除了私有库功能以外，CNPM官网 (<a href="http://cnpmjs.org/" target="_blank" rel="noreferrer">http://cnpmjs.org/</a>) 还提供了NPM同步的服务。</li></ol><p><img src="'+l+'" alt=""></p><ol start="3"><li>Verdaccio Verdaccio 是一个简单的、零配置本地私有 npm 软件包代理注册表。Verdaccio 开箱即用，拥有自己的小型数据库，能够代理其它注册表（例如 <a href="http://npmjs.org" target="_blank" rel="noreferrer">npmjs.org</a>），缓存下载的模块。此外 Verdaccio 还易于扩展存储功能，它支持各种社区制作的插件，以连接到亚马逊的 s3、谷歌云存储等服务或创建自己的插件。</li></ol><h2 id="下载" tabindex="-1">下载 <a class="header-anchor" href="#下载" aria-hidden="true">#</a></h2><p>本次使用Nexus来搭建npm仓库，Nexus不仅支持npm包，而且也支持Maven。Nexus架构图如下：</p><p><img src="'+r+'" alt=""></p><p>nexus 工作在 client 和外部 npm 之间，并通过 group repository 合并 npm 仓库以及私有仓库，这样就起到了代理转发的作用。</p><p>首先我们先去下载免费的oss版本，下载地址为<a href="https://www.sonatype.com/download-oss-sonatype" target="_blank" rel="noreferrer">https://www.sonatype.com/download-oss-sonatype</a>。</p><p><img src="'+t+`" alt=""></p><p>在这里下载了nexus-3.31.1-01-unix.tar.gz，然后使用FileZilla上传倒服务器中，执行解压命令</p><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">tar</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-zxvf</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nexus-3.31.1-</span><span style="color:#F78C6C;">01</span><span style="color:#C3E88D;">-unix.tar.gz</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-C</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">./</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>解压到当前目录。</p><p><img src="`+o+'" alt=""></p><p>解压后会有两个文件夹，nexus-3.31.1-01和sonatype-work。nexus-3.31.1-01是nexus核心文件，包含Nexus运行所需要的文件，如运行脚本，依赖jar包等，sonatype-work是仓库的工作目录，包含Nexus生成的配置文件、日志文件、仓库文件等。</p><p>nexus-3.31.1-01目录如下：</p><ul><li>bin：包含nexus的启动脚本和相关配置</li><li>etc： jetty、karaf等配置文件</li><li>lib： java架包库</li><li>public：关于nexus应用在本地跑起来所需要的资源</li><li>system：应用所有的插件和组件</li><li>LICENSE.txt 和 NOTICE.txt ：版权声明和法律细则</li></ul><p>sonatype-work\\nexus3目录如下：</p><ul><li>blobs：创建blob的默认路径，当然也可以重新指定</li><li>cache：当前缓存的karaf包的信息</li><li>db：OrientDB数据库的数据，用于存储nexus的元数据的数据库</li><li>elasticsearch：当前配置的Elasticsearch状态</li><li>keystores：自动生成的关于资源库的ID主键</li><li>log：运行实例生成的日志文件</li><li>tmp：用于存储临时文件的目录</li></ul><h2 id="配置" tabindex="-1">配置 <a class="header-anchor" href="#配置" aria-hidden="true">#</a></h2><p>我们打开nexus-3.31.1-01目录下etc目录下可以看到众多的配置文件。</p><p><img src="'+i+'" alt=""></p><p>我们可以编辑其中的nexus-default.properties文件，可以修改默认的端口。</p><p><img src="'+c+`" alt=""></p><h2 id="启动与关闭" tabindex="-1">启动与关闭 <a class="header-anchor" href="#启动与关闭" aria-hidden="true">#</a></h2><p>然后我们进入bin目录下执行 ./nexus start 即可启动。当然也可以使用./nexus run启动。区别在于：start以守护线程方式启动，run以非守护线程方式启动。</p><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">./nexus</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">start</span></span>
<span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">./nexus</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">run</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>启动时可能比较慢，需要多等一会，如果想看启动日志情况可以进入sonatype-work目录。</p><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;">#进入sonatype-work目录的nexus3日志目录</span></span>
<span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">sonatype-work/nexus3/log</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#查看实时日志</span></span>
<span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">tail</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-f</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nexus.log</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>关闭我们可以使用 ./nexus stop 命令来关闭。</p><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">./nexus</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">stop</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="访问" tabindex="-1">访问 <a class="header-anchor" href="#访问" aria-hidden="true">#</a></h2><p>打开浏览器输入：http://ip:8081即可访问，这里注意在nexus2的版本访问地址是<a href="http://ip:8081/nexus%EF%BC%8C%E5%9C%A8nexus3%E7%89%88%E6%9C%AC%E7%9B%B4%E6%8E%A5ip+%E7%AB%AF%E5%8F%A3%E5%B0%B1%E5%8F%AF%E4%BB%A5%E8%AE%BF%E9%97%AE%E4%BA%86%E3%80%82" target="_blank" rel="noreferrer">http://ip:8081/nexus，在nexus3版本直接ip+端口就可以访问了。</a></p><p><img src="`+d+'" alt=""></p><p>然后我们点击Sign in进行登录，管理员账号默认为admin，弹框会提示admin的密码存放在 sonatype-work/nexus3/admin.password中，我们可以使用其密码进行登录，登录后会提示更改密码，此后admin.password也就无效了。</p><p><img src="'+m+'" alt=""></p><h2 id="配置npm私有仓库" tabindex="-1">配置npm私有仓库 <a class="header-anchor" href="#配置npm私有仓库" aria-hidden="true">#</a></h2><p>nexus默认没有npm私有仓库，需要我们自己去创建。首先我们先在管理员配置中，仓库下打开blob存储，点击创建blob存储，为npm私库创建一个单独的私有空间。</p><p><img src="'+h+'" alt=""></p><p>选择File类型，输入名称点击create blob store即可。</p><p><img src="'+u+'" alt=""></p><p>然后再分别创建三种类型的npm仓库：hosted、proxy、group。</p><ul><li>hosted：本地存储，你可以上传你自己的项目到这里面。</li><li>proxy：提供代理其他仓库的类型，即你可以设置代理，设置了代理之后，在你的nexus中找不到的依赖就会去配置的代理的地址中找。</li><li>group：组类型，它可以包含前面两个，是一个聚合体。一般用来给客户一个访问nexus的统一地址。</li></ul><p>简单的说，就是你可以上传私有的项目到hosted，以及配置proxy以获取第三方的依赖（比如可以配置中央仓库的地址）。前面两个都弄好了之后，在通过group聚合给客户提供统一的访问地址。</p><p>我们先创建这三个对应的仓库。</p><p><img src="'+g+'" alt=""><img src="'+y+'" alt=""></p><h3 id="npm-hosted" tabindex="-1">npm-hosted <a class="header-anchor" href="#npm-hosted" aria-hidden="true">#</a></h3><p>输入Name，选择Blob store和Deployment policy。</p><ul><li>Name：定义一个名称npm-hosted。</li><li>Blob store：我们下拉选择前面创建好的专用blob：npm-blob。</li><li>Deployment policy：开发环境，我们运行重复发布，因此Delpoyment policy 我们选择Allow redeploy。</li></ul><p><img src="'+b+'" alt=""></p><h3 id="npm-proxy" tabindex="-1">npm-proxy <a class="header-anchor" href="#npm-proxy" aria-hidden="true">#</a></h3><p>输入Name，远程仓库地址以及选择Blob store。</p><ul><li>Name：定义一个名称npm-proxy。</li><li>Remote storage：上游远程仓库地址，这里填写: <a href="https://registry.npmjs.org" target="_blank" rel="noreferrer">https://registry.npmjs.org</a>也可以填写淘宝镜像地址。</li><li>Blob store：和hosted一样选择我们创建好的npm-blob。</li></ul><p><img src="'+C+'" alt=""></p><h3 id="npm-group" tabindex="-1">npm-group <a class="header-anchor" href="#npm-group" aria-hidden="true">#</a></h3><p>同样输入名称Name，选择创建好的Blob store 把前两个创建的代理仓库（npm-proxy）和私有仓库（npm-hosted）从Avaliable区移动到Members区即可。</p><p><img src="'+x+'" alt=""></p><p>创建完成后即可使用了。</p><p>首先我们获取一下npm-group对外提供的地址即私库地址。 <img src="'+_+`" alt=""></p><p>然后我们可以使用npm install命令来安装依赖包。</p><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--registry</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">http://ip:port/repository/npm-group/</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="参考文章" tabindex="-1">参考文章 <a class="header-anchor" href="#参考文章" aria-hidden="true">#</a></h2><ul><li><a href="https://wiki.eryajf.net/pages/1803.html" target="_blank" rel="noreferrer">二丫讲梵-nexus的安装</a></li><li><a href="https://blog.csdn.net/HuangsTing/article/details/125146287" target="_blank" rel="noreferrer">【Windows】使用Nexus搭建npm私库，管理npm包，并在项目中下载</a></li></ul>`,71),j=[A];function D(f,F,v,k,B,N){return n(),e("div",null,j)}const $=s(E,[["render",D]]);export{M as __pageData,$ as default};
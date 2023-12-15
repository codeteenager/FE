import{_ as e,o as a,c as r,R as l,dS as i,dT as o,dU as t,dV as s,dW as d,dX as n}from"./chunks/framework.6CQuoEcp.js";const q=JSON.parse('{"title":"Node.js介绍","description":"","frontmatter":{},"headers":[],"relativePath":"web/node/index.md","filePath":"web/node/index.md","lastUpdated":1683265897000}'),p={name:"web/node/index.md"},h=l('<h1 id="node-js介绍" tabindex="-1">Node.js介绍 <a class="header-anchor" href="#node-js介绍" aria-label="Permalink to &quot;Node.js介绍&quot;">​</a></h1><p>Node.js成为大前端开发过程中必备的一项技能，利用Node.js我们不仅可以去实现轻量级、可扩展伸缩的高性能Web服务器，还可以去做同构的JavaScript开发，更可以实现便携高效的前端工程化。</p><h2 id="node-js架构" tabindex="-1">Node.js架构 <a class="header-anchor" href="#node-js架构" aria-label="Permalink to &quot;Node.js架构&quot;">​</a></h2><p>Node.js核心分为三大部分 <img src="'+i+'" alt=""> 最上层是Native modules，里面的内容都是js来实现的，他提供了当前应用程序直接调用的库， 也就是我们所说的内置核心模块，例如fs、path、http等。我们都知道JS语言无法直接操作底层硬件设置，如果想通信是需要一个桥梁的，而Builtin modules就是这个桥梁，通过这个桥梁就可以让Node.js核心模块获取具体的服务支持，从而去完成更底层的操作，例如文件的读写行为，就可以使用Node、C/C++ Bindings来进行表示。</p><p>最下层主要是v8、libuv和具体的功能模块。v8的功能主要有两个，一个是执行JS代码，另一个是提供桥梁接口。libuv提供事件循环、事件队列和异步IO。</p><h2 id="为什么是node-js" tabindex="-1">为什么是Node.js <a class="header-anchor" href="#为什么是node-js" aria-label="Permalink to &quot;为什么是Node.js&quot;">​</a></h2><p>Node.js在诞生之初是为了实现高性能的web服务器，慢慢演化为一门服务端语言。我们看一下用户发送请求到获取数据的整个过程。 <img src="'+o+'" alt=""> 用户通过客户端向服务端发送请求获取数据，服务端获取请求后依据业务逻辑返回数据即可。在忽略网络带宽、硬件性能等客观条件之后，真正影响用户获取数据速度的也就是IO的时间消耗。IO是计算机操作过程中最缓慢的环节，访问RAM这样级别设备的IO时间消耗是纳秒级别，而在磁盘网络中的时间消耗是毫秒级别的。也就是说数据的读写操作终归是有时间消耗的。</p><p>如果服务器有一个长时间等待的IO行为，后续的任务不能得到及时的响应。而Node.js借助Reactor模式，使用JS单线程完成多线程的工作，实现异步IO、事件驱动。因此Node.js适用于IO密集型高并发请求。</p><p>IO分为阻塞IO和非阻塞IO，即能不能立即获取调用之后返回的结果。当采用非阻塞IO的时候cpu的时间片就可以拿出来处理其他事务，这对性能就有所提升。但是这种操作也存在问题，因为立即返回的并不是业务层真正期望得到的实际数据，而仅仅是当前的调用状态，而操作系统为了获取完整的数据，就会让程序重复调用IO操作，判断IO是否结束。我们将重复调用IO操作来判断IO是否完成的技术去叫做轮询。</p><p>常见的轮询技术有：read、select、poll、kqueue、event ports。</p><p><img src="'+t+'" alt=""></p><p>libuv库可以看做是几种不同的异步IO实现方式的抽象封装层，例如在类unix下的epoll接口，windows下的IOCP，当我们运行一段Node.js编写的代码之后最终会走到libuv库这个环境中来的，而他就可以对当前的平台进行判断，然后再依据平台再去调用相应的异步IO处理的方法。</p><p>那Node处理异步IO的过程是啥样的？ <img src="'+s+'" alt=""></p><p>那么IO是应用程序的瓶颈所在，异步IO提高性能无需等待结果返回，IO操作属于操作系统级别，平台都有对应实现。Node.js单线程配合事件驱动架构及libuv实现了异步IO。</p><h2 id="单线程" tabindex="-1">单线程 <a class="header-anchor" href="#单线程" aria-label="Permalink to &quot;单线程&quot;">​</a></h2><ol><li>Node.js虽然是单线程的机制，但是我们使用它配合异步IO和事件循环可以实现高并发的请求</li><li>Node.js单线程指的是运行JS代码的主线程是单线程的。 但在libuv库中存放多个线程的线程池。</li><li>Node.js单线程也就决定他不适合处理cpu密集型任务的</li></ol><h2 id="应用场景" tabindex="-1">应用场景 <a class="header-anchor" href="#应用场景" aria-label="Permalink to &quot;应用场景&quot;">​</a></h2><ol><li><p>IO密集型高并发请求，很多企业在前端和大后端之间搭建BFF层，不仅能提高吞吐量，也能够很好的处理数据。 <img src="'+d+'" alt=""></p></li><li><p>在不关注大量业务逻辑情况也，也可以操作数据库提供API服务，这样可以很高效的搭建轻量的api服务。</p></li><li><p>实现聊天应用程序</p></li></ol><h2 id="全局对象" tabindex="-1">全局对象 <a class="header-anchor" href="#全局对象" aria-label="Permalink to &quot;全局对象&quot;">​</a></h2><p>Node.js全局对象上挂载许多属性，与浏览器平台的window不完全相同。全局对象可以看做是JavaScript中的特殊对象，因为它和它身上的所有属性可以在任何地方被访问到，而且我们自己也无需对它进行提前的定义。在浏览器中全局对象是window，在Node.js中全局对象是global，global的根本作用就是作为全局变量的宿主。</p><p>常见全局变量有：</p><ul><li>__filename：返回正在执行脚本文件的绝对路径</li><li>__dirname：返回正在执行脚本所在目录</li><li>timer类函数：执行顺序与事件循环间的关系</li><li>process：提供与当前进程互动的接口</li><li>require：实现模块的加载</li><li>module、exports：处理模块的导出</li></ul><h2 id="底层原理" tabindex="-1">底层原理 <a class="header-anchor" href="#底层原理" aria-label="Permalink to &quot;底层原理&quot;">​</a></h2><p><img src="'+n+'" alt=""></p><ul><li><a href="https://theanarkh.github.io/understand-nodejs/" target="_blank" rel="noreferrer">Node.js 源码剖析</a></li></ul><h2 id="node-js大厂实践" tabindex="-1">Node.js大厂实践 <a class="header-anchor" href="#node-js大厂实践" aria-label="Permalink to &quot;Node.js大厂实践&quot;">​</a></h2><ul><li><a href="https://mp.weixin.qq.com/s/ghciI1dj9dve6Bsrf8Yj1w" target="_blank" rel="noreferrer">基于阿里云的 Node.js 稳定性实践</a></li><li><a href="https://mp.weixin.qq.com/s/f5xIN9d7s011_gXej84MJw" target="_blank" rel="noreferrer">独家解读：淘宝使用 Node.js 的 TypeScript 多场景开发和实践</a></li><li><a href="https://zhuanlan.zhihu.com/p/101917567" target="_blank" rel="noreferrer">“云”端的语雀：用 JavaScript 全栈打造商业级应用</a></li><li><a href="https://mp.weixin.qq.com/s/wIYlSPSJSK2eHbk48SFQLw" target="_blank" rel="noreferrer">蚂蚁金服 Node.js 开荒史 - 摸爬滚打才不负功名尘土</a></li><li><a href="https://mp.weixin.qq.com/s/NU7Hm96-cngvUCOF2LOpMA" target="_blank" rel="noreferrer">干货 | 携程机票Node.js开发实践</a></li><li><a href="https://mp.weixin.qq.com/s/ndPlZJWM9pxusGMY8C0eyA" target="_blank" rel="noreferrer">Node.js在携程的落地和最佳实践</a></li><li><a href="https://zhuanlan.zhihu.com/p/138925672" target="_blank" rel="noreferrer">网易智慧企业Node.js实践（1） ： Node应用架构设计和React同构</a></li><li><a href="https://zhuanlan.zhihu.com/p/142547821" target="_blank" rel="noreferrer">网易智慧企业 Node.js 实践（2）| 平滑发布和前端代码</a></li><li><a href="https://zhuanlan.zhihu.com/p/142551285" target="_blank" rel="noreferrer">网易智慧企业 Node.js 实践（3）| 灰度环境和应用监控</a></li></ul>',27),c=[h];function u(_,m,j,b,N,f){return a(),r("div",null,c)}const O=e(p,[["render",u]]);export{q as __pageData,O as default};
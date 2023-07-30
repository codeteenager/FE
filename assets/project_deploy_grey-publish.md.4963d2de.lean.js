import{_ as e,v as l,b as a,R as r}from"./chunks/framework.a626a558.js";const i="/FE/project/38.png",u=JSON.parse('{"title":"灰度发布","description":"","frontmatter":{},"headers":[],"relativePath":"project/deploy/grey-publish.md","filePath":"project/deploy/grey-publish.md","lastUpdated":1683265897000}'),t={name:"project/deploy/grey-publish.md"},o=r('<h1 id="灰度发布" tabindex="-1">灰度发布 <a class="header-anchor" href="#灰度发布" aria-label="Permalink to &quot;灰度发布&quot;">​</a></h1><p>随着互联网的发展，网页的用户规模不断增大、版本更新越来越频繁。每次新版本上线都存在风险，产品人员都要承受极大的压力，而灰度发布很好地规避了这种风险。</p><p>灰度发布（又名金丝雀发布）指在黑与白之间平滑过渡的发布方式。它可以让一部分用户继续使用老版本的功能，一部分用户开始尝试使用新版本的功能。如果新版本的功能没有出现问题，并且用户对新版本的功能没有什么反对意见，那么可以逐步进行灰度放量，把所有用户都迁移到新版本上。如果出现问题，那么开发人员可以及时进行功能回滚或者灰度缩量，控制影响范围。灰度发布中的关键词释义如下。</p><ul><li>灰度期：灰度发布从开始到结束的时间被称为灰度期。</li><li>灰度放量：在灰度期内扩大测试用户范围。</li><li>灰度缩量：在灰度期内缩小测试用户范围。</li><li>灰度全量：灰度放量达到100%，即覆盖了所有用户。</li><li>灰度标识：用于区分当前用户是否在灰度内。</li><li>灰度用户：带有灰度标识的用户。</li><li>灰度应用：灰度发布后的新版本应用，即带有灰度标识的用户访问的应用。</li><li>灰度分流：根据用户的灰度标志来访问不同的版本。</li><li>放量策略：灰度期间用来分流的判断条件。</li><li>流量入口：所有请求进入服务端的统一入口，分流一般在这里进行。</li><li>多灰度并行：生产环境同时有多个灰度版本在运行。</li></ul><p>灰度发布可以有效保证整体系统的稳定性。如果本次上线的功能存在隐患，那么在灰度期或许就能发现并修复问题，以控制问题的影响范围。总而言之，灰度发布的本质就是将新旧版本隔离开，降低发布风险。</p><h2 id="灰度发布方案" tabindex="-1">灰度发布方案 <a class="header-anchor" href="#灰度发布方案" aria-label="Permalink to &quot;灰度发布方案&quot;">​</a></h2><p>我们先把线上的稳定版本称为stable版，本次发布的新功能版本称为beta版。开发人员给stable和beta版本各自启动了nginx服务，在运维层启动了一层入口nginx服务，作为转发。</p><p>客户端通过域名访问项目，通过请求灰度规则，命中灰度规则后，并给客户端设置cookie作为标识，并将用户标识存放到redis，将用户重定向到指定的版本</p><p>灰度规则接口请求的时候，如果已经带有cookie则直接返回对应版本，不存在cookie则去查找redis，redis中存在对应信息则直接返回，如果不存在则走灰度规则识别流程</p><p>前端sdk功能：用于控制发起灰度规则请求的时机、回调操作和其他业务操作，sdk的使用场景：项目中需要在特定的时机触发灰度功能，点击某个按钮，或者进入某个页面，比如某些应用是会弹出弹窗，告诉用户有内测版本，是否需要体验，点击同意后才跳转到灰度版本。</p><p><img src="'+i+'" alt=""></p><h2 id="相关文章" tabindex="-1">相关文章 <a class="header-anchor" href="#相关文章" aria-label="Permalink to &quot;相关文章&quot;">​</a></h2><ul><li><a href="https://www.cnblogs.com/lvdabao/p/11920919.html" target="_blank" rel="noreferrer">一种前端灰度发布方案</a></li><li><a href="https://mp.weixin.qq.com/s/xdl_m1dJ9HcabASF-bwnoA" target="_blank" rel="noreferrer">灰度发布探索与实践</a></li><li><a href="https://mp.weixin.qq.com/s/HGx9crVk_mGGR--mhnJEXQ" target="_blank" rel="noreferrer">Vue灰度发布新功能的那些事</a></li><li><a href="https://cloud.tencent.com/developer/article/1887735" target="_blank" rel="noreferrer">前端灰度发布落地方案</a></li></ul>',13),s=[o];function p(n,c,d,h,b,m){return l(),a("div",null,s)}const f=e(t,[["render",p]]);export{u as __pageData,f as default};

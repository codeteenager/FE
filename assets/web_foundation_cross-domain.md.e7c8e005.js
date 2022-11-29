import{_ as e,c as a,o as t,a as s}from"./app.233c3cc6.js";const w=JSON.parse('{"title":"\u8DE8\u57DF","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u540C\u6E90\u7B56\u7565\u4EE5\u53CA\u5206\u7C7B","slug":"\u540C\u6E90\u7B56\u7565\u4EE5\u53CA\u5206\u7C7B","link":"#\u540C\u6E90\u7B56\u7565\u4EE5\u53CA\u5206\u7C7B","children":[]},{"level":2,"title":"\u8DE8\u57DF\u89E3\u51B3\u65B9\u6848","slug":"\u8DE8\u57DF\u89E3\u51B3\u65B9\u6848","link":"#\u8DE8\u57DF\u89E3\u51B3\u65B9\u6848","children":[{"level":3,"title":"JSONP","slug":"jsonp","link":"#jsonp","children":[]},{"level":3,"title":"CORS\uFF08Cross-Origin Resource Sharing\uFF09,\u8DE8\u57DF\u8D44\u6E90\u5171\u4EAB","slug":"cors-cross-origin-resource-sharing-\u8DE8\u57DF\u8D44\u6E90\u5171\u4EAB","link":"#cors-cross-origin-resource-sharing-\u8DE8\u57DF\u8D44\u6E90\u5171\u4EAB","children":[]},{"level":3,"title":"\u8BBE\u7F6Edocument.domain\u89E3\u51B3\u65E0\u6CD5\u8BFB\u53D6\u975E\u540C\u6E90\u7F51\u9875\u7684 Cookie\u95EE\u9898","slug":"\u8BBE\u7F6Edocument-domain\u89E3\u51B3\u65E0\u6CD5\u8BFB\u53D6\u975E\u540C\u6E90\u7F51\u9875\u7684-cookie\u95EE\u9898","link":"#\u8BBE\u7F6Edocument-domain\u89E3\u51B3\u65E0\u6CD5\u8BFB\u53D6\u975E\u540C\u6E90\u7F51\u9875\u7684-cookie\u95EE\u9898","children":[]},{"level":3,"title":"window.postMessage()","slug":"window-postmessage","link":"#window-postmessage","children":[]},{"level":3,"title":"websocket","slug":"websocket","link":"#websocket","children":[]},{"level":3,"title":"\u53CD\u5411\u4EE3\u7406","slug":"\u53CD\u5411\u4EE3\u7406","link":"#\u53CD\u5411\u4EE3\u7406","children":[]}]},{"level":2,"title":"\u603B\u7ED3","slug":"\u603B\u7ED3","link":"#\u603B\u7ED3","children":[]}],"relativePath":"web/foundation/cross-domain.md","lastUpdated":1669737152000}'),n={name:"web/foundation/cross-domain.md"},l=s(`<h1 id="\u8DE8\u57DF" tabindex="-1">\u8DE8\u57DF <a class="header-anchor" href="#\u8DE8\u57DF" aria-hidden="true">#</a></h1><p>\u8DE8\u57DF\u662F\u6307\u4E00\u4E2A\u57DF\u4E0B\u7684\u6587\u6863\u6216\u811A\u672C\u8BD5\u56FE\u53BB\u8BF7\u6C42\u53E6\u4E00\u4E2A\u57DF\u4E0B\u7684\u8D44\u6E90\uFF0C\u8FD9\u91CC\u8DE8\u57DF\u662F\u5E7F\u4E49\u7684\u3002\u5E7F\u4E49\u7684\u8DE8\u57DF\u5305\u62EC\uFF1A</p><ul><li>\u8D44\u6E90\u8DF3\u8F6C: \u94FE\u63A5\uFF0C\u91CD\u5B9A\u5411\uFF0C\u8868\u5355\u63D0\u4EA4</li><li>\u8D44\u6E90\u5D4C\u5165: <code>&lt;link&gt;</code>\uFF0C<code>&lt;script&gt;</code>\uFF0C<code>&lt;img&gt;</code>\uFF0C<code>&lt;iframe&gt;</code>\u7B49 DOM \u6807\u7B7E</li><li>\u811A\u672C\u8BF7\u6C42: javascript \u53D1\u8D77\u7684 Ajax \u8BF7\u6C42\u7B49</li></ul><p>\u901A\u5E38\u6240\u8BF4\u7684\u8DE8\u57DF\u662F\u72ED\u4E49\u7684\uFF0C\u662F\u7531\u6D4F\u89C8\u5668\u540C\u6E90\u7B56\u7565\u9650\u5236\u7684\u4E00\u7C7B\u8BF7\u6C42\u573A\u666F\uFF0C\u662F\u6D4F\u89C8\u5668\u5BF9JavaScript\u5B9E\u65BD\u7684\u5B89\u5168\u9650\u5236\uFF0C\u5982\u679C\u4E24\u4E2A\u57DF\u540D\u7684\u534F\u8BAE\uFF0C\u57DF\u540D\uFF0C\u7AEF\u53E3\u90FD\u76F8\u540C\uFF0C\u90A3\u6211\u4EEC\u5C31\u8BF4\u8FD9\u4E24\u4E2A\u57DF\u540D\u662F\u540C\u6E90\u7684\u3002\u4ECE\u4E00\u4E2A\u57DF\u540D\u7684\u7F51\u9875\u53BB\u8BF7\u6C42\u53E6\u4E00\u4E2A\u57DF\u540D\u7684\u8D44\u6E90\u65F6\uFF0C\u57DF\u540D\u3001\u7AEF\u53E3\u3001\u534F\u8BAE\u4EFB\u4E00\u4E0D\u540C\uFF0C\u90FD\u662F\u8DE8\u57DF\u3002</p><table><thead><tr><th>\u5F53\u524D\u9875\u9762url</th><th>\u88AB\u8BF7\u6C42\u9875\u9762url</th><th>\u662F\u5426\u8DE8\u57DF</th><th>\u539F\u56E0</th></tr></thead><tbody><tr><td><a href="http://www.jiangshuaijie.cn" target="_blank" rel="noreferrer">http://www.jiangshuaijie.cn</a></td><td><a href="http://www.jiangshuaijie.cn/index.html" target="_blank" rel="noreferrer">http://www.jiangshuaijie.cn/index.html</a></td><td>\u5426</td><td>\u540C\u6E90\uFF08\u534F\u8BAE\u3001\u57DF\u540D\u3001\u7AEF\u53E3\u53F7\u76F8\u540C\uFF09</td></tr><tr><td><a href="http://www.jiangshuaijie.cn" target="_blank" rel="noreferrer">http://www.jiangshuaijie.cn</a></td><td><a href="http://www.jiangshuaijie.cn/index.html" target="_blank" rel="noreferrer">http://www.jiangshuaijie.cn/index.html</a></td><td>\u662F</td><td>\u534F\u8BAE\u4E0D\u540C\uFF08http/https\uFF09</td></tr><tr><td><a href="http://www.jiangshuaijie.cn" target="_blank" rel="noreferrer">http://www.jiangshuaijie.cn</a></td><td><a href="http://www.baidu.com" target="_blank" rel="noreferrer">http://www.baidu.com</a></td><td>\u662F</td><td>\u4E3B\u57DF\u540D\u4E0D\u540C</td></tr><tr><td><a href="http://www.jiangshuaijie.cn" target="_blank" rel="noreferrer">http://www.jiangshuaijie.cn</a></td><td><a href="http://blog.jiangshuaijie.cn" target="_blank" rel="noreferrer">http://blog.jiangshuaijie.cn</a></td><td>\u662F</td><td>\u5B50\u57DF\u540D\u4E0D\u540C\uFF08www/blog\uFF09</td></tr><tr><td><a href="http://www.jiangshuaijie.cn:8080" target="_blank" rel="noreferrer">http://www.jiangshuaijie.cn:8080</a></td><td><a href="http://www.jiangshuaijie.cn:7001" target="_blank" rel="noreferrer">http://www.jiangshuaijie.cn:7001</a></td><td>\u662F</td><td>\u7AEF\u53E3\u53F7\u4E0D\u540C\uFF088080/7001\uFF09</td></tr></tbody></table><h2 id="\u540C\u6E90\u7B56\u7565\u4EE5\u53CA\u5206\u7C7B" tabindex="-1">\u540C\u6E90\u7B56\u7565\u4EE5\u53CA\u5206\u7C7B <a class="header-anchor" href="#\u540C\u6E90\u7B56\u7565\u4EE5\u53CA\u5206\u7C7B" aria-hidden="true">#</a></h2><p>\u540C\u6E90\u7B56\u7565\uFF08same origin policy\uFF09\u662FnetScape\uFF08\u7F51\u666F\uFF09\u63D0\u51FA\u7684\u4E00\u4E2A\u5B89\u5168\u7B56\u7565\uFF0C\u5B83\u662F\u6D4F\u89C8\u5668\u6700\u6838\u5FC3\u4E5F\u6700\u57FA\u672C\u7684\u5B89\u5168\u529F\u80FD\uFF0C\u5982\u679C\u7F3A\u5C11\u4E86\u540C\u6E90\u7B56\u7565\uFF0C\u6D4F\u89C8\u5668\u5F88\u5BB9\u6613\u53D7\u5230XSS\u3001CSFR\u7B49\u653B\u51FB\u3002\u5177\u4F53\u8868\u73B0\u4E3A\u6D4F\u89C8\u5668\u5728\u6267\u884C\u811A\u672C\u524D\uFF0C\u4F1A\u5224\u65AD\u811A\u672C\u662F\u5426\u4E0E\u6253\u5F00\u7684\u7F51\u9875\u662F\u540C\u6E90\u7684\uFF0C\u5224\u65AD\u534F\u8BAE\u3001\u57DF\u540D\u3001\u7AEF\u53E3\u662F\u5426\u90FD\u76F8\u540C\uFF0C\u76F8\u540C\u5219\u8868\u793A\u540C\u6E90\u3002\u5176\u4E2D\u4E00\u9879\u4E0D\u76F8\u540C\u5C31\u8868\u793A\u8DE8\u57DF\u8BBF\u95EE\u3002\u4F1A\u5728\u63A7\u5236\u53F0\u62A5\u4E00\u4E2ACORS\u5F02\u5E38\uFF0C\u76EE\u7684\u662F\u4E3A\u4E86\u4FDD\u62A4\u672C\u5730\u6570\u636E\u4E0D\u88ABJavaScript\u4EE3\u7801\u83B7\u53D6\u56DE\u6765\u7684\u6570\u636E\u6C61\u67D3\uFF0C\u56E0\u6B64\u62E6\u622A\u7684\u662F\u5BA2\u6237\u7AEF\u53D1\u51FA\u7684\u8BF7\u6C42\u56DE\u6765\u7684\u6570\u636E\u63A5\u6536\uFF0C\u5373\u8BF7\u6C42\u53D1\u9001\u4E86\uFF0C\u670D\u52A1\u5668\u54CD\u5E94\u4E86\uFF0C\u4F46\u662F\u65E0\u6CD5\u88AB\u6D4F\u89C8\u5668\u63A5\u6536\u3002</p><p>\u6D4F\u89C8\u5668\u91C7\u7528\u540C\u6E90\u7B56\u7565\uFF0C\u5728\u6CA1\u6709\u660E\u786E\u6388\u6743\u7684\u60C5\u51B5\u4E0B\uFF0C\u7981\u6B62\u9875\u9762\u52A0\u8F7D\u6216\u6267\u884C\u4E0E\u81EA\u8EAB\u4E0D\u540C\u6E90\u7684\u4EFB\u4F55\u811A\u672C\u3002</p><p>\u540C\u6E90\u7B56\u7565\u5206\u7C7B\uFF1A</p><ol><li>DOM \u540C\u6E90\u7B56\u7565\uFF1A \u7981\u6B62\u5BF9\u4E0D\u540C\u6E90\u9875\u9762 DOM \u8FDB\u884C\u64CD\u4F5C\u3002\u8FD9\u91CC\u4E3B\u8981\u573A\u666F\u662F iframe \u8DE8\u57DF\u7684\u60C5\u51B5\uFF0C\u4E0D\u540C\u57DF\u540D\u7684 iframe \u662F\u9650\u5236\u4E92\u76F8\u8BBF\u95EE\u7684(\u6BD4\u5982\u4E00\u4E2A\u6076\u610F\u7F51\u7AD9\u7684\u9875\u9762\u901A\u8FC7iframe\u5D4C\u5165\u4E86\u94F6\u884C\u7684\u767B\u5F55\u9875\u9762\uFF08\u4E8C\u8005\u4E0D\u540C\u6E90\uFF09\uFF0C\u5982\u679C\u6CA1\u6709\u540C\u6E90\u9650\u5236\uFF0C\u6076\u610F\u7F51\u9875\u4E0A\u7684javascript\u811A\u672C\u5C31\u53EF\u4EE5\u5728\u7528\u6237\u767B\u5F55\u94F6\u884C\u7684\u65F6\u5019\u83B7\u53D6\u7528\u6237\u540D\u548C\u5BC6\u7801)</li><li>XMLHttpRequest \u540C\u6E90\u7B56\u7565\uFF1A \u7981\u6B62\u4F7F\u7528 XHR \u5BF9\u8C61\u5411\u4E0D\u540C\u6E90\u7684\u670D\u52A1\u5668\u5730\u5740\u53D1\u8D77 HTTP \u8BF7\u6C42(\u8FD9\u4E00\u70B9\u91CC\u9762\u5176\u5B9E\u5305\u62EC\u4E86 ajax)</li><li>Cookie\u3001LocalStorage\u3001IndexedDB \u7B49\u5B58\u50A8\u6027\u5185\u5BB9\u540C\u6E90\u7B56\u7565\uFF1A js\u4E2D\u65E0\u6CD5\u8BBF\u95EE\u4E0D\u5C5E\u4E8E\u540C\u4E2A\u6E90\u7684cookie\u3001LocalStorage\u4E2D\u5B58\u50A8\u7684\u5185\u5BB9\u3002</li></ol><p>\u4E0D\u53D7\u540C\u6E90\u7B56\u7565\u9650\u5236\u7684\uFF1A</p><ol><li>\u9875\u9762\u4E2D\u7684\u94FE\u63A5\uFF0C\u91CD\u5B9A\u5411\u4EE5\u53CA\u8868\u5355\u63D0\u4EA4\u662F\u4E0D\u4F1A\u53D7\u5230\u540C\u6E90\u7B56\u7565\u9650\u5236\u7684(\u672A\u6388\u6743\u60C5\u51B5\u4E0B\uFF0Cajax \u7684\u8868\u5355\u63D0\u4EA4\u662F\u4E0D\u88AB\u5141\u8BB8\u7684,\u4F46\u662F\u666E\u901A\u7684\u8868\u5355\u662F\u53EF\u4EE5\u76F4\u63A5\u8DE8\u57DF\u7684)\u3002</li><li><code>&lt;script&gt;</code>\u3001<code>&lt;img&gt;</code>\u3001<code>&lt;link&gt;</code>\u8FD9\u4E9B\u5305\u542B src \u5C5E\u6027\u7684\u6807\u7B7E\u53EF\u4EE5\u52A0\u8F7D\u8DE8\u57DF\u8D44\u6E90\u3002\u4F46\u6D4F\u89C8\u5668\u9650\u5236\u4E86JavaScript\u7684\u6743\u9650\u4F7F\u5176\u4E0D\u80FD\u8BFB\u3001\u5199\u52A0\u8F7D\u7684\u5185\u5BB9</li></ol><p><code>&lt;script&gt;</code>\u3001<code>&lt;img&gt;</code>\u3001<code>&lt;link&gt;</code>\u4E09\u4E2A\u6807\u7B7E\u7684\u4F7F\u7528\u573A\u666F\uFF1A</p><ol><li><code>&lt;img&gt;</code>\uFF1A\u7528\u4E8E\u6253\u70B9\u7EDF\u8BA1\uFF0C\u7EDF\u8BA1\u7F51\u7AD9\u53EF\u80FD\u662F\u5176\u4ED6\u57DF\uFF0C\u6BD4\u5982\u6211\u4EEC\u81EA\u5DF1\u505A\u4E00\u4E2A\u7F51\u7AD9\uFF0C\u4E0D\u53EF\u80FD\u518D\u642D\u5EFA\u4E00\u4E2A\u7EDF\u8BA1\u7684\u540E\u53F0\uFF0C\u800C\u662F\u76F4\u63A5\u91C7\u7528\u7B2C\u4E09\u65B9\u7684\u7EDF\u8BA1\u5E73\u53F0\uFF0C\u4F8B\u5982\u767E\u5EA6\u7EDF\u8BA1\u5E73\u53F0\u3001\u7AD9\u957F\u7EDF\u8BA1\u5E73\u53F0\uFF0C\u800C\u4E14img\u6CA1\u6709\u6D4F\u89C8\u5668\u517C\u5BB9\u6027\u7684\u95EE\u9898\u3002</li><li><code>&lt;script&gt;</code>\u3001<code>&lt;link&gt;</code>\uFF1A\u53EF\u4EE5\u4F7F\u7528CDN\uFF0CCDN\u7684\u4E5F\u662F\u5176\u4ED6\u57DF</li><li><code>&lt;script&gt;</code>\uFF1A\u53EF\u4EE5\u7528\u4E8EJSONP</li></ol><h2 id="\u8DE8\u57DF\u89E3\u51B3\u65B9\u6848" tabindex="-1">\u8DE8\u57DF\u89E3\u51B3\u65B9\u6848 <a class="header-anchor" href="#\u8DE8\u57DF\u89E3\u51B3\u65B9\u6848" aria-hidden="true">#</a></h2><h3 id="jsonp" tabindex="-1">JSONP <a class="header-anchor" href="#jsonp" aria-hidden="true">#</a></h3><p>JSONP \u662F\u670D\u52A1\u5668\u4E0E\u5BA2\u6237\u7AEF\u8DE8\u6E90\u901A\u4FE1\u7684\u5E38\u7528\u65B9\u6CD5\u3002\u6700\u5927\u7279\u70B9\u5C31\u662F\u7B80\u5355\u9002\u7528\uFF0C\u517C\u5BB9\u6027\u597D\uFF08\u517C\u5BB9\u4F4E\u7248\u672CIE\uFF09\uFF0C\u7F3A\u70B9\u662F\u53EA\u652F\u6301get\u8BF7\u6C42\uFF0C\u4E0D\u652F\u6301post\u8BF7\u6C42\u3002</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    window.callback = function(data)</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;">//\u8FD9\u662F\u6211\u4EEC\u8DE8\u57DF\u5F97\u5230\u7684\u4FE1\u606F</span></span>
<span class="line"><span style="color:#A6ACCD;">        console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(data);</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">src</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">http://www.xxx.com/xxx.js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#676E95;">//\u4EE5\u4E0A\u5C06\u8FD4\u56DEcallback({x:100,y:100})</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>\u5148\u5B9A\u4E49window.callback\u7684\u51FD\u6570\uFF0C\u7136\u540E\u4F7F\u7528script\u52A0\u8F7D\u5730\u5740\uFF0C\u8FD9\u4E2A\u5730\u5740\u8FD4\u56DEcallback\u51FD\u6570\u8FDB\u884C\u6267\u884C\uFF0C\u8FD9\u6837\u5C31\u53EF\u4EE5\u8C03\u7528window.callback\u51FD\u6570\u6253\u5370callback\u4F20\u9012\u7684\u6570\u636E\u3002</p><h3 id="cors-cross-origin-resource-sharing-\u8DE8\u57DF\u8D44\u6E90\u5171\u4EAB" tabindex="-1">CORS\uFF08Cross-Origin Resource Sharing\uFF09,\u8DE8\u57DF\u8D44\u6E90\u5171\u4EAB <a class="header-anchor" href="#cors-cross-origin-resource-sharing-\u8DE8\u57DF\u8D44\u6E90\u5171\u4EAB" aria-hidden="true">#</a></h3><p>CORS\u9700\u8981\u6D4F\u89C8\u5668\u548C\u670D\u52A1\u5668\u540C\u65F6\u652F\u6301\u3002\u76EE\u524D\uFF0C\u6240\u6709\u6D4F\u89C8\u5668\u90FD\u652F\u6301\u8BE5\u529F\u80FD(IE\u6D4F\u89C8\u5668\u4E0D\u80FD\u4F4E\u4E8EIE10)\uFF0C\u56E0\u6B64\uFF0C\u5B9E\u73B0CORS\u901A\u4FE1\u7684\u5173\u952E\u662F\u670D\u52A1\u5668\u3002\u53EA\u8981\u670D\u52A1\u5668\u5B9E\u73B0\u4E86CORS\u63A5\u53E3\uFF0C\u5C31\u53EF\u4EE5\u8DE8\u6E90\u901A\u4FE1\u3002</p><p>\u6D4F\u89C8\u5668\u5C06CORS\u8BF7\u6C42\u5206\u6210\u4E24\u7C7B\uFF1A\u7B80\u5355\u8BF7\u6C42\uFF08simple request\uFF09\u548C\u975E\u7B80\u5355\u8BF7\u6C42\uFF08not-so-simple request\uFF09</p><ol><li>\u8BF7\u6C42\u65B9\u6CD5\u662F\u4EE5\u4E0B\u4E09\u79CD\u65B9\u6CD5\u4E4B\u4E00\uFF1AHEAD GET POST</li><li>HTTP\u7684\u5934\u4FE1\u606F\u4E0D\u8D85\u51FA\u4EE5\u4E0B\u51E0\u79CD\u5B57\u6BB5\uFF1AAccept Accept-Language Content-Language Last-Event-ID</li></ol><p>Content-Type\uFF1A\u53EA\u9650\u4E8E\u4E09\u4E2A\u503Capplication/x-www-form-urlencoded\u3001multipart/form-data\u3001text/plain \u51E1\u662F\u4E0D\u540C\u65F6\u6EE1\u8DB3\u4E0A\u9762\u4E24\u4E2A\u6761\u4EF6\uFF0C\u5C31\u5C5E\u4E8E\u975E\u7B80\u5355\u8BF7\u6C42\u3002</p><p>\u5BF9\u4E8E\u7B80\u5355\u8BF7\u6C42\uFF0C\u6D4F\u89C8\u5668\u5728\u53D1\u51FACORS\u8BF7\u6C42\u65F6\u4F1A\u5728\u5934\u4FE1\u606F\u4E4B\u4E2D\u589E\u52A0\u4E00\u4E2AOrigin\u5B57\u6BB5\u3002\u670D\u52A1\u5668\u7684\u8FD4\u56DE\u4F1A\u591A\u51FA3\u4E2A\u5B57\u6BB5\uFF1A</p><ul><li>Access-Control-Allow-Origin(\u5FC5\u987B) \u5141\u8BB8\u8DE8\u57DF\u7684\u6E90</li><li>Access-Control-Allow-Credentials(\u53EF\u9009) \u8868\u793A\u662F\u5426\u5141\u8BB8\u53D1\u9001Cookie\u3002\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0CCookie\u53EF\u4EE5\u5305\u542B\u5728\u8BF7\u6C42\u4E2D\uFF0C\u4E00\u8D77\u53D1\u7ED9\u670D\u52A1\u5668\uFF0C\u5982\u679C\u670D\u52A1\u5668\u4E0D\u9700\u8981\u6D4F\u89C8\u5668\u53D1\u9001Cookie\uFF0C\u5220\u9664\u8BE5\u5B57\u6BB5\u5373\u53EF\u3002</li><li>Access-Control-Expose-Headers(\u53EF\u9009) CORS\u8BF7\u6C42\u65F6\uFF0CXMLHttpRequest\u5BF9\u8C61\u7684getResponseHeader()\u65B9\u6CD5\u53EA\u80FD\u62FF\u52306\u4E2A\u57FA\u672C\u5B57\u6BB5\uFF1ACache-Control\u3001Content-Language\u3001Content-Type\u3001Expires\u3001Last-Modified\u3001Pragma\u3002\u5982\u679C\u60F3\u62FF\u5230\u5176\u4ED6\u5B57\u6BB5\uFF0C\u5C31\u5FC5\u987B\u5728Access-Control-Expose-Headers\u91CC\u9762\u6307\u5B9A\u3002\u5982\u6307\u5B9AAccess-Control-Expose-Headers: FooBar\uFF0C\u5219\u53EF\u901A\u8FC7getResponseHeader(\u2018FooBar\u2019)\u83B7\u53D6FooBar\u5B57\u6BB5\u7684\u503C\u3002</li></ul><h3 id="\u8BBE\u7F6Edocument-domain\u89E3\u51B3\u65E0\u6CD5\u8BFB\u53D6\u975E\u540C\u6E90\u7F51\u9875\u7684-cookie\u95EE\u9898" tabindex="-1">\u8BBE\u7F6Edocument.domain\u89E3\u51B3\u65E0\u6CD5\u8BFB\u53D6\u975E\u540C\u6E90\u7F51\u9875\u7684 Cookie\u95EE\u9898 <a class="header-anchor" href="#\u8BBE\u7F6Edocument-domain\u89E3\u51B3\u65E0\u6CD5\u8BFB\u53D6\u975E\u540C\u6E90\u7F51\u9875\u7684-cookie\u95EE\u9898" aria-hidden="true">#</a></h3><p>\u56E0\u4E3A\u6D4F\u89C8\u5668\u662F\u901A\u8FC7document.domain\u5C5E\u6027\u6765\u68C0\u67E5\u4E24\u4E2A\u9875\u9762\u662F\u5426\u540C\u6E90\uFF0C\u56E0\u6B64\u53EA\u8981\u901A\u8FC7\u8BBE\u7F6E\u76F8\u540C\u7684document.domain\uFF0C\u4E24\u4E2A\u9875\u9762\u5C31\u53EF\u4EE5\u5171\u4EABCookie\uFF08\u6B64\u65B9\u6848\u4EC5\u9650\u4E3B\u57DF\u76F8\u540C\uFF0C\u5B50\u57DF\u4E0D\u540C\u7684\u8DE8\u57DF\u5E94\u7528\u573A\u666F\u3002\uFF09</p><h3 id="window-postmessage" tabindex="-1">window.postMessage() <a class="header-anchor" href="#window-postmessage" aria-hidden="true">#</a></h3><p>\u5141\u8BB8\u6765\u81EA\u4E0D\u540C\u6E90\u7684\u811A\u672C\u91C7\u7528\u5F02\u6B65\u65B9\u5F0F\u8FDB\u884C\u6709\u9650\u7684\u901A\u4FE1\uFF0C\u53EF\u4EE5\u5B9E\u73B0\u8DE8\u6587\u672C\u3001\u591A\u7A97\u53E3\u3001\u8DE8\u57DF\u6D88\u606F\u4F20\u9012</p><p>\u7F3A\u70B9\uFF1A\u6D4F\u89C8\u5668\u7248\u672C\u8981\u6C42\uFF0C\u90E8\u5206\u6D4F\u89C8\u5668\u8981\u914D\u7F6E\u653E\u5F00\u8DE8\u57DF\u9650\u5236</p><h3 id="websocket" tabindex="-1">websocket <a class="header-anchor" href="#websocket" aria-hidden="true">#</a></h3><p>web sockets\u662F\u6D4F\u89C8\u5668\u7684\u4E00\u79CDAPI\uFF0C\u5B83\u7684\u76EE\u6807\u662F\u5728\u4E00\u4E2A\u5355\u72EC\u7684\u6301\u4E45\u8FDE\u63A5\u4E0A\u63D0\u4F9B\u5168\u53CC\u5DE5\u3001\u53CC\u5411\u901A\u4FE1\u3002(\u540C\u6E90\u7B56\u7565\u5BF9web sockets\u4E0D\u9002\u7528)\uFF0C\u539F\u7406\uFF1A\u8FD9\u79CD\u65B9\u5F0F\u672C\u8D28\u6CA1\u6709\u4F7F\u7528\u4E86 HTTP \u7684\u54CD\u5E94\u5934, \u56E0\u6B64\u4E5F\u6CA1\u6709\u8DE8\u57DF\u7684\u9650\u5236\u3002</p><h3 id="\u53CD\u5411\u4EE3\u7406" tabindex="-1">\u53CD\u5411\u4EE3\u7406 <a class="header-anchor" href="#\u53CD\u5411\u4EE3\u7406" aria-hidden="true">#</a></h3><p>Nginx \u5B9E\u73B0\u539F\u7406\u7C7B\u4F3C\u4E8E Node \u4E2D\u95F4\u4EF6\u4EE3\u7406\uFF0C\u9700\u8981\u4F60\u642D\u5EFA\u4E00\u4E2A\u4E2D\u8F6C nginx \u670D\u52A1\u5668\uFF0C\u7528\u4E8E\u8F6C\u53D1\u8BF7\u6C42\u3002</p><p>\u4F7F\u7528 nginx \u53CD\u5411\u4EE3\u7406\u5B9E\u73B0\u8DE8\u57DF\uFF0C\u662F\u6700\u7B80\u5355\u7684\u8DE8\u57DF\u65B9\u5F0F\u3002\u53EA\u9700\u8981\u4FEE\u6539 nginx \u7684\u914D\u7F6E\u5373\u53EF\u89E3\u51B3\u8DE8\u57DF\u95EE\u9898\uFF0C\u652F\u6301\u6240\u6709\u6D4F\u89C8\u5668\uFF0C\u652F\u6301 session\uFF0C\u4E0D\u9700\u8981\u4FEE\u6539\u4EFB\u4F55\u4EE3\u7801\uFF0C\u5E76\u4E14\u4E0D\u4F1A\u5F71\u54CD\u670D\u52A1\u5668\u6027\u80FD\u3002</p><p>\u6211\u4EEC\u53EA\u9700\u8981\u914D\u7F6Enginx\uFF0C\u5728\u4E00\u4E2A\u670D\u52A1\u5668\u4E0A\u914D\u7F6E\u591A\u4E2A\u524D\u7F00\u6765\u8F6C\u53D1http/https\u8BF7\u6C42\u5230\u591A\u4E2A\u771F\u5B9E\u7684\u670D\u52A1\u5668\u5373\u53EF\u3002\u8FD9\u6837\uFF0C\u8FD9\u4E2A\u670D\u52A1\u5668\u4E0A\u6240\u6709url\u90FD\u662F\u76F8\u540C\u7684\u57DF \u540D\u3001\u534F\u8BAE\u548C\u7AEF\u53E3\u3002\u56E0\u6B64\uFF0C\u5BF9\u4E8E\u6D4F\u89C8\u5668\u6765\u8BF4\uFF0C\u8FD9\u4E9Burl\u90FD\u662F\u540C\u6E90\u7684\uFF0C\u6CA1\u6709\u8DE8\u57DF\u9650\u5236\u3002\u800C\u5B9E\u9645\u4E0A\uFF0C\u8FD9\u4E9Burl\u5B9E\u9645\u4E0A\u7531\u7269\u7406\u670D\u52A1\u5668\u63D0\u4F9B\u670D\u52A1\u3002\u8FD9\u4E9B\u670D\u52A1\u5668\u5185\u7684 javascript\u53EF\u4EE5\u8DE8\u57DF\u8C03\u7528\u6240\u6709\u8FD9\u4E9B\u670D\u52A1\u5668\u4E0A\u7684url\u3002</p><h2 id="\u603B\u7ED3" tabindex="-1">\u603B\u7ED3 <a class="header-anchor" href="#\u603B\u7ED3" aria-hidden="true">#</a></h2><ul><li>jsonp\uFF08\u53EA\u652F\u6301get\u8BF7\u6C42\uFF0C\u652F\u6301\u8001\u7684IE\u6D4F\u89C8\u5668\uFF09\u9002\u5408\u52A0\u8F7D\u4E0D\u540C\u57DF\u540D\u7684js\u3001css\uFF0Cimg\u7B49\u9759\u6001\u8D44\u6E90\uFF1B</li><li>CORS\uFF08\u652F\u6301\u6240\u6709\u7C7B\u578B\u7684HTTP\u8BF7\u6C42\uFF0C\u4F46\u6D4F\u89C8\u5668IE10\u4EE5\u4E0B\u4E0D\u652F\u6301\uFF09\u9002\u5408\u505Aajax\u5404\u79CD\u8DE8\u57DF\u8BF7\u6C42\uFF1B</li><li>Nginx\u4EE3\u7406\u8DE8\u57DF\u548Cnodejs\u4E2D\u95F4\u4EF6\u8DE8\u57DF\u539F\u7406\u90FD\u76F8\u4F3C\uFF0C\u90FD\u662F\u642D\u5EFA\u4E00\u4E2A\u670D\u52A1\u5668\uFF0C\u76F4\u63A5\u5728\u670D\u52A1\u5668\u7AEF\u8BF7\u6C42HTTP\u63A5\u53E3\uFF0C\u8FD9\u9002\u5408\u524D\u540E\u7AEF\u5206\u79BB\u7684\u524D\u7AEF\u9879\u76EE\u8C03\u540E\u7AEF\u63A5\u53E3\u3002</li><li>document.domain+iframe\u9002\u5408\u4E3B\u57DF\u540D\u76F8\u540C\uFF0C\u5B50\u57DF\u540D\u4E0D\u540C\u7684\u8DE8\u57DF\u8BF7\u6C42\u3002</li><li>postMessage\u3001websocket\u90FD\u662FHTML5\u65B0\u7279\u6027\uFF0C\u517C\u5BB9\u6027\u4E0D\u662F\u5F88\u597D\uFF0C\u53EA\u9002\u7528\u4E8E\u4E3B\u6D41\u6D4F\u89C8\u5668\u548CIE10+\u3002</li></ul>`,39),i=[l];function o(r,c,p,d,h,g){return t(),a("div",null,i)}const m=e(n,[["render",o]]);export{w as __pageData,m as default};

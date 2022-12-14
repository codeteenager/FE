# 跨域
跨域是指一个域下的文档或脚本试图去请求另一个域下的资源，这里跨域是广义的。广义的跨域包括：

* 资源跳转: 链接，重定向，表单提交
* 资源嵌入: `<link>`，`<script>`，`<img>`，`<iframe>`等 DOM 标签
* 脚本请求: javascript 发起的 Ajax 请求等

通常所说的跨域是狭义的，是由浏览器同源策略限制的一类请求场景，是浏览器对JavaScript实施的安全限制，如果两个域名的协议，域名，端口都相同，那我们就说这两个域名是同源的。从一个域名的网页去请求另一个域名的资源时，域名、端口、协议任一不同，都是跨域。

| 当前页面url |	被请求页面url  |	是否跨域	| 原因  |
| ------- | --------| -----| -------|
| http://www.jiangshuaijie.cn |	http://www.jiangshuaijie.cn/index.html | 	否	| 同源（协议、域名、端口号相同）|
| http://www.jiangshuaijie.cn |	http://www.jiangshuaijie.cn/index.html	| 是 |	协议不同（http/https）|
| http://www.jiangshuaijie.cn |	http://www.baidu.com |	是	 |  主域名不同  |
| http://www.jiangshuaijie.cn |	http://blog.jiangshuaijie.cn |	 是 |	子域名不同（www/blog）|
| http://www.jiangshuaijie.cn:8080 |	http://www.jiangshuaijie.cn:7001 |	是 |	端口号不同（8080/7001）|

## 同源策略以及分类
同源策略（same origin policy）是netScape（网景）提出的一个安全策略，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，浏览器很容易受到XSS、CSFR等攻击。具体表现为浏览器在执行脚本前，会判断脚本是否与打开的网页是同源的，判断协议、域名、端口是否都相同，相同则表示同源。其中一项不相同就表示跨域访问。会在控制台报一个CORS异常，目的是为了保护本地数据不被JavaScript代码获取回来的数据污染，因此拦截的是客户端发出的请求回来的数据接收，即请求发送了，服务器响应了，但是无法被浏览器接收。

浏览器采用同源策略，在没有明确授权的情况下，禁止页面加载或执行与自身不同源的任何脚本。

同源策略分类：
1. DOM 同源策略： 禁止对不同源页面 DOM 进行操作。这里主要场景是 iframe 跨域的情况，不同域名的 iframe 是限制互相访问的(比如一个恶意网站的页面通过iframe嵌入了银行的登录页面（二者不同源），如果没有同源限制，恶意网页上的javascript脚本就可以在用户登录银行的时候获取用户名和密码)
2. XMLHttpRequest 同源策略： 禁止使用 XHR 对象向不同源的服务器地址发起 HTTP 请求(这一点里面其实包括了 ajax)
3. Cookie、LocalStorage、IndexedDB 等存储性内容同源策略： js中无法访问不属于同个源的cookie、LocalStorage中存储的内容。

不受同源策略限制的：
1. 页面中的链接，重定向以及表单提交是不会受到同源策略限制的(未授权情况下，ajax 的表单提交是不被允许的,但是普通的表单是可以直接跨域的)。
2. `<script>`、`<img>`、`<link>`这些包含 src 属性的标签可以加载跨域资源。但浏览器限制了JavaScript的权限使其不能读、写加载的内容

`<script>`、`<img>`、`<link>`三个标签的使用场景：
1. `<img>`：用于打点统计，统计网站可能是其他域，比如我们自己做一个网站，不可能再搭建一个统计的后台，而是直接采用第三方的统计平台，例如百度统计平台、站长统计平台，而且img没有浏览器兼容性的问题。
2. `<script>`、`<link>`：可以使用CDN，CDN的也是其他域
3. `<script>`：可以用于JSONP

## 跨域解决方案
### JSONP
JSONP 是服务器与客户端跨源通信的常用方法。最大特点就是简单适用，兼容性好（兼容低版本IE），缺点是只支持get请求，不支持post请求。
```js
<script>
    window.callback = function(data){
        //这是我们跨域得到的信息
        console.log(data);
    }
</script>
<script src="http://www.xxx.com/xxx.js"></script> 
//以上将返回callback({x:100,y:100})
```
先定义window.callback的函数，然后使用script加载地址，这个地址返回callback函数进行执行，这样就可以调用window.callback函数打印callback传递的数据。

### CORS（Cross-Origin Resource Sharing）,跨域资源共享
CORS需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能(IE浏览器不能低于IE10)，因此，实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信。

浏览器将CORS请求分成两类：简单请求（simple request）和非简单请求（not-so-simple request）
1. 请求方法是以下三种方法之一：HEAD GET POST
2. HTTP的头信息不超出以下几种字段：Accept Accept-Language Content-Language Last-Event-ID

Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain
凡是不同时满足上面两个条件，就属于非简单请求。

对于简单请求，浏览器在发出CORS请求时会在头信息之中增加一个Origin字段。服务器的返回会多出3个字段：

* Access-Control-Allow-Origin(必须) 允许跨域的源
* Access-Control-Allow-Credentials(可选) 表示是否允许发送Cookie。默认情况下，Cookie可以包含在请求中，一起发给服务器，如果服务器不需要浏览器发送Cookie，删除该字段即可。
* Access-Control-Expose-Headers(可选) CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。如果想拿到其他字段，就必须在Access-Control-Expose-Headers里面指定。如指定Access-Control-Expose-Headers: FooBar，则可通过getResponseHeader(‘FooBar’)获取FooBar字段的值。

### 设置document.domain解决无法读取非同源网页的 Cookie问题
因为浏览器是通过document.domain属性来检查两个页面是否同源，因此只要通过设置相同的document.domain，两个页面就可以共享Cookie（此方案仅限主域相同，子域不同的跨域应用场景。）

### window.postMessage()
允许来自不同源的脚本采用异步方式进行有限的通信，可以实现跨文本、多窗口、跨域消息传递

缺点：浏览器版本要求，部分浏览器要配置放开跨域限制

### websocket 
web sockets是浏览器的一种API，它的目标是在一个单独的持久连接上提供全双工、双向通信。(同源策略对web sockets不适用)，原理：这种方式本质没有使用了 HTTP 的响应头, 因此也没有跨域的限制。

### 反向代理
Nginx 实现原理类似于 Node 中间件代理，需要你搭建一个中转 nginx 服务器，用于转发请求。

使用 nginx 反向代理实现跨域，是最简单的跨域方式。只需要修改 nginx 的配置即可解决跨域问题，支持所有浏览器，支持 session，不需要修改任何代码，并且不会影响服务器性能。

我们只需要配置nginx，在一个服务器上配置多个前缀来转发http/https请求到多个真实的服务器即可。这样，这个服务器上所有url都是相同的域 名、协议和端口。因此，对于浏览器来说，这些url都是同源的，没有跨域限制。而实际上，这些url实际上由物理服务器提供服务。这些服务器内的 javascript可以跨域调用所有这些服务器上的url。

## 总结
* jsonp（只支持get请求，支持老的IE浏览器）适合加载不同域名的js、css，img等静态资源；
* CORS（支持所有类型的HTTP请求，但浏览器IE10以下不支持）适合做ajax各种跨域请求；
* Nginx代理跨域和nodejs中间件跨域原理都相似，都是搭建一个服务器，直接在服务器端请求HTTP接口，这适合前后端分离的前端项目调后端接口。
* document.domain+iframe适合主域名相同，子域名不同的跨域请求。
* postMessage、websocket都是HTML5新特性，兼容性不是很好，只适用于主流浏览器和IE10+。
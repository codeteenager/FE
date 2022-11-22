# npm仓库
## 介绍
>之前写过一篇前端物料平台的搭建，其中涉及到使用私有npm仓库来管理前端物料，为此写一下企业的npm仓库搭建。

那么企业为什么要搭建私有的npm仓库呢，我们平时大部分使用的是npm官方仓库的一些依赖库，但是针对企业级，企业需要开发自己的一些组件库和工具库，这些库需要在组织内部进行管理和共享，不能够上传npm公有仓库中，因此我们需要搭建企业私有仓库来解决这种问题。同时搭建私有仓库，能够提升npm包的安装下载速度和源的稳定性，比如淘宝镜像，本质上也是私有仓库。

接下来我们介绍一下常用npm私有仓库框架。

1. Nexus
Nexus 是Maven 仓库管理器，管理开发所需要的构件。如果每次都是从 Apache 提供的 Maven中央仓库去下载所需要的构件，那么这通常不是一个好的做法。应该在本地架设一个Maven仓库服务器，再代理远程仓库的同时维护本地仓库，以节省带宽和时间，那么Nexus可以满足这样的需求。

![](/web/project/5.jpeg)

Nexus Repository Manager 仓库管理分为专业版和oss版，oss版是免费的，专业版是收费的。

nexus 的功能非常强大。Nexus 2.x 和 Nexus 3.x 的差别也是非常大；Nexus 3.x 版本更增加了对 Docker、NuGet、npm、Bower的支持。全面升级了页面，增加管理接口以自动管理任务，性能和用户体验也都有所改善。

2. cnpm
CNPM 是一个Nodejs的库，由国内Alibaba团队开发维护，致力于打造私有的 NPM 注册服务。当然，除了私有库功能以外，CNPM官网 (http://cnpmjs.org/) 还提供了NPM同步的服务。

![](/web/project/6.png)

3. Verdaccio
Verdaccio 是一个简单的、零配置本地私有 npm 软件包代理注册表。Verdaccio 开箱即用，拥有自己的小型数据库，能够代理其它注册表（例如 npmjs.org），缓存下载的模块。此外 Verdaccio 还易于扩展存储功能，它支持各种社区制作的插件，以连接到亚马逊的 s3、谷歌云存储等服务或创建自己的插件。

## 下载
本次使用Nexus来搭建npm仓库，Nexus不仅支持npm包，而且也支持Maven。Nexus架构图如下：

![](/web/project/21.png)

nexus 工作在 client 和外部 npm 之间，并通过 group repository 合并 npm 仓库以及私有仓库，这样就起到了代理转发的作用。

首先我们先去下载免费的oss版本，下载地址为[https://www.sonatype.com/download-oss-sonatype](https://www.sonatype.com/download-oss-sonatype)。

![](/web/project/7.jpg)

在这里下载了nexus-3.31.1-01-unix.tar.gz，然后使用FileZilla上传倒服务器中，执行解压命令

```sh
tar -zxvf nexus-3.31.1-01-unix.tar.gz -C ./
```

解压到当前目录。

![](/web/project/8.jpg)

解压后会有两个文件夹，nexus-3.31.1-01和sonatype-work。nexus-3.31.1-01是nexus核心文件，包含Nexus运行所需要的文件，如运行脚本，依赖jar包等，sonatype-work是仓库的工作目录，包含Nexus生成的配置文件、日志文件、仓库文件等。

nexus-3.31.1-01目录如下：
* bin：包含nexus的启动脚本和相关配置
* etc： jetty、karaf等配置文件
* lib： java架包库
* public：关于nexus应用在本地跑起来所需要的资源
* system：应用所有的插件和组件
* LICENSE.txt 和 NOTICE.txt ：版权声明和法律细则

sonatype-work\nexus3目录如下：
* blobs：创建blob的默认路径，当然也可以重新指定
* cache：当前缓存的karaf包的信息
* db：OrientDB数据库的数据，用于存储nexus的元数据的数据库
* elasticsearch：当前配置的Elasticsearch状态
* keystores：自动生成的关于资源库的ID主键
* log：运行实例生成的日志文件
* tmp：用于存储临时文件的目录

## 配置
我们打开nexus-3.31.1-01目录下etc目录下可以看到众多的配置文件。

![](/web/project/9.jpg)

我们可以编辑其中的nexus-default.properties文件，可以修改默认的端口。

![](/web/project/10.jpg)

## 启动与关闭
然后我们进入bin目录下执行 ./nexus start 即可启动。当然也可以使用./nexus run启动。区别在于：start以守护线程方式启动，run以非守护线程方式启动。

```sh
$ ./nexus start
$ ./nexus run
```

启动时可能比较慢，需要多等一会，如果想看启动日志情况可以进入sonatype-work目录。

```sh
#进入sonatype-work目录的nexus3日志目录
$ cd sonatype-work/nexus3/log
#查看实时日志
$ tail -f nexus.log
```

关闭我们可以使用 ./nexus stop 命令来关闭。

```sh
$ ./nexus stop
```

## 访问

打开浏览器输入：http://ip:8081即可访问，这里注意在nexus2的版本访问地址是http://ip:8081/nexus，在nexus3版本直接ip+端口就可以访问了。

![](/web/project/11.jpg)

然后我们点击Sign in进行登录，管理员账号默认为admin，弹框会提示admin的密码存放在 sonatype-work/nexus3/admin.password中，我们可以使用其密码进行登录，登录后会提示更改密码，此后admin.password也就无效了。

![](/web/project/12.jpg)

## 配置npm私有仓库

nexus默认没有npm私有仓库，需要我们自己去创建。首先我们先在管理员配置中，仓库下打开blob存储，点击创建blob存储，为npm私库创建一个单独的私有空间。

![](/web/project/13.jpg)

选择File类型，输入名称点击create blob store即可。

![](/web/project/14.jpg)

然后再分别创建三种类型的npm仓库：hosted、proxy、group。
* hosted：本地存储，你可以上传你自己的项目到这里面。
* proxy：提供代理其他仓库的类型，即你可以设置代理，设置了代理之后，在你的nexus中找不到的依赖就会去配置的代理的地址中找。
* group：组类型，它可以包含前面两个，是一个聚合体。一般用来给客户一个访问nexus的统一地址。

简单的说，就是你可以上传私有的项目到hosted，以及配置proxy以获取第三方的依赖（比如可以配置中央仓库的地址）。前面两个都弄好了之后，在通过group聚合给客户提供统一的访问地址。

我们先创建这三个对应的仓库。

![](/web/project/15.jpg)
![](/web/project/16.jpg)

### npm-hosted
输入Name，选择Blob store和Deployment policy。

* Name：定义一个名称npm-hosted。
* Blob store：我们下拉选择前面创建好的专用blob：npm-blob。
* Deployment policy：开发环境，我们运行重复发布，因此Delpoyment policy 我们选择Allow redeploy。

![](/web/project/17.jpg)

### npm-proxy
输入Name，远程仓库地址以及选择Blob store。

* Name：定义一个名称npm-proxy。
* Remote storage：上游远程仓库地址，这里填写: [https://registry.npmjs.org](https://registry.npmjs.org)也可以填写淘宝镜像地址。
* Blob store：和hosted一样选择我们创建好的npm-blob。

![](/web/project/18.jpg)

### npm-group

同样输入名称Name，选择创建好的Blob store 把前两个创建的代理仓库（npm-proxy）和私有仓库（npm-hosted）从Avaliable区移动到Members区即可。

![](/web/project/19.jpg)

创建完成后即可使用了。

首先我们获取一下npm-group对外提供的地址即私库地址。
![](/web/project/20.jpg)

然后我们可以使用npm install命令来安装依赖包。

```sh
npm install --registry http://ip:port/repository/npm-group/
```

## 参考文章
* [二丫讲梵-nexus的安装](https://wiki.eryajf.net/pages/1803.html)
* [【Windows】使用Nexus搭建npm私库，管理npm包，并在项目中下载](https://blog.csdn.net/HuangsTing/article/details/125146287)

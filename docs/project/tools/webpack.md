# webpack
webpack于2012年3月10号诞生，作者是Tobias(德国)。参考GWT(Google Web Toolkit)的code splitting功能在webpack中进行实现。然后在2014年Instagram团队分享性能优化时，提出使用webpack的code splitting特性从而大火。 现在webpack的出现模糊了任务和构建的边界在webpack出现之前，我们使用gulp、grunt做任务的，构建是用其他工具实现，而现在webpack使其融为一体。

![](/framework/5.png)

之前我们在html加载js资源的时候，需要使用script标签，加载css也需要编写css文件进行加载，这样我们每次html加载的时候就需要加载多个资源。而webpack将所有的资源都打包到js中，会有一个entry入口文件,entry引入了js、css等资源文件，打包到一个bundle文件中，这样就加载一个资源。

webpack最初核心解决的问题就是代码合并与拆分，它的核心理念是将资源都视为模块，统一进行打包和处理，然后再按规则进行拆分，提供了loader和plugin完成功能扩展。

::: tip webpack5知识体系
https://gitmind.cn/app/docs/m1foeg1o
:::
## 核心概念
* entry：入口模块文件路径
* output: 输出bundle文件路径
* module：模块，webpack构建  对象
* bundle：输出文件，webpack构建产物
* chunk：构建生成bundle过程中，产生的中间文件，webpack构建的中间产物
* loader：文件转换器
* plugin：插件，执行特定任务
* mode：工作模式，默认采用production模式，

## 项目初始化流程
1. 创建npm项目
2. 安装webpack依赖 webpack和webpack-cli
3. 创建js入口文件
4. 创建webpack配置文件
5. 配置package.json的build命令
6. 执行npm run build 打包
## 常见的loader
* style-loader：将css-loader转换后的结果，通过style标签的方式追加到页面中
* css-loader：将css文件转换为js模块
* file-loader：把文件输出到一个文件夹中，在代码中通过相对URL去引用输出文件
* url-loader：和file-loader类似，但是能在文件很小的情况下以base64的方式把文件内容注入到代码中去
* source-map-loader：加载额外的source Map文件，以方便断点调试
* image-loader：加载并且压缩图片文件
* babel-loader：把ES6转换成ES5
* eslint-loader：通过ESLint检查JavaScript代码

注意：在Webpack中，loader的执行顺序是从右向左执行的，因为Webpack选择了compose这样的函数式编程方式，这种方式的表达式执行时从右向左的。




## 自定义loader

## 常用的plugin
* html-webpack-plugin：该插件将为你生成一个 HTML5 文件， 在 body中使用 script 标签引入你所有 webpack 生成的 bundle
* copy-webpack-plugin：在 webpack 中拷贝文件和文件夹
* clean-webpack-plugin：用于删除/清理构建文件夹的 webpack 插件。
* ProvidePlugin：注册全局引用的变量
* mini-css-extract-plugin：将 css 提取到单独的文件中，为每个包含 css 的 js 文件创建一个 css 文件，并且支持 css 和 SourceMaps 的按需加载。 
* webpack-dev-server：提供了一个基本的 web server，并且具有 livereloading(实时重新加载) 功能
* optimize-css-assets-webpack-plugin：压缩 css 文件
* define-plugin：定义环境变量
* uglifyjs-webpack-plugin：通过UglifyES压缩ES6代码
* webpack-parallel-uglify-plugin：多核压缩，提高压缩速度
* webpack-bundle-analyzer：可视化webpack输出文件的体积

## 常见开发配置

### 多页配置
当我们需要打包多个页面的时候需要配置多个html以及webpack多个入口文件。例如：
```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        'index': './src/index.js',
        'login': './src/login.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    ...
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            filename: 'login.html',
            template: './src/login.html',
            chunks: ['login']
        })
    ]
}
```

### 启用webpack-dev-server
```js
module.exports = {
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        },
        compress: true,
        port: 9000,
        hot: true
    },
}
```

### 从js bundle抽离css资源
使用MiniCssExtractPlugin插件抽离css文件。

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename:'[name].css',
            chunkFilename: '[name].chunk.css'
        })
    ]
}
```
### 代码分割
随着我们项目业务发展越来越多以及依赖的node_modules也逐渐增多，打包出来的js也越来越大。即便是把css和图片抽离，也可能还是很大，这时候就会严重影响性能，所以为了解决这个问题要对代码进行分割，而且采用异步加载的方式进行加载。SplitChunks：Webpack中一个提取或分离代码的插件，主要作用是提取公共代码，防止代码被重复打包，拆分过大的js文件，合并零散的 js 文件单个资源文件最好不大于300kb。对于splitChunks可以看官方文档：https://webpack.docschina.org/plugins/split-chunks-plugin/。

## Webpack打包优化
webpack打包优化方向：
* 打包速度：优化打包速度，主要是提升了我们的开发效率，更快的打包构建过程。
* 打包体积：优化打包体积，主要是提升产品的使用体验，降低服务器资源成本，更快的页面加载，将让产品显得更加“丝滑”，同时也可以让打包更快。

### webpack打包速度优化
webpack进行打包速度优化有七种常用手段：
#### 优化loader搜索范围
对于 loader 来说，影响打包效率首当其冲必属 Babel了。因为 Babel会将代码转为字符串生成 AST，然后对 AST继续进行转变 最后再生成新的代码，项目越大，转换代码越多，效率就越低。优化正则匹配、使用 include 和 exclude 指定需要处理的文件,忽略不需要处理的文件。

```js
rules: [{ 
    // 优化正则匹配 
    test: /\.js$/, 
    // 指定需要处理的目录 
    include: path.resolve(__dirname, 'src') 
    // 理论上只有include就够了，但是某些情况需要排除文件的时候可以用这个，排除不需要处理文件 
    // exclude: [] 
    }]
```

####  多进程/多线程
受限于 node 是单线程运行的，所以 webpack 在打包的过程中也是单线程的，特别是在执行 loader 的时候，长时间编译的任务 很多，这样就会导致等待的情况。我们可以使用一些方法将 loader 的同步执行转换为并行，这样就能充分利用系统资源来提高打包速度了。

```js
{ 
    test: /\.js?$/,
    exclude: /node_modules/, 
    use: [ 
        { 
            loader: "thread-loader", 
            options: { 
                workers: 3 // 进程 3 个 
                } 
            },
            { loader: "babel-loader", 
            options: { presets: ["@babel/preset-env"], 
            plugins: ["@babel/plugin-transform-runtime"] 
            } 
        } 
    ] 
},
```

#### 分包
在使用 webpack 进行打包时候，对于依赖的第三方库，比如 vue，vuex等这些不会修改的依赖，我们可以让它和我们自己编写 的代码分开打包，这样做的好处是每次更改我本地代码的文件的时候，webpack 只需要打包我项目本身的文件代码，而不会再 去编译第三方库，那么第三方库在第一次打包的时候只打包一次，以后只要我们不升级第三方包的时候，那么 webpack 就不会 对这些库去打包，这样可以快速提高打包的速度。因此为了解决这个问题，DllPlugin和 DllReferencePlugin插件就产生了。这种 方式可以极大的减少打包类库的次数，只有当类库更新版本才需要重新打包，并且也实现了将公共代码抽离成单独文件的优化 方案

```js
// webpack.dll.conf.js 
const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    mode: 'production',
    devtool: false,
    entry: {
        vue: ['vue', 'vue-router', 'iscroll', 'vuex'],
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'lib/[name]_[hash:4].dll.js',
        library: '[name]_[hash:4]'
    },
    performance: {
        hints: false,
        maxAssetSize: 300000, //单文件超过300k，命令行告警 maxEntrypointSize: 300000, //首次加载文件总和超过300k，命令行告警 
    }, optimization: {
        minimizer: [
            new UglifyJsPlugin({
                parallel: true // 开启多线程并行 
            })
        ]
    },
    plugins: [
        new webpack.DllPlugin({
            context: __dirname,
            path: path.join(__dirname, '../dist/lib', '[name]-manifest.json'),
            name: '[name]_[hash:4]'
        })
    ]
}

// webpack.prod.cong.js 
plugins: [
    new webpack.DllReferencePlugin({
        context: __dirname, manifest: require('../dist/lib/vue-manifest.json')
    }),
]
```

#### 开启缓存
当设置 cache.type:“filesystem”时，webpack 会在内部以分层方式启用文件系统缓存和内存缓存，将处理结果结存放到内存中， 下次打包直接使用缓存结果而不需要重新打包。

```js
cache: {
    type: "filesystem"
    // cacheDirectory 默认路径是 node_modules/.cache/webpack 
    // cacheDirectory: path.resolve(__dirname, '.temp_cache') 
},
```

#### 打包分析工具
显示测量打包过程中各个插件和 loader 每一步所消耗的时间,然后让我们可以有针对的分析项目中耗时的模块对其进行处理。

```js
npm install speed-measure-webpack-plugin -D

// webpack.prod.config.js
const SpeedMeatureWebpackPlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeatureWebpackPlugin();

var webpackConfig = merge(baseWebpackConfig,{})
--> 修改为下面格式
var webpackConfig = {...}

module.exports = webpackConfig
--> 修改为下面格式
module.exports = smp.wrap(merge(baseWebpackConfig, webpackConfig));
```

#### ignorePlugin
这是 webpack 内置插件, 它的作用是忽略第三方包指定目录，让这些指定目录不要被打包进去，防止在 import 或 require 调用时，生成以下正则表达式匹配的模块。

* requestRegExp 匹配（ test ）资源请求路径的正则表达式。
* contextRegExp（ 可选 ）匹配（ test ）资源上下文（ 目录 ）的正则表达式。

```js
new webpack.IgnorePlugin({ 
    resourceRegExp: /^\.\/test$/, contextRegExp: /test$/, 
})
```
#### 优化文件路径
* alias：省下搜索文件的时间，让 webpack 更快找到路径
* mainFiles：解析目录时要使用的文件名
* extensions：指定需要检查的扩展名，配置之后可以不用在 require 或是 import 的时候加文件扩展名,会依次尝试添加扩展名进行 匹配

```js
resolve: {
        extensions: ['.js', '.vue'],
        mainFiles: ['index'],
        alias: { '@': resolve('src'), }
    }
```

### webpack打包体积优化
webpack打包体积优化有11种常用优化手段

#### 构建体积分析
npm run build 构建，会默认打开： http://127.0.0.1:8888/，可以看到各个包的体积,分析项目各模块的大小，可以按需优化。

```js
npm install webpack-bundle-analyzer -D

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

plugins:[ 
    new BundleAnalyzerPlugin() 
]
```

####  项目图片资源优化压缩处理
对打包后的图片进行压缩和优化，降低图片分辨率，压缩图片体积等

```js
npm install image-webpack-loader -D

// webpack.base.conf.js

{
    test: /\.(gif|png|jpe?g|svg|webp)$/i,
    type: "asset/resource",
    parser: { dataUrlCondition: { maxSize: 8 * 1024 } },
    generator: { filename: "images/[name].[hash:6][ext]" },
    use: [{
        loader: "image-webpack-loader",
        options: {
            mozjpeg: { progressive: true, quality: 65 },
            optipng: { enabled: false },
            pngquant: { quality: [0.5, 0.65], speed: 4 },
            gifsicle: { interlaced: false },
            webp: {
                quality: 75
            }
        }
    }]
} 
```

#### 删除无用的css样式
有时候一些项目中可能会存在一些 css 样式被迭代废弃，需要将其删除，可以使用 purgecss-webpack-plugin插件，该插件可以去 除未使用的 css。

```js
npm install purgecss-webpack-plugin glod -D

// webpack.prod.conf.js
const PurgeCSSPlugin = require("purgecss-webpack-plugin");

const glob = require('glob')

const PATHS = { src: path.join(__dirname, 'src') }

// plugins 
new PurgeCSSPlugin({ 
    paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }), 
    safelist: ["body"] 
}),
```

#### 代码压缩

对 js 文件进行压缩，从而减小 js 文件的体积，还可以压缩 html、css 代码。

```js
const TerserPlugin = require("terser-webpack-plugin");

optimization:{
        minimize: true, //代码压缩 
        usedExports: true, // treeshaking
        minimizer: [ 
            new TerserPlugin({ 
                terserOptions: { 
                    ecma: undefined, 
                    parse: {},
                    compress: {}, 
                    mangle: true, // Note `mangle.properties` is `false` by default. 
                    module: false, // Deprecated 
                    output: null, 
                    format: null, 
                    toplevel: false,
                    nameCache: null, 
                    ie8: false,
                    keep_classnames: undefined,
                    keep_fnames: false, 
                    safari10: false
                } 
            })],
            splitChunks: { 
                cacheGroups: { 
                    commons: { 
                        name: "commons", 
                        chunks: "initial", 
                        minChunks: 2
                    } 
                } 
            } 
        }
```
使用UglifyjsWebpackPlugin插件对js进行压缩，CssMinimizerWebpackPlugin对css进行压缩。

```js
module.exports = {
    optimization: {
        minimize: true,
        minimizer: [
            new UglifyJsPlugin({sourceMap:true}),
            new CssMinimizerPlugin()
        ]
    }
}
```

#### 开启Scope Hoisting
Scope Hoisting又译作“作用域提升”。只需在配置文件中添加一个新的插件，就可以让 webpack 打包出来的代码文件更小、运行 的更快, Scope Hoisting会分析出模块之间的依赖关系，尽可能的把打包出来的模块合并到一个函数中去，然后适当地重命名一 些变量以防止命名冲突。

```js
new webpack.optimize.ModuleConcatenationPlugin();
```

#### 提取公共代码
将项目中的公共模块提取出来，可以减少代码的冗余度，提高代码的运行效率和页面的加载速度

```js
new webpack.optimize.CommonsChunkPlugin(options)
```
#### 代码分离
代码分离能够将工程代码分离到各个文件中，然后按需加载或并行加载这些文件，也用于获取更小的 bundle，以及控制资源加 载优先级,在配置文件中配置多入口，输出多个 chunk。

```js
//多入口配置 最终输出两个chunk
 module.exports = { 
    entry: { 
        index: 'index.js', 
        login: 'login.js' 
    },
    output: { 
        //对于多入口配置需要指定[name]否则会出现重名问题 
        filename: '[name].bundle.js', 
        path: path.resolve(__dirname, 'dist') 
    } 
};
```

#### Tree-shaking
treeshaking是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码（ dead-code ）。它依赖于 ES2015 模块语法的 静 态结构 特性，例如 import 和 export。

在ES Module中，通过解构的方式获取方法，会默认触发TreeShaking，代码会自动清除无用代码。前提是调用的库必须使用ES Module的规范。同一文件的TreeShaking必须配置mode=production。一定要注意使用解构来加载模块。

####  CDN 加速
CDN 的全称是 Content DeliveryNetwork，即内容分发网络。CDN 是构建在网络之上的内容分发网络，依靠部署在各地的边缘 服务器，通过中心平台的负载均衡、内容分发、调度等功能模块，使用户就近获取所需内容，降低网络拥塞，提高用户访问响 应速度和命中率。CDN 的关键技术主要有内容存储和分发技术。在项目中以 CDN 的方式加载资源，项目中不需要对资源进行 打包，大大减少打包后的文件体积。

#### 按需加载
在开发项目的时候，项目中都会存在十几甚至更多的路由页面。如果我们将这些页面全部打包进一个文件的话，虽然将多个请 求合并了，但是同样也加载了很多并不需要的代码，耗费了更长的时间。那么为了页面能更快地呈现给用户，我们肯定是希望 页面能加载的文件体积越小越好，这时候我们就可以使用按需加载，将每个路由页面单独打包为一个文件。以下是常见的按需 加载的场景

* 路由组件按需加载
* 按需加载需引入第三方组件
* 对于一些插件，如果只是在个别组件中用的到，也可以不要在 main.js 里面引入，而是在组件中按需引入

#### 生产环境关闭sourceMap
sourceMap 本质上是一种映射关系，打包出来的 js 文件中的代码可以映射到代码文件的具体位置,这种映射关系会帮助我们直接 找到在源代码中的错误。但这样会使项目打包速度减慢，项目体积变大，可以在生产环境关闭 sourceMap

## 源码解析
webpack本身不是一个脚手架，它的脚手架是由webpack-cli实现的。

首先看一下webpack这个命令的定义，它在webpack包中package.json文件的bin中配置。

```js
"bin": {
    "webpack": "bin/webpack.js"
},
```
在webpack中找到bin/webpack.js文件，看一下文件的内容。
```js
#!/usr/bin/env node

/**
 * @param {string} command process to run
 * @param {string[]} args command line arguments
 * @returns {Promise<void>} promise
 */
const runCommand = (command, args) => {
	const cp = require("child_process");
	return new Promise((resolve, reject) => {
		const executedCommand = cp.spawn(command, args, {
			stdio: "inherit",
			shell: true
		});

		executedCommand.on("error", error => {
			reject(error);
		});

		executedCommand.on("exit", code => {
			if (code === 0) {
				resolve();
			} else {
				reject();
			}
		});
	});
};

/**
 * @param {string} packageName name of the package
 * @returns {boolean} is the package installed?
 */
const isInstalled = packageName => {
	if (process.versions.pnp) {
		return true;
	}

	const path = require("path");
	const fs = require("graceful-fs");

	let dir = __dirname;

	do {
		try {
			if (
				fs.statSync(path.join(dir, "node_modules", packageName)).isDirectory()
			) {
				return true;
			}
		} catch (_error) {
			// Nothing
		}
	} while (dir !== (dir = path.dirname(dir)));

	return false;
};

/**
 * @param {CliOption} cli options
 * @returns {void}
 */
const runCli = cli => {
	const path = require("path");
	const pkgPath = require.resolve(`${cli.package}/package.json`);
	// eslint-disable-next-line node/no-missing-require
	const pkg = require(pkgPath);
	// eslint-disable-next-line node/no-missing-require
	require(path.resolve(path.dirname(pkgPath), pkg.bin[cli.binName]));
};

/**
 * @typedef {Object} CliOption
 * @property {string} name display name
 * @property {string} package npm package name
 * @property {string} binName name of the executable file
 * @property {boolean} installed currently installed?
 * @property {string} url homepage
 */

/** @type {CliOption} */
const cli = {
	name: "webpack-cli",
	package: "webpack-cli",
	binName: "webpack-cli",
	installed: isInstalled("webpack-cli"),
	url: "https://github.com/webpack/webpack-cli"
};

if (!cli.installed) {
	const path = require("path");
	const fs = require("graceful-fs");
	const readLine = require("readline");

	const notify =
		"CLI for webpack must be installed.\n" + `  ${cli.name} (${cli.url})\n`;

	console.error(notify);

	let packageManager;

	if (fs.existsSync(path.resolve(process.cwd(), "yarn.lock"))) {
		packageManager = "yarn";
	} else if (fs.existsSync(path.resolve(process.cwd(), "pnpm-lock.yaml"))) {
		packageManager = "pnpm";
	} else {
		packageManager = "npm";
	}

	const installOptions = [packageManager === "yarn" ? "add" : "install", "-D"];

	console.error(
		`We will use "${packageManager}" to install the CLI via "${packageManager} ${installOptions.join(
			" "
		)} ${cli.package}".`
	);

	const question = `Do you want to install 'webpack-cli' (yes/no): `;

	const questionInterface = readLine.createInterface({
		input: process.stdin,
		output: process.stderr
	});

	// In certain scenarios (e.g. when STDIN is not in terminal mode), the callback function will not be
	// executed. Setting the exit code here to ensure the script exits correctly in those cases. The callback
	// function is responsible for clearing the exit code if the user wishes to install webpack-cli.
	process.exitCode = 1;
	questionInterface.question(question, answer => {
		questionInterface.close();

		const normalizedAnswer = answer.toLowerCase().startsWith("y");

		if (!normalizedAnswer) {
			console.error(
				"You need to install 'webpack-cli' to use webpack via CLI.\n" +
					"You can also install the CLI manually."
			);

			return;
		}
		process.exitCode = 0;

		console.log(
			`Installing '${
				cli.package
			}' (running '${packageManager} ${installOptions.join(" ")} ${
				cli.package
			}')...`
		);

		runCommand(packageManager, installOptions.concat(cli.package))
			.then(() => {
				runCli(cli);
			})
			.catch(error => {
				console.error(error);
				process.exitCode = 1;
			});
	});
} else {
	runCli(cli);
}

```
其中cli定义了webpack-cli的一系列信息，像name、package、binName、isinstalled，isinstalled是判断webpack-cli是否安装，他调用了isInstalled()函数，然后在这个函数中他会循环查找，先在当前目录下查找node_modules/webpack-cli，然后找到上层目录查找node_modules/webpack-cli，直到找到则返回true，没找到返回false。如果没找到在下面会进行isinstalled判断，没找到则提示安装webpack-cli。如果安装了webpack-cli，它会直接执行runCli命令，在runCli中它会找到webpack-cli的package.json文件并读取获取其中的bin配置webpack-cli的路径，然后再require进来，这样webpack就把相关操作交给webpack-cli去执行。然后看一下webpack-cli的命令定义：

```js
"bin": {
    "webpack-cli": "./bin/cli.js"
},
```
然后看一下cli.js的源码

```js
const importLocal = require("import-local");
const runCLI = require("../lib/bootstrap");

if (!process.env.WEBPACK_CLI_SKIP_IMPORT_LOCAL) {
  // Prefer the local installation of `webpack-cli`
  if (importLocal(__filename)) {
    return;
  }
}

process.title = "webpack";

runCLI(process.argv);
```

它使用import-local库来判断当前调用环境是否是webpack-cli源码，修改进程名为webpack，然后调用bootstrap提供的runCLI方法并把命令行参数传递过去。然后看一下runCLI的定义。

```js
const WebpackCLI = require("./webpack-cli");
const runCLI = async (args) => {
    // Create a new instance of the CLI object
    const cli = new WebpackCLI();
    try {
        await cli.run(args);
    }
    catch (error) {
        cli.logger.error(error);
        process.exit(2);
    }
};
module.exports = runCLI;
```
在runCLI方法中它实例化一个WebpackCLI对象，然后调用run方法。先看一下构造方法的定义

```js
const { program, Option } = require("commander");
...
constructor() {
        this.colors = this.createColors();
        this.logger = this.getLogger();
        // Initialize program
        this.program = program;
        this.program.name("webpack");
        this.program.configureOutput({
            writeErr: this.logger.error,
            outputError: (str, write) => write(`Error: ${this.capitalizeFirstLetter(str.replace(/^error:/, "").trim())}`),
        });
}
```
其中主要是定义了program，program是commander提供的。
然后看一下run方法
```js

```
接下来看一下webpack实例化的逻辑

```js
const webpack = /** @type {WebpackFunctionSingle & WebpackFunctionMulti} */ (
	/**
	 * @param {WebpackOptions | (ReadonlyArray<WebpackOptions> & MultiCompilerOptions)} options options
	 * @param {Callback<Stats> & Callback<MultiStats>=} callback callback
	 * @returns {Compiler | MultiCompiler}
	 */
	(options, callback) => {
		const create = () => {
			if (!asArray(options).every(webpackOptionsSchemaCheck)) {
				getValidateSchema()(webpackOptionsSchema, options);
				util.deprecate(
					() => {},
					"webpack bug: Pre-compiled schema reports error while real schema is happy. This has performance drawbacks.",
					"DEP_WEBPACK_PRE_COMPILED_SCHEMA_INVALID"
				)();
			}
			/** @type {MultiCompiler|Compiler} */
			let compiler;
			let watch = false;
			/** @type {WatchOptions|WatchOptions[]} */
			let watchOptions;
			if (Array.isArray(options)) {
				/** @type {MultiCompiler} */
				compiler = createMultiCompiler(
					options,
					/** @type {MultiCompilerOptions} */ (options)
				);
				watch = options.some(options => options.watch);
				watchOptions = options.map(options => options.watchOptions || {});
			} else {
				const webpackOptions = /** @type {WebpackOptions} */ (options);
				/** @type {Compiler} */
				compiler = createCompiler(webpackOptions);
				watch = webpackOptions.watch;
				watchOptions = webpackOptions.watchOptions || {};
			}
			return { compiler, watch, watchOptions };
		};
		if (callback) {
			try {
				const { compiler, watch, watchOptions } = create();
				if (watch) {
					compiler.watch(watchOptions, callback);
				} else {
					compiler.run((err, stats) => {
						compiler.close(err2 => {
							callback(err || err2, stats);
						});
					});
				}
				return compiler;
			} catch (err) {
				process.nextTick(() => callback(err));
				return null;
			}
		} else {
			const { compiler, watch } = create();
			if (watch) {
				util.deprecate(
					() => {},
					"A 'callback' argument needs to be provided to the 'webpack(options, callback)' function when the 'watch' option is set. There is no way to handle the 'watch' option without a callback.",
					"DEP_WEBPACK_WATCH_WITHOUT_CALLBACK"
				)();
			}
			return compiler;
		}
	}
);
```
实例化的时候传入options选项和callback回调函数，如果传入callback的话，就会调用create函数，create函数中完成了compiler的创建并判断是否进行watch监听，如果watch监听为true的话会调用compiler.watch，否则调用compiler.run。如果有异常则调用callback传递异常信息。
如果没有传callback的话，同样会拿到compiler和watch，并把compiler返回。

在create函数中，先调用getNormalizedWebpackOptions对options进行格式化添加默认的配置项，然后判断options是否是一个数组，因为我们通常传入的是一个对象所以可以看else部分的，它会去调用createCompiler来创建一个compiler对象

```js
/**
 * @param {WebpackOptions} rawOptions options object
 * @returns {Compiler} a compiler
 */
const createCompiler = rawOptions => {
	const options = getNormalizedWebpackOptions(rawOptions);
	applyWebpackOptionsBaseDefaults(options);
	const compiler = new Compiler(options.context, options);
	new NodeEnvironmentPlugin({
		infrastructureLogging: options.infrastructureLogging
	}).apply(compiler);
	if (Array.isArray(options.plugins)) {
		for (const plugin of options.plugins) {
			if (typeof plugin === "function") {
				plugin.call(compiler, compiler);
			} else {
				plugin.apply(compiler);
			}
		}
	}
	applyWebpackOptionsDefaults(options);
	compiler.hooks.environment.call();
	compiler.hooks.afterEnvironment.call();
	new WebpackOptionsApply().process(options, compiler);
	compiler.hooks.initialize.call();
	return compiler;
};
```
在createCompiler方法中先创建了Compiler实例，然后遍历自定义的plugin，如果plugin是一个function则直接进行调用，如果是一个对象则执行apply方法，在这一步中如果plugin有问题则直接会报错。当自定义plugin注册完之后，再去注册内置的plugin。插件注册完之后再去执行钩子函数，然后调用WebpackOptionsApply类会在初始化阶段根据配置内容动态注入对应的插件，调用init钩子函数初始化方法。


## 相关文章
* [[万字总结] 一文吃透 Webpack 核心原理](https://juejin.cn/post/6949040393165996040) 
* [【万字】透过分析 webpack 面试题，构建 webpack5.x 知识体系](https://juejin.cn/post/7023242274876162084)
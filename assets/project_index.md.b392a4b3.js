import{_ as l,o as i,c as a,Q as e}from"./chunks/framework.ea1f6e24.js";const t="/FE/project/107.png",o="/FE/project/108.png",r="/FE/project/109.png",c="/FE/project/47.png",q=JSON.parse('{"title":"前端工程化","description":"","frontmatter":{},"headers":[],"relativePath":"project/index.md","filePath":"project/index.md","lastUpdated":1698216410000}'),s={name:"project/index.md"},p=e('<h1 id="前端工程化" tabindex="-1">前端工程化 <a class="header-anchor" href="#前端工程化" aria-label="Permalink to &quot;前端工程化&quot;">​</a></h1><div class="tip custom-block"><p class="custom-block-title">软件工程</p><p>将工程方法系统化地应用到软件开发中</p></div><h2 id="流程图" tabindex="-1">流程图 <a class="header-anchor" href="#流程图" aria-label="Permalink to &quot;流程图&quot;">​</a></h2><p><img src="'+t+'" alt=""><img src="'+o+'" alt=""><img src="'+r+'" alt=""></p><h2 id="前端发展历史" tabindex="-1">前端发展历史 <a class="header-anchor" href="#前端发展历史" aria-label="Permalink to &quot;前端发展历史&quot;">​</a></h2><p>前端工程化的发展历史可以追溯到互联网的早期阶段，随着前端技术的不断演进和互联网应用的复杂化，前端工程化也逐渐成为了前端开发的重要领域。以下是前端工程化的主要发展里程碑：</p><ol><li>1995年，Brendan Eich发明Javascript</li><li>2005年，Ajax(Asynchronous Javascript And XML)广泛应用</li><li>2008年，V8引擎发布,意味着js可以脱离浏览器使用</li><li>2009年，Node.js发布，标志了前端工程化进入飞跃的时代</li><li>2010年，Npm 0.1版本发布标志的模块化的时代到来</li><li>2013年，Webpack 1.0版本发布，标志着现在前端开发模式正式形成。</li><li>2013年，React 1.0版本发布</li><li>2014年，Vue1.0版本发布，标志着前端MVVM时代到来</li></ol><h2 id="前端开发模式进化过程" tabindex="-1">前端开发模式进化过程 <a class="header-anchor" href="#前端开发模式进化过程" aria-label="Permalink to &quot;前端开发模式进化过程&quot;">​</a></h2><p>前端开发模式经历了多个阶段的演进，以下是前端开发模式的主要进化过程：</p><ol><li>前后端混合(1995~2005)：服务端渲染，javascript仅实现交互</li><li>前后端分离(2005~2013)：借助ajax实现前后端分离、SPA等新模式</li><li>模块化开发(2013~2014)：npm管理模块、Webpack编译打包资源</li><li>模块化+MVVM(2014~至今)：基于React或Vue开发，不再开发html，开发html成为历史</li></ol><h2 id="开发过程中的问题" tabindex="-1">开发过程中的问题 <a class="header-anchor" href="#开发过程中的问题" aria-label="Permalink to &quot;开发过程中的问题&quot;">​</a></h2><p>早先，我们在开发过程中难免会遇到一些问题：</p><ul><li>想要使用ES6+特性，但是兼容性有问题</li><li>想要使用Less/Sass/PostCSS增强CSS的编程性，但是运行环境不能直接支持</li><li>想要使用模块化的方式提高项目的维护性，但运行环境不能支持</li><li>除了上面支持的工作以外，我们在开发过程中也有重复性的工作，例如部署上线前需要手动压缩代码及资源文件，部署过程需要手动上传代码到服务器。手动会出现各种各样的工作。</li><li>多人协作开发，无法硬性统一大家的代码风格，从仓库中pull回来的代码质量无法保证，拉回来的代码运行崩溃。</li><li>除了编码问题，在开发部分功能时，需要等待后端服务接口提前完成</li></ul><p>以上问题可以看出工程化主要解决的问题主要分为：传统语言或语法的弊端，无法使用模块化、组件化，重复性的机械式工作，代码风格统一、质量保证，依赖后端服务接口支持，整体依赖后端项目。</p><h2 id="工程化介绍" tabindex="-1">工程化介绍 <a class="header-anchor" href="#工程化介绍" aria-label="Permalink to &quot;工程化介绍&quot;">​</a></h2><p>前端工程化是使用软件工程的技术和方法来进行前端的开发流程、技术、工具、经验等规范化、标准化，其主要目的为了提高效率和降低成本，即提高开发过程中的开发效率，减少不必要的重复工作时间，而前端工程本质上是软件工程的一种，前端工程是指将工程方法系统化地应用到前端开发中，以系统、严谨、可量化的方法开发、运营、维护前端应用程序，目的是降本提效。</p><p>在实际开发的过程中，一个完整的迭代周期需要依次经过开发、测试、部署、发布这几个环节，并且在产品上线之后，我们还需要对产品进行稳定性保障也就是实时的监控和报警系统，避免产品宕机。那么，工程化需要解决的问题就是如何在整个的迭代周期中降本提效。</p><p><img src="'+c+'" alt=""></p><p>工程化的表现是一切以提高效率、降低成本、质量保证为目的的手段都属于工程化，一切重复的工作都应自动化。我们从项目的创建、编码、预览、提交、部署这几个环节中，每一个环节都可以用工程化的方式去提高效率。</p><ul><li>创建项目：使用脚手架工具自动完成基础结构的搭建</li><li>编码：借助工程化的工具自动的完成代码的格式化以及风格的校验，从而确保所有开发人员代码风格一致，借助编译工具去使用新的特性提高编码效率</li><li>预览：可以借助Web服务能运行应用，同时提供热更新、SourceMap定位问题、Mock接口的功能</li><li>提交：在提交代码之前使用Git Hooks和Lint-staged完成项目代码的检查，确保不会把有问题的代码提交到仓库中。</li><li>部署：可以使用脚手架命令完成项目的上传，从而替代传统的ftp上传方式。还可以实现在代码提交过后自动化的通过持续集成和持续部署的方式，自动将代码部署到服务器中。</li></ul><p>工程化不是某个工具，例如webpack功能很强大，但是它并不是工程化。工程化的核心是对项目整体的规划、架构，而工具只是帮助我们落实工程化的工具和手段。</p><p>那么我们应该去选用那些工具来搭配完成工程化的规划呢？我们可以参考create-react-app、vue-cli、angular-cli、gatsby-cli等官方脚手架，它不是一个工具，而是一个成熟的工程化集成方案。以vue-cli为例，创建Vue项目的同时，vue-cli提供了模板选择、编译以及本地开发服务器等功能模块。对于使用vue-cli创建的Vue项目，业务开发人员无须操心复杂的webpack配置，只需关注业务逻辑开发本身，这很大程度上降低了开发的时间成本。</p><h2 id="工程化特性" tabindex="-1">工程化特性 <a class="header-anchor" href="#工程化特性" aria-label="Permalink to &quot;工程化特性&quot;">​</a></h2><p>前端工程化可以分成四大特性来说，分别为：</p><ol><li><p>模块化：将一个文件拆分成多个相互依赖的文件，最后进行统一的打包和加载，这样能够很好的保证高效的多人协作。其中包含</p><ul><li>JS 模块化：CommonJS、AMD、CMD 以及 ES6 Module。</li><li>CSS 模块化：Sass、Less、Stylus、BEM、CSS Modules 等。其中预处理器和 BEM 都会有的一个问题就是样式覆盖。而 CSS Modules 则是通过 JS 来管理依赖，最大化的结合了 JS 模块化和 CSS 生态，比如 Vue 中的 style scoped。</li><li>资源模块化：任何资源都能以模块的形式进行加载，目前大部分项目中的文件、CSS、图片等都能直接通过 JS 做统一的依赖关系处理。</li></ul></li><li><p>组件化：不同于模块化，模块化是对文件、对代码和资源拆分，而组件化则是对 UI 层面的拆分。</p><ul><li>通常，我们会需要对页面进行拆分，将其拆分成一个一个的零件，然后分别去实现这一个个零件，最后再进行组装。</li><li>在我们的实际业务开发中，对于组件的拆分我们需要做不同程度的考量，其中主要包括细粒度和通用性这两块的考虑。</li><li>对于业务组件，你更多需要考量的是针对你负责业务线的一个适用度，即你设计的业务组件是否成为你当前业务的 “通用” 组件。</li></ul></li><li><p>规范化：正所谓无规矩不成方圆，一些好的规范则能很好的帮助我们对项目进行良好的开发管理。规范化指的是我们在工程开发初期以及开发期间制定的系列规范，其中又包含了：</p><ul><li>项目目录结构</li><li>文档规范化</li><li>接口规范化</li><li>编码规范：对于编码这块的约束，一般我们都会采用一些强制措施，比如 ESLint、StyleLint 等。</li><li>联调规范</li><li>文件命名规范</li><li>样式管理规范：目前流行的样式管理有 BEM、Sass、Less、Stylus、CSS Modules 等方式。</li><li>git flow 工作流：其中包含分支命名规范、代码合并规范等。</li><li>定期 code review</li><li>… 等等</li></ul></li><li><p>自动化：从最早先的 grunt、gulp 等，再到目前的 webpack、parcel。这些自动化工具在自动化合并、构建、打包都能为我们节省很多工作。而这些前端自动化其中的一部分，前端自动化还包含了持续集成、自动化测试等方方面面。</p></li></ol><h2 id="前端工程化的3个阶段" tabindex="-1">前端工程化的3个阶段 <a class="header-anchor" href="#前端工程化的3个阶段" aria-label="Permalink to &quot;前端工程化的3个阶段&quot;">​</a></h2><ol><li>本地工具链</li></ol><p>前端工程化的初级阶段便是将各类工具的功能进行整合，为业务开发人员提供统一规范的工具栈。我们不妨将此阶段的前端工程化称为本地工具链形态。此形态下的所有工程化功能模块，包括构建、本地服务器、部署等，均在本地环境下工作。</p><p>本地工具链形态的工程化方案解决的问题，降低了业务开发人员学习、使用工具的成本。这个方案将复杂的功能需求全部交给工具链内部解决，工具链的统一，另一个好处是巩固了流程的规范性，开发者使用统一的工具链、遵循统一的规范进行业务代码的编写，利于多人协作与程序的维护。</p><ol start="2"><li>管理平台</li></ol><p>本地工具链形态的工程化虽然解决了前端开发以及前后端协作开发中的部分痛点问题，但由于所有的功能模块均在本地环境工作，因此必然会受到环境差异性的影响，比如操作系统类型、版本、内核等。这些因素会在一定程度上影响构建产出代码的一致性。为此前端工程化进化到下一进化形态：集中管理的云平台。</p><p>管理平台形态的工程化做到了以下几点。</p><ul><li>淡化环境差异性，保证构建产出的一致性。</li><li>权限集中管理，提高安全性。</li><li>项目版本集中管理，便于危机处理，比如版本回滚等。</li></ul><p>管理平台形态将各个功能模块的执行环境集中化，从各模块实现角度来讲与本地工具链基本一致。</p><ol start="3"><li>持续集成</li></ol><p>即使进化到管理平台形态，前端工程化方案所解决问题的本质仍然只是将前端工程师与服务器端工程师的工作解耦。这虽然提高了两方的工作效率，但其各自的工作流却是孤立的。前端有了构建和部署，后端也有了相应的阶段，两方的工作流是分离的，最终的融合工作仍然难以避免烦琐的人工操作。所以前端工程化最终的完美形态，必然与整体工作流结合，作为持续集成方案中的一环。</p><h2 id="企业的应用场景" tabindex="-1">企业的应用场景 <a class="header-anchor" href="#企业的应用场景" aria-label="Permalink to &quot;企业的应用场景&quot;">​</a></h2><ul><li>前端工程化贯穿整个研发流程，解决<code>研发流程</code>中的问题</li><li>工程化的核心目标是三点：<code>效率</code>、<code>规范</code>、<code>性能</code></li><li>只有了解前端研发流程的痛点，才能进行<code>诊断</code>和<code>优化</code></li><li>需要站在研发场景的角度去思考<code>研发流程痛点</code></li></ul><h2 id="企业前端项目面临的真实问题" tabindex="-1">企业前端项目面临的真实问题 <a class="header-anchor" href="#企业前端项目面临的真实问题" aria-label="Permalink to &quot;企业前端项目面临的真实问题&quot;">​</a></h2><ul><li>项目量级增加：由几千行代码升级到几万行代码</li><li>项目数量扩大：由几个项目扩大到几千个项目</li><li>项目复杂度高：由Web项目扩展到H5/PC/小程序/Node服务端/脚手架</li><li>团队人数增加：由几个前端扩展到几百个前端</li></ul><h2 id="企业前端工程问题解法" tabindex="-1">企业前端工程问题解法 <a class="header-anchor" href="#企业前端工程问题解法" aria-label="Permalink to &quot;企业前端工程问题解法&quot;">​</a></h2><ul><li>项目量级增加：通过采用模块化(CommonJS和ESM)的方式来将js拆分成一个一个的功能，达到多个项目复用，通过npm和webpack辅助实现。</li><li>项目数量扩大：在大厂中有几千个项目，需要通过研发平台和前端研发脚手架来创建、管理项目。</li><li>项目复杂度高：在大厂中不同的团队会用到vue、react、小程序等技术栈来开发，团队可能针对不同的技术栈开发不同的脚手架，导致重复造轮子，这样我们要通过工程脚手架(统一解决不同技术栈的工程差异)来解决，不管是vue或是react项目，在工程构建流程方面是统一的。</li><li>团队人数增长：通过研发平台和研发脚手架来帮助团队开发人员进行协同工作。</li></ul><h2 id="企业前端工程化的应用场景" tabindex="-1">企业前端工程化的应用场景 <a class="header-anchor" href="#企业前端工程化的应用场景" aria-label="Permalink to &quot;企业前端工程化的应用场景&quot;">​</a></h2><ul><li>工程脚手架：使用工程脚手架达到vue、react等工程的统一构建</li><li>研发脚手架：解决对项目的创建、发布以及管理项目</li><li>项目性能优化：对于项目的构建速度进行优化</li></ul><h2 id="相关文章" tabindex="-1">相关文章 <a class="header-anchor" href="#相关文章" aria-label="Permalink to &quot;相关文章&quot;">​</a></h2><ul><li><a href="https://juejin.cn/post/6844904093434019853" target="_blank" rel="noreferrer">如何推动前端团队的基础设施建设</a></li></ul>',46),n=[p];function d(u,h,m,S,b,_){return i(),a("div",null,n)}const f=l(s,[["render",d]]);export{q as __pageData,f as default};

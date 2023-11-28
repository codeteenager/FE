import{_ as s,o as i,c as a,R as n,b2 as l,b3 as e,b4 as t,b5 as p,b6 as h}from"./chunks/framework.7YoFtaeb.js";const C=JSON.parse('{"title":"CI & CD","description":"","frontmatter":{},"headers":[],"relativePath":"project/deploy/ci.md","filePath":"project/deploy/ci.md","lastUpdated":1683265897000}'),r={name:"project/deploy/ci.md"},k=n(`<h1 id="ci-cd" tabindex="-1">CI &amp; CD <a class="header-anchor" href="#ci-cd" aria-label="Permalink to &quot;CI &amp; CD&quot;">​</a></h1><p>在前端项目的构建部署流程里，除了使用构建工具执行构建之外，还有哪些因素会影响整个部署流程的工作效率？在部署系统中进行项目构建时，又会面临哪些和环境相关的问题和优化方案？</p><h2 id="前端项目的部署流程" tabindex="-1">前端项目的部署流程 <a class="header-anchor" href="#前端项目的部署流程" aria-label="Permalink to &quot;前端项目的部署流程&quot;">​</a></h2><p>在前端项目中，通常可以把在一个全新环境下的代码部署过程分为以下几个环节：</p><ol><li>获取代码：从代码仓库获取项目代码，并切换到待部署的分支或版本。</li><li>安装依赖：安装项目构建所需要的依赖包。</li><li>源码构建：使用构建工具对项目源代码进行构建，生成产物代码。</li><li>产物打包：将部署所需的代码（通常指的是构建后的产物代码，如果是部署 Node 服务则还需要其他目录与文件）打成压缩包。</li><li>推送代码：将待部署的文件或压缩包推送至目标服务器的特定目录下，如果是推送压缩包的情况，还需执行解压。</li><li>重启服务：在部署 Node 服务的情况下，在代码推送后需要进行服务重启。</li></ol><h2 id="本地部署相比部署系统的优势" tabindex="-1">本地部署相比部署系统的优势 <a class="header-anchor" href="#本地部署相比部署系统的优势" aria-label="Permalink to &quot;本地部署相比部署系统的优势&quot;">​</a></h2><p>对于使用部署系统的项目而言，除了重启服务这一步骤在普通静态服务部署中不需要执行外，上述其他环节通常是每次构建都需要经历的。</p><p>而如果使用本地开发环境进行部署，则可以根据情况对前两个环节进行简化：</p><ol><li>在获取代码的环节中，本地开发环境已经包含了项目的本地代码，同拉取完整的代码仓库相比，直接获取更新内容并切换分支或版本的处理要更快一些。</li><li>在安装依赖的环节中，本地开发环境通常已包含了构建所需的最新依赖包，即使切换到待部署版本后发现依赖版本有变更，更新依赖包的时间也比在空目录下完整安装依赖包的时间更短。</li></ol><p>此外，本地部署还有另外两点优势是使用部署系统所不具备的：</p><ol><li>增量构建：在构建配置与项目依赖不发生变化的情况下，理论上，本地部署可以让构建进程长时间地驻留，以达到增量构建的效果。</li><li>快速调试：本地部署时，构建过程会直接在本地进行，因此有任何构建问题时可以第一时间发现并处理。相比之下，远程的部署系统则需要将一定的时间消耗在链路反馈和本地环境切换上。</li></ol><p>因此，如果单从上面的部署环节来看，本地部署的效率一般优于部署系统，那么为什么在企业中通常不建议这样做呢？</p><h2 id="本地部署的劣势" tabindex="-1">本地部署的劣势 <a class="header-anchor" href="#本地部署的劣势" aria-label="Permalink to &quot;本地部署的劣势&quot;">​</a></h2><p>同远程部署系统相比，不管从安全性还是人员效率上看，本地部署都存在诸多问题：</p><h3 id="流程安全风险" tabindex="-1">流程安全风险 <a class="header-anchor" href="#流程安全风险" aria-label="Permalink to &quot;流程安全风险&quot;">​</a></h3><h4 id="环境一致性" tabindex="-1">环境一致性 <a class="header-anchor" href="#环境一致性" aria-label="Permalink to &quot;环境一致性&quot;">​</a></h4><p>本地部署的第一个问题在于无法保证环境的一致性：</p><ul><li>同一个项目，不同开发人员的本地环境（操作系统、NodeJS 版本等）都可能存在差异。</li><li>由于 NodeJS 语义化版本（Semantic Version）在安装时自动升级的问题，不同开发人员的本地 node_modules 中的依赖包版本也可能存在差异。</li><li>开发人员的本地环境和部署代码的目标服务器环境之间也可能存在差异。</li></ul><p>这些差异会导致项目代码的稳定性无法得到保障。例如对于一个 Node 项目而言，在一个 NodeJS 低版本环境下构建的产物，在 Node 高版本环境下就有可能启动异常。</p><p>因此，如果项目都由开发人员各自在本地部署，无疑会降低项目的稳定性，增加部署风险。</p><p>而使用远程统一的部署系统，一方面避免了不同开发人员的本地环境差异性，另一方面，部署系统的工作环境也可以与线上服务环境保持一致，从而降低环境不一致的风险。</p><h4 id="过程一致性" tabindex="-1">过程一致性 <a class="header-anchor" href="#过程一致性" aria-label="Permalink to &quot;过程一致性&quot;">​</a></h4><p>同环境一致性的问题相似，本地部署的第二个问题是无法保证部署过程的一致性。所谓过程的一致性，就是尽可能地让每次部署的流程顺序、各环节的处理过程都保持一致，从而打造规范化的部署流程。本地部署依赖人工操作，这就可能因为操作中的疏漏，导致过程一致性无法得到保障。尽管可以通过将部署流程写入脚本等方式减少人工误操作的风险，但是这和通过部署系统将完整处理过程写入代码的方式相比，仍然不够安全可靠。同时，系统可以记录每次部署操作的细节日志，便于当出现问题时快速解决。</p><h3 id="工作效率问题" tabindex="-1">工作效率问题 <a class="header-anchor" href="#工作效率问题" aria-label="Permalink to &quot;工作效率问题&quot;">​</a></h3><h4 id="可回溯性" tabindex="-1">可回溯性 <a class="header-anchor" href="#可回溯性" aria-label="Permalink to &quot;可回溯性&quot;">​</a></h4><p>可回溯性的问题可以从日志和产物两方面来看。</p><ul><li>日志：在部署过程中我们可能遇到各种问题，例如构建失败、单元测试执行失败、推送代码失败、部署后启动服务失败等。遇到这些问题时，需要有相应的日志来帮助定位。尽管在本地部署执行时也会输出日志，但是这些日志是临时的，查阅不便，且本地部署的日志至多只能保留当前一次的处理日志，如果希望对历史部署过程进行查看分析，更不能使用这种方式。</li><li>产物：通常，部署系统中会留存最近几次部署的构建产物包，以便当部署后的代码存在问题时能够快速回滚发布。而本地部署在项目的开发目录下执行，因此通常只会保留最近一次的构建产物，这就阻碍了上述快速回滚的实现。</li></ul><p>相对的，一个规范化的部署系统，则可以记录和留存每一次部署操作的细节日志，以及保留最近若干次的部署代码包，因此在可回溯性上又胜一筹。</p><h4 id="人员分工" tabindex="-1">人员分工 <a class="header-anchor" href="#人员分工" aria-label="Permalink to &quot;人员分工&quot;">​</a></h4><p>工作效率的第二个问题是人员分工问题，这个问题又可以从以下几个侧面来分析：</p><p>首先部署过程需要耗费时间。在本地部署当前项目的某一个分支时，无法同时对该项目进行继续开发，往往只能中断当前的工作，等待部署完成。</p><p>在这个前提下，一个项目中的多名开发人员如果各自在电脑中进行部署，无疑增大了上述流程安全的风险系数。但反过来，如果一个项目里只有个别开发者的本地环境拥有部署权限，则所有人的部署需求都会堆积到一起，大大增加对有权限的开发者的工作时间的占用。如果不能及时响应处理，也会延误其他人的后续工作。</p><p>此外由于分工角色的不同，在许多情况下，部署流程会主动由测试人员而非开发人员发起。当部署在开发人员的本地环境中进行时，会像上面多人开发集中部署那样彼此影响，也增加了相应的沟通成本。</p><h4 id="ci-cd-1" tabindex="-1">CI/CD <a class="header-anchor" href="#ci-cd-1" aria-label="Permalink to &quot;CI/CD&quot;">​</a></h4><p><a href="https://en.wikipedia.org/wiki/Continuous_integration" target="_blank" rel="noreferrer">持续集成</a>（Continuous Integration，CI）和<a href="https://en.wikipedia.org/wiki/Continuous_delivery" target="_blank" rel="noreferrer">持续交付</a>（Continuous Delivery，CD），是软件生产领域提升迭代效率的一种工作方式：开发人员提交代码后由 CI/CD 系统自动化地执行合并、构建、测试和部署等一系列管道化（Pipeline）的流程，从而尽早发现和反馈代码问题，以小步快跑的方式加速软件的版本迭代过程。</p><p>这个过程通常是各系统（版本管理系统、构建系统、部署系统等）以自动化的方式协同完成的。而本地部署依赖人工操作，所以并不支持这种自动化的处理过程。</p><h2 id="代码部署工具" tabindex="-1">代码部署工具 <a class="header-anchor" href="#代码部署工具" aria-label="Permalink to &quot;代码部署工具&quot;">​</a></h2><p>在企业项目和开源项目中被广泛使用的几个典型部署工具，包括 Jenkins、CircleCI、Github Actions、Gitlab CI。</p><h3 id="jenkins" tabindex="-1">Jenkins <a class="header-anchor" href="#jenkins" aria-label="Permalink to &quot;Jenkins&quot;">​</a></h3><p><a href="https://www.jenkins.io/" target="_blank" rel="noreferrer">Jenkins</a> 是诞生较早且使用广泛的开源持续集成工具。早在 2004 年，Sun 公司就推出了它的前身 Husdon，它在 2011 年更名为 Jenkins。下面介绍它的功能特点。</p><p>功能特点</p><ul><li>搭建方式：Jenkins 是一款基于 Java 的应用程序，官方提供了 Linux、Mac 和 Windows 等各系统下的搭建方式，同时也提供了基于 Docker 的容器化搭建方式。此外，Jenkins 支持分布式的服务方式，各任务可以在不同的节点服务器上运行。</li><li>收费方式：Jenkins 是完全免费的开源产品。</li><li>多类型 Job：Job 是 Jenkins 中的基本工作单元。它可以是一个项目的构建部署流程，也可以是其他类型，例如流水线（Pipeline）。在 Jenkins 中支持各种类型的 Job：自定义项目、流水线、文件夹、多配置项目、Github 组织等。</li><li>插件系统：Jenkins 架构中内置的插件系统为它提供了极强的功能扩展性。目前 Jenkins 社区中共有超过1500 个插件，功能涵盖了继续继承和部署的各个环节。</li><li>Job 配置：得益于其插件系统，在 Jenkins 的 Job 配置中可以灵活定制各种复杂的构建与部署选项，例如构建远程触发、构建参数化选项、关联 Jira、执行 Windows 批处理、邮件通知等。</li><li>API 调用：Jenkins 提供了 Restful 的 API 接口，可用于外部调用控制节点、任务、配置、构建等处理过程。</li></ul><h3 id="circleci" tabindex="-1">CircleCI <a class="header-anchor" href="#circleci" aria-label="Permalink to &quot;CircleCI&quot;">​</a></h3><p><a href="https://circleci.com/product/" target="_blank" rel="noreferrer">CircleCI</a> 是一款基于云端的持续集成服务，下面介绍它的功能特点。</p><p>功能特点</p><ul><li>云端服务：由于 CircleCI 是一款基于云端的持续集成服务，因此无须搭建和管理即可直接使用。同时也提供了收费的本地化搭建服务方式。</li><li>收费方式：CircleCI 的云端服务分为免费与收费两种，免费版本一个账号只能同时运行一个 Job，同时对使用数据量、构建环境等有一定限制。而收费版本则提供了更多的并发构建数、更多的环境、更快的性能等。此外，如第一点所述，企业内部使用的本地化搭建服务方式也是收费的。</li><li>缓存优化：CircleCI 的任务构建是基于容器化的，因此能够缓存依赖安装的数据，从而加速构建流程。</li><li>SSH 调试：它提供了基于 SSH 访问构建容器的功能，便于在构建错误时快速地进入容器内进行调试。</li><li>配置简化：在 CircleCI 中提供了开箱即用的用户体验，只需要少量配置即可快速开始构建项目。</li><li>API 调用：CircleCI 中也提供了 Restfull 的 API 接口，可用于访问项目、构建和产物。</li></ul><h3 id="github-actions" tabindex="-1">Github Actions <a class="header-anchor" href="#github-actions" aria-label="Permalink to &quot;Github Actions&quot;">​</a></h3><p><a href="https://github.com/features/actions" target="_blank" rel="noreferrer">Github Actions</a>（GHA）是 Github 官方提供的 CI/CD 流程工具，用于为 Github 中的开源项目提供简单易用的持续集成工作流能力。</p><p>功能特点</p><ul><li>多系统：提供 Linux、Mac、Windows 等各主流操作系统环境下的运行能力，同时也支持在容器中运行。</li><li>矩阵运行：支持同时在多个操作系统或不同环境下（例如不同 NodeJS 版本的环境中）运行构建和测试流程。</li><li>多语言：支持 NodeJS、JAVA、PHP、Python、Go、Rust 等各种编程语言的工作流程。</li><li>多容器测试：支持直接使用 Docker-Compose 进行多容器关联的测试（而 CircleCI 中则需要先执行安装才能使用）。</li><li>社区支持：Github 社区中提供了众多工作流的模板可供选择使用，例如构建并发布 npm 包、构建并提交到 Docker Hub 等。</li><li>费用情况：Github Action 对于公开的仓库，以及在自运维执行器的情况下是免费的。而对于私有仓库则提供一定额度的免费执行时间和免费存储空间，超出部分则需要收费。</li></ul><h3 id="gitlab-ci" tabindex="-1">Gitlab CI <a class="header-anchor" href="#gitlab-ci" aria-label="Permalink to &quot;Gitlab CI&quot;">​</a></h3><p>Gitlab 是由 Gitlab Inc. 开发的基于 Git 的版本管理与软件开发平台。除了作为代码仓库外，它还具有在线编辑、Wiki、CI/CD 等功能。在费用方面，它提供了免费的社区版本（Community Edition，CE）和免费或收费的商用版本（Enterprise Edition，EE）。其中社区版本和免费的商用版本的区别主要体现在升级到付费商用版本时的操作成本。另一方面，即使是免费的社区版本，其功能也能够满足企业内的一般使用场景，因此常作为企业内部版本管理系统的主要选择之一，下面我们就来了解 Gitlab 内置的 CI/CD 功能。</p><p>功能特点</p><ul><li>与前面两款产品相似的是，Gitlab CI 也使用 yml 文件作为 CI/CD 工作流程的配置文件，在 Gitlab 中，默认的配置文件名为 .gitlab-ci.yml。在配置文件中涵盖了任务流水线（Pipeline）的处理过程细节：例如在配置文件中可以定义一到多个任务（Job），每个任务可以指定一个任务运行的阶段（Stage）和一到多个执行脚本（Script）等。完整的 .gitlab-ci.yml 配置项可参考<a href="https://docs.gitlab.com/ee/ci/yaml/index.html" target="_blank" rel="noreferrer">官方文档</a>。</li><li>独立安装执行器：与前面两款产品不同的是，Gitlab 中需要单独安装执行器。Gitlab 中的执行器 Gitlab Runner 是一个独立运行的开源程序，它的作用是执行任务，并将结果反馈到 Gitlab 中。开发者可以在独立的服务器上<a href="https://docs.gitlab.com/runner/install/index.html" target="_blank" rel="noreferrer">安装</a>Gitlab Runner 工具，然后依次执行gitlab-runner register注册特定配置的 Runner，最后执行gitlab-runner start启动相应服务。此外，项目中除了注册独立的 Runner 外，也可以使用共享的或组内通用的 Runner。</li></ul><p>当项目根目录中存在.gitlab-ci.yml 文件时，用户提交代码到 Git 仓库时，在 Gitlab 的 CI/CD 面板中即可看到相应的任务记录，当成功设置 gitlab-runner 时这些任务就会在相应的 Runner 中执行并反馈日志和结果。</p><h2 id="依赖安装效率优化" tabindex="-1">依赖安装效率优化 <a class="header-anchor" href="#依赖安装效率优化" aria-label="Permalink to &quot;依赖安装效率优化&quot;">​</a></h2><h3 id="五种前端依赖的安装方式" tabindex="-1">五种前端依赖的安装方式 <a class="header-anchor" href="#五种前端依赖的安装方式" aria-label="Permalink to &quot;五种前端依赖的安装方式&quot;">​</a></h3><p>我们先来对比 5 种不同的前端依赖安装方式：</p><ul><li>npm：npm 是 NodeJS 自带的包管理工具，也是使用最广泛的工具之一。在测试时我们使用它的默认安装命令 npm install，不带额外参数。</li><li>Yarn：Yarn 是 Facebook 于 2016 年发布的包管理工具，和 npm 5 之前的版本相比，Yarn 在依赖版本稳定性和安装效率方面通常更优（在 Github 中，Yarn 的 star 数量是 npm 的两倍多，可见其受欢迎程度）。在测试时我们同样使用默认安装命令 Yarn, 不带额外参数。</li><li>Yarn with PnP：Yarn 自 1.12 版本开始支持 PnP 功能，旨在抛弃作为包管理目录的 node_modules，而使用软链接到本地缓存目录的方式来提升安装和模块解析的效率。在测试时我们使用 yarn --pnp，不带额外参数。。</li><li>Yarn v2：Yarn 在 2020 年初发布了 v2 版本，它和 v1 版本相比有许多重大改变，包括默认使用优化后的 PnP 等。v2 版本目前通过 Set Version 的方式安装在项目内部，而非全局安装。测试时我们使用安装命令 Yarn，不带额外参数。</li><li>pnpm：pnpm 是于 2017 年发布的包管理工具，和 Yarn 相同，它也支持依赖版本的确定性安装特性，同时使用硬连接与符号连接缓存目录的方式，这种方式相比于非 PnP 模式下的 Yarn 安装而言磁盘存储效率更高。测试时我们使用安装命令 pnpm install，不带额外参数。</li></ul><h3 id="依赖安装的基本流程" tabindex="-1">依赖安装的基本流程 <a class="header-anchor" href="#依赖安装的基本流程" aria-label="Permalink to &quot;依赖安装的基本流程&quot;">​</a></h3><p>在对影响效率的问题进行分析之前，我们需要先了解一下前端依赖安装的基本流程阶段划分，这有助于分析不同场景下执行时间的快慢因素，排除各工具的细节差异。前端项目中依赖包安装的主要执行阶段如下：</p><ul><li>解析依赖关系阶段：这个阶段的主要功能是分析项目中各依赖包的依赖关系和版本信息。</li><li>下载阶段：这个阶段的主要功能是下载依赖包。</li><li>链接阶段：这个阶段的主要功能是处理项目依赖目录和缓存之间的硬链接和符号连接。</li></ul><p>那么如何获取执行时间呢？</p><h3 id="如何获取执行时间" tabindex="-1">如何获取执行时间 <a class="header-anchor" href="#如何获取执行时间" aria-label="Permalink to &quot;如何获取执行时间&quot;">​</a></h3><p>上面的几种安装方式中，npm 和 Yarn 在执行完成后的输出日志中会包含执行时间，而 pnpm 的输出日志中则没有。不过我们还是可以使用系统提供的 time 命令来获取，方法如下所示：</p><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">time</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> npm i</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">time</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> yarn</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">time</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> pnpm i</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="如何获取执行日志" tabindex="-1">如何获取执行日志 <a class="header-anchor" href="#如何获取执行日志" aria-label="Permalink to &quot;如何获取执行日志&quot;">​</a></h3><p>除了获取安装过程的执行时间外，如果需要进一步分析造成时间差异的原因，就需要从安装过程日志中获取更详细的执行细节，从中寻找答案。不同工具显示详细日志的方式也不同：</p><ul><li>npm：使用 npm 安装时需要在执行命令后增加***--verbose***来显示完整日志。</li><li>Yarn v1：Yarn v1 版本（包括 Yarn --PnP）的实现方法和 npm 一样，即通过增加 --verbose 来显示完整日志。</li><li>Yarn v2：Yarn v2 版本默认显示完整日志，可通过 --json 参数变换日志格式，这里使用默认设置即可。</li><li>pnpm：pnpm 安装时需要在执行命令后增加 --reporter ndjson 来显示完整日志。</li></ul><h3 id="环境状态的五个分析维度" tabindex="-1">环境状态的五个分析维度 <a class="header-anchor" href="#环境状态的五个分析维度" aria-label="Permalink to &quot;环境状态的五个分析维度&quot;">​</a></h3><p>在确定了安装工具和分析方式后，我们还需要对执行过程进行划分，下面我一共区分了 5 种项目执行安装时可能遇到的场景：</p><table><thead><tr><th>场景名称</th><th>Lock文件</th><th>历史安装目录</th><th>本地缓存</th><th>示例中日志名称</th></tr></thead><tbody><tr><td>纯净环境</td><td>-</td><td>-</td><td>-</td><td>chean_install.log</td></tr><tr><td>Lock环境</td><td>Y</td><td>-</td><td>-</td><td>lock_install.log</td></tr><tr><td>缓存环境</td><td>Y</td><td>-</td><td>Y</td><td>cached_install.log</td></tr><tr><td>无缓存的重复安装环境</td><td>Y</td><td>Y</td><td>-</td><td>nocache_reinstall.log</td></tr><tr><td>重复安装环境</td><td>Y</td><td>Y</td><td>Y</td><td>cached_reinstall.log</td></tr></tbody></table><blockquote><p>注 1：除了第一种纯净环境外，后面的环境中都存在 Lock 文件。因为 Lock 文件对于提供稳定依赖版本至关重要。出于现实场景考虑，这里不再单独对比没有 Lock 文件但存在历史安装目录的场景。 注 2： 为了屏蔽网络对解析下载依赖包的影响，所有目录下均使用相同注册表网址 registry.npm.taobao.org。 注 3：以下时间统计的默认设备为 MacOS，网速约为 20Mbit/s。</p></blockquote><h3 id="不同维度对安装效率的影响分析" tabindex="-1">不同维度对安装效率的影响分析 <a class="header-anchor" href="#不同维度对安装效率的影响分析" aria-label="Permalink to &quot;不同维度对安装效率的影响分析&quot;">​</a></h3><h2 id="github-actions自动部署应用到自己的服务器" tabindex="-1">Github Actions自动部署应用到自己的服务器 <a class="header-anchor" href="#github-actions自动部署应用到自己的服务器" aria-label="Permalink to &quot;Github Actions自动部署应用到自己的服务器&quot;">​</a></h2><p>首先我们需要有自己的服务器环境，可以选择购买阿里云或腾讯云来使用。然后安装对应的Node或Nginx环境，简单安装可以使用<a href="https://www.bt.cn/" target="_blank" rel="noreferrer">宝塔面板</a>来安装。首先安装宝塔面板</p><p><img src="`+l+'" alt=""></p><p>官方提供了命令来安装</p><p><img src="'+e+'" alt=""></p><p>然后会提供外网面板地址、用户名和密码等信息。</p><p>Github Actions是Github上一个类似于持续集成的功能，它允许你在一些节点上（如提交代码，特定时间等）触发一些操作。我们这里就利用它来实现自动部署应用到自己的服务器。</p><p>配置服务器密钥</p><ul><li>生成密钥：ssh-keygen -m PEM -t rsa -b 4096 -C &quot;<a href="mailto:xxxxxxxxx@xxx.com" target="_blank" rel="noreferrer">xxxxxxxxx@xxx.com</a>&quot;</li><li>将公钥保存到 authorized_keys 文件中：cat ~/.ssh/id_rsa.pub &gt;&gt; ~/.ssh/authorized_keys</li></ul><p>配置 SSH 公钥(将服务器公钥添加到GitHub账户的SSH)</p><p><img src="'+t+'" alt=""></p><p>配置GitHub SSH、Secrets，配置路径：当前仓库 -&gt; Settings -&gt; Secrets (这里配置的变量是 xxx.yml 文件中 <code>secrets.你配置的名称</code> )</p><p><img src="'+p+`" alt=""></p><ul><li>REMOTE_HOST：服务器地址</li><li>REMOTE_TARGET：服务器目录</li><li>REMOTE_USER：服务器账户</li><li>REMOTE_SSK_KEY：服务器私钥</li></ul><p>然后在仓库的根目录，创建 .github/workflows 目录，在 .github/workflows 目录下 添加 xxx.yml 或 xxx.yaml 文件</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: GitHub Pages</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"># 在main分支发生push事件时触发。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  push</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    branches</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> main</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  pull_request</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">env</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: # 设置环境变量</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  TZ</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: Asia</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Shanghai # 时区（</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">设置时区可使页面中的</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`最近更新时间\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">使用时区时间）</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">jobs</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  build</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: # 自定义名称</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    runs</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: ubuntu</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">latest # 运行在虚拟机环境ubuntu</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">latest</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    strategy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      matrix</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        node</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [16.x]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    steps</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      -</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: Checkout # 步骤1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        uses</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: actions</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">checkout@v1 # 使用的动作。格式：userName</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">repoName。作用：检出仓库，获取源码。 官方actions库：</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">https</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//github.com/actions</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      -</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: Use Node.js \${{ matrix.node</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">version }} # 步骤2</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        uses</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: actions</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">setup</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">node@v1 # 作用：安装nodejs</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        with</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          node</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: \${{ matrix.node</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">version }} # 版本</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      # 生成静态文件</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      -</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: Build</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        run</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: npm install </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> npm run build</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      -</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: Deploy # 步骤3</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        uses</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: easingthemes</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">ssh</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">deploy@v2.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.2</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        env</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">          SSH_PRIVATE_KEY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: \${{ secrets.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">REMOTE_SSK_KEY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">          ARGS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;-avz --delete&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">          SOURCE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;dist/&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">          REMOTE_HOST</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: \${{ secrets.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">REMOTE_HOST</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">          REMOTE_USER</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: \${{ secrets.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">REMOTE_USER</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">          TARGET</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: \${{ secrets.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">REMOTE_TARGET</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br></div></div><p>最后在github中actions中查看构建</p><p><img src="`+h+'" alt=""></p>',92),d=[k];function o(c,E,b,u,g,m){return i(),a("div",null,d)}const F=s(r,[["render",o]]);export{C as __pageData,F as default};

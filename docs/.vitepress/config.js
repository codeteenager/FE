module.exports = {
    title: '前端技术',
    description: '前端技术',
    base: '/FE/',
    markdown: {
        lineNumbers: true, //显示代码行数
    },
    lastUpdated: true,
    head: [
        ['link', { rel: 'icon', href: '/FE/favicon.ico' }]
    ],
    themeConfig: {
        outlineTitle: '在本页面',
        lastUpdatedText: '最近更新时间',
        nav: [
            {
                text: '前端基础',
                link: "/web/foundation/index"
            },
            {
                text: '前端框架',
                link: "/framework/vuex"
            },
            {
                text: '前端工程化',
                link: "/project/index"
            }
        ],
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2022-present codeteenager'
        },
        socialLinks: [{ icon: "github", link: "https://github.com/codeteenager/FE" }],
        sidebar: {
            "/web/": [

                {
                    text: "前端基础",
                    items: [
                        {
                            text: "介绍",
                            link: "/web/foundation/index",
                        },
                        {
                            text: "前端工程师原型",
                            link: "/web/foundation/engineer",
                        },
                        {
                            text: "函数式编程",
                            link: "/web/foundation/functional",
                        },
                        {
                            text: "异步编程",
                            link: "/web/foundation/asynchronous",
                        },
                        {
                            text: "ECMAScript",
                            link: "/web/foundation/ecmascript",
                        },
                        {
                            text: "TypeScript",
                            link: "/web/foundation/typescript",
                        },
                        {
                            text: "跨域",
                            link: "/web/foundation/cross-domain",
                        }
                    ],
                },
                {
                    text: "JavaScript",
                    collapsible: true,
                    collapsed: false,
                    items: [
                        {
                            text: "JavaScript数据类型",
                            link: "/web/js/javascript-datatype",
                        },
                        {
                            text: "JavaScript原型与原型链",
                            link: "/web/js/javascript-prototype",
                        },
                        {
                            text: "JavaScript性能优化",
                            link: "/web/js/javascript-optimization",
                        },
                        {
                            text: "JS常见的6种继承方式",
                            link: "/web/js/extends"
                        },
                        {
                            text: "apply&call&bind原理介绍",
                            link: "/web/js/call-apply-bind"
                        }
                    ]
                },
                {
                    text: "浏览器",
                    collapsible: true,
                    collapsed: false,
                    items: [
                        {
                            text: "浏览器工作原理",
                            link: "/web/browser/chrome",
                        },
                        {
                            text: "宏任务 & 微任务的运行机制",
                            link: "/web/browser/task",
                        },
                    ]
                },
                {
                    text: "其他",
                    collapsible: true,
                    collapsed: false,
                    items: [
                        {
                            text: "技术博文",
                            link: "/web/other/blog",
                        },
                        {
                            text: "技术分享",
                            link: "/web/other/share",
                        },
                        {
                            text: "杂文",
                            link: "/web/other/essay",
                        },
                    ]
                }
            ],
            "/framework/": [
                {
                    text: "Vue生态",
                    items: [
                        {
                            text: "Vuex",
                            link: "/framework/vuex.md",
                        },
                        {
                            text: "Vue Router",
                            link: "/framework/vue-router.md",
                        },
                        {
                            text: "Nuxt",
                            link: "/framework/nuxt.md",
                        },
                        {
                            text: "vue-loader",
                            link: "/framework/vue-loader.md",
                        },
                        {
                            text: "vue响应式原理",
                            link: "/framework/vue-reactivity.md",
                        },
                        {
                            text: "vue虚拟DOM",
                            link: "/framework/vue-vdom.md",
                        },
                        {
                            text: "Vue SSR",
                            link: "/framework/vue-ssr.md",
                        }
                    ],
                }
            ],
            "project": [
                {
                    text: "工程化",
                    collapsible: true,
                    collapsed: false,
                    items: [
                        {
                            text: "介绍",
                            link: "/project/index",
                        },
                        {
                            text: "模块化",
                            link: "/project/module",
                        },
                        {
                            text: "组件化",
                            link: "/project/component",
                        },
                    ],
                },
                {
                    text: "工具",
                    collapsible: true,
                    collapsed: false,
                    items: [
                        {
                            text: "介绍",
                            link: "/project/tools/index",
                        },
                        {
                            text: "npm",
                            link: "/project/tools/npm",
                        },
                        {
                            text: "Webpack",
                            link: "/project/tools/webpack",
                        },
                        {
                            text: "脚手架",
                            link: "/project/tools/cli",
                        },
                        {
                            text: "Vite",
                            link: "/project/tools/vite",
                        },
                        {
                            text: "Gridsome",
                            link: "/project/tools/gridsome",
                        }
                    ],
                },
                {
                    text: "规范",
                    collapsible: true,
                    collapsed: false,
                    items: [
                        {
                            text: "规范化",
                            link: "/project/standard/index",
                        },
                        {
                            text: "项目研发流程",
                            link: "/project/standard/project-process",
                        },
                        {
                            text: "Git工作流规范",
                            link: "/project/standard/git",
                        },
                    ],
                },
                {
                    text: "构建",
                    collapsible: true,
                    collapsed: false,
                    items: [
                        {
                            text: "自动化构建",
                            link: "/project/build/automation",
                        },
                        {
                            text: "增量更新",
                            link: "/project/build/update",
                        },
                        {
                            text: "No-bundle",
                            link: "/project/build/nobundle",
                        },
                        {
                            text: "服务端渲染",
                            link: "/project/build/ssr",
                        },
                    ],
                },
                {
                    text: "部署",
                    collapsible: true,
                    collapsed: false,
                    items: [
                        {
                            text: "介绍",
                            link: "/project/deploy/index",
                        },
                        {
                            text: "npm仓库",
                            link: "/project/deploy/registry",
                        },
                        {
                            text: "发布",
                            link: "/project/deploy/publish",
                        },
                        {
                            text: "灰度发布",
                            link: "/project/deploy/grey-publish",
                        },
                        {
                            text: "发布回滚",
                            link: "/project/deploy/publish-rollback",
                        },
                    ],
                },
                {
                    text: "解决方案",
                    collapsible: true,
                    collapsed: false,
                    items: [
                        {
                            text: "物料平台建设",
                            link: "/project/solution/material",
                        },
                        {
                            text: "组件库建设",
                            link: "/project/solution/component-library",
                        },
                        {
                            text: "中后台解决方案",
                            link: "/project/solution/admin",
                        },
                        {
                            text: "文件上传",
                            link: "/project/solution/file-upload",
                        },
                        {
                            text: "水印",
                            link: "/project/solution/watermark",
                        },
                        {
                            text: "数据统计",
                            link: "/project/solution/statistics",
                        },
                        {
                            text: "在线简历",
                            link: "/project/solution/resume-online",
                        },
                    ],
                },
            ]
        },
        docFooter: {
            prev: '上一页',
            next: '下一页'
        }
    }
}
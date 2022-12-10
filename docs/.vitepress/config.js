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
                            text: "浏览器工作原理",
                            link: "/web/foundation/chrome",
                        },
                        {
                            text: "跨域",
                            link: "/web/foundation/cross-domain",
                        },
                        {
                            text: "中后台解决方案",
                            link: "/web/foundation/admin",
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
                    ],
                },
                {
                    text: "工具",
                    collapsible: true,
                    collapsed: false,
                    items: [
                        {
                            text: "npm",
                            link: "/project/tools/npm",
                        },
                        {
                            text: "Webpack",
                            link: "/project/tools/webpack",
                        },
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
                        // {
                        //     text: "介绍",
                        //     link: "/project/index",
                        // },
                    ],
                },
                {
                    text: "部署",
                    collapsible: true,
                    collapsed: false,
                    items: [
                        {
                            text: "npm仓库",
                            link: "/project/deploy/registry",
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
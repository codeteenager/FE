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
                text: '博文',
                link: "/web/index"
            },
            {
                text: '源码学习',
                link: "/source/vuex"
            }
        ],
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2022-present Codeteenager'
        },
        socialLinks: [{ icon: "github", link: "https://github.com/codeteenager/FE" }],
        sidebar: {
            "/web/": [

                {
                    text: "基础",
                    items: [
                        {
                            text: "介绍",
                            link: "/web/index",
                        },
                        {
                            text: "技术博文",
                            link: "/web/blog",
                        },
                        {
                            text: "技术分享",
                            link: "/web/share",
                        },
                        {
                            text: "杂文",
                            link: "/web/essay",
                        },
                        {
                            text: "Git工作流规范",
                            link: "/web/git",
                        },
                        {
                            text: "中后台解决方案",
                            link: "/web/admin",
                        }
                    ],
                },
                {
                    text: "工程化",
                    collapsible: true,
                    collapsed: true,
                    items: [
                        {
                            text: "介绍",
                            link: "/web/project/index",
                        },
                        {
                            text: "模块化",
                            link: "/web/project/module",
                        },
                        {
                            text: "npm",
                            link: "/web/project/npm",
                        },
                        {
                            text: "Webpack",
                            link: "/web/project/webpack",
                        },
                    ],
                }
            ],
            "/source/": [
                {
                    text: "Vue生态",
                    items: [
                        {
                            text: "Vuex",
                            link: "/source/vuex.md",
                        },
                        {
                            text: "Vue Router",
                            link: "/source/vue-router.md",
                        },
                        {
                            text: "Nuxt",
                            link: "/source/nuxt.md",
                        }
                    ],
                }
            ],
        },
        docFooter: {
            prev: '上一页',
            next: '下一页'
        }
    }
}
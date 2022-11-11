module.exports = {
    title: '前端技术',
    description: '前端技术',
    base: '/FE/',
    themeConfig: {
        // siteTitle: false,
        // logo: "/logo.svg",
        nav: [
            {
                text: '博文',
                link: "/web/index"
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
                        }
                    ],
                }
            ],
        }
    },
    docFooter: {
        prev: '上一页',
        next: '下一页'
    }
}
module.exports = {
    title: '前端面试八股文',
    description: '前端面试八股文',
    base: '/interview/',
    themeConfig: {
        // siteTitle: false,
        // logo: "/logo.svg",
        nav: [
            {
                text: '前端面试题',
                link: "/web/algorithm"
            }
        ],
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2022-present Codeteenager'
        },
        socialLinks: [{ icon: "github", link: "https://github.com/codeteenager/interview" }],
        sidebar: {
            "/web/": [

                {
                    text: "基础",
                    items: [
                        {
                            text: "数据结构与算法",
                            link: "/web/algorithm",
                        },
                        {
                            text: "手写题",
                            link: "/web/program",
                        },
                        {
                            text: "其他面经",
                            link: "/web/other",
                        }
                    ],
                }
            ],
        }
    }
}
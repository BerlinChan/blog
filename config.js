module.exports = {
  url: 'https://www.berlinchan.com/',
  archivedBlogUrl: 'https://archived-blog.berlinchan.com',
  pathPrefix: '/',
  title: '陈柏林的 Blog',
  subtitle: '',
  copyright: '',
  postsPerPage: 8,
  googleAnalyticsId: 'UA-73379983-2',
  disqusShortname: 'berlinchan',
  menu: [
    {
      label: '文章',
      path: '/',
      // 前端 小玩意 观点 短片 摄影 旅游 文化
    },
    {
      label: '作品',
      path: '/',
      children: [
        {
          label: '自由的家猫',
          link: 'https://www.awildpetcat.com/',
        },
        {
          label: '旧站博物馆',
          link: 'https://museum.berlinchan.com/',
        },
      ],
    },
    {
      label: '关于我',
      path: '/pages/about',
    },
    {
      label: 'Contact me',
      path: '/pages/contacts',
    },
  ],
  author: {
    name: '',
    photo: '/photo.jpg',
    bio: '前端开发工程师、摄影师，理想主义与黑客精神',
    contacts: {
      twitter: 'BerlinChanCom',
      facebook: 'berlinchancom',
      github: 'BerlinChan',
      email: 'berlinchancom@gmail.com',
      rss: 'rss.xml',
    },
  },
}

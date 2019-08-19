module.exports = {
  url: 'https://www.berlinchan.com/',
  pathPrefix: '/',
  title: '陈柏林',
  subtitle: '',
  copyright: '',
  disqusShortname: 'berlinchan',
  postsPerPage: 4,
  googleAnalyticsId: 'UA-73379983-2',
  useKatex: false,
  menu: [
    {
      label: '文章',
      path: '/',
      // 前端 影片 摄影 钢琴
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
      telegram: '#',
      rss: '#',
      vkontakte: '#',
    },
  },
}

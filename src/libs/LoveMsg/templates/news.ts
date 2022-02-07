/**
 * 图文消息，一个图文消息支持1到8条图文
 */

interface ArticlesProps {
  title: string
  description: string
  url: string
  picurl: string
}
export const newsTemplate = () => {
  // const articles = [] as ArticlesProps[]

  // console.log(list, 22222)
  const articles = [{
    title: '宝贝',
    description: 'description',
    url: 'https://p.qpic.cn/pic_wework/3478722865/afa947a3b89c3e79786e5b6708edd3e154e17fa6cbb98ac0/0', // 60s看世界
    picurl: 'https://p.qpic.cn/pic_wework/3478722865/afa947a3b89c3e79786e5b6708edd3e154e17fa6cbb98ac0/0', // 60s看世界
  }]
  // map
  // if (list && Array.isArray(list)) {
  //   articles = list.map((n) => {
  //     return {
  //       title: n.title,
  //       description: n.description,
  //       url: n.url,
  //       picurl: n.picUrl,
  //     }
  //   })
  // }

  return {
    msgtype: 'news',
    news: {
      articles,
    },
  }
}

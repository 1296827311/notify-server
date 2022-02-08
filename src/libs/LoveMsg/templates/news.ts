/**
 * 图文消息，一个图文消息支持1到8条图文
 */
import API from '../../../api/loveMsg'
import dayjs from '../../../utils/dayjs'

interface ArticlesProps {
  title: string
  description: string
  url: string
  picurl: string
}
const start_stamp = '2021-03-14'
// let today = ''
export const time = (data: TextCardTemplateProps) => {
  const {
    date,
    lunarInfo,
  } = data
  // today = `${date.replace('-', '年').replace('-', '月')}日`
  const dateLength = dayjs(date).diff(start_stamp, 'day')
  const mouth = dayjs(date).diff(start_stamp, 'month')
  const { festival } = lunarInfo
  const festival_info = festival ? `| ${festival}` : ''
  const param = {
    mouth,
    dateLength,
    festival_info,
  }
  return param
}

export const newsTemplate = async() => {
  const weather = await API.getWeather('广州')
  if (weather) {
    const lunarInfo = await API.getLunarDate(weather.date)
    const param = time({ ...weather, lunarInfo })
    const articles = [{
      title: `宝贝，今天是我们牵手迈向的第${param.mouth + 1}个月了，第${param.mouth + 1}个月快乐呀，Love you more and more！`,
      description: '喜乐有分享，共度日月长。',
      url: 'http://m.qpic.cn/psc?/V11O7SLX0g8l1K/45NBuzDIW489QBoVep5mcZsnB1RWxLetc*aTUVhSccgfDBDqKs6656pInIZRH8a9gTXnL5IOwyzNKd.Dghax1R0jJzMXVgNFMEbx4YKvr3s!/b&bo=oAU4BKAFOAQBGT4!&rf=viewer_4',
      picurl: 'http://m.qpic.cn/psc?/V11O7SLX0g8l1K/45NBuzDIW489QBoVep5mcZsnB1RWxLetc*aTUVhSccgfDBDqKs6656pInIZRH8a9gTXnL5IOwyzNKd.Dghax1R0jJzMXVgNFMEbx4YKvr3s!/b&bo=oAU4BKAFOAQBGT4!&rf=viewer_4',
    }]
    if (weather.date.slice(8, 10) === '14') {
      return {
        msgtype: 'news',
        news: {
          articles,
        },
      }
    }
  }
  // const articles = [] as ArticlesProps[]

  // console.log(list, 22222)

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
}

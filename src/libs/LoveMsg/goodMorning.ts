/**
 * @name goodMorning
 * @description 说早安
 */
import API from '../../api/loveMsg'
import { wxNotify } from '../WxNotify'
import dayjs from './../../utils/dayjs'
import { textTemplate } from './templates/text'
import { textCardTemplate } from './templates/textcard'
import { newsTemplate } from './templates/news'

// 美丽短句
const goodWord = async() => {
  try {
    // 并行请求，优响相应
    const dataSource = await Promise.allSettled([
      API.getSaylove(), // 土味情话
      API.getCaihongpi(), // 彩虹屁
      API.getOneWord(), // 一言
      API.getSongLyrics(), // 最美宋词
      API.getOneMagazines(), // one杂志
      API.getNetEaseCloud(), // 网易云热评
      API.getDayEnglish(), // 每日英语
      API.zaoanText(), // 早安心语
    ])

    // 过滤掉异常数据
    const [sayLove, caiHongpi, oneWord, songLyrics, oneMagazines, netEaseCloud, dayEnglish, zaoanWord]
      = dataSource.map(n => (n.status === 'fulfilled' ? n.value : null))

    // 对象写法
    const data: any = {
      sayLove,
      caiHongpi,
      oneWord,
      songLyrics,
      oneMagazines,
      netEaseCloud,
      dayEnglish,
      zaoanWord,
    }

    const template = textTemplate(data)
    console.log('goodWord', template)
    wxNotify(template)
  }
  catch (error) {
    console.log('goodWord:err', error)
  }
}
const memorialMonth = async() => {
  const template = await newsTemplate()
  await wxNotify(template)
}
// 天气信息
const weatherInfo = async() => {
  const weather = await API.getWeather('广州')
  if (weather) {
    const lunarInfo = await API.getLunarDate(weather.date)
    const template = textCardTemplate({ ...weather, lunarInfo })
    await wxNotify(template)
  }
}

// goodMorning                                                                                               w
export const goodMorning = async() => {
  await weatherInfo()
  await memorialMonth()
  await goodWord()
}

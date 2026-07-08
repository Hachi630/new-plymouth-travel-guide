import type { WeatherDay } from '../types/itinerary'

/**
 * 本周末实况(查于 7/7 周二,距周末 3–5 天,塔拉纳基自成天气,仅供排期)。
 * 出行前一天与当天早上必查 NIWA + MetService + North Taranaki 游客中心。
 */
export const weather = [
  {
    id: 'fri',
    label: '周五',
    date: '7/10',
    iso: '2026-07-10',
    whatToDo: '路上 · 抢日落',
    mountain: 'maybe',
    mood: 'mountainWindow',
    summary: '冷锋逼近前,三天最干',
    detail:
      '冷锋逼近前、三天里最干（有模型示降雨≈0%);傍晚起西面云雨渐进。锋前光线佳,抵达后近城机位可搏一场山景夕照——看运气,云厚就直接吃饭,周日再补。',
    lo: '~8°C',
    rain: '≈0%',
  },
  {
    id: 'sat',
    label: '周六',
    date: '7/11',
    iso: '2026-07-11',
    whatToDo: '城中 · 室内',
    mountain: 'no',
    mood: 'muted',
    summary: '冷锋主体,最湿一天',
    detail:
      '城中缓冲日:室内点(博物馆 / 美术馆 / 动物园)全天候可行;放晴的间隙补海滨与近城火山锥机位。',
    hi: '~12°C',
    rain: '夜约 49mm',
  },
  {
    id: 'sun',
    label: '周日',
    date: '7/12',
    iso: '2026-07-12',
    whatToDo: '看山 · 返程',
    mountain: 'good',
    mood: 'mountainWindow',
    summary: '锋后转晴,能见度最佳',
    detail:
      '锋后转晴,午后转静,能见度通常最佳——上午是最佳看山窗口。早起走 Mangorei Track → 回程顺看三姐妹岩 → 返奥克兰。',
    hi: '~14°C',
  },
] satisfies WeatherDay[]

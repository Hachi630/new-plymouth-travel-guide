import type {
  BudgetRow,
  ChecklistItem,
  FoodItem,
  SafetyItem,
} from '../types/itinerary'
import { q } from '../lib/maps'

/* --- 打包清单(§11)可勾选 --- */
export const packing = [
  { id: 'pk-boots', label: '防水登山靴(Mangorei 冬季必备)' },
  { id: 'pk-warm', label: '保暖层 + 手套 + 帽子' },
  { id: 'pk-headlamp', label: '头灯(林中天黑快)' },
  { id: 'pk-crampons', label: '简易冰爪(路面结冰时)' },
  { id: 'pk-rain', label: '防水外套' },
  { id: 'pk-sun', label: '防晒 + 墨镜' },
  { id: 'pk-water', label: '足量饮水 + 行动粮(山上无补给)' },
  { id: 'pk-camera', label: '相机 / 手机支架' },
  { id: 'pk-cash', label: '少量现金' },
  { id: 'pk-tide', label: 'Tongaporutu 潮汐表截图' },
  { id: 'pk-offline', label: '离线地图' },
  { id: 'pk-charger', label: '车充 / 充电宝' },
  { id: 'pk-fuel', label: '出发前加满油(SH3 小镇少)' },
] satisfies ChecklistItem[]

/* --- 必吃美食(§11) --- */
export const food = [
  {
    id: 'food-fatpigeon',
    name: { zh: 'Fat Pigeon', en: 'Piopio' },
    note: '途中(Piopio)画廊咖啡馆,午餐好去处',
    map: q('Fat Pigeon Cafe Piopio'),
  },
  {
    id: 'food-shiningpeak',
    name: { zh: 'Shining Peak Brewing', en: 'New Plymouth' },
    note: '市区当地精酿 + 餐食',
    map: q('Shining Peak Brewing New Plymouth'),
  },
  {
    id: 'food-mrwhite',
    name: { zh: 'Mr. White', en: 'New Plymouth' },
    note: '市区本地人气餐馆',
    map: q('Mr White New Plymouth'),
  },
  {
    id: 'food-treehouse',
    name: { zh: 'Treehouse', en: 'New Plymouth' },
    note: '市区躲雨吃好',
    map: q('Treehouse New Plymouth'),
  },
  {
    id: 'food-ricebar',
    name: { zh: 'Rice Bar & Food', en: 'New Plymouth' },
    note: '市区亚洲风味饭食,换口味 / 想吃热乎饭时的选择',
    map: q('Rice Bar & Food New Plymouth'),
  },
  {
    id: 'food-fishchips',
    name: { zh: '经典海滩 Fish & Chips', en: 'Beach fish & chips' },
    note: '海边经典,收尾必点',
  },
] satisfies FoodItem[]

/* --- 预算估算(§11 · 4 人一车 · 3 天 · NZD) --- */
export const budget = [
  {
    id: 'bg-stay',
    item: '住宿(已订)',
    note: '3200 RMB ≈ ×0.258',
    amount: '$825',
    perPerson: '~$206',
  },
  {
    id: 'bg-fuel',
    item: '油费',
    note: '~800–920km · 3.8L/100km · $2.6–2.7',
    amount: '$80–95',
    perPerson: '~$20–24',
  },
  {
    id: 'bg-food',
    item: '餐饮(3 天)',
    note: '咖啡馆/餐厅,含 Fat Pigeon、Shining Peak 等',
    amount: '$850–1050',
    perPerson: '~$215–265',
  },
  {
    id: 'bg-tickets',
    item: '门票',
    note: '多数免费;Len Lye 中心约 $15/人(可选)',
    amount: '$0–60',
    perPerson: '$0–15',
  },
  {
    id: 'bg-misc',
    item: '停车/杂费/缓冲',
    note: 'CBD 停车、零杂、备用',
    amount: '$80–140',
    perPerson: '~$20–35',
  },
  {
    id: 'bg-total',
    item: '合计',
    note: '不含机票;用自己的车,无租车费',
    amount: '约 $1,840–2,170',
    perPerson: '约 $460–540',
    total: true,
  },
] satisfies BudgetRow[]

/* --- 天气与安全(§12) --- */
export const safety = [
  {
    id: 'sf-window',
    text: '看山靠晴窗:周日 Mangorei 为主,周五日落为辅;出行前必查 NIWA / MetService / 游客中心。',
  },
  {
    id: 'sf-front',
    text: '冷锋周末:周六最湿(夜间强雨强风),定为室内日。',
  },
  {
    id: 'sf-winter',
    text: '冬季不冲顶;Mangorei 高处或积雪结冰,量力而行、随时可折返。',
  },
  {
    id: 'sf-tide',
    text: '海岸潮汐:三姐妹岩务必先查表,只在低潮前后去。',
  },
  {
    id: 'sf-driving',
    text: '长途驾驶:单程 5.5h,周五早出、周日早返;冬季天黑早,避免夜里赶山路。走完 5h 山路再开车,注意轮换、别疲劳。',
  },
] satisfies SafetyItem[]

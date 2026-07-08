import type { Viewpoint } from '../types/itinerary'
import { q } from '../lib/maps'

/**
 * 看山机位专区(§10):除周日 Mangorei 外,可机动取用的路边机位,按离城远近排列。
 * 近城两处留给周五日落;内陆/西侧按空档灵活取。
 */
export const viewpoints = [
  {
    id: 'vp-terewarewa',
    name: { zh: 'Te Rewa Rewa Bridge', en: 'Te Rewa Rewa Bridge' },
    driveTime: '~10min',
    bestTime: '日出 / 日落',
    note: '鲸骨桥框火山锥,全城最出片',
    map: q('Te Rewa Rewa Bridge New Plymouth'),
    imageId: 'te-rewa-rewa',
    onlyIfClear: true,
  },
  {
    id: 'vp-lookout',
    name: { zh: 'Mt Taranaki Lookout', en: 'Mt Taranaki Lookout' },
    driveTime: '近城',
    bestTime: '日落',
    note: '近城快速登高看山,省时',
    map: q('Mount Taranaki Lookout New Plymouth'),
    imageId: 'taranaki-cone',
    onlyIfClear: true,
  },
  {
    id: 'vp-clemow',
    name: { zh: 'Clemow Road Viewpoint', en: 'Clemow Road Viewpoint' },
    driveTime: '~15–20min',
    bestTime: '日出 / 日间',
    note: '内陆田园前景望向对称锥',
    map: q('Clemow Road Taranaki'),
    imageId: 'taranaki-farmland',
    onlyIfClear: true,
  },
  {
    id: 'vp-kent',
    name: { zh: 'Kent Road', en: 'Kent Road' },
    driveTime: '~20–25min',
    bestTime: '日间',
    note: '笔直公路正对火山锥的经典「公路直击」机位',
    map: q('Kent Road Egmont Village Taranaki'),
    imageId: 'kent-road',
    onlyIfClear: true,
  },
  {
    id: 'vp-capeegmont',
    name: { zh: 'Cape Egmont Lighthouse', en: 'Cape Egmont Lighthouse' },
    driveTime: '~45–55min',
    bestTime: '日间',
    note: '西海岸白灯塔 + 火山锥背景(较远,想去需单独留半天)',
    map: q('Cape Egmont Lighthouse Taranaki'),
    imageId: 'cape-egmont',
    onlyIfClear: true,
  },
] satisfies Viewpoint[]

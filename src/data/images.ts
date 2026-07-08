import type { PlaceImage } from '../types/itinerary'

/**
 * Remote image registry: placeId → real photo.
 *
 * Source photos are CC-licensed Wikimedia Commons originals, routed through the
 * weserv image CDN (images.weserv.nl). weserv resizes them to lightweight WebP
 * (~15–110KB vs multi-MB originals) and serves permissive CORS/CORP headers, so
 * the cross-origin <img> loads reliably (Wikimedia's own /thumb endpoint blocks
 * hotlinking and would be blocked by the browser's ORB). Every path below was
 * verified to return 200 image/webp.
 *
 * Businesses without a freely-licensed photo are intentionally omitted —
 * MediaImage renders an on-brand placeholder, and any URL that fails to load
 * falls back the same way (onError).
 */
const wm = (commonsPath: string): string =>
  `https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/${commonsPath}&w=800&q=78&output=webp`

const images = {
  'taranaki-cone': {
    url: wm('6/64/Mount_Taranaki_01.jpg'),
    alt: '塔拉纳基火山（Mt Taranaki）对称雪顶锥',
    credit: 'Wikimedia Commons',
  },
  'pouakai-tarns': {
    url: wm('d/dd/Lake_Mangamahoe_-_0.jpg'),
    alt: '塔拉纳基火山锥的湖面镜像倒影',
    credit: 'Wikimedia Commons',
  },
  'te-rewa-rewa': {
    url: wm('a/a5/Te_Rewa_Rewa.jpg'),
    alt: 'Te Rewa Rewa 鲸骨桥框住远处的火山锥',
    credit: 'Wikimedia Commons',
  },
  'three-sisters': {
    url: wm('1/12/Three_Sisters_Taranaki.jpg'),
    alt: 'Tongaporutu 海岸的三姐妹岩海蚀岩柱',
    credit: 'Wikimedia Commons',
  },
  'cape-egmont': {
    url: wm('e/ee/New_Zealand_Cape_Egmont_%286208694961%29.jpg'),
    alt: 'Cape Egmont 白色灯塔',
    credit: 'Wikimedia Commons',
  },
  'puke-ariki': {
    url: wm('1/19/Puke_Ariki_MRD_10.jpg'),
    alt: 'Puke Ariki 博物馆 / 图书馆建筑',
    credit: 'Wikimedia Commons',
  },
  'pukekura-park': {
    url: wm('6/6f/Pukekura20101002.jpg'),
    alt: 'Pukekura 公园湖面与远处火山锥',
    credit: 'Wikimedia Commons',
  },
  'len-lye': {
    url: wm('6/6d/Len_Lye_Centre_26_July_2015.jpg'),
    alt: 'Len Lye 中心波浪镜面外墙',
    credit: 'Wikimedia Commons',
  },
  'wind-wand': {
    url: wm('c/c1/New-plymouth-city-skyline-npdc.jpg'),
    alt: '新普利茅斯海滨天际线,风之杖与火山锥',
    credit: 'Wikimedia Commons',
  },
  'coastal-walkway': {
    url: wm('9/93/Coastal_Walkway_in_New_Plymouth.jpg'),
    alt: '新普利茅斯海滨步道',
    credit: 'Wikimedia Commons',
  },
  'taranaki-farmland': {
    url: wm('1/1c/1-Taranaki-new-zealand.jpg'),
    alt: '田园前景望向塔拉纳基对称锥',
    credit: 'Wikimedia Commons',
  },
  'kent-road': {
    url: wm('2/23/10_August_2008_-_Taranaki_daybreak_10.jpg'),
    alt: '破晓时分的塔拉纳基火山锥',
    credit: 'Wikimedia Commons',
  },
} satisfies Record<string, PlaceImage>

export type ImageId = keyof typeof images

export function getImage(id?: string): PlaceImage | undefined {
  if (!id) return undefined
  return (images as Record<string, PlaceImage>)[id]
}

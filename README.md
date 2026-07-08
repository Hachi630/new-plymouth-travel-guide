# 新普利茅斯 3 日自驾攻略 · New Plymouth 3-Day Road Trip Guide

> 手机优先的单页互动行程攻略:奥克兰往返新普利茅斯 / 塔拉纳基,4 人自驾 3 天 2 晚,含**实时天气**与真实景点照片。
> A mobile-first, single-page interactive itinerary for a 3-day self-drive trip from Auckland to New Plymouth / Taranaki (4 people), with **live weather** and real location photos.

[![Deploy to GitHub Pages](https://github.com/Hachi630/new-plymouth-travel-guide/actions/workflows/deploy.yml/badge.svg)](https://github.com/Hachi630/new-plymouth-travel-guide/actions/workflows/deploy.yml)

**🔗 Live / 线上访问 → https://hachi630.github.io/new-plymouth-travel-guide/**

**[English](#english) · [中文](#中文)**

---

## English

A single-page guide (no backend) that renders a 3-day Taranaki road-trip plan: a signature Taranaki-cone hero, a live weather-window bar, per-day timelines, mountain-viewing spots, and a tools drawer (packing checklist, food, budget, safety). Content is Chinese-primary with bilingual place names.

### ✨ Features
- **Signature hero** — inline SVG of the symmetric snow-capped Taranaki cone, sea horizon and an ember coastal path.
- **Live weather window** — three-day bar (Fri/Sat/Sun) with a live forecast from Open-Meteo overlaid on the static schedule; expandable detail with temps, rain probability and wind; graceful fallback if offline.
- **Day tabs + timeline** — three keyboard-accessible tabs; each day has a drive-leg card and expandable itinerary cards (time chip, bilingual title, highlight, cost/type tags, photo, "why / tips / open map").
- **Mountain viewpoints** — a grid of roadside spots with drive-time, best timing and "only if clear" tags.
- **Tools drawer** — packing checklist (native checkboxes, strikethrough, persisted for the session), must-eat food, budget table, weather & safety.
- **Real photos** — CC-licensed Wikimedia Commons images; businesses without a free photo fall back to an on-brand placeholder.
- **Mobile-first & accessible** — 640px centred column, `prefers-reduced-motion`, ARIA tabs/disclosures, visible focus, ≥44px tap targets.

### 🧰 Tech stack
- **Vite + React 18 + TypeScript**
- **CSS custom properties (design tokens) + CSS Modules** — no CSS framework
- **@fontsource** self-hosted fonts: Bricolage Grotesque / Inter / IBM Plex Mono (with CJK system fallback)
- No router / state / UI / animation libraries — plain React + a few small hooks

### 🌦 Data sources
- **Weather** — [Open-Meteo](https://open-meteo.com) (free, no API key, CORS-enabled). MetService has no key-less client-side API, so the page uses Open-Meteo and keeps a "check MetService / NIWA before you go" note. Falls back to a static schedule if the request fails or the trip dates fall outside the forecast window.
- **Photos** — Wikimedia Commons originals routed through the [weserv](https://images.weserv.nl) image CDN (resized WebP, CORS/ORB-safe).
- **Maps** — Google Maps search links (address / coordinates).

### 🛠 Local development
Requires **Node 20+**.
```bash
npm install
npm run dev        # http://localhost:5173
```

### 📦 Build & preview
```bash
npm run build      # type-check + bundle to dist/
npm run preview    # serve the production build locally
npm run lint       # ESLint (incl. jsx-a11y)
```

### 🚢 Deployment
Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml): it builds and publishes `dist/` to **GitHub Pages** (source = GitHub Actions). `vite.config.ts` uses `base: './'` so relative asset paths work under the `/new-plymouth-travel-guide/` sub-path.

### ✏️ Customizing content
All content lives in typed data files under [`src/data/`](src/data) — no component edits needed:

| File | What it holds |
|---|---|
| `days.ts` | the 3 days: theme, drive legs, timeline items |
| `weather.ts` | weather base data **+ `iso` dates** used to match the live forecast |
| `viewpoints.ts` | mountain-viewing spots |
| `tools.ts` | packing / food / budget / safety |
| `images.ts` | image registry (`wm('<commons-path>')`) |
| `trip.ts` | title, subtitle, travellers |

> Moving the trip? Update the `iso` dates in `weather.ts` (currently `2026-07-10/11/12`) so the live forecast lines up.

### 📁 Project structure
```
src/
├─ data/          # content you edit (days, weather, viewpoints, tools, images, trip)
├─ components/    # primitives / icons / layout / feature components
├─ hooks/         # useLiveWeather · useSessionChecklist · useExpandable · useReducedMotion
├─ lib/           # forecast.ts (Open-Meteo) · maps.ts · cx.ts
├─ styles/        # tokens.css (design tokens) · reset · base · global
└─ types/         # itinerary.ts (all domain types)
```

### 📄 License & credits
Personal project — no software license set yet (add a `LICENSE` if you plan to open-source it). Third-party data keeps its own terms: photos © their authors via **Wikimedia Commons** (CC), weather data © **Open-Meteo** (CC-BY 4.0). Always re-check **MetService / NIWA** and tide tables before travelling.

---

## 中文

一个无后端的单页攻略,呈现塔拉纳基 3 日自驾计划:标志性的火山锥 Hero、实时天气窗口条、分天时间轴、看山机位,以及工具抽屉(打包清单 / 美食 / 预算 / 安全)。内容以中文为主,地名中英双语。

### ✨ 功能
- **标志 Hero** —— 内联 SVG:对称雪顶塔拉纳基锥 + 海平线 + 暖橙海岸步道曲线。
- **实时天气窗口** —— 周五 / 六 / 日三格,Open-Meteo 实时预报叠加在静态排期上;可展开看气温、降雨概率与风速;断网自动回退。
- **天数标签 + 时间轴** —— 三个可键盘操作的标签;每天含自驾段卡与可展开的行程卡(时段 chip、中英标题、亮点、费用/类型标签、照片、"值得 / 提示 / 打开地图")。
- **看山机位** —— 路边机位网格,含离城车程、最佳时机与"晴天才去"标。
- **工具抽屉** —— 打包清单(原生复选框、勾选划线、本会话内保留)、必吃美食、预算表、天气与安全。
- **真实照片** —— CC 授权的 Wikimedia Commons 图片;无免费图的商家回退到品牌风格占位卡。
- **手机优先 & 无障碍** —— 640px 居中列、`prefers-reduced-motion`、ARIA 标签/折叠、可见焦点、≥44px 点击区。

### 🧰 技术栈
- **Vite + React 18 + TypeScript**
- **CSS 设计令牌变量 + CSS Modules** —— 不用 CSS 框架
- **@fontsource** 打包字体:Bricolage Grotesque / Inter / IBM Plex Mono(带中文系统字体兜底)
- 不引入路由 / 状态库 / UI 库 / 动画库 —— 原生 React + 少量自写 hooks

### 🌦 数据源
- **天气** —— [Open-Meteo](https://open-meteo.com)(免费、免密钥、带 CORS)。MetService 没有可用于纯前端的免密钥 API,故采用 Open-Meteo,并保留"出行前查 MetService / NIWA"的提示。请求失败或行程日期超出预报窗口时,回退到静态排期。
- **图片** —— Wikimedia Commons 原图经 [weserv](https://images.weserv.nl) 图片 CDN 代理(转 WebP、免 ORB / 带 CORS)。
- **地图** —— Google Maps 搜索链接(地址 / 坐标)。

### 🛠 本地开发
需要 **Node 20+**。
```bash
npm install
npm run dev        # http://localhost:5173
```

### 📦 构建与预览
```bash
npm run build      # 类型检查 + 打包到 dist/
npm run preview    # 本地起生产构建
npm run lint       # ESLint(含 jsx-a11y)
```

### 🚢 部署
推送到 `main` 会触发 [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):自动构建并把 `dist/` 发布到 **GitHub Pages**(源 = GitHub Actions)。`vite.config.ts` 用 `base: './'`,相对路径适配 `/new-plymouth-travel-guide/` 子路径。

### ✏️ 自定义内容
所有内容都在 [`src/data/`](src/data) 的类型化数据文件里,无需改组件:

| 文件 | 内容 |
|---|---|
| `days.ts` | 三天:主题、自驾段、时间轴项 |
| `weather.ts` | 天气基础数据 **+ 用于匹配实时预报的 `iso` 日期** |
| `viewpoints.ts` | 看山机位 |
| `tools.ts` | 打包 / 美食 / 预算 / 安全 |
| `images.ts` | 图片注册表(`wm('<commons 路径>')`) |
| `trip.ts` | 标题、副标、人数 |

> 换出行日期?改 `weather.ts` 里的 `iso`(现为 `2026-07-10/11/12`),让实时预报对得上。

### 📁 目录结构
```
src/
├─ data/          # 你要改的内容(days / weather / viewpoints / tools / images / trip)
├─ components/    # primitives / icons / layout / 功能组件
├─ hooks/         # useLiveWeather · useSessionChecklist · useExpandable · useReducedMotion
├─ lib/           # forecast.ts(Open-Meteo)· maps.ts · cx.ts
├─ styles/        # tokens.css(设计令牌)· reset · base · global
└─ types/         # itinerary.ts(全部域类型)
```

### 📄 许可与致谢
个人项目 —— 暂未设置软件许可(若要开源请自行添加 `LICENSE`)。第三方数据各自保留其条款:图片版权归各作者所有,来自 **Wikimedia Commons**(CC);天气数据 © **Open-Meteo**(CC-BY 4.0)。出行前请务必复查 **MetService / NIWA** 与潮汐表。

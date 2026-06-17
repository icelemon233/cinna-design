<div align="center">
  <img src="./apps/site/src/assets/cinna-cloud-cat.png" alt="Cinna Design cloud cat mascot" width="360" />

  <h1>🌤️ Cinna Design</h1>

  <p>
    <strong>A cloud-soft dessert themed React UI component library.</strong><br />
    <strong>一个云朵甜点风格的 React UI 组件库。</strong>
  </p>

  <p>
    <a href="https://github.com/icelemon233/cinna-design/releases">
      <img alt="release" src="https://img.shields.io/github/v/release/icelemon233/cinna-design?style=for-the-badge&color=73C4E0&label=release" />
    </a>
    <a href="./LICENSE">
      <img alt="license" src="https://img.shields.io/badge/license-MIT-F6C96D?style=for-the-badge" />
    </a>
    <img alt="react" src="https://img.shields.io/badge/react-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
    <img alt="typescript" src="https://img.shields.io/badge/typescript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
    <img alt="pnpm" src="https://img.shields.io/badge/pnpm-11.5-F69220?style=for-the-badge&logo=pnpm&logoColor=white" />
  </p>

  <p>
    <img alt="tests" src="https://img.shields.io/badge/tests-15%20passing-9BCB8E?style=for-the-badge" />
    <img alt="components" src="https://img.shields.io/badge/components-70%2B-B9A7EA?style=for-the-badge" />
    <img alt="a11y" src="https://img.shields.io/badge/a11y-WAI--ARIA%20minded-9BCB8E?style=for-the-badge" />
    <img alt="pages" src="https://img.shields.io/badge/pages-ready-3D8EAA?style=for-the-badge&logo=githubpages&logoColor=white" />
  </p>

  <p>
    <a href="#english">English</a> | <a href="#简体中文">简体中文</a>
  </p>
</div>

---

## English

### ✨ What Is Cinna Design?

Cinna Design is a themed React UI library shaped around a soft little cloud-cat world: milk-cloud blue, cream surfaces, cocoa text, rounded touch targets, and gentle handmade motion.

It is not trying to clone an existing component library. The goal is to keep the discipline of practical application UI, then give it a distinctive dessert-counter warmth: usable forms, readable data surfaces, playful loading states, and a mascot-led brand language.

### 🧁 Package Map

This repository is maintained as a pnpm monorepo, while the public consumer package stays intentionally unified.

| Package | Visibility | Purpose |
| --- | --- | --- |
| `@cinna-design/react` | Public | React components, CSS entry, and type exports |
| `@cinna-design/tokens` | Private | Source-of-truth color, radius, typography, and motion tokens |
| `@cinna-design/icons` | Private | Original cloud-dessert SVG icon components |
| `@cinna-design/site` | Private | Intro and documentation site for GitHub Pages |

### 📦 Installation

When the React package is published, install it from npm:

```bash
pnpm add @cinna-design/react
```

Import the component styles once in your app:

```ts
import '@cinna-design/react/style.css';
```

### ⚛️ First Prototype

The first prototype includes a small hand-polished core and a broader lightweight coverage layer.

- ☁️ `CinnaLoading` - signature cloud loading motion
- 🔘 `Button` - soft pressable actions with variants, sizes, shapes, icons, and loading state
- 🍰 `Card` - cream / blue / butter / berry / pistachio / lavender content surfaces
- 🧾 `Input` - labeled input with helper text, error state, prefix, and suffix
- 🎛️ `ConfigProvider` - scoped theme variable overrides
- 🧩 70+ exported UI primitives for layout, navigation, data entry, data display, feedback, overlays, and utility surfaces

### 🎨 Design Language

Cinna's first visual direction is written down in the `design/` folder:

- `design/visual-bible.md` - positioning, metaphor, and design rules
- `design/tokens.md` - color, shape, touch target, and typography direction
- `design/motion.md` - duration, easing, and motion behavior
- `design/roadmap.md` - prototype scope and future component map

The core promise: sweetness is an accent, not visual noise. Dense application screens should still feel calm, readable, and repeatable.

### 🛠️ Local Development

```bash
pnpm install
pnpm test
pnpm typecheck
pnpm build
pnpm dev
```

### 🚀 GitHub Pages

The public intro site is built from `apps/site`.

```bash
pnpm build:pages
```

The Pages build uses `/cinna-design/` as the asset base:

```text
https://icelemon233.github.io/cinna-design/
```

Publish the built static site to the `gh-pages` branch:

```bash
pnpm deploy:pages
```

### 🗺️ Roadmap

- Expand core application components: form, select, modal, table, tabs, feedback, navigation, and data display.
- Add signature dessert components such as `RecipeCard`, `BakeTimer`, `CookieStamp`, `GiftBox`, and `StickerBoard`.
- Improve docs with live examples, bilingual API notes, and richer usage recipes.
- Keep Cinna's mascot and cloud-dessert visual identity consistent across README, docs, release notes, and examples.

### 🖼️ README Banner Prompt

Selected GPT-Image2 template: `brand-identity-package` with `illustration-art-style` constraints.

Copy this prompt to generate a rectangular README hero image. After generation, save it as something like `docs/readme-hero.png` and replace the top image path in this README.

```text
生成一张用于 GitHub README 顶部展示的横向矩形品牌头图，主题是「Cinna Design」。

画面目标：这是一个云朵甜点风格 React UI 组件库的品牌头图。主角是一只原创小猫 IP：浅蓝白色的云朵小猫，身体像柔软云朵，带小猫耳、圆润脸、小尾巴，表情亲切、安静、治愈。它站在或坐在奶油色云朵 UI 卡片旁边，像在欢迎用户进入 Cinna Design 的组件世界。

构图与版式：横向 banner，比例 3:1 或 16:6，适合 GitHub README 顶部。左侧或中间偏左放小猫 IP，右侧放清晰标题文字「Cinna Design」，标题下方放短副标题「Cloud-soft React UI」。画面留白充足，标题必须可读，整体不要拥挤。可以加入轻量 UI 组件暗示：小按钮、小卡片、小输入框、糖粒星星、奶油云朵，但它们只能作为背景点缀，不要抢主体。

视觉风格：2D 手绘插画 + 干净品牌视觉板，柔软可触摸，像云朵、奶油和甜点贴纸。色彩使用 milk-cloud blue #A8DFF1、cream #FFF8EE / #FFFCF6、cocoa text #46332A、butter #F6C96D、strawberry #EA8A98、pistachio #9BCB8E、lavender #B9A7EA。边缘圆润，轻微纸感颗粒，柔和阴影，清爽明亮，不要高饱和。

文字要求：只出现两段英文文字，必须拼写准确：主标题「Cinna Design」，副标题「Cloud-soft React UI」。不要生成其他文字、乱码、假 logo、无关品牌名。

输出要求：高清 PNG，横向矩形，背景可以是浅奶油色或透明感浅色背景，四周留安全边距，适合放在白色 GitHub README 页面顶部。

负面约束：不要照片写实，不要 3D 塑料玩具感，不要复杂场景，不要黑色粗描边，不要多只角色，不要动物岛风格，不要照搬其他 IP，不要 Logo 拼写错误，不要水印，不要红框，不要杂乱按钮，不要低清晰度，不要过度渐变，不要暗色背景。
```

---

## 简体中文

### ✨ Cinna Design 是什么？

Cinna Design 是一个围绕「云朵小猫 + 甜点柜台」视觉世界打造的 React UI 组件库：牛奶云蓝、奶油表面、可可色文字、圆润触控区域，还有轻轻呼吸的手作动效。

它不是要复制某个成熟组件库，而是把真实应用 UI 需要的秩序感留下来，再加入更有记忆点的品牌气质：表单要可用，数据要清楚，反馈要可靠，加载也可以有一点可爱。

### 🧁 仓库结构

这个仓库是 pnpm monorepo，但对使用者尽量保持一个统一入口。

| 包 | 可见性 | 用途 |
| --- | --- | --- |
| `@cinna-design/react` | 公开包 | React 组件、CSS 入口和类型导出 |
| `@cinna-design/tokens` | 内部包 | 色彩、圆角、字体和动效 tokens |
| `@cinna-design/icons` | 内部包 | 原创云朵甜点 SVG 图标 |
| `@cinna-design/site` | 内部包 | GitHub Pages 官网和组件文档 |

### 📦 安装使用

React 包发布到 npm 后，可以这样安装：

```bash
pnpm add @cinna-design/react
```

在应用入口引入一次样式：

```ts
import '@cinna-design/react/style.css';
```

### ⚛️ 第一版原型

当前版本包含一组重点打磨的核心组件，也铺了一层更完整的轻量组件覆盖面。

- ☁️ `CinnaLoading` - 标志性的云朵加载动效
- 🔘 `Button` - 支持变体、尺寸、形状、图标和 loading 的柔软按钮
- 🍰 `Card` - 奶油、浅蓝、黄油、草莓、开心果、薰衣草色内容表面
- 🧾 `Input` - 带 label、helper、error、prefix、suffix 的真实表单输入
- 🎛️ `ConfigProvider` - 通过 CSS 变量做局部主题覆写
- 🧩 70+ 个 UI 导出，覆盖布局、导航、数据录入、数据展示、反馈、浮层和工具型组件

### 🎨 设计语言

Cinna 的第一版视觉方向写在 `design/` 目录：

- `design/visual-bible.md` - 定位、隐喻和设计规则
- `design/tokens.md` - 色彩、形状、触控区域和字体方向
- `design/motion.md` - 动效时长、缓动和运动行为
- `design/roadmap.md` - 原型范围和后续组件地图

核心原则：甜味是识别点，不是噪音。即使是密集应用界面，也要保持清楚、安静、可重复使用。

### 🛠️ 本地开发

```bash
pnpm install
pnpm test
pnpm typecheck
pnpm build
pnpm dev
```

### 🚀 GitHub Pages

官网入口在 `apps/site`。

```bash
pnpm build:pages
```

Pages 构建会使用 `/cinna-design/` 作为资源 base：

```text
https://icelemon233.github.io/cinna-design/
```

发布静态站点到 `gh-pages` 分支：

```bash
pnpm deploy:pages
```

### 🗺️ 后续计划

- 继续扩展真实应用常用组件：Form、Select、Modal、Table、Tabs、反馈、导航、数据展示。
- 增加 Cinna 专属甜点组件：`RecipeCard`、`BakeTimer`、`CookieStamp`、`GiftBox`、`StickerBoard`。
- 完善文档体验：实时示例、中英双语 API、更多使用配方。
- 让 README、官网、release notes、示例里的小猫 IP 和云朵甜点视觉保持一致。

### 🖼️ README 头图提示词

使用的 GPT-Image2 模板方向：`brand-identity-package`，并加入 `illustration-art-style` 的插画约束。

可以直接复制下面这段去生成横向 README 头图。生成后建议保存成 `docs/readme-hero.png`，再把 README 顶部图片路径替换过去。

```text
生成一张用于 GitHub README 顶部展示的横向矩形品牌头图，主题是「Cinna Design」。

画面目标：这是一个云朵甜点风格 React UI 组件库的品牌头图。主角是一只原创小猫 IP：浅蓝白色的云朵小猫，身体像柔软云朵，带小猫耳、圆润脸、小尾巴，表情亲切、安静、治愈。它站在或坐在奶油色云朵 UI 卡片旁边，像在欢迎用户进入 Cinna Design 的组件世界。

构图与版式：横向 banner，比例 3:1 或 16:6，适合 GitHub README 顶部。左侧或中间偏左放小猫 IP，右侧放清晰标题文字「Cinna Design」，标题下方放短副标题「Cloud-soft React UI」。画面留白充足，标题必须可读，整体不要拥挤。可以加入轻量 UI 组件暗示：小按钮、小卡片、小输入框、糖粒星星、奶油云朵，但它们只能作为背景点缀，不要抢主体。

视觉风格：2D 手绘插画 + 干净品牌视觉板，柔软可触摸，像云朵、奶油和甜点贴纸。色彩使用 milk-cloud blue #A8DFF1、cream #FFF8EE / #FFFCF6、cocoa text #46332A、butter #F6C96D、strawberry #EA8A98、pistachio #9BCB8E、lavender #B9A7EA。边缘圆润，轻微纸感颗粒，柔和阴影，清爽明亮，不要高饱和。

文字要求：只出现两段英文文字，必须拼写准确：主标题「Cinna Design」，副标题「Cloud-soft React UI」。不要生成其他文字、乱码、假 logo、无关品牌名。

输出要求：高清 PNG，横向矩形，背景可以是浅奶油色或透明感浅色背景，四周留安全边距，适合放在白色 GitHub README 页面顶部。

负面约束：不要照片写实，不要 3D 塑料玩具感，不要复杂场景，不要黑色粗描边，不要多只角色，不要动物岛风格，不要照搬其他 IP，不要 Logo 拼写错误，不要水印，不要红框，不要杂乱按钮，不要低清晰度，不要过度渐变，不要暗色背景。
```

<div align="center">
  <img src="./apps/site/src/assets/cinna-cloud-cat.png" alt="Cinna Design 云朵小猫 IP" width="220" />

  <h1>🌤️ Cinna Design</h1>

  <p>
    <strong>云朵甜点风格的 React UI 组件库。</strong><br />
    给温暖、清晰、可落地的应用界面准备的一套柔软组件。
  </p>

  <p>
    <a href="./README.md">English</a>
    ·
    <a href="https://icelemon233.github.io/cinna-design/">文档站点</a>
    ·
    <a href="https://github.com/icelemon233/cinna-design/releases/tag/v0.1.0">v0.1.0 发布页</a>
  </p>

  <p>
    <a href="https://github.com/icelemon233/cinna-design/releases/tag/v0.1.0"><img alt="version v0.1.0" src="https://img.shields.io/badge/version-v0.1.0-73C4E0?style=flat-square" /></a>
    <a href="./LICENSE"><img alt="MIT license" src="https://img.shields.io/badge/license-MIT-F6C96D?style=flat-square" /></a>
    <img alt="React 18" src="https://img.shields.io/badge/React-18-A8DFF1?style=flat-square" />
    <img alt="TypeScript 5.7" src="https://img.shields.io/badge/TypeScript-5.7-3D8EAA?style=flat-square" />
    <img alt="tests passing" src="https://img.shields.io/badge/tests-passing-9BCB8E?style=flat-square" />
    <img alt="70 plus components" src="https://img.shields.io/badge/components-70%2B-B9A7EA?style=flat-square" />
    <a href="https://icelemon233.github.io/cinna-design/"><img alt="docs on GitHub Pages" src="https://img.shields.io/badge/docs-GitHub%20Pages-46332A?style=flat-square" /></a>
  </p>
</div>

---

## ✨ 为什么是 Cinna Design？

Cinna Design 提供了一套带有「云朵 + 甜点」视觉身份的 React UI 组件和设计基础能力。它希望让界面搭建变得简洁、一致且易于阅读：按钮、表单、卡片、数据展示、反馈和浮层等元素可以轻松嵌入产品页面，也能在文档、演示站点和真实应用中保持统一、温暖的品牌气质。

当前版本处于 `v0.1.0` 原型阶段，已经包含核心组件、设计 tokens、原创图标、文档站点和 70+ 个轻量 UI 原型。它适合作为设计系统起点、主题化组件实验，或后续应用级组件库的基础。

## 📦 安装

`@cinna-design/react` 是面向使用者的公开包名。包发布后，可以这样安装：

```bash
pnpm add @cinna-design/react
```

在应用入口引入一次样式：

```ts
import '@cinna-design/react/style.css';
```

## ⚡ 快速使用

```tsx
import '@cinna-design/react/style.css';
import { Button, Card, CinnaLoading, Input } from '@cinna-design/react';

export function DessertPanel() {
  return (
    <Card title="Cloud order" tone="blue">
      <Input label="Dessert name" placeholder="Milk cloud cake" />
      <Button style={{ marginTop: 16 }}>Save recipe</Button>
      <CinnaLoading label="Whisking clouds" />
    </Card>
  );
}
```

## 🧁 包含什么？

### ☁️ 重点打磨的核心组件

- 🔘 `Button` - 支持变体、尺寸、图标、形状和 loading 状态的柔软按钮。
- 🍰 `Card` - 奶油、浅蓝、黄油、草莓、开心果、薰衣草色内容表面。
- 🧾 `Input` - 支持 label、helper、error、prefix、suffix 的表单输入。
- ☁️ `CinnaLoading` - 带 reduced-motion 支持的标志性云朵加载动效。
- 🎛️ `ConfigProvider` - 通过局部 CSS 变量覆写做轻量主题调整。

### 🧩 更完整的组件覆盖面

Cinna Design 还导出了一批轻量原型组件，覆盖常见 UI 场景：

- 🧱 布局：`Space`、`Flex`、`Row`、`Col`、`Layout`
- 🧭 导航：`Breadcrumb`、`Menu`、`Tabs`、`Steps`、`Pagination`、`Anchor`
- ✍️ 数据录入：`Select`、`Checkbox`、`Radio`、`Switch`、`Slider`、`Rate`、`DatePicker`、`Upload`、`Form`
- 📊 数据展示：`Avatar`、`Badge`、`Tag`、`Table`、`List`、`Timeline`、`Statistic`、`Tree`
- 💬 反馈和浮层：`Alert`、`Message`、`Notification`、`Progress`、`Skeleton`、`Modal`、`Drawer`、`Tooltip`、`Popover`

## 🎨 设计语言

Cinna Design 的第一版视觉方向包括：

- 🌤️ 用 milk-cloud blue 作为主要交互色
- 🍦 用奶油和香草色表面增加温度
- 🍫 用可可色文字保证可读性
- 🍓 用黄油、草莓、开心果、薰衣草色做轻量点缀
- 🫧 用圆润触控区域和轻柔手作动效增强亲和力

目标不是让界面变得花哨。甜味是识别点，清晰才是底座。

## 📚 文档

文档站点已准备发布到 GitHub Pages：

```text
https://icelemon233.github.io/cinna-design/
```

本地构建文档站点：

```bash
pnpm build:pages
```

## 🛠️ 本地预览

```bash
pnpm install
pnpm test
pnpm typecheck
pnpm build
pnpm dev
```

## 🚧 项目状态

`v0.1.0` 是第一版公开源码发布。包 API、视觉语言和组件覆盖范围都会随着设计系统继续成型而演进。

## 🪄 原创声明与灵感致谢

本仓库中的所有内容均为独立设计或 AI 辅助实现，包括视觉方向、组件实现、文档文案和图像资产。Cinna Design 不复制或复刻任何第三方内容。

感谢 [animal-island-ui](https://github.com/guokaigdg/animal-island-ui/tree/main) 提供的创意！如果你喜欢《Animal Crossing: New Horizons》风格的 UI，也可以访问这个仓库。🌿

## 📄 License

MIT License. 详见 [LICENSE](./LICENSE)。

# Cinna Cloud Cat Icon Prompts

参考图：

- `design/assets/cloud-cat-icons-preview.png`：当前 27 个 icon 的整体风格参考
- `apps/site/src/assets/cinna-cloud-cat.webp`：云朵小猫 IP 身份参考

选用模板：

- `character-design-sheet`：锁定同一角色、多姿态、多道具的一致性
- `illustration-art-style`：锁定水彩、手绘描边、贴纸质感

通用约束：

- 输出一张正方形 PNG，透明背景，3x3 九宫格，一共 9 个独立 icon。
- 每个 icon 位于自己的等分方格中心，图标之间保持充足透明间距，绝不重叠。
- 不要画可见网格线、边框线、编号、文字标签、说明文字、水印、签名。
- 每个 icon 都像可独立裁切的贴纸：外层有柔软白色贴纸描边和极轻的浅蓝阴影。
- 角色必须始终是同一只 Cinna 云朵小猫：奶油白云朵绒毛身体，浅蓝手绘外轮廓，尖三角猫耳与淡粉内耳，深蓝圆眼和白色高光，小粉鼻，短胡须，圆润小爪，淡粉腮红，整体柔软、手作、甜点感。
- 不要重新设计角色，不要改变脸型、眼睛、耳朵、毛团比例、颜色系统；不要变成普通猫、狐狸、熊、狗、人类、机器人或其他角色。
- 风格是柔和水彩 + 彩铅/蜡笔颗粒，轻透明叠色，像儿童贴纸但保持 UI 组件库的干净度。
- 配色遵循 Cinna Design：Milk Cloud Blue `#A8DFF1`、Cream Sky `#FFF8EE`、Cocoa `#46332A`，点缀 Butter `#F6C96D`、Strawberry `#EA8A98`、Pistachio `#9BCB8E`、Lavender `#B9A7EA`。
- 道具可以有简单 UI 符号，但不要出现可读文字，避免模型生成乱码。
- 所有 icon 的视觉重量一致，主体占每格约 75%，每个贴纸外侧只保留自身白色贴纸边，不额外保留透明边距。

## Batch 1 - 基础交互与反馈

复制给 GPT-Image2 的提示词：

```text
基于参考图 `design/assets/cloud-cat-icons-preview.png` 和 `apps/site/src/assets/cinna-cloud-cat.webp`，生成一张 Cinna Design 云朵小猫 UI icon sheet。

任务：生成 9 个新的云朵小猫贴纸 icon，统一放在一张正方形透明 PNG 上，3x3 九宫格布局。每个 icon 都是独立可裁切的透明背景贴纸，居中放在自己的等分方格里，图标之间留足透明间距，不要重叠。

九个 icon 主题，按从左到右、从上到下排列：
1. Hello / 欢迎：云朵小猫从小云朵后探出身体，举起一只爪子打招呼，表情开心。
2. Next / 继续：云朵小猫抱着一个浅蓝向右箭头，身体轻轻向右倾，像引导用户下一步。
3. Checklist / 表单完成：云朵小猫抱着奶油色清单板，板上只有 3 个圆点和 3 条短线，不要文字。
4. Search / 搜索：云朵小猫举着浅蓝放大镜，眼睛好奇地看向镜片。
5. Message / 消息：云朵小猫靠在圆润浅蓝对话气泡旁，气泡里只有 3 个小点，不要文字。
6. Loading / 加载：云朵小猫坐在小云朵上，旁边围绕 3 个小糖星和圆点，表现轻柔旋转等待。
7. Success / 成功：云朵小猫抱着浅开心果绿色圆形勾选符号，露出满足微笑。
8. Warning / 提醒：云朵小猫扶着黄油色圆角三角提示牌，牌内只有一个简单感叹点，表情温柔担心，不要惊吓。
9. Empty / 空状态：云朵小猫趴在小云朵边缘打盹，旁边有小小月牙和糖星，安静可爱。

角色身份必须完全一致：奶油白云朵绒毛身体，浅蓝手绘外轮廓，尖三角猫耳和淡粉内耳，深蓝圆眼带白色高光，小粉鼻，短胡须，圆润小爪，淡粉腮红。不要重新设计角色，不要改变脸型、耳朵、眼睛、身体比例或颜色。

视觉风格：柔和水彩、彩铅/蜡笔颗粒、手绘浅蓝描边、透明叠色、柔软奶油质感、白色贴纸外描边、极轻浅蓝投影。整体像精致原创 UI 组件库贴纸，不要商业图库感，不要 3D，不要扁平矢量。

配色：Milk Cloud Blue #A8DFF1、Cream Sky #FFF8EE、Cocoa #46332A，点缀 Butter #F6C96D、Strawberry #EA8A98、Pistachio #9BCB8E、Lavender #B9A7EA。背景必须透明，不要棋盘格背景，不要纯色底。

版式要求：1:1 正方形画布，3x3 等分九宫格，每格一个 icon，主体占每格约 75%，四周有透明安全区，方便按等分网格裁切。不要显示格线、编号、标题、标签、说明文字、水印或签名。

负面约束：不要文字乱码，不要多余角色，不要改变角色物种，不要换成普通猫，不要硬边矢量，不要真实照片，不要厚重阴影，不要复杂背景，不要让任何 icon 跨出自己的格子。
```

建议输出文件名：`tmp/icon-cat-sheets/icon-cat-sheet-01.png`

裁切后建议命名：

- `packages/react/src/assets/icons/cloud-cat/icon-cat-01-hello.png`
- `packages/react/src/assets/icons/cloud-cat/icon-cat-02-next.png`
- `packages/react/src/assets/icons/cloud-cat/icon-cat-03-checklist.png`
- `packages/react/src/assets/icons/cloud-cat/icon-cat-04-search.png`
- `packages/react/src/assets/icons/cloud-cat/icon-cat-05-message.png`
- `packages/react/src/assets/icons/cloud-cat/icon-cat-06-loading.png`
- `packages/react/src/assets/icons/cloud-cat/icon-cat-07-success.png`
- `packages/react/src/assets/icons/cloud-cat/icon-cat-08-warning.png`
- `packages/react/src/assets/icons/cloud-cat/icon-cat-09-empty.png`

## Batch 2 - 组件与工具

复制给 GPT-Image2 的提示词：

```text
基于参考图 `design/assets/cloud-cat-icons-preview.png` 和 `apps/site/src/assets/cinna-cloud-cat.webp`，生成第二张 Cinna Design 云朵小猫 UI icon sheet。

任务：生成 9 个新的云朵小猫贴纸 icon，统一放在一张正方形透明 PNG 上，3x3 九宫格布局。每个 icon 都是独立可裁切的透明背景贴纸，居中放在自己的等分方格里，图标之间留足透明间距，不要重叠。

九个 icon 主题，按从左到右、从上到下排列：
1. Button / 点击：云朵小猫用一只爪子轻轻按下圆润浅蓝按钮，按钮没有文字，只画一个小糖星符号。
2. Input / 输入：云朵小猫抱着奶油色输入框和一支短短浅蓝铅笔，输入框里只有一条淡线，不要文字。
3. Table / 表格：云朵小猫扶着一个圆角浅蓝数据表小板，板上是 3x3 淡色格子，不要数字。
4. Chart / 数据：云朵小猫坐在小云朵上，旁边有三根黄油、开心果、薰衣草色圆角柱状条。
5. Upload / 上传：云朵小猫托起一朵小云，云上有简单向上箭头符号，表现上传。
6. Calendar / 日期：云朵小猫抱着圆角日历卡片，卡片只有顶部浅蓝条和几个小圆点，不要文字和数字。
7. Settings / 设置：云朵小猫靠着三个圆润滑杆控件，滑杆是浅蓝和奶油色，表现调节。
8. User / 头像：云朵小猫从圆形头像框里探出头，头像框外有一颗小糖星。
9. Theme / 主题：云朵小猫拿着小调色盘，调色盘上有浅蓝、草莓、黄油、开心果色圆点。

角色身份必须完全一致：奶油白云朵绒毛身体，浅蓝手绘外轮廓，尖三角猫耳和淡粉内耳，深蓝圆眼带白色高光，小粉鼻，短胡须，圆润小爪，淡粉腮红。不要重新设计角色，不要改变脸型、耳朵、眼睛、身体比例或颜色。

视觉风格：柔和水彩、彩铅/蜡笔颗粒、手绘浅蓝描边、透明叠色、柔软奶油质感、白色贴纸外描边、极轻浅蓝投影。整体像精致原创 UI 组件库贴纸，不要商业图库感，不要 3D，不要扁平矢量。

配色：Milk Cloud Blue #A8DFF1、Cream Sky #FFF8EE、Cocoa #46332A，点缀 Butter #F6C96D、Strawberry #EA8A98、Pistachio #9BCB8E、Lavender #B9A7EA。背景必须透明，不要棋盘格背景，不要纯色底。

版式要求：1:1 正方形画布，3x3 等分九宫格，每格一个 icon，主体占每格约 75%，四周有透明安全区，方便按等分网格裁切。不要显示格线、编号、标题、标签、说明文字、水印或签名。

负面约束：不要文字乱码，不要多余角色，不要改变角色物种，不要换成普通猫，不要硬边矢量，不要真实照片，不要厚重阴影，不要复杂背景，不要让任何 icon 跨出自己的格子。
```

建议输出文件名：`tmp/icon-cat-sheets/icon-cat-sheet-02.png`

裁切后建议命名：

- `packages/react/src/assets/icons/cloud-cat/icon-cat-10-button.png`
- `packages/react/src/assets/icons/cloud-cat/icon-cat-11-input.png`
- `packages/react/src/assets/icons/cloud-cat/icon-cat-12-table.png`
- `packages/react/src/assets/icons/cloud-cat/icon-cat-13-chart.png`
- `packages/react/src/assets/icons/cloud-cat/icon-cat-14-upload.png`
- `packages/react/src/assets/icons/cloud-cat/icon-cat-15-calendar.png`
- `packages/react/src/assets/icons/cloud-cat/icon-cat-16-settings.png`
- `packages/react/src/assets/icons/cloud-cat/icon-cat-17-user.png`
- `packages/react/src/assets/icons/cloud-cat/icon-cat-18-theme.png`

## Batch 3 - 文档、研发与发布

复制给 GPT-Image2 的提示词：

```text
基于参考图 `design/assets/cloud-cat-icons-preview.png` 和 `apps/site/src/assets/cinna-cloud-cat.webp`，生成第三张 Cinna Design 云朵小猫 UI icon sheet。

任务：生成 9 个新的云朵小猫贴纸 icon，统一放在一张正方形透明 PNG 上，3x3 九宫格布局。每个 icon 都是独立可裁切的透明背景贴纸，居中放在自己的等分方格里，图标之间留足透明间距，不要重叠。

九个 icon 主题，按从左到右、从上到下排列：
1. Code / 代码：云朵小猫抱着浅蓝代码窗口，窗口里只有简单尖括号符号，不要文字。
2. Package / 包发布：云朵小猫趴在奶油色小包裹盒上，盒子有浅蓝胶带和小糖星贴纸。
3. Release / 发布：云朵小猫坐在小小奶油火箭旁，火箭带浅蓝窗户和黄油色尾焰，动作轻快但不夸张。
4. Git / 分支：云朵小猫用爪子拨动一条浅蓝分支线，线端有三个圆点节点，不要文字。
5. Test / 测试：云朵小猫拿着小试管或小烧杯，里面是浅蓝液体和糖星气泡，表现测试通过。
6. Bug Fix / 修复：云朵小猫用小创可贴贴在圆角代码卡片上，表现温柔修复，不画真实虫子。
7. Security / 安全：云朵小猫抱着奶油色盾牌，盾牌中心是浅蓝小锁符号。
8. Responsive / 响应式：云朵小猫站在手机和桌面屏幕旁，两个屏幕都是圆角浅蓝边框，不要文字。
9. Docs / 文档：云朵小猫翻开一本奶油色小书，书页上只有淡线和糖星书签，不要可读文字。

角色身份必须完全一致：奶油白云朵绒毛身体，浅蓝手绘外轮廓，尖三角猫耳和淡粉内耳，深蓝圆眼带白色高光，小粉鼻，短胡须，圆润小爪，淡粉腮红。不要重新设计角色，不要改变脸型、耳朵、眼睛、身体比例或颜色。

视觉风格：柔和水彩、彩铅/蜡笔颗粒、手绘浅蓝描边、透明叠色、柔软奶油质感、白色贴纸外描边、极轻浅蓝投影。整体像精致原创 UI 组件库贴纸，不要商业图库感，不要 3D，不要扁平矢量。

配色：Milk Cloud Blue #A8DFF1、Cream Sky #FFF8EE、Cocoa #46332A，点缀 Butter #F6C96D、Strawberry #EA8A98、Pistachio #9BCB8E、Lavender #B9A7EA。背景必须透明，不要棋盘格背景，不要纯色底。

版式要求：1:1 正方形画布，3x3 等分九宫格，每格一个 icon，主体占每格约 75%，四周有透明安全区，方便按等分网格裁切。不要显示格线、编号、标题、标签、说明文字、水印或签名。

负面约束：不要文字乱码，不要多余角色，不要改变角色物种，不要换成普通猫，不要硬边矢量，不要真实照片，不要厚重阴影，不要复杂背景，不要让任何 icon 跨出自己的格子。
```

建议输出文件名：`tmp/icon-cat-sheets/icon-cat-sheet-03.png`

裁切后建议命名：

- `packages/react/src/assets/icons/cloud-cat/icon-cat-19-code.png`
- `packages/react/src/assets/icons/cloud-cat/icon-cat-20-package.png`
- `packages/react/src/assets/icons/cloud-cat/icon-cat-21-release.png`
- `packages/react/src/assets/icons/cloud-cat/icon-cat-22-git.png`
- `packages/react/src/assets/icons/cloud-cat/icon-cat-23-test.png`
- `packages/react/src/assets/icons/cloud-cat/icon-cat-24-bug-fix.png`
- `packages/react/src/assets/icons/cloud-cat/icon-cat-25-security.png`
- `packages/react/src/assets/icons/cloud-cat/icon-cat-26-responsive.png`
- `packages/react/src/assets/icons/cloud-cat/icon-cat-27-docs.png`

## 裁切规则

生成后把三张大图分别保存为：

- `tmp/icon-cat-sheets/icon-cat-sheet-01.png`
- `tmp/icon-cat-sheets/icon-cat-sheet-02.png`
- `tmp/icon-cat-sheets/icon-cat-sheet-03.png`

运行 `scripts/crop-icon-cat-sheets.sh` 后会用内容感知方式裁切，导出到 `packages/react/src/assets/icons/cloud-cat/`。最终图保留透明通道，只保留贴纸自身白边，不额外保留透明 padding，也不扩成统一画布。

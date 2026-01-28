# 🚀 新功能快速开始指南

## 立即体验新功能！

只需3步，马上体验所有新功能：

---

## 步骤 1：打开新页面

在浏览器中打开：

```
file:///你的项目路径/src/my-dashboard.html
```

或者如果你已经启动了本地服务器：

```
http://localhost:8080/src/my-dashboard.html
```

---

## 步骤 2：体验功能

### 🌙 深色模式
1. 看到右下角的浮动按钮了吗？（☀️ 或 🌙）
2. 点击它！
3. 页面立即切换主题
4. 再点一次切换回来

### 📅 学习打卡
1. 在页面顶部找到"学习打卡"区域
2. 点击"立即打卡"按钮
3. 看到打卡成功的动画了吗？🎉
4. 日历上会显示今天的打卡记录
5. 连续打卡天数会增加

### 📈 数据可视化
1. 滚动到"学习数据分析"区域
2. 查看4个精美的图表：
   - 🥧 学习路径完成度（饼图）
   - 📈 最近7天学习时长（折线图）
   - 📊 每周学习活动（柱状图）
   - 🎯 知识点掌握（雷达图）

---

## 步骤 3：集成到现有页面

### 方法 A：更新 index.html

在 `src/index.html` 的 `<head>` 部分添加：

```html
<!-- 新功能样式 -->
<link rel="stylesheet" href="assets/css/study-checkin.css">
<link rel="stylesheet" href="assets/css/dark-mode.css">
```

在 `</body>` 之前添加：

```html
<!-- Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
<!-- 新功能脚本 -->
<script src="assets/js/study-checkin.js"></script>
<script src="assets/js/study-analytics.js"></script>
<script src="assets/js/dark-mode.js"></script>
```

### 方法 B：更新导航栏

在所有页面的导航栏中添加新链接：

```html
<li class="nav-item">
    <a class="nav-link" href="my-dashboard.html">我的仪表板</a>
</li>
```

---

## 测试清单

### ✅ 深色模式测试
- [ ] 点击切换按钮，主题正常切换
- [ ] 刷新页面，主题设置被保存
- [ ] 所有元素颜色正确显示

### ✅ 打卡系统测试
- [ ] 点击打卡按钮，显示成功动画
- [ ] 日历上显示打卡标记
- [ ] 连续打卡天数正确计算
- [ ] 今天打卡后按钮变为"已打卡"

### ✅ 数据可视化测试
- [ ] 4个图表都正常显示
- [ ] 图表数据正确
- [ ] 图表响应式（调整窗口大小）
- [ ] 深色模式下图表正常显示

---

## 常见问题快速解决

### 问题 1：图表不显示
**原因**：Chart.js 未加载

**解决**：
1. 检查网络连接
2. 确认 CDN 链接正确
3. 打开浏览器控制台查看错误

### 问题 2：深色模式按钮不显示
**原因**：JavaScript 未加载

**解决**：
1. 确认 `dark-mode.js` 路径正确
2. 检查浏览器控制台错误
3. 确保在 `</body>` 之前加载脚本

### 问题 3：打卡数据丢失
**原因**：清除了浏览器缓存

**解决**：
- 数据存储在 LocalStorage，清除缓存会丢失
- 建议定期导出数据（未来功能）

---

## 下一步

### 立即尝试
1. 打开 `my-dashboard.html`
2. 打卡一次
3. 切换深色模式
4. 查看图表

### 深入了解
- 阅读 `NEW_FEATURES_GUIDE.md` 了解详细功能
- 查看 `PROJECT_IMPROVEMENT_PLAN.md` 了解未来规划
- 检查源代码学习实现细节

### 自定义
- 修改 `dark-mode.css` 调整深色模式颜色
- 编辑 `study-checkin.js` 自定义打卡逻辑
- 调整 `study-analytics.js` 改变图表样式

---

## 需要帮助？

### 调试技巧
1. 打开浏览器开发者工具（F12）
2. 查看 Console 标签的错误信息
3. 检查 Network 标签的资源加载
4. 查看 Application > Local Storage 的数据

### 验证安装
在浏览器控制台执行：

```javascript
// 检查深色模式
console.log('深色模式:', window.darkMode ? '✅ 已加载' : '❌ 未加载');

// 检查打卡系统
console.log('打卡系统:', window.studyCheckin ? '✅ 已加载' : '❌ 未加载');

// 检查数据分析
console.log('数据分析:', window.studyAnalytics ? '✅ 已加载' : '❌ 未加载');

// 检查 Chart.js
console.log('Chart.js:', typeof Chart !== 'undefined' ? '✅ 已加载' : '❌ 未加载');
```

---

## 成功标志

当你看到以下内容时，说明一切正常：

1. ✅ 右下角有深色模式切换按钮
2. ✅ 打卡日历正常显示
3. ✅ 4个图表都能看到
4. ✅ 点击打卡后有成功动画
5. ✅ 切换深色模式后页面颜色改变

---

**恭喜！你已经成功集成了所有新功能！🎉**

现在开始享受更强大的学习管理系统吧！

---

*最后更新：2025年1月28日*
*TUST-ACM 算法实验室*

# 算法竞赛赛程系统说明

## 🏆 功能概述

算法竞赛赛程系统是一个集成多个主流算法竞赛平台的实时赛程展示页面，帮助学习者及时了解和参加各类算法竞赛。

## ✨ 主要功能

### 1. 多平台支持

支持 8 个主流算法竞赛平台：

- **Codeforces** - 全球顶级算法竞赛平台
- **AtCoder** - 日本顶级算法竞赛平台
- **LeetCode** - 面试刷题与周赛平台
- **洛谷 (Luogu)** - 国内最大算法学习平台
- **牛客网 (NowCoder)** - IT求职与竞赛平台
- **AcWing** - 算法学习与竞赛平台
- **CodeChef** - 印度顶级竞赛平台
- **TopCoder** - 老牌算法竞赛平台

### 2. 实时赛程展示

- ✅ 自动获取最新比赛信息
- ✅ 按时间分组显示（进行中、今日、即将开始）
- ✅ 实时倒计时显示
- ✅ 比赛状态标识
- ✅ 每 5 分钟自动刷新

### 3. 智能筛选

**平台筛选：**
- 全部平台
- 单个平台筛选
- 快速切换

**时间筛选：**
- 全部时间
- 今天
- 本周
- 本月

### 4. 比赛详情

每场比赛显示：
- 📅 比赛日期和星期
- ⏰ 开始时间（北京时间）
- ⏱️ 比赛时长
- 🏷️ 比赛类型和难度
- ⏳ 距离开始的倒计时
- 🔗 一键跳转报名

### 5. 日历导出

- ✅ 单场比赛添加到日历
- ✅ 批量导出所有比赛
- ✅ ICS 格式支持
- ✅ 自动设置 30 分钟提前提醒
- ✅ 兼容各大日历应用

### 6. 统计信息

实时显示：
- 即将开始的比赛总数
- 今日比赛数量
- 本周比赛数量
- 支持平台数量

## 📁 文件结构

```
src/
├── contests.html                      # 竞赛赛程页面
├── assets/
│   ├── css/
│   │   └── contest-schedule.css      # 赛程样式
│   └── js/
│       └── contest-schedule.js       # 赛程功能
```

## 🔧 技术实现

### 数据获取

目前使用模拟数据，实际部署时可以：

#### 方案 1：使用 Clist API（推荐）

```javascript
// Clist 是一个聚合多个竞赛平台的 API 服务
const API_KEY = 'your-api-key';
const API_URL = 'https://clist.by/api/v2/contest/';

async function fetchContests() {
    const response = await fetch(`${API_URL}?username=your-username&api_key=${API_KEY}&limit=100&start__gt=${new Date().toISOString()}`);
    const data = await response.json();
    return data.objects;
}
```

注册地址：https://clist.by/api/v2/doc/

#### 方案 2：使用各平台官方 API

**Codeforces API:**
```javascript
// 获取比赛列表
fetch('https://codeforces.com/api/contest.list')
    .then(res => res.json())
    .then(data => {
        const upcomingContests = data.result.filter(c => c.phase === 'BEFORE');
        // 处理数据...
    });
```

**AtCoder API:**
```javascript
// AtCoder 没有官方 API，可以爬取网页或使用第三方 API
// 推荐使用 Kenkoooo's AtCoder Problems API
fetch('https://kenkoooo.com/atcoder/resources/contests.json')
    .then(res => res.json())
    .then(contests => {
        // 处理数据...
    });
```

**LeetCode API:**
```javascript
// LeetCode 中国区 GraphQL API
const query = `
query {
    allContests {
        title
        titleSlug
        startTime
        duration
    }
}
`;

fetch('https://leetcode.cn/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
})
.then(res => res.json())
.then(data => {
    // 处理数据...
});
```

#### 方案 3：使用后端代理

由于浏览器跨域限制，推荐使用后端代理：

```javascript
// 前端调用
async function fetchContests() {
    const response = await fetch('/api/contests');
    return await response.json();
}

// 后端代理（Node.js + Express 示例）
app.get('/api/contests', async (req, res) => {
    try {
        // 并发请求多个平台
        const [cf, ac, lc] = await Promise.all([
            fetch('https://codeforces.com/api/contest.list'),
            fetch('https://kenkoooo.com/atcoder/resources/contests.json'),
            fetch('https://leetcode.cn/graphql', { /* ... */ })
        ]);
        
        // 合并和处理数据
        const contests = mergeContests(cf, ac, lc);
        
        // 缓存结果（5分钟）
        res.setHeader('Cache-Control', 'public, max-age=300');
        res.json(contests);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch contests' });
    }
});
```

### 数据格式

标准比赛数据格式：

```javascript
{
    id: 'unique-id',              // 唯一标识
    platform: 'codeforces',       // 平台标识
    platformName: 'Codeforces',   // 平台名称
    name: '比赛名称',              // 比赛名称
    startTime: Date,              // 开始时间（Date 对象）
    duration: 120,                // 时长（分钟）
    url: 'https://...',           // 报名链接
    type: 'Rated',                // 类型（Rated/Unrated）
    difficulty: 'Div. 2'          // 难度标识
}
```

### 时区处理

所有时间自动转换为北京时间（UTC+8）：

```javascript
// 如果 API 返回 UTC 时间
const utcTime = new Date(apiTime);
const beijingTime = new Date(utcTime.getTime() + 8 * 60 * 60 * 1000);

// 或使用 Intl API
const beijingTime = new Date(apiTime).toLocaleString('zh-CN', {
    timeZone: 'Asia/Shanghai'
});
```

### 自动刷新

每 5 分钟自动刷新数据：

```javascript
// 在 ContestSchedule 构造函数中
setInterval(() => this.refreshContests(), 5 * 60 * 1000);
```

### 日历导出

生成 ICS 格式文件：

```javascript
// ICS 文件格式
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
UID:contest-id@tust-acm
DTSTART:20250128T103000Z
DTEND:20250128T123000Z
SUMMARY:比赛名称
DESCRIPTION:比赛描述
URL:https://contest-url
BEGIN:VALARM
TRIGGER:-PT30M
ACTION:DISPLAY
END:VALARM
END:VEVENT
END:VCALENDAR
```

## 🚀 部署指南

### 1. 静态部署（当前方案）

直接部署 HTML 文件，使用模拟数据：

```bash
# 复制文件到 Web 服务器
cp -r src/* /var/www/html/
```

优点：
- 部署简单
- 无需后端
- 成本低

缺点：
- 数据不是实时的
- 需要手动更新

### 2. 使用 Clist API

注册 Clist API 并配置：

```javascript
// 在 contest-schedule.js 中
const CLIST_API_KEY = 'your-api-key';
const CLIST_USERNAME = 'your-username';

async function fetchFromClist() {
    const url = `https://clist.by/api/v2/contest/?username=${CLIST_USERNAME}&api_key=${CLIST_API_KEY}&limit=100&start__gt=${new Date().toISOString()}`;
    const response = await fetch(url);
    return await response.json();
}
```

优点：
- 数据实时更新
- 支持多平台
- API 稳定

缺点：
- 需要注册账号
- 有请求限制
- 可能需要付费

### 3. 使用后端代理（推荐）

创建 Node.js 后端：

```bash
# 安装依赖
npm install express node-fetch cors

# 创建服务器
node server.js
```

```javascript
// server.js
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());

// 缓存
let cache = { data: null, timestamp: 0 };
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟

app.get('/api/contests', async (req, res) => {
    const now = Date.now();
    
    // 使用缓存
    if (cache.data && (now - cache.timestamp) < CACHE_DURATION) {
        return res.json(cache.data);
    }
    
    try {
        // 获取各平台数据
        const contests = await fetchAllPlatforms();
        
        // 更新缓存
        cache = { data: contests, timestamp: now };
        
        res.json(contests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
```

优点：
- 完全控制
- 可以缓存
- 避免跨域问题
- 可以聚合多个 API

缺点：
- 需要服务器
- 需要维护

## 📝 使用说明

### 用户使用

1. **浏览比赛**
   - 访问竞赛赛程页面
   - 查看即将开始的比赛
   - 按平台或时间筛选

2. **查看详情**
   - 点击比赛卡片查看详细信息
   - 查看开始时间和时长
   - 查看比赛类型和难度

3. **报名参赛**
   - 点击"前往报名"按钮
   - 跳转到平台官网
   - 完成注册和报名

4. **添加提醒**
   - 点击"添加提醒"按钮
   - 下载 ICS 日历文件
   - 导入到日历应用
   - 自动获得 30 分钟提前提醒

5. **导出日历**
   - 点击"导出日历"按钮
   - 批量导出所有比赛
   - 一次性添加到日历

### 管理员维护

1. **更新数据源**
   - 编辑 `contest-schedule.js`
   - 修改数据获取函数
   - 配置 API 密钥

2. **添加新平台**
   - 在 `getXXXContests()` 添加新函数
   - 更新平台列表
   - 添加平台样式

3. **调整刷新频率**
   - 修改 `setInterval` 参数
   - 建议 3-10 分钟

4. **自定义样式**
   - 编辑 `contest-schedule.css`
   - 修改颜色、布局等

## 🔮 未来扩展

### 短期计划

1. **集成真实 API**
   - 接入 Clist API
   - 或使用后端代理
   - 实现实时数据更新

2. **用户订阅功能**
   - 订阅特定平台
   - 订阅特定难度
   - 邮件/微信提醒

3. **历史比赛记录**
   - 查看过往比赛
   - 比赛结果统计
   - 个人参赛记录

### 中期计划

1. **个性化推荐**
   - 根据用户水平推荐
   - 根据历史参赛推荐
   - 智能提醒

2. **社区功能**
   - 比赛讨论区
   - 题解分享
   - 组队参赛

3. **数据分析**
   - 比赛难度分析
   - 参赛人数统计
   - 平台活跃度

### 长期计划

1. **移动应用**
   - iOS/Android App
   - 推送通知
   - 离线查看

2. **AI 助手**
   - 比赛难度预测
   - 题目推荐
   - 学习路径规划

3. **国际化**
   - 多语言支持
   - 多时区支持
   - 全球平台覆盖

## 🐛 常见问题

### Q1: 为什么数据不是实时的？

**A:** 当前使用模拟数据。要实现实时更新，需要：
1. 注册 Clist API
2. 或搭建后端代理
3. 或直接调用各平台 API

### Q2: 如何添加新的竞赛平台？

**A:** 
1. 在 `contest-schedule.js` 中添加获取函数
2. 在 `contests.html` 中添加平台卡片
3. 在 `contest-schedule.css` 中添加平台样式

### Q3: 日历文件无法导入？

**A:** 
- 确保使用支持 ICS 格式的日历应用
- 推荐：Google Calendar、Apple Calendar、Outlook
- 检查文件编码是否为 UTF-8

### Q4: 时间显示不正确？

**A:** 
- 检查系统时区设置
- 确认 API 返回的时间格式
- 验证时区转换逻辑

### Q5: 如何处理跨域问题？

**A:** 
- 使用 CORS 代理服务
- 搭建后端代理
- 使用支持 CORS 的 API

## 📞 技术支持

如有问题或建议：
- 查看项目文档
- 访问实验室网站
- 联系技术团队

---

**最后更新：** 2025年1月28日  
**版本：** 1.0.0  
**作者：** TUST-ACM 算法实验室

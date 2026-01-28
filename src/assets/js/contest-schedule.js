/**
 * TUST-ACM 算法竞赛赛程系统
 * Contest Schedule System
 */

class ContestSchedule {
    constructor() {
        this.contests = [];
        this.filteredContests = [];
        this.currentPlatformFilter = 'all';
        this.currentTimeFilter = 'all';
        this.init();
    }

    init() {
        this.loadContests();
        this.attachEventListeners();
        // 每5分钟自动刷新一次
        setInterval(() => this.refreshContests(), 5 * 60 * 1000);
    }

    async loadContests() {
        try {
            // 显示加载状态
            document.getElementById('loading-state').style.display = 'block';
            document.getElementById('contest-list').style.display = 'none';
            document.getElementById('empty-state').style.display = 'none';

            // 获取各平台的比赛数据
            await this.fetchAllPlatforms();

            // 排序比赛（按开始时间）
            this.contests.sort((a, b) => a.startTime - b.startTime);

            // 应用筛选
            this.applyFilters();

            // 更新统计
            this.updateStats();

            // 渲染比赛列表
            this.renderContests();

            // 隐藏加载状态
            document.getElementById('loading-state').style.display = 'none';
            
        } catch (error) {
            console.error('加载比赛数据失败:', error);
            this.showError();
        }
    }

    async fetchAllPlatforms() {
        // 由于跨域限制，这里使用模拟数据
        // 实际部署时需要配置后端代理或使用 CORS 代理服务
        
        this.contests = [];

        // Codeforces 比赛（模拟数据）
        this.contests.push(...this.getCodeforcesContests());
        
        // AtCoder 比赛（模拟数据）
        this.contests.push(...this.getAtCoderContests());
        
        // LeetCode 比赛（模拟数据）
        this.contests.push(...this.getLeetCodeContests());
        
        // 洛谷比赛（模拟数据）
        this.contests.push(...this.getLuoguContests());
        
        // 牛客比赛（模拟数据）
        this.contests.push(...this.getNowCoderContests());
        
        // AcWing 比赛（模拟数据）
        this.contests.push(...this.getAcWingContests());

        // 注意：实际使用时，应该调用真实的 API
        // 例如：Codeforces API: https://codeforces.com/api/contest.list
        // 可以使用 Clist API: https://clist.by/api/v2/contest/
    }

    getCodeforcesContests() {
        const now = new Date();
        // Codeforces 比赛通常在北京时间晚上 22:35 或 23:35
        const contest1 = new Date(now);
        contest1.setDate(now.getDate() + 2);
        contest1.setHours(22, 35, 0, 0);

        const contest2 = new Date(now);
        contest2.setDate(now.getDate() + 4);
        contest2.setHours(23, 35, 0, 0);

        const contest3 = new Date(now);
        contest3.setDate(now.getDate() + 7);
        contest3.setHours(22, 35, 0, 0);

        return [
            {
                id: 'cf-1',
                platform: 'codeforces',
                platformName: 'Codeforces',
                name: 'Codeforces Round #920 (Div. 2)',
                startTime: contest1,
                duration: 2 * 60, // 分钟
                url: 'https://codeforces.com/contests',
                type: 'Rated',
                difficulty: 'Div. 2'
            },
            {
                id: 'cf-2',
                platform: 'codeforces',
                platformName: 'Codeforces',
                name: 'Educational Codeforces Round 162',
                startTime: contest2,
                duration: 2 * 60,
                url: 'https://codeforces.com/contests',
                type: 'Rated',
                difficulty: 'Educational'
            },
            {
                id: 'cf-3',
                platform: 'codeforces',
                platformName: 'Codeforces',
                name: 'Codeforces Round #921 (Div. 1)',
                startTime: contest3,
                duration: 2.5 * 60,
                url: 'https://codeforces.com/contests',
                type: 'Rated',
                difficulty: 'Div. 1'
            }
        ];
    }

    getAtCoderContests() {
        const now = new Date();
        // AtCoder ABC 通常在周六晚上 20:00 (北京时间)
        const nextSaturday = new Date(now);
        const daysUntilSaturday = (6 - now.getDay() + 7) % 7 || 7;
        nextSaturday.setDate(now.getDate() + daysUntilSaturday);
        nextSaturday.setHours(20, 0, 0, 0);

        const contest2 = new Date(nextSaturday);
        contest2.setDate(nextSaturday.getDate() + 7);
        contest2.setHours(20, 0, 0, 0);

        const contest3 = new Date(nextSaturday);
        contest3.setDate(nextSaturday.getDate() + 14);
        contest3.setHours(20, 0, 0, 0);

        return [
            {
                id: 'ac-1',
                platform: 'atcoder',
                platformName: 'AtCoder',
                name: 'AtCoder Beginner Contest 340',
                startTime: nextSaturday,
                duration: 100,
                url: 'https://atcoder.jp/contests/',
                type: 'Rated',
                difficulty: 'ABC'
            },
            {
                id: 'ac-2',
                platform: 'atcoder',
                platformName: 'AtCoder',
                name: 'AtCoder Regular Contest 170',
                startTime: contest2,
                duration: 120,
                url: 'https://atcoder.jp/contests/',
                type: 'Rated',
                difficulty: 'ARC'
            },
            {
                id: 'ac-3',
                platform: 'atcoder',
                platformName: 'AtCoder',
                name: 'AtCoder Grand Contest 062',
                startTime: contest3,
                duration: 150,
                url: 'https://atcoder.jp/contests/',
                type: 'Rated',
                difficulty: 'AGC'
            }
        ];
    }

    getLeetCodeContests() {
        const now = new Date();
        // LeetCode 周赛通常在周日上午 10:30 (北京时间)
        const nextSunday = new Date(now);
        const daysUntilSunday = (7 - now.getDay()) % 7 || 7; // 如果今天是周日，则取下周日
        nextSunday.setDate(now.getDate() + daysUntilSunday);
        nextSunday.setHours(10, 30, 0, 0);

        // 双周赛通常在周六晚上 22:30 (北京时间)
        const nextSaturday = new Date(nextSunday);
        nextSaturday.setDate(nextSunday.getDate() - 1);
        nextSaturday.setHours(22, 30, 0, 0);

        return [
            {
                id: 'lc-1',
                platform: 'leetcode',
                platformName: 'LeetCode',
                name: 'LeetCode 周赛 382',
                startTime: nextSunday,
                duration: 90,
                url: 'https://leetcode.cn/contest/',
                type: 'Rated',
                difficulty: '周赛'
            },
            {
                id: 'lc-2',
                platform: 'leetcode',
                platformName: 'LeetCode',
                name: 'LeetCode 双周赛 123',
                startTime: nextSaturday,
                duration: 90,
                url: 'https://leetcode.cn/contest/',
                type: 'Rated',
                difficulty: '双周赛'
            }
        ];
    }

    getLuoguContests() {
        const now = new Date();
        // 洛谷月赛通常在每月第一个周六晚上 19:00
        const contest1 = new Date(now);
        contest1.setDate(now.getDate() + 3);
        contest1.setHours(19, 0, 0, 0);

        const contest2 = new Date(now);
        contest2.setDate(now.getDate() + 6);
        contest2.setHours(14, 0, 0, 0);

        return [
            {
                id: 'lg-1',
                platform: 'luogu',
                platformName: '洛谷',
                name: '洛谷月赛 2025.02',
                startTime: contest1,
                duration: 180,
                url: 'https://www.luogu.com.cn/contest/list',
                type: 'Rated',
                difficulty: '月赛'
            },
            {
                id: 'lg-2',
                platform: 'luogu',
                platformName: '洛谷',
                name: 'CSP-S 2025 模拟赛',
                startTime: contest2,
                duration: 240,
                url: 'https://www.luogu.com.cn/contest/list',
                type: 'Unrated',
                difficulty: '模拟赛'
            }
        ];
    }

    getNowCoderContests() {
        const now = new Date();
        // 牛客比赛通常在周六晚上 19:00 或 20:00
        const contest1 = new Date(now);
        contest1.setDate(now.getDate() + 2);
        contest1.setHours(19, 0, 0, 0);

        const contest2 = new Date(now);
        contest2.setDate(now.getDate() + 5);
        contest2.setHours(20, 0, 0, 0);

        return [
            {
                id: 'nc-1',
                platform: 'nowcoder',
                platformName: '牛客',
                name: '牛客小白月赛 82',
                startTime: contest1,
                duration: 120,
                url: 'https://ac.nowcoder.com/acm/contest/vip-index',
                type: 'Rated',
                difficulty: '小白月赛'
            },
            {
                id: 'nc-2',
                platform: 'nowcoder',
                platformName: '牛客',
                name: '牛客周赛 Round 28',
                startTime: contest2,
                duration: 120,
                url: 'https://ac.nowcoder.com/acm/contest/vip-index',
                type: 'Rated',
                difficulty: '周赛'
            }
        ];
    }

    getAcWingContests() {
        const now = new Date();
        // AcWing 周赛通常在周六晚上 20:00
        const nextSaturday = new Date(now);
        const daysUntilSaturday = (6 - now.getDay() + 7) % 7 || 7;
        nextSaturday.setDate(now.getDate() + daysUntilSaturday);
        nextSaturday.setHours(20, 0, 0, 0);

        return [
            {
                id: 'aw-1',
                platform: 'acwing',
                platformName: 'AcWing',
                name: 'AcWing 周赛 138',
                startTime: nextSaturday,
                duration: 90,
                url: 'https://www.acwing.com/activity/',
                type: 'Rated',
                difficulty: '周赛'
            }
        ];
    }

    applyFilters() {
        this.filteredContests = this.contests.filter(contest => {
            // 平台筛选
            if (this.currentPlatformFilter !== 'all' && 
                contest.platform !== this.currentPlatformFilter) {
                return false;
            }

            // 时间筛选
            const now = new Date();
            const contestStart = contest.startTime;
            
            if (this.currentTimeFilter === 'today') {
                const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
                if (contestStart < today || contestStart >= tomorrow) {
                    return false;
                }
            } else if (this.currentTimeFilter === 'week') {
                const weekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
                if (contestStart > weekLater) {
                    return false;
                }
            } else if (this.currentTimeFilter === 'month') {
                const monthLater = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
                if (contestStart > monthLater) {
                    return false;
                }
            }

            return true;
        });
    }

    renderContests() {
        const container = document.getElementById('contest-list');
        
        if (this.filteredContests.length === 0) {
            container.style.display = 'none';
            document.getElementById('empty-state').style.display = 'block';
            return;
        }

        container.style.display = 'block';
        document.getElementById('empty-state').style.display = 'none';

        const now = new Date();
        const groupedContests = {
            ongoing: [],
            today: [],
            upcoming: []
        };

        this.filteredContests.forEach(contest => {
            const endTime = new Date(contest.startTime.getTime() + contest.duration * 60 * 1000);
            
            if (now >= contest.startTime && now < endTime) {
                groupedContests.ongoing.push(contest);
            } else if (this.isToday(contest.startTime)) {
                groupedContests.today.push(contest);
            } else {
                groupedContests.upcoming.push(contest);
            }
        });

        let html = '';

        // 进行中的比赛
        if (groupedContests.ongoing.length > 0) {
            html += '<h4 class="mb-4"><i class="fas fa-play-circle text-success"></i> 进行中</h4>';
            html += '<div class="row mb-5">';
            groupedContests.ongoing.forEach(contest => {
                html += this.renderContestCard(contest, 'ongoing');
            });
            html += '</div>';
        }

        // 今日比赛
        if (groupedContests.today.length > 0) {
            html += '<h4 class="mb-4"><i class="fas fa-calendar-day text-warning"></i> 今日比赛</h4>';
            html += '<div class="row mb-5">';
            groupedContests.today.forEach(contest => {
                html += this.renderContestCard(contest, 'today');
            });
            html += '</div>';
        }

        // 即将开始
        if (groupedContests.upcoming.length > 0) {
            html += '<h4 class="mb-4"><i class="fas fa-clock text-primary"></i> 即将开始</h4>';
            html += '<div class="row">';
            groupedContests.upcoming.forEach(contest => {
                html += this.renderContestCard(contest, 'upcoming');
            });
            html += '</div>';
        }

        container.innerHTML = html;
    }

    renderContestCard(contest, status) {
        const platformColors = {
            codeforces: '#1f8acb',
            atcoder: '#000',
            leetcode: '#ffa116',
            luogu: '#0e90d2',
            nowcoder: '#2ec866',
            acwing: '#00a1e9',
            codechef: '#e74c3c',
            topcoder: '#39424e'
        };

        const platformIcons = {
            codeforces: 'fa-code',
            atcoder: 'fa-atom',
            leetcode: 'fa-laptop-code',
            luogu: 'fa-flag',
            nowcoder: 'fa-graduation-cap',
            acwing: 'fa-book',
            codechef: 'fa-trophy',
            topcoder: 'fa-code-branch'
        };

        const statusBadges = {
            ongoing: '<span class="badge badge-success">进行中</span>',
            today: '<span class="badge badge-warning">今日</span>',
            upcoming: '<span class="badge badge-primary">即将开始</span>'
        };

        const timeInfo = this.getTimeInfo(contest, status);
        const color = platformColors[contest.platform] || '#5e72e4';
        const icon = platformIcons[contest.platform] || 'fa-trophy';

        return `
            <div class="col-lg-6 mb-4">
                <div class="contest-card ${status}">
                    <div class="contest-header" style="border-left: 4px solid ${color}">
                        <div class="contest-platform">
                            <i class="fas ${icon}" style="color: ${color}"></i>
                            <span>${contest.platformName}</span>
                        </div>
                        ${statusBadges[status]}
                    </div>
                    <div class="contest-body">
                        <h5 class="contest-title">${contest.name}</h5>
                        <div class="contest-meta">
                            <div class="meta-item">
                                <i class="fas fa-calendar"></i>
                                <span>${this.formatDate(contest.startTime)}</span>
                            </div>
                            <div class="meta-item">
                                <i class="fas fa-clock"></i>
                                <span>${this.formatTime(contest.startTime)} (${this.formatDuration(contest.duration)})</span>
                            </div>
                            <div class="meta-item">
                                <i class="fas fa-tag"></i>
                                <span>${contest.type} · ${contest.difficulty}</span>
                            </div>
                        </div>
                        ${timeInfo}
                    </div>
                    <div class="contest-footer">
                        <a href="${contest.url}" target="_blank" class="btn btn-sm btn-primary">
                            <i class="fas fa-external-link-alt"></i> 前往报名
                        </a>
                        <button class="btn btn-sm btn-outline-primary" onclick="contestSchedule.addToCalendar('${contest.id}')">
                            <i class="fas fa-calendar-plus"></i> 添加提醒
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    getTimeInfo(contest, status) {
        const now = new Date();
        
        if (status === 'ongoing') {
            const endTime = new Date(contest.startTime.getTime() + contest.duration * 60 * 1000);
            const remaining = Math.floor((endTime - now) / 1000 / 60);
            return `
                <div class="time-info ongoing">
                    <i class="fas fa-hourglass-half"></i>
                    <span>剩余时间: ${remaining} 分钟</span>
                </div>
            `;
        } else {
            const countdown = this.getCountdown(contest.startTime);
            return `
                <div class="time-info countdown">
                    <i class="fas fa-stopwatch"></i>
                    <span>距离开始: ${countdown}</span>
                </div>
            `;
        }
    }

    getCountdown(startTime) {
        const now = new Date();
        const diff = startTime - now;
        
        if (diff < 0) return '已开始';
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        if (days > 0) {
            return `${days} 天 ${hours} 小时`;
        } else if (hours > 0) {
            return `${hours} 小时 ${minutes} 分钟`;
        } else {
            return `${minutes} 分钟`;
        }
    }

    formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        const weekday = weekdays[date.getDay()];
        return `${year}-${month}-${day} ${weekday}`;
    }

    formatTime(date) {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        // 添加时区信息
        const timezone = 'UTC+8';
        return `${hours}:${minutes} (${timezone})`;
    }

    formatDuration(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (hours > 0 && mins > 0) {
            return `${hours}小时${mins}分钟`;
        } else if (hours > 0) {
            return `${hours}小时`;
        } else {
            return `${mins}分钟`;
        }
    }

    isToday(date) {
        const now = new Date();
        return date.getDate() === now.getDate() &&
               date.getMonth() === now.getMonth() &&
               date.getFullYear() === now.getFullYear();
    }

    updateStats() {
        const now = new Date();
        const weekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        
        // 即将开始的比赛（未来30天）
        const upcomingContests = this.contests.filter(c => c.startTime > now);
        document.getElementById('total-contests').textContent = upcomingContests.length;
        
        // 今日比赛
        const todayContests = this.contests.filter(c => this.isToday(c.startTime));
        document.getElementById('today-contests').textContent = todayContests.length;
        
        // 本周比赛
        const weekContests = this.contests.filter(c => c.startTime > now && c.startTime < weekLater);
        document.getElementById('week-contests').textContent = weekContests.length;
    }

    attachEventListeners() {
        // 平台筛选
        document.querySelectorAll('.platform-filters .filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.platform-filters .filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentPlatformFilter = e.target.dataset.platform;
                this.applyFilters();
                this.renderContests();
            });
        });

        // 时间筛选
        document.querySelectorAll('.time-filters .filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.time-filters .filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentTimeFilter = e.target.dataset.time;
                this.applyFilters();
                this.renderContests();
            });
        });
    }

    refreshContests() {
        this.loadContests();
    }

    addToCalendar(contestId) {
        const contest = this.contests.find(c => c.id === contestId);
        if (!contest) return;

        // 创建 ICS 文件内容
        const startTime = this.formatICSDate(contest.startTime);
        const endTime = this.formatICSDate(new Date(contest.startTime.getTime() + contest.duration * 60 * 1000));
        
        const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//TUST-ACM//Contest Schedule//CN
BEGIN:VEVENT
UID:${contest.id}@tust-acm
DTSTAMP:${this.formatICSDate(new Date())}
DTSTART:${startTime}
DTEND:${endTime}
SUMMARY:${contest.name}
DESCRIPTION:${contest.platformName} - ${contest.type}
URL:${contest.url}
BEGIN:VALARM
TRIGGER:-PT30M
ACTION:DISPLAY
DESCRIPTION:比赛将在30分钟后开始
END:VALARM
END:VEVENT
END:VCALENDAR`;

        // 下载 ICS 文件
        const blob = new Blob([icsContent], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${contest.name}.ics`;
        a.click();
        URL.revokeObjectURL(url);

        alert('日历事件已下载，请导入到您的日历应用中！');
    }

    formatICSDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}${month}${day}T${hours}${minutes}${seconds}`;
    }

    exportCalendar() {
        // 导出所有即将开始的比赛到日历
        const now = new Date();
        const upcomingContests = this.contests.filter(c => c.startTime > now);
        
        if (upcomingContests.length === 0) {
            alert('暂无即将开始的比赛');
            return;
        }

        let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//TUST-ACM//Contest Schedule//CN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:算法竞赛赛程
X-WR-TIMEZONE:Asia/Shanghai
`;

        upcomingContests.forEach(contest => {
            const startTime = this.formatICSDate(contest.startTime);
            const endTime = this.formatICSDate(new Date(contest.startTime.getTime() + contest.duration * 60 * 1000));
            
            icsContent += `BEGIN:VEVENT
UID:${contest.id}@tust-acm
DTSTAMP:${this.formatICSDate(new Date())}
DTSTART:${startTime}
DTEND:${endTime}
SUMMARY:${contest.name}
DESCRIPTION:${contest.platformName} - ${contest.type}
URL:${contest.url}
BEGIN:VALARM
TRIGGER:-PT30M
ACTION:DISPLAY
DESCRIPTION:比赛将在30分钟后开始
END:VALARM
END:VEVENT
`;
        });

        icsContent += 'END:VCALENDAR';

        // 下载 ICS 文件
        const blob = new Blob([icsContent], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = '算法竞赛赛程.ics';
        a.click();
        URL.revokeObjectURL(url);

        alert(`已导出 ${upcomingContests.length} 场比赛到日历文件！`);
    }

    showError() {
        document.getElementById('loading-state').style.display = 'none';
        document.getElementById('contest-list').innerHTML = `
            <div class="alert alert-danger text-center">
                <i class="fas fa-exclamation-triangle"></i>
                加载比赛数据失败，请稍后重试或刷新页面
            </div>
        `;
        document.getElementById('contest-list').style.display = 'block';
    }
}

// 初始化竞赛赛程系统
document.addEventListener('DOMContentLoaded', () => {
    window.contestSchedule = new ContestSchedule();
});

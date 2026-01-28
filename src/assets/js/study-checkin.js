/**
 * TUST-ACM 学习打卡系统
 * Study Check-in System
 */

class StudyCheckin {
    constructor() {
        this.storageKey = 'tust-acm-checkin-records';
        this.records = this.loadRecords();
        this.init();
    }

    init() {
        this.renderCheckinCalendar();
        this.renderCheckinStats();
        this.attachEventListeners();
    }

    loadRecords() {
        const saved = localStorage.getItem(this.storageKey);
        return saved ? JSON.parse(saved) : {
            checkins: [], // 打卡日期数组
            streak: 0, // 连续打卡天数
            totalDays: 0, // 总打卡天数
            lastCheckin: null // 最后打卡日期
        };
    }

    saveRecords() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.records));
    }

    // 获取今天的日期字符串
    getTodayString() {
        return new Date().toISOString().split('T')[0];
    }

    // 检查今天是否已打卡
    hasCheckedInToday() {
        const today = this.getTodayString();
        return this.records.checkins.includes(today);
    }

    // 打卡
    checkin() {
        if (this.hasCheckedInToday()) {
            return { success: false, message: '今天已经打卡过了！' };
        }

        const today = this.getTodayString();
        this.records.checkins.push(today);
        this.records.totalDays++;
        this.records.lastCheckin = today;
        
        // 计算连续打卡天数
        this.updateStreak();
        
        this.saveRecords();
        this.renderCheckinCalendar();
        this.renderCheckinStats();
        
        return { 
            success: true, 
            message: `打卡成功！已连续打卡 ${this.records.streak} 天`,
            streak: this.records.streak
        };
    }

    // 更新连续打卡天数
    updateStreak() {
        const sortedCheckins = this.records.checkins.sort().reverse();
        let streak = 0;
        let currentDate = new Date();
        
        for (let i = 0; i < sortedCheckins.length; i++) {
            const checkinDate = new Date(sortedCheckins[i]);
            const diffDays = Math.floor((currentDate - checkinDate) / (1000 * 60 * 60 * 24));
            
            if (diffDays === i) {
                streak++;
            } else {
                break;
            }
        }
        
        this.records.streak = streak;
    }

    // 渲染打卡日历
    renderCheckinCalendar() {
        const container = document.getElementById('checkin-calendar');
        if (!container) return;

        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        
        // 生成日历HTML
        const calendarHTML = this.generateCalendarHTML(year, month);
        container.innerHTML = calendarHTML;
    }

    // 生成日历HTML
    generateCalendarHTML(year, month) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startDayOfWeek = firstDay.getDay();
        
        const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', 
                           '七月', '八月', '九月', '十月', '十一月', '十二月'];
        
        let html = `
            <div class="checkin-calendar-container">
                <div class="calendar-header">
                    <h4>${year}年 ${monthNames[month]}</h4>
                </div>
                <div class="calendar-weekdays">
                    <div class="weekday">日</div>
                    <div class="weekday">一</div>
                    <div class="weekday">二</div>
                    <div class="weekday">三</div>
                    <div class="weekday">四</div>
                    <div class="weekday">五</div>
                    <div class="weekday">六</div>
                </div>
                <div class="calendar-days">
        `;
        
        // 填充空白天数
        for (let i = 0; i < startDayOfWeek; i++) {
            html += '<div class="calendar-day empty"></div>';
        }
        
        // 填充实际天数
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isChecked = this.records.checkins.includes(dateStr);
            const isToday = dateStr === this.getTodayString();
            
            let dayClass = 'calendar-day';
            if (isChecked) dayClass += ' checked';
            if (isToday) dayClass += ' today';
            
            html += `
                <div class="${dayClass}" data-date="${dateStr}">
                    <span class="day-number">${day}</span>
                    ${isChecked ? '<span class="check-mark">✓</span>' : ''}
                </div>
            `;
        }
        
        html += `
                </div>
            </div>
        `;
        
        return html;
    }

    // 渲染打卡统计
    renderCheckinStats() {
        const statsContainer = document.getElementById('checkin-stats');
        if (!statsContainer) return;

        const today = this.getTodayString();
        const hasCheckedToday = this.hasCheckedInToday();
        
        statsContainer.innerHTML = `
            <div class="checkin-stats-grid">
                <div class="stat-card">
                    <div class="stat-icon">🔥</div>
                    <div class="stat-value">${this.records.streak}</div>
                    <div class="stat-label">连续打卡</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">📅</div>
                    <div class="stat-value">${this.records.totalDays}</div>
                    <div class="stat-label">累计打卡</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">${hasCheckedToday ? '✅' : '⏰'}</div>
                    <div class="stat-value">${hasCheckedToday ? '已打卡' : '未打卡'}</div>
                    <div class="stat-label">今日状态</div>
                </div>
            </div>
            
            <div class="checkin-action mt-4">
                ${hasCheckedToday ? 
                    '<button class="btn btn-success btn-lg" disabled>今日已打卡 ✓</button>' :
                    '<button class="btn btn-primary btn-lg" id="checkin-btn">立即打卡 🎯</button>'
                }
            </div>
            
            ${this.getMotivationalMessage()}
        `;
    }

    // 获取激励消息
    getMotivationalMessage() {
        const streak = this.records.streak;
        let message = '';
        let badge = '';
        
        if (streak === 0) {
            message = '开始你的学习打卡之旅吧！';
            badge = '🌱';
        } else if (streak < 7) {
            message = '很好的开始！继续保持！';
            badge = '💪';
        } else if (streak < 30) {
            message = '太棒了！你已经养成了学习习惯！';
            badge = '🌟';
        } else if (streak < 100) {
            message = '惊人的毅力！你是学习达人！';
            badge = '🏆';
        } else {
            message = '传奇！你是真正的学习大师！';
            badge = '👑';
        }
        
        return `
            <div class="motivational-message mt-4">
                <span class="badge-icon">${badge}</span>
                <p class="message-text">${message}</p>
            </div>
        `;
    }

    // 附加事件监听器
    attachEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.id === 'checkin-btn' || e.target.closest('#checkin-btn')) {
                const result = this.checkin();
                if (result.success) {
                    this.showCheckinSuccess(result);
                } else {
                    alert(result.message);
                }
            }
        });
    }

    // 显示打卡成功动画
    showCheckinSuccess(result) {
        const notification = document.createElement('div');
        notification.className = 'checkin-success-notification';
        notification.innerHTML = `
            <div class="success-content">
                <div class="success-icon">🎉</div>
                <h4>打卡成功！</h4>
                <p>已连续打卡 ${result.streak} 天</p>
            </div>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// 初始化打卡系统
document.addEventListener('DOMContentLoaded', () => {
    window.studyCheckin = new StudyCheckin();
});

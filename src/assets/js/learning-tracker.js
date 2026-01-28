/**
 * TUST-ACM 学习进度追踪系统
 * Learning Progress Tracker System
 */

class LearningTracker {
    constructor() {
        this.storageKey = 'tust-acm-learning-progress';
        this.progress = this.loadProgress();
        this.init();
    }

    init() {
        this.renderProgressDashboard();
        this.attachEventListeners();
        this.updateStatistics();
    }

    loadProgress() {
        const saved = localStorage.getItem(this.storageKey);
        return saved ? JSON.parse(saved) : {
            paths: {},
            achievements: [],
            startDate: new Date().toISOString(),
            totalStudyTime: 0
        };
    }

    saveProgress() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.progress));
    }

    // 标记课程完成
    markTopicComplete(pathId, topicId) {
        if (!this.progress.paths[pathId]) {
            this.progress.paths[pathId] = {
                completedTopics: [],
                startDate: new Date().toISOString(),
                lastActivity: new Date().toISOString()
            };
        }

        if (!this.progress.paths[pathId].completedTopics.includes(topicId)) {
            this.progress.paths[pathId].completedTopics.push(topicId);
            this.progress.paths[pathId].lastActivity = new Date().toISOString();
            this.checkAchievements(pathId);
            this.saveProgress();
            this.updateStatistics();
        }
    }

    // 计算学习路径完成度
    getPathProgress(pathId) {
        const pathData = this.progress.paths[pathId];
        if (!pathData) return 0;
        
        const totalTopics = this.getPathTopicCount(pathId);
        const completed = pathData.completedTopics.length;
        return totalTopics > 0 ? Math.round((completed / totalTopics) * 100) : 0;
    }

    getPathTopicCount(pathId) {
        const topicCounts = {
            'algorithm': 20,
            'cpp': 18,
            'python': 16,
            'frontend': 22,
            'backend': 24,
            'ai': 26
        };
        return topicCounts[pathId] || 20;
    }

    // 成就系统
    checkAchievements(pathId) {
        const progress = this.getPathProgress(pathId);
        const achievements = [
            { id: 'first-step', name: '迈出第一步', condition: () => progress >= 5, icon: '🎯' },
            { id: 'quarter', name: '四分之一里程碑', condition: () => progress >= 25, icon: '🌟' },
            { id: 'halfway', name: '半程英雄', condition: () => progress >= 50, icon: '🏆' },
            { id: 'almost-there', name: '即将完成', condition: () => progress >= 75, icon: '🚀' },
            { id: 'master', name: '路径大师', condition: () => progress >= 100, icon: '👑' }
        ];

        achievements.forEach(achievement => {
            const achievementId = `${pathId}-${achievement.id}`;
            if (achievement.condition() && !this.progress.achievements.includes(achievementId)) {
                this.progress.achievements.push(achievementId);
                this.showAchievementNotification(achievement);
            }
        });
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-content">
                <span class="achievement-icon">${achievement.icon}</span>
                <div class="achievement-text">
                    <strong>成就解锁！</strong>
                    <p>${achievement.name}</p>
                </div>
            </div>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // 渲染进度仪表板
    renderProgressDashboard() {
        const dashboardHTML = `
            <div class="learning-progress-dashboard">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <h3 class="mb-4">📊 我的学习进度</h3>
                            <p class="text-muted mb-4">查看你的学习计划和进度统计</p>
                        </div>
                    </div>
                    <div class="row" id="progress-cards">
                        <!-- 进度卡片将动态生成 -->
                    </div>
                    <div class="row mt-4">
                        <div class="col-lg-12">
                            <div class="statistics-panel">
                                <div class="stat-item">
                                    <span class="stat-icon">🎯</span>
                                    <div class="stat-content">
                                        <h4 id="total-achievements">0</h4>
                                        <p>已获成就</p>
                                    </div>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-icon">📚</span>
                                    <div class="stat-content">
                                        <h4 id="active-paths">0</h4>
                                        <p>学习路径</p>
                                    </div>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-icon">⏱️</span>
                                    <div class="stat-content">
                                        <h4 id="study-days">0</h4>
                                        <p>学习天数</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // 查找学习计划器section，在它之前插入仪表板
        const studyPlannerSection = document.querySelector('#study-planner-section');
        if (studyPlannerSection) {
            const dashboard = document.createElement('section');
            dashboard.className = 'slice slice-lg bg-section-secondary';
            dashboard.id = 'progress-dashboard-section';
            dashboard.innerHTML = dashboardHTML;
            studyPlannerSection.parentNode.insertBefore(dashboard, studyPlannerSection);
            
            console.log('学习进度仪表板已渲染');
        } else {
            console.warn('未找到学习计划器section，无法插入进度仪表板');
        }
    }

    updateStatistics() {
        // 更新统计数据
        document.getElementById('total-achievements').textContent = this.progress.achievements.length;
        document.getElementById('active-paths').textContent = Object.keys(this.progress.paths).length;
        
        const startDate = new Date(this.progress.startDate);
        const today = new Date();
        const daysDiff = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
        document.getElementById('study-days').textContent = daysDiff;

        // 更新进度卡片
        this.updateProgressCards();
    }

    updateProgressCards() {
        const progressCardsContainer = document.getElementById('progress-cards');
        if (!progressCardsContainer) return;

        const paths = [
            { id: 'algorithm', name: '算法竞赛', icon: '🧠', color: '#5e72e4' },
            { id: 'cpp', name: 'C/C++开发', icon: '⚙️', color: '#11cdef' },
            { id: 'python', name: 'Python开发', icon: '🐍', color: '#2dce89' },
            { id: 'frontend', name: '前端开发', icon: '🎨', color: '#fb6340' },
            { id: 'backend', name: '后端开发', icon: '🔧', color: '#f5365c' },
            { id: 'ai', name: 'AI/机器学习', icon: '🤖', color: '#8965e0' }
        ];

        // 加载保存的学习计划
        const savedPlans = localStorage.getItem('tust-acm-study-plans');
        const plans = savedPlans ? JSON.parse(savedPlans) : {};

        progressCardsContainer.innerHTML = paths.map(path => {
            const progress = this.getPathProgress(path.id);
            const isActive = this.progress.paths[path.id];
            const hasPlan = plans[path.id];
            
            return `
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="progress-card ${isActive ? 'active' : ''}">
                        <div class="progress-card-header" style="border-left: 4px solid ${path.color}">
                            <span class="path-icon">${path.icon}</span>
                            <h5>${path.name}</h5>
                        </div>
                        ${hasPlan ? `
                            <div class="mb-3 p-3" style="background: #f7f8fc; border-radius: 8px;">
                                <div class="d-flex justify-content-between align-items-center mb-2">
                                    <small class="text-muted">📅 学习计划</small>
                                    <span class="badge badge-success">已制定</span>
                                </div>
                                <div class="small">
                                    <div class="mb-1">⏰ 每周 ${hasPlan.weeklyHours} 小时</div>
                                    <div class="mb-1">🎯 预计 ${hasPlan.estimatedCompletion.months} 个月完成</div>
                                    <div>📊 共 ${hasPlan.phases.length} 个学习阶段</div>
                                </div>
                            </div>
                        ` : ''}
                        <div class="progress-bar-container">
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" 
                                     style="width: ${progress}%; background-color: ${path.color}"
                                     aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100">
                                </div>
                            </div>
                            <span class="progress-text">${progress}%</span>
                        </div>
                        ${isActive ? `
                            <div class="progress-details">
                                <small>最后学习: ${this.formatDate(this.progress.paths[path.id].lastActivity)}</small>
                            </div>
                        ` : `
                            <button class="btn btn-sm btn-outline-primary start-learning-btn" 
                                    data-path="${path.id}">
                                ${hasPlan ? '开始学习' : '制定学习计划'}
                            </button>
                        `}
                    </div>
                </div>
            `;
        }).join('');
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return '今天';
        if (diffDays === 1) return '昨天';
        if (diffDays < 7) return `${diffDays}天前`;
        return date.toLocaleDateString('zh-CN');
    }

    attachEventListeners() {
        // 监听开始学习按钮
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('start-learning-btn')) {
                const pathId = e.target.dataset.path;
                
                // 检查是否已有学习计划
                const savedPlans = localStorage.getItem('tust-acm-study-plans');
                const plans = savedPlans ? JSON.parse(savedPlans) : {};
                
                if (plans[pathId]) {
                    // 已有计划，开始学习
                    this.startLearningPath(pathId);
                } else {
                    // 没有计划，跳转到学习计划器
                    const plannerSection = document.querySelector('#study-planner-section');
                    if (plannerSection) {
                        plannerSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        // 自动选择对应的学习路径
                        setTimeout(() => {
                            const pathSelect = document.getElementById('plan-path');
                            if (pathSelect) {
                                pathSelect.value = pathId;
                                pathSelect.focus();
                            }
                        }, 500);
                    }
                }
            }

            // 监听主题完成复选框
            if (e.target.classList.contains('topic-checkbox')) {
                const pathId = e.target.dataset.path;
                const topicId = e.target.dataset.topic;
                if (e.target.checked) {
                    this.markTopicComplete(pathId, topicId);
                }
            }
        });
    }

    startLearningPath(pathId) {
        if (!this.progress.paths[pathId]) {
            this.progress.paths[pathId] = {
                completedTopics: [],
                startDate: new Date().toISOString(),
                lastActivity: new Date().toISOString()
            };
            this.saveProgress();
            this.updateStatistics();
            
            // 显示欢迎消息
            alert('🎉 开始新的学习旅程！记得定期标记完成的主题哦。');
        }
    }

    // 导出学习报告
    exportReport() {
        const report = {
            生成时间: new Date().toLocaleString('zh-CN'),
            学习开始日期: new Date(this.progress.startDate).toLocaleDateString('zh-CN'),
            总学习天数: Math.floor((new Date() - new Date(this.progress.startDate)) / (1000 * 60 * 60 * 24)),
            已获成就数: this.progress.achievements.length,
            学习路径进度: {}
        };

        Object.keys(this.progress.paths).forEach(pathId => {
            report.学习路径进度[pathId] = `${this.getPathProgress(pathId)}%`;
        });

        const reportText = JSON.stringify(report, null, 2);
        const blob = new Blob([reportText], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `TUST-ACM学习报告_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
    }
}

// 初始化学习追踪器
document.addEventListener('DOMContentLoaded', () => {
    window.learningTracker = new LearningTracker();
});

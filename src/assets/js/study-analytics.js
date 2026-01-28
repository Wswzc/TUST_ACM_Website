/**
 * TUST-ACM 学习数据分析与可视化
 * Study Analytics and Visualization
 */

class StudyAnalytics {
    constructor() {
        this.charts = {};
        this.init();
    }

    init() {
        // 等待Chart.js加载
        if (typeof Chart !== 'undefined') {
            this.renderAllCharts();
        } else {
            console.warn('Chart.js未加载，请先引入Chart.js库');
        }
    }

    // 渲染所有图表
    renderAllCharts() {
        this.renderProgressPieChart();
        this.renderStudyTimeChart();
        this.renderWeeklyActivityChart();
        this.renderKnowledgeRadarChart();
    }

    // 1. 学习路径完成度饼图
    renderProgressPieChart() {
        const canvas = document.getElementById('progress-pie-chart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        // 获取学习进度数据
        const progressData = this.getProgressData();
        
        this.charts.progressPie = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: progressData.labels,
                datasets: [{
                    data: progressData.values,
                    backgroundColor: [
                        '#5e72e4',
                        '#11cdef',
                        '#2dce89',
                        '#fb6340',
                        '#f5365c',
                        '#8965e0'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    // 2. 学习时间趋势折线图
    renderStudyTimeChart() {
        const canvas = document.getElementById('study-time-chart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const timeData = this.getStudyTimeData();
        
        this.charts.studyTime = new Chart(ctx, {
            type: 'line',
            data: {
                labels: timeData.labels,
                datasets: [{
                    label: '学习时长（小时）',
                    data: timeData.values,
                    borderColor: '#5e72e4',
                    backgroundColor: 'rgba(94, 114, 228, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value + 'h';
                            }
                        }
                    }
                }
            }
        });
    }

    // 3. 每周学习活动柱状图
    renderWeeklyActivityChart() {
        const canvas = document.getElementById('weekly-activity-chart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const weeklyData = this.getWeeklyActivityData();
        
        this.charts.weeklyActivity = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                datasets: [{
                    label: '学习时长',
                    data: weeklyData,
                    backgroundColor: [
                        '#5e72e4',
                        '#11cdef',
                        '#2dce89',
                        '#fb6340',
                        '#f5365c',
                        '#8965e0',
                        '#ffd600'
                    ],
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value + 'h';
                            }
                        }
                    }
                }
            }
        });
    }

    // 4. 知识点掌握雷达图
    renderKnowledgeRadarChart() {
        const canvas = document.getElementById('knowledge-radar-chart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const knowledgeData = this.getKnowledgeData();
        
        this.charts.knowledgeRadar = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: knowledgeData.labels,
                datasets: [{
                    label: '掌握程度',
                    data: knowledgeData.values,
                    backgroundColor: 'rgba(94, 114, 228, 0.2)',
                    borderColor: '#5e72e4',
                    pointBackgroundColor: '#5e72e4',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#5e72e4'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // 获取学习进度数据
    getProgressData() {
        const saved = localStorage.getItem('tust-acm-learning-progress');
        if (!saved) {
            return {
                labels: ['算法竞赛', 'C/C++开发', 'Python开发', '前端开发', '后端开发', 'AI/机器学习'],
                values: [0, 0, 0, 0, 0, 0]
            };
        }

        const progress = JSON.parse(saved);
        const paths = {
            'algorithm': '算法竞赛',
            'cpp': 'C/C++开发',
            'python': 'Python开发',
            'frontend': '前端开发',
            'backend': '后端开发',
            'ai': 'AI/机器学习'
        };

        const labels = [];
        const values = [];

        Object.keys(paths).forEach(pathId => {
            if (progress.paths[pathId]) {
                labels.push(paths[pathId]);
                const completed = progress.paths[pathId].completedTopics.length;
                const total = this.getPathTopicCount(pathId);
                const percentage = Math.round((completed / total) * 100);
                values.push(percentage);
            }
        });

        return { labels, values };
    }

    // 获取学习时间数据（最近7天）- 从打卡记录读取真实数据
    getStudyTimeData() {
        const labels = [];
        const values = [];
        
        // 读取打卡记录
        const checkinData = localStorage.getItem('tust-acm-checkin-records');
        const checkins = checkinData ? JSON.parse(checkinData).checkins : [];
        
        // 读取学习计划获取每周学习时间
        const plansData = localStorage.getItem('tust-acm-study-plans');
        const plans = plansData ? JSON.parse(plansData) : {};
        
        // 计算平均每天学习时间
        let dailyHours = 0;
        const planCount = Object.keys(plans).length;
        if (planCount > 0) {
            let totalWeeklyHours = 0;
            Object.values(plans).forEach(plan => {
                totalWeeklyHours += plan.weeklyHours || 0;
            });
            dailyHours = totalWeeklyHours / planCount / 7;
        }
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            labels.push(`${date.getMonth() + 1}/${date.getDate()}`);
            
            // 如果当天有打卡记录，显示学习时间，否则为0
            if (checkins.includes(dateStr)) {
                values.push(Math.round(dailyHours * 10) / 10 || 2);
            } else {
                values.push(0);
            }
        }
        
        return { labels, values };
    }

    // 获取每周活动数据 - 从打卡记录读取真实数据
    getWeeklyActivityData() {
        const checkinData = localStorage.getItem('tust-acm-checkin-records');
        if (!checkinData) {
            return [0, 0, 0, 0, 0, 0, 0];
        }
        
        const checkins = JSON.parse(checkinData).checkins;
        const weekData = [0, 0, 0, 0, 0, 0, 0]; // 周一到周日
        
        // 读取学习计划获取每天学习时间
        const plansData = localStorage.getItem('tust-acm-study-plans');
        const plans = plansData ? JSON.parse(plansData) : {};
        
        let dailyHours = 2; // 默认值
        const planCount = Object.keys(plans).length;
        if (planCount > 0) {
            let totalWeeklyHours = 0;
            Object.values(plans).forEach(plan => {
                totalWeeklyHours += plan.weeklyHours || 0;
            });
            dailyHours = totalWeeklyHours / planCount / 7;
        }
        
        // 统计最近7天每个星期几的打卡情况
        const today = new Date();
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            const dayOfWeek = date.getDay(); // 0=周日, 1=周一, ...
            const adjustedDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // 转换为0=周一, 6=周日
            
            if (checkins.includes(dateStr)) {
                weekData[adjustedDay] += Math.round(dailyHours * 10) / 10;
            }
        }
        
        return weekData;
    }

    // 获取知识点掌握数据 - 从学习进度读取真实数据
    getKnowledgeData() {
        const progressData = localStorage.getItem('tust-acm-learning-progress');
        if (!progressData) {
            return {
                labels: ['数据结构', '算法', '编程语言', '系统设计', '数据库', '网络'],
                values: [0, 0, 0, 0, 0, 0]
            };
        }
        
        const progress = JSON.parse(progressData);
        
        // 根据学习路径计算知识点掌握度
        const knowledge = {
            '数据结构': 0,
            '算法': 0,
            '编程语言': 0,
            '系统设计': 0,
            '数据库': 0,
            '网络': 0
        };
        
        // 算法竞赛路径贡献：数据结构、算法
        if (progress.paths['algorithm']) {
            const algoProgress = this.getPathProgressValue('algorithm', progress);
            knowledge['数据结构'] += algoProgress * 0.5;
            knowledge['算法'] += algoProgress * 0.5;
        }
        
        // C++/Python路径贡献：编程语言
        if (progress.paths['cpp']) {
            const cppProgress = this.getPathProgressValue('cpp', progress);
            knowledge['编程语言'] += cppProgress * 0.3;
            knowledge['系统设计'] += cppProgress * 0.2;
        }
        
        if (progress.paths['python']) {
            const pyProgress = this.getPathProgressValue('python', progress);
            knowledge['编程语言'] += pyProgress * 0.3;
        }
        
        // 前端路径贡献：编程语言、系统设计
        if (progress.paths['frontend']) {
            const feProgress = this.getPathProgressValue('frontend', progress);
            knowledge['编程语言'] += feProgress * 0.2;
            knowledge['系统设计'] += feProgress * 0.3;
        }
        
        // 后端路径贡献：系统设计、数据库、网络
        if (progress.paths['backend']) {
            const beProgress = this.getPathProgressValue('backend', progress);
            knowledge['系统设计'] += beProgress * 0.3;
            knowledge['数据库'] += beProgress * 0.4;
            knowledge['网络'] += beProgress * 0.3;
        }
        
        // AI路径贡献：算法、编程语言
        if (progress.paths['ai']) {
            const aiProgress = this.getPathProgressValue('ai', progress);
            knowledge['算法'] += aiProgress * 0.3;
            knowledge['编程语言'] += aiProgress * 0.2;
        }
        
        // 归一化到0-100
        const labels = Object.keys(knowledge);
        const values = labels.map(label => Math.min(100, Math.round(knowledge[label])));
        
        return { labels, values };
    }
    
    // 辅助函数：获取路径进度百分比
    getPathProgressValue(pathId, progress) {
        if (!progress.paths[pathId]) return 0;
        const completed = progress.paths[pathId].completedTopics.length;
        const total = this.getPathTopicCount(pathId);
        return Math.round((completed / total) * 100);
    }

    getPathTopicCount(pathId) {
        const counts = {
            'algorithm': 20,
            'cpp': 18,
            'python': 16,
            'frontend': 22,
            'backend': 24,
            'ai': 26
        };
        return counts[pathId] || 20;
    }

    // 销毁所有图表
    destroyAllCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart) chart.destroy();
        });
        this.charts = {};
    }
}

// 初始化分析系统
document.addEventListener('DOMContentLoaded', () => {
    // 等待Chart.js加载后再初始化
    const initAnalytics = () => {
        if (typeof Chart !== 'undefined') {
            window.studyAnalytics = new StudyAnalytics();
        } else {
            setTimeout(initAnalytics, 100);
        }
    };
    initAnalytics();
});

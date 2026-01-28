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

    // 获取学习时间数据（最近7天）
    getStudyTimeData() {
        const labels = [];
        const values = [];
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            labels.push(`${date.getMonth() + 1}/${date.getDate()}`);
            
            // 模拟数据（实际应从LocalStorage读取）
            values.push(Math.floor(Math.random() * 5) + 1);
        }
        
        return { labels, values };
    }

    // 获取每周活动数据
    getWeeklyActivityData() {
        // 模拟数据（实际应从LocalStorage读取）
        return [3, 4, 2, 5, 3, 6, 2];
    }

    // 获取知识点掌握数据
    getKnowledgeData() {
        return {
            labels: ['数据结构', '算法', '编程语言', '系统设计', '数据库', '网络'],
            values: [75, 60, 85, 50, 70, 65]
        };
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

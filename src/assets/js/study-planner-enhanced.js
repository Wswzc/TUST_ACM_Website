/**
 * TUST-ACM 增强版学习计划器
 * Enhanced Study Planner System
 */

class EnhancedStudyPlanner {
    constructor() {
        this.plans = this.loadPlans();
        this.init();
    }

    init() {
        this.renderPlannerForm();
        this.attachEventListeners();
    }

    loadPlans() {
        const saved = localStorage.getItem('tust-acm-enhanced-plans');
        return saved ? JSON.parse(saved) : {};
    }

    savePlans() {
        localStorage.setItem('tust-acm-enhanced-plans', JSON.stringify(this.plans));
    }

    // 渲染增强版计划表单
    renderPlannerForm() {
        const formHTML = `
            <div class="enhanced-planner-form">
                <div class="form-step active" data-step="1">
                    <h4 class="step-title">
                        <span class="step-number">1</span>
                        选择学习路径
                    </h4>
                    <div class="path-selection">
                        <div class="path-option" data-path="algorithm">
                            <div class="path-icon">🧠</div>
                            <h5>算法竞赛</h5>
                            <p>难度：中高 | 6-12个月</p>
                        </div>
                        <div class="path-option" data-path="cpp">
                            <div class="path-icon">⚙️</div>
                            <h5>C/C++开发</h5>
                            <p>难度：中等 | 4-8个月</p>
                        </div>
                        <div class="path-option" data-path="python">
                            <div class="path-icon">🐍</div>
                            <h5>Python开发</h5>
                            <p>难度：入门 | 3-6个月</p>
                        </div>
                        <div class="path-option" data-path="frontend">
                            <div class="path-icon">🎨</div>
                            <h5>前端开发</h5>
                            <p>难度：中等 | 5-10个月</p>
                        </div>
                        <div class="path-option" data-path="backend">
                            <div class="path-icon">🔧</div>
                            <h5>后端开发</h5>
                            <p>难度：中高 | 6-12个月</p>
                        </div>
                        <div class="path-option" data-path="ai">
                            <div class="path-icon">🤖</div>
                            <h5>AI/机器学习</h5>
                            <p>难度：高级 | 8-15个月</p>
                        </div>
                    </div>
                </div>

                <div class="form-step" data-step="2">
                    <h4 class="step-title">
                        <span class="step-number">2</span>
                        评估你的水平
                    </h4>
                    <div class="level-selection">
                        <label class="level-option">
                            <input type="radio" name="level" value="beginner">
                            <div class="level-card">
                                <h5>👶 零基础</h5>
                                <p>完全没有编程经验</p>
                            </div>
                        </label>
                        <label class="level-option">
                            <input type="radio" name="level" value="basic" checked>
                            <div class="level-card">
                                <h5>🌱 初学者</h5>
                                <p>有一定编程基础</p>
                            </div>
                        </label>
                        <label class="level-option">
                            <input type="radio" name="level" value="intermediate">
                            <div class="level-card">
                                <h5>🚀 进阶者</h5>
                                <p>掌握基础知识</p>
                            </div>
                        </label>
                        <label class="level-option">
                            <input type="radio" name="level" value="advanced">
                            <div class="level-card">
                                <h5>⭐ 高级</h5>
                                <p>有丰富经验</p>
                            </div>
                        </label>
                    </div>
                </div>

                <div class="form-step" data-step="3">
                    <h4 class="step-title">
                        <span class="step-number">3</span>
                        设定学习目标
                    </h4>
                    <div class="goal-selection">
                        <label class="goal-option">
                            <input type="radio" name="goal" value="competition">
                            <div class="goal-card">
                                <div class="goal-icon">🏆</div>
                                <h5>算法竞赛</h5>
                                <p>参加比赛，提升Rating</p>
                            </div>
                        </label>
                        <label class="goal-option">
                            <input type="radio" name="goal" value="job">
                            <div class="goal-card">
                                <div class="goal-icon">💼</div>
                                <h5>求职就业</h5>
                                <p>准备面试，找到工作</p>
                            </div>
                        </label>
                        <label class="goal-option">
                            <input type="radio" name="goal" value="interest" checked>
                            <div class="goal-card">
                                <div class="goal-icon">❤️</div>
                                <h5>兴趣学习</h5>
                                <p>提升技能，持续学习</p>
                            </div>
                        </label>
                        <label class="goal-option">
                            <input type="radio" name="goal" value="upgrade">
                            <div class="goal-card">
                                <div class="goal-icon">📈</div>
                                <h5>技能提升</h5>
                                <p>深入学习，架构设计</p>
                            </div>
                        </label>
                    </div>
                </div>

                <div class="form-step" data-step="4">
                    <h4 class="step-title">
                        <span class="step-number">4</span>
                        安排学习时间
                    </h4>
                    <div class="time-settings">
                        <div class="form-group">
                            <label>每周学习时间（小时）</label>
                            <div class="time-slider-container">
                                <input type="range" id="weekly-hours-slider" min="5" max="40" value="15" step="1">
                                <div class="time-display">
                                    <span id="weekly-hours-value">15</span> 小时/周
                                </div>
                            </div>
                            <div class="time-suggestions">
                                <button class="time-preset" data-hours="10">轻松学习 (10h)</button>
                                <button class="time-preset" data-hours="15">标准学习 (15h)</button>
                                <button class="time-preset" data-hours="20">密集学习 (20h)</button>
                                <button class="time-preset" data-hours="30">全力冲刺 (30h)</button>
                            </div>
                        </div>

                        <div class="form-group">
                            <label>选择学习日（可多选）</label>
                            <div class="day-selection">
                                <label class="day-option">
                                    <input type="checkbox" name="days" value="1" checked>
                                    <span>周一</span>
                                </label>
                                <label class="day-option">
                                    <input type="checkbox" name="days" value="2" checked>
                                    <span>周二</span>
                                </label>
                                <label class="day-option">
                                    <input type="checkbox" name="days" value="3" checked>
                                    <span>周三</span>
                                </label>
                                <label class="day-option">
                                    <input type="checkbox" name="days" value="4" checked>
                                    <span>周四</span>
                                </label>
                                <label class="day-option">
                                    <input type="checkbox" name="days" value="5" checked>
                                    <span>周五</span>
                                </label>
                                <label class="day-option">
                                    <input type="checkbox" name="days" value="6">
                                    <span>周六</span>
                                </label>
                                <label class="day-option">
                                    <input type="checkbox" name="days" value="0">
                                    <span>周日</span>
                                </label>
                            </div>
                        </div>

                        <div class="form-group">
                            <label>目标完成日期（可选）</label>
                            <input type="date" id="target-date" class="form-control">
                        </div>
                    </div>
                </div>

                <div class="form-navigation">
                    <button class="btn btn-outline-primary" id="prev-step" style="display: none;">
                        <i class="fas fa-arrow-left"></i> 上一步
                    </button>
                    <button class="btn btn-primary" id="next-step">
                        下一步 <i class="fas fa-arrow-right"></i>
                    </button>
                    <button class="btn btn-success" id="generate-plan" style="display: none;">
                        <i class="fas fa-magic"></i> 生成学习计划
                    </button>
                </div>

                <div class="form-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 25%"></div>
                    </div>
                    <div class="progress-text">第 1 步，共 4 步</div>
                </div>
            </div>

            <div id="plan-result-enhanced" style="display: none;">
                <!-- 计划结果将显示在这里 -->
            </div>
        `;

        const container = document.getElementById('enhanced-planner-container');
        if (container) {
            container.innerHTML = formHTML;
        }
    }

    attachEventListeners() {
        let currentStep = 1;
        let selectedPath = null;

        // 路径选择
        document.querySelectorAll('.path-option').forEach(option => {
            option.addEventListener('click', function() {
                document.querySelectorAll('.path-option').forEach(o => o.classList.remove('selected'));
                this.classList.add('selected');
                selectedPath = this.dataset.path;
            });
        });

        // 时间滑块
        const slider = document.getElementById('weekly-hours-slider');
        const valueDisplay = document.getElementById('weekly-hours-value');
        if (slider && valueDisplay) {
            slider.addEventListener('input', function() {
                valueDisplay.textContent = this.value;
            });
        }

        // 时间预设
        document.querySelectorAll('.time-preset').forEach(btn => {
            btn.addEventListener('click', function() {
                const hours = this.dataset.hours;
                if (slider) slider.value = hours;
                if (valueDisplay) valueDisplay.textContent = hours;
            });
        });

        // 下一步
        document.getElementById('next-step')?.addEventListener('click', () => {
            if (currentStep === 1 && !selectedPath) {
                alert('请选择一个学习路径');
                return;
            }

            if (currentStep < 4) {
                currentStep++;
                this.showStep(currentStep);
            }
        });

        // 上一步
        document.getElementById('prev-step')?.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                this.showStep(currentStep);
            }
        });

        // 生成计划
        document.getElementById('generate-plan')?.addEventListener('click', () => {
            this.generateEnhancedPlan(selectedPath);
        });
    }

    showStep(step) {
        // 隐藏所有步骤
        document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
        
        // 显示当前步骤
        const currentStepEl = document.querySelector(`.form-step[data-step="${step}"]`);
        if (currentStepEl) {
            currentStepEl.classList.add('active');
        }

        // 更新按钮
        const prevBtn = document.getElementById('prev-step');
        const nextBtn = document.getElementById('next-step');
        const generateBtn = document.getElementById('generate-plan');

        if (prevBtn) prevBtn.style.display = step > 1 ? 'inline-block' : 'none';
        if (nextBtn) nextBtn.style.display = step < 4 ? 'inline-block' : 'none';
        if (generateBtn) generateBtn.style.display = step === 4 ? 'inline-block' : 'none';

        // 更新进度条
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        if (progressFill) progressFill.style.width = `${(step / 4) * 100}%`;
        if (progressText) progressText.textContent = `第 ${step} 步，共 4 步`;
    }

    generateEnhancedPlan(pathId) {
        if (!pathId) {
            alert('请选择学习路径');
            return;
        }

        // 收集表单数据
        const level = document.querySelector('input[name="level"]:checked')?.value || 'basic';
        const goal = document.querySelector('input[name="goal"]:checked')?.value || 'interest';
        const weeklyHours = parseInt(document.getElementById('weekly-hours-slider')?.value || 15);
        const targetDate = document.getElementById('target-date')?.value;
        const selectedDays = Array.from(document.querySelectorAll('input[name="days"]:checked')).map(cb => cb.value);

        // 生成计划
        const plan = this.createDetailedPlan({
            pathId,
            level,
            goal,
            weeklyHours,
            targetDate,
            selectedDays
        });

        // 显示结果
        this.displayPlanResult(plan);
    }

    createDetailedPlan(options) {
        const { pathId, level, goal, weeklyHours, targetDate, selectedDays } = options;

        // 计算学习周期
        const baseDuration = this.getBaseDuration(pathId);
        const levelMultiplier = this.getLevelMultiplier(level);
        const adjustedMonths = Math.ceil(baseDuration * levelMultiplier);

        // 计算完成日期
        const completionDate = new Date();
        completionDate.setMonth(completionDate.getMonth() + adjustedMonths);

        // 生成详细计划
        const plan = {
            pathId,
            pathName: this.getPathName(pathId),
            level,
            goal,
            weeklyHours,
            targetDate,
            selectedDays,
            createdAt: new Date().toISOString(),
            estimatedMonths: adjustedMonths,
            estimatedCompletion: completionDate.toLocaleDateString('zh-CN'),
            totalHours: adjustedMonths * 4 * weeklyHours,
            dailySchedule: this.generateDailySchedule(weeklyHours, selectedDays.length),
            weeklyPlan: this.generateWeeklyPlan(pathId, weeklyHours),
            monthlyGoals: this.generateMonthlyGoals(pathId, adjustedMonths),
            checkpoints: this.generateCheckpoints(pathId, adjustedMonths),
            resources: this.getPathResources(pathId),
            tips: this.getPersonalizedTips(pathId, level, goal)
        };

        // 保存计划
        this.plans[pathId] = plan;
        this.savePlans();

        return plan;
    }

    getBaseDuration(pathId) {
        const durations = {
            algorithm: 9,
            cpp: 6,
            python: 4.5,
            frontend: 7.5,
            backend: 9,
            ai: 11.5
        };
        return durations[pathId] || 6;
    }

    getLevelMultiplier(level) {
        const multipliers = {
            beginner: 1.5,
            basic: 1.2,
            intermediate: 1.0,
            advanced: 0.8
        };
        return multipliers[level] || 1.0;
    }

    getPathName(pathId) {
        const names = {
            algorithm: '算法竞赛',
            cpp: 'C/C++开发',
            python: 'Python开发',
            frontend: '前端开发',
            backend: '后端开发',
            ai: 'AI/机器学习'
        };
        return names[pathId] || pathId;
    }

    generateDailySchedule(weeklyHours, daysPerWeek) {
        const hoursPerDay = weeklyHours / daysPerWeek;
        
        if (hoursPerDay <= 1.5) {
            return [
                { time: '理论学习', hours: hoursPerDay * 0.6, icon: '📚' },
                { time: '编程实践', hours: hoursPerDay * 0.4, icon: '💻' }
            ];
        } else if (hoursPerDay <= 3) {
            return [
                { time: '理论学习', hours: hoursPerDay * 0.4, icon: '📚' },
                { time: '编程实践', hours: hoursPerDay * 0.5, icon: '💻' },
                { time: '复习总结', hours: hoursPerDay * 0.1, icon: '📝' }
            ];
        } else {
            return [
                { time: '理论学习', hours: hoursPerDay * 0.3, icon: '📚' },
                { time: '编程实践', hours: hoursPerDay * 0.4, icon: '💻' },
                { time: '项目开发', hours: hoursPerDay * 0.2, icon: '🚀' },
                { time: '复习总结', hours: hoursPerDay * 0.1, icon: '📝' }
            ];
        }
    }

    generateWeeklyPlan(pathId, weeklyHours) {
        return {
            theory: Math.round(weeklyHours * 0.3 * 10) / 10,
            practice: Math.round(weeklyHours * 0.5 * 10) / 10,
            review: Math.round(weeklyHours * 0.2 * 10) / 10
        };
    }

    generateMonthlyGoals(pathId, totalMonths) {
        const goals = [];
        const monthsPerPhase = Math.ceil(totalMonths / 4);
        
        for (let i = 0; i < 4; i++) {
            const month = (i + 1) * monthsPerPhase;
            goals.push({
                month: month,
                phase: ['基础阶段', '进阶阶段', '提高阶段', '冲刺阶段'][i],
                goal: this.getPhaseGoal(pathId, i)
            });
        }
        
        return goals;
    }

    getPhaseGoal(pathId, phase) {
        const goals = {
            algorithm: [
                '掌握基础数据结构和算法',
                '完成100道中等难度题目',
                '参加5场以上比赛',
                '达到目标Rating'
            ],
            cpp: [
                '掌握C++基础语法和STL',
                '理解OOP和模板编程',
                '完成第一个实战项目',
                '掌握高级特性和最佳实践'
            ],
            python: [
                '掌握Python基础语法',
                '完成数据处理项目',
                '开发Web应用',
                '完成综合项目'
            ],
            frontend: [
                '掌握HTML/CSS/JavaScript',
                '学会一个前端框架',
                '完成完整Web应用',
                '掌握前端工程化'
            ],
            backend: [
                '掌握后端语言和框架',
                '开发RESTful API',
                '数据库设计和优化',
                '微服务架构实践'
            ],
            ai: [
                '掌握数学基础和经典算法',
                '实现深度学习模型',
                '完成专业方向项目',
                '构建完整AI系统'
            ]
        };
        
        return goals[pathId]?.[phase] || '完成阶段目标';
    }

    generateCheckpoints(pathId, totalMonths) {
        const checkpointsPerMonth = 2;
        const totalCheckpoints = Math.min(totalMonths * checkpointsPerMonth, 20);
        const checkpoints = [];
        
        for (let i = 1; i <= totalCheckpoints; i++) {
            const week = Math.ceil((i / totalCheckpoints) * totalMonths * 4);
            checkpoints.push({
                week: week,
                task: `第${i}个检查点`,
                description: this.getCheckpointDescription(pathId, i, totalCheckpoints)
            });
        }
        
        return checkpoints;
    }

    getCheckpointDescription(pathId, checkpoint, total) {
        const progress = checkpoint / total;
        
        if (progress <= 0.25) {
            return '基础知识学习和练习';
        } else if (progress <= 0.5) {
            return '进阶内容和项目实践';
        } else if (progress <= 0.75) {
            return '高级主题和综合应用';
        } else {
            return '冲刺目标和总结提升';
        }
    }

    getPathResources(pathId) {
        // 这里可以集成 resource-recommender.js 的数据
        return {
            books: ['推荐书籍1', '推荐书籍2'],
            platforms: ['学习平台1', '学习平台2'],
            tools: ['开发工具1', '开发工具2']
        };
    }

    getPersonalizedTips(pathId, level, goal) {
        const tips = {
            algorithm: {
                beginner: [
                    '从简单题开始，循序渐进',
                    '每天坚持做题，保持手感',
                    '看题解要理解思路，不要死记硬背',
                    '建立错题本，定期复习',
                    '参加周赛，积累比赛经验'
                ],
                advanced: [
                    '专注困难题和新题型',
                    '研究优秀代码，学习技巧',
                    '参加高质量比赛',
                    '总结算法模板',
                    '关注竞赛动态'
                ]
            }
        };
        
        const levelKey = level === 'beginner' || level === 'basic' ? 'beginner' : 'advanced';
        return tips[pathId]?.[levelKey] || [
            '制定合理的学习计划',
            '保持学习的连续性',
            '理论与实践相结合',
            '及时总结和复习',
            '保持学习热情'
        ];
    }

    displayPlanResult(plan) {
        const resultHTML = `
            <div class="plan-result-card">
                <div class="result-header">
                    <h3>🎉 你的专属学习计划已生成！</h3>
                    <p>根据你的情况，我们为你定制了以下学习计划</p>
                </div>

                <div class="result-summary">
                    <div class="summary-item">
                        <div class="summary-icon">📚</div>
                        <div class="summary-content">
                            <h5>${plan.pathName}</h5>
                            <p>学习路径</p>
                        </div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-icon">⏱️</div>
                        <div class="summary-content">
                            <h5>${plan.weeklyHours} 小时/周</h5>
                            <p>学习时间</p>
                        </div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-icon">📅</div>
                        <div class="summary-content">
                            <h5>${plan.estimatedMonths} 个月</h5>
                            <p>预计周期</p>
                        </div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-icon">🎯</div>
                        <div class="summary-content">
                            <h5>${plan.estimatedCompletion}</h5>
                            <p>预计完成</p>
                        </div>
                    </div>
                </div>

                <div class="result-details">
                    <div class="detail-section">
                        <h4>📊 每日学习安排</h4>
                        <div class="daily-schedule">
                            ${plan.dailySchedule.map(item => `
                                <div class="schedule-item">
                                    <span class="schedule-icon">${item.icon}</span>
                                    <span class="schedule-name">${item.time}</span>
                                    <span class="schedule-hours">${item.hours.toFixed(1)}小时</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="detail-section">
                        <h4>🎯 月度目标</h4>
                        <div class="monthly-goals">
                            ${plan.monthlyGoals.map(goal => `
                                <div class="goal-item">
                                    <div class="goal-month">第${goal.month}月</div>
                                    <div class="goal-content">
                                        <h5>${goal.phase}</h5>
                                        <p>${goal.goal}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="detail-section">
                        <h4>💡 学习建议</h4>
                        <ul class="tips-list">
                            ${plan.tips.map(tip => `<li>${tip}</li>`).join('')}
                        </ul>
                    </div>
                </div>

                <div class="result-actions">
                    <button class="btn btn-primary" onclick="enhancedPlanner.downloadPlan()">
                        <i class="fas fa-download"></i> 下载学习计划
                    </button>
                    <button class="btn btn-outline-primary" onclick="enhancedPlanner.printPlan()">
                        <i class="fas fa-print"></i> 打印计划
                    </button>
                    <button class="btn btn-outline-secondary" onclick="location.reload()">
                        <i class="fas fa-redo"></i> 重新制定
                    </button>
                </div>
            </div>
        `;

        const resultContainer = document.getElementById('plan-result-enhanced');
        if (resultContainer) {
            resultContainer.innerHTML = resultHTML;
            resultContainer.style.display = 'block';
            
            // 隐藏表单
            document.querySelector('.enhanced-planner-form').style.display = 'none';
            
            // 滚动到结果
            resultContainer.scrollIntoView({ behavior: 'smooth' });
        }
    }

    downloadPlan() {
        const plan = Object.values(this.plans)[0];
        if (!plan) return;

        const content = JSON.stringify(plan, null, 2);
        const blob = new Blob([content], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `学习计划_${plan.pathName}_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    printPlan() {
        window.print();
    }
}

// 初始化增强版学习计划器
document.addEventListener('DOMContentLoaded', () => {
    window.enhancedPlanner = new EnhancedStudyPlanner();
});

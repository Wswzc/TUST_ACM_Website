/**
 * TUST-ACM 学习计划器 - 增强版
 * Enhanced Study Planner System
 */

class StudyPlanner {
    constructor() {
        this.plans = this.loadPlans();
        this.pathDurations = {
            'algorithm': { min: 6, max: 12, unit: '月', difficulty: '中高' },
            'cpp': { min: 4, max: 8, unit: '月', difficulty: '中等' },
            'python': { min: 3, max: 6, unit: '月', difficulty: '入门' },
            'frontend': { min: 5, max: 10, unit: '月', difficulty: '中等' },
            'backend': { min: 6, max: 12, unit: '月', difficulty: '中高' },
            'ai': { min: 8, max: 15, unit: '月', difficulty: '高级' }
        };
        
        // 学习水平定义
        this.learningLevels = {
            beginner: { name: '零基础', multiplier: 1.5, description: '完全没有编程经验' },
            basic: { name: '初学者', multiplier: 1.2, description: '有一定编程基础' },
            intermediate: { name: '进阶者', multiplier: 1.0, description: '掌握基础知识' },
            advanced: { name: '高级', multiplier: 0.8, description: '有丰富经验' }
        };
        
        // 学习目标定义
        this.learningGoals = {
            competition: { name: '算法竞赛', focus: ['算法', '数据结构', '竞赛技巧'] },
            job: { name: '求职就业', focus: ['项目经验', '面试准备', '技术栈'] },
            interest: { name: '兴趣学习', focus: ['基础知识', '实践项目', '持续学习'] },
            upgrade: { name: '技能提升', focus: ['深入理解', '最佳实践', '架构设计'] }
        };
    }

    loadPlans() {
        const saved = localStorage.getItem('tust-acm-study-plans');
        return saved ? JSON.parse(saved) : {};
    }

    savePlans() {
        localStorage.setItem('tust-acm-study-plans', JSON.stringify(this.plans));
    }

    // 创建增强版学习计划
    createPlan(options) {
        const {
            pathId,
            weeklyHours,
            targetDate,
            level = 'intermediate',
            goal = 'interest',
            hasFoundation = false,
            preferredDays = []
        } = options;

        const duration = this.pathDurations[pathId];
        if (!duration) return null;

        // 获取路径名称
        const pathNames = {
            'algorithm': '算法竞赛',
            'cpp': 'C/C++开发',
            'python': 'Python开发',
            'frontend': '前端开发',
            'backend': '后端开发',
            'ai': 'AI/机器学习'
        };

        const plan = {
            pathId: pathId,
            pathName: pathNames[pathId] || pathId,
            weeklyHours: weeklyHours,
            targetDate: targetDate,
            level: level,
            goal: goal,
            hasFoundation: hasFoundation,
            preferredDays: preferredDays,
            createdAt: new Date().toISOString(),
            phases: this.generatePhases(pathId, weeklyHours, level, goal),
            milestones: this.generateMilestones(pathId, goal),
            estimatedCompletion: this.calculateCompletion(pathId, weeklyHours, level),
            weeklySchedule: this.generateWeeklySchedule(weeklyHours, preferredDays),
            resources: this.getRecommendedResources(pathId, level),
            checkpoints: this.generateCheckpoints(pathId),
            tips: this.getPersonalizedTips(pathId, level, goal)
        };

        this.plans[pathId] = plan;
        this.savePlans();
        return plan;
    }

    // 生成每周学习安排
    generateWeeklySchedule(weeklyHours, preferredDays) {
        const daysPerWeek = preferredDays.length > 0 ? preferredDays.length : 5;
        const hoursPerDay = Math.ceil(weeklyHours / daysPerWeek * 10) / 10;
        
        const schedule = {
            totalHours: weeklyHours,
            daysPerWeek: daysPerWeek,
            hoursPerDay: hoursPerDay,
            breakdown: {
                theory: Math.round(weeklyHours * 0.3 * 10) / 10,
                practice: Math.round(weeklyHours * 0.5 * 10) / 10,
                review: Math.round(weeklyHours * 0.2 * 10) / 10
            },
            dailyPlan: this.generateDailyPlan(hoursPerDay)
        };
        
        return schedule;
    }

    // 生成每日学习计划
    generateDailyPlan(hoursPerDay) {
        if (hoursPerDay <= 1) {
            return [
                { activity: '学习新知识', duration: hoursPerDay * 0.6, icon: '📚' },
                { activity: '练习巩固', duration: hoursPerDay * 0.4, icon: '💻' }
            ];
        } else if (hoursPerDay <= 2) {
            return [
                { activity: '理论学习', duration: hoursPerDay * 0.4, icon: '📚' },
                { activity: '编程实践', duration: hoursPerDay * 0.5, icon: '💻' },
                { activity: '复习总结', duration: hoursPerDay * 0.1, icon: '📝' }
            ];
        } else {
            return [
                { activity: '理论学习', duration: hoursPerDay * 0.3, icon: '📚' },
                { activity: '编程实践', duration: hoursPerDay * 0.4, icon: '💻' },
                { activity: '项目开发', duration: hoursPerDay * 0.2, icon: '🚀' },
                { activity: '复习总结', duration: hoursPerDay * 0.1, icon: '📝' }
            ];
        }
    }

    // 生成学习检查点
    generateCheckpoints(pathId) {
        const checkpoints = {
            algorithm: [
                { week: 2, task: '完成50道基础题', test: '基础算法测试' },
                { week: 6, task: '掌握基础数据结构', test: '数据结构测试' },
                { week: 12, task: '完成100道中等题', test: '算法进阶测试' },
                { week: 20, task: '参加5场比赛', test: '竞赛模拟' },
                { week: 24, task: '达到目标Rating', test: '综合评估' }
            ],
            cpp: [
                { week: 2, task: '掌握C++基础语法', test: '语法测试' },
                { week: 4, task: '理解OOP概念', test: 'OOP项目' },
                { week: 8, task: '熟练使用STL', test: 'STL应用' },
                { week: 12, task: '完成第一个项目', test: '项目评审' },
                { week: 16, task: '掌握高级特性', test: '综合项目' }
            ],
            python: [
                { week: 1, task: '掌握Python基础', test: '基础测试' },
                { week: 3, task: '完成数据处理项目', test: '数据分析' },
                { week: 6, task: '开发Web应用', test: 'Web项目' },
                { week: 10, task: '完成综合项目', test: '项目答辩' }
            ],
            frontend: [
                { week: 2, task: '掌握HTML/CSS', test: '静态页面' },
                { week: 6, task: '熟练JavaScript', test: 'JS项目' },
                { week: 12, task: '学会一个框架', test: '框架项目' },
                { week: 18, task: '完成完整应用', test: '全栈项目' },
                { week: 24, task: '掌握工程化', test: '生产部署' }
            ],
            backend: [
                { week: 4, task: '掌握后端语言', test: '语言测试' },
                { week: 8, task: '开发RESTful API', test: 'API项目' },
                { week: 14, task: '数据库设计', test: '数据库项目' },
                { week: 20, task: '微服务架构', test: '架构设计' },
                { week: 26, task: '完整系统', test: '系统上线' }
            ],
            ai: [
                { week: 4, task: '掌握数学基础', test: '数学测试' },
                { week: 10, task: '实现经典算法', test: '算法实现' },
                { week: 18, task: '深度学习项目', test: 'DL项目' },
                { week: 28, task: '专业方向项目', test: '专业项目' },
                { week: 36, task: '完整AI系统', test: '系统评估' }
            ]
        };
        
        return checkpoints[pathId] || [];
    }

    // 获取个性化建议
    getPersonalizedTips(pathId, level, goal) {
        const tips = {
            algorithm: {
                beginner: [
                    '从简单题开始，不要急于求成',
                    '每天至少做2-3道题保持手感',
                    '遇到不会的题要看题解，理解思路',
                    '建立错题本，定期复习',
                    '参加周赛，积累比赛经验'
                ],
                advanced: [
                    '专注于困难题和新题型',
                    '研究优秀代码，学习技巧',
                    '参加高质量比赛，提升Rating',
                    '总结算法模板，提高效率',
                    '关注算法竞赛动态'
                ]
            },
            cpp: {
                beginner: [
                    '先掌握C语言基础',
                    '理解指针和内存管理',
                    '多写代码，培养编程思维',
                    '学习调试技巧',
                    '阅读优秀代码'
                ],
                advanced: [
                    '深入学习C++11/14/17新特性',
                    '研究STL源码实现',
                    '学习设计模式',
                    '参与开源项目',
                    '关注性能优化'
                ]
            },
            python: {
                beginner: [
                    'Python语法简单，快速上手',
                    '多做小项目练习',
                    '学习常用库的使用',
                    '注重代码规范',
                    '加入Python社区'
                ],
                advanced: [
                    '深入理解Python机制',
                    '学习高级特性',
                    '优化代码性能',
                    '开发实用工具',
                    '贡献开源项目'
                ]
            },
            frontend: {
                beginner: [
                    '先学好HTML/CSS基础',
                    'JavaScript是重点',
                    '多做页面练习',
                    '学习响应式设计',
                    '关注用户体验'
                ],
                advanced: [
                    '深入学习框架原理',
                    '掌握工程化工具',
                    '学习性能优化',
                    '了解前沿技术',
                    '参与开源项目'
                ]
            },
            backend: {
                beginner: [
                    '选择一门语言深入学习',
                    '理解HTTP协议',
                    '学习数据库基础',
                    '多写API接口',
                    '学习Linux基础'
                ],
                advanced: [
                    '学习系统架构设计',
                    '掌握微服务架构',
                    '深入数据库优化',
                    '学习分布式系统',
                    '关注高并发处理'
                ]
            },
            ai: {
                beginner: [
                    '先打好数学基础',
                    '从经典算法学起',
                    '多做Kaggle练习',
                    '理解算法原理',
                    '学习常用框架'
                ],
                advanced: [
                    '阅读最新论文',
                    '复现经典模型',
                    '参加AI竞赛',
                    '关注前沿技术',
                    '做实际项目'
                ]
            }
        };
        
        const levelKey = level === 'beginner' || level === 'basic' ? 'beginner' : 'advanced';
        return tips[pathId]?.[levelKey] || [];
    }

    // 获取推荐资源
    getRecommendedResources(pathId, level) {
        // 这里可以从 resource-recommender.js 中获取
        return {
            books: [],
            platforms: [],
            tools: [],
            courses: []
        };
    }

    // 生成学习阶段
    generatePhases(pathId, weeklyHours) {
        const phaseTemplates = {
            algorithm: [
                {
                    name: '基础阶段',
                    duration: '4-6周',
                    topics: ['C/C++语法', '基础数据结构', '简单算法'],
                    weeklyTasks: ['完成20道基础题', '学习1个新数据结构', '复习已学内容']
                },
                {
                    name: '进阶阶段',
                    duration: '8-12周',
                    topics: ['高级数据结构', '图论', '动态规划'],
                    weeklyTasks: ['完成15道中等题', '参加1场在线比赛', '总结解题技巧']
                },
                {
                    name: '提高阶段',
                    duration: '8-12周',
                    topics: ['高级算法', '数学知识', '优化技巧'],
                    weeklyTasks: ['完成10道困难题', '参加2场比赛', '学习优秀代码']
                },
                {
                    name: '冲刺阶段',
                    duration: '4-8周',
                    topics: ['综合训练', '比赛策略', '心理调节'],
                    weeklyTasks: ['模拟比赛', '弱项强化', '保持状态']
                }
            ],
            cpp: [
                {
                    name: '语法基础',
                    duration: '3-4周',
                    topics: ['C++基础语法', '面向对象', 'STL容器'],
                    weeklyTasks: ['学习语法特性', '编写小程序', '阅读标准库文档']
                },
                {
                    name: '进阶特性',
                    duration: '4-6周',
                    topics: ['模板编程', '智能指针', '多线程'],
                    weeklyTasks: ['实现模板类', '练习并发编程', '代码review']
                },
                {
                    name: '项目实战',
                    duration: '6-8周',
                    topics: ['网络编程', '数据库操作', '项目架构'],
                    weeklyTasks: ['开发实际项目', '学习设计模式', '性能优化']
                },
                {
                    name: '深入提高',
                    duration: '4-6周',
                    topics: ['源码阅读', '性能优化', '最佳实践'],
                    weeklyTasks: ['阅读开源项目', '优化代码', '总结经验']
                }
            ],
            python: [
                {
                    name: 'Python基础',
                    duration: '2-3周',
                    topics: ['基础语法', '数据类型', '函数模块'],
                    weeklyTasks: ['完成基础练习', '编写小脚本', '学习标准库']
                },
                {
                    name: '进阶应用',
                    duration: '4-6周',
                    topics: ['面向对象', '文件操作', '异常处理'],
                    weeklyTasks: ['开发工具脚本', '数据处理', '学习第三方库']
                },
                {
                    name: '专业方向',
                    duration: '6-8周',
                    topics: ['Web开发/数据分析', '爬虫技术', '数据可视化'],
                    weeklyTasks: ['项目开发', '实战练习', '技术总结']
                },
                {
                    name: '项目实战',
                    duration: '3-4周',
                    topics: ['完整项目', '部署上线', '性能优化'],
                    weeklyTasks: ['项目开发', '测试部署', '文档编写']
                }
            ],
            frontend: [
                {
                    name: 'HTML/CSS基础',
                    duration: '3-4周',
                    topics: ['HTML5', 'CSS3', '响应式设计'],
                    weeklyTasks: ['制作静态页面', '学习布局技巧', '练习动画效果']
                },
                {
                    name: 'JavaScript核心',
                    duration: '6-8周',
                    topics: ['ES6+语法', 'DOM操作', '异步编程'],
                    weeklyTasks: ['完成JS练习', '开发交互功能', '学习设计模式']
                },
                {
                    name: '框架学习',
                    duration: '8-12周',
                    topics: ['Vue/React', '组件化', '状态管理'],
                    weeklyTasks: ['学习框架特性', '开发组件', '项目实战']
                },
                {
                    name: '工程化实践',
                    duration: '6-8周',
                    topics: ['构建工具', '性能优化', '工程规范'],
                    weeklyTasks: ['配置工程化', '优化项目', '学习最佳实践']
                }
            ],
            backend: [
                {
                    name: '语言基础',
                    duration: '4-6周',
                    topics: ['Java/Go/Python', '数据结构', '算法基础'],
                    weeklyTasks: ['学习语言特性', '练习编程', '阅读文档']
                },
                {
                    name: '框架学习',
                    duration: '6-8周',
                    topics: ['Spring/Gin/Django', 'ORM', 'RESTful API'],
                    weeklyTasks: ['学习框架', '开发API', '数据库操作']
                },
                {
                    name: '中间件与工具',
                    duration: '6-8周',
                    topics: ['Redis', 'MQ', 'Docker'],
                    weeklyTasks: ['学习中间件', '实践应用', '系统设计']
                },
                {
                    name: '架构与优化',
                    duration: '6-8周',
                    topics: ['微服务', '性能优化', '高可用'],
                    weeklyTasks: ['架构设计', '性能调优', '项目实战']
                }
            ],
            ai: [
                {
                    name: '数学基础',
                    duration: '4-6周',
                    topics: ['线性代数', '概率统计', '微积分'],
                    weeklyTasks: ['学习数学知识', '完成习题', '理解原理']
                },
                {
                    name: '机器学习基础',
                    duration: '6-8周',
                    topics: ['监督学习', '无监督学习', '特征工程'],
                    weeklyTasks: ['学习算法', '实现算法', 'Kaggle练习']
                },
                {
                    name: '深度学习',
                    duration: '8-12周',
                    topics: ['神经网络', 'CNN', 'RNN/Transformer'],
                    weeklyTasks: ['学习框架', '复现论文', '项目实战']
                },
                {
                    name: '专业方向',
                    duration: '8-12周',
                    topics: ['NLP/CV', '模型优化', '工程部署'],
                    weeklyTasks: ['深入方向', '项目开发', '论文阅读']
                }
            ]
        };

        return phaseTemplates[pathId] || [];
    }

    // 生成里程碑
    generateMilestones(pathId) {
        const milestoneTemplates = {
            algorithm: [
                { progress: 25, title: '掌握基础数据结构', reward: '🌟 基础扎实' },
                { progress: 50, title: '完成100道算法题', reward: '🏆 刷题达人' },
                { progress: 75, title: '参加5场比赛', reward: '🚀 竞赛选手' },
                { progress: 100, title: '达到蓝名/专家', reward: '👑 算法大师' }
            ],
            cpp: [
                { progress: 25, title: '掌握C++基础语法', reward: '🌟 入门成功' },
                { progress: 50, title: '完成第一个项目', reward: '🏆 项目实战' },
                { progress: 75, title: '理解高级特性', reward: '🚀 进阶开发者' },
                { progress: 100, title: '独立开发完整应用', reward: '👑 C++专家' }
            ],
            python: [
                { progress: 25, title: '掌握Python基础', reward: '🌟 Python入门' },
                { progress: 50, title: '开发实用工具', reward: '🏆 工具开发者' },
                { progress: 75, title: '完成专业项目', reward: '🚀 专业开发者' },
                { progress: 100, title: '精通Python生态', reward: '👑 Python专家' }
            ],
            frontend: [
                { progress: 25, title: '掌握HTML/CSS/JS', reward: '🌟 前端基础' },
                { progress: 50, title: '学会一个框架', reward: '🏆 框架开发者' },
                { progress: 75, title: '开发完整项目', reward: '🚀 全栈前端' },
                { progress: 100, title: '精通前端工程化', reward: '👑 前端专家' }
            ],
            backend: [
                { progress: 25, title: '掌握后端语言', reward: '🌟 后端入门' },
                { progress: 50, title: '开发RESTful API', reward: '🏆 API开发者' },
                { progress: 75, title: '掌握微服务架构', reward: '🚀 架构师' },
                { progress: 100, title: '精通后端技术栈', reward: '👑 后端专家' }
            ],
            ai: [
                { progress: 25, title: '掌握数学基础', reward: '🌟 数学基础' },
                { progress: 50, title: '实现经典算法', reward: '🏆 算法实践者' },
                { progress: 75, title: '完成深度学习项目', reward: '🚀 AI工程师' },
                { progress: 100, title: '精通AI技术栈', reward: '👑 AI专家' }
            ]
        };

        return milestoneTemplates[pathId] || [];
    }

    // 计算预计完成时间
    calculateCompletion(pathId, weeklyHours) {
        const duration = this.pathDurations[pathId];
        const avgMonths = (duration.min + duration.max) / 2;
        
        // 根据每周学习时间调整
        let adjustedMonths = avgMonths;
        if (weeklyHours < 10) {
            adjustedMonths *= 1.5;
        } else if (weeklyHours > 20) {
            adjustedMonths *= 0.8;
        }

        const completionDate = new Date();
        completionDate.setMonth(completionDate.getMonth() + Math.ceil(adjustedMonths));
        
        return {
            months: Math.ceil(adjustedMonths),
            date: completionDate.toLocaleDateString('zh-CN'),
            totalHours: Math.ceil(adjustedMonths * 4 * weeklyHours)
        };
    }

    // 渲染学习计划
    renderPlan(pathId) {
        const plan = this.plans[pathId];
        if (!plan) return '';

        return `
            <div class="study-plan-card">
                <div class="plan-header">
                    <h4>📅 我的学习计划</h4>
                    <span class="plan-status badge badge-success">进行中</span>
                </div>
                
                <div class="plan-summary">
                    <div class="summary-item">
                        <span class="summary-label">每周学习</span>
                        <span class="summary-value">${plan.weeklyHours} 小时</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">预计完成</span>
                        <span class="summary-value">${plan.estimatedCompletion.date}</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">总计时长</span>
                        <span class="summary-value">${plan.estimatedCompletion.totalHours} 小时</span>
                    </div>
                </div>

                <div class="plan-phases">
                    <h5 class="mt-4 mb-3">学习阶段</h5>
                    ${plan.phases.map((phase, index) => `
                        <div class="phase-item">
                            <div class="phase-header">
                                <span class="phase-number">${index + 1}</span>
                                <div class="phase-info">
                                    <h6>${phase.name}</h6>
                                    <small class="text-muted">${phase.duration}</small>
                                </div>
                            </div>
                            <div class="phase-content">
                                <p><strong>学习内容:</strong> ${phase.topics.join('、')}</p>
                                <p><strong>每周任务:</strong></p>
                                <ul>
                                    ${phase.weeklyTasks.map(task => `<li>${task}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="plan-milestones">
                    <h5 class="mt-4 mb-3">学习里程碑</h5>
                    <div class="milestones-list">
                        ${plan.milestones.map(milestone => `
                            <div class="milestone-item">
                                <div class="milestone-progress">${milestone.progress}%</div>
                                <div class="milestone-content">
                                    <h6>${milestone.title}</h6>
                                    <span class="milestone-reward">${milestone.reward}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    // 渲染计划创建表单
    renderPlannerForm() {
        return `
            <div class="study-planner">
                <div class="container">
                    <h3>📋 制定你的学习计划</h3>
                    <p class="text-white-50 mb-4">根据你的时间安排，我们为你生成个性化的学习计划</p>
                    
                    <div class="planner-form">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>选择学习路径</label>
                                    <select id="plan-path" class="form-control">
                                        <option value="">请选择...</option>
                                        <option value="algorithm">算法竞赛</option>
                                        <option value="cpp">C/C++开发</option>
                                        <option value="python">Python开发</option>
                                        <option value="frontend">前端开发</option>
                                        <option value="backend">后端开发</option>
                                        <option value="ai">AI/机器学习</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>每周学习时间（小时）</label>
                                    <input type="number" id="plan-hours" class="form-control" 
                                           min="5" max="40" value="15" placeholder="15">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>目标完成日期</label>
                                    <input type="date" id="plan-target" class="form-control">
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-white btn-lg" onclick="generateStudyPlan()">
                            🚀 生成学习计划
                        </button>
                    </div>

                    <div id="plan-result" class="planner-result" style="display: none;">
                        <!-- 计划结果将显示在这里 -->
                    </div>
                </div>
            </div>
        `;
    }
}

// 生成学习计划的全局函数
function generateStudyPlan() {
    console.log('generateStudyPlan 函数被调用');
    
    const pathId = document.getElementById('plan-path').value;
    const weeklyHours = parseInt(document.getElementById('plan-hours').value);
    const targetDate = document.getElementById('plan-target').value;

    console.log('表单数据:', { pathId, weeklyHours, targetDate });

    if (!pathId || !weeklyHours) {
        alert('请填写完整信息');
        return;
    }

    try {
        const planner = new StudyPlanner();
        console.log('StudyPlanner 实例创建成功');
        
        // 使用 options 对象调用
        const plan = planner.createPlan({
            pathId: pathId,
            weeklyHours: weeklyHours,
            targetDate: targetDate,
            level: 'intermediate',
            goal: 'interest',
            hasFoundation: false,
            preferredDays: ['1', '2', '3', '4', '5']
        });

        console.log('生成的计划:', plan);

        if (plan) {
            const resultDiv = document.getElementById('plan-result');
            resultDiv.innerHTML = `
                <h5>✅ 学习计划已生成！</h5>
                <div class="plan-summary-card">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <div class="summary-item">
                                <strong>📚 学习路径:</strong> ${plan.pathName || pathId}
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="summary-item">
                                <strong>⏰ 每周投入:</strong> ${weeklyHours} 小时
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="summary-item">
                                <strong>� 预计完成:</strong> ${plan.estimatedCompletion.date || '未设定'}
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="summary-item">
                                <strong>🎯 总计学习:</strong> ${plan.estimatedCompletion.totalHours} 小时
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="summary-item">
                                <strong>📊 学习阶段:</strong> ${plan.phases.length} 个阶段
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="summary-item">
                                <strong>🎓 学习周期:</strong> ${plan.estimatedCompletion.months} 个月
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-4">
                        <h6>� 每周学习安排</h6>
                        <div class="weekly-breakdown">
                            <div class="breakdown-item">
                                <span class="breakdown-label">� 理论学习:</span>
                                <span class="breakdown-value">${plan.weeklySchedule.breakdown.theory} 小时</span>
                            </div>
                            <div class="breakdown-item">
                                <span class="breakdown-label">💻 编程实践:</span>
                                <span class="breakdown-value">${plan.weeklySchedule.breakdown.practice} 小时</span>
                            </div>
                            <div class="breakdown-item">
                                <span class="breakdown-label">📝 复习总结:</span>
                                <span class="breakdown-value">${plan.weeklySchedule.breakdown.review} 小时</span>
                            </div>
                        </div>
                    </div>

                    <div class="mt-4">
                        <h6>💡 学习建议</h6>
                        <ul class="tips-list-simple">
                            ${plan.tips.slice(0, 3).map(tip => `<li>${tip}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="alert alert-info mt-4">
                        <i class="fas fa-info-circle"></i> 
                        你的学习计划已保存到浏览器本地。
                        <a href="#progress-dashboard-section" class="alert-link font-weight-bold">点击这里查看我的学习进度 →</a>
                    </div>
                </div>
            `;
            resultDiv.style.display = 'block';
            
            // 滚动到结果
            resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // 刷新进度仪表板
            if (window.learningTracker) {
                window.learningTracker.updateStatistics();
            }
            
            console.log('计划结果已显示');
        } else {
            console.error('计划生成失败，返回 null');
            alert('计划生成失败，请重试');
        }
    } catch (error) {
        console.error('生成计划时出错:', error);
        alert('生成计划时出错: ' + error.message);
    }
}

// 导出供全局使用
window.StudyPlanner = StudyPlanner;
window.generateStudyPlan = generateStudyPlan;

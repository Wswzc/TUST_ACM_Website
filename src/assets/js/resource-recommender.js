/**
 * TUST-ACM 学习资源推荐系统
 * Learning Resource Recommendation System
 */

const learningResources = {
    algorithm: {
        name: '算法竞赛',
        books: [
            {
                title: '算法竞赛入门经典（第2版）',
                author: '刘汝佳',
                description: '算法竞赛的经典入门教材，适合初学者系统学习',
                level: '入门',
                link: 'https://book.douban.com/subject/25902102/'
            },
            {
                title: '算法竞赛进阶指南',
                author: '李煜东',
                description: '进阶算法技巧和竞赛策略，适合有基础的学习者',
                level: '进阶',
                link: 'https://book.douban.com/subject/30136932/'
            },
            {
                title: '挑战程序设计竞赛',
                author: '秋叶拓哉',
                description: '日本经典算法竞赛教材，题目质量高',
                level: '进阶',
                link: 'https://book.douban.com/subject/24749842/'
            }
        ],
        platforms: [
            {
                name: '洛谷 (Luogu)',
                description: '国内最大的算法学习平台，题目丰富，社区活跃',
                features: ['中文题目', '题解详细', '在线IDE', '比赛系统'],
                link: 'https://www.luogu.com.cn/'
            },
            {
                name: 'Codeforces',
                description: '全球顶级算法竞赛平台，定期举办比赛',
                features: ['国际比赛', 'Rating系统', '题目质量高', '社区讨论'],
                link: 'https://codeforces.com/'
            },
            {
                name: 'AtCoder',
                description: '日本算法竞赛平台，题目设计精巧',
                features: ['每周比赛', '题目新颖', '难度梯度好'],
                link: 'https://atcoder.jp/'
            },
            {
                name: 'AcWing',
                description: '国内算法学习平台，有系统的课程体系',
                features: ['视频课程', '题目讲解', '学习路线', '就业指导'],
                link: 'https://www.acwing.com/'
            }
        ],
        tools: [
            {
                name: 'Visual Studio Code',
                description: '轻量级代码编辑器，支持多种插件',
                type: 'IDE',
                link: 'https://code.visualstudio.com/'
            },
            {
                name: 'CLion',
                description: 'JetBrains出品的C/C++ IDE，功能强大',
                type: 'IDE',
                link: 'https://www.jetbrains.com/clion/'
            },
            {
                name: 'CP Editor',
                description: '专为算法竞赛设计的编辑器',
                type: '竞赛工具',
                link: 'https://cpeditor.org/'
            }
        ],
        courses: [
            {
                name: '数据结构与算法（浙江大学）',
                platform: '中国大学MOOC',
                description: '陈越、何钦铭老师的经典课程',
                link: 'https://www.icourse163.org/'
            }
        ]
    },

    cpp: {
        name: 'C/C++开发',
        books: [
            {
                title: 'C++ Primer（第5版）',
                author: 'Stanley B. Lippman',
                description: 'C++学习的权威指南，全面深入',
                level: '入门-进阶',
                link: 'https://book.douban.com/subject/25708312/'
            },
            {
                title: 'Effective C++',
                author: 'Scott Meyers',
                description: '55个改善程序与设计的具体做法',
                level: '进阶',
                link: 'https://book.douban.com/subject/5387403/'
            },
            {
                title: 'STL源码剖析',
                author: '侯捷',
                description: '深入理解C++ STL的实现原理',
                level: '高级',
                link: 'https://book.douban.com/subject/1110934/'
            }
        ],
        platforms: [
            {
                name: 'LeetCode',
                description: '编程面试题库，C++刷题必备',
                features: ['面试题目', '在线编译', '题解讨论', '模拟面试'],
                link: 'https://leetcode.cn/'
            },
            {
                name: 'GitHub',
                description: '开源代码托管平台，学习优秀项目',
                features: ['代码托管', '协作开发', '开源项目', '技术交流'],
                link: 'https://github.com/'
            }
        ],
        tools: [
            {
                name: 'GCC/G++',
                description: 'GNU编译器套件',
                type: '编译器',
                link: 'https://gcc.gnu.org/'
            },
            {
                name: 'CMake',
                description: '跨平台构建工具',
                type: '构建工具',
                link: 'https://cmake.org/'
            },
            {
                name: 'Valgrind',
                description: '内存调试和性能分析工具',
                type: '调试工具',
                link: 'https://valgrind.org/'
            }
        ],
        courses: [
            {
                name: 'C++程序设计（清华大学）',
                platform: '学堂在线',
                description: '郑莉老师的C++课程',
                link: 'https://www.xuetangx.com/'
            }
        ]
    },

    python: {
        name: 'Python开发',
        books: [
            {
                title: 'Python编程：从入门到实践（第2版）',
                author: 'Eric Matthes',
                description: 'Python入门经典，项目驱动学习',
                level: '入门',
                link: 'https://book.douban.com/subject/35196328/'
            },
            {
                title: '流畅的Python',
                author: 'Luciano Ramalho',
                description: '深入理解Python特性和最佳实践',
                level: '进阶',
                link: 'https://book.douban.com/subject/27028517/'
            },
            {
                title: 'Python Cookbook（第3版）',
                author: 'David Beazley',
                description: 'Python编程技巧和实用方案',
                level: '进阶',
                link: 'https://book.douban.com/subject/26381341/'
            }
        ],
        platforms: [
            {
                name: 'PyPI',
                description: 'Python包索引，查找和安装Python包',
                features: ['包管理', '文档齐全', '社区支持'],
                link: 'https://pypi.org/'
            },
            {
                name: 'Kaggle',
                description: '数据科学竞赛平台，Python实战',
                features: ['数据集', '竞赛', 'Notebook', '学习资源'],
                link: 'https://www.kaggle.com/'
            }
        ],
        tools: [
            {
                name: 'PyCharm',
                description: 'Python专业IDE',
                type: 'IDE',
                link: 'https://www.jetbrains.com/pycharm/'
            },
            {
                name: 'Jupyter Notebook',
                description: '交互式编程环境',
                type: '开发工具',
                link: 'https://jupyter.org/'
            },
            {
                name: 'Anaconda',
                description: 'Python数据科学平台',
                type: '环境管理',
                link: 'https://www.anaconda.com/'
            }
        ],
        courses: [
            {
                name: 'Python数据分析与展示',
                platform: '中国大学MOOC',
                description: '北京理工大学嵩天老师的课程',
                link: 'https://www.icourse163.org/'
            }
        ]
    },

    frontend: {
        name: '前端开发',
        books: [
            {
                title: 'JavaScript高级程序设计（第4版）',
                author: 'Matt Frisbie',
                description: 'JavaScript权威指南，前端必读',
                level: '入门-进阶',
                link: 'https://book.douban.com/subject/35175321/'
            },
            {
                title: '深入浅出Vue.js',
                author: '刘博文',
                description: 'Vue.js原理和实践',
                level: '进阶',
                link: 'https://book.douban.com/subject/32581281/'
            },
            {
                title: 'CSS揭秘',
                author: 'Lea Verou',
                description: 'CSS技巧和最佳实践',
                level: '进阶',
                link: 'https://book.douban.com/subject/26745943/'
            }
        ],
        platforms: [
            {
                name: 'MDN Web Docs',
                description: 'Web开发权威文档',
                features: ['完整文档', '示例代码', '浏览器兼容性', '最佳实践'],
                link: 'https://developer.mozilla.org/'
            },
            {
                name: 'CodePen',
                description: '前端代码分享平台',
                features: ['在线编辑', '作品展示', '学习案例', '社区交流'],
                link: 'https://codepen.io/'
            },
            {
                name: 'Can I Use',
                description: '浏览器兼容性查询',
                features: ['兼容性查询', '使用统计', '特性支持'],
                link: 'https://caniuse.com/'
            }
        ],
        tools: [
            {
                name: 'Chrome DevTools',
                description: '浏览器开发者工具',
                type: '调试工具',
                link: 'https://developer.chrome.com/docs/devtools/'
            },
            {
                name: 'Vite',
                description: '下一代前端构建工具',
                type: '构建工具',
                link: 'https://vitejs.dev/'
            },
            {
                name: 'Figma',
                description: '在线UI设计工具',
                type: '设计工具',
                link: 'https://www.figma.com/'
            }
        ],
        courses: [
            {
                name: 'Vue.js从入门到精通',
                platform: 'B站',
                description: '黑马程序员Vue3课程',
                link: 'https://www.bilibili.com/'
            }
        ]
    },

    backend: {
        name: '后端开发',
        books: [
            {
                title: 'Spring Boot实战',
                author: 'Craig Walls',
                description: 'Spring Boot开发指南',
                level: '入门-进阶',
                link: 'https://book.douban.com/subject/26857423/'
            },
            {
                title: '深入理解Java虚拟机（第3版）',
                author: '周志明',
                description: 'JVM原理和性能优化',
                level: '进阶',
                link: 'https://book.douban.com/subject/34907497/'
            },
            {
                title: '高性能MySQL（第3版）',
                author: 'Baron Schwartz',
                description: 'MySQL优化和最佳实践',
                level: '进阶',
                link: 'https://book.douban.com/subject/23008813/'
            }
        ],
        platforms: [
            {
                name: 'Stack Overflow',
                description: '程序员问答社区',
                features: ['技术问答', '代码示例', '最佳实践', '社区讨论'],
                link: 'https://stackoverflow.com/'
            },
            {
                name: 'Docker Hub',
                description: '容器镜像仓库',
                features: ['镜像托管', '自动构建', '版本管理'],
                link: 'https://hub.docker.com/'
            }
        ],
        tools: [
            {
                name: 'IntelliJ IDEA',
                description: 'Java开发IDE',
                type: 'IDE',
                link: 'https://www.jetbrains.com/idea/'
            },
            {
                name: 'Postman',
                description: 'API测试工具',
                type: '测试工具',
                link: 'https://www.postman.com/'
            },
            {
                name: 'Redis Desktop Manager',
                description: 'Redis可视化管理工具',
                type: '数据库工具',
                link: 'https://resp.app/'
            }
        ],
        courses: [
            {
                name: 'Spring Boot + Vue全栈开发',
                platform: '慕课网',
                description: '全栈项目实战课程',
                link: 'https://www.imooc.com/'
            }
        ]
    },

    ai: {
        name: 'AI/机器学习',
        books: [
            {
                title: '深度学习（花书）',
                author: 'Ian Goodfellow',
                description: '深度学习领域的经典教材',
                level: '进阶-高级',
                link: 'https://book.douban.com/subject/27087503/'
            },
            {
                title: '机器学习（西瓜书）',
                author: '周志华',
                description: '机器学习入门经典',
                level: '入门-进阶',
                link: 'https://book.douban.com/subject/26708119/'
            },
            {
                title: '动手学深度学习',
                author: '阿斯顿·张',
                description: 'PyTorch版深度学习实战',
                level: '入门',
                link: 'https://zh.d2l.ai/'
            }
        ],
        platforms: [
            {
                name: 'Kaggle',
                description: '数据科学竞赛平台',
                features: ['数据集', '竞赛', 'Notebook', 'GPU支持'],
                link: 'https://www.kaggle.com/'
            },
            {
                name: 'Papers with Code',
                description: '论文与代码结合平台',
                features: ['最新论文', '开源代码', '排行榜', '数据集'],
                link: 'https://paperswithcode.com/'
            },
            {
                name: 'Hugging Face',
                description: 'NLP模型和数据集平台',
                features: ['预训练模型', 'Transformers', '数据集', '社区'],
                link: 'https://huggingface.co/'
            }
        ],
        tools: [
            {
                name: 'Google Colab',
                description: '免费GPU云端Jupyter环境',
                type: '开发环境',
                link: 'https://colab.research.google.com/'
            },
            {
                name: 'TensorBoard',
                description: '可视化训练过程',
                type: '可视化工具',
                link: 'https://www.tensorflow.org/tensorboard'
            },
            {
                name: 'Weights & Biases',
                description: '实验跟踪和可视化',
                type: '实验管理',
                link: 'https://wandb.ai/'
            }
        ],
        courses: [
            {
                name: '吴恩达机器学习',
                platform: 'Coursera',
                description: '机器学习入门经典课程',
                link: 'https://www.coursera.org/'
            },
            {
                name: 'CS231n: 计算机视觉',
                platform: 'Stanford',
                description: '斯坦福大学CV课程',
                link: 'http://cs231n.stanford.edu/'
            }
        ]
    }
};

class ResourceRecommender {
    constructor() {
        this.resources = learningResources;
    }

    // 根据学习路径获取推荐资源
    getRecommendations(pathId) {
        return this.resources[pathId] || null;
    }

    // 根据学习者水平推荐书籍
    recommendBooks(pathId, level = 'all') {
        const pathResources = this.resources[pathId];
        if (!pathResources) return [];

        if (level === 'all') {
            return pathResources.books;
        }

        return pathResources.books.filter(book => 
            book.level.includes(level)
        );
    }

    // 渲染资源推荐卡片
    renderResourceCards(pathId, containerId) {
        const resources = this.getRecommendations(pathId);
        if (!resources) return;

        const container = document.getElementById(containerId);
        if (!container) return;

        let html = `
            <div class="resource-section">
                <h4 class="mb-4">📚 推荐学习资源</h4>
                
                <!-- 书籍推荐 -->
                <h5 class="mt-4 mb-3">📖 推荐书籍</h5>
                <div class="row">
                    ${resources.books.map(book => `
                        <div class="col-lg-4 col-md-6 mb-4">
                            <div class="resource-card">
                                <span class="resource-type-badge book">书籍</span>
                                <h5>📕 ${book.title}</h5>
                                <p class="text-muted mb-2"><small>作者: ${book.author}</small></p>
                                <p class="resource-description">${book.description}</p>
                                <span class="badge badge-soft-primary">${book.level}</span>
                                ${book.link ? `<br><a href="${book.link}" target="_blank" class="resource-link mt-2">查看详情 →</a>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- 学习平台 -->
                <h5 class="mt-4 mb-3">🌐 学习平台</h5>
                <div class="row">
                    ${resources.platforms.map(platform => `
                        <div class="col-lg-6 mb-4">
                            <div class="resource-card">
                                <span class="resource-type-badge platform">平台</span>
                                <h5>🎯 ${platform.name}</h5>
                                <p class="resource-description">${platform.description}</p>
                                <div class="mb-3">
                                    ${platform.features.map(feature => 
                                        `<span class="badge badge-soft-success mr-2 mb-2">${feature}</span>`
                                    ).join('')}
                                </div>
                                <a href="${platform.link}" target="_blank" class="resource-link">访问平台 →</a>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- 开发工具 -->
                <h5 class="mt-4 mb-3">🛠️ 开发工具</h5>
                <div class="row">
                    ${resources.tools.map(tool => `
                        <div class="col-lg-4 col-md-6 mb-4">
                            <div class="resource-card">
                                <span class="resource-type-badge tool">工具</span>
                                <h5>⚙️ ${tool.name}</h5>
                                <p class="text-muted mb-2"><small>${tool.type}</small></p>
                                <p class="resource-description">${tool.description}</p>
                                <a href="${tool.link}" target="_blank" class="resource-link">下载/访问 →</a>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- 在线课程 -->
                ${resources.courses && resources.courses.length > 0 ? `
                    <h5 class="mt-4 mb-3">🎓 在线课程</h5>
                    <div class="row">
                        ${resources.courses.map(course => `
                            <div class="col-lg-6 mb-4">
                                <div class="resource-card">
                                    <span class="resource-type-badge course">课程</span>
                                    <h5>📺 ${course.name}</h5>
                                    <p class="text-muted mb-2"><small>平台: ${course.platform}</small></p>
                                    <p class="resource-description">${course.description}</p>
                                    ${course.link ? `<a href="${course.link}" target="_blank" class="resource-link">查看课程 →</a>` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;

        container.innerHTML = html;
    }
}

// 导出供全局使用
window.ResourceRecommender = ResourceRecommender;
window.learningResources = learningResources;

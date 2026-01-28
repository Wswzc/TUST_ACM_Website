// 统一导航栏和页脚的修复脚本
const fs = require('fs');
const path = require('path');

// 标准导航栏HTML
const standardNavbar = `    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
        <div class="container">
            <!-- Brand -->
            <a class="navbar-brand" href="index.html">
                <img alt="TUST-ACM Logo" src="assets/img/brand/favicon.jpg" id="navbar-logo">
                <strong style="color: #090808; top: 10px;"> TUST-ACM 算法实验室</strong>
            </a>
            <!-- Toggler -->
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <!-- Collapse -->
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav mt-4 mt-lg-0 ml-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="index.html">学习路径</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="resources-hub.html">学习资源</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="contests.html">竞赛赛程</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="about.html">实验室介绍</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="contact.html">报名与联系</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>`;

// 标准页脚HTML
const standardFooter = `    <!-- Footer -->
    <footer class="footer bg-dark text-white">
        <div class="container">
            <div class="row pt-5 pb-4">
                <div class="col-lg-4 mb-4 mb-lg-0">
                    <a href="index.html">
                        <img src="assets/img/brand/favicon.jpg" alt="TUST-ACM Logo" style="height: 40px;" class="mb-3">
                    </a>
                    <p class="mt-3 text-sm opacity-8">
                        TUST-ACM 算法实验室致力于培养优秀的算法竞赛选手和软件工程师。
                    </p>
                </div>
                <div class="col-lg-2 col-6 mb-4 mb-lg-0">
                    <h6 class="heading mb-3">快速链接</h6>
                    <ul class="list-unstyled">
                        <li><a href="index.html" class="text-white-50">学习路径</a></li>
                        <li><a href="resources-hub.html" class="text-white-50">学习资源</a></li>
                        <li><a href="contests.html" class="text-white-50">竞赛赛程</a></li>
                        <li><a href="about.html" class="text-white-50">实验室介绍</a></li>
                    </ul>
                </div>
                <div class="col-lg-2 col-6 mb-4 mb-lg-0">
                    <h6 class="heading mb-3">竞赛平台</h6>
                    <ul class="list-unstyled">
                        <li><a href="https://codeforces.com/" target="_blank" class="text-white-50">Codeforces</a></li>
                        <li><a href="https://atcoder.jp/" target="_blank" class="text-white-50">AtCoder</a></li>
                        <li><a href="https://leetcode.cn/" target="_blank" class="text-white-50">LeetCode</a></li>
                        <li><a href="https://www.luogu.com.cn/" target="_blank" class="text-white-50">洛谷</a></li>
                    </ul>
                </div>
                <div class="col-lg-4">
                    <h6 class="heading mb-3">关注我们</h6>
                    <div class="mt-4">
                        <a href="https://codeforces.com/" target="_blank" class="btn btn-sm btn-white btn-icon-only rounded-circle mr-2">
                            <span class="btn-inner--icon"><i class="fas fa-code"></i></span>
                        </a>
                        <a href="https://github.com/" target="_blank" class="btn btn-sm btn-white btn-icon-only rounded-circle">
                            <span class="btn-inner--icon"><i class="fab fa-github"></i></span>
                        </a>
                    </div>
                </div>
            </div>
            <hr class="divider divider-fade divider-dark my-4">
            <div class="row align-items-center justify-content-md-between pb-4">
                <div class="col-md-6">
                    <div class="copyright text-sm font-weight-bold text-center text-md-left">
                        &copy; 2025 Sen Wang. All rights reserved.
                    </div>
                </div>
                <div class="col-md-6">
                    <ul class="nav justify-content-center justify-content-md-end mt-3 mt-md-0">
                        <li class="nav-item">
                            <a class="nav-link text-white-50" href="#">使用条款</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-white-50" href="#">隐私政策</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>`;

console.log('标准导航栏和页脚模板已准备好');
console.log('\n需要手动更新以下文件：');
console.log('- src/beginner-path.html');
console.log('- src/advanced-path.html');
console.log('- src/career-path.html');
console.log('- src/my-dashboard.html');
console.log('- src/resources-hub.html');

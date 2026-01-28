/**
 * TUST-ACM 深色模式
 * Dark Mode Toggle
 */

class DarkMode {
    constructor() {
        this.storageKey = 'tust-acm-dark-mode';
        this.isDark = this.loadPreference();
        this.init();
    }

    init() {
        // 应用保存的主题
        if (this.isDark) {
            this.enableDarkMode();
        }
        
        // 创建切换按钮
        this.createToggleButton();
        
        // 监听系统主题变化
        this.watchSystemTheme();
    }

    loadPreference() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved !== null) {
            return saved === 'true';
        }
        
        // 如果没有保存的偏好，检查系统主题
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    savePreference() {
        localStorage.setItem(this.storageKey, this.isDark.toString());
    }

    enableDarkMode() {
        document.documentElement.setAttribute('data-theme', 'dark');
        this.isDark = true;
        this.updateToggleButton();
    }

    disableDarkMode() {
        document.documentElement.removeAttribute('data-theme');
        this.isDark = false;
        this.updateToggleButton();
    }

    toggle() {
        if (this.isDark) {
            this.disableDarkMode();
        } else {
            this.enableDarkMode();
        }
        this.savePreference();
    }

    createToggleButton() {
        // 检查按钮是否已存在
        if (document.getElementById('dark-mode-toggle')) return;

        const button = document.createElement('button');
        button.id = 'dark-mode-toggle';
        button.className = 'dark-mode-toggle';
        button.setAttribute('aria-label', '切换深色模式');
        button.innerHTML = this.isDark ? '🌙' : '☀️';
        
        button.addEventListener('click', () => this.toggle());
        
        document.body.appendChild(button);
    }

    updateToggleButton() {
        const button = document.getElementById('dark-mode-toggle');
        if (button) {
            button.innerHTML = this.isDark ? '🌙' : '☀️';
        }
    }

    watchSystemTheme() {
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', (e) => {
                // 只有在用户没有手动设置时才跟随系统
                const saved = localStorage.getItem(this.storageKey);
                if (saved === null) {
                    if (e.matches) {
                        this.enableDarkMode();
                    } else {
                        this.disableDarkMode();
                    }
                }
            });
        }
    }
}

// 初始化深色模式
document.addEventListener('DOMContentLoaded', () => {
    window.darkMode = new DarkMode();
});

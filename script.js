// 初始化函数
document.addEventListener('DOMContentLoaded', function() {
    // 初始化粒子背景
    initParticles();
    
    // 初始化导航菜单
    initNavigation();
    
    // 初始化滚动动画
    initScrollAnimations();
    
    // 初始化统计数字动画
    initStatsAnimation();
    
    // 初始化图表动画
    initChartAnimation();
    
    // 初始化联系表单
    initContactForm();
    
    // 初始化返回顶部按钮
    initBackToTop();
});

// 粒子背景初始化
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 40,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#4caf50'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 6,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 4,
                        size_min: 0.3,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#4caf50',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

// 导航菜单初始化
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    
    // 移动端菜单切换
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // 点击导航链接后关闭移动端菜单
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
    
    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// 滚动动画初始化
function initScrollAnimations() {
    // 创建IntersectionObserver实例
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 为元素添加动画类
                if (entry.target.classList.contains('animate-card')) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                    entry.target.style.animationDelay = (Math.random() * 0.5) + 's';
                } else if (entry.target.classList.contains('animate-slide-left')) {
                    entry.target.style.animation = 'slideInLeft 0.8s ease forwards';
                } else if (entry.target.classList.contains('animate-slide-right')) {
                    entry.target.style.animation = 'slideInRight 0.8s ease forwards';
                } else if (entry.target.classList.contains('animate-stat')) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                    // 触发统计数字动画
                    if (entry.target.querySelector('.stat-value')) {
                        animateValue(entry.target.querySelector('.stat-value'), 0, parseInt(entry.target.querySelector('.stat-value').getAttribute('data-target')), 1500);
                    }
                }
                
                // 停止观察已动画的元素
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    document.querySelectorAll('.animate-card, .animate-slide-left, .animate-slide-right, .animate-stat').forEach(el => {
        observer.observe(el);
    });
    
    // 添加额外的动画关键帧
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// 统计数字动画
function initStatsAnimation() {
    // 在滚动动画中已经处理
}

// 数字递增动画
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + (element.getAttribute('data-suffix') || '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// 图表动画初始化
function initChartAnimation() {
    const chartBars = document.querySelectorAll('.chart-bar');
    
    const chartObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const barFill = entry.target.querySelector('.bar-fill');
                const percentage = entry.target.getAttribute('data-percentage');
                
                setTimeout(() => {
                    barFill.style.width = percentage + '%';
                }, 300);
                
                chartObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    chartBars.forEach(bar => {
        chartObserver.observe(bar);
    });
}

// 联系表单初始化
function initContactForm() {
    const contactForm = document.getElementById('messageForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // 简单验证
            if (!name || !email || !message) {
                showMessage('请填写所有必填字段', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage('请输入有效的电子邮件地址', 'error');
                return;
            }
            
            // 显示加载状态
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<div class="loading-spinner"></div>发送中...';
            submitBtn.disabled = true;
            
            // 模拟表单提交
            setTimeout(() => {
                // 在实际应用中，这里应该是AJAX请求
                console.log('表单数据:', { name, email, message });
                
                // 显示成功消息
                showMessage('消息发送成功！我们会尽快回复您。', 'success');
                
                // 重置表单
                contactForm.reset();
                
                // 恢复按钮状态
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// 验证电子邮件格式
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 显示消息
function showMessage(text, type) {
    // 移除现有的消息
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // 创建新消息
    const message = document.createElement('div');
    message.className = `form-message ${type}`;
    message.textContent = text;
    message.style.cssText = `
        padding: 15px;
        border-radius: 8px;
        margin-top: 20px;
        text-align: center;
        color: white;
        background-color: ${type === 'success' ? '#4caf50' : '#f44336'};
        animation: fadeIn 0.5s ease;
    `;
    
    // 添加到表单
    const contactForm = document.getElementById('messageForm');
    contactForm.appendChild(message);
    
    // 5秒后自动移除
    setTimeout(() => {
        message.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 500);
    }, 5000);
    
    // 添加动画关键帧
    if (!document.querySelector('#message-animations')) {
        const style = document.createElement('style');
        style.id = 'message-animations';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            @keyframes fadeOut {
                from { opacity: 1; transform: translateY(0); }
                to { opacity: 0; transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(style);
    }
}

// 返回顶部按钮初始化
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        // 显示/隐藏返回顶部按钮
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        
        // 点击返回顶部
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// 页面加载动画
window.addEventListener('load', function() {
    // 添加加载完成类，用于可能的CSS过渡
    document.body.classList.add('loaded');
    
    // 触发初始动画
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (heroTitle) {
        heroTitle.style.animation = 'fadeInUp 1s ease forwards';
    }
    
    if (heroDescription) {
        heroDescription.style.animation = 'fadeInUp 1s ease 0.3s forwards';
    }
    
    if (heroButtons) {
        heroButtons.style.animation = 'fadeInUp 1s ease 0.6s forwards';
    }
});
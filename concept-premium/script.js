// Анимации для премиум лендинга логистики

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация
    initNavbar();
    initScrollAnimations();
    initProcessAnimation();
    initContactForm();
    initStatsCounter();
    initMapAnimation();
    
    // Обработчики событий
    setupEventListeners();
});

// Навигация при скролле
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Добавление фона при скролле
        if (currentScroll > 100) {
            navbar.classList.add('nav-scroll', 'py-3');
            navbar.classList.remove('py-4');
        } else {
            navbar.classList.remove('nav-scroll', 'py-3');
            navbar.classList.add('py-4');
        }
        
        // Скрытие/показ навигации
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

// Анимации при скролле
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.scroll-animation');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Задержка для последовательного появления
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.style.transitionDelay = '0s';
                }, delay);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

// Анимация процесса
function initProcessAnimation() {
    const processSteps = document.querySelectorAll('.process-step');
    
    const processObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stepNumber = entry.target.querySelector('.process-number');
                if (stepNumber) {
                    stepNumber.style.transform = 'scale(1)';
                    stepNumber.style.opacity = '1';
                }
            }
        });
    }, {
        threshold: 0.5
    });
    
    processSteps.forEach(step => {
        processObserver.observe(step);
    });
}

// Форма обратной связи
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const quoteForm = document.getElementById('quote-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showFormSuccess(contactForm);
        });
    }
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showFormSuccess(quoteForm);
        });
    }
    
    // Обработчики для кнопок CTA
    const ctaButtons = document.querySelectorAll('[id^="cta-"]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const formSection = document.getElementById('contact');
            if (formSection) {
                formSection.scrollIntoView({ behavior: 'smooth' });
                
                // Анимация кнопки
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });
}

// Анимация счетчиков статистики
function initStatsCounter() {
    const statElements = document.querySelectorAll('.stat-counter');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                animateCounter(entry.target);
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.5
    });
    
    statElements.forEach(stat => {
        statsObserver.observe(stat);
    });
}

function animateCounter(element) {
    const target = parseInt(element.textContent.replace('+', '').replace('%', ''));
    const isPercent = element.textContent.includes('%');
    const duration = 2000; // 2 секунды
    const step = target / (duration / 16); // 60fps
    
    let current = 0;
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (isPercent) {
            element.textContent = current.toFixed(1) + '%';
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 16);
}

// Анимация карты
function initMapAnimation() {
    const mapPoints = document.querySelectorAll('.map-point');
    
    mapPoints.forEach((point, index) => {
        // Разная задержка для каждой точки
        point.style.animationDelay = `${index * 0.5}s`;
        
        // Добавляем hover эффект
        point.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'scale(1.3)';
        });
        
        point.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = 'scale(1)';
        });
    });
}

// Успешная отправка формы
function showFormSuccess(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Показываем загрузку
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
    submitBtn.disabled = true;
    
    // Имитация отправки
    setTimeout(() => {
        // Показываем успех
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Отправлено!';
        submitBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
        submitBtn.classList.add('bg-green-500', 'hover:bg-green-600');
        
        // Сбрасываем форму
        form.reset();
        
        // Возвращаем исходное состояние через 3 секунды
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('bg-green-500', 'hover:bg-green-600');
            submitBtn.classList.add('bg-blue-600', 'hover:bg-blue-700');
        }, 3000);
    }, 1500);
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Анимация кнопок при наведении
    const buttons = document.querySelectorAll('button, .btn-animate');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Переключение тем (если нужно)
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const icon = this.querySelector('i');
            if (document.body.classList.contains('dark-theme')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    }
}

// Дополнительные утилиты
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Инициализация при загрузке
window.addEventListener('load', function() {
    // Добавляем класс загрузки для плавного появления
    document.body.classList.add('loaded');
    
    // Запускаем анимацию статистики если она в viewport
    const statsSection = document.querySelector('.stats-section');
    if (statsSection && isElementInViewport(statsSection)) {
        initStatsCounter();
    }
});

// Проверка видимости элемента
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Параллакс эффект для фона
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });
}

// Инициализация параллакса если есть элементы
const parallaxElements = document.querySelectorAll('.parallax');
if (parallaxElements.length > 0) {
    initParallax();
}
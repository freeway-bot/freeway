// JavaScript для минималистичного лендинга

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация
    initScrollAnimations();
    initContactForm();
    initMobileMenu();
    initStatsCounter();
    
    // Обработчики событий
    setupEventListeners();
});

// Анимации при скролле
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.card, .process-step, .testimonial');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Форма обратной связи
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showFormSuccess(this);
        });
    }
}

// Мобильное меню
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('button.md\\:hidden');
    const mobileNav = document.createElement('div');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            const navLinks = document.querySelector('.hidden.md\\:flex');
            if (navLinks) {
                navLinks.classList.toggle('hidden');
                navLinks.classList.toggle('flex');
                navLinks.classList.toggle('flex-col');
                navLinks.classList.toggle('absolute');
                navLinks.classList.toggle('top-full');
                navLinks.classList.toggle('left-0');
                navLinks.classList.toggle('right-0');
                navLinks.classList.toggle('bg-white');
                navLinks.classList.toggle('shadow-lg');
                navLinks.classList.toggle('p-6');
                navLinks.classList.toggle('space-y-4');
                navLinks.classList.toggle('border-t');
            }
        });
    }
}

// Анимация счетчиков статистики
function initStatsCounter() {
    const statElements = document.querySelectorAll('.stat-number');
    
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
    const text = element.textContent;
    const target = parseInt(text.replace('+', '').replace('%', ''));
    const isPercent = text.includes('%');
    const hasPlus = text.includes('+');
    const duration = 2000;
    const step = target / (duration / 16);
    
    let current = 0;
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (isPercent) {
            element.textContent = current.toFixed(1) + '%';
        } else if (hasPlus) {
            element.textContent = Math.floor(current) + '+';
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Успешная отправка формы
function showFormSuccess(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Показываем загрузку
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Отправка...';
    submitBtn.disabled = true;
    
    // Имитация отправки
    setTimeout(() => {
        // Показываем успех
        submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Отправлено!';
        submitBtn.classList.remove('btn-primary');
        submitBtn.classList.add('bg-green-500', 'hover:bg-green-600');
        
        // Сбрасываем форму
        form.reset();
        
        // Возвращаем исходное состояние через 3 секунды
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('bg-green-500', 'hover:bg-green-600');
            submitBtn.classList.add('btn-primary');
        }, 3000);
    }, 1500);
}

// Прокрутка к контактам
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
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
                
                // Закрываем мобильное меню если открыто
                const mobileNav = document.querySelector('.hidden.md\\:flex.flex-col');
                if (mobileNav && mobileNav.classList.contains('flex')) {
                    mobileNav.classList.remove('flex', 'flex-col', 'absolute', 'top-full', 'left-0', 'right-0', 'bg-white', 'shadow-lg', 'p-6', 'space-y-4', 'border-t');
                    mobileNav.classList.add('hidden', 'md:flex');
                }
            }
        });
    });
    
    // Анимация кнопок при наведении
    const buttons = document.querySelectorAll('button, .btn-primary, .btn-outline');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Валидация формы
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.classList.add('border-red-300');
            } else {
                this.classList.remove('border-red-300');
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.classList.remove('border-red-300');
            }
        });
    });
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
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Запускаем анимацию статистики если она в viewport
    const statsSection = document.querySelector('.bg-gray-50');
    if (statsSection) {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            initStatsCounter();
        }
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
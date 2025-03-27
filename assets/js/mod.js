// Основной модуль приложения
(function() {
    'use strict';

    // Общие утилиты
    const utils = {
        // Получение элементов с проверкой на существование
        getElements: (selector, parent = document) => {
            const elements = parent.querySelectorAll(selector);
            return elements.length ? elements : null;
        },

        // Форматирование чисел с разделителями
        formatNumber: num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "),

        // Проверка видимости элемента
        isElementVisible: (el, offset = 0) => {
            const rect = el.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
                rect.bottom >= offset
            );
        }
    };

    // Модуль мобильного меню
    const mobileMenu = (() => {
        const selectors = {
            menuButton: '.menu-btn',
            mobileMenu: '#mobileMenu',
            closeButton: '.mobile-menu-close',
            overlay: '#mobileMenuOverlay',
            menuLinks: '.mobile-menu-nav a'
        };

        let elements = {};

        const initElements = () => {
            elements = {
                menuButton: document.querySelector(selectors.menuButton),
                mobileMenu: document.getElementById('mobileMenu'),
                closeButton: document.querySelector(selectors.closeButton),
                overlay: document.getElementById('mobileMenuOverlay'),
                menuLinks: utils.getElements(selectors.menuLinks)
            };
        };

        const toggleMenu = () => {
            elements.mobileMenu.classList.toggle('open');
            elements.overlay.classList.toggle('open');
            document.body.style.overflow = elements.mobileMenu.classList.contains('open') ? 'hidden' : '';
            
            if (elements.menuButton) {
                elements.menuButton.classList.toggle('active');
            }
        };

        const setupEventListeners = () => {
            if (elements.menuButton) {
                elements.menuButton.addEventListener('click', e => {
                    e.preventDefault();
                    toggleMenu();
                });
            }

            if (elements.closeButton) {
                elements.closeButton.addEventListener('click', toggleMenu);
            }

            if (elements.overlay) {
                elements.overlay.addEventListener('click', toggleMenu);
            }

            if (elements.menuLinks) {
                elements.menuLinks.forEach(link => {
                    link.addEventListener('click', toggleMenu);
                });
            }

            document.addEventListener('keydown', e => {
                if (e.key === 'Escape' && elements.mobileMenu.classList.contains('open')) {
                    toggleMenu();
                }
            });
        };

        const init = () => {
            initElements();
            if (elements.mobileMenu) {
                setupEventListeners();
            }
        };

        return { init };
    })();

    // Модуль видео попапа
    const videoPopup = (() => {
        const selectors = {
            videoBtn: '#video-btn',
            videoPopup: '#popup\\:company',
            closeBtn: '.geo-popup__close',
            overlay: '.geo-popup__overlay',
            iframe: '.geo-popup__video iframe'
        };

        let elements = {};
        let iframeSrc = '';

        const initElements = () => {
            elements = {
                videoBtn: document.getElementById('video-btn'),
                videoPopup: document.getElementById('popup:company'),
                closeBtn: document.querySelector(selectors.closeBtn),
                overlay: document.querySelector(selectors.overlay),
                iframe: document.querySelector(selectors.iframe)
            };

            if (elements.iframe) {
                iframeSrc = elements.iframe.src;
            }
        };

        const openPopup = e => {
            if (e) e.preventDefault();
            elements.videoPopup.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';

            // Автовоспроизведение с задержкой
            setTimeout(() => {
                if (elements.iframe) {
                    elements.iframe.src = iframeSrc.includes('autoplay=1') 
                        ? iframeSrc 
                        : `${iframeSrc}${iframeSrc.includes('?') ? '&' : '?'}autoplay=1`;
                }
            }, 300);
        };

        const closePopup = () => {
            elements.videoPopup.style.display = 'none';
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            
            if (elements.iframe) {
                elements.iframe.src = iframeSrc.replace('&autoplay=1', '');
            }
        };

        const setupEventListeners = () => {
            if (elements.videoBtn) {
                elements.videoBtn.addEventListener('click', openPopup);
            }

            if (elements.closeBtn) {
                elements.closeBtn.addEventListener('click', closePopup);
            }

            if (elements.overlay) {
                elements.overlay.addEventListener('click', closePopup);
            }

            document.addEventListener('keydown', e => {
                if (e.key === 'Escape' && elements.videoPopup.style.display === 'flex') {
                    closePopup();
                }
            });
        };

        const init = () => {
            initElements();
            if (elements.videoPopup) {
                setupEventListeners();
            }
        };

        return { init };
    })();

    // Модуль формы
    const formModule = (() => {
        const selectors = {
            formPopup: '#popup\\:myform',
            form: '#geo-kp-form',
            closeBtn: '.geo-form-popup__close',
            overlay: '.geo-form-popup__overlay',
            openButtons: '[href="#popup:myform"]',
            phoneInput: '#geo-phone',
            nameInput: '#geo-name',
            emailInput: '#geo-email',
            densityInput: '#geo-density'
        };

        let elements = {};
        let scrollPosition = 0;

        const initElements = () => {
            elements = {
                formPopup: document.getElementById('popup:myform'),
                form: document.getElementById('geo-kp-form'),
                closeBtn: document.querySelector(selectors.closeBtn),
                overlay: document.querySelector(selectors.overlay),
                openButtons: utils.getElements(selectors.openButtons),
                phoneInput: document.getElementById('geo-phone'),
                nameInput: document.getElementById('geo-name'),
                emailInput: document.getElementById('geo-email'),
                densityInput: document.getElementById('geo-density')
            };
        };

        const openFormPopup = () => {
            scrollPosition = window.pageYOffset;
            elements.formPopup.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        };

        const closeFormPopup = () => {
            elements.formPopup.style.display = 'none';
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            window.scrollTo(0, scrollPosition);
        };

        const setupPhoneMask = () => {
            if (!elements.phoneInput) return;

            elements.phoneInput.addEventListener('input', e => {
                let value = e.target.value.replace(/\D/g, '');
                let formattedValue = '';

                if (value.length > 0) formattedValue = '(' + value.substring(0, 3);
                if (value.length > 3) formattedValue += ') ' + value.substring(3, 6);
                if (value.length > 6) formattedValue += '-' + value.substring(6, 8);
                if (value.length > 8) formattedValue += '-' + value.substring(8, 10);

                e.target.value = formattedValue;
            });
        };

        const validateForm = e => {
            e.preventDefault();
            let isValid = true;

            // Сброс ошибок
            document.querySelectorAll('.geo-form__group').forEach(group => {
                group.classList.remove('geo-form__group--error');
            });

            // Валидация имени
            if (!elements.nameInput.value.trim()) {
                elements.nameInput.closest('.geo-form__group').classList.add('geo-form__group--error');
                isValid = false;
            }

            // Валидация телефона
            const phoneRegex = /^\(\d{3}\) \d{3}-\d{2}-\d{2}$/;
            if (!phoneRegex.test(elements.phoneInput.value)) {
                elements.phoneInput.closest('.geo-form__group').classList.add('geo-form__group--error');
                isValid = false;
            }

            // Валидация email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(elements.emailInput.value)) {
                elements.emailInput.closest('.geo-form__group').classList.add('geo-form__group--error');
                isValid = false;
            }

            // Валидация плотности
            if (!elements.densityInput.value) {
                elements.densityInput.closest('.geo-form__group').classList.add('geo-form__group--error');
                isValid = false;
            }

            if (isValid) {
                alert('Форма успешно отправлена! Мы свяжемся с вами в ближайшее время.');
                closeFormPopup();
                elements.form.reset();
            }
        };

        const setupEventListeners = () => {
            if (elements.openButtons) {
                elements.openButtons.forEach(btn => {
                    btn.addEventListener('click', e => {
                        e.preventDefault();
                        openFormPopup();
                    });
                });
            }

            if (elements.closeBtn) {
                elements.closeBtn.addEventListener('click', closeFormPopup);
            }

            if (elements.overlay) {
                elements.overlay.addEventListener('click', closeFormPopup);
            }

            document.addEventListener('keydown', e => {
                if (e.key === 'Escape' && elements.formPopup.style.display === 'flex') {
                    closeFormPopup();
                }
            });

            if (elements.form) {
                elements.form.addEventListener('submit', validateForm);
            }

            setupPhoneMask();
        };

        const init = () => {
            initElements();
            if (elements.formPopup) {
                setupEventListeners();
            }
        };

        return { init };
    })();

    // Модуль фильтра продуктов
    const productFilter = (() => {
        const selectors = {
            tabs: '.geo-filter__tab',
            productCards: '[data-target]',
            productsContainer: '.products-grid'
        };

        let elements = {};

        const initElements = () => {
            elements = {
                tabs: utils.getElements(selectors.tabs),
                productCards: utils.getElements(selectors.productCards),
                productsContainer: document.querySelector(selectors.productsContainer)
            };
        };

        const hideAllCards = () => {
            if (!elements.productCards) return;

            elements.productCards.forEach(card => {
                card.style.cssText = `
                    visibility: hidden;
                    position: absolute;
                    height: 0;
                    padding: 0;
                    margin: 0;
                    overflow: hidden;
                `;
            });

            if (elements.productsContainer) {
                elements.productsContainer.style.minHeight = `${elements.productsContainer.offsetHeight}px`;
            }
        };

        const showCardsByDensity = density => {
            hideAllCards();
            
            const cardsToShow = document.querySelectorAll(`[data-target*="${density}"]`);
            if (!cardsToShow.length) return;

            cardsToShow.forEach(card => {
                card.style.cssText = `
                    visibility: visible;
                    position: relative;
                    height: auto;
                    padding: '';
                    margin: '';
                    overflow: '';
                `;
            });

            if (elements.productsContainer) {
                elements.productsContainer.style.minHeight = '';
            }
        };

        const setupEventListeners = () => {
            if (!elements.tabs) return;

            elements.tabs.forEach(tab => {
                tab.addEventListener('click', e => {
                    e.preventDefault();
                    
                    const scrollPosition = window.scrollY || window.pageYOffset;
                    
                    elements.tabs.forEach(t => t.classList.remove('geo-filter__tab--active'));
                    tab.classList.add('geo-filter__tab--active');
                    
                    const density = tab.getAttribute('data-density');
                    showCardsByDensity(density);
                    
                    requestAnimationFrame(() => {
                        window.scrollTo(0, scrollPosition);
                    });
                });
            });
        };

        const init = () => {
            initElements();
            if (elements.tabs && elements.tabs.length) {
                setupEventListeners();
                elements.tabs[0].click();
            }
        };

        return { init };
    })();

    // Модуль анимации счетчиков
    const countersAnimation = (() => {
        const selectors = {
            counters: '.stat-card__value[data-target]'
        };

        let observer = null;

        const animateCounter = element => {
            const target = parseInt(element.getAttribute('data-target'));
            const duration = parseInt(element.getAttribute('data-duration')) || 2000;
            const suffix = element.getAttribute('data-suffix') || '';
            const start = 0;
            let startTime = null;
            
            const animate = timestamp => {
                if (!startTime) startTime = timestamp;
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const current = Math.floor(progress * (target - start) + start);
                
                element.innerHTML = utils.formatNumber(current) + suffix;
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            
            requestAnimationFrame(animate);
        };

        const initObserver = () => {
            if (!('IntersectionObserver' in window)) {
                // Фолбэк для браузеров без поддержки IntersectionObserver
                const counters = utils.getElements(selectors.counters);
                if (counters) {
                    counters.forEach(counter => {
                        animateCounter(counter);
                    });
                }
                return;
            }

            observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.5,
                rootMargin: '0px 0px -50px 0px'
            });

            const counters = utils.getElements(selectors.counters);
            if (counters) {
                counters.forEach(counter => {
                    // Сохраняем суффиксы для восстановления после анимации
                    const suffix = counter.innerHTML.match(/<span.*<\/span>/)?.[0] || '';
                    counter.setAttribute('data-suffix', suffix);
                    counter.innerHTML = '0' + suffix;
                    
                    // Проверить сразу видимые элементы
                    if (utils.isElementVisible(counter)) {
                        animateCounter(counter);
                    } else {
                        observer.observe(counter);
                    }
                });
            }
        };

        const init = () => {
            initObserver();
        };

        return { init };
    })();

    // Инициализация всех модулей
    const initApp = () => {
        mobileMenu.init();
        videoPopup.init();
        formModule.init();
        productFilter.init();
        countersAnimation.init();
    };

    // Запуск приложения
    if (document.readyState === 'complete') {
        initApp();
    } else {
        window.addEventListener('load', initApp);
    }
})();
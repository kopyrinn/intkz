  document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы
    const menuButton = document.querySelector('.menu-btn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeButton = document.querySelector('.mobile-menu-close');
    const overlay = document.getElementById('mobileMenuOverlay');
    
    // Функция для переключения меню
    function toggleMenu() {
      mobileMenu.classList.toggle('open');
      overlay.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
      
      // Добавляем/убираем класс active для кнопки бургера
      if (menuButton) {
        menuButton.classList.toggle('active');
      }
    }
    
    // Обработчик для кнопки бургера
    if (menuButton) {
      menuButton.addEventListener('click', function(e) {
        e.preventDefault();
        toggleMenu();
      });
    }
    
    // Обработчик для кнопки закрытия
    if (closeButton) {
      closeButton.addEventListener('click', toggleMenu);
    }
    
    // Обработчик для оверлея
    if (overlay) {
      overlay.addEventListener('click', toggleMenu);
    }
    
    // Закрытие при клике на ссылки меню
    const menuLinks = document.querySelectorAll('.mobile-menu-nav a');
    menuLinks.forEach(link => {
      link.addEventListener('click', toggleMenu);
    });
    
    // Закрытие при нажатии ESC
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        toggleMenu();
      }
    });
  });


    // Video Popup Logic
        document.addEventListener('DOMContentLoaded', function() {
            const videoBtn = document.getElementById('video-btn');
            const videoPopup = document.getElementById('popup:company');
            const closeBtn = document.querySelector('.geo-popup__close');
            const overlay = document.querySelector('.geo-popup__overlay');
            
            // Open popup
            videoBtn.addEventListener('click', function(e) {
                e.preventDefault();
                videoPopup.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                document.documentElement.style.overflow = 'hidden';
            });
            
            // Close popup
            function closePopup() {
                videoPopup.style.display = 'none';
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
                
                // Pause video when closing
                const iframe = document.querySelector('.geo-popup__video iframe');
                if (iframe) {
                    iframe.src = iframe.src.replace('&autoplay=1', '');
                }
            }
            
            closeBtn.addEventListener('click', closePopup);
            overlay.addEventListener('click', closePopup);
            
            // Close with Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && videoPopup.style.display === 'flex') {
                    closePopup();
                }
            });
            
            // Autoplay video when opened
            videoBtn.addEventListener('click', function() {
                setTimeout(() => {
                    const iframe = document.querySelector('.geo-popup__video iframe');
                    if (iframe) {
                        iframe.src += '&autoplay=1';
                    }
                }, 300);
            });
        });




        // Form Popup Logic
document.addEventListener('DOMContentLoaded', function() {
    const formPopup = document.getElementById('popup:myform');
    const form = document.getElementById('geo-kp-form');
    const closeBtn = document.querySelector('.geo-form-popup__close');
    const overlay = document.querySelector('.geo-form-popup__overlay');
    let scrollPosition = 0;

    // Open popup from "Получить КП" button
    document.querySelectorAll('[href="#popup:myform"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            scrollPosition = window.pageYOffset; // Save current scroll position
            openFormPopup();
        });
    });

    // Open popup function
    function openFormPopup() {
        formPopup.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
    }

    // Close popup function
    function closeFormPopup() {
        formPopup.style.display = 'none';
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        window.scrollTo(0, scrollPosition); // Restore scroll position
    }

    // Close handlers
    closeBtn.addEventListener('click', closeFormPopup);
    overlay.addEventListener('click', closeFormPopup);

    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && formPopup.style.display === 'flex') {
            closeFormPopup();
        }
    });

    // Phone mask
    const phoneInput = document.getElementById('geo-phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            let formattedValue = '';

            if (value.length > 0) {
                formattedValue = '(' + value.substring(0, 3);
            }
            if (value.length > 3) {
                formattedValue += ') ' + value.substring(3, 6);
            }
            if (value.length > 6) {
                formattedValue += '-' + value.substring(6, 8);
            }
            if (value.length > 8) {
                formattedValue += '-' + value.substring(8, 10);
            }

            e.target.value = formattedValue;
        });
    }

    // Form validation
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Reset errors
        document.querySelectorAll('.geo-form__group').forEach(group => {
            group.classList.remove('geo-form__group--error');
        });

        // Validate name
        const name = document.getElementById('geo-name');
        if (!name.value.trim()) {
            name.closest('.geo-form__group').classList.add('geo-form__group--error');
            isValid = false;
        }

        // Validate phone
        const phone = document.getElementById('geo-phone');
        const phoneRegex = /^\(\d{3}\) \d{3}-\d{2}-\d{2}$/;
        if (!phoneRegex.test(phone.value)) {
            phone.closest('.geo-form__group').classList.add('geo-form__group--error');
            isValid = false;
        }

        // Validate email
        const email = document.getElementById('geo-email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            email.closest('.geo-form__group').classList.add('geo-form__group--error');
            isValid = false;
        }

        // Validate density
        const density = document.getElementById('geo-density');
        if (!density.value) {
            density.closest('.geo-form__group').classList.add('geo-form__group--error');
            isValid = false;
        }

        // If valid, submit form
        if (isValid) {
            // Here you would normally send the form data to the server
            alert('Форма успешно отправлена! Мы свяжемся с вами в ближайшее время.');
            closeFormPopup();
            form.reset();
        }
    });
});


//фильтр
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.geo-filter__tab');
    const productCards = document.querySelectorAll('[data-target]'); // Выбираем карточки с data-target
    const productsContainer = document.querySelector('.products-grid');
    
    function hideAllCards() {
        productCards.forEach(card => {
            card.style.visibility = 'hidden';
            card.style.position = 'absolute';
            card.style.height = '0';
            card.style.padding = '0';
            card.style.margin = '0';
            card.style.overflow = 'hidden';
        });
        productsContainer.style.minHeight = productsContainer.offsetHeight + 'px';
    }
    
    function showCardsByDensity(density) {
        hideAllCards();
        
        // Ищем карточки, у которых data-target содержит значение density (например pe150)
        const cardsToShow = document.querySelectorAll(`[data-target*="${density}"]`);
        cardsToShow.forEach(card => {
            card.style.visibility = 'visible';
            card.style.position = 'relative';
            card.style.height = 'auto';
            card.style.padding = '';
            card.style.margin = '';
            card.style.overflow = '';
        });
        
        productsContainer.style.minHeight = '';
    }
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            const scrollPosition = window.scrollY || window.pageYOffset;
            
            tabs.forEach(t => t.classList.remove('geo-filter__tab--active'));
            this.classList.add('geo-filter__tab--active');
            
            const density = this.getAttribute('data-density'); // Получаем значение из data-density фильтра
            showCardsByDensity(density);
            
            requestAnimationFrame(() => {
                window.scrollTo(0, scrollPosition);
            });
        });
    });
    
    // Initialize
    const firstTab = document.querySelector('.geo-filter__tab');
    if (firstTab) {
        firstTab.click();
    }
});

// Анимация счетчиков
document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('[data-counter]');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-counter'));
        const duration = 2000;
        const start = 0;
        let startTime = null;
        
        const suffix = element.innerHTML.match(/<span.*<\/span>/)?.[0] || '';
        
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const value = Math.floor(progress * target);
            
            element.innerHTML = value.toLocaleString() + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        
        requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {threshold: 0.3});

    counters.forEach(counter => {
        observer.observe(counter);
    });
});

document.addEventListener('DOMContentLoaded', function() {
  const videoButton = document.getElementById('open-video-popup');
  const videoPopup = document.getElementById('video-popup');
  const closePopup = document.querySelector('.close-popup');
  const videoContainer = document.querySelector('.video-container');
  
  // Открытие попапа
  videoButton.addEventListener('click', function() {
    videoPopup.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Вставляем iframe с видео (замените YOUR_VIDEO_ID на реальный ID)
    videoContainer.innerHTML = `
      <iframe 
        src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>
    `;
  });
  
  // Закрытие попапа
  closePopup.addEventListener('click', function() {
    videoPopup.style.display = 'none';
    document.body.style.overflow = '';
    videoContainer.innerHTML = ''; // Удаляем iframe
  });
  
  // Закрытие при клике на оверлей
  document.querySelector('.popup-overlay').addEventListener('click', function() {
    videoPopup.style.display = 'none';
    document.body.style.overflow = '';
    videoContainer.innerHTML = ''; // Удаляем iframe
  });
  
  // Закрытие при нажатии ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && videoPopup.style.display === 'block') {
      videoPopup.style.display = 'none';
      document.body.style.overflow = '';
      videoContainer.innerHTML = ''; // Удаляем iframe
    }
  });
});

 //карусель наград
document.addEventListener('DOMContentLoaded', function() {
  // Карусель
  const awardsCarousel = document.querySelector('.awards-gallery-items');
  const prevBtn = document.querySelector('.awards-gallery-prev');
  const nextBtn = document.querySelector('.awards-gallery-next');
  
  function scrollCarousel(direction) {
    const card = document.querySelector('.awards-gallery-card');
    const gap = 25;
    const scrollAmount = card.offsetWidth + gap;
    
    awardsCarousel.scrollBy({
      left: direction === 'prev' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  }
  
  prevBtn.addEventListener('click', function() {
    scrollCarousel('prev');
  });
  
  nextBtn.addEventListener('click', function() {
    scrollCarousel('next');
  });
  
  // Попап для увеличения
  const zoomButtons = document.querySelectorAll('.awards-gallery-zoom-btn');
  const popup = document.querySelector('.awards-gallery-popup');
  const popupImage = document.querySelector('.awards-gallery-popup-image');
  const closePopup = document.querySelector('.awards-gallery-popup-close');
  
  zoomButtons.forEach(button => {
    button.addEventListener('click', function() {
      const imgSrc = this.getAttribute('data-img');
      popupImage.src = imgSrc;
      popup.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  });
  
  closePopup.addEventListener('click', function() {
    popup.style.display = 'none';
    document.body.style.overflow = '';
  });
  
  popup.addEventListener('click', function(e) {
    if (e.target === this || e.target.classList.contains('awards-gallery-popup-overlay')) {
      popup.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && popup.style.display === 'block') {
      popup.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
});

  //отзыв
document.addEventListener('DOMContentLoaded', function() {
  // Элементы карусели
  const geoSmCarousel = document.querySelector('.geo-sm-reviews-carousel-wrapper');
  const geoSmPrevBtn = document.querySelector('.geo-sm-review-prev-btn');
  const geoSmNextBtn = document.querySelector('.geo-sm-review-next-btn');
  
  // Элементы попапа
  const geoSmVideoPopup = document.querySelector('.geo-sm-video-popup');
  const geoSmClosePopup = document.querySelector('.geo-sm-close-popup-btn');
  const geoSmVideoIframe = document.querySelector('.geo-sm-video-iframe-container iframe');
  const geoSmPlayButtons = document.querySelectorAll('.geo-sm-review-play-btn');
  
  // Навигация карусели
  geoSmPrevBtn.addEventListener('click', function() {
    geoSmCarousel.scrollBy({ left: -geoSmCarousel.offsetWidth * 0.8, behavior: 'smooth' });
  });
  
  geoSmNextBtn.addEventListener('click', function() {
    geoSmCarousel.scrollBy({ left: geoSmCarousel.offsetWidth * 0.8, behavior: 'smooth' });
  });
  
  // Открытие видео
  geoSmPlayButtons.forEach(button => {
    button.addEventListener('click', function() {
      const videoId = this.getAttribute('data-geo-video-id');
      geoSmVideoIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      geoSmVideoPopup.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });
  
  // Закрытие попапа
  geoSmClosePopup.addEventListener('click', function() {
    geoSmVideoPopup.style.display = 'none';
    geoSmVideoIframe.src = '';
    document.body.style.overflow = '';
  });
  
  // Закрытие по клику вне попапа
  geoSmVideoPopup.addEventListener('click', function(e) {
    if (e.target === this) {
      geoSmVideoPopup.style.display = 'none';
      geoSmVideoIframe.src = '';
      document.body.style.overflow = '';
    }
  });
  
  // Закрытие по ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && geoSmVideoPopup.style.display === 'flex') {
      geoSmVideoPopup.style.display = 'none';
      geoSmVideoIframe.src = '';
      document.body.style.overflow = '';
    }
  });
});

  // карусель проекты
document.addEventListener('DOMContentLoaded', function() {
  // Элементы карусели проектов
  const geoSmProjectsCarousel = document.querySelector('.geo-sm-projects-carousel-wrapper');
  const geoSmProjectsPrevBtn = document.querySelector('.geo-sm-projects-prev-btn');
  const geoSmProjectsNextBtn = document.querySelector('.geo-sm-projects-next-btn');
  
  // Навигация карусели
  geoSmProjectsPrevBtn.addEventListener('click', function() {
    geoSmProjectsCarousel.scrollBy({ left: -geoSmProjectsCarousel.offsetWidth * 0.8, behavior: 'smooth' });
  });
  
  geoSmProjectsNextBtn.addEventListener('click', function() {
    geoSmProjectsCarousel.scrollBy({ left: geoSmProjectsCarousel.offsetWidth * 0.8, behavior: 'smooth' });
  });
});

 // видео галерия
document.addEventListener('DOMContentLoaded', function() {
    const playButtons = document.querySelectorAll('.video-gallery-play-btn');
    const videoPopup = document.querySelector('.video-gallery-popup');
    const popupClose = document.querySelector('.video-gallery-popup-close');
    const popupIframe = videoPopup.querySelector('iframe');
    
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video-id');
            popupIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            videoPopup.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    popupClose.addEventListener('click', function() {
        popupIframe.src = '';
        videoPopup.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    videoPopup.querySelector('.video-gallery-popup-overlay').addEventListener('click', function() {
        popupIframe.src = '';
        videoPopup.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
});


 // новости
document.addEventListener('DOMContentLoaded', function() {
    const readMoreButtons = document.querySelectorAll('.news-read-more');
    const newsPopup = document.querySelector('.news-popup');
    const popupClose = document.querySelector('.news-popup-close');
    
    // Элементы для разных типов контента
    const textContent = document.querySelector('.news-popup-text-content');
    const videoContent = document.querySelector('.news-popup-video-content');
    const pdfContent = document.querySelector('.news-popup-pdf-content');
    
    // Текстовый контент
    const popupTitle = document.querySelector('.news-popup-title');
    const popupImage = document.querySelector('.news-popup-image');
    const popupDate = document.querySelector('.news-popup-date span');
    const popupText = document.querySelector('.news-popup-text');
    
    // Видео контент
    const videoTitle = document.querySelector('.news-popup-video-title');
    const videoIframe = document.querySelector('.news-popup-video-wrapper iframe');
    
    // PDF контент
    const pdfTitle = document.querySelector('.news-popup-pdf-title');
    const pdfIframe = document.querySelector('.news-popup-pdf-wrapper iframe');
    
    // Данные новостей
    const newsData = {
        1: {
            title: "Компания ИНТАГО Казахстан на выставке KazBuild2024",
            date: "07.11.2024",
            content: "<p>Мы рады сообщить о завершении строительства и запуске нового производственного цеха площадью 2500 кв.м.</p><p>Новый цех оснащен современным оборудованием и позволит нам увеличить объем производства на 40%.</p>",
            image: "images/news1-full.jpg"
        },
        2: {
            title: "Экскурсия по производству",
            videoId: "dQw4w9WgXcQ"
        },
        3: {
            title: "Каталог продукции 2023",
            pdfUrl: "catalog2023.pdf"
        }
    };
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const newsId = this.getAttribute('data-news-id');
            const contentType = this.getAttribute('data-content-type');
            const news = newsData[newsId];
            
            // Скрываем все контент-блоки
            textContent.style.display = 'none';
            videoContent.style.display = 'none';
            pdfContent.style.display = 'none';
            
            // Очищаем предыдущий контент
            videoIframe.src = '';
            pdfIframe.src = '';
            
            // Показываем соответствующий контент
            switch(contentType) {
                case 'text':
                    popupTitle.textContent = news.title;
                    popupDate.textContent = news.date;
                    popupText.innerHTML = news.content;
                    popupImage.src = this.getAttribute('data-image');
                    textContent.style.display = 'block';
                    break;
                    
                case 'video':
                    videoTitle.textContent = news.title;
                    videoIframe.src = `https://www.youtube.com/embed/${news.videoId}?autoplay=1`;
                    videoContent.style.display = 'block';
                    break;
                    
                case 'pdf':
                    pdfTitle.textContent = news.title;
                    pdfIframe.src = news.pdfUrl;
                    pdfContent.style.display = 'block';
                    break;
            }
            
            newsPopup.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    popupClose.addEventListener('click', function() {
        newsPopup.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Останавливаем видео при закрытии попапа
        videoIframe.src = '';
    });
    
    newsPopup.querySelector('.news-popup-overlay').addEventListener('click', function() {
        newsPopup.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Останавливаем видео при закрытии попапа
        videoIframe.src = '';
    });
});
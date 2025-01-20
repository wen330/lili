// 文章数据
const articles = [
    {
        title: "我的设计日记",
        summary: "分享我在UI设计领域的一些思考和经验...",
        image: "https://picsum.photos/800/400?random=1",
        link: "#",
        category: "设计"
    },
    {
        title: "生活碎片",
        summary: "记录生活中的美好瞬间...",
        image: "https://picsum.photos/800/400?random=2",
        link: "#",
        category: "生活"
    },
    {
        title: "旅行见闻",
        summary: "分享我的旅行故事和摄影作品...",
        image: "https://picsum.photos/800/400?random=3",
        link: "#",
        category: "随笔"
    }
];

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    initSwiper();
    initCategories();
    handleScroll();
});

// 初始化文章轮播
function initSwiper() {
    updateArticles('全部');
    
    const swiper = new Swiper('.swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 400,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 2,
            },
            1440: {
                slidesPerView: 3,
            }
        }
    });
}

// 初始化分类按钮
function initCategories() {
    const categories = document.querySelectorAll('.category');
    categories.forEach(category => {
        category.addEventListener('click', function() {
            categories.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            updateArticles(this.textContent);
        });
    });
}

// 更新文章列表
function updateArticles(category) {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    swiperWrapper.innerHTML = '';
    
    const filteredArticles = category === '全部' 
        ? articles 
        : articles.filter(article => article.category === category);
    
    filteredArticles.forEach(article => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = `
            <div class="article-card">
                <img src="${article.image}" alt="${article.title}">
                <h2>${article.title}</h2>
                <p>${article.summary}</p>
                <a href="${article.link}" class="read-more">阅读全文</a>
            </div>
        `;
        swiperWrapper.appendChild(slide);
    });
}

// 处理滚动效果
function handleScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// 导航栏活跃状态
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// 处理鼠标移动光效
document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    document.documentElement.style.setProperty('--mouse-x', `${clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${clientY}px`);
});

// 为标题文字添加动态内容
document.querySelectorAll('.gradient-text').forEach(text => {
    text.setAttribute('data-text', text.textContent);
});

// 添加视差效果
document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const moveX = (clientX - centerX) / 50;
    const moveY = (clientY - centerY) / 50;
    
    document.querySelector('.glowing-text').style.transform = 
        `translate(${moveX}px, ${moveY}px)`;
}); 
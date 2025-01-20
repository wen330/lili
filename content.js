// 文章列表数据
const articlesList = [
    {
        id: 1,
        title: "Notion AI-产品体验设计拆解",
        views: "3.5k",
        tags: ["AI产品", "用户体验", "设计分析"],
        date: "2024-03-20",
        link: "https://www.zcool.com.cn/work/ZNjU1OTE4MDg=.html"
    },
    {
        id: 2,
        title: "印象笔记AI-产品体验设计拆解",
        views: "3.2k",
        tags: ["AI应用", "产品设计", "体验分析"],
        date: "2024-03-15",
        link: "https://www.zcool.com.cn/work/ZNjU1ODA1NjA=.html"
    },
    {
        id: 3,
        title: "Notion文档-产品体验设计拆解",
        views: "2.8k",
        tags: ["文档工具", "协作设计", "用户体验"],
        date: "2024-03-10",
        link: "https://www.zcool.com.cn/work/ZNjU1MjYwNzY=.html"
    },
    {
        id: 4,
        title: "Notion-产品体验设计拆解",
        views: "2.5k",
        tags: ["产品分析", "设计系统", "用户体验"],
        date: "2024-03-05",
        link: "https://www.zcool.com.cn/work/ZNjU0NjM2NjA=.html"
    },
    {
        id: 5,
        title: "有道云笔记-产品体验设计拆解",
        views: "2.3k",
        tags: ["笔记工具", "产品分析", "用户体验"],
        date: "2024-03-01",
        link: "https://www.zcool.com.cn/work/ZNjUzNzAyMTY=.html"
    },
    {
        id: 6,
        title: "设计师工作流-规避风险篇",
        views: "2.1k",
        tags: ["工作流", "设计方法", "风险管理"],
        date: "2024-02-25",
        link: "https://www.zcool.com.cn/work/ZNjQ3ODUxMDQ=.html"
    }
];

// 文章摘要数据
const articleSummaries = {
    1: "深入分析Notion AI的产品体验设计，探讨其创新点和用户体验优化策略。",
    2: "解析印象笔记AI功能的设计思路，探讨AI如何提升笔记应用的用户体验。",
    3: "详细分析Notion文档功能的设计细节，探讨其如何提升协作效率。",
    4: "全面剖析Notion的产品设计理念，探讨其如何打造出色的用户体验。"
};

// 精选文章数据（显示前4篇）
const featuredArticles = articlesList.slice(0, 4).map(article => ({
    ...article,
    summary: articleSummaries[article.id],
    image: `https://picsum.photos/800/400?random=${article.id}`
}));

// 分页配置
const ITEMS_PER_PAGE = 5;
let currentPage = 1;

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    requestAnimationFrame(() => {
        initFeaturedSwiper();
        initArticlesList();
        initPaginationEvents();
    });
});

// 初始化精选文章轮播
function initFeaturedSwiper() {
    const swiperWrapper = document.querySelector('.featured-swiper .swiper-wrapper');
    
    // 使用 DocumentFragment 优化性能
    const fragment = document.createDocumentFragment();
    
    featuredArticles.forEach((article, index) => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.style.setProperty('--card-index', index);
        
        // 添加图片预加载
        const img = new Image();
        img.src = article.image;
        
        slide.innerHTML = `
            <a href="${article.link}" target="_blank" class="featured-card">
                <img src="${article.image}" alt="${article.title}" loading="lazy">
                <div class="featured-card-content">
                    <h3>${article.title}</h3>
                    <p>${article.summary}</p>
                </div>
            </a>
        `;
        fragment.appendChild(slide);
    });
    
    swiperWrapper.appendChild(fragment);

    new Swiper('.featured-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 24,
        mousewheel: {
            forceToAxis: true,
            sensitivity: 1.5,
            releaseOnEdges: true
        },
        keyboard: {
            enabled: true,
            onlyInViewport: true
        },
        grabCursor: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
            dragSize: 100,
            snapOnRelease: true,
            hide: false
        },
        slideToClickedSlide: true,
        resistance: true,
        resistanceRatio: 0.85,
        speed: 400,
        freeMode: {
            enabled: true,
            sticky: false,
            momentumRatio: 0.25,
            momentumVelocityRatio: 0.25
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 16
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 24
            },
            1440: {
                slidesPerView: 4,
                spaceBetween: 24
            }
        }
    });
}

// 初始化文章列表
function initArticlesList() {
    const articlesListContainer = document.querySelector('.articles-list');
    const fragment = document.createDocumentFragment();
    
    // 计算分页
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentArticles = articlesList.slice(startIndex, endIndex);
    
    // 清空现有内容
    articlesListContainer.innerHTML = `
        <div class="article-list-header">
            <span class="title-col">标题</span>
            <span class="views-col">阅读量</span>
            <span class="tags-col">标签</span>
            <span class="date-col">发布时间</span>
        </div>
    `;
    
    // 添加文章列表
    currentArticles.forEach(article => {
        const articleItem = document.createElement('div');
        articleItem.className = 'article-list-item';
        articleItem.innerHTML = `
            <a href="${article.link}" target="_blank" class="title">${article.title}</a>
            <div class="views">${article.views} 阅读</div>
            <div class="tags">
                ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="date">${article.date}</div>
        `;
        fragment.appendChild(articleItem);
    });
    
    articlesListContainer.appendChild(fragment);
    
    // 更新分页器
    updatePagination();
}

// 初始化分页事件
function initPaginationEvents() {
    const prevButton = document.querySelector('.pagination-prev');
    const nextButton = document.querySelector('.pagination-next');
    
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            initArticlesList();
            scrollToList();
        }
    });
    
    nextButton.addEventListener('click', () => {
        const totalPages = Math.ceil(articlesList.length / ITEMS_PER_PAGE);
        if (currentPage < totalPages) {
            currentPage++;
            initArticlesList();
            scrollToList();
        }
    });
}

// 平滑滚动到列表顶部
function scrollToList() {
    document.querySelector('.articles-list').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// 更新分页器
function updatePagination() {
    const totalPages = Math.ceil(articlesList.length / ITEMS_PER_PAGE);
    const paginationNumbers = document.querySelector('.pagination-numbers');
    const prevButton = document.querySelector('.pagination-prev');
    const nextButton = document.querySelector('.pagination-next');
    
    // 更新按钮状态
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
    
    // 生成页码
    paginationNumbers.innerHTML = '';
    
    // 添加省略号逻辑
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // 添加第一页
    if (startPage > 1) {
        addPageNumber(1);
        if (startPage > 2) {
            addEllipsis();
        }
    }
    
    // 添加中间页码
    for (let i = startPage; i <= endPage; i++) {
        addPageNumber(i);
    }
    
    // 添加最后一页
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            addEllipsis();
        }
        addPageNumber(totalPages);
    }
    
    function addPageNumber(pageNum) {
        const pageNumber = document.createElement('button');
        pageNumber.className = `pagination-number ${pageNum === currentPage ? 'active' : ''}`;
        pageNumber.textContent = pageNum;
        pageNumber.type = 'button';
        pageNumber.addEventListener('click', () => {
            if (currentPage !== pageNum) {
                currentPage = pageNum;
                initArticlesList();
                scrollToList();
            }
        });
        paginationNumbers.appendChild(pageNumber);
    }
    
    function addEllipsis() {
        const ellipsis = document.createElement('span');
        ellipsis.className = 'pagination-ellipsis';
        ellipsis.textContent = '...';
        ellipsis.setAttribute('aria-hidden', 'true');
        paginationNumbers.appendChild(ellipsis);
    }
} 
// Data loading functions

// Load analytics
function loadAnalytics() {
    $('.main-right__courses-total span').innerHTML = `${mockData.analytics.data.users_count}+`;
}

// Load sliders
function loadSliders() {
    const sliders = mockData.sliders;
    const htmls = sliders.data.map((item, index) => {
        return `
        <div id=${index} class="main-right__slider-item" style="--bg: ${item.data.props.style.background}${index != 0 ? ')' : ''};--color: ${item.data.props.style['--cta-hover-color']};">
            <div class="main-right__slider-item-left">
                <div class="main-right__slider-item-title">
                    ${item.title}
                </div>
                <div class="main-right__slider-item-description">
                    ${item.description}
                </div>
                <a class="main-right__slider-item-btn">
                    ${item.cta_title}
                </a>
            </div>
            <div class="main-right__slider-item-right">
                <img width="100%" src="${item.banner_cdn}" alt="">
            </div>
        </div>
        `;
    }).join('');
    $('.main-right__slider-track').innerHTML = htmls;

    let html = '';
    const length = sliders.data.length;
    for (let i = 0; i < length; i++) {
        html += `
            <div data-index=${i} class="main-right__slider-bar ${i ? '' : 'active'}"></div>
        `;
    }
    $('.main-right__slider-bars').innerHTML = html;
}

// Load courses
function loadCourses() {
    const courses = mockData.courses;
    let total = 0;
    const htmls = courses.data.map((item, index) => {
        total += item.students_count;
        return `
        <div class="main-right__item-item">
            <div class="main-right__item-item-img" style="background: url('${item.thumbnail_cdn}') center/cover no-repeat">
            </div>
            <div class="main-right__item-item-title">
                ${item.title}
            </div>
            <div class="main-right__item-item-view">
                <i class="fas fa-users"></i>
                <span>${numberWithDot(item.students_count)}</span>
            </div>
        </div>
        `;
    }).join('');
    $('.main-right__courses .main-right__item-wrap').innerHTML = htmls;
    $('.main-right__all-courses-list').innerHTML = htmls;
}

// Load blog posts
function loadBlogPosts() {
    const blog = mockData.blog;
    const today = new Date().getDate();
    const htmls = blog.data.map((item, index) => {
        return `
        <div class="main-right__item-item">
            <div class="main-right__item-item-img" style="background: url('${item.thumbnail_cdn}') center/cover no-repeat">
            </div>
            <div class="main-right__item-item-title title-blog">
                ${item.title}
            </div>
            <div class="main-right__item-item-info">
                <div class="main-right__item-item-profile">
                    <div class="main-right__item-item-profile__img">
                        <img width="100%" src="${item.user.avatar_cdn ? item.user.avatar_cdn : 
                            "./assests/img/avt.jpeg"}" alt="">
                    </div>
                    <div class="main-right__item-item-profile__name">
                        ${item.user.name}
                    </div>
                </div>
                •
                <div class="main-right__item-item-time">
                    ${today - item.published_at.slice(8, 10)} ngày trước
                </div>
            </div>
        </div>
        `;
    }).join('');
    $('.main-right__blog .main-right__item-wrap').innerHTML = htmls;
}

// Load videos
function loadVideos() {
    const videos = mockData.videos;
    const htmls = videos.data.map((item) => {
        return `
        <div class="main-right__item-item">
            <div class="main-right__item-item-img" style="background: url('${item.thumbnail_cdn}') center/cover no-repeat">
            </div>
            <div class="main-right__item-item-title title-blog">
                ${item.title}
            </div>
            
            <div class="main-right__item-item-social">
                <div class="main-right__item-item-social-group">
                    <div class="main-right__item-item-social-icon">
                        <i class="fas fa-eye"></i>
                    </div>
                    <div class="main-right__item-item-social-number">
                        ${numberWithDot(item.yt_view_count)}
                    </div>
                </div>
                <div class="main-right__item-item-social-group">
                    <div class="main-right__item-item-social-icon">
                        <i class="fas fa-thumbs-up"></i>
                    </div>
                    <div class="main-right__item-item-social-number">
                        ${numberWithDot(item.yt_like_count)}
                    </div>
                </div>
                <div class="main-right__item-item-social-group">
                    <div class="main-right__item-item-social-icon">
                        <i class="fas fa-comment"></i>
                    </div>
                    <div class="main-right__item-item-social-number">
                        ${numberWithDot(item.yt_comment_count)}
                    </div>
                </div>
            </div>
        </div>
        `;
    }).join('');
    $('.main-right__video .main-right__item-wrap').innerHTML = htmls;
}

// Load questions
function loadQuestions() {
    const questions = mockData.questions;
    const htmls = questionsToHTML(questions.data);
    $$('.main-right__questions .list')[0].innerHTML = htmls; // Highlight
    $$('.main-right__questions .list')[1].innerHTML = htmls; // Unanswered
    $$('.main-right__questions .list')[2].innerHTML = htmls; // All
}

// Load blog list
function loadBlogList() {
    const blog = mockData.blog;
    const htmls = blogToHTML(blog.data);
    $('.main-right__blog-all .list').innerHTML = htmls;
}

// Load code snippets
function loadCode() {
    const code = mockData.code; // Use dedicated code snippets data
    const htmls = codeToHTML(code.data);
    $('.main-right__code .list').innerHTML = htmls;
    hljs.highlightAll();
}

// Initialize all content
function initializeContent() {
    try {
        // Load basic data first
        loadAnalytics();
        loadSliders();
        loadCourses();
        
        // Load content sections
        loadBlogPosts();
        loadVideos();
        loadQuestions();
        loadBlogList();
        
        // Load code section last (requires syntax highlighting)
        loadCode();
    } catch (error) {
        console.error('Error initializing content:', error);
    }
}

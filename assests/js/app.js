const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

//API
const slidersAPI = 'https://api-gateway.fullstack.edu.vn/api/banners?placement=home&type=slideshow'
const coursesAPI = 'https://api-gateway.fullstack.edu.vn/api/courses/featured'
const blogAPI = 'https://api-gateway.fullstack.edu.vn/api/blog-posts/featured'
const videosAPI = 'https://api-gateway.fullstack.edu.vn/api/videos/featured'
const totalStudentAPI = 'https://api-gateway.fullstack.edu.vn/api/analytics'
const questionsAPI = 'https://api-gateway.fullstack.edu.vn/api/qa-posts?type=best&page='
const blogPostAPI = 'https://api-gateway.fullstack.edu.vn/api/blog-posts?page='
const codeAPI = 'https://api-gateway.fullstack.edu.vn/api/use-case-posts?page='

const numberWithDot = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
} 

fetch(totalStudentAPI)
    .then(studentsTotal => studentsTotal.json())
    .then(studentsTotal => {
        $('.main-right__courses-total span').innerHTML = `${studentsTotal.data.users_count}+`
    })
    .catch(err => alert("FAILURE"))

fetch(slidersAPI)
    .then(sliders => sliders.json())
    .then(sliders => {
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
            `
        }).join('')
        $('.main-right__slider-track').innerHTML = htmls

        let html = ''
        const length = sliders.data.length
        for (let i = 0; i < length; i++) {
            html += `
                <div data-index=${i} class="main-right__slider-bar ${i ? '' : 'active'}"></div>
            `
        }
        $('.main-right__slider-bars').innerHTML = html
    })
    .catch(err => alert('FAILURE'))

const sliders = (() => {
    const track = $('.main-right__slider-track')

    return {
        count: 0,
        gotoSlider(bars){
            track.style.transform = `translateX(${this.count * -100}%)`
            
            const barActive = $('.main-right__slider-bar.active')
            if (barActive) { barActive.classList.remove('active') }
            bars[this.count].classList.add('active')
        },
        next(btn){
            const bars = btn.parentElement.querySelectorAll('.main-right__slider-bar')
            this.count++
            if (this.count > bars.length - 1) {
                this.count = bars.length - 1
            }
            this.gotoSlider(bars)
        },
        prev(btn){
            const bars = btn.parentElement.querySelectorAll('.main-right__slider-bar')
            this.count--
            if (this.count < 0) {
                this.count = 0
            }
            this.gotoSlider(bars)
        },
        handle(){
            const list = $('.main-right__slider')
            list.onclick = e => {
                const btn = e.target.closest('.main-right__slider-btn')
                const bar = e.target.closest('.main-right__slider-bar')

                if (btn) {
                    if (btn.classList.contains('next-btn')) {
                        this.next(btn)
                    }

                    if (btn.classList.contains('prev-btn')) {
                        this.prev(btn)
                    }
                }

                if (bar) {
                    const bars = bar.parentElement.querySelectorAll('.main-right__slider-bar')
                    const id = Number.parseInt(bar.dataset.index)
                    this.count = id
                    this.gotoSlider(bars)
                }
            }


        },
        start(){
            this.handle()
        }
    }
})().start()

function distanceTime(string){
    const d = string.slice(8, 10)
    const m = string.slice(5, 7)
    const y = string.slice(0, 4)
    
    const today = new Date()
    const date = new Date(y, m - 1, d)
    const distance = Math.floor((today.getTime() / 1000 - date.getTime() / 1000) / 86400)
    
    return distance
}

//get course
fetch(coursesAPI)
    //<img src="${item.thumbnail_cdn}" alt="">
    .then(courses => courses.json())
    .then((courses) => {
        let total = 0
        const htmls = courses.data.map((item, index) => {
            total += item.students_count
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
            `
        }).join('')
        $('.main-right__courses .main-right__item-wrap').innerHTML = htmls
        $('.main-right__all-courses-list').innerHTML = htmls
    })
    .catch(err => alert('FAILURE'))


//get blog
fetch(blogAPI)
    .then(blog => blog.json())
    .then((blog) => {
        const today = new Date().getDate()
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
            `
        }).join('')
        $('.main-right__blog .main-right__item-wrap').innerHTML = htmls
    })
    .catch(err => alert('FAILURE'))

//get Video
fetch(videosAPI)
    .then(videos => videos.json())
    .then((videos) => {
        const today = new Date().getDate()
        const htmls = videos.data.map((item, index) => {
            
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
            `
        }).join('')
        $('.main-right__video .main-right__item-wrap').innerHTML = htmls
    })
    .catch(err => alert('FAILURE'))


function loopItem(arr, key) {
    const htmls = arr.map(item => {
        return `
        <div class="item-desc__tag">
            ${item[key]}
        </div>
        `
    }).join('')
    return htmls
}

//map question
function questionsToHTML(arr){
    const htmls = arr.map(item => {
        return `
        <li class="item">
            <div class="item-head">
                <div class="item-head__row">
                    <div class="item-head__left">
                        Front-end / Mobile Apps
                    </div>
                    <div class="item-head__right">
                        <div class="item-head__right-icon">
                            <i class="far fa-bookmark"></i>
                        </div>
                        <div class="item-head__right-icon more-btn">
                            <i class="fas fa-ellipsis-h"></i>
                            <div class="item-head__right-more">
                                <div class="item-head__right-item">
                                    <div class="item-head__right-item-icon">
                                        <i class="fab fa-facebook"></i>
                                    </div>
                                    <div class="item-head__right-item-text">
                                        Chia sẻ lên Facebook
                                    </div>
                                </div>
                                <div class="item-head__right-item">
                                    <div class="item-head__right-item-icon">
                                        <i class="fab fa-twitter"></i>
                                    </div>
                                    <div class="item-head__right-item-text">
                                        Chia sẻ lên Twitter
                                    </div>
                                </div>
                                <div class="item-head__right-item">
                                    <div class="item-head__right-item-icon">
                                        <i class="fas fa-envelope"></i>
                                    </div>
                                    <div class="item-head__right-item-text">
                                        Chia sẻ tới Email
                                    </div>
                                </div>
                                <div class="item-head__right-item">
                                    <div class="item-head__right-item-icon">
                                        <i class="fas fa-link"></i>
                                    </div>
                                    <div class="item-head__right-item-text">
                                        Sao chép liên kết
                                    </div>
                                </div>
                                <div class="item-head__right-item">
                                    <div class="item-head__right-item-icon">
                                        <i class="fas fa-flag"></i>
                                    </div>
                                    <div class="item-head__right-item-text">
                                        Báo cáo bài viết
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="item-head__row">
                    <h3 class="item-head__title">
                        ${item.title}
                    </h3>
                </div>
            </div>
            <div class="item-info">
                <div class="item-info__left">
                    <div class="item-info__avt">
                        <img onerror="this.src='./assests/img/avt.jpeg'" src="${item.user.avatar_cdn}" alt="">
                    </div>
                    <div class="item-info__text">
                        Đăng bởi
                        <span>
                            ${item.user.name}
                        </span>
                    </div>
                    ·
                    <div class="item-info__time">
                        <span>
                            ${distanceTime(item.updated_at)} ngày trước
                        </span>
                    </div>
                </div>
                <div class="item-info__right">
                    <div class="item-info__avt">
                        <img src="./assests/img/avt.jpeg" alt="">
                    </div>
                    <div class="item-info__text">
                        ${item.comments_count} trả lời
                    </div>
                </div>
            </div>
            <div class="item-desc">
                <div class="item-desc_row">
                    <div class="item-desc__text">
                        ${item.description}
                    </div>
                </div>
                <div class="item-desc_row">
                    <div class="item-desc__tags">
                        ${loopItem(item.selected_tags, 'name')}
                    </div>
                    <div class="item-desc__btn">
                        Chi tiết
                    </div>
                </div>
            </div>
        </li>
        `
    }).join('')
    return htmls
}
//map blog
function blogToHTML(arr) {
    const htmls = arr.map(item => {
        return `
        <li class="item">
            <div class="item-head">
                <div class="item-head__row">
                    <div class="item-head__left">
                        <div class="item-head__left-avt">
                            <img src="${item.user.avatar_cdn ? item.user.avatar_cdn : './assests/img/avt.jpeg'}" alt="">
                        </div>
                        <div class="item-head__left-name">
                            ${item.user.name}
                        </div>
                    </div>
                    <div class="item-head__right">
                        <div class="item-head__right-icon">
                            <i class="far fa-bookmark"></i>
                        </div>
                        <div class="item-head__right-icon more-btn">
                            <i class="fas fa-ellipsis-h"></i>
                            <div class="item-head__right-more">
                                <div class="item-head__right-item">
                                    <div class="item-head__right-item-icon">
                                        <i class="fab fa-facebook"></i>
                                    </div>
                                    <div class="item-head__right-item-text">
                                        Chia sẻ lên Facebook
                                    </div>
                                </div>
                                <div class="item-head__right-item">
                                    <div class="item-head__right-item-icon">
                                        <i class="fab fa-twitter"></i>
                                    </div>
                                    <div class="item-head__right-item-text">
                                        Chia sẻ lên Twitter
                                    </div>
                                </div>
                                <div class="item-head__right-item">
                                    <div class="item-head__right-item-icon">
                                        <i class="fas fa-envelope"></i>
                                    </div>
                                    <div class="item-head__right-item-text">
                                        Chia sẻ tới Email
                                    </div>
                                </div>
                                <div class="item-head__right-item">
                                    <div class="item-head__right-item-icon">
                                        <i class="fas fa-link"></i>
                                    </div>
                                    <div class="item-head__right-item-text">
                                        Sao chép liên kết
                                    </div>
                                </div>
                                <div class="item-head__right-item">
                                    <div class="item-head__right-item-icon">
                                        <i class="fas fa-flag"></i>
                                    </div>
                                    <div class="item-head__right-item-text">
                                        Báo cáo bài viết
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item-info">
                <div class="item-info__left">
                    <h3 class="item-info__left-title">
                        ${item.title}
                    </h3>
                    <div class="item-desc__text">
                        ${item.meta_description}
                    </div>
                    <div class="item-info__left-more">
                        <div class="item-info__left-time">
                            ${distanceTime(item.published_at)} ngày trước
                        </div>
                        ·
                        <div class="item-info__left-read">
                            ${item.min_read} phút đọc
                        </div>
                    </div>
                </div>
                <div class="item-info__right">
                    <div class="item-info__right-img" style="background: url('${item.thumbnail_cdn}') center/cover no-repeat">

                    </div>
                </div>
            </div>
            
        </li>
        `
    }).join('')
    return htmls
}
//map code
function codeToHTML(arr) {
    const htmls = arr.map(item => {
        return `
        <li class="item">
            <div class="item-head">
                <div class="item-head__row">
                    <h3 class="item-head__title">
                        ${item.title}
                    </h3>
                </div>
                <div class="item-head__row">
                    <div class="item-head__left">
                        <div class="item-head__left-avt">
                            <img src="${item.user.avatar_cdn ? item.user.avatar_cdn : './assests/img/avt.jpeg'}" alt="">
                        </div>
                        <div class="item-head__left-name">
                            ${item.user.name}
                        </div>
                        ·
                        <div class="item-head__left-time">
                            ${distanceTime(item.updated_at)} ngày trước
                        </div>
                    </div>
                    <div class="item-head__right">
                        <div class="item-head__right-icon">
                            <i class="far fa-bookmark"></i>
                        </div>
                        <div class="item-head__right-icon more-btn">
                            <i class="fas fa-ellipsis-h"></i>
                            <div class="item-head__right-more">
                                <div class="item-head__right-item">
                                    <div class="item-head__right-item-icon">
                                        <i class="fab fa-facebook"></i>
                                    </div>
                                    <div class="item-head__right-item-text">
                                        Chia sẻ lên Facebook
                                    </div>
                                </div>
                                <div class="item-head__right-item">
                                    <div class="item-head__right-item-icon">
                                        <i class="fab fa-twitter"></i>
                                    </div>
                                    <div class="item-head__right-item-text">
                                        Chia sẻ lên Twitter
                                    </div>
                                </div>
                                <div class="item-head__right-item">
                                    <div class="item-head__right-item-icon">
                                        <i class="fas fa-envelope"></i>
                                    </div>
                                    <div class="item-head__right-item-text">
                                        Chia sẻ tới Email
                                    </div>
                                </div>
                                <div class="item-head__right-item">
                                    <div class="item-head__right-item-icon">
                                        <i class="fas fa-link"></i>
                                    </div>
                                    <div class="item-head__right-item-text">
                                        Sao chép liên kết
                                    </div>
                                </div>
                                <div class="item-head__right-item">
                                    <div class="item-head__right-item-icon">
                                        <i class="fas fa-flag"></i>
                                    </div>
                                    <div class="item-head__right-item-text">
                                        Báo cáo bài viết
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item-code">
                <div class="item-code__wrap">
                    <pre>
                        <code class="language-js">
                            ${splitString(item.content, true, false)}
                        </code>
                    </pre>
                </div>
                <div class="item-code__desc">
                    ${splitString(item.content, false, true)}
                </div>
            </div>
        </li>
        `
    }).join('')
    return htmls
}

//get questions
fetch(questionsAPI + '1')
    .then(questions => questions.json())
    .then(questions => {
        const htmls = questionsToHTML(questions.data)
        $('.main-right__questions .list').innerHTML = htmls
    })
    .catch(err => alert('FAILURE'))

//get blog
fetch(blogPostAPI + '1')
    .then(blog => blog.json())
    .then(blog => {
        const htmls = blogToHTML(blog.data)
        $('.main-right__blog-all .list').innerHTML = htmls
    })
    .catch(err => alert('FAILURE'))

//split code
function splitString(string, string1, string2) {
    if (string2) {
        return string.slice(string.indexOf("```", 4) + 3)
    }
    if (string1) {
        return string.slice(0, string.indexOf("```", 4)).replace("```", '').trim().slice(2)
    }
}

//get code
fetch(codeAPI + '1')
    .then(code => code.json())
    .then(code => {
        const htmls = codeToHTML(code.data)
        $('.main-right__code .list').innerHTML = htmls
        hljs.highlightAll();
    })
    .catch(err => alert('FAILURE'))

const app = (() => {


    return {
        handle(){
            const nextBtns = $$('.main-right__item-btn.next-btn')
            const prevBtns = $$('.main-right__item-btn.prev-btn')

            //prev next btn
            nextBtns.forEach(item => {
                item.onclick = function(){
                    const wrap = this.parentElement.querySelector('.main-right__item-wrap')
                    const scrollLeft = wrap.scrollLeft += 600
    
                    wrap.scroll({
                        left: scrollLeft,
                    })
                }
            })
            prevBtns.forEach(item => {
                item.onclick = function(){
                    const wrap = this.parentElement.querySelector('.main-right__item-wrap')
                    const scrollLeft = wrap.scrollLeft -= 600
    
                    wrap.scroll({
                        left: scrollLeft,
                    })
                }
            })

            //back home
            const backBtn = $('.header-left__back')
            const headingLeft = $('.header-left')
            const components = $$('.main-right > div')
            const leftLayoutList = $$('.main-left__item')
            const itemsMenumobile = $$('.menu-mobile__item')

            activeComponent = (item) => {
                const activeItem = $('.main-right > div.active')
                if (activeItem) { activeItem.classList.remove('active') }
                components.forEach(component => {
                    if (component.classList.contains(item)) {
                        component.classList.add('active')
                        window.scroll({
                            top: 0,
                        })
                    }
                })
            }
            activeLeftLayout = (x) => {
                x == 'home' ? headingLeft.classList.remove('back') : headingLeft.classList.add('back')
                const activeItem = $('.main-left__item.active')
                if (activeItem) { activeItem.classList.remove('active') }
                leftLayoutList.forEach(item => {
                    if (item.id == x) {
                        item.classList.add('active')
                    }
                })
            }
            activeMobile = (x) => {
                const activeItem = $('.menu-mobile__item.active')
                if (activeItem) { activeItem.classList.remove('active') }
                itemsMenumobile.forEach(item => {
                    if (item.classList.contains(x)) {
                        item.classList.add('active')
                        
                    }
                })
            }

            backBtn.onclick = () => {
                headingLeft.classList.remove('back')
                activeComponent('home')
                activeLeftLayout('home')
                activeMobile('home')
            }

            //menu left layout
            leftLayoutList.forEach(item => {
                item.onclick = function(){
                    activeLeftLayout(item.id)
                    activeComponent(item.id)
                    activeMobile(item.id)
                }
            })

            //plus left layout
            const addPost = $('.main-left__plus')
            addPost.onclick = function(){
                const list = addPost.querySelector('.main-left__plus-list')
                list.classList.toggle('active')
                this.classList.toggle('active')
            }

            //menu mobile
            itemsMenumobile.forEach(item => {
                item.onclick = function(){
                    activeMobile(item.classList[0])
                    activeComponent(item.classList[0])
                    activeLeftLayout(item.classList[0])
                    hideMenuMobile()
                }
            })

            //more
            const list = $$('.list')
            list.forEach(item => {
                item.onclick = (e) => {
                    const moreBtn = e.target.closest('.item-head__right-icon.more-btn')
                    
                    if (moreBtn) {
                        const moreList = moreBtn.querySelector('.item-head__right-more')
                        moreList.classList.toggle('active')
                    }
                }
            })

            //menu mobile
            const toggle = $('.header-toggle')
            const menuMobile = $('.menu-mobile')
            const overplay = $('.overplay')

            function showMenuMobile(){
                menuMobile.classList.add('active')
                overplay.style.display = 'block'
                document.body.style.overflow = 'hidden'
            }
            function hideMenuMobile(){
                menuMobile.classList.remove('active')
                overplay.style.display = 'none'
                document.body.style.overflow = 'auto'

            }

            toggle.onclick = showMenuMobile
            overplay.onclick = hideMenuMobile

            //scroll -> load
            const loadMoreList = $$('.load-more')
            let questionCount = blogCount = 2
            window.onscroll = () => {
                const scrollTop = window.scrollY + window.innerHeight - $('.header').offsetHeight
                loadMoreList.forEach((component) => {
                    if (component.classList.contains('active')) {
                        //questions 20 page
                        if (component.classList.contains('questions') && questionCount <= 20) {
                            const distance = scrollTop - component.offsetHeight
                            if (distance == 0) {
                                fetch(questionsAPI + questionCount)
                                    .then(questions => questions.json())
                                    .then(questions => {
                                        const htmls = questionsToHTML(questions.data)
                                        $('.main-right__questions .list').insertAdjacentHTML('beforeend', htmls)
                                        questionCount++
                                    })
                                .catch(err => alert('FAILURE'))
                            }
                        }

                        //blog 6 page
                        if (component.classList.contains('blog') && blogCount <= 6) {
                            const distance = scrollTop - component.offsetHeight
                            console.log(distance)
                            console.log(window.innerHeight)
                            if (distance == 0) {
                                fetch(blogPostAPI + blogCount)
                                    .then(blog => blog.json())
                                    .then(blog => {
                                        const htmls = blogToHTML(blog.data)
                                        $('.main-right__blog-all .list').insertAdjacentHTML('beforeend', htmls)
                                        blogCount++
                                    })
                                    .catch(err => alert('FAILURE'))
                            }
                        }
                    }
                })
            }

        },
        start(){
            this.handle()
        }
    }
})().start()
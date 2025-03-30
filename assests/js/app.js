const app = (() => {
    return {
        handle() {
            const nextBtns = $$('.main-right__item-btn.next-btn');
            const prevBtns = $$('.main-right__item-btn.prev-btn');

            //prev next btn
            nextBtns.forEach(item => {
                item.onclick = function() {
                    const wrap = this.parentElement.querySelector('.main-right__item-wrap');
                    const scrollLeft = wrap.scrollLeft += 600;
                    wrap.scroll({
                        left: scrollLeft,
                    });
                }
            });

            prevBtns.forEach(item => {
                item.onclick = function() {
                    const wrap = this.parentElement.querySelector('.main-right__item-wrap');
                    const scrollLeft = wrap.scrollLeft -= 600;
                    wrap.scroll({
                        left: scrollLeft,
                    });
                }
            });

            //back home
            const backBtn = $('.header-left__back');
            const headingLeft = $('.header-left');
            const components = $$('.main-right > div');
            const leftLayoutList = $$('.main-left__item');
            const itemsMenumobile = $$('.menu-mobile__item');

            const activeComponent = (item) => {
                const activeItem = $('.main-right > div.active');
                if (activeItem) { activeItem.classList.remove('active'); }
                components.forEach(component => {
                    if (component.classList.contains(item)) {
                        component.classList.add('active');
                        window.scroll({
                            top: 0,
                        });
                    }
                });
            }

            const activeLeftLayout = (x) => {
                x == 'home' ? headingLeft.classList.remove('back') : headingLeft.classList.add('back');
                const activeItem = $('.main-left__item.active');
                if (activeItem) { activeItem.classList.remove('active'); }
                leftLayoutList.forEach(item => {
                    if (item.id == x) {
                        item.classList.add('active');
                    }
                });
            }

            const activeMobile = (x) => {
                const activeItem = $('.menu-mobile__item.active');
                if (activeItem) { activeItem.classList.remove('active'); }
                itemsMenumobile.forEach(item => {
                    if (item.classList.contains(x)) {
                        item.classList.add('active');
                    }
                });
            }

            backBtn.onclick = () => {
                headingLeft.classList.remove('back');
                activeComponent('home');
                activeLeftLayout('home');
                activeMobile('home');
            }

            //menu left layout
            leftLayoutList.forEach(item => {
                item.onclick = function() {
                    activeLeftLayout(item.id);
                    activeComponent(item.id);
                    activeMobile(item.id);
                }
            });

            //plus left layout
            const addPost = $('.main-left__plus');
            addPost.onclick = function() {
                const list = addPost.querySelector('.main-left__plus-list');
                list.classList.toggle('active');
                this.classList.toggle('active');
            }

            //menu mobile
            itemsMenumobile.forEach(item => {
                item.onclick = function() {
                    activeMobile(item.classList[0]);
                    activeComponent(item.classList[0]);
                    activeLeftLayout(item.classList[0]);
                    hideMenuMobile();
                }
            });

            //share
            const list = $$('.list');
            list.forEach(item => {
                item.onclick = (e) => {
                    const moreBtn = e.target.closest('.item-head__right-icon.more-btn');
                    if (moreBtn) {
                        const moreList = moreBtn.querySelector('.item-head__right-more');
                        moreList.classList.toggle('active');
                    }
                }
            });

            //mobile menu toggle
            const toggle = $('.header-toggle');
            const menuMobile = $('.menu-mobile');
            const overplay = $('.overplay');

            function showMenuMobile() {
                menuMobile.classList.add('active');
                overplay.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }

            function hideMenuMobile() {
                menuMobile.classList.remove('active');
                overplay.style.display = 'none';
                document.body.style.overflow = 'auto';
            }

            toggle.onclick = showMenuMobile;
            overplay.onclick = hideMenuMobile;

            //question filter
            const questionFilter = $$('.main-right__questions .questions-left__filter-type');
            const questionList = $$('.main-right__questions .list');
            questionFilter.forEach((item, index) => {
                item.onclick = function() {
                    const activeItem = $('.main-right__questions .questions-left__filter-type.active');
                    if (activeItem) { activeItem.classList.remove('active'); }
                    item.classList.add('active');

                    const activeList = $('.main-right__questions .list.active');
                    if (activeList) { activeList.classList.remove('active'); }
                    questionList[index].classList.add('active');
                }
            });

            //handle header/footer visibility on scroll
            window.onscroll = () => {
                const scrollTop = window.scrollY;
                const codeActive = $('.main-left__item[id="code"].active');
                if (codeActive && scrollTop > 100) {
                    $('.header').classList.add('hide');
                    $('.footer').classList.add('hide');
                } else {
                    $('.header').classList.remove('hide');
                    $('.footer').classList.remove('hide');
                }
            }
        },

        start() {
            // Initialize content
            initializeContent();
            
            // Initialize UI handlers
            this.handle();
            
            // Initialize slider
            slider.init();
        }
    }
})().start();
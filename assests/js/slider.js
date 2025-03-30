// Slider functionality
const slider = {
    count: 0,
    
    gotoSlider(bars) {
        const track = $('.main-right__slider-track');
        track.style.transform = `translateX(${this.count * -100}%)`;
        
        const barActive = $('.main-right__slider-bar.active');
        if (barActive) { barActive.classList.remove('active'); }
        bars[this.count].classList.add('active');
    },

    next(btn) {
        const bars = btn.parentElement.querySelectorAll('.main-right__slider-bar');
        this.count++;
        if (this.count > bars.length - 1) {
            this.count = bars.length - 1;
        }
        this.gotoSlider(bars);
    },

    prev(btn) {
        const bars = btn.parentElement.querySelectorAll('.main-right__slider-bar');
        this.count--;
        if (this.count < 0) {
            this.count = 0;
        }
        this.gotoSlider(bars);
    },

    handle() {
        const list = $('.main-right__slider');
        if (!list) return;

        list.onclick = e => {
            const btn = e.target.closest('.main-right__slider-btn');
            const bar = e.target.closest('.main-right__slider-bar');

            if (btn) {
                if (btn.classList.contains('next-btn')) {
                    this.next(btn);
                }

                if (btn.classList.contains('prev-btn')) {
                    this.prev(btn);
                }
            }

            if (bar) {
                const bars = bar.parentElement.querySelectorAll('.main-right__slider-bar');
                const id = Number.parseInt(bar.dataset.index);
                this.count = id;
                this.gotoSlider(bars);
            }
        }
    },

    autoPlay() {
        const bars = $$('.main-right__slider-bar');
        if (!bars.length) return;

        setInterval(() => {
            this.count++;
            if (this.count >= bars.length) {
                this.count = 0;
            }
            this.gotoSlider(bars);
        }, 5000);
    },

    init() {
        this.handle();
        this.autoPlay();
    }
};
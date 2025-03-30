// UI Components rendering functions

// Questions component
function questionsToHTML(arr) {
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
                                ${sharedComponents.socialShareMenu()}
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

// Blog component
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
                                ${sharedComponents.socialShareMenu()}
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

// Code component
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
                                ${sharedComponents.socialShareMenu()}
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

// Shared components
const sharedComponents = {
    socialShareMenu: () => `
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
    `
}
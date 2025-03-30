// Utility functions

// DOM helpers
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

// Format number with dots
const numberWithDot = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

// Calculate time distance
function distanceTime(string) {
    const d = string.slice(8, 10)
    const m = string.slice(5, 7)
    const y = string.slice(0, 4)
    
    const today = new Date()
    const date = new Date(y, m - 1, d)
    const distance = Math.floor((today.getTime() / 1000 - date.getTime() / 1000) / 86400)
    
    return distance
}

// Handle array items with template
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

// Split code content
function splitString(string, string1, string2) {
    if (!string) return '';
    
    if (string2) {
        const index = string.indexOf("```", 4);
        return index !== -1 ? string.slice(index + 3) : string;
    }
    if (string1) {
        const index = string.indexOf("```", 4);
        return index !== -1 ? string.slice(0, index).replace("```", '').trim().slice(2) : string;
    }
    return string;
}
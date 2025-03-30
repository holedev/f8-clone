const mockData = {
    sliders: {
        data: [
            {
                title: "HTML CSS Pro",
                description: "Học HTML CSS từ zero đến hero",
                cta_title: "Học Ngay",
                banner_cdn: "./assests/img/Slider/Slider-1.png",
                data: {
                    props: {
                        style: {
                            background: "linear-gradient(to right, rgb(40, 119, 250), rgb(103, 23, 205)",
                            "--cta-hover-color": "#2877fa"
                        }
                    }
                }
            },
            {
                title: "Responsive Web Design",
                description: "Học Responsive Web Design từ cơ bản đến nâng cao",
                cta_title: "Học Ngay", 
                banner_cdn: "./assests/img/Slider/slider-2.png",
                data: {
                    props: {
                        style: {
                            background: "linear-gradient(to right, rgb(118, 18, 255), rgb(5, 178, 255)",
                            "--cta-hover-color": "#7612ff"
                        }
                    }
                }
            },
            {
                title: "JavaScript Pro",
                description: "Khóa học JavaScript từ cơ bản đến chuyên sâu",
                cta_title: "Học Ngay",
                banner_cdn: "./assests/img/Slider/Slider-3.png",
                data: {
                    props: {
                        style: {
                            background: "linear-gradient(to right, rgb(254, 33, 94), rgb(255, 148, 2)",
                            "--cta-hover-color": "#fe215e"
                        }
                    }
                }
            }
        ]
    },
    courses: {
        data: [
            {
                title: "HTML CSS Pro",
                thumbnail_cdn: "./assests/img/course-1.png",
                students_count: 12389
            },
            {
                title: "JavaScript Pro",
                thumbnail_cdn: "./assests/img/course-1.png", 
                students_count: 8234
            },
            {
                title: "ReactJS Pro",
                thumbnail_cdn: "./assests/img/course-1.png",
                students_count: 6129
            }
        ]
    },
    blog: {
        data: [
            {
                title: "Cách xây dựng website responsive",
                thumbnail_cdn: "./assests/img/course-1.png",
                meta_description: "Học cách xây dựng website responsive từ A-Z",
                min_read: 8,
                published_at: "2024-03-25",
                user: {
                    name: "Sơn Đặng",
                    avatar_cdn: "./assests/img/avt.jpeg"
                }
            },
            {
                title: "Tìm hiểu về JavaScript Modern",
                thumbnail_cdn: "./assests/img/course-1.png",
                meta_description: "JavaScript hiện đại và các tính năng mới",
                min_read: 10,
                published_at: "2024-03-26",
                user: {
                    name: "Sơn Đặng",
                    avatar_cdn: "./assests/img/avt.jpeg"
                }
            }
        ]
    },
    videos: {
        data: [
            {
                title: "Học HTML CSS trong 6 giờ",
                thumbnail_cdn: "./assests/img/course-1.png",
                yt_view_count: 152345,
                yt_like_count: 12452,
                yt_comment_count: 834
            },
            {
                title: "JavaScript cơ bản cho người mới",
                thumbnail_cdn: "./assests/img/course-1.png",
                yt_view_count: 98234,
                yt_like_count: 8945,
                yt_comment_count: 623
            }
        ]
    },
    analytics: {
        data: {
            users_count: 89234
        }
    },
    questions: {
        data: [
            {
                title: "Học lập trình web nên bắt đầu từ đâu?",
                description: "Mình mới học lập trình, không biết nên bắt đầu từ đâu?",
                updated_at: "2024-03-20",
                comments_count: 15,
                selected_tags: [
                    { name: "HTML" },
                    { name: "CSS" },
                    { name: "JavaScript" }
                ],
                user: {
                    name: "Học Viên F8",
                    avatar_cdn: "./assests/img/avt.jpeg"
                }
            }
        ]
    },
    code: {
        data: [
            {
                title: "Kiểm tra số nguyên tố trong JavaScript",
                content: "```js\nfunction isPrime(n) {\n  if (n < 2) return false;\n  for(let i = 2; i <= Math.sqrt(n); i++) {\n    if (n % i === 0) return false;\n  }\n  return true;\n}\n```\nHàm kiểm tra số nguyên tố trong JavaScript",
                updated_at: "2024-03-28",
                user: {
                    name: "Sơn Đặng",
                    avatar_cdn: "./assests/img/avt.jpeg"
                }
            },
            {
                title: "Hàm sắp xếp mảng đơn giản",
                content: "```js\nfunction bubbleSort(arr) {\n  for(let i = 0; i < arr.length; i++) {\n    for(let j = 0; j < arr.length - i - 1; j++) {\n      if(arr[j] > arr[j+1]) {\n        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];\n      }\n    }\n  }\n  return arr;\n}\n```\nThuật toán sắp xếp nổi bọt cơ bản",
                updated_at: "2024-03-27",
                user: {
                    name: "Sơn Đặng",
                    avatar_cdn: "./assests/img/avt.jpeg"
                }
            }
        ]
    }
};
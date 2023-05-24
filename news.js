document.getElementById("spinner").style.display="none";
let allNewsOfCertainCategoryObject;
const loadNewsCategory = () => {
    document.getElementById("spinner").style.display="block";
    fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => {
        // console.log(data.data.news_category);
        //here i used ternary operator for handling null value
        showNewsCategory(data.data.news_category?data.data.news_category:null);
    })
};
const showNewsCategory = (News) => {
    // console.log(News);
    document.getElementById("spinner").style.display="none";
    const categoryName = document.getElementById("categoryOfNews");
    const navLinkContainer = document.getElementById("navlinkContainer");
    categoryName.innerHTML = "";
    News.forEach((category) => {
        categoryName.innerHTML +=`
            <button class="nav-link" onclick="loadNewsOfCertainCategory('${category.category_id?category.category_id:null}','${category.category_name}')">${category.category_name}</button>
        `
    });
    News.forEach((category) => {
        navLinkContainer.innerHTML +=`
            <button class="nav-link d-block d-md-none" onclick="loadNewsOfCertainCategory('${category.category_id?category.category_id:null}','${category.category_name?category.category_name:null}')">${category.category_name}</button>
        `
    });
};
const loadNewsOfCertainCategory = (id,categoryName) => {
    document.getElementById("spinner").style.display="block";
    // console.log(id);
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
        // console.log(data.data);
        showNewsOfCertainCategory(data.data,categoryName);
        allNewsOfCertainCategoryObject = data.data;
    })
};
const showNewsOfCertainCategory = (allNewsOfCertaincategory,categoryName) => {
    document.getElementById("spinner").style.display="none";
    // console.log(allNewsOfCertaincategory);
    const alertMessage = document.getElementById("total-news-with-alert-msg");
    alertMessage.innerHTML = "";
    alertMessage.innerHTML += `
        <div class="alert alert-light" role="alert">
            ${allNewsOfCertaincategory.length} items found for category ${categoryName}
        </div>
    `
    const shortByValue = document.getElementById("shortByValue");
    shortByValue.innerHTML = "";
    shortByValue.innerHTML += `
        <div class="dropdown">
            <button class="btn btn-primary dropdown-toggle" type="button"     data-bs-toggle="dropdown" aria-expanded="false">
                    Short By
            </button>
            <ul class="dropdown-menu dropdown-menu-dark">
                <li><a class="dropdown-item" href="#" onclick="showNewsShortedByTrending()">Trending</a></li>
                <li><a class="dropdown-item" href="#" onclick="showNewsShortedByTodaysPick()">Todays Pick</a></li>
                <li><a class="dropdown-item" href="#" onclick="showNewsShortedByMostViewed()">Most Viewed</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#" onclick="showNewsShortedByOnlyTrending()">Only Trending News</a></li>
            </ul>
        </div>
    `

    const news = document.getElementById("allNewsOfCertaincategory");
    news.innerHTML = "";
    allNewsOfCertaincategory.forEach((information) => {
        news.innerHTML += `
            <div class="card mb-3">
                <div class="row g-0">

                    <div class="col-md-4 d-none d-md-block">
                        <img src=${information.thumbnail_url ? information.thumbnail_url:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fimage-not-found-icon&psig=AOvVaw1tCym9v-bR73cirASyQ1Zd&ust=1684825221014000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLDL15itiP8CFQAAAAAdAAAAABAE"} class="img-fluid rounded-start" alt="...">
                    </div>
                    
                    <div class="col-md-4 d-block d-md-none">
                        <img src=${information.image_url ? information.image_url:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fimage-not-found-icon&psig=AOvVaw1tCym9v-bR73cirASyQ1Zd&ust=1684825221014000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLDL15itiP8CFQAAAAAdAAAAABAE"} class="img-fluid rounded-start" alt="...">
                    </div>

                    <div class="col-md-8">
                        <div class="card-body">
                        <h5 class="card-title">${information.title}</h5>
                        <p class="card-text">${information.details.slice(0,150)}</p>
                        <div class="alert alert-warning" role="alert">
                            ${information.total_view?information.total_view:0} people watched it
                        </div>
                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick=loadNewsDetails('${information._id?information._id:`
                        <div class="alert alert-primary d-flex align-items-center" role="alert">
                            <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                            </svg>
                            <div>
                                404 News id not FOUND!
                            </div>
                        </div>
                        `}')>
                            Details
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        `
    })
};
const loadNewsDetails = (id) => {
    document.getElementById("spinner").style.display="block";
    // console.log(newsDetails);
    fetch(`https://openapi.programming-hero.com/api/news/${id}`)
    .then((res) => res.json())
    .then((data) => {
        // console.log(data.data[0]._id);
        showNewsDetails(data.data?data.data[0]:null);
    })
};
const showNewsDetails = (information) => {
    document.getElementById("spinner").style.display="none";
    // console.log(information.total_view);
    const newsDetails = document.getElementById("newsDetailsModal");
    const newstitle = document.getElementById("staticBackdropLabel");
    newsDetails.innerHTML = "";
    newstitle.innerHTML = "";
    newstitle.innerHTML += `    
        ${information.title} <span class="badge text-bg-info">${information.others_info.is_trending?"Trending":"Not Trending"}
        </span> <span class="badge text-bg-info">${information.others_info.is_todays_pick?"Todays Pick":"Not Todays Pick"}
        </span>
    `
    newsDetails.innerHTML += `
        <div>
            <img style="display:block;margin-left: auto;margin-right: auto;
            width: 100%;" src= ${information.image_url ? information.image_url:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fimage-not-found-icon&psig=AOvVaw1tCym9v-bR73cirASyQ1Zd&ust=1684825221014000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLDL15itiP8CFQAAAAAdAAAAABAE"}>
            <div class="col-12">
                <div class="card-body">
                    <p class="card-text">${information.details}</p>
                </div>
            </div>
        </div>
    `
};
const showNewsShortedByTrending = () => {
    //here allNewsOfCertainCategoryObject is an array of object
    //jodi a parameter ta b er age dekhaite cai tahole a er jonno return -1,ar b age dekhaite caile return 1,2 ta shoman hoile return 0 
    allNewsOfCertainCategoryObject.sort(byTrending)//Shorting by comparator short function
    function byTrending(a,b){
        if(a.others_info.is_trending) return -1;
        else if(b.others_info.is_trending) return 1;
        else{
            //when a,b both are not trending,in that case which one has more view will be appeared first
            if(a.total_view > b.total_view) return -1;
            else if(b.total_view > a.total_view) return 1;
            else 0;
        }
    }
    const news = document.getElementById("allNewsOfCertaincategory");
    news.innerHTML = "";
    allNewsOfCertainCategoryObject.forEach((information) => {
        news.innerHTML += `
            <div class="card mb-3">
                <div class="row g-0">

                    <div class="col-md-4 d-none d-md-block">
                        <img src=${information.thumbnail_url ? information.thumbnail_url:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fimage-not-found-icon&psig=AOvVaw1tCym9v-bR73cirASyQ1Zd&ust=1684825221014000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLDL15itiP8CFQAAAAAdAAAAABAE"} class="img-fluid rounded-start" alt="...">
                    </div>
                    
                    <div class="col-md-4 d-block d-md-none">
                        <img src=${information.image_url ? information.image_url:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fimage-not-found-icon&psig=AOvVaw1tCym9v-bR73cirASyQ1Zd&ust=1684825221014000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLDL15itiP8CFQAAAAAdAAAAABAE"} class="img-fluid rounded-start" alt="...">
                    </div>

                    <div class="col-md-8">
                        <div class="card-body">
                        <h5 class="card-title">${information.title}</h5>
                        <p class="card-text">${information.details.slice(0,150)}</p>
                        <div class="alert alert-warning" role="alert">
                            ${information.total_view?information.total_view:0} people watched it
                        </div>
                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick=loadNewsDetails('${information._id?information._id:`
                        <div class="alert alert-primary d-flex align-items-center" role="alert">
                            <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                            </svg>
                            <div>
                                404 News id not FOUND!
                            </div>
                        </div>
                        `}')>
                            Details
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        `
    })
};
const showNewsShortedByTodaysPick = () => {
    //here allNewsOfCertainCategoryObject is an array of object 
    allNewsOfCertainCategoryObject.sort(byTodayspick)
    function byTodayspick(a,b) {
        if(a.others_info.is_todays_pick) return -1;
        else if(b.others_info.is_todays_pick) return 1;
        else{
            //when a,b both are not todays pick,in that case which one has more view will be appeared first
            if(a.total_view > b.total_view) return -1;
            else if(b.total_view > a.total_view) return 1;
            else 0;
        }
    }
    const news = document.getElementById("allNewsOfCertaincategory");
    news.innerHTML = "";
    allNewsOfCertainCategoryObject.forEach((information) => {
        news.innerHTML += `
            <div class="card mb-3">
                <div class="row g-0">

                    <div class="col-md-4 d-none d-md-block">
                        <img src=${information.thumbnail_url ? information.thumbnail_url:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fimage-not-found-icon&psig=AOvVaw1tCym9v-bR73cirASyQ1Zd&ust=1684825221014000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLDL15itiP8CFQAAAAAdAAAAABAE"} class="img-fluid rounded-start" alt="...">
                    </div>
                    
                    <div class="col-md-4 d-block d-md-none">
                        <img src=${information.image_url ? information.image_url:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fimage-not-found-icon&psig=AOvVaw1tCym9v-bR73cirASyQ1Zd&ust=1684825221014000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLDL15itiP8CFQAAAAAdAAAAABAE"} class="img-fluid rounded-start" alt="...">
                    </div>

                    <div class="col-md-8">
                        <div class="card-body">
                        <h5 class="card-title">${information.title}</h5>
                        <p class="card-text">${information.details.slice(0,150)}</p>
                        <div class="alert alert-warning" role="alert">
                            ${information.total_view?information.total_view:0} people watched it
                        </div>
                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick=loadNewsDetails('${information._id?information._id:`
                        <div class="alert alert-primary d-flex align-items-center" role="alert">
                                <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                </svg>
                                <div>
                                    404 News id not FOUND!
                                </div>
                            </div>
                        `}')>
                            Details
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        `
    })
};
const showNewsShortedByMostViewed = () => {
    //here allNewsOfCertainCategoryObject is an array of object 
    allNewsOfCertainCategoryObject.sort(byTrending)
    function byTrending(a,b) {
        if(a.total_view > b.total_view) return -1;
        else if(b.total_view > a.total_view) return 1;
        else{
            //when a,b both are same in number,in that case which one is trending will be appeared first
            if(a.others_info.is_trending) return -1;
            else if(b.others_info.is_trending) return 1;
            else 0;
        }
    }
    const news = document.getElementById("allNewsOfCertaincategory");
    news.innerHTML = "";
    allNewsOfCertainCategoryObject.forEach((information) => {
        news.innerHTML += `
            <div class="card mb-3">
                <div class="row g-0">

                    <div class="col-md-4 d-none d-md-block">
                        <img src=${information.thumbnail_url ? information.thumbnail_url:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fimage-not-found-icon&psig=AOvVaw1tCym9v-bR73cirASyQ1Zd&ust=1684825221014000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLDL15itiP8CFQAAAAAdAAAAABAE"} class="img-fluid rounded-start" alt="...">
                    </div>
                    
                    <div class="col-md-4 d-block d-md-none">
                        <img src=${information.image_url ? information.image_url:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fimage-not-found-icon&psig=AOvVaw1tCym9v-bR73cirASyQ1Zd&ust=1684825221014000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLDL15itiP8CFQAAAAAdAAAAABAE"} class="img-fluid rounded-start" alt="...">
                    </div>

                    <div class="col-md-8">
                        <div class="card-body">
                        <h5 class="card-title">${information.title}</h5>
                        <p class="card-text">${information.details.slice(0,150)}</p>
                        <div class="alert alert-warning" role="alert">
                            ${information.total_view?information.total_view:0} people watched it
                        </div>
                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick=loadNewsDetails('${information._id?information._id:`
                        <div class="alert alert-primary d-flex align-items-center" role="alert">
                            <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                            </svg>
                            <div>
                                404 News id not FOUND!
                            </div>
                        </div>
                        `}')>
                            Details
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        `
    })
};
const showNewsShortedByOnlyTrending = () => {

    allNewsOfCertainCategoryObject.sort(byTrending)
    function byTrending(a,b) {
        if(a.total_view > b.total_view) return -1;
        else if(b.total_view > a.total_view) return 1;
        else{
            //when a,b both are same in number,in that case which one is trending will be appeared first
            if(a.others_info.is_trending) return -1;
            else if(b.others_info.is_trending) return 1;
            else 0;
        }
    }

    let countTrendingNews = 0;
    allNewsOfCertainCategoryObject.forEach((information) => {
        if(information.others_info.is_trending)
            countTrendingNews++;
    });

    const alertMessage = document.getElementById("total-news-with-alert-msg");
    alertMessage.innerHTML = "";
    alertMessage.innerHTML += `
        <div class="alert alert-light" role="alert">
            ${countTrendingNews} ${countTrendingNews>1?"newses":"news"} are on trending
        </div>
    `
    const news = document.getElementById("allNewsOfCertaincategory");
    news.innerHTML = "";
    
        allNewsOfCertainCategoryObject.forEach((information) => {
            news.innerHTML += `
                ${information.others_info.is_trending?
                    `<div class="card mb-3">
                    <div class="row g-0">

                        <div class="col-md-4 d-none d-md-block">
                            <img src=${information.thumbnail_url ? information.thumbnail_url:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fimage-not-found-icon&psig=AOvVaw1tCym9v-bR73cirASyQ1Zd&ust=1684825221014000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLDL15itiP8CFQAAAAAdAAAAABAE"} class="img-fluid rounded-start" alt="...">
                        </div>
                        
                        <div class="col-md-4 d-block d-md-none">
                            <img src=${information.image_url ? information.image_url:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fimage-not-found-icon&psig=AOvVaw1tCym9v-bR73cirASyQ1Zd&ust=1684825221014000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLDL15itiP8CFQAAAAAdAAAAABAE"} class="img-fluid rounded-start" alt="...">
                        </div>

                        <div class="col-md-8">
                            <div class="card-body">
                            <h5 class="card-title">${information.title}</h5>
                            <p class="card-text">${information.details.slice(0,150)}</p>
                            <div class="alert alert-warning" role="alert">
                                ${information.total_view?information.total_view:0} people watched it
                            </div>
                            <!-- Button trigger modal -->
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick=loadNewsDetails('${information._id?information._id:`
                            <div class="alert alert-primary d-flex align-items-center" role="alert">
                                <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                </svg>
                                <div>
                                    404 News id not FOUND!
                                </div>
                            </div>
                            `}')>
                                Details
                            </button>
                            </div>
                        </div>
                    </div>
                </div>`:''}
            `
        });
    
};
// loadNewsCategory();
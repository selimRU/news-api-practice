let isShowAll = true
const loadNewsCategory = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data.news_category);
    displayNewsCategories(data.data.news_category);
}
loadNewsCategory()
const displayNewsCategories = (datas) => {
    const containerNews = document.getElementById('tab-container');
    datas.forEach(data => {
        const div = document.createElement('div');
        div.innerHTML = `
        <a class="cursor-pointer" cursor="pointer" onclick="loadNews('${data.category_id}',true)">${data.category_name}</a>
        `
        containerNews.appendChild(div)
    });
}

const loadNews = async (categoryId, showAll) => {
    loading(true)
    // console.log(showAll);
    isShowAll = categoryId
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    const res = await fetch(url)
    const data = await res.json()
    const news = data.data
    // console.log(news);
    displayNews(news, showAll)
}
const displayNews = (allNews, showAll) => {
    
    const btnShowAll = document.getElementById('btnShowAll')
    if (allNews.length > 3 && showAll) {
        btnShowAll.classList.remove('hidden')
    }
    else {
        btnShowAll.classList.add('hidden')
    }

    if (showAll) {
        allNews = allNews.slice(0, 3);
    } else {
        allNews
    }


    const newsContainer = document.getElementById('card-container');
    newsContainer.innerHTML = '';
    allNews.forEach(news => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card bg-base-100 shadow-xl space-y-4">
          <figure><img src="${news.image_url}" /></figure>
          <div class="card-body space-y-4">
             <h2 class="card-title">${news.details.slice(0, 70)}</h2>
             <div class="flex justify-between items-center">
               <div class="flex justify-start items-center gap-1">
                   <img class="w-10 rounded-full" src="${news.author.img}" alt="">
                   <p>${news.author.name}</p>
               </div>
               <div class="py-[16px] px-7 text-white bg-secondary  badge  badge-outline">Excelent</div>
             </div>
             <div class="card-actions justify-end">
               <button onclick="modalShow('${news._id}')" class="btn btn-primary">Buy Now</button>
             </div>
          </div>
        </div>
        `
        newsContainer.appendChild(div)
    });
    loading(false)
}
const modalShow = async (newsID) => {
    my_modal_1.showModal()
    const url = `https://openapi.programming-hero.com/api/news/${newsID}`
    const res = await fetch(url)
    const data = await res.json()
    // console.log(data);
    displayModal(data.data[0])
}
const displayModal = (data) => {
    const modalcontainer = document.getElementById('modal-container');
    modalcontainer.innerHTML = '';
    const div = document.createElement('div');
    div.innerHTML = `
                     <form method="dialog" class="modal-box max-h-[105vh] w-[600px]">
                          <figure class=" w-[50%] mx-auto"><img src="${data.image_url}" /></figure>
                          <h3 class="font-bold text-lg">${data.title}</h3>
                          <p class=" text-xs">${data.details}</p>
                          <div class="modal-action">
                          !-- if there is a button in form, it will close the modal -->
                             <button class="btn">Close</button>
                          </div>
                     </form>
        `
    modalcontainer.appendChild(div)
}

// show all function
const showAll = () => {
    loadNews(isShowAll, false);
}

// loading function
const loading = (isLoading) => {
    const loading = document.getElementById('loading');
    if (isLoading) {
        loading.classList.remove('hidden')
    }
    else{
        loading.classList.add('hidden')
    }
}
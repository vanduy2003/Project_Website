let elmPagination = document.querySelector("#pagination");
let elmBtnNext = document.querySelector("#btn-next");
let elmBtnPrev = document.querySelector("#btn-prev");
let elmPostList = document.querySelector("#postList");
let elmTitleCategory = document.querySelector(".blog-title h3");

let lastPage;
const REGEX = /^[1-9]\d*$/;

const CURRENT_URL = new URL(window.location);
const VALUE_SEARCH_PARAMS = new URLSearchParams(window.location.search);
const CATE_ID = parseInt(VALUE_SEARCH_PARAMS.get("id"));
const PAGES = parseInt(VALUE_SEARCH_PARAMS.get("page"));

let currentPage = PAGES;



if (!isValidId() || !isVaildPage()) {
  // Nếu giá trị không hợp lệ, điều hướng URL về trang index.html
  window.location.href = "/index.html";
}

function isValidId() {
  return REGEX.test(CATE_ID);
}

function isVaildPage() {
  return REGEX.test(PAGES);
}

//event next & previous pages
elmBtnNext.addEventListener("click", function () {
  if (currentPage === lastPage) {
    return;
  }
  currentPage++;
  getPaginationForNews(currentPage);
  CURRENT_URL.searchParams.set("page", currentPage);
  window.history.pushState({}, "", CURRENT_URL);
});
elmBtnPrev.addEventListener("click", function () {
  if (currentPage === 1) {
    return;
  }
  currentPage--;
  getPaginationForNews(currentPage);
  CURRENT_URL.searchParams.set("page", currentPage);
  window.history.pushState({}, "", CURRENT_URL);
});

elmPagination.addEventListener("click", function (e) {
  if (e.target.tagName === "SPAN") {
    if (currentPage === parseInt(e.target.getAttribute("data-page"))) {
      return;
    }
    currentPage = parseInt(e.target.getAttribute("data-page"));
    getPaginationForNews(currentPage);
    CURRENT_URL.searchParams.set("page", currentPage);
    window.history.pushState({}, "", CURRENT_URL);
  }
});


function getCategory(categoryID){
  API_NEWS.get(`danh-mucs/${categoryID}`)
  .then((response) =>{
   elmTitleCategory.innerHTML = response.data.data.attributes.tendanhmuc;
  })
  .catch((error) => {
    console.log(error);
  });
}

function getPaginationForNews(page) {
  elmPostList.innerHTML = "";
  console.log(loader)

  loader.classList.remove("d-none");
  return API_NEWS.get("bai-viets", {
    params: {
      pagination: {
        page: page,
        pageSize: 6,
      },
      filters: {
        $and: [
          {
            danh_muc: {
              id: {
                $eq: CATE_ID,
              },
            },
          },
        ],
      },
      populate: {
        headerImage: {
          fields: ["formats"],
        },
      },
      fields: ["title", "description", "slug", "createdAt"],
      sort: ['id:DESC'],
      
    },
  })
    .then((response) => {
      // console.log(response.data);
      renderPostNews(response.data.data);
      lastPage = response.data.meta.pagination.pageCount;
      renderPaginationButton(page);
      statusButton();
      loader.classList.add("d-none");
      // return response;
      // elmLoadingMessage.style.display = "none";
    })
    .catch((error) => {
      console.log(error);
      // elmLoadingMessage.style.display = "none";
    });
}

function renderPostNews(data) {
  let str = "";

  for (let i = 0; i < data.length; i++) {
    dayjs.locale("vi");
    const CUSTOM_DATE = dayjs(data[i].attributes.createdAt);
    let date = CUSTOM_DATE.format("dddd, DD/MM/YYYY");

    str += ` 
    <div class="col-lg-4">
      <div class="post-box">
        <div class="post-img">
        <a href="new.html?slug=${data[i].attributes.slug}">
          <img
            src="http://api.vuhuy.xyz${data[i].attributes.headerImage.data.attributes.formats.small.url}"
            class="img-fluid"
            alt="${data[i].attributes.headerImage.data.attributes.formats.small.name}"
          />
          </a>
        </div>
        <p class="post-date">${date}</p>

        <h3 class="post-title">
          <a href="new.html?slug=${data[i].attributes.slug}">${data[i].attributes.title}</a>
        </h3>
        <p class="description">
        ${data[i].attributes.description}
        </p>
      </div>
  </div>`; // render articles
  }
  elmPostList.innerHTML = str;
}

function renderPaginationButton(indexPage) {
  currentPage = indexPage;
  const numPagesToShow = 5;
  let str = "";

  const generatePageItem = (index, active = false) => {
    return `
      <li class="page-item ${active ? "active" : ""}">
        <span class="page-link" data-page="${index}">${index}</span>
      </li>`;
  };

  if (lastPage <= numPagesToShow) {
    for (let i = 1; i <= lastPage; i++) {
      str += generatePageItem(i, i === indexPage);
    }
  } else {
    if (indexPage > numPagesToShow - 2) {
      str += generatePageItem(1);
      if (indexPage > numPagesToShow - 1) {
        str += `<li class="page-item"><a class="page-link">..</a></li>`;
      }
    }

    const startIndex = Math.max(indexPage - 2, 1);
    const endIndex = Math.min(startIndex + numPagesToShow - 1, lastPage);

    for (let i = startIndex; i <= endIndex; i++) {
      str += generatePageItem(i, i === indexPage);
    }

    if (lastPage - indexPage > numPagesToShow - 2) {
      if (lastPage - indexPage > numPagesToShow - 1) {
        str += `<li class="page-item"><a class="page-link">..</a></li>`;
      }
      str += generatePageItem(lastPage);
    }
  }

  elmPagination.innerHTML = str;
}

function statusButton() {
  if (currentPage > 1) {
    elmBtnPrev.classList.remove("disabled");
  } else {
    elmBtnPrev.classList.add("disabled");
  }

  if (currentPage == lastPage) {
    elmBtnNext.classList.add("disabled");
  } else {
    elmBtnNext.classList.remove("disabled");
  }
}




getPaginationForNews(PAGES);
getCategory(CATE_ID);


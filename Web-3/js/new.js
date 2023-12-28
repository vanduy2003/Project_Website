let elmSinglePost = document.querySelector(".single-post");
let elmPostItem = document.querySelector("#post-new");

const VALUE_SEARCH_PARAMS = new URLSearchParams(window.location.search);
const ARTICLES_ID = VALUE_SEARCH_PARAMS.get("slug");
const URL_DETAILS = `bai-viets?populate=*&filters[$and][0][slug][$eq]=${ARTICLES_ID}`;


function getPostNews() {
  return API_NEWS.get("bai-viets", {
    params: {
      pagination: {
        page: 1,
        pageSize: 6,
      },
      populate: {
        headerImage: {
          fields: ["formats"],
        },
      },
      fields: ["title", "slug", "createdAt"],
      sort: ["id:DESC"],
    },
  })
    .then((response) => {
      renderPostNews(response.data.data);
      // lastPage = response.data.meta.pagination.pageCount;
      // renderPaginationButton(page);
      // statusButton();
      // return response;
    })
    .catch((error) => {
      console.log(error);
    });
}

function renderPostNews(data) {
  let str = "";

  for (let i = 0; i < data.length; i++) {
    str += ` 

    <div class="post-item border-bottom">
    <a href="new.html?slug=${data[i].attributes.slug}">
    <img src="https://api.vuhuy.xyz${data[i].attributes.headerImage.data.attributes.formats.small.url}" alt="${data[i].attributes.headerImage.data.attributes.formats.small.name}" />
    <h5 class="title">
    ${data[i].attributes.title}
    </h5>
    </a
      >
    </div>`; // render articles
  }
  elmPostItem.innerHTML += str;
}

function getPostContent() {
  API_NEWS.get(URL_DETAILS)
    .then((response) => {
      if (response.data.data == "") {
        return;
      }
      console.log(response.data.data);
      renderPostContent(response.data.data[0].attributes);
      // elmHeadTitle.innerHTML = response.data.data.title;
      // renderPostContent(response.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function renderPostContent(data) {
  dayjs.locale("vi");
  const CUSTOM_DATE = dayjs(data.createdAt);
  let date = CUSTOM_DATE.format("dddd, DD/MM/YYYY");
  let str = `
  <div class="post-meta">
  <span class="date">${data.author.data.attributes.name}</span>
  <span class="mx-1">&bullet;</span>
  <span>${date}</span>
</div>
 <h1 class="mb-5">${data.title}
 </h1>
 ${data.content}
  `;

  elmSinglePost.innerHTML = str;
}

getPostContent();

getPostNews();

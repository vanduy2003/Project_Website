let elmPostList = document.querySelector("#postList");

let elmBtnXemThem = document.querySelector("#btnXemThem");

let countMetaPage;
let currentPage = 1;

elmBtnXemThem.addEventListener("click", function () {
  currentPage++;
  getPaginationForNews(currentPage);
  if (countMetaPage == currentPage) {
    this.remove();
  }
});



function getPaginationForNews(page) {
  return API_NEWS.get("bai-viets", {
    params: {
      pagination: {
        page: page,
        pageSize: 3,
      },
      filters: {
        $and: [
          {
            danh_muc: {
              id: {
                $eq: 6,
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
      sort: ["id:DESC"],
    },
  })
    .then((response) => {
      renderPostNews(response.data.data);
      countMetaPage = response.data.meta.pagination.pageCount;
      if (countMetaPage === 1) {
        elmBtnXemThem.remove();
      }
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
    dayjs.locale("vi");
    const CUSTOM_DATE = dayjs(data[i].attributes.createdAt);
    let date = CUSTOM_DATE.format("dddd, DD/MM/YYYY");

    str += ` 
      <div class="col-lg-4">
        <div class="post-box">
          <div class="post-img">
          <a href="new.html?slug=${data[i].attributes.slug}">
            <img
              src="https://api.vuhuy.xyz${data[i].attributes.headerImage.data.attributes.formats.small.url}"
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
  elmPostList.innerHTML += str;
}

getPaginationForNews(currentPage);

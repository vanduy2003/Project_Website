let elmPostItem = document.querySelector("#post-new");



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

// reponsive for education program
$(window).bind("resize load", function () {
  if ($(this).width() <= 1200) {
    $(".education-program h5").attr("data-bs-toggle", "collapse");
    $(".education-program .accordion-collapse").addClass("collapse");
  } else {
    $(".education-program h5").attr("data-bs-toggle", "");
    $(".education-program .accordion-collapse").removeClass("collapse");
  }
});
// reponsive for education program

getPostNews();

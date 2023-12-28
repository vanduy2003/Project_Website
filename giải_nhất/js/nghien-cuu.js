let yearTables = document.querySelectorAll(".year-table");
let elmYearTables = document.querySelector("#year-tables");
let elmBtnYearList = document.querySelector("#btnYearList");
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


const URL_DATA = "nghien-cuu-khoa-hocs?populate=*";

// event click year btn
elmBtnYearList.addEventListener("click", function (e) {
  const idTable = e.target.getAttribute("data-year");
  yearTables = $(".year-table");
  let elmButtonYear = document.querySelectorAll(".year-button");

  for (let i = 0; i < yearTables.length; i++) {
    yearTables[i].style.display = "none";
  }
  for (let i = 0; i < elmButtonYear.length; i++) {
    if (elmButtonYear[i].classList.contains("active")) {
      elmButtonYear[i].classList.remove("active");
    }
    e.target.classList.add("active");
  }
  $("#" + idTable).css("display", "block");
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
                $eq: 5,
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
      sort: ["title:DESC"],
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
  elmPostList.innerHTML += str;
}

function getDataNghienCuuKhoaHoc() {
  API_NEWS.get(URL_DATA)
    .then((response) => {
      let data1 = response.data.data.reduce((result, nghienCuu) => {
        if (!result[dayjs(nghienCuu.attributes.year).format("YYYY")]) {
          result[dayjs(nghienCuu.attributes.year).format("YYYY")] = [];
        }
        result[dayjs(nghienCuu.attributes.year).format("YYYY")].push(nghienCuu);
        return result;
      }, {});

      let str = "";
      const keys = Object.keys(data1);
      for (let i = keys.length - 1; i >= 0; i--) {
        str += renderTableData(data1[keys[i]], keys[i]);

        // Kiểm tra nếu là phần tử đầu tiên thì thêm class "active", ngược lại không thêm
        const isActive = i === keys.length - 1 ? "active" : "";
        elmBtnYearList.innerHTML += `<button class="year-button ${isActive}" data-year="${keys[i]}">${keys[i]}</button>`;
      }
      elmYearTables.innerHTML = str;

      // hide table year list
      for (let i = 1; i < $(".year-table").length; i++) {
        $(".year-table")[i].style.display = "none";
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function renderTableData(data, year) {
  let str = `
            <div id="${year}" class="year-table">
                    <table class="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th>STT</th>
                          <th>Tên đề tài</th>
                          <th>Giảng viên hướng dẫn</th>
                          <th>Sinh viên</th>
                          <th>Lớp</th>
                        </tr>
                      </thead>
                      <tbody>`;

  for (let i = 0; i < data.length; i++) {
    str += `
        <tr>
        <td>${i + 1}</td>
        <td>
              ${data[i].attributes.name}
        </td>
        <td>
        ${data[i].attributes.nameGiangVien.replace(/\n/g, "<br>")}
        </td>
        <td>
        ${data[i].attributes.nameStudent.replace(/\n/g, "<br>")}
        </td>
        <td>
        ${data[i].attributes.Class.replace(/\n/g, "<br>")}
        </td>
      </tr>
        `;
  }
  str += `               
                      </tbody>
                    </table>
            </div> `;
  return str;
}

getDataNghienCuuKhoaHoc();

getPaginationForNews(currentPage);

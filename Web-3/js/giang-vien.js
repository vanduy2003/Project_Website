let elmChuNgiemKhoaContent = document.querySelector(".chuNghiemKhoa .content");
let elmCongNghePhanMemInfoContent = document.querySelector(
  ".congNghePhanMemInfo .content"
);
let elmHeThongThongTinInfoContent = document.querySelector(
  ".heThongThongTinInfo .content"
);
let elmBtnXemThemOne = document.querySelector("#btnXemThemOne");
let elmBtnXemThemTwo = document.querySelector("#btnXemThemTwo");
let pageCountCNPMInfo;
let pageCountHTTTInfo;
let currentPageOne = 1;
let currentPageTwo = 1;

elmBtnXemThemOne.addEventListener("click", function () {
  currentPageOne++;
  getCongNghePhanMem(currentPageOne);
  if (pageCountCNPMInfo == currentPageOne) {
    this.remove();
  }
});

elmBtnXemThemTwo.addEventListener("click", function () {
  currentPageTwo++;
  getHeThongThongTin(currentPageTwo);
  if (pageCountHTTTInfo == currentPageTwo) {
    this.remove();
  }
});


function getChuNghiemKhoa() {
  return API_NEWS.get("giang-viens", {
    params: {
      filters: {
        $and: [
          {
            position: {
              $contains: "Trưởng khoa",
            },
          },
        ],
      },
      populate: "*",
    },
  })
    .then((response) => {
      elmChuNgiemKhoaContent.innerHTML = renderCardInfo(response.data.data);
      // return response;
    })
    .catch((error) => {
      console.log(error);
    });
}

function renderCardInfo(data) {
  let strCard = "";
  for (let i = 0; i < data.length; i++) {
    let customDate = dayjs(data[i].attributes.dateofbirth);
    let date = customDate.format("YYYY");
    strCard += `  <div class="col-lg-6">
        <div class="card-info">
          <div class="content">
            <div class="image-box">
              <img src="https://api.vuhuy.xyz${data[i].attributes.avatar.data.attributes.url}" alt="${data[i].attributes.avatar.data.attributes.url.hash}" />
            </div>
            <div class="details">
              <div class="name">${data[i].attributes.name}</div>
              <div class="job">${data[i].attributes.position}</div>
              <div class="date-of-birth">Năm Sinh: ${date}</div>
              <div class="specialization">
                <b>Chuyên Ngành:</b> ${data[i].attributes.major}
              </div>
              <div class="d-flex justify-content-start">
                <a href="#" class="btn-get-started scrollto"
                  >Xem Chi Tiết<i class="fa fa-arrow-right"></i
                ></a>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  }

  return strCard;
}

function getCongNghePhanMem(page) {
  return API_NEWS.get("giang-viens", {
    params: {
      pagination: {
        page: page,
        pageSize: 4,
      },
      filters: {
        $and: [
          {
            bo_mon: {
              id: {
                $eq: 1,
              },
            },
          },
        ],
      },
      populate: "*",
    },
  })
    .then((response) => {
      elmCongNghePhanMemInfoContent.innerHTML += renderCardInfo(
        response.data.data
      );
      pageCountCNPMInfo = response.data.meta.pagination.pageCount;
      if (pageCountCNPMInfo === 1) {
        elmBtnXemThemOne.remove();
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function getHeThongThongTin(page) {
  return API_NEWS.get("giang-viens", {
    params: {
      pagination: {
        page: page,
        pageSize: 4,
      },
      filters: {
        $and: [
          {
            bo_mon: {
              id: {
                $eq: 2,
              },
            },
          },
        ],
      },
      populate: "*",
    },
  })
    .then((response) => {
      elmHeThongThongTinInfoContent.innerHTML += renderCardInfo(
        response.data.data
      );
      pageCountHTTTInfo = response.data.meta.pagination.pageCount;
      if (pageCountHTTTInfo === 1) {
        elmBtnXemThemTwo.remove();
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

getChuNghiemKhoa();
getCongNghePhanMem(currentPageOne);
getHeThongThongTin(currentPageTwo);

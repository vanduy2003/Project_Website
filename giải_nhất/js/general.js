let elmSubNavbar = document.getElementById("sub-navbar");
let loader = document.querySelector(".loader");
const dropdownGT = document.getElementById("dropDownGT");
const dropdownTT = document.getElementById("dropDownTT");

const subnavLinks = document.querySelectorAll("#sub-navbar ul li a");
let isGioithieudropdownvisible = false;
let isTintucdropdownvisible = false;

const API_NEWS = axios.create({
  baseURL: "https://api.vuhuy.xyz/api/",
});

// Moblie nav
$(".mobile-nav-toggle").on("click", function (e) {
  $("#navbar").toggleClass("navbar-mobile");
  $(this).toggleClass("bi-list bi-x");
  $("#sub-navbar").toggleClass("active");
});

let isScrolling = false;

function scrollHandler() {
  if (!isScrolling) {
    isScrolling = true;
    window.addEventListener("scroll", function () {
      var headerHeight = document.getElementById("header").offsetHeight;
      var scrollPosition =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      if (scrollPosition > headerHeight) {
        elmSubNavbar.style.top = "0";
      } else {
        elmSubNavbar.style.top = headerHeight - scrollPosition + "px";
      }
    });
    window.requestAnimationFrame(() => {
      isScrolling = false;
    });
  }
}

if (window.scrollY !== 0) {
  elmSubNavbar.style.top = "0";
}
window.addEventListener("scroll", scrollHandler());

$(document).ready(function () {
  $(".myLink").click(function (event) {
    event.preventDefault();
  });
});


document
  .getElementById("gioiThieudd")
  .addEventListener("click", (event) => {
    event.preventDefault();
    if (isTintucdropdownvisible) {
      dropdownTT.style.display = "none";
      isTintucdropdownvisible = false;
    }
    if (isGioithieudropdownvisible) {
      dropdownGT.style.display = "none";
      isGioithieudropdownvisible = false;
    } else {
      dropdownGT.style.display = "block";
      isGioithieudropdownvisible = true;
    }
    subnavLinks.forEach((link) => {
      link.classList.remove("active");
    });
    event.target.classList.add("active");
  });

document
  .getElementById("tinTucdd")
  .addEventListener("click", (event) => {
    event.preventDefault();
    if (isGioithieudropdownvisible) {
      dropdownGT.style.display = "none";
      isGioithieudropdownvisible = false;
    }
    if (isTintucdropdownvisible) {
      dropdownTT.style.display = "none";
      isTintucdropdownvisible = false;
    } else {
      dropdownTT.style.display = "block";
      isTintucdropdownvisible = true;
    }
    subnavLinks.forEach((link) => {
      link.classList.remove("active");
    });
    event.target.classList.add("active");
  });

  

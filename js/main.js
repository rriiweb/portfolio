$(function () {
  $("a").click(function (e) {
    if ($(this).attr("href") === "#") {
      e.preventDefault();
    }
  })

  let aboutSectionTop = $("section.about").offset().top;
  let publishingSectionTop = $("section.publishing").offset().top;
  let frontendSectionTop = $("section.frontend").offset().top;
  let designSectionTop = $("section.design").offset().top;

  let headerLisTop = [aboutSectionTop, publishingSectionTop, frontendSectionTop, designSectionTop];
  let publishingCardsTop = [];
  let frontendCardsTop = [];
  let designCardsTop = [];

  let headerTop = $("header")[0].getBoundingClientRect().top;
  let headerHeight = $("header").outerHeight();
  let windowHeight = $(window).height();
  let headerEnd = headerTop + headerHeight;

  let sectionInnerPadding = parseInt($(".inner").css("padding"));

  $("h2.title").each((i, el) => {
    const title = $(el).text();
    $(el).attr("data-title", title);
  });

  // window load, resize 될때 실행할 함수
  function setOffsetTop() {
    headerTop = $('header')[0].getBoundingClientRect().top;
    headerEnd = headerTop + headerHeight;

    aboutSectionTop = $("section.about").offset().top;
    publishingSectionTop = $("section.publishing").offset().top;
    frontendSectionTop = $("section.frontend").offset().top;
    designSectionTop = $("section.design").offset().top;
    headerLisTop = [aboutSectionTop, publishingSectionTop, frontendSectionTop, designSectionTop];

    let pTop = [];
    let fTop = [];
    let dTop = [];

    $(".publishing .work-right .w-card").each((i, el) => {
      let top = $(el).offset().top + 4 - sectionInnerPadding - headerHeight;
      pTop.push(top);
    })
    $(".frontend .work-right .w-card").each((i, el) => {
      let top = $(el).offset().top + 4 - sectionInnerPadding - headerHeight;
      fTop.push(top);
    })
    $(".design .d-card").each((i, el) => {
      let top = $(el).offset().top + 4 - sectionInnerPadding - headerHeight;
      dTop.push(top);
    })

    publishingCardsTop = pTop;
    frontendCardsTop = fTop;
    designCardsTop = dTop;
  }

  $(window).on("load", () => {
    setOffsetTop();
  });

  $(window).resize(() => {
    headerHeight = $('header').outerHeight();
    windowHeight = $(window).height();
    sectionInnerPadding = parseInt($(".inner").css("padding"));
    setOffsetTop();
  })

  $(window).scroll(() => {
    let curScroll = $(window).scrollTop();
    // GoTop 보이기/숨기기
    if (curScroll >= windowHeight / 2) {
      $(".go-top").addClass("show");
    } else {
      $(".go-top").removeClass("show");
    }

    // [TODO] 500px -> 440px
    // Header 컨트롤 (위치, 컬러)
    if ($(window).outerWidth() > 500) {
      if (curScroll >= aboutSectionTop - headerEnd) {
        $("header").addClass("light");
      } else {
        $("header").removeClass("light");
      }
    } else {
      if (curScroll >= windowHeight / 2) {
        $("header").addClass("light mobile");
      } else {
        $("header").removeClass("light mobile");
      }
    }
  })

  // header 각 li 클릭시
  $("header ul li").each((i, el) => {
    $(el).click(() => {
      $("html, body").animate(
        { scrollTop: headerLisTop[i] },
        300,
      );
    })
  })

  // 퍼블리싱 작업 각 li 클릭시
  $(".publishing .work-left ul li").each((i, el) => {
    $(el).click(() => {
      $("html, body").animate(
        { scrollTop: publishingCardsTop[i] },
        300,
      );
    })
  })

  // 프론트엔드 작업 각 li 클릭시
  $(".frontend .work-left ul li").each((i, el) => {
    $(el).click(() => {
      $("html, body").animate(
        { scrollTop: frontendCardsTop[i] },
        300,
      );
    })
  })

  // 디자인 작업 각 li 클릭시
  $(".design .work-left ul li").each((i, el) => {
    $(el).click(() => {
      $("html, body").animate(
        { scrollTop: designCardsTop[i] },
        300,
      );
    })
  })

  const cardnews1ImagesSrc = [
    "design-2cardnews-1.jpg",
    "popup-cardnews1-1.jpg",
    "popup-cardnews1-2.jpg",
    "popup-cardnews1-3.jpg",
    "popup-cardnews1-4.jpg",
  ];

  const cardnews2ImagesSrc = [
    "design-2cardnews-2.png",
    "popup-cardnews2-1.png",
    "popup-cardnews2-2.png",
    "popup-cardnews2-3.png",
    "popup-cardnews2-4.png",
  ];

  // 카드뉴스 클릭 -> popup
  $(".cn").each((i, el) => {
    $(el).click(() => {
      $(".popup ul li").each((j, liEl) => {
        $(liEl).find("img").attr("src", `images/${i === 0 ? cardnews1ImagesSrc[j] : cardnews2ImagesSrc[j]}`)
      });

      $(".popup").show();

      $("html").addClass("hidden");
      $("body").addClass("hidden");
    });
  })

  $(".popup-close").click(() => {
    $(".popup").hide();
    $("html").removeClass("hidden");
    $("body").removeClass("hidden");
  })

  // GoTop 클릭시
  $(".go-top").click(() => {
    $("html, body").animate(
      { scrollTop: 0 },
      300,
    );
  })
})
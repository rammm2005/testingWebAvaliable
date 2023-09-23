$(document).ready(function () {
  const categoryMenu = $("#categoryMenu");
  const lengthScroll = 100;

  categoryMenu.css("display", "none");

  $(window).on("scroll", function () {
    let currentScroll = $(window).scrollTop();

    if (currentScroll > lengthScroll) {
      categoryMenu.css("display", "flex");
    } else {
      categoryMenu.css("display", "none");
    }
  });

  // Image Freelance Efect
  $("#fadeImg>.freelance-img:gt(0)").hide();
  setInterval(function () {
    $("#fadeImg > .freelance-img:first")
      .fadeOut(1500)
      .next()
      .fadeIn(1500)
      .end()
      .appendTo("#fadeImg");
  }, 6500);

  // Category Slide
  const tabsBox = $(".category-menu-wrapper ul");
  const prevIcon = $("#prevNav i");
  const nextIcon = $("#nextNav i");

  let isDragging = false;
  let startX, startScrollLeft;

  const handleIcons = () => {
    let maxScrollableWidth = tabsBox[0].scrollWidth - tabsBox[0].clientWidth;
    prevIcon
      .parent()
      .css("display", tabsBox.scrollLeft() <= 0 ? "none" : "flex");
    nextIcon
      .parent()
      .css(
        "display",
        maxScrollableWidth - tabsBox.scrollLeft() <= 1 ? "none" : "flex"
      );
  };

  prevIcon.on("click", function () {
    let scrollWidth = tabsBox.scrollLeft() - 340;
    tabsBox.animate({ scrollLeft: scrollWidth }, 300, () => {
      handleIcons();
    });
  });

  nextIcon.on("click", function () {
    let scrollWidth = tabsBox.scrollLeft() + 340;
    tabsBox.animate({ scrollLeft: scrollWidth }, 300, () => {
      handleIcons();
    });
  });

  tabsBox.on("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX;
    startScrollLeft = tabsBox.scrollLeft();
  });

  tabsBox.on("mouseup", () => {
    isDragging = false;
  });

  tabsBox.on("mousemove", (e) => {
    if (isDragging) {
      let movementX = e.pageX - startX;
      tabsBox.scrollLeft(startScrollLeft - movementX);
      handleIcons();
    }
  });

  tabsBox.on("scroll", () => {
    handleIcons();
  });


  // Easing Smooth
    let calcScrollValue = () => {
    let scrollProgress = $("#to-top");
    let progressValue = $(".top-link");
    let topScroll = $(document).scrollTop();
    let calcHeight = $(document).height() - $(window).height();
    let scrollValue = Math.round((topScroll * 100) / calcHeight);
    var scroll = new SmoothScroll('a[href*="#"]:not([data-easing])');

    if (topScroll > 200 && scroll) {
      scrollProgress.css("display", "grid");
       var easeInQuad = new SmoothScroll('[data-easing="easeInQuad"]', {easing: 'easeInQuad'});
    } else {
      scrollProgress.css("display", "none");
    }

    scrollProgress.css(
      "background",
      `conic-gradient(#03cc65 ${scrollValue}% , #d7d7d7 ${scrollValue}%)`
    );
  };
  $(window).scroll(calcScrollValue);
  $(document).ready(calcScrollValue);


  // Popular Slide
  const slidemain = $("#slider-popular");
  const item = slidemain.find(".popular-service");
  const navNextButton = $("#nextArrow");
  const navPrevButton = $("#prevArrow");

  let currentIndex = 0;
  const itemsToShow = 4;
  // const slideWidth = $(window).width();

  function showItems(startIndex) {
    item.hide();
    for (let i = startIndex; i < startIndex + itemsToShow; i++) {
      item.eq(i % item.length).show();
    }
  }

  function slideNext() {
    currentIndex = (currentIndex + itemsToShow) % item.length;
    showItems(currentIndex);
  }

  function slidePrev() {
    currentIndex = (currentIndex - itemsToShow + item.length) % item.length;
    showItems(currentIndex);
  }

  showItems(currentIndex);

  navNextButton.click(function () {
    slideNext();
  });

  navPrevButton.click(function () {
    slidePrev();
  });

  // setInterval(slideNext, 3000);

});

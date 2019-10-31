function initMain() {
  $(document).ready(function () {
    "use strict";
    //Init navbar
    $().initNavbar();

    //Navbar dropdown
    $().initNavDropdowns();

    //Common Dropdown
    $().initDropdowns();

    //Sidebars
    $().initSidebar();

    //Tabs
    $().initTabs();

    //Modals
    $().initModals();

    //Subnavbar search
    $().initSubSearch();

    //Attribute background images
    $().initBgImages();

    //Feather icons initialization
    feather.replace();

    //Load More
    $().initLoadMore();

    //Init Like Button
    $().initLikeButton();

    //Share modal demo
    $().initShareModal();

    //Init Plus Menu
    $().initPlusMenu();
  })
}

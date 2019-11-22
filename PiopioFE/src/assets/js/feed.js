function initFeed() {
  $(document).ready(function () {
    "use strict";

    if ($('#activity-feed').length) {

      //Feed v1 left menu
      if ($('.feed-menu-v1').length){
        $('.feed-menu-v1 .main-menu li.is-active').find('.submenu').slideDown();
        $('.feed-menu-v1 .main-menu li').on('click', function(){
          //$('.submenu').slideUp();
          $(this).siblings('li').removeClass('is-active').find('.submenu').slideUp();
          $(this).addClass('is-active').find('.submenu').slideDown();
        })
      }

      //Open publish mode
      $('#publish').on('click', function () {
        $('.app-overlay').addClass('is-active');
        $('.is-new-content').addClass('is-highlighted');
      })


      //Enable and disable publish button based on the textarea value length (1)
      $('#publish').on('input', function () {
        var valueLength = $(this).val().length;

        if (valueLength >= 1) {
          $('#publish-button').removeClass('is-disabled');
        } else {
          $('#publish-button').addClass('is-disabled');
        }
      })

      //Close compose box
      $('.close-publish').on('click', function () {
        $('.app-overlay').removeClass('is-active');
        $('.is-new-content').removeClass('is-highlighted');
        $('#compose-search, #extended-options, .is-suboption').addClass('is-hidden');
        $('#basic-options, #open-compose-search').removeClass('is-hidden');
      })

      //Expand compose box
      $('#show-compose-friends').on('click', function () {
        $(this).addClass('is-hidden');
        $('.friends-list').removeClass('is-hidden');
        $('.hidden-options').addClass('is-opened');
      })

      //Open extended options
      $('#open-extended-options').on('click', function () {
        $('.app-overlay').addClass('is-active');
        $('.is-new-content').addClass('is-highlighted');
        $('.compose-options').toggleClass('is-hidden');
      })

      //
      $('.input-block, .close-icon.is-subactivity').on('click', function () {
        $('#activities-autocpl-wrapper').toggleClass('is-hidden');
        $('.is-activity').addClass('is-hidden');
        $('.easy-autocomplete-container li').removeClass('selected');
        $('.mood-display').html('');
        //Open autocomplete dropdown
        $().openActivitiesDrop();
      })

      //Init comments
      $().initPostComments();

    }

  });
}

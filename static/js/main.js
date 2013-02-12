(function( $, undefined ) {

    $(document).on("ready", function(){initialize()});
    $(document).on("click", 'a[href^=#]', function(e){e.preventDefault();});
    $(document).on('click', '.prob-link', function(){loadIframe(this)});
    $(document).on('submit', '#comment', function(e){e.preventDefault();saveComment()});


    function initialize() {
        $('.init').trigger('click');
    }

    function loadIframe (el) {
        var $el = $(el),
            src = $(el).data('href');

        if (!$el.hasClass('active')) {
            $('.iframe-box iframe').attr('src', src);

            $('.active').removeClass('active');
            $el.addClass('active');
            loadComment(src+'/comment/get');
        }
    }

    function loadComment(action){
        $.ajax({
          type: "GET",
          url: action,
          data: {},
          success: function(content) {
            console.log('Loaded')
            $('#commentText').val(content)
          }
        })
    }

    function saveComment(){
        var action = $('.active').data('href')+'/comment',
            comment = $('#commentText').val();

        $.ajax({
          type: "GET",
          url: action,
          data: {comment: comment},
          success: function(content) {
            console.log(content);
            okToggle($('#commentText'));
          }
        })
    }

    function okToggle(el) {
        el.addClass('saved');
        setTimeout(function(){
            el.removeClass('saved');
        },1000)
    }

})(jQuery);

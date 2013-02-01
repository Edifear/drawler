(function( $, undefined ) {

    $(document).on("click", 'a[href^=#]', function(e){
        e.preventDefault();
        console.log(e)
    })

})(jQuery);
requirejs.config({
    baseUrl: 'js',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    // paths: {
    //     app: '../app'
    // }
});

requirejs(['lib/jquery-1.9.0.min'],
function   ($) {
    //jQuery, canvas and the app/sub module are all
    //loaded and can be used here now.
});
(function (factory) {
  /* global define */
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else {
    // Browser globals: jQuery
    factory(window.jQuery);
  }
}(function ($) {

  var dom = $.summernote.core.dom;
    
  var Class = {
      name : 'mousedown',
      $mosuedown : function (event) {
        if (dom.isImg(event.target)) {
          event.preventDefault();
        }
      }
    };
    
  $.summernote.addPlugin(Class);
    

}));

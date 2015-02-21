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
  var Class = {
      name : 'scroll',
      $scroll : function (event) {
        var layoutInfo = $.summernote.plugin('layoutInfo', 'make', (event.currentTarget || event.target));
        //hide popover and handle when scrolled
        $.summernote.plugin('popover', 'hide', layoutInfo.popover());
        $.summernote.plugin('handle', 'hide', layoutInfo.handle());
      }
    };
    
  $.summernote.addPlugin(Class);
    

}));

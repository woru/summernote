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
      name : 'handle',
      $update : function (data) {
        var $handle = data.layoutInfo.handle();
        var styleInfo = data.styleInfo;
        var isAirMode = data.isAirMode;
          
        var $selection = $handle.find('.note-control-selection');
        if (styleInfo.image) {
          var $image = $(styleInfo.image);
          var pos = isAirMode ? $image.offset() : $image.position();

          // include margin
          var imageSize = {
              w: $image.outerWidth(true),
              h: $image.outerHeight(true)
            };

          $selection.css({
              display: 'block',
              left: pos.left,
              top: pos.top,
              width: imageSize.w,
              height: imageSize.h
            }).data('target', styleInfo.image); // save current image element.
          var sizingText = imageSize.w + 'x' + imageSize.h;
          $selection.find('.note-control-selection-info').text(sizingText);
        } else {
          $selection.hide();
        }
      },
      
      hide :  function ($handle) {
        $handle.children().hide();
      }
    };
    
  $.summernote.addPlugin(Class);
    

}));

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
      'name' : 'update',
      update : function (event) {
        setTimeout(function () {
          var layoutInfo = $.summernote.plugin('layoutInfo', 'make', (event.currentTarget || event.target));
          var $editor = layoutInfo.editor();
          var editor = $.summernote.eventHandler.getEditor();
          var styleInfo = editor.currentStyle(event.target);
          if (!styleInfo) { return; }

          var isAirMode = $editor.data('options').airMode;
          if (!isAirMode) {
            $.summernote.trigger('update', { layoutInfo : layoutInfo, styleInfo : styleInfo, isAirMode : isAirMode});
          }

          //self.popoverUpdate(layoutInfo.popover(), styleInfo, isAirMode);
          //self.handleUpdate(layoutInfo.handle(), styleInfo, isAirMode);
        }, 0);
      },
      
      $keyup : function (event) {
        this.update(event);
      },
      
      $mouseup : function (event) {
        this.update(event);
      }
    };
    
  $.summernote.addPlugin(Class);
    

}));

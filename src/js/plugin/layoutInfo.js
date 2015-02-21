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
  var list = $.summernote.core.list;
  var dom = $.summernote.core.dom;
  var Class = {
      name : 'layoutInfo',
      make : function (descendant) {
        var $target = $(descendant).closest('.note-editor, .note-air-editor, .note-air-layout');

        if (!$target.length) { return null; }

        var $editor;
        if ($target.is('.note-editor, .note-air-editor')) {
          $editor = $target;
        } else {
          $editor = $('#note-editor-' + list.last($target.attr('id').split('-')));
        }

        return dom.buildLayoutInfo($editor);
      }
    };
    
  $.summernote.addPlugin(Class);
    

}));

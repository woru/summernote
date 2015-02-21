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
    
  var Class = {
      name : 'pasteClipboardImage',
      $paste : function (event) {
        var clipboardData = event.originalEvent.clipboardData;
        var layoutInfo = $.summernote.plugin('layoutInfo', 'make', (event.currentTarget || event.target));
        var _editor = $.summernote.eventHandler.getEditor();
        var $editable = layoutInfo.editable();

        if (!clipboardData || !clipboardData.items || !clipboardData.items.length) {
          // only can run if it has onImageUpload method
          if (!$.summernote.options.onImageUpload) {
            return;
          }

          // save cursor
          _editor.saveNode($editable);
          _editor.saveRange($editable);

          $editable.html('');

          setTimeout(function () {
            var $img = $editable.find('img');
            var datauri = $img[0].src;

            var data = atob(datauri.split(',')[1]);
            var array = new Uint8Array(data.length);
            for (var i = 0; i < data.length; i++) {
              array[i] = data.charCodeAt(i);
            }

            var blob = new Blob([array], { type : 'image/png'});
            blob.name = 'clipboard.png';

            _editor.restoreNode($editable);
            _editor.restoreRange($editable);

            $.summernote.plugin('image', 'insertImages', { layoutInfo : layoutInfo, files : [blob]});

            _editor.afterCommand($editable);
          }, 0);

          return;
        }

        var item = list.head(clipboardData.items);
        var isClipboardImage = item.kind === 'file' && item.type.indexOf('image/') !== -1;

        if (isClipboardImage) {
          $.summernote.plugin('image', 'insertImages', { layoutInfo : layoutInfo, files : [item.getAsFile()]});
        }

        _editor.afterCommand($editable);
      }
    };
    
  $.summernote.addPlugin(Class);

}));

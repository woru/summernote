define([
  'summernote/core/list',
  'summernote/core/dom'
], function (list, dom) {
  var Clipboard = function (handler) {

    this.attach = function (layoutInfo) {
      layoutInfo.editable().on('paste', hPasteClipboardImage);
    };

    function imageSrcToBlob(datauri) {
      var data = atob(datauri.split(',')[1]);
      var array = new Uint8Array(data.length);
      for (var i = 0; i < data.length; i++) {
        array[i] = data.charCodeAt(i);
      }

      var blob = new Blob([array], {type: 'image/png'});
      blob.name = 'clipboard.png';
      return blob;
    }

    /**
     * paste clipboard image
     *
     * @param {Event} event
     */
    var hPasteClipboardImage = function (event) {
      var clipboardData = event.originalEvent.clipboardData;
      var layoutInfo = dom.makeLayoutInfo(event.currentTarget || event.target);
      var $editable = layoutInfo.editable();

      if (!clipboardData || !clipboardData.items || !clipboardData.items.length) {
        var callbacks = $editable.data('callbacks');
        // only can run if it has onImageUpload method
        if (!callbacks.onImageUpload) {
          return;
        }

        setTimeout(function () {
          var $img = $editable.find('img');
          var changed = false;
          $img.each(function () {
            var image = this;
            if (image.src.indexOf('data:') !== -1) {
              changed = true;
              var dataUri = image.src;
              image.remove();
              handler.insertImages(layoutInfo, [imageSrcToBlob(dataUri)]);
            }
          });
          if (changed) {
            handler.invoke('editor.afterCommand', $editable);
          }
        }, 0);

        return;
      }

      var item = list.head(clipboardData.items);
      var isClipboardImage = item.kind === 'file' && item.type.indexOf('image/') !== -1;

      if (isClipboardImage) {
        handler.insertImages(layoutInfo, [item.getAsFile()]);
      }

      handler.invoke('editor.afterCommand', $editable);
    };
  };

  return Clipboard;
});

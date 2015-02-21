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
      name : 'drop',
      
      $init : function (layoutInfo) {
        var $document = $(document);
        var options = $.summernote.options;
        var editor = $.summernote.eventHandler.getEditor();


        if (options.disableDragAndDrop) {
          // prevent default drop event
          $document.on('drop', function (e) {
            e.preventDefault();
          });
          return;
        }
        
        // add ui dropzone
        var $editor = layoutInfo.editor;
        $('<div class="note-dropzone"><div class="note-dropzone-message"></div></div>').prependTo($editor);

        var collection = $(),
          $dropzone = $editor.find('.note-dropzone'),
          $dropzoneMessage = $dropzone.find('.note-dropzone-message');

        // show dropzone on dragenter when dragging a object to document
        // -but only if the editor is visible, i.e. has a positive width and height
        $document.on('dragenter', function (e) {
          var isCodeview = layoutInfo.editor.hasClass('codeview');
          if (!isCodeview && !collection.length && layoutInfo.editor.width() > 0 && layoutInfo.editor.height() > 0) {
            layoutInfo.editor.addClass('dragover');
            $dropzone.width(layoutInfo.editor.width());
            $dropzone.height(layoutInfo.editor.height());
            $dropzoneMessage.text(options.langInfo.image.dragImageHere);
          }
          collection = collection.add(e.target);
        }).on('dragleave', function (e) {
          collection = collection.not(e.target);
          if (!collection.length) {
            layoutInfo.editor.removeClass('dragover');
          }
        }).on('drop', function () {
          collection = $();
          layoutInfo.editor.removeClass('dragover');
        });

        // change dropzone's message on hover.
        $dropzone.on('dragenter', function () {
          $dropzone.addClass('hover');
          $dropzoneMessage.text(options.langInfo.image.dropImage);
        }).on('dragleave', function () {
          $dropzone.removeClass('hover');
          $dropzoneMessage.text(options.langInfo.image.dragImageHere);
        });

        // attach dropImage
        $dropzone.on('drop', function (event) {
          event.preventDefault();

          var dataTransfer = event.originalEvent.dataTransfer;
          var html = dataTransfer.getData('text/html');
          var text = dataTransfer.getData('text/plain');

          var layoutInfo = $.summernote.plugin('layoutInfo', 'make', (event.currentTarget || event.target));

          if (dataTransfer && dataTransfer.files && dataTransfer.files.length) {
            layoutInfo.editable().focus();
            $.summernote.plugin('image', 'insertImages', { layoutInfo : layoutInfo, files : dataTransfer.files });
          } else if (html) {
            $(html).each(function () {
              layoutInfo.editable().focus();
              editor.insertNode(layoutInfo.editable(), this);
            });
          } else if (text) {
            layoutInfo.editable().focus();
            editor.insertText(layoutInfo.editable(), text);
          }
        }).on('dragover', false); // prevent default dragover event
      }
    };
    
  $.summernote.addPlugin(Class);
    

}));

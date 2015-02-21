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

  var async = $.summernote.core.async;

  var insertImages = function (layoutInfo, files) {
    var editor = $.summernote.eventHandler.getEditor(),
        $editable = layoutInfo.editable();

    var options = $.summernote.options;

      // If onImageUpload options setted
    if (options.onImageUpload) {
      options.onImageUpload(files, editor, $editable);
      // else insert Image as dataURL
    } else {
      $.each(files, function (idx, file) {
        var filename = file.name;
        if (options.maximumImageFileSize && options.maximumImageFileSize < file.size) {
          if (options.onImageUploadError) {
            options.onImageUploadError(options.langInfo.image.maximumFileSizeError);
          } else {
            alert(options.langInfo.image.maximumFileSizeError);
          }
        } else {
          async.readFileAsDataURL(file).then(function (sDataURL) {
            editor.insertImage($editable, sDataURL, filename);
          }).fail(function () {
            if (options.onImageUploadError) {
              options.onImageUploadError();
            }
          });
        }
      });
    }
  };
    
  var Class = {
      name : 'image',
      insertImages : function (data) {
        insertImages(data.layoutInfo, data.files);
      }
    };
    
  $.summernote.addPlugin(Class);
    

}));

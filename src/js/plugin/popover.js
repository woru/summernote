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
  var func = $.summernote.core.func;

  /**
   * returns position from placeholder
   *
   * @private
   * @param {Node} placeholder
   * @param {Boolean} isAirMode
   * @return {Object}
   * @return {Number} return.left
   * @return {Number} return.top
   */
  var posFromPlaceholder = function (placeholder, isAirMode) {
    var $placeholder = $(placeholder);
    var pos = isAirMode ? $placeholder.offset() : $placeholder.position();
    var height = $placeholder.outerHeight(true); // include margin

    // popover below placeholder.
    return {
      left: pos.left,
      top: pos.top + height
    };
  };

  /**
   * show popover
   *
   * @private
   * @param {jQuery} popover
   * @param {Position} pos
   */
  var showPopover = function ($popover, pos) {
    $popover.css({
      display: 'block',
      left: pos.left,
      top: pos.top
    });
  };

  var PX_POPOVER_ARROW_OFFSET_X = 20;
  
  
  var Class = {
      name : 'popover',
      $update : function (data) {
        var $popover = data.layoutInfo.popover();
        var styleInfo = data.styleInfo;
        var isAirMode = data.isAirMode;

        // button 업데이트는 개별 버튼이 $update 를 알아서 구현한다 ? 
        //button.update($popover, styleInfo);

        var $linkPopover = $popover.find('.note-link-popover');
        if (styleInfo.anchor) {
          var $anchor = $linkPopover.find('a');
          var href = $(styleInfo.anchor).attr('href');
          $anchor.attr('href', href).html(href);
          showPopover($linkPopover, posFromPlaceholder(styleInfo.anchor, isAirMode));
        } else {
          $linkPopover.hide();
        }

        var $imagePopover = $popover.find('.note-image-popover');
        if (styleInfo.image) {
          showPopover($imagePopover, posFromPlaceholder(styleInfo.image, isAirMode));
        } else {
          $imagePopover.hide();
        }

        var $airPopover = $popover.find('.note-air-popover');
        if (isAirMode && !styleInfo.range.isCollapsed()) {
          var rect = list.last(styleInfo.range.getClientRects());
          if (rect) {
            var bnd = func.rect2bnd(rect);
            showPopover($airPopover, {
              left: Math.max(bnd.left + bnd.width / 2 - PX_POPOVER_ARROW_OFFSET_X, 0),
              top: bnd.top + bnd.height
            });
          }
        } else {
          $airPopover.hide();
        }
      },

      updateRecentColor : function (button, eventName, value) {
        button.updateRecentColor(button, eventName, value);
      },
      
      hide : function ($popover) {
        $popover.children().hide();
      }
    };
    
  $.summernote.addPlugin(Class);
    

}));

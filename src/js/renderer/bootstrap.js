define([], function () {

  var BootstrapUI = {
    button: function (label, options) {
      var event = options.event;
      var value = options.value;
      var title = options.title;
      var className = options.className;
      var dropdown = options.dropdown;
      var hide = options.hide;

      return '<button type="button"' +
        ' class="btn btn-default btn-sm btn-small note-button' +
        (className ? ' ' + className : '') +
        (dropdown ? ' dropdown-toggle' : '') +
        '"' +
        (dropdown ? ' data-toggle="dropdown"' : '') +
        (title ? ' title="' + title + '"' : '') +
        (event ? ' data-event="' + event + '"' : '') +
        (value ? ' data-value=\'' + value + '\'' : '') +
        (hide ? ' data-hide=\'' + hide + '\'' : '') +
        ' tabindex="-1">' +
        label +
        (dropdown ? ' <span class="caret"></span>' : '') +
        '</button>' +
        (dropdown || '');
    },

    iconButton: function (iconClassName, options) {
      var label = '<i class="' + iconClassName + '"></i>';
      return this.button(label, options);
    },

    toggleButton : function ($button, isActive) {
      $button.toggleClass('active', isActive);
    },

    popover: function (className, content) {
      var $popover = $('<div class="' + className + ' popover bottom in note-popover" style="display: none;">' +
      '<div class="arrow"></div>' +
      '<div class="popover-content">' +
      '</div>' +
      '</div>');

      $popover.find('.popover-content').append(content);
      return $popover;
    },

    dialog: function (className, title, body, footer) {
      return '<div class="' + className + ' modal" aria-hidden="false">' +
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        (title ?
        '<div class="modal-header">' +
        '<button type="button" class="close note-close" aria-hidden="true" tabindex="-1">&times;</button>' +
        '<h4 class="modal-title">' + title + '</h4>' +
        '</div>' : ''
        ) +
        '<div class="modal-body">' + body + '</div>' +
        (footer ?
        '<div class="modal-footer">' + footer + '</div>' : ''
        ) +
        '</div>' +
        '</div>' +
        '</div>';
    },

    dropdown: function (items, className) {
      return '<ul class="dropdown-menu ' + className + '">' + items + '</ul>';
    },

    dropdownItem: function (event, value, display, iconClassName, style) {
      var str = '';
      if (style) {
        str = 'style="' + style + '"';
      }

      return '<li><a data-event="' + event + '" href="#" data-value="' + value + '" ' + str + '>' +
        '<i class="' + iconClassName + '"></i> ' + display +
        '</a></li>';
    },

    buttonGroup: function (buttons, className) {
      return '<div class="btn-group ' + className + '">' + buttons + '</div>';
    },

    toolbar : function (groups, className) {
      return '<div class="btn-toolbar ' + className + '">' + groups + '</div>';
    },

    showTooltip : function ($el, sPlacement) {
      $el.tooltip({
        container: 'body',
        trigger: 'hover',
        placement: sPlacement || 'top'
      });
    },
    hideTooltip: function ($el) {
      $el.tooltip('hide');
    },

    showDialog : function ($dialog) {
      $dialog.modal('show');
    },

    hideDialog : function ($dialog) {
      $dialog.modal('hide');
    },

    onShowDialog : function ($dialog, callback, isOnly) {
      $dialog[isOnly ? 'one' : 'on']('shown.bs.modal', callback);
    },

    onHideDialog : function ($dialog, callback, isOnly) {
      $dialog[isOnly ? 'one' : 'on']('hidden.bs.modal', callback);
    }

  };

  return BootstrapUI;

});
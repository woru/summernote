define(function () {
  var HelpDialog = function (handler) {
    /**
     * show help dialog
     *
     * @param {jQuery} $editable
     * @param {jQuery} $dialog
     * @return {Promise}
     */
    this.showHelpDialog = function ($editable, $dialog) {
      return $.Deferred(function (deferred) {
        var $helpDialog = $dialog.find('.note-help-dialog');

        var ui = handler.ui($editable);

        ui.onHideDialog($helpDialog, function () {
          deferred.resolve();
        }, true);

        ui.showDialog($helpDialog);

      }).promise();
    };

    /**
     * @param {Object} layoutInfo
     */
    this.show = function (layoutInfo) {
      var $dialog = layoutInfo.dialog(),
          $editable = layoutInfo.editable();

      handler.invoke('editor.saveRange', $editable, true);
      this.showHelpDialog($editable, $dialog).then(function () {
        handler.invoke('editor.restoreRange', $editable);
      });
    };
  };

  return HelpDialog;
});

(function ($) {
    $.checkEmpty = function (data) {
        if (data === undefined || $.trim(data).length == 0) {
            return true;
        }
        else {
            return false;
        }
    }
})($)
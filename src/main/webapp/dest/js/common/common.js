(function ($) {
    $.checkEmpty = function (data) {
        if (data === undefined || $.trim(data).length == 0) {
            return true;
        }
        else {
            return false;
        }
    }
    $.failAlertAjax = function (param) {
        $.ajax({
            url: param.url,
            type: param.type,
            data: param.data,
            dataType: param.dataType,
            success: param.success,
            fail: function () {
                alert("you need to sign in");
            }
        })
    }
})($)
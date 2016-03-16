/**
 * Created by chejingchi on 16/3/12.
 */
$(function () {
    $("#sign-in").on("click", function () {
        var username = $("#form-username").val();
        var password = $("#form-password").val();
        var param = {};
        param.username = username;
        param.password = password;
        $.ajax({
            url: signUrl,
            type: "post",
            data: param,
            success: function (data) {
                if (data) {
                    location.href = base + "/bookManager/init";
                }
            }
        });
    })
})
/**
 * Created by chejingchi on 15/12/23.
 */

$(function () {
    /**
     *
     * @param url
     * @param data
     * @param beforeSend
     * @param success
     * @param error
     * @param complete
     */
    var signInUrl = base + "/login/signIn";

    var myAjax = function (url, data, beforeSend, success, error, complete) {
        $.ajax({
            type: "post",
            url: url,
            data: data,
            beforeSend: beforeSend,
            success: success,
            error: error,
            complete: complete
        })
    };

    var User = function (username, password) {
        this.username = username;
        this.password = password;
    };
    User.prototype = {
        sign: function () {
            var data = {
                username: this.username,
                password: this.password
            }
            myAjax(signInUrl,data,null,function(data){
                alert(data);
            },null,null);
        }
    };


    $("#login").on("click", function () {
        var user =
            new User($(this).parent().find("#username").val(), $(this).parent().find("#password").val());
        user.sign();

    });
})
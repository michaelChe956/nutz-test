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
    var SignOutUrl = base + "/login/signOut";

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
        signIn: function () {
            var userInfo = {
                username: this.username,
                password: this.password
            };
            myAjax(signInUrl,userInfo,null,function(data){
                alert(data);
            },null,null);
        },
        signOut : function(){
            var userInfo = {
                username: this.username,
                password: this.password
            };
            myAjax(SignOutUrl,userInfo,null,function(data){
                alert(data);
            },null,null);
        }
    };

    var changeInputSpan = function($div,username){
        $div.find(".form-group").hide();
        $div.find("#login").hide();
        $div.find("#logout").show();
        $div.find("#user").show();
        $("#user").text("username :"+username);
    }


    $("#login").on("click", function () {
        var user =
            new User($(this).parent().find("#username").val(), $(this).parent().find("#password").val());
        user.signIn();
        changeInputSpan($(this).parent(),$(this).parent().find("#username").val());
    });


    $("#logout").on("click", function(){
        alert("111");
        var user = new User();
        user.signOut();
    });
})
$(function () {
    alert(11111);
    var send = function () {
        var sendToAll = $("#sendToAll").val();
        alert(sendToAll);
        var param = {};
        param.sendToAll = sendToAll;
        $.ajax({
            type: "post",
            url: ctx + "message/sendToAllOpenId",
            data: param,
            success: function () {
                alert("发送成功");
            }
        })
    }

    $("#submit").on("click", send);

})
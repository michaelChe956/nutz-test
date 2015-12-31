<%--
  Created by IntelliJ IDEA.
  User: chejingchi
  Date: 15/12/31
  Time: 上午11:48
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <title>Bootstrap 101 Template</title>

    <!-- Bootstrap -->
    <link href="../css/bootstrap.min.css" rel="stylesheet">
    <script src="../react-0.14.0/build/react.js"></script>
    <script src="../react-0.14.0/build/browser.min.js"></script>
    <script src="../js/common/jquery-1.11.3.min.js"></script>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    <script type="text/javascript">
        var me = '<%=session.getAttribute("me") %>';
        var base = '${base}';
    </script>
</head>
<body>
<div id="login-head"></div>



<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="../js/common/jquery-1.11.3.min.js"></script>
<script src="../js/login/login.js"></script>
<script type="text/babel" src="../js/my-react/login/login-react.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="../js/common/bootstrap.min.js"></script>
</body>
</html>

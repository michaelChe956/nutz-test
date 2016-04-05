<%--
  Created by IntelliJ IDEA.
  User: chejingchi
  Date: 16/3/6
  Time: 下午6:53
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>图书管理系统</title>
    <link rel="stylesheet" type="text/css" href="${base}/dest/bootstrap/css/common.css"/>
    <link rel="stylesheet" type="text/css" href="${base}/dest/bootstrap/css/bootstrap.min.css"/>
    <link rel="stylesheet" type="text/css" href="${base}/dest/bootstrap/css/book-manager.css"/>
    <link rel="stylesheet" type="text/css" href="${base}/dest/bootstrap-datapicker/css/bootstrap-datetimepicker.css"/>
    <script src="${base}/dest/bootstrap/js/jquery-1.12.0.min.js"></script>
    <script src="${base}/dest/bootstrap/js/bootstrap.min.js"></script>
    <script src="${base}/dest/js/common/page.js"></script>
    <script src="${base}/dest/js/common/common.js"></script>
    <script src="${base}/dest/js/common/common.js"></script>
    <script src="${base}/dest/bootstrap-datapicker/js/bootstrap-datetimepicker.js"></script>
    <script src="${base}/dest/sweetAlert/js/sweet-alert.js"></script>
    <link rel="stylesheet" type="text/css" href="${base}/dest/sweetAlert/css/sweet-alert.css">
    <script type="text/javascript">
        $(document).ready(function () {
            $("#myNav").affix({
                offset: {
                    top: 125
                }
            });
        });
        var user = ${obj.user};
        var bookList = ${obj.bookList};
        var lendBookUrl = "${base}/bookManager/lendBook";
        var bookApplyInStoreUrl = "${base}/bookManager/bookApplyInStore";
        var searchBookInfoUrl = "${base}/bookManager/searchBookInfo";
        var leadToLendBooksUrl = "${base}/bookManager/leadToLendBooks";
        var returnBooksUrl = "${base}/bookManager/returnBooks";
        var lendBooksByCodeUrl = "${base}/bookManager/lendBooksByCode";
        var returnBooksByCodeUrl = "${base}/bookManager/returnBooksByCode";
        var sureToModifyUrl = "${base}/bookManager/sureToModify";
        var registerUrl = "${base}/SignIn/register";
        var downloadUrl = "${base}/bookManager/download";
    </script>
    <script src="${base}/dest/js/book-manager.js"></script>
</head>
<body data-spy="scroll" data-target="#myScrollspy">
<div class="container">
    <span style="float: right;color: #337ab7;">
        <a href="${base}/signIn/signPage">login</a> | <a href="${base}/signIn/signOut">logout</a>
    </span>
    <div class="jumbotron">
        <h1>图书管理系统</h1>
        <blockquote class="pull-right margin-top-minus-fifth">
            <strong>Books are the ladder of human progress</strong>
            <small>Books are the ladder of human progress&nbsp;<cite>Gorky</cite></small>
        </blockquote>
    </div>
    <div class="row">
        <div class="col-xs-3" id="myScrollspy">
            <ul class="nav nav-tabs nav-stacked" id="myNav">
                <li class="active personInfo"><a href="#section-1">个人信息</a></li>
                <li class="bookInfo"><a href="#section-2">图书信息</a></li>
                <li class="putInBook"><a href="#section-3">录入图书信息</a></li>
                <li class="checkInLendInfo"><a href="#section-4">查看读者借阅图书情况</a></li>
                <li class="lendBook"><a href="#section-5">借书处理</a></li>
                <li class="returnBook"><a href="#section-6">还书处理</a></li>
                <li class="returnBook"><a href="#section-7">录入用户或管理员</a></li>
                <li id="section-8" class="returnBook"><a>导出图书信息</a></li>
                <li id="section-9" class="returnBook"><a>导出借书信息</a></li>
                <li id="section-10" class="returnBook"><a>导出用户信息信息</a></li>

            </ul>
        </div>
        <div class="col-xs-9">
            <div class="personInfo">
                <h3 id="section-1">个人信息</h3>
                <div id="userInfo">
                </div>
                <hr>
            </div>
            <div class="bookInfo">
                <h2 id="section-2">图书信息</h2>
                <table class="table search-table">
                    <tr>
                        <td>
                            <label>书籍编码 :</label>
                            <input class="search-input-bookinfo" type="text"/>
                        </td>
                        <td>
                            <label>书籍名称 :</label>
                            <input class="search-input-bookinfo" type="text"/>
                        </td>
                        <td>
                            <label>图书类别 :</label>
                            <select name="type" class="search-input-bookinfo">
                                <option value="">请选择</option>
                                <option value="1">小说</option>
                                <option value="2">散文</option>
                                <option value="3">漫画</option>
                                <option value="4">技术类</option>
                                <option value="5">人文类</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>书籍作者 :</label>
                            <input class="search-input-bookinfo" type="text"/>
                        </td>
                        <td colspan="2" align="center">
                            <button id="search-books-info" class="btn btn-primary">搜索书籍</button>
                        </td>
                    </tr>
                </table>
                <div id="book-info-pager"></div>
                <hr>
            </div>
            <div class="putInBook">
                <h2 id="section-3">录入图书信息</h2>
                <div class="row">
                    <form class="form-horizontal" role="form">
                        <div class="form-group col-sm-6">
                            <label class="margin-left-minus-fifty col-sm-4 control-label">书籍编码</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="bookCode" placeholder="请输入书籍编码">
                            </div>
                        </div>
                        <div class="form-group col-sm-6">
                            <label class="col-sm-4 control-label">书籍名称</label>
                            <div class="col-sm-8">
                                <input id="bookName" type="text" class="form-control" placeholder="请输入书籍名称">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="row">
                    <form class="form-horizontal" role="form">
                        <div class="form-group col-sm-6">
                            <label class="margin-left-minus-fifty col-sm-4 control-label">图书类别</label>
                            <div class="col-sm-8">
                                <select name="type" id="type" class="form-control">
                                    <option value="1">小说</option>
                                    <option value="2">散文</option>
                                    <option value="3">漫画</option>
                                    <option value="4">技术类</option>
                                    <option value="5">人文类</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group col-sm-6">
                            <label class="col-sm-4 control-label">书籍价格</label>
                            <div class="col-sm-8">
                                <input type="text" id="price" class="form-control" placeholder="请输入书籍价格">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="row">
                    <form class="form-horizontal" role="form">
                        <div class="form-group col-sm-6">
                            <label class="margin-left-minus-fifty col-sm-4 control-label">作者</label>
                            <div class="col-sm-8">
                                <input type="text" id="author" class="form-control" placeholder="录入操作员">
                            </div>
                        </div>
                        <div class="margin-left-minus-fifty form-group col-sm-6">
                            <label class="col-sm-4 control-label">出版社</label>
                            <div class="col-sm-8">
                                <input type="text" id="publishingHouse" class="form-control" placeholder="录入出版社">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="row">
                    <form class="form-horizontal" role="form">
                        <div class="form-group col-sm-6">
                            <label class="margin-left-minus-fifty col-sm-4 control-label">录入数量</label>
                            <div class="col-sm-8">
                                <input type="text" id="num" class="form-control" placeholder="录入数量">
                            </div>
                        </div>
                        <div class="margin-left-minus-fifty form-group col-sm-6">
                            <label class="col-sm-4 control-label">版本</label>
                            <div class="col-sm-8">
                                <input type="text" id="version" class="form-control" placeholder="录入版本">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="row">
                    <form class="form-horizontal" role="form">
                        <div class="form-group col-sm-6">
                            <label class="margin-left-minus-fifty col-sm-4 control-label">录入操作员</label>
                            <div class="col-sm-8">
                                <input type="text" id="applyInStaff" class="form-control" placeholder="录入操作员">
                            </div>
                        </div>
                        <div class="margin-left-minus-fifty form-group col-sm-6">
                            <label class="col-sm-4 control-label">录入时间</label>
                            <div class="col-sm-8">
                                <input size="16" class="form-control pick-time" type="text" value="" readonly>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="row">
                    <form class="form-horizontal" role="form">
                        <div class="form-group col-sm-6">
                            <label class="margin-left-minus-fifty col-sm-4 control-label">排数</label>
                            <div class="col-sm-8">
                                <input type="text" id="libraryRow" class="form-control" placeholder="录入排数">
                            </div>
                        </div>
                        <div class="margin-left-minus-fifty form-group col-sm-6">
                            <label class="col-sm-4 control-label">列数</label>
                            <div class="col-sm-8">
                                <input type="text" id="libraryColumn" class="form-control" placeholder="录入列数">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="row">
                    <form class="form-horizontal" role="form">
                        <div class="form-group col-sm-6">
                            <label class="margin-left-minus-fifty col-sm-4 control-label">页数</label>
                            <div class="col-sm-8">
                                <input type="text" id="pages" class="form-control" placeholder="录入页数">
                            </div>
                        </div>
                        <div class="margin-left-minus-fifty form-group col-sm-6">
                            <label class="col-sm-4 control-label">简介</label>
                            <div class="col-sm-8">
                                <input type="text" id="bookBriefIntroduction" class="form-control" placeholder="录入简介">
                            </div>
                        </div>
                    </form>
                </div>
                <div align="center">
                    <button type="button" id="apply-in-book" class="btn btn-default">图书入库</button>
                </div>
                <hr>
            </div>
            <div class="checkInLendInfo">
                <h2 id="section-4">查看读者借阅图书情况</h2>
                <table class="table search-table">
                    <tr>
                        <td>
                            <label>书籍编码 :</label>
                            <input class="search-input-book-condition" type="text"/>
                        </td>
                        <td>
                            <label>书籍名称 :</label>
                            <input class="search-input-book-condition" type="text"/>
                        </td>
                        <td>
                            <label>图书类别 :</label>
                            <select name="type" class="search-input-book-condition">
                                <option value="">请选择</option>
                                <option value="1">小说</option>
                                <option value="2">散文</option>
                                <option value="3">漫画</option>
                                <option value="4">技术类</option>
                                <option value="5">人文类</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>书籍作者 :</label>
                            <input class="search-input-book-condition" type="text"/>
                        </td>
                        <td colspan="2" align="center">
                            <button id="search-books" class="btn btn-primary">搜索书籍</button>
                        </td>
                    </tr>
                </table>
                <div id="book-read-info-pager"></div>
                <hr>
                <h2 id="section-5">借书处理</h2>
                <div class="row">
                    <form class="form-horizontal" role="form">
                        <div class="form-group col-sm-6">
                            <label class="margin-left-minus-fifty col-sm-4 control-label">书籍编码</label>
                            <div class="col-sm-8">
                                <input type="text" id="lend-book-code" class="form-control" placeholder="录入书籍编码">
                            </div>
                        </div>
                        <div class="margin-left-minus-fifty form-group col-sm-6">
                            <label class="col-sm-4 control-label">借书证号</label>
                            <div class="col-sm-8">
                                <input type="text" name="libraryCardNo" class="form-control" placeholder="借书证号">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="row">
                    <form class="form-horizontal" role="form">
                        <div class="form-group col-sm-6">
                            <label class="margin-left-minus-fifty col-sm-4 control-label">录入操作员</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" placeholder="录入操作员">
                            </div>
                        </div>
                        <div class="margin-left-minus-fifty form-group col-sm-6">
                            <label class="col-sm-4 control-label">录入时间</label>
                            <div class="col-sm-8">
                                <input id="datetimepicker-test" type="text" class="form-control pick-time"
                                       placeholder="" readonly>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="row">
                    <form class="form-horizontal" role="form">
                        <div class="form-group col-sm-6">
                            <label class="margin-left-minus-fifty col-sm-4 control-label">录入操作员</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" placeholder="录入操作员">
                            </div>
                        </div>
                        <div class="margin-left-minus-fifty form-group col-sm-6">
                            <label class="col-sm-4 control-label">录入时间</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control pick-time" placeholder="" readonly>
                            </div>
                        </div>
                    </form>
                </div>
                <div align="center">
                    <button type="button" id="lend-books-by-code" class="btn btn-default">图书借出</button>
                </div>
                <hr>
            </div>
            <div class="lendBook">
                <h2 id="section-6">还书处理</h2>
                <div class="row">
                    <form class="form-horizontal" role="form">
                        <div class="form-group col-sm-6">
                            <label class="margin-left-minus-fifty col-sm-4 control-label">书籍编码</label>
                            <div class="col-sm-8">
                                <input type="text" id="return-book-code" class="form-control" placeholder="录入书籍编码">
                            </div>
                        </div>
                        <div class="margin-left-minus-fifty form-group col-sm-6">
                            <label class="col-sm-4 control-label">借书证号</label>
                            <div class="col-sm-8">
                                <input type="text" name="libraryCardNo" class="form-control" placeholder="借书证号">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="row">
                    <form class="form-horizontal" role="form">
                        <div class="form-group col-sm-6">
                            <label class="margin-left-minus-fifty col-sm-4 control-label">录入操作员</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" placeholder="录入操作员">
                            </div>
                        </div>
                        <div class="margin-left-minus-fifty form-group col-sm-6">
                            <label class="col-sm-4 control-label">录入时间</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control pick-time" placeholder="" readonly>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="row">
                    <form class="form-horizontal" role="form">
                        <div class="form-group col-sm-6">
                            <label class="margin-left-minus-fifty col-sm-4 control-label">录入操作员</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" placeholder="录入操作员">
                            </div>
                        </div>
                        <div class="margin-left-minus-fifty form-group col-sm-6">
                            <label class="col-sm-4 control-label">录入时间</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control pick-time" placeholder="" readonly>
                            </div>
                        </div>
                    </form>
                </div>
                <div align="center">
                    <button type="button" id="return-books-by-code" class="btn btn-default">图书归还</button>
                </div>
                <hr>
            </div>
            <div class="putInUser">
                <h3 id="section-7">录入用户或管理员</h3>
                <div class="row">
                    <form class="form-horizontal" role="form">
                        <div class="form-group col-sm-6">
                            <label class="margin-left-minus-fifty col-sm-4 control-label">用户名:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="register-username" placeholder="请输入用户名">
                            </div>
                        </div>
                        <div class="form-group col-sm-6">
                            <label class="col-sm-4 control-label">密&nbsp;码:</label>
                            <div class="col-sm-8">
                                <input id="register-password" type="password" class="form-control"
                                       placeholder="请输入密码">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="row">
                    <form class="form-horizontal" role="form">
                        <div class="form-group col-sm-6">
                            <label class="margin-left-minus-fifty col-sm-4 control-label">姓&nbsp;名:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="register-name" placeholder="请输入姓名">
                            </div>
                        </div>
                        <div class="form-group col-sm-6">
                            <label class="col-sm-4 control-label">性&nbsp;别:</label>
                            <div class="col-sm-8">
                                <select name="type" id="register-sex" class="search-input-bookinfo">
                                    <option value="">请选择</option>
                                    <option value="0">女</option>
                                    <option value="1">男</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="row">
                    <form class="form-horizontal" role="form">
                        <div class="form-group col-sm-6">
                            <label class="margin-left-minus-fifty col-sm-4 control-label">学&nbsp;号:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="register-study-num" placeholder="请输入学号">
                            </div>
                        </div>
                        <div class="form-group col-sm-6">
                            <label class="col-sm-4 control-label">班级号:</label>
                            <div class="col-sm-8">
                                <input id="register-class-id" type="text" class="form-control"
                                       placeholder="请输入班级号">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="row">
                    <form class="form-horizontal" role="form">
                        <div class="form-group col-sm-6">
                            <label class="margin-left-minus-fifty col-sm-4 control-label">用户类型:</label>
                            <div class="col-sm-8">
                                <select name="type" id="register-user-type" class="search-input-bookinfo">
                                    <option value="">请选择</option>
                                    <option value="0">管理员</option>
                                    <option value="1">用户</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
                <div align="center">
                    <button type="button" id="sign-up-user-admin" class="btn btn-default">录入用户/管理员</button>
                </div>
                <hr>
            </div>
        </div>
    </div>
</div>
<!--模态框-->
<div class="modal fade" id="lendModal" tabindex="-1" role="dialog"
     aria-labelledby="lendModalLabel" aria-hidden="true">
    <div class="modal-dialog my-modal-width">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close"
                        data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title" id="lendModalLabel">
                    借书处理
                </h4>
            </div>
            <div class="modal-body">
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="returnModal" tabindex="-1" role="dialog"
     aria-labelledby="returnModalLabel" aria-hidden="true">
    <div class="modal-dialog my-modal-width">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close"
                        data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title" id="returnModalLabel">
                    还书处理
                </h4>
            </div>
            <div class="modal-body">
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="book-detail-info" tabindex="-1" role="dialog"
     aria-labelledby="bookDetailInfoLabel" aria-hidden="true">
    <div class="modal-dialog my-modal-for-book-info">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close close-and-refresh"
                        data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title" id="bookDetailInfoLabel">
                    请点击借书
                </h4>
            </div>
            <div class="modal-body">
            </div>
        </div>
    </div>
</div>
<form id="downLoad" action="" method="post">
    <input type="hidden" id="download-flag" name="flag"/>
</form>
</body>
</html>


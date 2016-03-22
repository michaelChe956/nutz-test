var data = {
    "bookList": bookList,
    "student": user
}
var bookInfoPage = new PAGER();
pageObjArr.push(bookInfoPage);
var readInfo = new PAGER();
pageObjArr.push(readInfo);
$(function () {
    //图书管理
    var BookManager = {
        //渲染书籍信息
        getBookInfoData: function (tp, pageSize, finalData) {
            var dataSpace = '<div class="data-render"><table class="table table-hover" id="Pui">';
            dataSpace += '<thead><tr>';
            dataSpace += '<td><p>书籍编号</p></td>';
            dataSpace += '<td><p>书籍名称</p></td>';
            dataSpace += '<td><p>书籍作者</p></td>';
            dataSpace += '<td><p>出版社</p></td>';
            dataSpace += '<td><p>书籍类型</p></td>';
            dataSpace += '<td><p>是否可借</p></td>';
            dataSpace += '</tr></thead>';
            for (var i = 0; i < pageSize; i++) {
                var dataId = pageSize * (tp - 1) + i;
                if (dataId + 1 > finalData.length) {
                    break;
                } else {
                    dataSpace += '<tr class="show-detail-info" data-toggle="modal" data-target="#book-detail-info">';
                    dataSpace += '<input type="hidden" value="' + finalData[dataId].id + '" />';
                    dataSpace += '<td><p>' + finalData[dataId].bookCode + '</p></td>';
                    dataSpace += '<td><p>' + finalData[dataId].bookName + '</p></td>';
                    dataSpace += '<td><p>' + finalData[dataId].author + '</p></td>';
                    dataSpace += '<td><p>' + finalData[dataId].publishingHouse + '</p></td>';
                    dataSpace += '<td><p>' + finalData[dataId].typeName + '</p></td>';
                    dataSpace +=
                        finalData[dataId].canLend == 0 ? '<td><p class="text-success">可以借阅</p></td>'
                            : '<td><p class="text-danger">已经借出去</p></td>';
                    dataSpace += '</tr>';
                }
            }
            dataSpace += '</table></div>'
            $("#book-info-pager-div").html(dataSpace);
        },
        //渲染查询书籍信息情况
        checkBookCondition: function (tp, pageSize, finalData) {
            var dataSpace = '<div class="data-render"><table class="table table-hover" id="Pui">';
            dataSpace += '<thead><tr>';
            dataSpace += '<td><p>书籍编号</p></td>';
            dataSpace += '<td><p>书籍名称</p></td>';
            dataSpace += '<td><p>书籍作者</p></td>';
            dataSpace += '<td><p>出版社</p></td>';
            dataSpace += '<td><p>书籍类型</p></td>';
            dataSpace += '<td><p>书籍剩余数量</p></td>';
            dataSpace += '</tr></thead>';
            for (var i = 0; i < pageSize; i++) {
                var dataId = pageSize * (tp - 1) + i;
                if (dataId + 1 > finalData.length) {
                    break;
                } else {
                    dataSpace += '<tr> <input type="hidden" value="' + finalData[dataId].id + '" />';
                    dataSpace += '<td><p>' + finalData[dataId].bookCode + '</p></td>';
                    dataSpace += '<td><p>' + finalData[dataId].bookName + '</p></td>';
                    dataSpace += '<td><p>' + finalData[dataId].author + '</p></td>';
                    dataSpace += '<td><p>' + finalData[dataId].publishingHouse + '</p></td>';
                    dataSpace += '<td><p>' + finalData[dataId].typeName + '</p></td>';
                    dataSpace += '<td><p class="text-success">' + finalData[dataId].num + '</p></td>';
                    if (finalData[dataId].canLend == 0) {
                        dataSpace += '<td><button class="btn lend-book btn-primary" ' +
                            'data-toggle="modal"data-target="#lendModal">借书</button></td>';
                    } else {
                        dataSpace += '<td><button class="btn btn-primary" ' +
                            'data-toggle="modal"data-target="#lendModal" disabled="disabled">借书</button></td>';
                    }
                    dataSpace += '<td><button class="btn return-book btn-primary" ' +
                        'data-toggle="modal"data-target="#returnModal">还书</button></td>';
                    dataSpace += '</tr>';

                }
            }
            dataSpace += '</table></div>'
            $("#book-read-info-pager-div").html(dataSpace);
        },
        //渲染个人信息
        setSelfInfo: function (student) {
            if (student.id <= 0) {
                $("#section-1").hide();
                return;
            }
            student.sex = student.sex == 0 ? '女' : '男';
            student.studyState = student.sex == 0 ? '在读' : '离校';
            var userInfo = '<table class="table table-bordered"><caption></caption><thead></thead><tbody><tr>' +
                '<td class="first-col">姓名</td> <td class="second-col">' + student.name +
                '</td><td class="first-col">性别</td><td class="second-col">' + student.sex +
                '</td></tr><tr></tr><tr><td>借书证</td><td>' + student.libraryCardNo +
                '</td><td>学号</td><td>' + student.studentId +
                '123456789</td></tr><tr><td>班级号</td><td>' + student.classId +
                '</td><td>状态</td><td>' + student.studyState +
                '</td></tr><tr><td colspan="4">联系方式（如联系方式有变动请及时修改，以便能及时联系到你。谢谢！）</td></tr>' +
                '<tr><td>手机号码:</td><td>' + student.telephone +
                '</td><td>第二联系号码:</td><td>' + student.telephone +
                '</td></tr><tr><td>QQ:</td><td>' + student.qq +
                '</td><td>电子邮箱:</td><td>' + student.email +
                '</td></tr><tr><td colspan="5">所借阅的书籍:' + student.books +
                '</td></tr><tr><td colspan="5"> <div align="center">' +
                '<button type="button" class="btn">联系方式修改</button>' +
                '</div></td></tr></tbody></table>';
            $("#userInfo").html(userInfo);
        },
        //展示书籍信息
        showBookDetailInfo: function (bookRow) {
            var bookId = $($(bookRow).find("input")).val();
            var bookDetailInfo = '<table class="table">';
            bookDetailInfo += '<input type="hidden" value="' + bookId + '" />';
            bookId -= 1;
            bookDetailInfo += '<tbody><tr><td class="book-info-width">书籍名称:</td> ';
            bookDetailInfo += '<td class="book-info-width">' + data.bookList[bookId].bookName +
                '</td> <td class="book-info-width">作者:</td> <td class="book-info-width">' + data.bookList[bookId].author +
                '</td> </tr> <tr> <td>页数:</td> <td>' + data.bookList[bookId].pages +
                '</td> <td>版本:</td> <td>' + data.bookList[bookId].version +
                '</td> </tr> <tr> <td>出版社:</td> <td>' + data.bookList[bookId].publishingHouse +
                '</td> <td>类型:</td> <td>' + data.bookList[bookId].type +
                '</td> </tr> <tr> <td rowspan="2"  class="info-brief">图书简介:</td> ' +
                '<td rowspan="2" colspan="3">' + data.bookList[bookId].bookBriefIntroduction +
                '</td> <tr></tr><tr> <td>数量:</td> <td>' + data.bookList[bookId].num +
                '</td> <td class="text-success">可借阅</td> ' +
                '<td><button class="lend-the-book btn btn-large btn-primary" type="button" style="width: 74px">借阅</button> </td>' +
                '</tr> </tr> </tbody> </table>';
            $("#book-detail-info").find(".modal-body").html(bookDetailInfo);
            var num = data.bookList[bookId].num;
            if (0 >= num) {
                $(".lend-the-book").parent().prev().text("已全部借出").removeClass("text-success").addClass('text-danger');
                $(".lend-the-book").attr("disabled", "disabled");
            }

        },
        changeMyLinkInfo: function () {
        },
        //锁定书本等待借出
        lendBook: function ($bookInfo) {
            var bookId =
                $bookInfo.parent().parent().parent().parent().find("input").val();
            $.ajax({
                type: "post",
                url: lendBookUrl,
                data: {
                    bookId: bookId,
                    lendType: false
                },
                dataType: "json",
                success: function (data) {
                    var num = data.book.num;
                    if (0 >= num) {
                        $bookInfo.parent().prev().text("已全部借出").removeClass("text-success").addClass('text-danger');
                    } else {
                        $bookInfo.html(data.book.libraryRow + "排" + +data.book.libraryColumn + "列");
                    }
                    $bookInfo.attr("disabled", "disabled");
                    $bookInfo.parent().prev().prev().text(num);
                }
            });
        },
        //刷新页面的方法
        closeAndRefresh: function () {
            window.location.reload();
        },
        //按条件查询图书
        renderBookInfoByCondition: function () {
            var condition = new Condition(($(".search-input")[0]).value,
                $(".search-input")[1].value, $(".search-input")[2].value,
                $(".search-input")[3].value);
            condition.search();
        },
        //进入借书处理弹出层
        leadToLendBooks: function ($lendObj) {
            var bookId = $lendObj.parent().parent().find("input").val();
            $.ajax({
                url: leadToLendBooksUrl,
                type: "post",
                data: {bookId: bookId},
                dataType: "json",
                success: function (data) {
                    var book = data.book;
                    var dataSpace = '<input name="bookId" type="hidden" value="' + book.id + '" />' + '<div class="row">' +
                        '<form class="form-horizontal" role="form">' +
                        '<div class="form-group col-sm-6">' +
                        '<label class="margin-left-minus-fifty col-sm-4 control-label">书籍编码</label>' +
                        '<div class="col-sm-8">' +
                        '<input type="text" class="form-control" value="' + book.bookCode + '" disabled></div>' +
                        '</div>' +
                        '<div class="margin-left-minus-fifty form-group col-sm-6">' +
                        '<label class="col-sm-4 control-label">借书证号</label>' +
                        '<div class="col-sm-8"><input type="text" name="libraryCardNo" class="form-control" placeholder="借书证号"></div>' +
                        '</div>' +
                        '</form>' +
                        '</div>' +
                        '<div class="row">' +
                        '<form class="form-horizontal" role="form">' +
                        '<div class="form-group col-sm-6">' +
                        '<label class="margin-left-minus-fifty col-sm-4 control-label">录入操作员</label>' +
                        '<div class="col-sm-8"><input type="text" class="form-control" placeholder="录入操作员"></div>' +
                        '</div>' +
                        '<div class="margin-left-minus-fifty form-group col-sm-6">' +
                        '<label class="col-sm-4 control-label">录入时间</label>' +
                        '<div class="col-sm-8"><input type="text" class="form-control" placeholder="默认当前时间"></div>' +
                        '</div>' +
                        '</form>' +
                        '</div>' +
                        '<div class="row">' +
                        '<form class="form-horizontal" role="form">' +
                        '<div class="form-group col-sm-6">' +
                        '<label class="margin-left-minus-fifty col-sm-4 control-label">锁定本数</label>' +
                        '<div class="col-sm-8">' +
                        '<input type="text" class="form-control" value="' + book.lockNum + '" disabled></div>' +
                        '</div>' +
                        '<div class="margin-left-minus-fifty form-group col-sm-6">' +
                        '<label class="col-sm-4 control-label">归还日期</label>' +
                        '<div class="col-sm-8"><input type="text" class="form-control" placeholder="归还日期"></div>' +
                        '</div>' +
                        '</form>' +
                        '</div>' +
                        '<div align="center">' +
                        '<button type="button" class="btn lock-book-lend btn-default">图书借出</button>' +
                        '</div>';
                    $("#lendModal").find(".modal-body").html(dataSpace);
                }
            });
        },

        leadToReturnBooks: function ($retObj) {
            var bookId = $retObj.parent().parent().find("input").val();
            $.ajax({
                url: leadToLendBooksUrl,
                type: "post",
                data: {bookId: bookId},
                dataType: "json",
                success: function (data) {
                    var book = data.book;
                    var dataSpace = '<input name="bookId" type="hidden" value="' + book.id + '" />' + '<div class="row">' +
                        '<form class="form-horizontal" role="form">' +
                        '<div class="form-group col-sm-6">' +
                        '<label class="margin-left-minus-fifty col-sm-4 control-label">书籍编码</label>' +
                        '<div class="col-sm-8">' +
                        '<input type="text" class="form-control" value="' + book.bookCode + '" disabled></div>' +
                        '</div>' +
                        '<div class="margin-left-minus-fifty form-group col-sm-6">' +
                        '<label class="col-sm-4 control-label">借书证号</label>' +
                        '<div class="col-sm-8"><input type="text" name="libraryCardNo" class="form-control" placeholder="借书证号"></div>' +
                        '</div>' +
                        '</form>' +
                        '</div>' +
                        '<div class="row">' +
                        '<form class="form-horizontal" role="form">' +
                        '<div class="form-group col-sm-6">' +
                        '<label class="margin-left-minus-fifty col-sm-4 control-label">录入操作员</label>' +
                        '<div class="col-sm-8"><input type="text" class="form-control" placeholder="录入操作员"></div>' +
                        '</div>' +
                        '<div class="margin-left-minus-fifty form-group col-sm-6">' +
                        '<label class="col-sm-4 control-label">录入时间</label>' +
                        '<div class="col-sm-8"><input type="text" class="form-control" placeholder="默认当前时间"></div>' +
                        '</div>' +
                        '</form>' +
                        '</div>' +
                        '<div class="row">' +
                        '<form class="form-horizontal" role="form">' +
                        '<div class="form-group col-sm-6">' +
                        '<label class="margin-left-minus-fifty col-sm-4 control-label">锁定本数</label>' +
                        '<div class="col-sm-8">' +
                        '<input type="text" class="form-control" value="' + book.lockNum + '" disabled></div>' +
                        '</div>' +
                        '<div class="margin-left-minus-fifty form-group col-sm-6">' +
                        '<label class="col-sm-4 control-label">归还日期</label>' +
                        '<div class="col-sm-8"><input type="text" class="form-control" placeholder="归还日期"></div>' +
                        '</div>' +
                        '</form>' +
                        '</div>' +
                        '<div align="center">' +
                        '<button type="button" class="btn lock-book-return btn-default">图书归还</button>' +
                        '</div>';
                    $("#returnModal").find(".modal-body").html(dataSpace);
                }
            })
        },
        //借出锁定书处理
        lendLockBooks: function ($bookInfo) {
            var bookId = $bookInfo.parent().parent().find("input[name='bookId']").val();
            var libraryCardNo = $bookInfo.parent().parent().find("input[name='libraryCardNo']").val();
            $.ajax({
                type: "post",
                url: lendBookUrl,
                data: {
                    bookId: bookId,
                    lendType: true,
                    libraryCardNo: libraryCardNo
                },
                dataType: "json",
                success: function (data) {
                    alert("借书成功");
                }
            });
        },
        //图书归还
        returnLockBooks: function ($bookInfo) {
            var bookId = $bookInfo.parent().parent().find("input[name='bookId']").val();
            var libraryCardNo = $bookInfo.parent().parent().find("input[name='libraryCardNo']").val();
            $.ajax({
                type: "post",
                url: returnBooksUrl,
                data: {
                    bookId: bookId,
                    libraryCardNo: libraryCardNo
                },
                dataType: "json",
                success: function (data) {
                    if (data.flag) {
                        alert("还书成功");
                    }
                }
            });
        }
    }

    var Condition = function (bookCode, bookName, type, author) {
        this.bookCode = bookCode;
        this.bookName = bookName;
        this.type = type;
        this.author = author;
    }
    Condition.prototype.search = function () {
        var param = {};
        param.bookCode = this.bookCode;
        param.bookName = this.bookName;
        param.type = this.type;
        param.author = this.author;
        $.ajax({
            url: searchBookInfoUrl,
            type: "post",
            data: param,
            dataType: "json",
            success: function (data) {
                readInfo.initPager(1, data.bookInfo, 10, 7, 'book-read-info-pager', 'book-read-info-pager-div',
                    data.bookInfo, BookManager.checkBookCondition, 1);
            }

        })
    }


    var AuthorityCheck = function (student) {
        this.student = student;
    }
    AuthorityCheck.prototype.initCheck = function () {
        $(".personInfo").hide();
        $(".bookInfo").hide();
        $(".putInBook").hide();
        $(".checkInLendInfo").hide();
        $(".lendBook").hide();
        $(".returnBook").hide();
        this.checkUser();
    }
    AuthorityCheck.prototype.checkUser = function () {
        if (this.student.id <= 0) {
            $(".bookInfo").show();
        } else if (this.student.id == 1) {
            $(".putInBook").show();
            $(".checkInLendInfo").show();
            $(".lendBook").show();
            $(".returnBook").show();
        } else {
            $(".personInfo").show();
            $(".bookInfo").show();
        }
    }

    var Book = function (bookCode, bookName, type,
                         price, author, publishingHouse,
                         num, version, applyInStaff,
                         libraryRow, libraryColumn) {
        this.bookCode = bookCode;
        this.bookName = bookName;
        this.type = type;
        this.price = price;
        this.author = author;
        this.publishingHouse = publishingHouse;
        this.num = num;
        this.version = version;
        this.applyInStaff = applyInStaff;
        this.libraryRow = libraryRow;
        this.libraryColumn = libraryColumn;
    }

    Book.prototype.applyInStore = function () {
        var param = {
            bookCode: this.bookCode,
            bookName: this.bookName,
            type: this.type,
            price: this.price,
            author: this.author,
            publishingHouse: this.publishingHouse,
            num: this.num,
            version: this.version,
            applyInStaff: this.applyInStaff,
            libraryRow: this.libraryRow,
            libraryColumn: this.libraryColumn
        }
        $.ajax({
            url: bookApplyInStoreUrl,
            type: "post",
            data: param,
            dataType: "json",
            success: function (data) {
                if (data) {
                    alert("插入成功");
                }
            }
        })
    }


    $(window).load(function () {
        var bookInfo = data.bookList;
        bookInfoPage.initPager(1, bookInfo.length, 10, 7, 'book-info-pager', 'book-info-pager-div',
            bookInfo, BookManager.getBookInfoData, 0);
        readInfo.initPager(1, bookInfo.length, 10, 7, 'book-read-info-pager', 'book-read-info-pager-div',
            bookInfo, BookManager.checkBookCondition, 1);
        BookManager.setSelfInfo(data.student);
        var authority = new AuthorityCheck(data.student);
        authority.initCheck();
    });

    $("#book-info-pager").on("click", ".show-detail-info", function () {
        BookManager.showBookDetailInfo($(this));
    });

    $("#userInfo").on("click", "#change-link-info", function () {
        BookManager.changeMyLinkInfo();
    });
    $("#book-detail-info").on("click", ".lend-the-book", function () {
        BookManager.lendBook($(this));
    });

    $(".close-and-refresh").on("click", function () {
        BookManager.closeAndRefresh();
    })

    $("#apply-in-book").on("click", function () {
        var bookCode = $("#bookCode").val();
        var bookName = $("#bookName").val();
        var type = $("#type").val();
        var price = $("#price").val();
        var author = $("#author").val();
        var publishingHouse = $("#publishingHouse").val();
        var num = $("#num").val();
        var version = $("#version").val();
        var applyInStaff = $("#applyInStaff").val();
        var libraryRow = $("#libraryRow").val();
        var libraryColumn = $("#libraryColumn").val();
        var book = new Book(bookCode, bookName, type,
            price, author, publishingHouse,
            num, version, applyInStaff,
            libraryRow, libraryColumn);
        book.applyInStore();
        BookManager.closeAndRefresh();
    })

    $("#search-books").on("click", function () {
        BookManager.renderBookInfoByCondition();
    })

    $("#book-read-info-pager").on("click", ".lend-book", function () {
        BookManager.leadToLendBooks($(this));
    })

    $("#book-read-info-pager").on("click", ".return-book", function () {
        BookManager.leadToReturnBooks($(this));
    })


    $("#lendModal").on("click", ".lock-book-lend", function () {
        BookManager.lendLockBooks($(this));
    })

    $("#returnModal").on("click", ".lock-book-return", function () {
        BookManager.returnLockBooks($(this));
    })

});
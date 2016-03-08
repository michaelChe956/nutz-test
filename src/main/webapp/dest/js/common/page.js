/**
 * Created by chejingchi on 15/11/9.
 */


var pageObjArr = new Array();


var PAGER = function () {
    this.currentPage = 1;  //当前页
    this.totalPages = 0; //总页数
    this.pageNums = 10;  //显示的页码数
    this.pageNumArr = new Array();  //页码数组
    this.pager = null;  //显示分页的html对象
    this.callbackFun = null;  //回调函数, 入参: 当前页码
    this.pageSize = null;
    this.pageDivName = null;
    this.finalData = [];
    this.position = 1;
};

/**
 * 初始化分页参数
 * currentPage: 当前页码
 * total: 总页数
 * pageSize: 每页显示条目数
 * pageNums: 显示的页码数
 * pageDivName:分页显示的div
 * obj: 显示分页的html对象id
 * callbackFun: 分页回调函数
 */
PAGER.prototype.initPager =
    function (currentPage, total, pageSize, pageNums, obj, pageDivName, finalData, callbackFun, position) {
        if (total % pageSize == 0) {
            this.totalPages = total / pageSize;
        } else {
            this.totalPages = total / pageSize + 1;
        }
        this.totalPages = parseInt(this.totalPages);
        this.currentPage = currentPage;
        this.pageNums = pageNums;
        this.pager = document.getElementById(obj);
        this.callbackFun = callbackFun;
        this.pageSize = pageSize;
        this.pageDivName = pageDivName;
        this.finalData = finalData;
        this.position = position;
        this.renderPager();
    }

/**
 * 渲染分页数据
 */
PAGER.prototype.renderPager = function () {
//alert(this.currentPage);
    var begin = 1;
    this.pageNumArr = new Array();
    var midPage = Math.floor(this.pageNums / 2);
    if (this.totalPages > this.pageNums) {
        if (this.currentPage > midPage) {
            begin = this.currentPage - midPage;
        }
        if (this.totalPages - this.currentPage < midPage) {
            begin = this.totalPages - (this.pageNums - 1);
        }
    }
    for (var i = begin; i <= this.totalPages && i < this.pageNums + begin; i++) {
        this.pageNumArr.push(i);
    }
    var pageStr = "<div id='" + this.pageDivName + "'></div>";
    var preStr = '<ul id = "paging" class = "pagination">';
    preStr += '<li><a>共' + this.totalPages + '页</a></li>'
    preStr += "<li><a id='prePage' onclick='UsePager.gotoPrePage(" + this.position + ")'>&laquo;</a></li>";
    var nextStr = "<li><a id='nextPage' onclick='UsePager.gotoNextPage(" + this.position + ")'>&raquo;</a></li>";
    nextStr += '<li><label class="paging-style">至</label><input type="text" value="" class="paging-style" ' +
        'id="inputPageNo" name="inputPageNo"><label class="paging-style">页</label></li>';
    nextStr += '<li><a class="fontC36cS12 jump" title="" ' +
        'onclick="UsePager.gotoChoosePage(' + this.position + ')">跳转</a></li>';
    var cenStr = "";
    for (var i = 0; i < this.pageNumArr.length; i++) {
        if (this.currentPage == this.pageNumArr[i]) {
            cenStr += "<li class='active'><a onclick='UsePager.gotoPage(" + this.position + "," + this.pageNumArr[i] + ")'>" + this.pageNumArr[i] + "</a></li>";
        } else {
            cenStr += "<li><a onclick='UsePager.gotoPage(" + this.position + "," + this.pageNumArr[i] + ")'>" + this.pageNumArr[i] + "</a></li>";
        }
    }
    pageStr = pageStr + preStr + cenStr + nextStr + "</ul>";
    this.pager.innerHTML = pageStr;
    this.doCallBack();
}
/**
 * 执行回调函数
 */
PAGER.prototype.doCallBack = function () {
    if (this.callbackFun) {
        this.callbackFun(this.currentPage, this.pageSize, this.finalData);
    }
}
/**
 * 跳转到首页
 */
PAGER.prototype.gotoFirstPage = function () {
    this.currentPage = 1;
    this.renderPager();
}
/**
 * 跳转到尾页
 */
PAGER.prototype.gotoLastPage = function () {
    this.currentPage = this.totalPages;
    this.renderPager();
}
/**
 * 跳转到上一页
 */
PAGER.prototype.gotoPrePage = function () {
    if (this.currentPage > 1) {
        this.currentPage--;
        this.renderPager();
    }
}
/**
 * 跳转到下一页
 */
PAGER.prototype.gotoNextPage = function () {
//if(this.currentPage<this.pageNumArr[this.pageNumArr.length-1]) {
    if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.renderPager();
    }
}
/**
 * 跳转到指定页
 */
PAGER.prototype.gotoPage = function (targetPage) {
    if (targetPage < 1) {
        targetPage = 1;
    } else if (targetPage > this.totalPages) {
        targetPage = this.totalPages;
    }
    this.currentPage = targetPage;
    this.renderPager();
}

var UsePager = {
    target: null,
    gotoPage: function (position, targetPage) {
        this.target = pageObjArr[position];
        this.target.gotoPage(targetPage);
    },
    gotoChoosePage: function (position) {
        this.target = pageObjArr[position];
        var inputPageNo = this.target.pager.getElementsByTagName("input")[0].value;

        if (inputPageNo > 0 && inputPageNo < this.target.totalPages + 1) {
            this.target.gotoPage(inputPageNo);
        }
    },
    gotoNextPage: function (position) {
        this.target = pageObjArr[position];
        this.target.gotoNextPage();
    },
    gotoPrePage: function (position) {
        this.target = pageObjArr[position];
        this.target.gotoPrePage();
    },
    gotoLastPage: function (position) {
        this.target = pageObjArr[position];
        this.target.gotoLastPage();
    },
    gotoFirstPage: function (position) {
        this.target = pageObjArr[position];
        this.target.gotoFirstPage();
    }
}
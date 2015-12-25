<%--
  Created by IntelliJ IDEA.
  User: chejingchi
  Date: 15/12/23
  Time: 上午10:30
  To change this template use File | Settings | File Templates.
--%>
<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">nutz-test</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <div class="navbar-form navbar-right">
                <div class="form-group">
                    <input type="text" id="username" placeholder="Username" value="admin" class="form-control">
                </div>
                <div class="form-group">
                    <input type="password" id="password" placeholder="Password" value="123456" class="form-control">
                </div>
                <button id="login" class="btn btn-success">Sign in</button>
                <span id="user" style="color: red;font-size: 20px;margin-right: 13px;" style="display: none"></span>
                <button id="logout" class="btn btn-success" style="display: none">Sign out</button>
            </div>
        </div>
    </div>
</nav>
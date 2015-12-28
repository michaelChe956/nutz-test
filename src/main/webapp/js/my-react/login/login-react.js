var navbar = React.createClass({
    render : function(){
        return(
            <div id="navbar" class="navbar-collapse collapse">
            </div>
        )
    }
})

var Button = React.createClass({
    render : function(){
        return(
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toogle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
            </button>
        );
    }
})


var LoginHead = React.createClass({
    render: function () {
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <Button />
                        <a className="navbar-brand" href="#">nutz-test</a>
                    </div>
                </div>
            </nav>
        );
    }
})

React.render(
    <LoginHead />,
    document.getElementById('login-head')
);
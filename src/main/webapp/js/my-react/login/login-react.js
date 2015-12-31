var DropDownMenu = React.createClass({
    render : function(){
        return(
            <ul className="dropdown-menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something else here</a></li>
                <li role="separator" className="divider"></li>
                <li className="dropdown-header">Nav header</li>
                <li><a href="#">Separated link</a></li>
                <li><a href="#">One more separated link</a></li>
            </ul>
        )
    }
})

var DropDown = React.createClass({
    render : function(){
        return(
            <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown"
                   role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span>
                </a>
                <DropDownMenu />
            </li>
        )
    }
})

var NavbarUl = React.createClass({
    render : function(){
        return(
            <ul className="nav navbar-nav">
                <li className="active"><a href={this.props.nav_List.home}>Home</a></li>
                <li><a href={this.props.nav_List.about}>About</a></li>
                <li><a href={this.props.nav_List.contact}>Contact</a></li>
                <DropDown />
            </ul>
        )
    }
});

var Navbar = React.createClass({
    render : function(){
        return(
            <div id="navbar" className="navbar-collapse collapse">
                <NavbarUl nav_List = {this.props.nav_List} />
            </div>
        )
    }
});

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
                        <a className="navbar-brand" href="#">
                            {this.props.data.projectName}
                        </a>
                    </div>
                    <Navbar nav_List = {this.props.data.url_List} />
                </div>
            </nav>
        );
    }
})

var data = function(){
    return {
        projectName: "nutz-test",
        url : "",
        url_List: {
            home :  "../home/index",
            about : "../home/about",
            contact : "../home/contact"
        }
    }
}


React.render(
    <LoginHead data = {data()} />,
    document.getElementById('login-head')
);
var data = [
    {author: "Pete Hunt", text: "this is one comment"},
    {author: "jordan walke", text: "this is *another* comment"}
];
var Comment = React.createClass({
    rawMarkup: function () {
        var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
        return {__html: rawMarkup}
    },
    render: function () {
        return (
            <div className="comment">
                <h2 className = "commentAuthor">
                {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
            </div>
        );
    }
});

var CommentList = React.createClass({
    render: function () {
        var commentNodes = this.props.data.map(function (comment) {
            return (
                <Comment author = {comment.author}>
                    {comment.text}
                </Comment>
            );
        });
        return (
            <div className="commentList">
            {commentNodes}
            </div>
        );
    }
});

var CommentForm = React.createClass({
        handleSubmit: function (e) {
            e.preventDefault();
            var author = this.refs.author.getDOMNode().value.trim();
            var text = this.refs.text.getDOMNode().value.trim();
            if (!text || !author) {
                return;
            }
            alert(author + text);
            this.props.onCommentSubmit({author: author, text: text});
            this.refs.author.getDOMNode().value = '';
            this.refs.text.getDOMNode().value = '';
            return;
        },


        render: function () {
            return (
                <form className = "commentForm" onsubmit={this.handleSubmit}>
                    <input type="text" placeholder="Your name" ref="author" />
                    <input type="text" placeholder="Say balabala ..." ref="text" />
                    <input type="submit" value="post" />
                </form>
            )
        }
    }
);

var CommentBox = React.createClass({
    loadCommentsFromServer: function () {
        $.ajax({
                url: this.props.url,
                dataType: 'json',
                cache: false,
                success: function (data) {
                    this.setState({data: data.users});
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            }
        );
    },
    handleCommentSubmit: function(comment) {
        var comments = this.state.data;
        var newComments = comments.concat([comment]);
        this.setState({data: newComments});
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });

    },

    getInitialState: function () {
        return {data: []};
    },
    componentDidMount: function () {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },

    render: function () {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data = {this.state.data}/>
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
});


ReactDOM.render(
    <CommentBox url = {ctx + "cheChat/dataPrepare"} pollInterval={2000} />,
    document.getElementById('content')
);

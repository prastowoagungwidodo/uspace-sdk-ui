module.exports = React.createClass({
    getInitialState: function() {
        return {
            config: this.props.config
        }
    },

    componentDidMount: function() {
        setTimeout(function() {
            this.niceScrollInit();
        }.bind(this), 0);
    },

    niceScrollInit: function() {
       if (typeof $.fn.niceScroll !== 'undefined') {
            $('.sides.contents').niceScroll({
                cursorcolor: "transparent",
                cursorborder: "transparent",
                horizrailenabled: false
            });
           $('.sides.contents').niceScroll();

            var currentURL = window.location.href;
            $('.item.sides').each(function() {
                var link = $(this).attr('href');
                if (currentURL.indexOf(link) > 0) {
                    $(this).addClass('active');
                }
            });
       } else {
           setTimeout(function(){
               this.niceScrollInit();
           }.bind(this), 100);
       }
    },

    componentWillUnmount: function() {
        $('.sides.contents').getNiceScroll().remove();
    },

    render(){

        var contentInfo = '';
        if (this.state.config.info) {
            contentInfo = this.state.config.info;
        }

        var contentSegment = '';
        if (this.state.config.segment) {
            contentSegment = this.state.config.segment;
        }

        var contentMenu = [];
        if (this.state.config.menu) {
            contentMenu = this.state.config.menu;
        }
        return (
            <div className="sides contents">
                { contentInfo.length > 0 && (
                    <div className="ui tertiary inverted blue segment">
                        {
                            contentInfo.map(function(value, key){
                                return (
                                    <div key={key}>
                                        <h4>{value.title}</h4>
                                        <div dangerouslySetInnerHTML={{__html: value.content}}></div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )}

                { contentSegment.length > 0 && (
                    contentSegment.map(function(value, key){
                        return (
                            <div key={key} className="ui segment">
                                <div className="ui small header">{value.title}</div>
                                <div className="ui huge header light">{value.content}</div>
                            </div>
                        )
                    })
                )}
                <div className="ui fluid vertical menu">
                    { contentMenu.length > 0 && (
                        contentMenu.map(function(value, key){
                            return (
                                <a key={key} href={value.url} className="item sides">{value.title}</a>
                            )
                        })
                    )}
                </div>
            </div>
        )
    }
})
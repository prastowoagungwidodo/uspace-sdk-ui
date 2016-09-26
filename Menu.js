import React from 'react';

export default class Menu extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            menu:[]
        }
    }

    componentDidMount(){
        if (localStorage.menu) {
            this.setState({
                menu: JSON.parse(localStorage.menu)
            });
        }

        // this.requestMenu();
        setTimeout(function() {
            this.jsLibsInit();
        }.bind(this), 0);
    }

    jsLibsInit() {
        if (typeof $.fn.owlCarousel !== 'undefined' && typeof $.fn.popup !== 'undefined' && typeof $.fn.niceScroll !== 'undefined') {
            var variant = '';
            if (this.props.variant) {
                if (this.props.variant === 'dark') {
                    variant = 'inverted';
                }
            }
            $('.item.popups').popup({
                inline: false,
                hoverable: true,
                position: 'right center',
                variation: variant,
                delay: {
                    show: 400,
                    hide: 400
                }
            });

            var currentURL = window.location.href;
            $('.item.popups').each(function() {
                var link = $(this).attr('href');
                if (currentURL.indexOf(link) > 0) {
                    $(this).addClass('active');
                }
            });

            $('.ui.side').niceScroll({
                cursorcolor: "transparent",
                cursorborder: "transparent",
                horizrailenabled: false
            });
        } else {
            setTimeout(function() {
                this.jsLibsInit();
            }.bind(this), 100);
        }
    }

    componentWillUnmount() {
        //this.requestMenu.abort();
        $('.item.popups').popup('destroy');
        $('.ui.side').getNiceScroll().remove();
    }

    globalSearch(e) {
        e.preventDefault();
        console.log('global search ready!');
        $(".ui.navbar").toggleClass('blured');
        $(".ui.wrapper").toggleClass('blured');
        // $('body').css('background-image','url(../libs-sdk-ui/img/background.jpg)');
        setTimeout(function() {
            $(".global.search").toggleClass('show');
        },310);
    }

    render(){
        return (
            <div className="workspace">
                <div className="ui side" style={{overflowY: 'hidden', outline: 'none'}}>
                    <div className="ui vertical menu sides">
                        <a href="" onClick={this.globalSearch} className="item active brand">
                            <img src="../libs-sdk-ui/img/white-small.png" alt=""/>
                        </a>
                        <a href="/web-platform/core-dashboard/" className="item popups" title="Dashboard">
                            <i className="ion-home ion-medium"/>
                        </a>
                        <a href="/web-platform/apps-store/" className="item popups" title="Software Center">
                            <i className="ion-bag ion-medium"/>
                        </a>
                        {
                            this.state.menu.map((value, key) =>
                                <a href="" className="item popups" key={key} data-content={value.Name} data-variation="tiny">
                                    <img src={value.Icon}/>
                                </a>
                            )
                        }
                        <a href="/web-platform/core-setting/" className="item popups" title="Settings">
                            <i className="ion-android-options ion-medium"/>
                        </a>

                    </div>
                </div>
                <div className="global search">
                    <div className="ui huge fluid icon input">
                        <input type="text" placeholder="Search everything..."/>
                        <i className="search icon"></i>
                    </div>
                    <div className="ui inverted horizontal divider">Suggestion</div>
                    <div className="ui five column stackable doubling grid">
                        <div className="column">asd</div>
                        <div className="column">asd</div>
                        <div className="column">asd</div>
                        <div className="column">asd</div>
                        <div className="column">asd</div>
                    </div>
                </div>
            </div>
        )
    }
}

"format es6";

import React from 'react';
import moment from 'moment';
export default class Navbar extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            config: this.props.config,
            defaultId: '2a34a7af49cf9d8698ff0e004f31a0d2',
            weather: {
                temp: 0,
                city: 'Jakarta',
                description: 'clear sky',
                icon: '800',
                lat: -6.2197,
                lon: 106.8304
            }
        }
        this.getWeather = this.getWeather.bind(this);
    }

    componentDidMount(){
        setTimeout(function(){
            function clock() {
                $('.clock').html(moment().format('H:mm'));
                $('.date').html(moment().format('ll'));
            }
            setInterval(clock, 1000);

            $('.sidebar.toggle').click(function() {
                $('body').toggleClass('push');
                $('.ui.navbar').toggleClass('push');
                $('.ui.side').toggleClass('push');
                $('.ui.notification').toggleClass('active');
            });
            $('.ui.wrapper').click(function() {
                $('body').removeClass('push');
                $('.ui.navbar').removeClass('push');
                $('.ui.side').removeClass('push');
                $('.ui.notification').removeClass('active');
            });
            $('.item.icon.sidebars').click(function(e) {
                e.preventDefault();
                $('.sides.contents').toggleClass('show');
            });
            this.niceScrollInit();
       }.bind(this), 0);
       this.getWeather();
   }

   niceScrollInit(){
       if (typeof $.fn.owlCarousel !== 'undefined' && typeof $.fn.niceScroll !== 'undefined') {
           $('#notification').niceScroll({
               cursorborder: "transparent",
           });
           $("#slider-notification").owlCarousel({
               navigation        : true,
               navigationText    : [
                   '<i class="chevron left icon"></i>',
                   '<i class="chevron right icon"></i>'
               ],
               items             : 1,
               itemsDesktop      : [1199,1],
               itemsDesktopSmall : [979,1],
               itemsDesktopSmall : [768,1],
               slideSpeed        : 300,
               paginationSpeed   : 400,
               singleItem        : false,
               mouseDrag         : true,
               touchDrag         : true,
           });
       } else {
           setTimeout(function(){
               this.niceScrollInit();
           }.bind(this), 100);
       }
   }

    componentWillUnmount() {
        $('#notification').getNiceScroll().remove();
    }

    getWeather(callback) {
        var vm = this;
        var request = new XMLHttpRequest;
        var params = '?lat='+vm.state.weather.lat;
        params += '&lon='+vm.state.weather.lon;
        params += '&units=metric';
        params += '&appid='+vm.state.defaultId;
        request.open('GET', 'http://api.openweathermap.org/data/2.5/weather'+params, true);
        request.send();
        request.onload = function(){
            var res = JSON.parse(this.responseText);
            var data = {
                temp: parseInt(res.main.temp),
                city: res.name,
                description: res.weather[0].description,
                icon: res.weather[0].id,
                lat: res.coord.lat,
                lon: res.coord.lon
            };

            vm.setState({
                weather: data
            });
        };
    }

    renderLeftMenu(element){
        if (typeof element === 'string') {
            return <h3 className="ui header">{element}</h3>
        } else {
            return (
                <element>
                    { element.map(function(element, key){
                        var tooltipProps = {}
                        if (element['title']) {
                            tooltipProps = {
                                'data-tooltip': element.title,
                                'data-position': 'bottom center'
                            };
                        }
                        if (element.type && element.type === 'text') {
                            return <h3 key={key} className="ui header" onClick={element.onClick}>{element.text}</h3>
                        } else if(element.type !== 'text' && element.icon) {
                            return <button {...tooltipProps} key={key} className={ (element.color ? 'ui compact ' + element.color + ' icon button' : 'ui compact basic icon button')} onClick={element.onClick}><i className={element.icon}/>{element.text}</button>
                        } else {
                            return <button {...tooltipProps} key={key} className={(element.color ? 'ui compact ' + element.color + ' button': 'ui compact basic button')} onClick={element.onClick}>{element.text}</button>
                        }
                    }) }
                </element>
                )
        }
    }

    renderCenterMenu(element){
        var vm = this;
        if (typeof element === 'string') {
            return <h3 className="ui header">{element}</h3>;
        } else {
            if (element['description']) {
                return (
                    <div className="ui center aligned header">
                        {element.text}
                         <div className="sub header">
                            {element.description}
                        </div>
                    </div>
                )
            } else {
                return(
                    <div className="ui buttons">
                        { element.map(function(element, key){
                            return (
                                <button key={key} className={vm.activeClassBtn(element)} onClick={element.onClick}>{element.text}</button>
                            )
                        }) }
                    </div>
                )
            }
        }
    }

    renderAdditionalMenu(element){
        var btnClass = "ui basic basic button";
        if (element.color) {
            btnClass = "ui basic basic "+element.color+" button";
        }
        var tooltipProps = {}

        if (element['title']) {
            tooltipProps = {
                'data-tooltip': element.title,
                'data-position': 'bottom center'
            };
        }
        if (element.type && element.type === 'text') {
            return <h3 className="ui header" onClick={element.onClick}>{element.text}</h3>
        } else if(element.type !== 'text' && element.icon) {
            return <button {...tooltipProps} className={btnClass+' icon'} onClick={element.onClick}><i className={element.icon}/>{element.text}</button>
        } else {
            return <button {...tooltipProps} className={btnClass} onClick={element.onClick}>{element.text}</button>
        }
    }

    activeClassBtn(element){
        if (element.active) {
            return "ui active button";
        } else {
            return "ui button";
        }
    }

    onSearch(e){
        if (this.state.config.onSearch){
            this.state.config.onSearch(e);
        }
    }

    render(){
        var vm = this;

        var sideMenu = [];
        if (this.state.config.side) {
            sideMenu = this.state.config.side;
        }

        var leftArea = '';
        if (this.state.config.left){
            leftArea = this.state.config.left;
        }
        var centerArea = '';
        if (this.state.config.center){
            centerArea = this.state.config.center;
        }

        var rightArea = '';
        if (this.state.config.right) {
            rightArea = this.state.config.right;
        }

        var additionalArea = [];
        if (this.state.config.additional) {
            additionalArea = this.state.config.additional;
        }

        return(
            <element>
                <div className="ui loaders"></div>
                <div className="ui navbar">
                    <div className="ui menu">
                        { sideMenu === true  && (
                            <a href="" className="item icon sidebars">
                                <i className="large chevron right icon"></i>
                            </a>
                        )}

                        <div className="item" style={{flex:1}}>
                            {this.renderLeftMenu(leftArea)}
                        </div>
                        <div className="item" style={{flex:2,marginLeft:-46,justifyContent: 'center', alignItems:'center'}}>
                            {this.renderCenterMenu(centerArea)}
                        </div>
                        <div className="menu right" style={{flex:1, justifyContent:'flex-end'}}>
                            {/*<div className="item">
                                <a href="" className="ui inverted button">Upgrade</a>
                                </div>
                                <a href="" className="item">
                                <i className="ticon small light actions skrooge_credit_card"/>
                            </a>*/}
                            <div className="item">
                                { rightArea.length === 0 && (
                                    <div className="ui icon input">
                                        <input type="text" ref="keyword" onKeyUp={this.onSearch} placeholder="Search..."/>
                                        <i className="search icon"></i>
                                    </div>
                                ) }

                                {this.renderLeftMenu(rightArea)}
                            </div>

                            { additionalArea.length > 0 && (
                                additionalArea.map(function(element, key){
                                    return (
                                        <div key={key} className="item">
                                            <element>
                                                { vm.renderAdditionalMenu(element) }
                                            </element>
                                        </div>
                                    )
                                })
                            )}

                            <div className="item icon sidebar toggle">
                                {/* <img src="assets/img/avatar/default.png"/> */}
                                <i className="sidebar icon"></i>
                            </div>
                            <div className="ui notification" id="sidebar">
                                <div className="top contents">
                                    <div className="ui left floated header">Notification</div>
                                    <a className="ui right floated header clear">Clear All</a>
                                    <div className="ui hidden divider"></div>
                                    <div className="ui items" id="notification">
                                        <div className="item">
                                            <div className="content">
                                                <div className="title">
                                                    Application name
                                                    <div className="ui top right floated header time">1 Day</div>
                                                </div>
                                                <div className="meta">
                                                    lorem ipsum dolor sit amet constectur ...
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="content">
                                                <div className="title">
                                                    Application name
                                                    <div className="ui top right floated header time">1 Day</div>
                                                </div>
                                                <div className="meta">
                                                    lorem ipsum dolor sit amet constectur ...
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="content">
                                                <div className="title">
                                                    Application name
                                                    <div className="ui top right floated header time">1 Day</div>
                                                </div>
                                                <div className="meta">
                                                    lorem ipsum dolor sit amet constectur ...
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="content">
                                                <div className="title">
                                                    Application name
                                                    <div className="ui top right floated header time">1 Day</div>
                                                </div>
                                                <div className="meta">
                                                    lorem ipsum dolor sit amet constectur ...
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="content">
                                                <div className="title">
                                                    Application name
                                                    <div className="ui top right floated header time">1 Day</div>
                                                </div>
                                                <div className="meta">
                                                    lorem ipsum dolor sit amet constectur ...
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="content">
                                                <div className="title">
                                                    Application name
                                                    <div className="ui top right floated header time">1 Day</div>
                                                </div>
                                                <div className="meta">
                                                    lorem ipsum dolor sit amet constectur ...
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="content">
                                                <div className="title">
                                                    Application name
                                                    <div className="ui top right floated header time">1 Day</div>
                                                </div>
                                                <div className="meta">
                                                    lorem ipsum dolor sit amet constectur ...
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bottom contents">
                                    <div className="inner contents">
                                        <div id="slider-notification" className="owl-carousel owl-dark owl-theme">
                                            <div className="ui basic segment">
                                                <div className="clock"></div>
                                                <div className="date"></div>
                                            </div>
                                            <div className="ui basic segment">
                                                <div className="ui inverted statistic">
                                                    <div className="header">
                                                        {this.state.weather.city}
                                                    </div>
                                                    <div className="value">
                                                        {this.state.weather.temp}&nbsp;<sup>O</sup>&nbsp;C
                                                    </div>
                                                    <div className="label">
                                                        {this.state.weather.description} <i className={"owf owf-"+this.state.weather.icon+" owf-2x"}></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divides"></div>
                                    <div className="ui basic buttons">
                                        <button className="ui icon button">
                                            <i className="ion-ios-person-outline ion-medium icon"></i>
                                            <p>Account</p>
                                        </button>
                                        <button className="ui icon button">
                                            <i className="ion-ios-gear-outline ion-medium icon"></i>
                                            <p>Settings</p>
                                        </button>
                                        <button className="ui icon button">
                                            <i className="ion-ios-close-outline ion-medium icon"></i>
                                            <p>Sign Out</p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </element>
        )
    }
}

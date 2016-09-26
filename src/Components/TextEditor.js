/**
 * Wysiwyg Component for Transformatika Web Platform
 * Author : Muhibbudin Suretno
 * Build : 16062016
 * Version : 1.0
 */

export default class TextEditor extends React.Component {
    /*
     * Constructor state and props
     */
    constructor(props) {
        super(props);
        this.state = {}
    }

    /*
     * When component will use / render
     */
    componentDidMount() {
        document.getElementById('title').addEventListener('input', this.inputChanged.bind(this), false);
        document.getElementById('editor').addEventListener('input', this.inputChanged.bind(this), false);

        setTimeout(function() {
            $('#title').attr('contenteditable', 'true').focus();
            $('#editor').attr('contenteditable', 'true');
            $('#precode').attr('contenteditable', 'true');

            /* Default toolbar clicked function */
            $('._toolbar').each(function() {
                var el = $(this);
                $(this).bind('click', function(e) {
                    e.preventDefault();

                    var textHTML = $('#editor').html(),
                        encoded = $('<div/>').text(textHTML).html();

                    /* Show editor in developer mode */
                    if (el.data('type') === '_toCODE') {
                        $('#precode').html(encoded).show();
                        $('#editor').hide();
                    }
                    
                    /* Show editor in HTML5 mode */
                    else if (el.data('type') === '_toHTML') {
                        $('#editor').show();
                        $('#precode').hide();
                    }
                    
                    /* Show help modal */
                    else if (el.data('type') === 'help') {
                        $('.ui.modal').modal('show');
                    }

                    /* Text formating block H1 until H6 */
                    else if (el.data('type') === 'formatBlock') {
                        document.execCommand(el.data('type'), false, '<' + el.data('size') + '>');
                    }

                    /* Default exec command */
                    else {
                        document.execCommand(el.data('type'), false, null);
                    }
                });
            });

            /* Popup toolbar clicked function */
            $('._popup').each(function() {
                var el = $(this);
                $(this).bind('click', function(e) {
                    e.preventDefault();
                });
                $(this).popup({
                    on: 'click',
                    target: el.attr('dt-target'),
                    position: el.attr('dt-position')
                });
            });

            $('.editor').niceScroll();
            $('.ui.bottom.attached.menu').niceScroll();
            $('.ui.modal').modal({ context: 'body' });
        }.bind(this), 0);
    }

    /*
     * When component will destroy / unrender
     */
    componentWillUnmount() {
        /* Kill all toolbar element */
        $('._toolbar').each(function() {
            $(this).unbind('click');
        });

        /* Kill all popup toolbar element */
        $('._popup').each(function() {
            $(this).unbind('click');
            $(this).popup('destroy');
        });
        $('.editor').getNiceScroll().remove();
        $('.ui.bottom.attached.menu').getNiceScroll().remove();
        $('.ui.modal').remove();
    }

    /*
     * Detect editor changed state
     */
    inputChanged(e) {
        var title   = document.getElementById('title').innerHTML,
            content = document.getElementById('editor').innerHTML;
        this.props.onChange({
            title: title,
            content: content
        });
    }

    /*
     * Open inline popup above selection text
     */
    openInlinePopup(e) {
        var cordinate = window.getSelection().getRangeAt(0).getClientRects(),
            selection = (window.getSelection) ? window.getSelection().toString() : "";
        
        $('.popover').hide();
        if (selection != "") {
            $('.popover').show();
            $('.popover').css({
                top: cordinate[0].top - $('.popover').outerHeight(),
                left: cordinate[0].left
            });
        }
    }

    /*
     * Convert paste url to embed or img src
     */
    autoConvert(e) {
        var content = $(e.target).html();
        // console.log(content);
        // var content = $(e.target).html(),
        //     pattern = /https?:\/\/(.*?)\.(jpg|png|gif)(?!")(\?\w+=\w+)?/g;

        // if(pattern.test(content)){
        //     var replacement = '<img src="http://$1.$2" alt="http://$1.$2" />',
        //        content     = content.replace(pattern, replacement);
        //     $(e.target).html(content);
        // }
    }

    /*
     * When user click 'enter' in title editor
     */
    focusToEditor(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            document.getElementById('editor').focus();
        }
    }

    /*
     * Render all component
     */
    render() {
        var data = [],
            vm   = this;
        if(this.props.data) {
            data = this.props.data;
        }
        $('#title').html(data.title);
        $('#editor').html(data.content);

        return (
            <div className="wysiwyg">
                <div className="ui top attached fluid segment" id="title" onKeyDown={this.focusToEditor} placeholder="Untitled"></div>
                <div className="ui attached fluid segment editor" id="editor" onKeyDown={this.autoConvert} onMouseUp={this.openInlinePopup} placeholder="Write your article ..."></div>
                <div className="ui attached fluid segment droper" id="droper">Drop Here</div>
                {/* <div className="ui attached fluid segment editor _precode" id="precode"></div> */}
                <div className="ui bottom attached menu" id="toolbaar">
                    <a href="" className="item icon _toolbar" data-type="bold"><i className="bold icon"></i></a>
                    <a href="" className="item icon _toolbar" data-type="italic"><i className="italic icon"></i></a>
                    <a href="" className="item icon _toolbar" data-type="underline"><i className="underline icon"></i></a>
                    <a href="" className="item icon _toolbar" data-type="strikeThrough"><i className="strikethrough icon"></i></a>
                    <a href="" className="item icon _popup" dt-target="#formating" dt-position="top left"><i className="align left  icon"></i></a>
                    <div className="ui hidden transition fluid popup" id="formating">
                        <button className="ui icon small basic button _toolbar" data-type="insertorderedlist"><i className="ordered list icon"></i></button>
                        <button className="ui icon small basic button _toolbar" data-type="insertunorderedlist"><i className="unordered list icon"></i></button>
                        <button className="ui icon small basic button _toolbar" data-type="justifyleft"><i className="align left icon"></i></button>
                        <button className="ui icon small basic button _toolbar" data-type="justifycenter"><i className="align center icon"></i></button>
                        <button className="ui icon small basic button _toolbar" data-type="justifyright"><i className="right align icon"></i></button>
                        <button className="ui icon small basic button _toolbar" data-type="justifyFull"><i className="align justify icon"></i></button>
                    </div>
                    <a href="" className="item icon _popup" dt-target="#formatedText" dt-position="top left"><i className="font icon"></i></a>
                    <div className="ui hidden transition fluid popup" id="formatedText">
                        <button className="ui icon small basic button _toolbar" data-type="formatBlock" data-size="h1">H1</button>
                        <button className="ui icon small basic button _toolbar" data-type="formatBlock" data-size="h2">H2</button>
                        <button className="ui icon small basic button _toolbar" data-type="formatBlock" data-size="h3">H3</button>
                        <button className="ui icon small basic button _toolbar" data-type="formatBlock" data-size="h4">H4</button>
                        <button className="ui icon small basic button _toolbar" data-type="formatBlock" data-size="h5">H5</button>
                        <button className="ui icon small basic button _toolbar" data-type="formatBlock" data-size="h6">H6</button>
                    </div>
                    <a href="" className="item icon _toolbar" data-type="insertHorizontalRule"><i className="minus icon"></i></a>
                    
                    <div className="right menu">
                        {/*<a href="" className="item icon _toolbar" data-type="_toCODE"><i className="code icon"></i></a>*/}
                        <a href="" className="item icon _toolbar" data-type="help"><i className="help icon"></i></a>
                        <a href="" className="item icon _toolbar" data-type="_toHTML"><i className="html5 icon"></i></a>
                    </div>
                </div>
                <div className="popover">
                    <button className="ui icon small basic button _toolbar" data-type="bold"><i className="bold icon"></i></button>
                    <button className="ui icon small basic button _toolbar" data-type="italic"><i className="italic icon"></i></button>
                    <button className="ui icon small basic button _toolbar" data-type="underline"><i className="underline icon"></i></button>
                    <button className="ui icon small basic button _toolbar" data-type="justifyleft"><i className="align left icon"></i></button>
                    <button className="ui icon small basic button _toolbar" data-type="justifycenter"><i className="align center icon"></i></button>
                    <button className="ui icon small basic button _toolbar" data-type="justifyright"><i className="right align icon"></i></button>
                    <button className="ui icon small basic button _toolbar" data-type="justifyFull"><i className="align justify icon"></i></button>
                </div>
                <div className="ui modal help">
                    <div className="header">
                        Transformatika WYSIWYG Help
                        {/*<button className="ui mini basic right floated deny icon button"><i className="close icon"></i></button>*/}
                    </div>
                    <div className="content">
                        <div className="ui three column stackable doubling grid">
                            <div className="column">
                                <div className="ui small header">How To Use?</div>
                                <div className="ui list">
                                    <div className="item">Sample</div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="ui small header">Shortcut & Markdown</div>
                                <div className="ui list">
                                    <div className="item">Sample</div>
                                </div>
                                <b>Note : Markdown still develop</b>
                            </div>
                            <div className="column">
                                <div className="ui small header">About</div>
                                <p>Text Editor build with Javascript, jQuery, Semantic-UI and React JS (JSX).</p>
                                <div className="ui large icon header">
                                    <i className="github icon"></i>
                                    <a href="">Contribute this project</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}

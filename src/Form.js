/* */
import React from 'react';
import DropZone from 'react-dropzone';
import Pikaday from 'pikaday';

Object.defineProperty(Number.prototype, 'fileSize', {value: function(a,b,c,d){
    return (a=a?[1e3,'k','B']:[1024,'K','iB'],b=Math,c=b.log,d=c(this)/c(a[0])|0,this/b.pow(a[0],d)).toFixed(2)
    +''+(d?(a[1]+'MGTPEZY')[--d]+a[2]:'Bytes');
},writable:false,enumerable:false});

export default class Form extends React.Component{
    constructor(props, context){
        super(props, context);
        var val = {};
        var vm = this;
        if (!this.props.data){
            this.props.element.map(function(element, key){
                val[element.name] = '';
            });
        } else {
            this.props.element.map(function(element, key){
                val[element.name] = vm.props.data[element.name];
            });
        }
        this.state = val;
        this._piker = []
        this._wysiwyg = []
        this._submit = this._submit.bind(this);
    }

    componentDidMount(){
        var vm = this;
        setTimeout(function(){
            $('.ui-dropdown').dropdown();
            var val = {};
            if (!vm.props.data && vm.props.data.length === 0){
                vm.props.element.map(function(element, key){
                    val[element.name] = '';
                    if (element.type === 'date') {
                        vm._piker['piker-'+key] = new Pikaday({
                            field: document.getElementById('piker-'+element.name),
                            onSelect: function() {
                                //vm.handleInputDate();
                            }
                        });
                    }
                    if (element.type === 'wysiwyg' && typeof CKEDITOR !== 'undefined') {
                        CKEDITOR.replace('wysiwyg-'+element.name, {
                            qtBorder: '1', // Border of inserted table
                            qtStyle: { 'border-collapse' : 'collapse', 'border-color': '#CCC' },
                            qtCellPadding: '8'
                        });
                    }
                });
            } else {
                vm.props.element.map(function(element, key){
                    if (vm.props.data[element.name]){
                        val[element.name] = vm.props.data[element.name];
                        vm.refs[element.name].value = vm.props.data[element.name];
                        if (element.type === 'select') {
                            $('#ui-dropdown'+element.name).dropdown('set selected', vm.props.data[element.name]);
                        }
                    } else {
                        val[element.name] = '';
                    }
                    if (element.type === 'date') {
                        vm._piker['piker-'+key] = new Pikaday({
                            field: document.getElementById('piker-'+element.name),
                            onSelect: function() {
                                //vm.handleInputDate();
                            }
                        });
                    }
                    if (element.type === 'wysiwyg' && typeof CKEDITOR !== 'undefined') {
                        CKEDITOR.replace('wysiwyg-'+element.name, {
                            qtBorder: '1', // Border of inserted table
                            qtStyle: { 'border-collapse' : 'collapse', 'border-color': '#CCC' },
                            qtCellPadding: '8'
                        });
                    }
                });
            }
        },0);
    }

    componentWillUnmount(){
        $('.ui-dropdown').dropdown('destroy');
        this._piker.map(function(piker){
            piker.destroy();
        });
        if (typeof CKEDITOR !== 'undefined') {
            Object.keys(CKEDITOR.instances).forEach(function(name) {
                CKEDITOR.instances[name].destroy(true);
            });
        }

    }

    componentWillReceiveProps(){
        var val = {};
        var vm = this;
        if (true === vm.props.submit) {
            this._submit();
            return;
        } else {
            setTimeout(function(){
                if (!vm.props.data && vm.props.data.length === 0){
                    vm.props.element.map(function(element, key){
                        val[element.name] = '';
                        if (element.type === 'select') {
                            $('#ui-dropdown'+element.name).dropdown('refresh');
                        }
                        if (!element.type || element.type === 'text' || element.type === 'date' || element.type === 'hidden' || element.type === 'password') {
                            $('#dynamicForm').find('input[name='+element.name+']').val('');
                        }
                        if (element.type === 'wysiwyg' && typeof CKEDITOR !== 'undefined') {
                            CKEDITOR.instances['wysiwyg-'+element.name].updateElement();
                            CKEDITOR.instances['wysiwyg-'+element.name].setData('');
                        }
                    });
                } else {
                    vm.props.element.map(function(element, key){
                        if (vm.props.data[element.name]){
                            val[element.name] = vm.props.data[element.name];
                            vm.refs[element.name].value = vm.props.data[element.name];
                        } else {
                            val[element.name] = '';
                        }
                        if (element.type === 'select') {
                            $('#ui-dropdown'+element.name).dropdown('set selected', vm.props.data[element.name]);
                        }
                        if (!element.type || element.type === 'textarea' || element.type === 'text' || element.type === 'date' || element.type === 'hidden' || element.type === 'password') {
                            $('#dynamicForm').find('input[name='+element.name+']').val(vm.props.data[element.name]);
                        }
                        if (element.type === 'wysiwyg' && typeof CKEDITOR !== 'undefined') {
                            CKEDITOR.instances['wysiwyg-'+element.name].updateElement();
                            CKEDITOR.instances['wysiwyg-'+element.name].setData(vm.props.data[element.name]);
                        }
                    });
                }
                vm.setState(val);
            }, 0);
        }
    }

    handleInputDate(){
        var val = {};
        var vm = this;
        this.props.element.map(function(element, key){
            val[element.name] = vm.refs[element.name].value;
        });
        this.setState(val);
    }

    renderLabel(element, refName){
        if (element.inline) {
            return (
                <div className="ui four wide field">
                    <label htmlFor={refName}>
                        {element.label}:
                        {element.description && (
                            <div style={{fontSize:'90%', fontWeight:400}}>{element.description}</div>
                        )}
                    </label>
                </div>
            )
        } else {
            return (
                <label htmlFor={refName}>
                    {element.label}:
                    {element.description && (
                        <div style={{fontSize:'90%', fontWeight:400}}>{element.description}</div>
                    )}
                </label>
            )
        }
    }

    renderInputDefault(element){
        var refName = element.name;
        var style = {};
        if (element.width){
            style = {
                width: element.width
            };
        }
        if (element.type === 'hidden'){
            return <input id={refName} name={refName} type={element.type} ref={refName} />
        } else {
            return (
                <div className={element.inline ? "fields" : "field"}>
                    {this.renderLabel(element, refName)}
                    {element.inline ? (
                        <div className="twelve wide field">
                            <input id={refName} name={refName} placeholder={element.placeholder} type={element.type} ref={refName} required={element.required} style={style}/>
                        </div>
                    ) : (
                        <input id={refName} name={refName} placeholder={element.placeholder} type={element.type} ref={refName} required={element.required} style={style}/>
                    )}
                </div>
            )
        }
    }

    renderInputWysiwyg(element){
        var refName = element.name;
        var style = {};
        if (element.width){
            style = {
                width: element.width
            };
        }
        return (
            <div className={element.inline ? "fields" : "field"}>
                {this.renderLabel(element, 'wysiwyg-'+refName)}
                {element.inline ? (
                    <div className="twelve wide field"><textarea name={refName} id={'wysiwyg-'+refName} placeholder={element.placeholder} ref={refName} required={element.required} style={style}/></div>
                ) : (
                    <textarea name={refName} id={'wysiwyg-'+refName} placeholder={element.placeholder} ref={refName} required={element.required} style={style}/>
                )}

            </div>
        )
    }

    renderInputDate(element){
        var refName = element.name;
        var style = {};
        if (element.width){
            style = {
                width: element.width
            };
        }
        return (
            <div className={element.inline ? "fields" : "field"}>
                {this.renderLabel(element, 'piker-'+refName)}
                {element.inline ? (
                    <div className="twelve wide field">
                        <input id={'piker-'+refName} name={refName} placeholder={element.placeholder} type="text" ref={refName} required={element.required} style={style}/>
                    </div>
                ) : (
                    <input id={'piker-'+refName} name={refName} placeholder={element.placeholder} type="text" ref={refName} required={element.required} style={style}/>
                )}
            </div>
        )
    }

    renderCheckbox(element) {
        var refName = element.name;
        var groupClass = "grouped fields";
        if (element.inline) {
            groupClass = "inline fields";
        }
        var vm = this;
        return (
            <div className={element.inline ? "fields" : "field"}>
                {this.renderLabel(element, refName)}
                {element.inline ? (
                    <div className="twelve wide field">
                        <div className={groupClass}>
                            {
                                element.options.map(function(option, key){
                                    var optionRefName = refName+'_'+option.value;
                                    return (
                                        <div key={key} className="field">
                                            <div className="ui checkbox">
                                                <input id={optionRefName} checked={vm.state[refName] === option.value} value={option.value} type="checkbox" ref={refName} name={refName} tabIndex="0" className="hidden" required={element.required} />
                                                <label htmlFor={optionRefName}>{option.title}</label>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                ) : (
                    <div className={groupClass}>
                        {
                            element.options.map(function(option, key){
                                var optionRefName = refName+'_'+option.value;
                                return (
                                    <div key={key} className="field">
                                        <div className="ui checkbox">
                                            <input id={optionRefName} checked={vm.state[refName] === option.value} value={option.value} type="checkbox" ref={refName} name={refName} tabIndex="0" className="hidden" required={element.required} />
                                            <label htmlFor={optionRefName}>{option.title}</label>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )}
            </div>

        )
    }

    handleRadioSelect(e){
        var refName = e.currentTarget.getAttribute('data-ref');
        var valu = e.currentTarget.value;
        var radioState = {};
        radioState[refName] = valu;
        this.setState(radioState);
    }

    renderRadio(element) {
        var refName = element.name;
        var groupClass = "grouped fields";
        if (element.inline) {
            groupClass = "inline fields";
        }
        var vm = this;
        return (
            <div className={element.inline ? "fields" : "field"}>
                {this.renderLabel(element, refName)}
                {element.inline ? (
                    <div className="twelve wide field">
                        <div className={groupClass}>
                            {
                                element.options.map(function(option, key){
                                    var optionRefName = refName+'_'+option.value;
                                    return (
                                        <div key={key} className="field">
                                            <div className="ui radio checkbox">
                                                <input id={optionRefName} data-ref={refName} checked={vm.state[refName] === option.value} onChange={vm.handleRadioSelect.bind(vm)} value={option.value} type="radio" ref={refName} name={refName} tabIndex="0" className="hidden" required={element.required} />
                                                <label htmlFor={optionRefName}>{option.label}</label>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                ) : (
                    <div className={groupClass}>
                        {
                            element.options.map(function(option, key){
                                var optionRefName = refName+'_'+option.value;
                                return (
                                    <div key={key} className="field">
                                        <div className="ui radio checkbox">
                                            <input id={optionRefName} data-ref={refName} checked={vm.state[refName] === option.value} onChange={vm.handleRadioSelect.bind(vm)} value={option.value} type="radio" ref={refName} name={refName} tabIndex="0" className="hidden" required={element.required} />
                                            <label htmlFor={optionRefName}>{option.label}</label>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )}
            </div>
        )
    }

    renderTextarea(element){
        var refName = element.name;
        var style = {};
        if (element.width){
            style = {
                width: element.width
            };
        }
        return (
            <div className={element.inline ? "fields" : "field"}>
                {this.renderLabel(element, refName)}
                {element.inline ? (
                    <div className="twelve wide field">
                        <textarea rows="2" name={refName} ref={refName} required={element.required} style={style} ></textarea>
                    </div>
                ):(
                    <textarea rows="2" name={refName} ref={refName} required={element.required} style={style} ></textarea>
                )}
            </div>
        )
    }

    renderSelect(element){
        var refName = element.name;
        var style = {};
        if (element.width){
            style = {
                width: element.width
            };
        }
        var selectId = "ui-dropdown"+refName;
        return (
            <div className={element.inline ? "fields" : "field"}>
                {this.renderLabel(element, refName)}
                {element.inline ? (
                    <div className="twelve wide field">
                        <select name={refName} className="ui search selection dropdown ui-dropdown" id={selectId} ref={refName} style={style} required={element.required}>
                            {
                                element.options.map(function(option, key){
                                    return <option key={key} value={option.value}>{option.label}</option>
                                })
                            }
                        </select>
                    </div>
                    ) : (
                    <select name={refName} className="ui search selection dropdown ui-dropdown" id={selectId} ref={refName} style={style} required={element.required}>
                        {
                            element.options.map(function(option, key){
                                return <option key={key} value={option.value}>{option.label}</option>
                            })
                        }
                    </select>
                )}
            </div>
        )
    }

    renderTreeOption(options, refName, childElement){
        var vm = this;
        if (typeof childElement === 'undefined') {
            childElement = false;
        }
        return(
            <ul className="treeview" style={{minWidth:200, paddingBottom:20}}>
                {options.map(function(option, key){
                    return (
                        <li key={key} className={childElement ? '' : 'container'}>
                            <p>
                                <input type="radio" onClick={vm.handleTreeRadioChange.bind(vm)} data-title={option.title} data-ref={refName} name={refName} id={refName+"-"+option.value} value={option.value}/>
                                <label htmlFor={refName+"-"+option.value}>{option.title}</label>
                            </p>
                            {option.child.length > 0 && (
                                vm.renderTreeOption(option.child, refName, true)
                            )}
                        </li>
                    )
                })}
            </ul>
        )
    }
    toggleTreeRadio(e){
        var el = e.currentTarget;
        var nextEl = el.nextSibling;
        var curStatus = nextEl.style.display;

        if (curStatus === 'none') {
            nextEl.style.display = 'block';
        } else {
            nextEl.style.display = 'none';
        }
    }
    handleTreeRadioChange(e){
        var refName = e.currentTarget.getAttribute('data-ref');
        var valu = e.currentTarget.value;
        var title = e.currentTarget.getAttribute('data-title');
        var radioTreeState = {};
        radioTreeState[refName] = valu;
        this.setState(radioTreeState);
        this.refs['input'+refName].value = title;
        var closestPopup = this.findAncestor(e.currentTarget, 'popup-tree');
        closestPopup.style.display = 'none';
    }
    findAncestor(el, cls) {
        while ((el = el.parentElement) && !el.classList.contains(cls));
        return el;
    }
    renderTreeRadio(element){
        var refName = element.name;
        var style = {};
        if (element.width){
            style = {
                width: element.width
            };
        }
        var childElement = false;
        if (element.options.length > 1) {
            childElement = true;
        }
        if (element.options.length === 1 && element.options[0].child.length === 0) {
            childElement = true;
        }
        return (
            <div className={element.inline ? "fields" : "field"}>
                {this.renderLabel(element, refName)}
                {element.inline ? (
                    <div className="twelve wide field">
                        <div style={{position:'relative'}}>
                            <input onClick={this.toggleTreeRadio} ref={"input"+refName} type="text" readOnly="readonly" id={"input-"+refName} defaultValue="" placeholder={element.placeholder}/>
                            <div className="ui custom popup bottom left transition popup-tree" style={{top: 30, bottom: 'auto', left: 0,right: 'auto', display: 'none', width:'auto'}}>
                                <div className="popup" style={{width:'auto'}}>
                                    {
                                        this.renderTreeOption(element.options, refName, childElement)
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                ):(
                    <div style={{position:'relative'}}>
                        <input onClick={this.toggleTreeRadio} ref={"input"+refName} type="text" readOnly="readonly" id={"input-"+refName} defaultValue="" placeholder={element.placeholder}/>
                        <div className="ui custom popup bottom left transition" style={{top: 30, bottom: 'auto', left: 0,right: 'auto', display: 'none', width:'auto'}}>
                            <div className="popup" style={{width:'auto'}}>
                                {
                                    this.renderTreeOption(element.options, refName, childElement)
                                }
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
    renderImageUpload(element){
        var refName = element.name;
        var style = {
            width: '100%',
            border: '1px dashed #BBB',
            background: '#F5F5F5'
        }
        if (this.state[refName] && this.state[refName] !== null) {
            style['background'] = '#F5F5F5 url('+this.state[refName]+') no-repeat center center';
        }
        return (
            <div className={element.inline ? "fields" : "field"} data-id={refName}>
                {this.renderLabel(element, refName)}
                {element.inline ? (
                    <div className="twelve wide field">
                        <DropZone id={'dropzone-'+refName} onDrop={this.handleImageUpload.bind(this)} accept="image/gif,image/jpeg,image/png" multiple={false} style={style}>
                            <div style={{height: '150px', color: '#444', textShadow: 'rgba(255,255,255,0.5) 0px 1px 1px', textAlign: 'center', paddingTop: '60px', fontSize: 20}}>
                                Click or Drop image file here
                            </div>
                        </DropZone>
                    </div>
                ) : (
                    <DropZone id={'dropzone-'+refName} onDrop={this.handleImageUpload.bind(this)} accept="image/gif,image/jpeg,image/png" multiple={false} style={style}>
                        <div style={{height: '150px', color: '#444', textShadow: 'rgba(255,255,255,0.5) 0px 1px 1px', textAlign: 'center', paddingTop: '60px', fontSize: 20}}>
                            Click or Drop image file here
                        </div>
                    </DropZone>
                )}
                <input type="hidden" name={refName} ref={refName}/>
                <div style={{clear:'both'}}/>
            </div>
        )
    }

    handleImageUpload(files, event){
        var refName = $(event.target).closest('.field').attr('data-id');
        var settings = {
            resize: true,
            max_width: 800,
            max_height: 600
        };
        var vm = this;
        var tempImg = new Image();
        tempImg.src = files[0].preview;
        tempImg.onload = function() {
            var MAX_WIDTH = settings.max_width;
            var MAX_HEIGHT = settings.max_height;
            var tempW = tempImg.width;
            var tempH = tempImg.height;
            if (settings.resize === true) {
                if (tempW > tempH) {
                    if (tempW > MAX_WIDTH) {
                        tempH *= MAX_WIDTH / tempW;
                        tempW = MAX_WIDTH;
                    }
                } else {
                    if (tempH > MAX_HEIGHT) {
                        tempW *= MAX_HEIGHT / tempH;
                        tempH = MAX_HEIGHT;
                    }
                }
            }

            var canvas = document.createElement('canvas');
            canvas.width = tempW;
            canvas.height = tempH;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(this, 0, 0, tempW, tempH);
            var dataURL = canvas.toDataURL(files[0].type);
            vm.refs[refName].value = dataURL;
            vm.setState({
                [refName]: dataURL
            })
        };
    }

    handleFileUpload(files, event){
        var refName = $(event.target).closest('.field').attr('data-id');
        var currentState = {};
        currentState[refName] = files[0];
        this.setState(currentState);
        console.log(currentState);
    }

    toggleImageUpload(event){
        if (event.target.tagName === 'IMG'){
            $(event.target).next().click();
        } else {
            $(event.target).find('input[type=file]').click();
        }
    }

    renderInputFile(element){
        var refName = element.name;
        return (
            <div className={element.inline ? "fields" : "field"} data-id={refName}>
                {this.renderLabel(element, refName)}
                {element.inline ? (
                    <div className="twelve wide field" data-id={refName}>
                        <DropZone onDrop={this.handleFileUpload.bind(this)} multiple={false} accept={element.accept ? element.accept : null} style={{width: '100%',border: '1px dashed #BBB'}}>
                            {this.state[refName] ? (
                                <div style={{height: 150, padding:15, textAlign:'center'}}>
                                    <div style={{textAlign:'center', fontWeight:'bold',paddingTop:30}}>{this.state[refName].name}</div>
                                    <div style={{textAlign:'center'}}>Type: {this.state[refName].type}</div>
                                    <div style={{textAlign:'center'}}>Size: {this.state[refName].size.fileSize()}</div>
                                </div>
                            ) : (
                                <div style={{height: '150px', textAlign: 'center', paddingTop: '60px'}}>

                                    Drop file here
                                </div>
                            )}
                        </DropZone>
                    </div>
                ) : (
                    <DropZone onDrop={this.handleFileUpload.bind(this)} multiple={false} accept={element.accept ? element.accept : null} style={{width: '100%',border: '1px dashed #BBB'}}>
                        {this.state[refName] ? (
                            <div style={{height: 150, padding:15, textAlign:'center'}}>
                                <div style={{textAlign:'center', fontWeight:'bold',paddingTop:30}}>{this.state[refName].name}</div>
                                <div style={{textAlign:'center'}}>Type: {this.state[refName].type}</div>
                                <div style={{textAlign:'center'}}>Size: {this.state[refName].size.fileSize()}</div>
                            </div>
                        ) : (
                            <div style={{height: '150px', textAlign: 'center', paddingTop: '60px'}}>

                                Drop file here
                            </div>
                        )}
                    </DropZone>
                )}
                <div style={{clear:'both'}}/>
            </div>
        )
    }
    toggleFieldSet(event){
        var parentElement = $(event.target).closest('.formFieldSet');
        parentElement.find('.fieldSetContent').toggle();
        parentElement.toggleClass('active rounded');
        parentElement.find('.ui.caret').toggleClass('up icon down icon');
    }
    renderFieldSet(data){
        var vm = this;
        var hideStyle = {};
        var fieldSetClass = 'formFieldSet active rounded';
        var dropdownClass = 'ui caret up icon';
        if (data['hide'] && data.hide === true) {
            hideStyle = {display:'none'};
            fieldSetClass = 'formFieldSet';
            dropdownClass = 'ui caret down icon';
        }
        return (
            <div className={fieldSetClass}>
                <div className="field fieldSetTitle">
                    <label style={{cursor: 'pointer'}} onClick={this.toggleFieldSet}>{data.label} <i className={dropdownClass}></i></label>
                </div>
                <div className="fieldSetContent" style={hideStyle}>
                    {data.elements.map(function(element, key){
                        return (
                            <element key={key}>
                                {vm.renderElement(element)}
                            </element>
                        )
                    })}
                </div>
            </div>
        )
    }

    renderElement(data){
        switch (data.type) {
            case 'imageupload':
                return this.renderImageUpload(data);
                break;
            case 'file':
                return this.renderInputFile(data);
                break;
            case 'select':
                return this.renderSelect(data);
                break;
            case 'radio':
                return this.renderRadio(data);
                break;
            case 'checkbox':
                return this.renderCheckbox(data);
                break;
            case 'textarea':
                return this.renderTextarea(data);
                break;
            case 'date':
                return this.renderInputDate(data);
                break;
            case 'wysiwyg':
                return this.renderInputWysiwyg(data);
                break;
            case 'orgSelect':
                return this.renderTreeRadio(data);
                break;
            case 'fieldset':
                return this.renderFieldSet(data);
                break;
            default:
                return this.renderInputDefault(data);
                break;
        }
    }

    toggleForm(e){
        if (!this.props.onCancel){
            $(e.target).closest('.form-container').toggleClass('slideRight');
        } else {
            this.props.onCancel();
        }
    }

    _submit(){
        var vm = this;
        var stateData = this.state;
        this.props.element.map(function(element){
            if (element.type !== 'imageupload' && element.type !== 'orgSelect' && element.type !== 'fieldset' && element.type !== 'file' && element.type !== 'radio') {
                stateData[element.name] = vm.refs[element.name].value;
            }
        });
        vm.setState(stateData);
        this.props.onSubmit(stateData);
    }

    submit(){
        $('#SDKFormWidgetBtn').trigger('click');
    }

    render() {
        var vm = this;

        return (
            <form id="SDKFormWidget" action="javascript:void(0)" onSubmit={this._submit} className={ this.props.inline ? "ui inline form" : "ui form"}>
                {
                    vm.props.element.map(function(element, key){
                        return (
                            <element key={key} style={{marginBottom:10, display: 'block'}}>
                                {vm.renderElement(element)}
                            </element>
                        )
                    })
                }
                <div type="submit" style={{
                    width:0,
                    height:0,
                    position:'fixed',
                    zIndex: -1,
                    top: '-100%'
                }}>
                    <button id="SDKFormWidgetBtn" type="submit"></button>
                </div>
            </form>
        )
    }
}

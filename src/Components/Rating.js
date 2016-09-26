/**
 * Wysiwyg Component for Transformatika Web Platform
 * Author : Muhibbudin Suretno
 * Build : 16062016
 * Version : 1.0
 */

export default class Rating extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            rate: this.props.rate,
            lastrate: this.props.rate,
            output: 0
        };
    }

    componentDidMount(){
        var vm = this;
        setTimeout(function(){
       }.bind(this), 0);
    }

    componentWillUnmount() {
        // Nothing to configure here
    }

    _changeStar(e) {
        e.preventDefault();
        this.setState({
            rate: $(e.target).data('rate'),
            output: $(e.target).data('rate')
        });
    }

    _createStar(rate) {
        var output = [];
        for (var i = 1; i <= 5; i++) {
            if (i <= rate) {
                output.push('star yellow icon');
            } else {
                output.push('empty star yellow icon');
            }
        }
        return output;
    }

    render(){
        var vm       = this,
            rate     = (this.state.rate) ? parseInt(this.state.rate) : 0,
            output   = (this.state.output) ? parseInt(this.state.output) : 0,
            lastrate = (this.state.lastrate) ? parseInt(this.state.lastrate) : 0;

        return(
            <div className="rating" data-input={lastrate} data-output={output}>
                {
                    vm._createStar(rate).map(function(value, key) {
                        return(
                            <a key={key} data-rate={key + 1} onClick={vm._changeStar.bind(vm)} onMouseOver={vm._changeStar.bind(vm)} className="_rate"><i data-rate={key + 1} className={value}></i></a>
                        )
                    })
                }
            </div>
        )
    }
}

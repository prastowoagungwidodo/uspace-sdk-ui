module.exports = React.createClass({
	getInitialState: function() {
		return {
			option: this.props.option
		}
	},

	componentDidMount: function() {
		// document.getElementById('croppers').addEventListener('change', this.onChange, false);
		setTimeout(function() {

		}, 0);
	},

	componentWillUnmount: function() {
	  
	},

	onChange: function(e) {
		console.log(e);
	},

	render() {
		return (
			<div className="cropper" id="cropper">
				Hellow
			</div>
		)
	}
});
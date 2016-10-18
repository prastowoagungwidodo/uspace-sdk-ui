import React from 'react';

export default class Cropper extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            option: this.props.option
        }
    }

    componentDidMount() {
		// document.getElementById('croppers').addEventListener('change', this.onChange, false);
		setTimeout(function() {

		}, 0);
	}

	componentWillUnmount() {

	},

	onChange(e) {
		console.log(e);
	},

	render() {
		return (
			<div className="cropper" id="cropper">
				Hellow
			</div>
		)
	}

}

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import container, {dropHandlers} from 'smooth-dnd'

container.dropHandler = dropHandlers.reactDropHandler().handler;
container.wrapChild = p => p; // dont wrap children they will already be wrapped

class Container extends Component {
	constructor(props) {
		super(props);
		this.getContainerOptions = this.getContainerOptions.bind(this);
		this.setRef = this.setRef.bind(this);
		this.prevContainer = null;
	}

	componentDidMount() {
		this.containerDiv = this.containerDiv || ReactDOM.findDOMNode(this);
		this.prevContainer = this.containerDiv;
		this.container = container(this.containerDiv, this.getContainerOptions());
	}

	componentWillUnmount() {
		this.container.dispose();
		this.container = null;
	}

	componentDidUpdate() {
		this.containerDiv = this.containerDiv || ReactDOM.findDOMNode(this);
		if (this.containerDiv) {
			if (this.prevContainer && this.prevContainer !== this.containerDiv) {
				this.container.dispose();
				this.container = container(this.containerDiv, this.getContainerOptions());
				this.prevContainer = this.containerDiv;
			}
		}
	}

	render() {
		if (this.props.render) {
			return this.props.render(this.setRef);
		} else {
			return (
				<div style={this.props.style} ref={this.setRef}>
					{this.props.children}
				</div>
			);
		}
	}

	setRef(element) {
		this.containerDiv = element;
	}

	getContainerOptions() {
		const functionProps = {};

		if (this.props.onDragStart) {
			functionProps.onDragStart = (...p) => this.props.onDragStart(...p);
		}

		if (this.props.onDragEnd) {
			functionProps.onDragEnd = (...p) => this.props.onDragEnd(...p);
		}

		if (this.props.onDrop) {
			functionProps.onDrop = (...p) => this.props.onDrop(...p);
		}

		if (this.props.getChildPayload) {
			functionProps.getChildPayload = (...p) => this.props.getChildPayload(...p);
		}

		if (this.props.shouldAnimateDrop) {
			functionProps.shouldAnimateDrop = (...p) => this.props.shouldAnimateDrop(...p);
		}

		if (this.props.shouldAcceptDrop) {
			functionProps.shouldAcceptDrop = (...p) => this.props.shouldAcceptDrop(...p);
		}

		if (this.props.onDragEnter) {
			functionProps.onDragEnter = (...p) => this.props.onDragEnter(...p);
		}

		if (this.props.onDragLeave) {
			functionProps.onDragLeave = (...p) => this.props.onDragLeave(...p);
		}

		if (this.props.render) {
			functionProps.render = (...p) => this.props.render(...p);
		}

		if (this.props.onDropReady) {
			functionProps.onDropReady = (...p) => this.props.onDropReady(...p);
		}

		if (this.props.getGhostParent) {
			functionProps.getGhostParent = (...p) => this.props.getGhostParent(...p);
		}

		return Object.assign({}, this.props, functionProps);
	}
}

Container.propTypes = {
	behaviour: PropTypes.oneOf(["move", "copy", "drag-zone"]),
	groupName: PropTypes.string,
	orientation: PropTypes.oneOf(["horizontal", "vertical"]),
	style: PropTypes.object,
	dragHandleSelector: PropTypes.string,
	className: PropTypes.string,
	nonDragAreaSelector: PropTypes.string,
	dragBeginDelay: PropTypes.number,
	animationDuration: PropTypes.number,
	autoScrollEnabled: PropTypes.string,
	lockAxis: PropTypes.string,
	dragClass: PropTypes.string,
	dropClass: PropTypes.string,
	onDragStart: PropTypes.func,
	onDragEnd: PropTypes.func,
	onDrop: PropTypes.func,
	getChildPayload: PropTypes.func,
	shouldAnimateDrop: PropTypes.func,
	shouldAcceptDrop: PropTypes.func,
	onDragEnter: PropTypes.func,
	onDragLeave: PropTypes.func,
	render: PropTypes.func,
	getGhostParent: PropTypes.func,
	removeOnDropOut: PropTypes.bool
};

Container.defaultProps = {
	behaviour: 'move',
	orientation: 'vertical',
	className: 'reactTrelloBoard'
};

export default Container;

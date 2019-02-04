"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _smoothDnd = _interopRequireWildcard(require("smooth-dnd"));

_smoothDnd.default.dropHandler = _smoothDnd.dropHandlers.reactDropHandler().handler;

_smoothDnd.default.wrapChild = p => p; // dont wrap children they will already be wrapped


class Container extends _react.Component {
  constructor(props) {
    super(props);
    this.getContainerOptions = this.getContainerOptions.bind(this);
    this.setRef = this.setRef.bind(this);
    this.prevContainer = null;
  }

  componentDidMount() {
    this.containerDiv = this.containerDiv || _reactDom.default.findDOMNode(this);
    this.prevContainer = this.containerDiv;
    this.container = (0, _smoothDnd.default)(this.containerDiv, this.getContainerOptions());
  }

  componentWillUnmount() {
    this.container.dispose();
    this.container = null;
  }

  componentDidUpdate() {
    this.containerDiv = this.containerDiv || _reactDom.default.findDOMNode(this);

    if (this.containerDiv) {
      if (this.prevContainer && this.prevContainer !== this.containerDiv) {
        this.container.dispose();
        this.container = (0, _smoothDnd.default)(this.containerDiv, this.getContainerOptions());
        this.prevContainer = this.containerDiv;
      }
    }
  }

  render() {
    if (this.props.render) {
      return this.props.render(this.setRef);
    } else {
      return _react.default.createElement("div", {
        style: this.props.style,
        ref: this.setRef
      }, this.props.children);
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
  behaviour: _propTypes.default.oneOf(["move", "copy", "drag-zone"]),
  groupName: _propTypes.default.string,
  orientation: _propTypes.default.oneOf(["horizontal", "vertical"]),
  style: _propTypes.default.object,
  dragHandleSelector: _propTypes.default.string,
  className: _propTypes.default.string,
  nonDragAreaSelector: _propTypes.default.string,
  dragBeginDelay: _propTypes.default.number,
  animationDuration: _propTypes.default.number,
  autoScrollEnabled: _propTypes.default.string,
  lockAxis: _propTypes.default.string,
  dragClass: _propTypes.default.string,
  dropClass: _propTypes.default.string,
  onDragStart: _propTypes.default.func,
  onDragEnd: _propTypes.default.func,
  onDrop: _propTypes.default.func,
  getChildPayload: _propTypes.default.func,
  shouldAnimateDrop: _propTypes.default.func,
  shouldAcceptDrop: _propTypes.default.func,
  onDragEnter: _propTypes.default.func,
  onDragLeave: _propTypes.default.func,
  render: _propTypes.default.func,
  getGhostParent: _propTypes.default.func,
  removeOnDropOut: _propTypes.default.bool
};
Container.defaultProps = {
  behaviour: 'move',
  orientation: 'vertical',
  className: 'reactTrelloBoard'
};
var _default = Container;
exports.default = _default;
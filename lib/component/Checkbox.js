var ObjectComponent = require('../core/ObjectComponent'),
    Node            = require('../core/document/Node');

var Event_         = require('../core/event/Event'),
    NodeEvent      = require('../core/document/NodeEvent'),
    ComponentEvent = require('../core/ComponentEvent');

function Checkbox(parent, object, value, params) {
    ObjectComponent.apply(this,arguments);

    params = params || {};
    params.onChange = params.onChange || this._onChange;
    this._onChange = params.onChange;

    var input = this._input = new Node(Node.INPUT_CHECKBOX);
    input.setProperty('checked',this._object[this._key]);
    input.addEventListener(NodeEvent.CHANGE,this._onInputChange.bind(this));

    this._wrapNode.addChild(this._input);
}

Checkbox.prototype = Object.create(ObjectComponent.prototype);

Checkbox.prototype.applyValue = function () {
    this.pushHistoryState();

    var obj = this._object, key = this._key;
    obj[key] = !obj[key];

    this.dispatchEvent(new Event_(this, ComponentEvent.VALUE_UPDATED, null));
};

Checkbox.prototype._onInputChange = function () {
    this.applyValue();
    this._onChange();
};

Checkbox.prototype.onValueUpdate = function (e) {
    if (e.data.origin == this){
        return;
    }
    this._input.setProperty('checked', this._object[this._key]);
};

module.exports = Checkbox;
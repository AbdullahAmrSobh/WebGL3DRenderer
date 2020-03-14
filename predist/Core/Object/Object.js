"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CoreComponents;
(function (CoreComponents) {
    var BaseComponent = /** @class */ (function () {
        function BaseComponent() {
        }
        return BaseComponent;
    }());
    CoreComponents.BaseComponent = BaseComponent;
    var Transfrom = /** @class */ (function (_super) {
        __extends(Transfrom, _super);
        function Transfrom(position, rotation, scale) {
            var _this = _super.call(this) || this;
            _this.position = position;
            _this.rotation = rotation;
            _this.scale = scale;
            return _this;
        }
        return Transfrom;
    }(BaseComponent));
    CoreComponents.Transfrom = Transfrom;
})(CoreComponents = exports.CoreComponents || (exports.CoreComponents = {}));
var Actor = /** @class */ (function () {
    function Actor() {
        this.components = [];
    }
    Actor.prototype.addComponent = function (component) {
        this.components.push(component);
    };
    Actor.prototype.getComponent = function (name) {
        for (var _i = 0, _a = this.components; _i < _a.length; _i++) {
            var component = _a[_i];
            if (component.name !== undefined && component.name === name) {
                return component;
            }
        }
        return null;
    };
    Actor.prototype.hasComponent = function (name) {
        for (var _i = 0, _a = this.components; _i < _a.length; _i++) {
            var component = _a[_i];
            if (component.name !== undefined && component.name === name) {
                return true;
            }
        }
        return false;
    };
    return Actor;
}());
exports.Actor = Actor;

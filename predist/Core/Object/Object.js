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
var gl_matrix_1 = require("gl-matrix");
var EObject = /** @class */ (function () {
    function EObject() {
        this.components = [];
    }
    EObject.prototype.AttachNewComponent = function (comp) {
        this.components.push(comp);
    };
    return EObject;
}());
exports.EObject = EObject;
(function (EObject) {
    var Component = /** @class */ (function () {
        function Component(name) {
            this.name = name;
        }
        return Component;
    }());
    EObject.Component = Component;
    var Transfrom = /** @class */ (function (_super) {
        __extends(Transfrom, _super);
        function Transfrom(position, rotation, scale) {
            if (position === void 0) { position = gl_matrix_1.vec3.fromValues(0, 0, 0); }
            if (rotation === void 0) { rotation = gl_matrix_1.vec3.fromValues(0, 0, 0); }
            if (scale === void 0) { scale = gl_matrix_1.vec3.fromValues(0, 0, 0); }
            var _this = _super.call(this, "Transform") || this;
            _this.position = position;
            _this.rotation = rotation;
            _this.scale = scale;
            return _this;
        }
        Transfrom.prototype.getYaw = function () {
            return 0;
        };
        Transfrom.prototype.getPitch = function () {
            return 0;
        };
        Transfrom.prototype.getRoll = function () {
            return 0;
        };
        return Transfrom;
    }(Component));
    EObject.Transfrom = Transfrom;
    var Renderable = /** @class */ (function (_super) {
        __extends(Renderable, _super);
        function Renderable(shader) {
            var _this = _super.call(this, "Renderable") || this;
            _this.shader = shader;
            return _this;
        }
        return Renderable;
    }(Component));
    EObject.Renderable = Renderable;
})(EObject = exports.EObject || (exports.EObject = {}));
exports.EObject = EObject;

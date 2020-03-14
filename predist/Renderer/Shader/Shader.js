"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gl_1 = require("Engine/gl");
var Unifroms;
(function (Unifroms) {
    var UnifromElement = /** @class */ (function () {
        function UnifromElement(name, shader) {
            this.name = name;
            this.shader = shader;
        }
        return UnifromElement;
    }());
    Unifroms.UnifromElement = UnifromElement;
    var UnifromLayout = /** @class */ (function () {
        function UnifromLayout() {
        }
        return UnifromLayout;
    }());
    Unifroms.UnifromLayout = UnifromLayout;
})(Unifroms = exports.Unifroms || (exports.Unifroms = {}));
var Shader = /** @class */ (function () {
    function Shader(name, vertexShaderSource, fragmentShaderSource) {
        if (name === void 0) { name = "new_shader_" + Shader.count; }
        this.name = name;
        Shader.count++;
        this.shaderProgram = this.createDefaultShader(vertexShaderSource, fragmentShaderSource);
    }
    Shader.prototype.createDefaultShader = function (vertexShaderSource, fragmentShaderSource) {
        var program = gl_1.gl.createProgram();
        var vertexShader = gl_1.gl.createShader(gl_1.gl.VERTEX_SHADER);
        var fragShader = gl_1.gl.createShader(gl_1.gl.FRAGMENT_SHADER);
        gl_1.gl.shaderSource(vertexShader, vertexShaderSource);
        gl_1.gl.shaderSource(fragShader, fragmentShaderSource);
        gl_1.gl.compileShader(vertexShader);
        if (!gl_1.gl.getShaderParameter(vertexShader, gl_1.gl.COMPILE_STATUS)) {
            console.error('ERROR compiling vertex shader!', gl_1.gl.getShaderInfoLog(vertexShader));
        }
        gl_1.gl.compileShader(fragShader);
        if (!gl_1.gl.getShaderParameter(fragShader, gl_1.gl.COMPILE_STATUS)) {
            console.error('ERROR compiling fragment shader!', gl_1.gl.getShaderInfoLog(fragShader));
        }
        gl_1.gl.compileShader(vertexShader);
        gl_1.gl.compileShader(fragShader);
        gl_1.gl.attachShader(program, vertexShader);
        gl_1.gl.attachShader(program, fragShader);
        gl_1.gl.linkProgram(program);
        if (!gl_1.gl.getProgramParameter(program, gl_1.gl.LINK_STATUS)) {
            console.error('ERROR linking program!', gl_1.gl.getProgramInfoLog(program));
        }
        gl_1.gl.validateProgram(program);
        if (!gl_1.gl.getProgramParameter(program, gl_1.gl.VALIDATE_STATUS)) {
            console.error('ERROR validating program!', gl_1.gl.getProgramInfoLog(program));
        }
        return program;
    };
    Shader.prototype.bind = function () {
        gl_1.gl.useProgram(this.shaderProgram);
    };
    Shader.prototype.unbind = function () {
        gl_1.gl.useProgram(0);
    };
    Shader.count = 0;
    return Shader;
}());
exports.Shader = Shader;
(function (Shader) {
    var UnifromElement = /** @class */ (function () {
        function UnifromElement(name, type) {
            this.name = name;
            this.type = type;
        }
        return UnifromElement;
    }());
    Shader.UnifromElement = UnifromElement;
    var UnifromLayout = /** @class */ (function () {
        function UnifromLayout() {
            this.unifroms = [];
        }
        UnifromLayout.prototype.addUnifrom = function (unifrom) {
            this.unifroms.push(unifrom);
        };
        return UnifromLayout;
    }());
    Shader.UnifromLayout = UnifromLayout;
})(Shader = exports.Shader || (exports.Shader = {}));
exports.Shader = Shader;
var ShaderLibrary = /** @class */ (function () {
    function ShaderLibrary() {
        this.shaderNames = [];
        this.shaders = [];
        this.currentShaderIndex = 0;
    }
    ShaderLibrary.prototype.add = function (shader) {
        this.shaders.push(shader);
    };
    ShaderLibrary.prototype.get = function (name) {
        this.currentShaderIndex = 0;
        for (var _i = 0, _a = this.shaders; _i < _a.length; _i++) {
            var shader = _a[_i];
            if (this.shaderNames[this.currentShaderIndex] === name) {
                return this.shaders[this.currentShaderIndex];
            }
            this.currentShaderIndex++;
        }
        return null;
    };
    return ShaderLibrary;
}());
exports.ShaderLibrary = ShaderLibrary;

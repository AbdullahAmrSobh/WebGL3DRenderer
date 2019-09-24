"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Shader = /** @class */ (function () {
    function Shader(name, vertexShaderSource, fragmentShaderSource) {
        if (name === void 0) { name = "new shader"; }
        this.name = name;
        this.shaderProgram = this.createDefaultShader(vertexShaderSource, fragmentShaderSource);
    }
    Shader.prototype.createDefaultShader = function (vertexShaderSource, fragmentShaderSource) {
        var program = gl.createProgram();
        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(vertexShader, vertexShaderSource);
        gl.shaderSource(fragShader, fragmentShaderSource);
        gl.compileShader(vertexShader);
        if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
            console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
        }
        gl.compileShader(fragShader);
        if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
            console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragShader));
        }
        gl.compileShader(vertexShader);
        gl.compileShader(fragShader);
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('ERROR linking program!', gl.getProgramInfoLog(program));
        }
        gl.validateProgram(program);
        if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
            console.error('ERROR validating program!', gl.getProgramInfoLog(program));
        }
        gl.useProgram(program);
        return program;
    };
    Shader.prototype.bind = function () {
        gl.useProgram(this.shaderProgram);
    };
    Shader.prototype.unbind = function () {
        gl.useProgram(0);
    };
    return Shader;
}());
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
    };
    return ShaderLibrary;
}());
exports.ShaderLibrary = ShaderLibrary;

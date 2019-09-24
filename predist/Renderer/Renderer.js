"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gl_matrix_1 = require("gl-matrix");
var RenderCommands;
(function (RenderCommands) {
    var renderQueue = [];
    var renderLayerStack = [];
})(RenderCommands = exports.RenderCommands || (exports.RenderCommands = {}));
var RenderManager = /** @class */ (function () {
    function RenderManager(canvas) {
        gl = canvas.getContext("webgl");
    }
    RenderManager.Submit = function (shader, vertexArray, transform) {
        shader.bind();
        var projUniformLocation = gl.getUniformLocation(shader, "u_ViewProjection");
        gl.uniformMatrix4fv(projUniformLocation, false, RenderManager.projectionViewMatrix);
        var transformUniformLocation = gl.getUniformLocation(shader, "u_Transform");
        gl.uniformMatrix4fv(transformUniformLocation, false, transform);
        vertexArray.bind();
        gl.drawElements(gl.TRIANGLES, vertexArray.getIndexBuffer().getCount(), gl.UNSIGNED_INT, 0);
    };
    RenderManager.projectionViewMatrix = gl_matrix_1.mat4.create();
    return RenderManager;
}());
exports.RenderManager = RenderManager;

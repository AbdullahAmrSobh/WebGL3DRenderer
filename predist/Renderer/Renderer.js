"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Buffer_1 = require("Engine/Renderer/Buffer");
var gl_matrix_1 = require("gl-matrix");
var gl_1 = require("Engine/gl");
var RenderCommands = /** @class */ (function () {
    function RenderCommands() {
    }
    RenderCommands.initRenderer = function () {
        gl_1.gl.enable(gl_1.gl.DEPTH_TEST);
    };
    RenderCommands.uploadObject = function (mesh, layout, shader) {
        var vao = new Buffer_1.VertexArray(shader);
        var vbo = new Buffer_1.VertexBuffer(shader, mesh.vertcies, mesh.vertcies.length);
        vbo.setLayout(layout);
        var ibo = new Buffer_1.IndexBuffer(mesh.indcies, mesh.indcies.length);
        vao.addVertexBuffer(vbo);
        vao.setIndexBuffer(ibo);
        vao.unbind();
        return vao;
    };
    RenderCommands.Submit = function (shader, vertexArray, transform) {
        shader.bind();
        var matWorldUniformLocation = gl_1.gl.getUniformLocation(shader.shaderProgram, 'mWorld');
        var matViewUniformLocation = gl_1.gl.getUniformLocation(shader.shaderProgram, 'mView');
        var matProjUniformLocation = gl_1.gl.getUniformLocation(shader.shaderProgram, 'mProj');
        gl_1.gl.uniformMatrix4fv(matWorldUniformLocation, false, transform.model);
        gl_1.gl.uniformMatrix4fv(matViewUniformLocation, false, transform.view);
        gl_1.gl.uniformMatrix4fv(matProjUniformLocation, false, transform.proj);
        vertexArray.bind();
        gl_1.gl.drawElements(gl_1.gl.TRIANGLES, vertexArray.getIndexBuffer().getCount(), gl_1.gl.UNSIGNED_SHORT, 0);
    };
    RenderCommands.projectionViewMatrix = gl_matrix_1.mat4.create();
    return RenderCommands;
}());
exports.RenderCommands = RenderCommands;

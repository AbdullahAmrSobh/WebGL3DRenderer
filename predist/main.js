"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gl_1 = require("Engine/gl");
var Buffer_1 = require("Engine/Renderer/Buffer");
var Shader_1 = require("Engine/Renderer/Shader/Shader");
var application_1 = require("./application");
var gl_matrix_1 = require("gl-matrix");
var Renderer_1 = require("./Renderer/Renderer");
var CameraController_1 = require("Engine/CameraController");
var CubeActor_1 = require("Engine/Game/Scripts/CubeActor");
//#region 
var triangleVertices = [
    0.0, 0.5, 1.0, 1.0, 0.0,
    -0.5, -0.5, 0.7, 0.0, 1.0,
    0.5, -0.5, 0.1, 1.0, 0.6
];
var triangleIndices = [1, 2, 3];
var boxVertices = [
    // Top
    -1.0, 1.0, -1.0, 0.5, 0.5, 0.5,
    -1.0, 1.0, 1.0, 0.5, 0.5, 0.5,
    1.0, 1.0, 1.0, 0.5, 0.5, 0.5,
    1.0, 1.0, -1.0, 0.5, 0.5, 0.5,
    // Left
    -1.0, 1.0, 1.0, 0.75, 0.25, 0.5,
    -1.0, -1.0, 1.0, 0.75, 0.25, 0.5,
    -1.0, -1.0, -1.0, 0.75, 0.25, 0.5,
    -1.0, 1.0, -1.0, 0.75, 0.25, 0.5,
    // Right
    1.0, 1.0, 1.0, 0.25, 0.25, 0.75,
    1.0, -1.0, 1.0, 0.25, 0.25, 0.75,
    1.0, -1.0, -1.0, 0.25, 0.25, 0.75,
    1.0, 1.0, -1.0, 0.25, 0.25, 0.75,
    // Front
    1.0, 1.0, 1.0, 1.0, 0.0, 0.15,
    1.0, -1.0, 1.0, 1.0, 0.0, 0.15,
    -1.0, -1.0, 1.0, 1.0, 0.0, 0.15,
    -1.0, 1.0, 1.0, 1.0, 0.0, 0.15,
    // Back
    1.0, 1.0, -1.0, 0.0, 1.0, 0.15,
    1.0, -1.0, -1.0, 0.0, 1.0, 0.15,
    -1.0, -1.0, -1.0, 0.0, 1.0, 0.15,
    -1.0, 1.0, -1.0, 0.0, 1.0, 0.15,
    // Bottom
    -1.0, -1.0, -1.0, 0.5, 0.5, 1.0,
    -1.0, -1.0, 1.0, 0.5, 0.5, 1.0,
    1.0, -1.0, 1.0, 0.5, 0.5, 1.0,
    1.0, -1.0, -1.0, 0.5, 0.5, 1.0,
];
var boxIndices = [
    // Top
    0, 1, 2,
    0, 2, 3,
    // Left
    5, 4, 6,
    6, 4, 7,
    // Right
    8, 9, 10,
    8, 10, 11,
    // Front
    13, 12, 14,
    15, 14, 12,
    // Back
    16, 17, 18,
    16, 18, 19,
    // Bottom
    21, 20, 22,
    22, 20, 23
];
//#endregion
var cubeMesh = {
    vertcies: boxVertices,
    indcies: boxIndices,
};
var cube = new CubeActor_1.CubeGActor("cube");
cube.attachStaticMesh(cubeMesh);
var mainCamera = new CameraController_1.CameraController(gl_matrix_1.vec3.fromValues(8, 8, -8), gl_matrix_1.vec3.fromValues(0, 0, 0), gl_matrix_1.vec3.fromValues(0, 1, 0));
//#region 
var vertexShaderText = [
    'precision mediump float;',
    '',
    'attribute vec2 vertPosition;',
    'attribute vec3 vertColor;',
    'varying vec3 fragColor;',
    '',
    'void main()',
    '{',
    '  fragColor = vertColor;',
    '  gl_Position = vec4(vertPosition, 0.0, 1.0);',
    '}'
].join('\n');
var fragmentShaderText = [
    'precision mediump float;',
    '',
    'varying vec3 fragColor;',
    'void main()',
    '{',
    '  gl_FragColor = vec4(fragColor, 1.0);',
    '}'
].join('\n');
var vertexShaderCubeText = [
    'precision mediump float;',
    '',
    'attribute vec3 vertPosition;',
    'attribute vec3 vertColor;',
    'varying vec3 fragColor;',
    'uniform mat4 mWorld;',
    'uniform mat4 mView;',
    'uniform mat4 mProj;',
    '',
    'void main()',
    '{',
    '  fragColor = vertColor;',
    '  gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);',
    '}'
].join('\n');
var fragmentShaderCubeText = [
    'precision mediump float;',
    '',
    'varying vec3 fragColor;',
    'void main()',
    '{',
    '  gl_FragColor = vec4(fragColor, 1.0);',
    '}'
].join('\n');
//#endregion
var flatColorShader = new Shader_1.Shader("flatColor", vertexShaderCubeText, fragmentShaderCubeText);
var program = flatColorShader.shaderProgram;
var vao_triangle = new Buffer_1.VertexArray(program);
var bufferLayout_triangle = new Buffer_1.Buffer.BufferLayout([
    new Buffer_1.Buffer.BufferElement("vertPosition", Buffer_1.Buffer.ShaderDataType.Float2),
    new Buffer_1.Buffer.BufferElement("vertColor", Buffer_1.Buffer.ShaderDataType.Float3)
]);
var vbo_triangle = new Buffer_1.VertexBuffer(program, triangleVertices, triangleVertices.length);
vbo_triangle.setLayout(bufferLayout_triangle);
var ibo_triangle = new Buffer_1.IndexBuffer(triangleIndices, triangleIndices.length);
vao_triangle.addVertexBuffer(vbo_triangle);
vao_triangle.setIndexBuffer(ibo_triangle);
vao_triangle.unbind();
var vao = new Buffer_1.VertexArray(program);
var bufferLayout = new Buffer_1.Buffer.BufferLayout([
    new Buffer_1.Buffer.BufferElement("vertPosition", Buffer_1.Buffer.ShaderDataType.Float3),
    new Buffer_1.Buffer.BufferElement("vertColor", Buffer_1.Buffer.ShaderDataType.Float3)
]);
var vbo = new Buffer_1.VertexBuffer(program, boxVertices, boxVertices.length);
vbo.setLayout(bufferLayout);
var ibo = new Buffer_1.IndexBuffer(boxIndices, boxIndices.length);
vao.addVertexBuffer(vbo);
vao.setIndexBuffer(ibo);
vao.unbind();
var cubeBufferLayout = new Buffer_1.Buffer.BufferLayout([
    new Buffer_1.Buffer.BufferElement("vertPosition", Buffer_1.Buffer.ShaderDataType.Float3),
    new Buffer_1.Buffer.BufferElement("vertColor", Buffer_1.Buffer.ShaderDataType.Float3)
]);
var cubeVAO = Renderer_1.RenderCommands.uploadObject(cubeMesh, cubeBufferLayout, program);
flatColorShader.bind();
var viewMatrix = mainCamera.viewMatrix;
var projMatrix = gl_matrix_1.mat4.perspective(gl_matrix_1.mat4.create(), gl_matrix_1.glMatrix.toRadian(45), gl_1.gl.canvas.width / gl_1.gl.canvas.height, 0.1, 1000.0);
Renderer_1.RenderCommands.initRenderer();
application_1.Application.addNewUpdate(function (time) {
    gl_1.gl.clearColor(0.75, 0.85, 0.8, 1.0);
    gl_1.gl.clear(gl_1.gl.DEPTH_BUFFER_BIT | gl_1.gl.COLOR_BUFFER_BIT);
    Renderer_1.RenderCommands.Submit(flatColorShader, vao_triangle, {
        model: gl_matrix_1.mat4.create(),
        view: viewMatrix,
        proj: projMatrix
    });
    Renderer_1.RenderCommands.Submit(flatColorShader, cubeVAO, {
        model: gl_matrix_1.mat4.create(),
        view: viewMatrix,
        proj: projMatrix
    });
});
application_1.Application.Run();

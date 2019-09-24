"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var application_1 = require("Engine/application");
var Buffer_1 = require("Engine/Renderer/Shader/Buffer");
var Renderer_1 = require("Engine/Renderer/Renderer");
var Shader_1 = require("Engine/Renderer/Shader/Shader");
var gl_matrix_1 = require("gl-matrix");
var vertices = [
    -0.5, -0.5, 0.0, 0.8, 0.2, 0.8, 1.0,
    0.5, -0.5, 0.0, 0.2, 0.3, 0.8, 1.0,
    0.0, 0.5, 0.0, 0.8, 0.8, 0.2, 1.0
];
var m_VertexArray = new Buffer_1.VertexArray();
var bufferLayout = new Buffer_1.Buffer.BufferLayout([
    new Buffer_1.Buffer.BufferElement("a_position", Buffer_1.Buffer.ShaderDataType.Float3),
    new Buffer_1.Buffer.BufferElement("a_position", Buffer_1.Buffer.ShaderDataType.Float3)
]);
var vb = new Buffer_1.VertexBuffer(vertices, vertices.length);
vb.setLayout(bufferLayout);
m_VertexArray.addVertexBuffer(vb);
var indices = [0, 1, 2];
var indexBuffer = new Buffer_1.IndexBuffer(indices, indices.length);
m_VertexArray.setIndexBuffer(indexBuffer);
var vertexShaderSource = "#version 330 core\n\nlayout(location = 0) in vec3 a_Position;\nlayout(location = 1) in vec4 a_Color;\n\nuniform mat4 u_ViewProjection;\nuniform mat4 u_Transform;\n\nout vec3 v_Position;\nout vec4 v_Color;\nvoid main()\n{\n\tv_Position = a_Position;\n\tv_Color = a_Color;\n\tgl_Position = u_ViewProjection * u_Transform * vec4(a_Position, 1.0);\t\n}";
var fragmentShaderSource = "#version 330 core\n\t\t\t\nlayout(location = 0) out vec4 color;\n\nin vec3 v_Position;\nin vec4 v_Color;\n\nvoid main()\n{\ncolor = vec4(v_Position * 0.5 + 0.5, 1.0);\ncolor = v_Color;\n}";
var flatColorShader = new Shader_1.Shader("flatColor", vertexShaderSource, fragmentShaderSource);
var shaderLib = new Shader_1.ShaderLibrary();
shaderLib.add(flatColorShader);
var canvas = document.getElementById("canvas");
var prespective = gl_matrix_1.mat4.perspective(gl_matrix_1.mat4.create(), gl_matrix_1.glMatrix.toRadian(45), canvas.clientWidth / canvas.clientHeight, 0.1, 1000.0);
var view = gl_matrix_1.mat4.lookAt(gl_matrix_1.mat4.create(), gl_matrix_1.vec3.fromValues(0, 2, 0), gl_matrix_1.vec3.fromValues(0, 0, 0), gl_matrix_1.vec3.fromValues(0, 1, 0));
var renderer = new Renderer_1.RenderManager(canvas);
Renderer_1.RenderManager.projectionViewMatrix = gl_matrix_1.mat4.multiply(Renderer_1.RenderManager.projectionViewMatrix, view, prespective);
Renderer_1.RenderManager;
function OnUpdate() {
    gl.clearColor(0.2, 0.2, 0.2, 1);
    gl.clear(gl.FRAMEBUFFER);
    Renderer_1.RenderManager.Submit(shaderLib.get("flatColor"), m_VertexArray, gl_matrix_1.mat4.identity(gl_matrix_1.mat4.create()));
}
application_1.Application.addNewUpdate(OnUpdate);
application_1.Applic
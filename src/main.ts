import { gl } from "Engine/gl";
import { Buffer, VertexBuffer, VertexArray, IndexBuffer } from "Engine/Renderer/Buffer";
import { Shader } from "Engine/Renderer/Shader/Shader";
import { Engine } from "./Engine";
import { mat4, glMatrix, vec3 } from "gl-matrix";
import { RenderCommands, Renderer } from "./Renderer/Renderer";
import { CameraController } from "Engine/CameraController"
import { CubeGActor } from "Engine/Game/Scripts/CubeActor";
import { Components } from "./Core/CoreComponents/Components";
import { ActorManager } from "./Core/Actors";


import * as cubeMeshData from "Models/cube.json";
import * as triangleMeshData from "Models/triangle.json";

import * as defaultGlslShaderSource from "Shaders/defaultPipelineShader.glsl"; 
import * as primativeGlslShaderSource from "Shaders/primitivePipelineShader.glsl";

import * as defaultNoiseTexture from "Textures/noise.png";
console.log(defaultNoiseTexture.default);

let defaultPipelineShader = defaultGlslShaderSource.default.split("//<<StageEnd>>");
let primativePipelineShader = primativeGlslShaderSource.default.split("//<<StageEnd>>");

let actorManager: ActorManager = new ActorManager();

let cubeMesh: Components.StaticMesh = { 
    vertcies: cubeMeshData.vertcies,
    indcies: cubeMeshData.indcies,
}

let cube = new CubeGActor("cube");
cube.attachStaticMesh(cubeMesh);

let mainCamera = new CameraController(
    vec3.fromValues(8, 8, -8),
    vec3.fromValues(0, 0, 0),
    vec3.fromValues(0, 1, 0),
);

actorManager.registerActor(cube);


let game = new Engine(gl);

game.registerNewSystem(actorManager);
game.registerNewSystem(mainCamera);

const flatColorShader = new Shader("flatColor", defaultPipelineShader[0], defaultPipelineShader[1]);
const program = flatColorShader.shaderProgram;

const vao_triangle = new VertexArray(program);
const bufferLayout_triangle = new Buffer.BufferLayout([
    new Buffer.BufferElement("vertPosition", Buffer.ShaderDataType.Float2),
    new Buffer.BufferElement("vertColor", Buffer.ShaderDataType.Float3)
]);
const vbo_triangle = new VertexBuffer(program, triangleMeshData.vertcies, triangleMeshData.vertcies.length);
vbo_triangle.setLayout(bufferLayout_triangle);
const ibo_triangle = new IndexBuffer(triangleMeshData.indcies, triangleMeshData.indcies.length);
vao_triangle.addVertexBuffer(vbo_triangle);
vao_triangle.setIndexBuffer(ibo_triangle);
vao_triangle.unbind();


const vao = new VertexArray(program);
const bufferLayout = new Buffer.BufferLayout([
    new Buffer.BufferElement("vertPosition", Buffer.ShaderDataType.Float3),
    new Buffer.BufferElement("vertColor", Buffer.ShaderDataType.Float3)
]);
const vbo = new VertexBuffer(program, cubeMeshData.vertcies, cubeMeshData.vertcies.length);
vbo.setLayout(bufferLayout);
const ibo = new IndexBuffer(cubeMeshData.vertcies, cubeMeshData.vertcies.length);
vao.addVertexBuffer(vbo);
vao.setIndexBuffer(ibo);
vao.unbind();

const cubeBufferLayout = new Buffer.BufferLayout([
    new Buffer.BufferElement("vertPosition", Buffer.ShaderDataType.Float3),
    new Buffer.BufferElement("vertColor", Buffer.ShaderDataType.Float3)
]);
const cubeVAO = RenderCommands.uploadObject(cubeMesh, cubeBufferLayout, program);

flatColorShader.bind();
var viewMatrix = mainCamera.viewMatrix;
var projMatrix = mat4.perspective(mat4.create(), glMatrix.toRadian(45), gl.canvas.width / gl.canvas.height, 0.1, 1000.0);

RenderCommands.initRenderer();

game.registerNewTask(function (time: number) {
    gl.clearColor(0.75, 0.85, 0.8, 1.0);
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

    RenderCommands.Submit(flatColorShader, vao_triangle, {
        model: mat4.create(),
        view: viewMatrix,
        proj: projMatrix
    });

    RenderCommands.Submit(flatColorShader, cubeVAO, {
        model: cube.modelMatrix,
        view: viewMatrix,
        proj: projMatrix
    });
});

game.run();
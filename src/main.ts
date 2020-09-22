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



var _2dcanvas = document.getElementById("view_texture") as HTMLCanvasElement;
var ctx = _2dcanvas.getContext("2d") as CanvasRenderingContext2D;


//#region 
var triangleVertices =
    [ // X, Y,       R, G, B
        0.0, 0.5, 1.0, 1.0, 0.0,
        -0.5, -0.5, 0.7, 0.0, 1.0,
        0.5, -0.5, 0.1, 1.0, 0.6
    ];

var triangleIndices = [1, 2, 3];

var boxVertices =
    [ // X, Y, Z           R, G, B
        // Top
        -1.0, 1.0, -1.0,  0.5, 0.5, 0.5,
        -1.0, 1.0,  1.0,  0.5, 0.5, 0.5,
         1.0, 1.0,  1.0,  0.5, 0.5, 0.5,
         1.0, 1.0, -1.0,  0.5, 0.5, 0.5,

        // Left
        -1.0,  1.0,  1.0, 0.75, 0.25, 0.5,
        -1.0, -1.0,  1.0, 0.75, 0.25, 0.5,
        -1.0, -1.0, -1.0, 0.75, 0.25, 0.5,
        -1.0,  1.0, -1.0, 0.75, 0.25, 0.5,

        // Right
        1.0,  1.0,  1.0, 0.25, 0.25, 0.75,
        1.0, -1.0,  1.0, 0.25, 0.25, 0.75,
        1.0, -1.0, -1.0, 0.25, 0.25, 0.75,
        1.0,  1.0, -1.0, 0.25, 0.25, 0.75,

        // Front
         1.0,  1.0, 1.0, 1.0, 0.0, 0.15,
         1.0, -1.0, 1.0, 1.0, 0.0, 0.15,
        -1.0, -1.0, 1.0, 1.0, 0.0, 0.15,
        -1.0,  1.0, 1.0, 1.0, 0.0, 0.15,

        // Back
         1.0,  1.0, -1.0, 0.0, 1.0, 0.15,
         1.0, -1.0, -1.0, 0.0, 1.0, 0.15,
        -1.0, -1.0, -1.0, 0.0, 1.0, 0.15,
        -1.0,  1.0, -1.0, 0.0, 1.0, 0.15,

        // Bottom
        -1.0, -1.0, -1.0, 0.5, 0.5, 1.0,
        -1.0, -1.0,  1.0, 0.5, 0.5, 1.0,
         1.0, -1.0,  1.0, 0.5, 0.5, 1.0,
         1.0, -1.0, -1.0, 0.5, 0.5, 1.0,
    ];

var CubeVertcies = 
[

    // X, Y, Z         
 // Top
 -1.0, 1.0, -1.0, 
 -1.0, 1.0,  1.0, 
  1.0, 1.0,  1.0, 
  1.0, 1.0, -1.0, 
 // Left
 -1.0,  1.0,  1.0,
 -1.0, -1.0,  1.0,
 -1.0, -1.0, -1.0,
 -1.0,  1.0, -1.0,
 // Right
 1.0,  1.0,  1.0, 
 1.0, -1.0,  1.0, 
 1.0, -1.0, -1.0, 
 1.0,  1.0, -1.0, 
 // Front
  1.0,  1.0, 1.0, 
  1.0, -1.0, 1.0, 
 -1.0, -1.0, 1.0, 
 -1.0,  1.0, 1.0, 
 // Back
  1.0,  1.0, -1.0,
  1.0, -1.0, -1.0,
 -1.0, -1.0, -1.0,
 -1.0,  1.0, -1.0,
 // Bottom
 -1.0, -1.0, -1.0,
 -1.0, -1.0,  1.0,
  1.0, -1.0,  1.0,
  1.0, -1.0, -1.0,
];

var boxIndices =
    [
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

let actorManager: ActorManager = new ActorManager();

let cubeMesh: Components.StaticMesh = { 
    vertcies: boxVertices,
    indcies: boxIndices,
}

let cube = new CubeGActor("cube");
cube.attachStaticMesh(cubeMesh);

let mainCamera = new CameraController(
    vec3.fromValues(8,8,-8),
    vec3.fromValues(0,0,0),
    vec3.fromValues(0,1,0),
);

actorManager.registerActor(cube);


let game = new Engine(gl);

game.registerNewSystem(actorManager);
game.registerNewSystem(mainCamera);


//#region 
var vertexShaderText =
    [
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

var fragmentShaderText =
    [
        'precision mediump float;',
        '',
        'varying vec3 fragColor;',
        'void main()',
        '{',
        '  gl_FragColor = vec4(fragColor, 1.0);',
        '}'
    ].join('\n');

var vertexShaderCubeText =
    [
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

var fragmentShaderCubeText =
    [
        'precision mediump float;',
        '',
        'varying vec3 fragColor;',
        'void main()',
        '{',
        '  gl_FragColor = vec4(fragColor, 1.0);',
        '}'
    ].join('\n');
    
import glsl from "./assets/shaders/DefaultFragmentShader.glsl!glsl"

console.log("Hello world", glsl);

//#endregion

const flatColorShader = new Shader("flatColor", vertexShaderCubeText, fragmentShaderCubeText);
const program = flatColorShader.shaderProgram;

const vao_triangle = new VertexArray(program);
const bufferLayout_triangle = new Buffer.BufferLayout([
    new Buffer.BufferElement("vertPosition", Buffer.ShaderDataType.Float2),
    new Buffer.BufferElement("vertColor", Buffer.ShaderDataType.Float3)
]);
const vbo_triangle = new VertexBuffer(program, triangleVertices, triangleVertices.length);
vbo_triangle.setLayout(bufferLayout_triangle);
const ibo_triangle = new IndexBuffer(triangleIndices, triangleIndices.length);
vao_triangle.addVertexBuffer(vbo_triangle);
vao_triangle.setIndexBuffer(ibo_triangle);
vao_triangle.unbind();


const vao = new VertexArray(program);
const bufferLayout = new Buffer.BufferLayout([
    new Buffer.BufferElement("vertPosition", Buffer.ShaderDataType.Float3),
    new Buffer.BufferElement("vertColor", Buffer.ShaderDataType.Float3)
]);
const vbo = new VertexBuffer(program, boxVertices, boxVertices.length);
vbo.setLayout(bufferLayout);
const ibo = new IndexBuffer(boxIndices, boxIndices.length);
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
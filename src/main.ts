import { Application } from "Engine/application";
import { Buffer, VertexBuffer, VertexArray, IndexBuffer } from "Engine/Renderer/Shader/Buffer";
import { RenderManager } from "Engine/Renderer/Renderer";

import { Shader, ShaderLibrary } from "Engine/Renderer/Shader/Shader";

import { mat4, glMatrix, vec3 } from "gl-matrix";

declare var gl: WebGLRenderingContext;

const vertices: number[] = [
    -0.5, -0.5, 0.0, 0.8, 0.2, 0.8, 1.0,
     0.5, -0.5, 0.0, 0.2, 0.3, 0.8, 1.0,
     0.0,  0.5, 0.0, 0.8, 0.8, 0.2, 1.0
];

const m_VertexArray: VertexArray = new VertexArray();

const bufferLayout = new Buffer.BufferLayout([
    new Buffer.BufferElement("a_position", Buffer.ShaderDataType.Float3),
    new Buffer.BufferElement("a_position", Buffer.ShaderDataType.Float3)
]);

const vb = new VertexBuffer(vertices, vertices.length);
vb.setLayout(bufferLayout);
m_VertexArray.addVertexBuffer(vb);

const indices: number[] = [ 0, 1, 2 ];
const indexBuffer: IndexBuffer = new IndexBuffer(indices, indices.length)
m_VertexArray.setIndexBuffer(indexBuffer);


const vertexShaderSource: string = "#version 330 core\n\nlayout(location = 0) in vec3 a_Position;\nlayout(location = 1) in vec4 a_Color;\n\nuniform mat4 u_ViewProjection;\nuniform mat4 u_Transform;\n\nout vec3 v_Position;\nout vec4 v_Color;\nvoid main()\n{\n\tv_Position = a_Position;\n\tv_Color = a_Color;\n\tgl_Position = u_ViewProjection * u_Transform * vec4(a_Position, 1.0);\t\n}";
const fragmentShaderSource: string = "#version 330 core\n\t\t\t\nlayout(location = 0) out vec4 color;\n\nin vec3 v_Position;\nin vec4 v_Color;\n\nvoid main()\n{\ncolor = vec4(v_Position * 0.5 + 0.5, 1.0);\ncolor = v_Color;\n}";

const flatColorShader = new Shader("flatColor", vertexShaderSource, fragmentShaderSource);

const shaderLib = new ShaderLibrary();
shaderLib.add(flatColorShader);


let canvas = document.getElementById("canvas")  as HTMLCanvasElement;


let prespective = mat4.perspective(mat4.create(), glMatrix.toRadian(45), canvas.clientWidth / canvas.clientHeight, 0.1, 1000.0);
let view = mat4.lookAt(mat4.create(), vec3.fromValues(0,2,0), vec3.fromValues(0,0,0),  vec3.fromValues(0,1,0));
const renderer = new RenderManager(canvas);

RenderManager.projectionViewMatrix = mat4.multiply(RenderManager.projectionViewMatrix, view, prespective);

RenderManager

function OnUpdate() { 
    gl.clearColor(0.2, 0.2, 0.2, 1);
    gl.clear(gl.FRAMEBUFFER);
    RenderManager.Submit(shaderLib.get("flatColor") as Shader, m_VertexArray, mat4.identity(mat4.create()));
}

Application.addNewUpdate(OnUpdate);


Appl
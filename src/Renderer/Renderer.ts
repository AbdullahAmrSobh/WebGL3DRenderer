import { Buffer, VertexArray } from "Engine/Renderer/Shader/Buffer";
import { Shader } from "./Shader/Shader";
import { mat4 } from "gl-matrix";

declare var gl: WebGLRenderingContext;

export namespace RenderCommands { 
    let renderQueue: any[] = [];
    let renderLayerStack: any[] = [];
    
}

export class RenderManager {
    public static projectionViewMatrix: mat4 = mat4.create();
    constructor(canvas: HTMLCanvasElement) { 
        gl = canvas.getContext("webgl") as WebGLRenderingContext;
    }



    public static Submit(shader: Shader, vertexArray: VertexArray, transform: mat4): void { 
        shader.bind();
        const projUniformLocation = gl.getUniformLocation(shader, "u_ViewProjection");
        gl.uniformMatrix4fv(projUniformLocation, false, RenderManager.projectionViewMatrix);
        const transformUniformLocation = gl.getUniformLocation(shader, "u_Transform");
        gl.uniformMatrix4fv(transformUniformLocation, false, transform);
        vertexArray.bind();
        gl.drawElements(gl.TRIANGLES, vertexArray.getIndexBuffer().getCount(), gl.UNSIGNED_INT, 0);
    }
}
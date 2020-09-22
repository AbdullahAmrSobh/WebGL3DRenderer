import { VertexArray, VertexBuffer, IndexBuffer } from "Engine/Renderer/Buffer";
import { Shader } from "./Shader/Shader";
import { mat4 } from "gl-matrix";

import { gl } from "Engine/gl";

import { Buffer } from "Engine/Renderer/Buffer";
import { Components } from "Engine/Core/CoreComponents/Components";
import { Camera } from "./Camera";



export interface MVP_Matrix {
    model: mat4;
    view: mat4;
    proj: mat4;
}

interface ISceneData { 
    camera: Camera;
}

export class Renderer { 

    public static initRenderer() { 
        gl.enable(gl.DEPTH_TEST);
    }
    
    static beginScene(camera: Camera)
    {
        Renderer.sceneData.camera = camera;
    }

    public static submit(shader: Shader, vertexArray: VertexArray, transform: mat4 = mat4.create()): void 
    {
        shader.bind();
        
        var matWorldUniformLocation = gl.getUniformLocation(shader.shaderProgram, 'mWorld');
        var matViewUniformLocation = gl.getUniformLocation(shader.shaderProgram, 'mView');
        var matProjUniformLocation = gl.getUniformLocation(shader.shaderProgram, 'mProj');

        gl.uniformMatrix4fv(matWorldUniformLocation, false, transform);
        gl.uniformMatrix4fv(matViewUniformLocation, false, Renderer.sceneData.camera.viewMatrix);
        gl.uniformMatrix4fv(matProjUniformLocation, false, Renderer.sceneData.camera.projectionMatrix);

        vertexArray.bind();

        gl.drawElements(gl.TRIANGLES, vertexArray.getIndexBuffer().getCount(), gl.UNSIGNED_SHORT, 0);
        
    }
    
    private static sceneData: ISceneData;
}

export class RenderCommands {
    public static projectionViewMatrix: mat4 = mat4.create();


    public static initRenderer() { 
        gl.enable(gl.DEPTH_TEST);
    }

    public static uploadObject(mesh: Components.StaticMesh, layout: Buffer.BufferLayout, shader: WebGLProgram): VertexArray { 
        let vao = new VertexArray(shader);
        const vbo = new VertexBuffer(shader, mesh.vertcies, mesh.vertcies.length);
        vbo.setLayout(layout);
        const ibo = new IndexBuffer(mesh.indcies, mesh.indcies.length);
        vao.addVertexBuffer(vbo);
        vao.setIndexBuffer(ibo);
        vao.unbind();
        return vao;
        
    }

    public static Submit(shader: Shader, vertexArray: VertexArray, transform: MVP_Matrix): void { 
        shader.bind();
        var matWorldUniformLocation = gl.getUniformLocation(shader.shaderProgram, 'mWorld');
        var matViewUniformLocation = gl.getUniformLocation(shader.shaderProgram, 'mView');
        var matProjUniformLocation = gl.getUniformLocation(shader.shaderProgram, 'mProj');
        gl.uniformMatrix4fv(matWorldUniformLocation, false, transform.model);
        gl.uniformMatrix4fv(matViewUniformLocation, false, transform.view);
        gl.uniformMatrix4fv(matProjUniformLocation, false, transform.proj);
        vertexArray.bind();
        gl.drawElements(gl.TRIANGLES, vertexArray.getIndexBuffer().getCount(), gl.UNSIGNED_SHORT, 0);
    }
}





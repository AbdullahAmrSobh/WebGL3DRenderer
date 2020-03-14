import { glMatrix, mat4, vec3 } from "gl-matrix";

export abstract class Camera {
    constructor(projectionSettting: Camera.ProjectionSettings, translation: Camera.translation) { }
    public setProjection(projectionSettting: Camera.ProjectionSettings): void {
        
    }


    public getViewMatrix(): mat4 { return this.viewMatrix; }
    public getProjectionMatrix(): mat4 { return this.projectionMatrix; }
    public getViewProjectionMatrix(): mat4 { return mat4.multiply(this.viewProjectionMatrix ,this.viewMatrix, this.projectionMatrix); }

    private recalculateViewMatrix(): void {
        let transfrom: mat4 = mat4.translate(this.viewMatrix, new mat4(1), this.cameraPosition);
    }

    private cameraPosition!: vec3;
    private roll: number = 0;   
    private pitch: number = 0;
    private yaw: number = 0;

    private viewMatrix: mat4;
    private projectionMatrix: mat4;
    private viewProjectionMatrix: mat4;
}

export namespace Camera { 
    export enum ProjectionType { 
        PERSPECTIVE, ORTHOGRAPHIC
    }
    interface ProjectionSettings { 
        type: ProjectionType;
        aspectRatio: number;
        near: number;
        far: number;
    }
    export interface OrthographicProjectionSetting extends ProjectionSettings { 
        top: number;
        bottom: number;
        left: number;
        right: number;

    }
    
    export interface PerspectiveProjectionSetting extends ProjectionSettings { 
        fov: number;
    }

    export interface ITransfrom {
        position: vec3;
        roll: number;
        pitch: number;
        yaw: number;
    }


    export interface ICamera {
        position: ITransfrom;
        parant: A;
        
    }
}
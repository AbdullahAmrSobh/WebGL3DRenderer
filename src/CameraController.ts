import { vec3, mat4 } from "gl-matrix";
import { Application } from "./application";



export abstract class Projection {
    public matrix!: mat4;
    public abstract update(): void;
}

export namespace Projection {
    export class Prespective extends Projection { 
        constructor (
            public aspectRatio: number,
            public clipNear: number,
            public clipFar: number,
            public fov: number
        ) {
            super();
            this.matrix = mat4.create();
            this.update();
        }

        public update() {
            this.matrix = mat4.perspective(this.matrix, this.fov, this.aspectRatio, this.clipNear, this.clipFar);
        }        
    }

    export class Orthographic extends Projection {

        constructor (
            public left: number,
            public right: number,
            public top: number,
            public bottom: number,
            public clipNear: number,
            public clipFar: number
        ) { 
            super();
            this.matrix = mat4.create();
            this.update();
        }

        public update(){ 
            this.matrix = mat4.ortho(this.matrix, this.left, this.right, this.bottom, this.top, this.clipNear, this.clipFar);
        }
    }
}

export class CameraController {


    public viewMatrix: mat4 = mat4.create();
    constructor (
        public position: vec3, 
        public direction: vec3,
        public oriantation: vec3
    ){ 

        console.log(this.viewMatrix);

        this.viewMatrix = mat4.lookAt(
            this.viewMatrix,
            this.position,
            this.direction,
            this.oriantation 
        );

        Application.addNewUpdate(this.onUpdate);
    }

    public updateCameraMatrix(timestep: number): void {
        this.viewMatrix = mat4.lookAt(
            this.viewMatrix,
            this.position,
            this.direction,
            this.oriantation 
        );
    }

    public onUpdate(timestep: number): void { 

        
    }
}

export namespace CameraController { 

    
     

}
import { vec3, mat4 } from "gl-matrix";
import { IUpdatableSystem } from "./core/SystemsManager";



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



class KeyStateMap {
    constructor(public name: string, public state: boolean) {}
}


export class CameraController implements IUpdatableSystem {


    public viewMatrix: mat4 = mat4.create();
    constructor (
        public position: vec3, 
        public direction: vec3,
        public oriantation: vec3
    ){ 
        this.viewMatrix = mat4.lookAt(
            this.viewMatrix,
            this.position,
            this.direction,
            this.oriantation 
        );

        console.log("camera controller init");
        window.addEventListener("keydown", event => {
            if ( event.key == "w") this.activeKeys[0].state = true;    
            if ( event.key == "s") this.activeKeys[1].state = true;    
            if ( event.key == "d") this.activeKeys[2].state = true;    
            if ( event.key == "a") this.activeKeys[3].state = true;    
        });

        window.addEventListener("keyup", event => {
            if ( event.key == "w") this.activeKeys[0].state = false;    
            if ( event.key == "s") this.activeKeys[1].state = false;    
            if ( event.key == "d") this.activeKeys[2].state = false;    
            if ( event.key == "a") this.activeKeys[3].state = false;  
        });

    }




    public updateCameraMatrix(timestep: number): void {
        this.viewMatrix = mat4.lookAt(
            this.viewMatrix,
            this.position,
            this.direction,
            this.oriantation 
        );
    }

    public update(timestep: number): void { 
     
        if(this.activeKeys[0].state) this.moveForward();
        if(this.activeKeys[1].state) this.moveBackward();
        if(this.activeKeys[2].state) this.moveRight();
        if(this.activeKeys[3].state) this.moveLeft();

    }

    private moveForward() : void {
        console.log("moving forward");
        vec3.add(this.position, this.position, this.forwardVector);
    }

    private moveBackward() : void {
        vec3.add(this.position, this.position, vec3.scale(new vec3(), this.forwardVector, -1));
    }

    private moveRight() : void {
        console.log("moving to the right");
    }

    private moveLeft() : void {
        console.log("moving to the left");
    }



    private activeKeys: Array<KeyStateMap> = [
        new KeyStateMap("w", false),
        new KeyStateMap("s", false),
        new KeyStateMap("d", false),
        new KeyStateMap("a", false),
    ];

    private forwardVector: vec3 = vec3.fromValues(0, 1, 0);
    private rightVector: vec3 = vec3.fromValues(0, 0, 1);
}

export namespace CameraController { 

    
     

}
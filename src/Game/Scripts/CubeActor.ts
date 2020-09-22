import { mat4, glMatrix } from "gl-matrix";
import { Actor } from "Engine/Core/Actors";


export class CubeGActor extends Actor {
    public angle: number = 0;

    public yRotationMatrix: mat4 = mat4.create();
    public xRotationMatrix: mat4 = mat4.create();
    public identityMatrix: mat4 = mat4.create();

    constructor (name: string) {
        super(name);
    }

    public onUpdate(timestep: number) {
        this.angle = glMatrix.toRadian(performance.now() * 0.02 * Math.PI)

        mat4.rotate(this.yRotationMatrix, this.identityMatrix, this.angle, [0, 1, 0]);
        mat4.rotate(this.xRotationMatrix, this.identityMatrix, this.angle / 4, [1, 0, 0]);
        mat4.multiply(this.modelMatrix, this.yRotationMatrix, this.xRotationMatrix);

    }
}
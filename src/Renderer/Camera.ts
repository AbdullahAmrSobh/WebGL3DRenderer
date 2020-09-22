import { glMatrix, mat4, vec3 } from "gl-matrix";

export interface ICameraProjection
{
    ar_w: number;
    fov_h: number;
    near: number;
    far: number;
    prespective: boolean;

}

export interface ICameraTransfrom
{
    position: vec3;
    roll: number;
    pitch: number;
    yaw: number;
}

export class Camera 
{
    public viewMatrix!: mat4;
    public viewProjectionMatrix!: mat4;

    constructor(    
        public projectionMatrix: mat4,
        public cameraTransform: ICameraTransfrom
        ) {
    }


    public setProjection(projection: mat4)
    {
        this.projectionMatrix = projection;
        mat4.multiply(this.viewProjectionMatrix, this.viewMatrix, this.projectionMatrix);
    }

    private recalculateViewProjectionMatrix()
    {
        let rotationMatrix: mat4 = mat4.create();
        mat4.rotateX(rotationMatrix, rotationMatrix, glMatrix.toRadian(this.cameraTransform.roll));
        mat4.rotateX(rotationMatrix, rotationMatrix, glMatrix.toRadian(this.cameraTransform.pitch));
        mat4.rotateX(rotationMatrix, rotationMatrix, glMatrix.toRadian(this.cameraTransform.yaw));
        mat4.translate(this.viewMatrix, mat4.create(), this.cameraTransform.position);
        mat4.multiply(this.viewMatrix, this.viewMatrix, rotationMatrix);
        mat4.invert(this.viewMatrix,this.viewMatrix);
        mat4.multiply(this.viewProjectionMatrix, this.viewMatrix, this.projectionMatrix);
    }
}
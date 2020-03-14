import { Components } from "Engine/Core/CoreComponents/Components";
import { vec3, mat4 } from "gl-matrix";
import { Application } from "Engine/application";


const zeroVector: vec3 = vec3.fromValues(0,0,0);
const unitVector: vec3 = vec3.fromValues(0,0,0);


 
export interface ISObject { 
}






export abstract class Actor implements ISObject {
    public modelMatrix: mat4 = mat4.create();

    constructor(
        public name: string,
        public transfrom: Components.Transfrom = new Components.Transfrom(zeroVector, zeroVector, unitVector)
    ) {
        //super();
        Application.addNewUpdate(this.onUpdate);
    }

    public staticMesh!: Components.StaticMesh;
    public attachStaticMesh(mesh: Components.StaticMesh): void {
        this.staticMesh = mesh
    }

    abstract onUpdate(timestep: number, context: any): void ;
}


export namespace SObject { 


}
import { ISObject } from "Engine/Core/SObject"
import { IUpdatableSystem } from "Engine/core/SystemsManager";
import { Components } from "Engine/Core/CoreComponents/Components";
import { vec3, mat4 } from "gl-matrix";

const zeroVector: vec3 = vec3.fromValues(0, 0, 0);
const unitVector: vec3 = vec3.fromValues(0, 0, 0);

export abstract class Actor implements ISObject {
    public modelMatrix: mat4 = mat4.create();

    constructor(
        public name: string,
        public transfrom: Components.Transfrom = new Components.Transfrom(zeroVector, zeroVector, unitVector)
    ) {
    }

    public staticMesh!: Components.StaticMesh;
    public attachStaticMesh(mesh: Components.StaticMesh): void {
        this.staticMesh = mesh
    }

    abstract onUpdate(timestep: number): void;
}

export class ActorManager implements IUpdatableSystem {
    private actors: Actor[] = [];
    public update(timestep: number): void {
        for (const actor of this.actors) {
            actor.onUpdate(timestep);
        }
    }
    public registerActor(actor: Actor): void {
        this.actors.push(actor);
    }

}
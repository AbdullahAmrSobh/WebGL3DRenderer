import { vec3 } from "gl-matrix";


export namespace Components { 


    export class Transfrom {
        constructor (
            public position: vec3,
            public rotation: vec3,
            public scale: vec3,

            
        ){ 

        }
    }

    export type Texture = HTMLImageElement;
    export interface StaticMesh { 
        vertcies: number[];
        indcies: number[];
        textures?: Texture;
    }


    export interface Matarial { 
        difuse: number | Texture;
        roughness: number | Texture;
        normal: number | Texture;
        metalic: number | Texture;
    }

}
import { vec3, vec4, mat4 } from "gl-matrix";


export class EObject {


    public components: EObject.Component[] = []
    constructor() {

    }


    public AttachNewComponent(comp: EObject.Component): void {
        this.components.push(comp);
    }




}


export namespace EObject {

    export class Component {

        constructor(public readonly name: string) { }
    }


    export class Transfrom extends Component {
        constructor(
            public position: vec3 = vec3.fromValues(0, 0, 0),
            public rotation: vec3 = vec3.fromValues(0, 0, 0),
            public scale: vec3 = vec3.fromValues(0, 0, 0),
        ) {
            super("Transform");
        }

        public getYaw(): number {
            return 0;
        }

        public getPitch(): number {
            return 0;
        }

        public getRoll(): number {
            return 0;
        }
        
    }

    export class Renderable extends Component { 
        constructor(
            public shader: WebGLProgram,
        ){  
            super("Renderable");
        }
    }

}
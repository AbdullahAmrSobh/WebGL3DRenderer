import { gl } from "Engine/gl";

export namespace Unifroms {

    export class UnifromElement {
        constructor(
            public name: string,
            public shader: Shader
        ) { }
    }

    export class UnifromLayout {
    }
}

export class Shader {
    public shaderProgram: WebGLProgram;
    public static count: number = 0;
    constructor(
        public name: string = "new_shader_" + Shader.count,
        vertexShaderSource: string,
        fragmentShaderSource: string,
    ) {
        Shader.count++;
        this.shaderProgram = this.createDefaultShader(vertexShaderSource, fragmentShaderSource);
    }



    private createDefaultShader(vertexShaderSource: string, fragmentShaderSource: string): WebGLProgram {
        const program: WebGLProgram = gl.createProgram() as WebGLProgram;
        const vertexShader: any = gl.createShader(gl.VERTEX_SHADER);
        const fragShader: any = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(vertexShader, vertexShaderSource);
        gl.shaderSource(fragShader, fragmentShaderSource);

        gl.compileShader(vertexShader);
        if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
            console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
        }

        gl.compileShader(fragShader);
        if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
            console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragShader));
        }

        gl.compileShader(vertexShader);
        gl.compileShader(fragShader);
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('ERROR linking program!', gl.getProgramInfoLog(program));
        }
        gl.validateProgram(program);
        if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
            console.error('ERROR validating program!', gl.getProgramInfoLog(program));
        }

        return program;
    }

    public bind(): void {
        gl.useProgram(this.shaderProgram);
    }

    public unbind(): void {
        gl.useProgram(0);
    }
}

export namespace Shader {

    export class UnifromElement {
        constructor(
            public name: string,
            public type: string,
        ) {

        }
    }

    export class UnifromLayout {
        public unifroms: UnifromElement[] = [];

        public addUnifrom(unifrom: UnifromElement): void {
            this.unifroms.push(unifrom);
        }
    }
}

export class ShaderLibrary {
    private shaderNames: string[] = [];
    private shaders: Shader[] = [];

    public add(shader: Shader) {
        this.shaders.push(shader);
    }

    private currentShaderIndex: number = 0;
    public get(name: string): Shader | null {
        this.currentShaderIndex = 0;
        for (const shader of this.shaders) {
            if (this.shaderNames[this.currentShaderIndex] === name) {
                return this.shaders[this.currentShaderIndex];
            }
            this.currentShaderIndex++;
        }
        return null;
    }

}
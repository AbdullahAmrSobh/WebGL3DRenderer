declare var gl: WebGLRenderingContext;

export class Shader {
    public readonly shaderProgram: WebGLShader;
    constructor(
        public name: string = "new shader",
        vertexShaderSource: string,
        fragmentShaderSource: string,
        ) {
            this.shaderProgram = this.createDefaultShader(vertexShaderSource, fragmentShaderSource);
    }
    private createDefaultShader(vertexShaderSource: string, fragmentShaderSource: string): WebGLShader{ 
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

        gl.useProgram(program);
        return program;
    }

    public bind(): void { 
        gl.useProgram(this.shaderProgram)
    }

    public unbind(): void { 
        gl.useProgram(0);
    }
}

export class ShaderLibrary { 
    private shaderNames: string[] = [];
    private shaders: Shader[] = [];

    public add(shader: Shader) { 
        this.shaders.push(shader);
    }

    private currentShaderIndex: number = 0;
    public get(name: string) {
        this.currentShaderIndex = 0;
        for (const shader of this.shaders) {
            if(this.shaderNames[this.currentShaderIndex] === name) {
                return this.shaders[this.currentShaderIndex];
            }
            this.currentShaderIndex++;
        }
    }

}
import { gl } from "Engine/gl";

export abstract class Buffer {
    public abstract bind(): void;
    public abstract unbind(): void;
}

export namespace Buffer {
    export enum ShaderDataType {
        None = 0, Float, Float2, Float3, Float4, Mat3, Mat4, Int, Int2, Int3, Int4, Bool
    }
    export class BufferElement {
        constructor(
            public name: string,
            public type: ShaderDataType,
            public size: number = 0,
            public offset: number = 0,
            public normalizd: boolean = false
        ) {

            this.size = this.getComponentCount();
        }

        public getComponentCount(): number {
            switch (this.type) {
                case ShaderDataType.Float: return 1;
                case ShaderDataType.Float2: return 2;
                case ShaderDataType.Float3: return 3;
                case ShaderDataType.Float4: return 4;
                case ShaderDataType.Mat3: return 3 * 3;
                case ShaderDataType.Mat4: return 4 * 4;
                case ShaderDataType.Int: return 1;
                case ShaderDataType.Int2: return 2;
                case ShaderDataType.Int3: return 3;
                case ShaderDataType.Int4: return 4;
                case ShaderDataType.Bool: return 1;
            }

            console.warn("Unknown ShaderDataType!");
            return 0;
        }

        public static ShaderDataTypeToWebGLBaseType(type: ShaderDataType) {
            switch (type) {
                case ShaderDataType.Float: return gl.FLOAT;
                case ShaderDataType.Float2: return gl.FLOAT;
                case ShaderDataType.Float3: return gl.FLOAT;
                case ShaderDataType.Float4: return gl.FLOAT;
                case ShaderDataType.Mat3: return gl.FLOAT;
                case ShaderDataType.Mat4: return gl.FLOAT;
                case ShaderDataType.Int: return gl.INT;
                case ShaderDataType.Int2: return gl.INT;
                case ShaderDataType.Int3: return gl.INT;
                case ShaderDataType.Int4: return gl.INT;
                case ShaderDataType.Bool: return gl.BOOL;
            }

            console.log("Unknown ShaderDataType!");
            return 0;
        }
    }
    export class BufferLayout {

        private stride: number = 0;

        constructor(public elements: BufferElement[]) {
            this.calculateOffsetsAndStride();
        }

        public getStride(): number { return this.stride; }
        public getElements(): BufferElement[] { return this.elements; }

        private calculateOffsetsAndStride(): void {
            let offset = 0;
            this.stride = 0;
            for (const element of this.elements) {
                element.offset = offset;
                offset += element.size;
                this.stride += element.size;
            }
        }

    }

}

export class VertexBuffer extends Buffer {
    public readonly bufferObject: WebGLBuffer;
    private layout!: Buffer.BufferLayout;

    public isBound: boolean;
    constructor(
        public readonly shaderProgram: WebGLShader,
        public readonly vertices: number[],
        public readonly size: number
    ) {
        super();
        this.bufferObject = gl.createBuffer() as WebGLBuffer;
        this.isBound = true;

        this.bind();

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        this.unbind();
    }

    public bind(): void {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferObject);
        this.isBound = true;

    }

    public unbind(): void {
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        this.isBound = false;
    }


    public setLayout(layout: Buffer.BufferLayout): void {
        this.layout = layout;
    }

    public getLayout(): Buffer.BufferLayout {
        return this.layout
    }
}

export class IndexBuffer extends Buffer {
    readonly bufferObject = gl.createBuffer() as WebGLBuffer;

    constructor(
        public readonly indices: number[],
        public readonly size: number
    ) {
        super();
        this.bind();
        console.log("uploading indecies");
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
        this.unbind();
    }

    public bind(): void {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferObject);
    }

    public unbind(): void {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }

    public getCount(): number {
        return this.indices.length;
    }
}

export class VertexArray extends Buffer {

    private vertexBuffers: VertexBuffer[] = [];
    private indexBuffer!: IndexBuffer;


    constructor(public readonly shaderProgram: WebGLProgram) {
        super();
    }

    public bind(): void {
        this.indexBuffer.bind();
    }
    public unbind(): void {
        this.indexBuffer.unbind();
    }


    public addVertexBuffer(vertexBuffer: VertexBuffer): void {
        vertexBuffer.bind();
        const layout = vertexBuffer.getLayout();

        for (const element of layout.getElements()) {
            const attribLocation = gl.getAttribLocation(this.shaderProgram, element.name);

            gl.vertexAttribPointer(
                attribLocation,
                element.getComponentCount(),
                Buffer.BufferElement.ShaderDataTypeToWebGLBaseType(element.type),
                element.normalizd ? true : false,
                layout.getStride() * Float32Array.BYTES_PER_ELEMENT,
                element.offset * Float32Array.BYTES_PER_ELEMENT
            );


            gl.enableVertexAttribArray(attribLocation);
        }
    }

    public setIndexBuffer(indexBuffer: IndexBuffer): void {
        this.indexBuffer = indexBuffer;
        indexBuffer.bind();
    }

    public getVertexBuffers(): VertexBuffer[] {
        return this.vertexBuffers;
    }
    public getIndexBuffer(): IndexBuffer {
        return this.indexBuffer;
    }
}

export class FrameBuffer extends Buffer {

    private static irretetor: number = 0;
    public id: number;

    public frameBufferId = gl.createFramebuffer();
    constructor(
        public frameTexture: WebGLTexture,
    ) {
        super();
        FrameBuffer.irretetor++;
        this.id = FrameBuffer.irretetor;
    }


    public bind(): void {
        gl.bindFramebuffer(gl.COLOR_BUFFER_BIT, this.frameBufferId);
    }
    public unbind(): void {
        throw new Error("Method not implemented.");
    }
}

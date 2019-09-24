declare var gl: WebGLRenderingContext;

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
            public size: number = shaderDataTypeSize(type),
            public offset: number = 0,
            public normalizd: boolean = false
        ) { }

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

        constructor(public readonly elements: BufferElement[]) {
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

    function shaderDataTypeSize(type: ShaderDataType) {
        switch (type) {
            case ShaderDataType.Float: return 4;
            case ShaderDataType.Float2: return 4 * 2;
            case ShaderDataType.Float3: return 4 * 3;
            case ShaderDataType.Float4: return 4 * 4;
            case ShaderDataType.Mat3: return 4 * 3 * 3;
            case ShaderDataType.Mat4: return 4 * 4 * 4;
            case ShaderDataType.Int: return 4;
            case ShaderDataType.Int2: return 4 * 2;
            case ShaderDataType.Int3: return 4 * 3;
            case ShaderDataType.Int4: return 4 * 4;
            case ShaderDataType.Bool: return 1;
        }
        console.warn("Unknown ShaderDataType!");
        return 0;
    }
}

export class VertexBuffer extends Buffer {
    readonly bufferObject = gl.createBuffer();
    private  layout!: Buffer.BufferLayout;

    constructor(
        public readonly vertices: number[],
        public readonly size: number
    ) {
        super();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferObject);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    }

    public bind(): void {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferObject);
    }

    public unbind(): void {
        gl.bindBuffer(gl.ARRAY_BUFFER, 0);
    }


    public setLayout(layout: Buffer.BufferLayout): void {
        this.layout = layout;
    }

    public getLayout(): Buffer.BufferLayout {
        return this.layout
    }
}

export class IndexBuffer extends Buffer {
    readonly bufferObject = gl.createBuffer();
    private  layout!: Buffer.BufferLayout;

    constructor(
        public readonly indices: number[],
        public readonly size: number
    ) {
        super();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferObject);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Float32Array(indices), gl.STATIC_DRAW);
    }

    public bind(): void {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferObject);
    }

    public unbind(): void {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, 0);
    }


    public setLayout(layout: Buffer.BufferLayout): void {
        this.layout = layout;
    }

    public getLayout(): Buffer.BufferLayout {
        return this.layout
    }

    public getCount(): number { 
        return this.indices.length;
    }
}
export class VertexArray extends Buffer {

    private rendererID: WebGLBuffer = gl.createBuffer() as WebGLBuffer;
    private vertexBufferIndex: number = 0;
    private vertexBuffers: VertexBuffer[] = [];
    private indexBuffer!: IndexBuffer;


    constructor() {
        super();
    }
    public bind(): void {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.rendererID);
    } public unbind(): void {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.rendererID);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.rendererID);
    }


    public addVertexBuffer(vertexBuffer: VertexBuffer) {
        console.warn("Vertex Buffer has no layout!");

        gl.bindBuffer(gl.ARRAY_BUFFER, this.rendererID);
        vertexBuffer.bind();

        const layout = vertexBuffer.getLayout();
        for (const element of layout.getElements()) {
            gl.enableVertexAttribArray(this.vertexBufferIndex);
            gl.vertexAttribPointer(this.vertexBufferIndex,
                element.getComponentCount(),
                Buffer.BufferElement.ShaderDataTypeToWebGLBaseType(element.type),
                element.normalizd ? true : false,
                layout.getStride(),
                element.offset);
            this.vertexBufferIndex++;
        }

        this.vertexBuffers.push(vertexBuffer);
    }

    public setIndexBuffer(indexBuffer: IndexBuffer) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.rendererID);
		indexBuffer.bind();

		this.indexBuffer = indexBuffer;
    }

    public getIndexBuffer() { 
        return this.indexBuffer;
    }
}
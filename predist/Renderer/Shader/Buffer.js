"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Buffer = /** @class */ (function () {
    function Buffer() {
    }
    return Buffer;
}());
exports.Buffer = Buffer;
(function (Buffer) {
    var ShaderDataType;
    (function (ShaderDataType) {
        ShaderDataType[ShaderDataType["None"] = 0] = "None";
        ShaderDataType[ShaderDataType["Float"] = 1] = "Float";
        ShaderDataType[ShaderDataType["Float2"] = 2] = "Float2";
        ShaderDataType[ShaderDataType["Float3"] = 3] = "Float3";
        ShaderDataType[ShaderDataType["Float4"] = 4] = "Float4";
        ShaderDataType[ShaderDataType["Mat3"] = 5] = "Mat3";
        ShaderDataType[ShaderDataType["Mat4"] = 6] = "Mat4";
        ShaderDataType[ShaderDataType["Int"] = 7] = "Int";
        ShaderDataType[ShaderDataType["Int2"] = 8] = "Int2";
        ShaderDataType[ShaderDataType["Int3"] = 9] = "Int3";
        ShaderDataType[ShaderDataType["Int4"] = 10] = "Int4";
        ShaderDataType[ShaderDataType["Bool"] = 11] = "Bool";
    })(ShaderDataType = Buffer.ShaderDataType || (Buffer.ShaderDataType = {}));
    var BufferElement = /** @class */ (function () {
        function BufferElement(name, type, size, offset, normalizd) {
            if (size === void 0) { size = shaderDataTypeSize(type); }
            if (offset === void 0) { offset = 0; }
            if (normalizd === void 0) { normalizd = false; }
            this.name = name;
            this.type = type;
            this.size = size;
            this.offset = offset;
            this.normalizd = normalizd;
        }
        BufferElement.prototype.getComponentCount = function () {
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
        };
        BufferElement.ShaderDataTypeToWebGLBaseType = function (type) {
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
        };
        return BufferElement;
    }());
    Buffer.BufferElement = BufferElement;
    var BufferLayout = /** @class */ (function () {
        function BufferLayout(elements) {
            this.elements = elements;
            this.stride = 0;
            this.calculateOffsetsAndStride();
        }
        BufferLayout.prototype.getStride = function () { return this.stride; };
        BufferLayout.prototype.getElements = function () { return this.elements; };
        BufferLayout.prototype.calculateOffsetsAndStride = function () {
            var offset = 0;
            this.stride = 0;
            for (var _i = 0, _a = this.elements; _i < _a.length; _i++) {
                var element = _a[_i];
                element.offset = offset;
                offset += element.size;
                this.stride += element.size;
            }
        };
        return BufferLayout;
    }());
    Buffer.BufferLayout = BufferLayout;
    function shaderDataTypeSize(type) {
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
})(Buffer = exports.Buffer || (exports.Buffer = {}));
exports.Buffer = Buffer;
var VertexBuffer = /** @class */ (function (_super) {
    __extends(VertexBuffer, _super);
    function VertexBuffer(vertices, size) {
        var _this = _super.call(this) || this;
        _this.vertices = vertices;
        _this.size = size;
        _this.bufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, _this.bufferObject);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        return _this;
    }
    VertexBuffer.prototype.bind = function () {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferObject);
    };
    VertexBuffer.prototype.unbind = function () {
        gl.bindBuffer(gl.ARRAY_BUFFER, 0);
    };
    VertexBuffer.prototype.setLayout = function (layout) {
        this.layout = layout;
    };
    VertexBuffer.prototype.getLayout = function () {
        return this.layout;
    };
    return VertexBuffer;
}(Buffer));
exports.VertexBuffer = VertexBuffer;
var IndexBuffer = /** @class */ (function (_super) {
    __extends(IndexBuffer, _super);
    function IndexBuffer(indices, size) {
        var _this = _super.call(this) || this;
        _this.indices = indices;
        _this.size = size;
        _this.bufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, _this.bufferObject);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Float32Array(indices), gl.STATIC_DRAW);
        return _this;
    }
    IndexBuffer.prototype.bind = function () {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferObject);
    };
    IndexBuffer.prototype.unbind = function () {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, 0);
    };
    IndexBuffer.prototype.setLayout = function (layout) {
        this.layout = layout;
    };
    IndexBuffer.prototype.getLayout = function () {
        return this.layout;
    };
    IndexBuffer.prototype.getCount = function () {
        return this.indices.length;
    };
    return IndexBuffer;
}(Buffer));
exports.IndexBuffer = IndexBuffer;
var VertexArray = /** @class */ (function (_super) {
    __extends(VertexArray, _super);
    function VertexArray() {
        var _this = _super.call(this) || this;
        _this.rendererID = gl.createBuffer();
        _this.vertexBufferIndex = 0;
        _this.vertexBuffers = [];
        return _this;
    }
    VertexArray.prototype.bind = function () {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.rendererID);
    };
    VertexArray.prototype.unbind = function () {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.rendererID);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.rendererID);
    };
    VertexArray.prototype.addVertexBuffer = function (vertexBuffer) {
        console.warn("Vertex Buffer has no layout!");
        gl.bindBuffer(gl.ARRAY_BUFFER, this.rendererID);
        vertexBuffer.bind();
        var layout = vertexBuffer.getLayout();
        for (var _i = 0, _a = layout.getElements(); _i < _a.length; _i++) {
            var element = _a[_i];
            gl.enableVertexAttribArray(this.vertexBufferIndex);
            gl.vertexAttribPointer(this.vertexBufferIndex, element.getComponentCount(), Buffer.BufferElement.ShaderDataTypeToWebGLBaseType(element.type), element.normalizd ? true : false, layout.getStride(), element.offset);
            this.vertexBufferIndex++;
        }
        this.vertexBuffers.push(vertexBuffer);
    };
    VertexArray.prototype.setIndexBuffer = function (indexBuffer) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.rendererID);
        indexBuffer.bind();
        this.indexBuffer = indexBuffer;
    };
    VertexArray.prototype.getIndexBuffer = function () {
        return this.indexBuffer;
    };
    return VertexArray;
}(Buffer));
exports.VertexArray = VertexArray;

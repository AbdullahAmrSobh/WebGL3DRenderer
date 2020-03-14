import { Camera } from "Engine/Renderer/Camera"

export abstract class CameraController { 
    constructor(public camera: Camera) { }

    abstract OnUpdate(time: number): void;
    abstract Event(e: Event): void;
    
    public get getCamera() : Camera {
        return this.camera;
    }
    
    public set setCamera(v : Camera) {
        this.camera = v;
    }
}
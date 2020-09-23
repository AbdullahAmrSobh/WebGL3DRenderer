import { IUpdatableSystem } from "Engine/core/SystemsManager";

export class Engine {
    private lastUpdate: number = 0;
    private runningSystems: IUpdatableSystem[] = [];
    private runningTasks: CallableFunction[] = [];

    constructor(renderingContext: WebGLRenderingContext) {

    }
    
    public onInit(context: WebGLRenderingContext): void {

    }

    public registerNewSystem(system: IUpdatableSystem): void {
        this.runningSystems.push(system);
    }

    public registerNewTask(update: CallableFunction): void {
        this.runningTasks.push(update);
    }


    update(time: number) {
        for (const task of this.runningTasks) {
            task(time);
        }

        for (const system of this.runningSystems) {
            system.update(time);
        }

        this.lastUpdate = Date.now();
    }

    public run(): void {
        let that = this;
        function loop() {
            var time: number = Date.now() - that.lastUpdate;
            that.update(time);
            requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop)
    }
}
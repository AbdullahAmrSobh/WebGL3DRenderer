export namespace Application { 
    let lastUpdate: number = 0;
    
    var updateQueue: CallableFunction[] = [];
    export function addNewUpdate(update: CallableFunction): void{ 
        updateQueue.push(update);
    }

    export function onInit() {
        
    }
    
    function Update(time: number) { 
        for (const update of updateQueue) {
            update;
        }
        lastUpdate = Date.now();
    }


    export function Run() {
        let loop = () => { 
            var time: number = Date.now() - lastUpdate;
            Update(time);
            requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop)
    }
}
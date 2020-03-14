"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Application;
(function (Application) {
    var lastUpdate = 0;
    var updateQueue = [];
    function addNewUpdate(update) {
        updateQueue.push(update);
    }
    Application.addNewUpdate = addNewUpdate;
    function onInit() {
    }
    Application.onInit = onInit;
    function Update(time) {
        for (var _i = 0, updateQueue_1 = updateQueue; _i < updateQueue_1.length; _i++) {
            var update = updateQueue_1[_i];
            update(time);
        }
        lastUpdate = Date.now();
    }
    Application.Run = function () {
        function loop() {
            var time = Date.now() - lastUpdate;
            Update(time);
            requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);
    };
})(Application = exports.Application || (exports.Application = {}));

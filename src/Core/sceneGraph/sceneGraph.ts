import { mat4 } from "gl-matrix";

export class SceneGraph
{
    public nodes: SceneGraphNode[] = [];

    constructor(subGraph: SceneGraph | null)
    {
        if(typeof subGraph === null)
        {

        }
        else
        {

        }
    }
}

class SceneGraphNode 
{
    public parant: number = 0;
    public children: number[] = [];
    public transform: mat4 = mat4.create();
    
    private static getParant(node: SceneGraphNode, graph: SceneGraphNode[]): SceneGraphNode | boolean {  
        return node.parant != 0? graph[node.parant] : false;
    } 
    
    public getRelativeTransform(graph: SceneGraphNode[]): mat4 {
        let transform = this.transform;
        let currentNode = SceneGraphNode.getParant(this, graph);
        if(currentNode !== false)
        {
            mat4.multiply(transform, transform, (<SceneGraphNode>currentNode).transform);
            currentNode = SceneGraphNode.getParant(<SceneGraphNode>currentNode, graph); 
        }
            return transform;
    }
}
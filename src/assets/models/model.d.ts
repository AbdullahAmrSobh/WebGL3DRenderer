export interface Model {
    vertcies: number[];
    indcies: number[];
}

declare module "*.json" {
    const content: Model;
    export default content;
}
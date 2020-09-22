
enum MaterialProperty 
{
    Albedo           = 1 << 0,
    Normal           = 1 << 1,
    Metallic         = 1 << 2, 
    Microsurface     = 1 << 3,
    AmbientOcclusion = 1 << 4 
}

class MaterialAttribute 
{
    constructor(
        public readonly type: MaterialProperty, 
        public readonly value: number | HTMLImageElement,
    )
    {

    }

}
class Material
{
    constructor(
        public color: MaterialAttribute,
        public normal: MaterialAttribute,
        public metallic: MaterialAttribute,
        public microsurface: MaterialAttribute,
        public ambientOcclusion: MaterialAttribute
    )
    {
        
    }


}
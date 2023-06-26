export class Compras{
    constructor(id_producto="",producto="",quantity=0,price=0,name="",direction="",id_user=""){
        this.id_producto=id_producto,
        this.producto=producto,
        this.quantity=quantity,
        this.price=price,
        this.name=name,
        this.direction=direction,
        this.id_user=id_user
    }
    id_producto:string
    producto:string
    quantity:number
    price:number
    name:string
    direction:string
    id_user:string
    date?: string
    total?:number
    _id?:string
}
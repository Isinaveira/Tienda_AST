export class Productos{
    constructor(name="",description="",price=0,quantity=0, image=''){    
        this.name= name;
        this.description=description;
        this.price = price;
        this.quantity=quantity;
        this.image = image;
    
    };
    
    name: string
    description: string
    quantity: number
    price: number
    _id?: string
    image?: string
}

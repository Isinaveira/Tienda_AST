export class Productos{
    constructor(name="",description="",price="",quantity=0, image=''){    
        this.name= name;
        this.description=description;
        this.price = price;
        this.quantity=quantity;
        this.image = image;
    
    };
    
    name: string
    description: string
    quantity: number
    price: string
    _id?: string
    image?: string
}

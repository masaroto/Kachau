// import { model } from "mongoose";

class Cart{
    
    constructor(){
        this.items = {};
        this.precoTotal = 0;
        this.isEmpty = true;
    }

    add(prod){
        var item = this.items[prod._id];
        if(item != undefined){
           item.qtd++;
        } else {
            let newItem = {
                id : prod._id,
                name: prod.name,
                desc: prod.desc, 
                preco: prod.preco,
                img: prod.img,
                qtd: 1
            }
            this.items[prod._id] = newItem;
        }
        this.precoTotal += prod.preco;
        

    }

    delete(id){
        var item = this.items[id];
        if(item != undefined){
            if(item.qtd === 1){
                delete this.items[id];
                this.isEmpty = true;
                for(var x in this.items){
                    this.isEmpty = false;
                    break;
                }
            } else{
                item.qtd--;
            }
            this.precoTotal -= item.preco;    
        }
        

    }
}

module.exports = new Cart();
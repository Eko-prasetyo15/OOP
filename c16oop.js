class carFactory{
    constructor(){
        this.number = [(Math.floor(Math.random() * 2) + 1)]
    }
buildup(){
    let hasil = []
    let daihatsu = new DAIHATSU();
    let toyota = new TOYOTA();
    let suzuki = new SUZUKI();
    let honda = new HONDA();
    for (let i = 0; i < this.number ; i++){
        hasil.push(daihatsu.assemble())
        hasil.push(toyota.assemble())
        hasil.push(suzuki.assemble())
        hasil.push(honda.assemble())
    }
    console.log(hasil)
}
}

class Car{
    constructor(serviceBook, warrantyBook, toolsKitbox ){
        this.serviceBook = 1;
        this.warrantyBook = 1;
        this.toolsKitbox = 1;
        this.tyre = new Tyre();
    }
    warranty(){
        let warrantyTime = [(Math.floor(Math.random() * 4) + 2)]
        return warrantyTime;
    }
}
class Tyre{
constructor(){
    let merk = ['Dunlop','Bridgestone','GT-Radial','Swalow']
    this.defaulttyre = merk[(Math.floor(Math.random() * 3) + 1)]

}
}
class DAIHATSU extends Car{
    assemble(){
        let newdaihatsu = {
            type : 'Xenia', 
            serviceBook : `${this.serviceBook}`,
            warrantyBook : `${this.warrantyBook}`,
            toolsKitbox : `${this.toolsKitbox}`,
            tyre : `${this.tyre.defaulttyre}`, 
            garansi : `${this.warranty()} tahun`
        }
        return newdaihatsu
    }
}
class TOYOTA extends Car{
    assemble(){
        let newtoyota = {
            type : 'Avanza', 
            serviceBook : `${this.serviceBook}`,
            warrantyBook : `${this.warrantybook}`,
            toolsKitbox : `${this.toolsKitbox}`,
            tyre : `${this.tyre.defaulttyre}`, 
            garansi : `${this.warranty()} tahun`
        }
        return newtoyota
    }
}
class SUZUKI extends Car{
    assemble(){
        let newsuzuki = {
            type : 'Ertiga', 
            serviceBook : `${this.serviceBook}`,
            warrantyBook : `${this.warrantybook}`,
            toolsKitbox : `${this.toolsKitbox}`,
            tyre : `${this.tyre.defaulttyre}`, 
            garansi : `${this.warranty()} tahun`
        }
        return newsuzuki
    }
}
class HONDA extends Car{
    assemble(){
        let newhonda = {
            type : 'Mobilio', 
            serviceBook : `${this.serviceBook}`,
            warrantyBook : `${this.warrantybook}`,
            toolsKitbox : `${this.toolsKitbox}`,
            tyre : `${this.tyre.defaulttyre}`, 
            garansi : `${this.warranty()} tahun`
        }
        return newhonda
    }
}

let cars = new carFactory;
cars.buildup();
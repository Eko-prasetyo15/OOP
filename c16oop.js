class carFactory{
constructor(){
    this.number = [(Math.floor(Math.random() * 5) + 1)]
}
buildup(){
    let hasil =[]
    let bmw = new BMW(1,1)
    for (let i = 0; i < this.number; i++){
        hasil.push(bmw.assemble());
    }
    console.log(hasil)
}
}
class Car{
constructor(dashboard, bagagge){
    this.dashboard = dashboard
    this.bagagge = bagagge
    this.tyre = new Tyre();
}
warranty(){
    let warrantytime = [(Math.floor(Math.random() * 5) + 1)]
    return warrantytime;
}
}
class Tyre{
    constructor(){
        let merk = ['Dunlop','Bridgestone','GT-radial','Falken','Yokohama'];
        this.defaulttyre = merk [(Math.floor(Math.random() * 4) + 1)]
    }
}
class BMW extends Car{
    assemble(){
        let newBmw = {
            type : 'i8', 
            dashboard : `${this.dashboard}`,
            bagagge : `${this.bagagge}`,
            tyre : `${this.tyre.defaulttyre}`, 
            garansi : `${this.warranty()} tahun`
        }
        return newBmw
    }

}
let cars = new carFactory;
cars.buildup();
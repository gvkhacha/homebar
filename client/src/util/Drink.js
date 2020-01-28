const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, txt => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    })
}

const ALC = ["Vodka", "Rum", "Gin", "Cognac", "Brandy", "Tequila", "Whiskey", "Champange", "Wine", "Beer", "Scotch", "Bourbon", "Rye"]

class Drink {
    constructor(name, imgSrc, ingr, steps, glass){
        this.name = toTitleCase(name);
        this.imgSrc = imgSrc;
        this.ingr = ingr.map(i => {
            if(i.text){
                return {name: toTitleCase(i.text), quantity: i.qty};
            }
            return {name: toTitleCase(i.name), quantity: i.quantity};
        }); 

        this.steps = steps; //[str]
        this.alc = this.getAlc(this.ingr);
        this.glass = glass;
    }

    getAlc(ingredients){
        return ALC.find(a => ingredients.map(i => i.name).includes(a)) || "Liqeur";
    }
}

export default Drink;
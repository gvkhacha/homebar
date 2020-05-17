const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, txt => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    })
}

const ALC = ["Vodka", "Rum", "Gin", "Cognac", "Brandy", "Tequila", "Rye", "Scotch", "Bourbon", "Whiskey", "Champagne", "Wine", "Beer"];

class Drink {
    constructor(id, name, imgSrc, ingr, steps, glass){
        this.id = id;
        this.name = toTitleCase(name);
        this.img = imgSrc;
        this.ingredients = ingr.map(i => {
            if(i.text){
                return {name: toTitleCase(i.text), quantity: i.qty};
            }
            return {name: toTitleCase(i.name), quantity: i.quantity};
        }); 

        this.steps = steps; //[str]
        this.alc = this.getAlc(this.ingredients);
        this.glassware = glass;
    }

    getAlc(ingredients){
        for(let i = 0; i<ingredients.length; i++){
            for(let k=0; k<ALC.length; k++){
                if(ingredients[i].name.toLowerCase().includes(ALC[k].toLowerCase())){
                    return ALC[k];
                }
            }
        }
        return "Liqueur";
    }
}

export default Drink;
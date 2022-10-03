var position = document.getElementById("lieuActuel");
var konsole = document.querySelector(".console");
var informations = document.querySelector(".informationsJeu");

//Variables
var actualLocation;
var localiserCompteur = 0;


//Classes
class Lieu {
    constructor(nom, direction, description, isPerson, object) {
        this.nom = nom;
        this.direction = direction;
        this.description = description;
        this.isPerson = isPerson;
        this.object = object;
    }
    goingTo(direction, description, objdes) {
        direction = this.direction;
        clear();
        if (objdes == " "){
            informations.value = description;
        } else {
            informations.value = description +"\n\n Il y a : "+ objdes;
        }
        position.innerText = direction;
        actualLocation = direction;       
    }
}

class Person {
    constructor(nom, description) {
        this.nom = nom;
        this.description = description;
    }
}

class Objet {
    constructor(nom, description, location) {
        this.nom = nom;
        this.description = description;
        this.location = location;
    }
}

//Définition des objets
var boiteAMeuh = new Objet("Boîte à Meuh", "Une jolie boîte à meuh qui imite la vache avec un talent indéniable", chambreSale);


//Définition des personnes
var player = new Person("Vous", "Vous ne pouvez vous empêcher de vous regarder dans le reflet de l'arrière de votre téléphone et force est de constater que les poches sous vos yeux vous font ressembler à un famélique lémurien. Vous ne trouverez sûrement jamais personne pour prendre soin de vous, si vous ne faites aucun effort...");


//Définition des lieux
var chambreSale = new Lieu("Chambre Sale", "Cage d'Escalier", "Vous vous trouvez dans une chambre dégueulasse , au sol jonché de paquets de chips vides et de canettes de bière bon marché. C'est ici que vous habitez, et comme chaque jour depuis bien longtemps vous vous rendez au travail, en traînant les pieds. Une seule ouverture dans la pièce, au sud, une porte en bois décrépie et une poignée se vautrant à moitié. Que voulez-vous faire?",
    false,boiteAMeuh);
var escalier = new Lieu("Cage d'Escalier", "Chambre Sale", "Vous voici dans la cage d'escalier de votre immeuble, vous êtes au dernier étage, au 3ème. Allez-vous tenter d'éviter votre commère de voisine en partant de suite ou allez-vous tester les limites de votre patience? \nEn regardant, au-delà du palier, à l'ouest, vous constatez une porte de la même couleur de la vôtre quoiqu'un peu plus propre, sur la sonnerie, on peut lire 'Madame Joubert'.",
    false);

//INIT
actualLocation = chambreSale;
position.innerText = chambreSale.nom;



//MAIN
window.addEventListener("keypress", function (evt) {
    if (charCode = 13) {
        var prompt = konsole.value;
        if (prompt == "effacer") {
            clear();
            informations.value = "";
        }
        if (prompt == "chier") {
            chier();
        }
        if (prompt == "dormir") {
            dormir();
        }
        if (prompt == "inspecter") {
            inspecter();
        }
        if (prompt == "localiser") {
            localiserCompteur++;
            localiser();            
        }
        if (prompt == "sud" && position.textContent == "Chambre Sale") {
            chambreSale.goingTo(escalier, escalier.description, " ");
            actualLocation = escalier;
        }
        if (prompt == "nord" && position.textContent == "Cage d'Escalier") {
            escalier.goingTo(chambreSale, chambreSale.description, boiteAMeuh.description);
            actualLocation = chambreSale;
        }
    }
});



//Functions
function localiser() {
    clear();
    informations.value = "Vous vous trouvez actuellement dans: "+ actualLocation.nom + "\n Il vous est possible d'aller dans : "+actualLocation.direction + "\n\n"+ actualLocation.description;
    if(localiserCompteur > 10){
        informations.value += "\n\n Arrêtez d'utiliser cette commande, préférez vos neurones plutôt que l'aide intégrée au jeu!";
    }
}
function chier() {
    clear();
    informations.value = "Vous vous accroupissez à terre et poussez bruyamment. Votre anus se dilate, vous posez une crotte énorme qui vous satisfait beaucoup. Vous ricanez bêtement.";
};

function dormir() {
    clear();
    informations.value = "Vous sentez vos paupières s'alourdir et vous vous assoupissez à même le sol. Vous sombrez rapidement dans un sommeil de plomb, la fatigue, le travail et les jeux vidéo vous rendent tout mollasson.";
};

function inspecter() {
    clear();
    if (actualLocation.isPerson) {
        return informations.value = Person.description;
    } else {
        return informations.value = player.description;
    }
}

function clear() {
    konsole.value = "";
};

function badInput() {
    clear();
    informations.value = "Vous ne pouvea aller par ici!";
};

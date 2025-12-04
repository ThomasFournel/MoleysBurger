// Données des burgers
// nom : {name : nom affiché, img : chemin de l'image, price : prix en euros, compo : composition du burger, info : description du burger}
const burgerList = {
  classic: {
    name: "Le Classique",
    img: "assets/img/Burger/classic.png",
    price: 8.5,
    compo: "Salade, Tomates, Oignons, Sauce Moley's, Cornichons, Steak 150g",
    info: "La formule classique et incontournable, simple et efficace.",
  },
  mini: {
    name: "Riquiqui",
    img: "assets/img/Burger/mini.png",
    price: 5.0,
    compo: "Sauce Moley's, Cornichons, Steak 100g",
    info: "La version compacte du classique, pour les petites faims.",
  },
  miniCheese: {
    name: "Fromage Riquiqui",
    img: "assets/img/Burger/miniCheese.png",
    price: 5.5,
    compo: "Sauce Moley's, Cornichons, Cheddar, Steak 100g",
    info: "La version compacte du classique, pour les petites faims. Cette fois avec du fromage !",
  },
  double: {
    name: "Double Dose",
    img: "assets/img/Burger/double.png",
    price: 10.5,
    compo: "Salade, Tomates, Oignons, Sauce Moley's, Cornichons, 2 Steaks 150g",
    info: "Pour les gros appétits, doublez la mise avec deux steaks juteux.",
  },
  bacon: {
    name: "Le Piggy",
    img: "assets/img/Burger/bacon.png",
    price: 9.5,
    compo:
      "Salade, Tomates, Oignons, Sauce Moley's, Cornichons, Cheddar, Bacon, Steak 150g",
    info: "Ajoutez une touche fumée et croustillante avec du bacon savoureux.",
  },
  miniBacon: {
    name: "Piggy Riquiqui",
    img: "assets/img/Burger/miniBacon.png",
    price: 6.0,
    compo: "Sauce Moley's, Cornichons, Cheddar, Bacon, Steak 100g",
    info: "La version compacte du Piggy, pour les petites faims.",
  },
  rings: {
    name: "Hula Hoop",
    img: "assets/img/Burger/rings.png",
    price: 10.0,
    compo:
      "Salade, Tomates, Onion Rings, Oignon, Sauce Moley's, Cornichons, Cheddar, Steak 150g",
    info: "Ajoutez du croquant avec des onion rings dorés à la perfection.",
  },
  poulet: {
    name: "Version Poulet",
    img: "assets/img/Burger/poulet.png",
    price: 9.0,
    compo: "Salade, Tomates, Sauce Moley's, Cornichons, Filet de Poulet Pané",
    info: "Pour les amateurs de volaille, un filet de poulet pané à la place du steak.",
  },
  miniPoulet: {
    name: "Poulet Riquiqui",
    img: "assets/img/Burger/miniPoulet.png",
    price: 5.5,
    compo: "Salade, Sauce Moley's, Filet de Poulet Pané",
    info: "La version compacte du burger poulet, pour les petites faims.",
  },
  veggie: {
    name: "L'Herbivore",
    img: "assets/img/Burger/veggie.png",
    price: 9.5,
    compo:
      "Salade, Tomates, Oignons, Sauce Moley's, Cornichons, Galette Végétarienne",
    info: "Une option savoureuse pour les végétariens, avec une galette à base de légumes.",
  },
  more: {
    name: "Et bientôt d'autres...",
    img: "assets/img/more.svg",
    class: "logo",
    notAProduct: true,
  },
};

// on récupère l'overlay et la carte à l'intérieur, pour quand on veut afficher les infos d'un burger
const overlay = document.getElementById("overlay");
const overlayCard = overlay.querySelector("#card");

// Fonction de création d'une carte burger
// il prend en paramètres le nom du burger et le parent où on veut l'ajouter
function createCard(name, parent) {
  // envoit un warning si le burger n'existe pas
  if (!(name in burgerList)) {
    console.warn(`Burger "${name}" not found :(`);
    return;
  }

  // création de la carte
  const card = document.createElement("section");
  card.className = "card-burger";
  parent.appendChild(card);

  // création de la div parent de l'image
  const imgDiv = document.createElement("div");
  imgDiv.className = "img";
  card.appendChild(imgDiv);

  // création de l'image
  const img = document.createElement("img");
  img.src = burgerList[name].img;
  if (burgerList[name].class) {
    img.className = burgerList[name].class;
  }
  imgDiv.appendChild(img);

  // création du titre
  const title = document.createElement("h3");
  title.innerHTML = burgerList[name].name;
  card.appendChild(title);

  // ajuste le nombre de colonnes en fonction du nombre de burgers
  parent.style.gridTemplateColumns = `repeat(${parent.children.length}, 25%)`;

  if (!burgerList[name]["notAProduct"]) {
    // quand la carte est cliquée, on ouvre l'overlay avec les infos du burger
    card.onclick = function () {
      // on remplit la carte de l'overlay avec les infos du burger
      overlay.style.display = "block";
      const overlayImg = overlayCard.querySelector(".img");
      overlayImg.firstElementChild.src = burgerList[name].img;
      overlayCard.querySelector("h3").innerHTML = burgerList[name].name;
      overlayCard.querySelector("#compo").innerHTML = burgerList[name].compo;
      overlayCard.querySelector("#price").innerHTML = `Prix : ${burgerList[
        name
      ].price.toFixed(2)} €`;
      overlayCard.querySelector("#desc").innerHTML = burgerList[name].info;
    };
  } else {
    // ajout d'une class spéciale pour éviter que la card soit intéractible (vu qu'elle n'est pas cliquable)
    card.className = "not-card-burger";
  }

  return card;
}

// Overlay

// fonction qui cache l'overlay
function closeOverlay(e) {
  //solution pour éviter que l'overlay se désactive quand la card est cliquée
  if (e.target == this) {
    overlay.style.display = "none";
  }
}

// Quand le bouton de fermeture est cliqué, on cache l'overlay
document.getElementById("closeBtn").onclick = closeOverlay;
// ou quand on clique en dehors
document.getElementById("overlay").onclick = closeOverlay;


// Carrousels de burgers

// définis les listes de burgers à afficher dans leurs carrousels respectifs
const data = {
  spotlight: [
    "poulet",
    "double",
    "bacon",
    "mini",
    "classic",
    "veggie",
    "rings",
    "miniCheese",
  ],
  beef: [
    "classic",
    "mini",
    "miniCheese",
    "double",
    "bacon",
    "miniBacon",
    "rings",
  ],
  chicken: ["poulet", "miniPoulet", "more"],
  veggie: ["veggie", "more"],
};

// pour chaque carousel de burger, on aura un index pour savoir quel burger afficher
const currentIndex = {};
// le nombre maximum de burgers affichés dans une ligne
const rowMaxAmount = 4;

// Pour chaque carrousel burger, on crée des cartes et on gère les boutons
for (const key in data) {
  // On récupère la liste de burgers pour cette section
  const item = data[key];
  // On récupère la section correspondante grâce à la clé
  const section = document.getElementById(key);
  // On va chercher les boutons
  const buttonLeft = section.querySelector(".row-left");
  const buttonRight = section.querySelector(".row-right");
  // Et aussi la ligne
  const row = section.querySelector(".burger-row");

  // On crée les cartes pour les 3 premiers burger de la liste
  for (let i = 0; i < rowMaxAmount && i < item.length; i++) {
    const burger = item[i];
    createCard(burger, row);
  }

  // Si il y a moins de 4 burgers en tout, on cache les boutons
  if (item.length <= rowMaxAmount) {
    buttonLeft.style.display = "none";
    buttonRight.style.display = "none";
  } else {
    // On initialise l'index actuel du carrousel au nombre maximum de burgers affichés
    currentIndex[key] = rowMaxAmount;

    // Quand un des boutons est pressé, on "scroll" la ligne dans la direction

    buttonRight.onclick = () => {
      // on va chercher la ligne carrousel actuelle
      const currentRow = buttonRight.parentElement.parentElement.querySelector(".burger-row");
      const rowName = currentRow.parentElement.id;
      // on récupère la liste de burgers actuelle
      const currentList = data[rowName];

      // on récupère l'index actuel
      let index = currentIndex[rowName];
      // on l'incrémente (pour aller au burger suivant)
      index++;
      // si on dépasse la fin de la liste, on revient au début
      if (index >= currentList.length) {
        index = 0;
      }
      // on met à jour l'index actuel
      currentIndex[rowName] = index;
      // on récupère le burger à afficher
      const nextBurger = currentList[index];
      // on crée la nouvelle carte et on supprime la première, donnant l'effet de "scroll"
      createCard(nextBurger, currentRow);
      row.removeChild(row.children[0]);
    };

    buttonLeft.onclick = () => {
      // on va chercher la ligne carrousel actuelle
      const currentRow = buttonRight.parentElement.parentElement.querySelector(".burger-row");
      const rowName = currentRow.parentElement.id;
      // on récupère la liste de burgers actuelle
      const currentList = data[rowName];
      // on récupère l'index actuel
      let index = currentIndex[rowName];
      // on le décrémente (pour aller au burger précédent)
      index--;
      // si on dépasse le début de la liste, on revient à la fin
      if (index < 0) {
        index = currentList.length - 1;
      }
      // on calcule l'index de la carte à afficher, puisque l'index actuel représente la carte la plus à gauche
      let targetIndex = index - rowMaxAmount;
      // on ajuste l'index si il est négatif
      if (targetIndex < 0) {
        targetIndex = currentList.length + targetIndex;
      }
      // on met à jour l'index actuel
      currentIndex[rowName] = index;
      // on récupère le burger à afficher
      const nextBurger = currentList[targetIndex];
      // on crée la nouvelle carte au début et on supprime la dernière, donnant l'effet de "scroll"
      const newCard = createCard(nextBurger, currentRow);
      // insère la carte au début (avant la première carte actuelle)
      row.insertBefore(newCard, row.children[0]);
      row.removeChild(row.children[rowMaxAmount]);
    };
  }
}

// changement de thème (clair/sombre)

// on récupère le bouton
const themeButton = document.getElementById("themeSwitch");
// quand il est cliqué, on change le thème
themeButton.addEventListener("click", () => {
  // on vérifie le thème actuel
  const isLight = themeButton.dataset.theme === "light";
  // si le thème est clair, on passe au sombre, et inversement
  if (isLight) {
    // on met le dataset à dark
    themeButton.dataset.theme = "dark";
    // on change l'id du body pour appliquer le thème sombre
    document.body.id = "darkTheme";
  } else {
    // on met le dataset à light
    themeButton.dataset.theme = "light";
    // on change l'id du body pour appliquer le thème clair
    document.body.id = "";
  }
});






// cookie clicker - for fun :D

// on récupère les éléments nécessaires
const cookie = document.getElementById("logo");
const cookieImg = cookie.firstElementChild;
const cookieText = document.getElementById("clickerScore");

// on initialise le score
let score = 0;

// on définit le comportement au clic, au début c'est caché pour que ça reste un easter egg
cookie.onmouseup = function () {
  score += 1;

  // si il a cliqué 4 fois ou +, on active le vrai clicker, révélant l'easter egg'
  if (score >= 4) {
    // quand la souris est appuyée sur le logo
    cookie.onmousedown = function () {
      // on agrandit légèrement l'image pour l'effet de clic
      cookieImg.style.width = "105%";
      cookieImg.style.height = "105%";
    };

    // quand la souris est relâchée sur le logo
    cookie.onmouseup = function () {
      // on remet l'image à sa taille normale
      cookieImg.style.width = "100%";
      cookieImg.style.height = "100%";

      // on augmente le score et on l'affiche
      score += 1;
      cookieText.innerText = `${score}`;
    };

    cookie.onmouseleave = function () {
      // si la souris sort du logo, on remet l'image à sa taille normale, pour éviter qu'elle reste agrandie
      cookieImg.style.width = "100%";
      cookieImg.style.height = "100%";
    };
  }
};

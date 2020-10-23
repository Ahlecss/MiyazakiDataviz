class Bar {
  constructor(hauteur, largeur, positionX, positionY, positionZ, percentage, theme, title) {
    this.hauteur = hauteur;
    this.hauteurTarget = hauteur;
    this.largeur = largeur;
    this.positionX = positionX;
    this.positionY = positionY;
    this.positionZ = positionZ;
    this.gravity = percentage.gravity;
    this.environment = percentage.environment;
    this.enfancy = percentage.enfancy;
    this.water = percentage.water;
    this.greyzone = percentage.greyzone;
    this.love = percentage.love;
    this.theme = theme;
    this.title = title;
  }

  drawShape(currentTheme) {
    this.hauteur = lerp(this.hauteur, this.hauteurTarget * 5, 0.1);

    // Draw title
    push();
    translate(this.positionX + 75, this.positionY + 75, this.positionZ - 75)
    textAlign(CENTER);
    textFont(MontserratRegular);
    rotateY(PI / 4);
    rotateX(PI / 2);
    text(this.title, 0, 0);
    pop();

    push();
    translate(this.positionX, this.positionY, this.positionZ);

    push();
    rotateY(PI / 4);

    beginShape();
    fill(235, 230)
    vertex(0, 0);
    vertex(this.largeur, 0);
    vertex(this.largeur, -this.hauteur);
    vertex(0, -this.hauteur);
    endShape(CLOSE);
    pop();

    push();
    rotateY(-PI / 4);

    beginShape();
    fill(255, 255)
    vertex(0, 0);
    vertex(-this.largeur, 0);
    vertex(-this.largeur, -this.hauteur);
    vertex(0, -this.hauteur);
    endShape(CLOSE);
    pop();

    push();
    rotateY(PI / 4);

    beginShape();
    fill(255, 255)
    vertex(0, -this.hauteur);
    vertex(this.largeur, -this.hauteur);
    vertex(this.largeur, -this.hauteur, -this.largeur);
    vertex(0, -this.hauteur, -this.largeur);
    endShape(CLOSE);
    pop();

    // Draw percentage
    push();
    translate(10, -this.hauteur * 1.15)


    push();
    fill('#000000');
    textAlign(CENTER);
    textFont(MontserratRegular);
    rotateY(PI / 4);
    rotateX(PI / 2);
    text(this.theme + '%', 0, 0);
    pop();


    pop();

    pop();
  }

}

class Button {
  constructor(hauteur, largeur, positionX, positionY, positionZ, title) {
    this.hauteur = hauteur;
    this.hauteurTarget = hauteur;
    this.largeur = largeur;
    this.positionX = positionX;
    this.positionY = positionY;
    this.positionZ = positionZ;
    this.title = title;
  }

  drawShape() {
    this.hauteur = lerp(this.hauteur, this.hauteurTarget * 5, 0.1);
    //this.positionZ = lerp(this.positionZ, -this.hauteurTarget * 5, 0.1);
    push();
    translate(this.positionX - 75, this.positionY, this.positionZ + 50);

    cylinder(20, this.hauteur, 16, true, true);
    pop();

    push();
    translate(this.positionX, this.positionY + 100, this.positionZ);
    textAlign(CENTER);
    textFont(MontserratRegular);
    rotateY(-PI / 4);
    rotateX(PI / 2);
    text(this.title, 0, 0);
    pop();
  }

}

class Gif {
  constructor(hauteur, largeur, positionX, positionY, positionZ, name, index) {
    this.hauteur = hauteur;
    this.largeur = largeur;
    this.positionX = positionX;
    this.positionY = positionY;
    this.positionZ = positionZ;
    this.name = name;
    this.index = index;
  }

  drawShape() {
    //this.hauteur = lerp(this.hauteur, this.hauteurTarget * 5, 0.1);
    //this.positionZ = lerp(this.positionZ, -this.hauteurTarget * 5, 0.1);
    console.log(this.index)
    push();
    translate(this.positionX + 150, this.positionY + 700, this.positionZ - 1000);
    rotateY(PI / 4);
    texture(gif[this.name])
    a = lerp(a, 3000, 0.1);

    push();
    translate(-a + this.index * (500 * 1.8), -1100, -100);
    plane(500 * 1.8, 271 * 1.8);
    pop();

    pop();


  }

}

let img = [];
let gif = [];
let time = 0
let nickNameTheme;
let rayon;
let angle;
let hauteur;
let largeur;
let Bars = [];
let Buttons = [];
let Gifs = [];
let fakeButtons = [];
let data = [];
let percentage = [];
let allThemes = ['Ecologie', 'Aviation', 'Enfance', 'Eau', 'Amour', 'Féminisme', 'Pacifisme', 'Zone Grise',]
let currentTheme = '';
let globalMovies = [];
let backgroundImg;
let newHeight;
let oldIndex;
//let MontserratThin;
let MontserratRegular;
//let MontserratSemiBold;

function preload() {

  //IMG
  //backgroundImg = loadImage('../assets/svg/background.png');
  img.Hayao = loadImage('../assets/svg/Hayao.png');
  img.Miyazaki = loadImage('../assets/svg/Miyazaki.png');
  img.Studio = loadImage('../assets/svg/Studio.png');
  img.Ghibli = loadImage('../assets/svg/Ghibli.png');
  img.data = loadImage('../assets/svg/data.png');
  img.visualisation = loadImage('../assets/svg/visualisation.png');
  img.consignes = loadImage('../assets/svg/consignes.png');
  img.copyright = loadImage('../assets/svg/copyright.png');
  img.subjective = loadImage('../assets/svg/subjective.png');
  img.gobelins = loadImage('../assets/svg/gobelins.png');

  //FONT
  //MontserratThin = loadFont('../assets/Montserrat/Montserrat-Thin.ttf');
  MontserratRegular = loadFont('../assets/Montserrat/Montserrat-Regular.ttf');
  //MontserratSemiBold = loadFont('../assets/Montserrat/Montserrat-SemiBold.ttf');

  //DATAS
  loadJSON('../assets/data.json', formatDatas);

  //MUSIC
  /*let song = loadSound('../assets/sound.mp3');
  song.play();*/

  //GIF
  gif.eco1 = loadImage('../assets/gif/eco1.gif');
  gif.eco2 = loadImage('../assets/gif/eco2.gif');
  gif.eco3 = loadImage('../assets/gif/eco3.gif');

  gif.avi1 = loadImage('../assets/gif/avi1.gif');
  gif.avi2 = loadImage('../assets/gif/avi2.gif');
  gif.avi3 = loadImage('../assets/gif/avi3.gif');

  gif.enf1 = loadImage('../assets/gif/enf1.gif');
  gif.enf2 = loadImage('../assets/gif/enf2.gif');
  gif.enf3 = loadImage('../assets/gif/enf3.gif');

  gif.eau1 = loadImage('../assets/gif/eau1.gif');
  gif.eau2 = loadImage('../assets/gif/eau2.gif');
  gif.eau3 = loadImage('../assets/gif/eau3.gif');

  gif.amo1 = loadImage('../assets/gif/amo1.gif');
  gif.amo2 = loadImage('../assets/gif/amo2.gif');
  gif.amo3 = loadImage('../assets/gif/amo3.gif');

  gif.fem1 = loadImage('../assets/gif/fem1.gif');
  gif.fem2 = loadImage('../assets/gif/fem2.gif');
  gif.fem3 = loadImage('../assets/gif/fem3.gif');

  gif.pac1 = loadImage('../assets/gif/pac1.gif');
  gif.pac2 = loadImage('../assets/gif/pac2.gif');
  gif.pac3 = loadImage('../assets/gif/pac3.gif');

  gif.zon1 = loadImage('../assets/gif/zon1.gif');
  gif.zon2 = loadImage('../assets/gif/zon2.gif');
  gif.zon3 = loadImage('../assets/gif/zon3.gif');

}

function formatDatas(movies) {
  globalMovies = movies
  let idx = 0;
  Bars = movies.map(movie => {
    console.log(movie)
    idx++
    return new Bar(movie.Pacifisme, 75, (150 * idx) - 500, 300, (150 * -idx) + 500, 10, movie.Pacifisme, movie.Title);
  })

  console.log(Bars);
}

function updateDatas() {
  for (let i = 0; i < 8; i++) {
    let b = Bars[i];
    let h;
    console.log(globalMovies[i].Ecologie)
    console.log(globalMovies[i].Zonegrise)
    switch (currentTheme) {
      case "Ecologie":
        h = globalMovies[i].Ecologie;
        break;
      case "Aviation":
        h = globalMovies[i].Aviation;
        break;
      case "Enfance":
        h = globalMovies[i].Enfance;
        break;
      case "Eau":
        h = globalMovies[i].Eau;
        break;
      case "Amour":
        h = globalMovies[i].Amour;
        break;
      case "Feminisme":
        h = globalMovies[i].Feminisme;
        break;
      case "Pacifisme":
        h = globalMovies[i].Pacifisme;
        break;
      case "Zonegrise":
        h = globalMovies[i].Zonegrise;
        break;
    }
    b.hauteurTarget = h;
    b.theme = h;
  };
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  ortho();

  // Pour les déplacer, x et z doivent être semblables mais inversées
  for (let i = 0; i < 8; i++) {
    Buttons.push(new Button(3, 25, 80 * (i + 1), 600, 80 * -(i + 1), allThemes[i]));
  }

  console.log(Buttons)
  placeFakeButtons();


  //backgroundImg.resize(canvas.width, canvas.height);

  rayon = 50;
  angle = PI / 6;
  hauteur = 50;
  largeur = 50;
  fill('#ffffff');
  textFont(MontserratRegular);
  textSize(24);
}
let p = -1000;
let q = -1000;
let r = -1000;
let s = -1000;
let t = -1000;
let u = -1000;
let v = 1000;
let w = -1000;
let x = -1000;
let y = -1000;
let z = -1000;

let a = 1000;

function draw() {
  push();
  translate(0, 0, -1000);
  background('#26abff');
  //image(backgroundImg, -canvas.width / 2, -canvas.height / 2);
  pop();
  noStroke();
  ortho();
  //ambientLight(200);
  //directionalLight(50, 50, 50, 0, 0, 0);
  rotateX(-PI / 6)

  time += 0.02;
  // rotateY(PI/ 4)

  if (time > 1) {
    if (time > 1.1) {
      texture(img.Hayao)
      p = lerp(p, -150, 0.1);

      push();
      translate(-200, p, 0);
      plane(300, 300);
      pop();
    }
    if (time > 1.5) {
      texture(img.Miyazaki)
      q = lerp(q, 0, 0.1);

      push();
      translate(-200, q, 1);
      plane(300, 300);
      pop();
    }
    if (time > 2) {
      texture(img.Studio)
      s = lerp(s, -200, 0.1);

      push();
      translate(200, s, 2);
      plane(300, 300);
      pop();

    }
    if (time > 2) {
      texture(img.Ghibli)
      t = lerp(t, 0, 0.1);

      push();
      translate(200, t, 3);
      plane(300, 300);
      pop();
    }

    if (time > 4.5) {
      p = lerp(p, 5000, 0.03);
      q = lerp(q, 5000, 0.03);
      r = lerp(r, 5000, 0.03);
      s = lerp(s, 5000, 0.03);
      t = lerp(t, 5000, 0.03);
    }

  }

  if (time > 6) {
    //clear()

    if (time > 6.2) {
      texture(img.consignes)
      u = lerp(u, 0, 0.1);

      push();
      translate(250, u, 4);
      plane(2021 / 5, 1472 / 5);
      pop();
    }
    if (time > 6.3) {
      texture(img.copyright)
      w = lerp(w, 150, 0.1);

      push();
      translate(250, w, 5);
      plane(1984 / 5, 1223 / 5);
      pop();
    }
    if (time > 6.4) {
      texture(img.subjective)
      z = lerp(z, 150, 0.1);

      push();
      translate(-250, z, 0);
      plane(1853 / 5, 1144 / 5);
      pop();

      texture(img.gobelins)
      v = lerp(v, 600, 0.1);

      push();
      translate(0, v, 2);
      plane(225 / 4, 397 / 4);
      pop();
    }

    if (time > 6.6) {
      texture(img.visualisation)
      x = lerp(x, 50, 0.1);

      push();
      translate(-300, x, 1);
      plane(2321 / 5, 1529 / 5);
      pop();
    }

    if (time > 6.8) {
      texture(img.data)
      y = lerp(y, -150, 0.1);
      push();

      translate(-150, y, 4);
      plane(885 / 5, 762 / 5);
      pop();
    }

    if (time > 12) {
      u = lerp(u, 4000, 0.04);
      v = lerp(v, 4000, 0.04);
      w = lerp(w, 4000, 0.04);
      x = lerp(x, 4000, 0.04);
      y = lerp(y, 4000, 0.04);
      z = lerp(z, 4000, 0.04);
    }

  }

  if (time > 14) {
    //clear()
    texture(0);
    push();
    Bars.forEach(Barre => {
      Barre.drawShape();
      //updateDatas();
    })

    Buttons.forEach(Button => {
      Button.drawShape();
    })

    Gifs.forEach(Gif => {
      Gif.drawShape();
    })
    /*console.log(mouseX, mouseY, Button.screenPosition.x, Button.screenPosition.y )
    if((mouseX >= Button.screenPosition.x - 20 && mouseX <= Button.screenPosition.x + 20) &&
       (mouseY >= Button.screenPosition.y - 20 && mouseY <= Button.screenPosition.y + 20)) {
      console.log(Button.title)
      rect(Button.positionX, Button.positionY, Button.positionZ, 50, 50)
    }*/


    pop();
  }


  // test de position souris


}

function placeFakeButtons() {
  console.log("test");
  for (let i = 1; i < 9; i++) {
    fakeButtons[i] = document.getElementById('button' + i);
    console.log(fakeButtons, i)
    fakeButtons[i].style.top = `${95 + -(4 * i)}%`;
    fakeButtons[i].style.left = `${43 + (4 * i)}%`;


    fakeButtons[i].addEventListener('click', function () {
      console.log(i);
      switch (i) {
        case 1:
          currentTheme = 'Ecologie'
          nickNameTheme = "eco"
          changeGif()
          break;
        case 2:
          currentTheme = 'Aviation'
          nickNameTheme = "avi"
          changeGif();
          break;
        case 3:
          currentTheme = 'Enfance'
          nickNameTheme = "enf"
          changeGif();
          break;
        case 4:
          currentTheme = 'Eau'
          nickNameTheme = "eau"
          changeGif();
          break;
        case 5:
          currentTheme = 'Amour'
          nickNameTheme = "amo"
          changeGif();
          break;
        case 6:
          currentTheme = 'Feminisme'
          nickNameTheme = "fem"
          changeGif();
          break;
        case 7:
          currentTheme = 'Pacifisme'
          nickNameTheme = "pac"
          changeGif();
          break;
        case 8:
          currentTheme = 'Zonegrise'
          nickNameTheme = "zon"
          changeGif();
          break;
        default:
          // Default stuff
          break;
      }
      console.log(currentTheme);
      console.log(i);

      updateDatas();
      pressedButton(i)
      //updateDatas();
      return false; // prevent any default behavior
    });
  }

  function pressedButton(i) {
    console.log(i);
    // Parcourir buttons et set toutes les hauteur à 10
    Buttons.forEach(button => {
      button.hauteurTarget = 3;
    })
    oldIndex = Buttons[i - 1];
    newHeight = Buttons[i - 1];
    console.log(newHeight.hauteurTarget);
    newHeight.hauteurTarget = 1.5;
    console.log(newHeight.positionZ)
    //newHeight.positionZ = 7.5;
    console.log(newHeight.hauteurTarget);
  }

  function changeGif() {
    for (let i = 1; i < 4; i++) {
      console.log(`${nickNameTheme}${i}`)
      Gifs.push(new Gif(3, 25, 150, 150, 150, `${nickNameTheme}${i}`, i));
    }
  }

}
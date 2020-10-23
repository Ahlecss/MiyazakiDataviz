class Bar {
    constructor(hauteur, largeur, positionX, positionY, positionZ, percentage, theme, title) {
      this.hauteur = hauteur;
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
      push();
      translate(this.positionX, this.positionY, this.positionZ);
  
      push();
      rotateY(PI / 4);
  
      beginShape();
      fill(205, 128)
      vertex(0, 0);
      vertex(this.largeur, 0);
      vertex(this.largeur, -this.hauteur);
      vertex(0, -this.hauteur);
      endShape(CLOSE);
      pop();
  
      push();
      rotateY(-PI / 4);
  
      beginShape();
      fill(255, 128)
      vertex(0, 0);
      vertex(-this.largeur, 0);
      vertex(-this.largeur, -this.hauteur);
      vertex(0, -this.hauteur);
      endShape(CLOSE);
      pop();
  
      push();
      rotateY(PI / 4);
  
      beginShape();
      fill(235, 128)
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
      textAlign(CENTER);
      textFont(MontserratRegular);
      rotateY(PI / 4);
      rotateX(PI / 2);
      text(this.theme, 0, 0);
      pop();
  
  
      pop();
      // Draw title
  
  
      push();
      translate(0, 0, 0)
      textAlign(CENTER);
      textFont(MontserratRegular);
      rotateY(PI / 4);
      rotateX(PI / 2);
      text(this.title, 0, 0);
      pop();
  
      pop();
    }
  
  }
  
  class Button {
    constructor(hauteur, largeur, positionX, positionY, positionZ, title) {
      this.hauteur = hauteur;
      this.largeur = largeur;
      this.positionX = positionX;
      this.positionY = positionY;
      this.positionZ = positionZ;
      this.title = title;
    }
  
    drawShape() {
      push();
      translate(this.positionX - 200, this.positionY, this.positionZ);
  
      cylinder(20, this.hauteur, 16, 10, 0, 0);
      pop();
  
  
  
      push();
      translate(this.positionX, this.positionY, this.positionZ);
      textAlign(CENTER);
      textFont(MontserratRegular);
      rotateY(-PI / 4);
      rotateX(PI / 2);
      text(this.title, 0, 0);
      pop();
    }
  
  }
  
  let img = [];
  let time = 0
  let rayon;
  let angle;
  let hauteur;
  let largeur;
  let Bars = [];
  let Buttons = [];
  let fakeButPos=[];
  let fakeButtons = [];
  let data = [];
  let percentage = [];
  let allThemes = ['Ecologie', 'Aviation', 'Enfance', 'Eau', 'Amour', 'Féminisme', 'Pacifisme', 'Zone Grise',]
  let currentTheme = '';
  let globalMovies = [];
  
  //let MontserratThin;
  let MontserratRegular;
  //let MontserratSemiBold;
  
  function preload() {
    //MontserratThin = loadFont('../assets/Montserrat/Montserrat-Thin.ttf');
    MontserratRegular = loadFont('../assets/Montserrat/Montserrat-Regular.ttf');
    //MontserratSemiBold = loadFont('../assets/Montserrat/Montserrat-SemiBold.ttf');
    loadJSON('../assets/data.json', formatDatas);
  }
  
  function formatDatas(movies) {
    globalMovies = movies
    let idx = 0;
    Bars = movies.map(movie => {
      console.log(movie)
      idx++
      return new Bar(movie.Pacifisme * 5, 100, 150 * idx, 100, 100 * -idx, 10, movie.Pacifisme, movie.Title);
    })
  
    console.log(Bars);
  }
  
  function updateDatas() {
    Bars.forEach(Barre => {
  
      globalMovies.forEach( movie => {
      Barre.hauteur = movie[currentTheme];
      Barre.theme = movie[currentTheme];
  })
  });
  }
  
  
  function setup() {
    createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    addScreenPositionFunction();
    img.Hayao = loadImage('../assets/svg/Hayao.png');
    img.Miyazaki = loadImage('../assets/svg/Miyazaki.svg');
    img.du = loadImage('../assets/svg/du.svg');
    img.Studio = loadImage('../assets/svg/Studio.svg');
    img.Ghibli = loadImage('../assets/svg/Ghibli.svg');
    img.Hayao = loadImage('../assets/svg/Hayao.svg');
    img.data = loadImage('../assets/svg/data.svg');
    img.visualisation = loadImage('../assets/svg/visualisation.svg');
    img.consignes = loadImage('../assets/svg/consignes.svg');
    img.subjective = loadImage('../assets/svg/subjective.svg');
  
    console.log(img);
    
    // Pour les déplacer, x et z doivent être semblables mais inversées
    for (let i = 0; i < 8; i++) {
      console.log(i)
      console.log(allThemes[i])
      let x = 125 * (i +1);
      let y = 400;
      let z = 125 * -(i +1);
      var position = screenPosition(x, y, z);
      Buttons.push(new Button(25, 75, x, y, z, allThemes[i]));
      console.log("screenpos: " +position);
      fakeButPos.push(position);
    }
    console.log(Buttons)
  
  placeFakeButtons()
    
    /* 
    globalMovies.forEach( (movie, i) => {
      console.log(movie)
      console.log(i)
      Buttons.push(new Button(25, 75, 125 * (i +1), 400, 125 * -(i +1), movie.Title));
    })
    console.log(Buttons)
    */
   
   background(0);
   rayon = 50;
   angle = PI / 6;
   hauteur = 50;
   largeur = 50;
   fill('#ffffff');
   textFont(MontserratRegular);
   textSize(36);
  }
  let p = 1000;
  function draw() {
  
    background('#FFA4A4');
    noStroke();
    ortho();
    //ambientLight(200);
    //directionalLight(50, 50, 50, 0, 0, 0);
    rotateX(-PI / 6)
  
    time += 0.02;
    //console.log(time);
    // rotateY(PI/ 4)
  
    if(time > 1) {
    p  = lerp(p, -400, 0.1);
    //console.log("p: " + p);
    image(img.Hayao, p, -500);
  
    image(img.Miyazaki, -500, -300);
    image(img.du, -100, -100);
    image(img.Studio, 100, -500);
    image(img.Ghibli, 100, -300);
  }
  
  if(time > 3) {
    clear()
    image(img.data, -300, -500);
    image(img.visualisation, -100, -500);
    image(img.subjective, 100, -500);
    image(img.consignes, 100, -300);
    
    }
    
    push();
  
    if(time > 5) {
    clear()
    Bars.forEach(Barre => {
      Barre.drawShape();
      //updateDatas();
    })
  
    Buttons.forEach(Button => {
      Button.drawShape();
      /*console.log(mouseX, mouseY, Button.screenPosition.x, Button.screenPosition.y )
      if((mouseX >= Button.screenPosition.x - 20 && mouseX <= Button.screenPosition.x + 20) &&
         (mouseY >= Button.screenPosition.y - 20 && mouseY <= Button.screenPosition.y + 20)) {
        console.log(Button.title)
        rect(Button.positionX, Button.positionY, Button.positionZ, 50, 50)
      }*/
  
    })
  }
  
  
    // test de position souris
  
  
    pop();
  }
  
  function placeFakeButtons() {
    for (let i = 0; i < 8; i++) {
      fakeButtons[i] = document.getElementById('button' + (i+1));
      console.log("fake but pos : " + i + " " + fakeButPos[i].x)
      fakeButtons[i].style.top = `${fakeButPos[i].y * canvas.width/canvas.height}px`;
      fakeButtons[i].style.left = `${fakeButPos[i].x * canvas.width/canvas.height}px`;
  
  
  
      fakeButtons[i].addEventListener('click', function () {
        switch (i) {
          case 1:
            currentTheme = 'Pacifisme'
            break;
          case 2:
            currentTheme = 'Feminisme'
            break;
          case 3:
            currentTheme = 'Pacifisme'
            break;
          case 4:
            currentTheme = 'Pacifisme'
            break;
          case 5:
            currentTheme = 'Pacifisme'
            break;
          case 6:
            currentTheme = 'Pacifisme'
            break;
          case 7:
            currentTheme = 'Pacifisme'
            break;
          case 8:
            currentTheme = 'Pacifisme'
            break;
          default:
            // Default stuff
            break;
        }
        console.log(currentTheme);
  
          updateDatas(Bars, i)
          //updateDatas();
        return false; // prevent any default behavior
      });
    }
  }
  
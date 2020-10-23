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
  let fakeButtons = [];
  let data = [];
  let percentage = [];
  let allThemes = ['Ecologie', 'Aviation', 'Enfance', 'Eau', 'Amour', 'Féminisme', 'Pacifisme', 'Zone Grise',]
  let currentTheme = '';
  let globalMovies = [];
  let backgroundImg;
  //let MontserratThin;
  let MontserratRegular;
  //let MontserratSemiBold;
  
  function preload() {
    backgroundImg = loadImage('../assets/svg/background.png'); 
    img.Hayao = loadImage('../assets/svg/Hayao.png');
    img.Miyazaki = loadImage('../assets/svg/Miyazaki.png');
    img.Studio = loadImage('../assets/svg/Studio.png');
    img.Ghibli = loadImage('../assets/svg/Ghibli.png');
    img.Hayao = loadImage('../assets/svg/Hayao.svg');
    img.data = loadImage('../assets/svg/data.png');
    img.visualisation = loadImage('../assets/svg/visualisation.png');
    img.consignes = loadImage('../assets/svg/consignes.png');
    img.copyright = loadImage('../assets/svg/copyright.png');
    img.subjective = loadImage('../assets/svg/subjective.png');
    img.gobelins = loadImage('../assets/svg/gobelins.png');
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
  
      globalMovies.forEach(movie => {
        Barre.hauteur = movie[currentTheme];
        Barre.theme = movie[currentTheme];
      })
    });
  }
  
  
  function setup() {
    createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  
  
  
  
    // Pour les déplacer, x et z doivent être semblables mais inversées
    for (let i = 0; i < 7; i++) {
      console.log(i)
      console.log(allThemes[i])
      Buttons.push(new Button(25, 75, 125 * (i + 1), 400, 125 * -(i + 1), allThemes[i]));
    }
    console.log(Buttons)
  
    /* 
    globalMovies.forEach( (movie, i) => {
      console.log(movie)
      console.log(i)
      Buttons.push(new Button(25, 75, 125 * (i +1), 400, 125 * -(i +1), movie.Title));
    })
    console.log(Buttons)
    */
    backgroundImg.resize(canvas.width, canvas.height);
  
    rayon = 50;
    angle = PI / 6;
    hauteur = 50;
    largeur = 50;
    fill('#ffffff');
    textFont(MontserratRegular);
    textSize(36);
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
  
  function draw() {
    console.log(typeof backgroundImg)
    push();
    translate(0,0,-1000);
    image(backgroundImg, -canvas.width/2, -canvas.height/2);
    pop();
    noStroke();
    ortho();
    //ambientLight(200);
    //directionalLight(50, 50, 50, 0, 0, 0);
    rotateX(-PI / 6)
  
    time += 0.02;
    //console.log(time);
    // rotateY(PI/ 4)
  
    if (time > 1) {
      if (time > 1.1) {
        texture(img.Hayao)
        p = lerp(p, -150, 0.1);
        console.log("p: " + p);
  
        push();
        translate(-200,p,0);
        plane(300,300);
        pop();
      }
      if (time > 1.5) {
        texture(img.Miyazaki)
        q = lerp(q, 0, 0.1);
  
        push();
        translate(-200,q,1);
        plane(300,300);
        pop();
      }
      if (time > 2) {
        texture(img.Studio)
        s = lerp(s, -200, 0.1);
  
        push();
        translate(200,s,2);
        plane(300,300);
        pop();
        
      }
      if (time > 2) {
        texture(img.Ghibli)
        t = lerp(t, 0, 0.1);
  
        push();
        translate(200,t,3);
        plane(300,300);
        pop();
      }
  
      if(time > 4.5) {
        p = lerp(p, 3500, 0.05);
        q = lerp(q, 3500, 0.05);
        r = lerp(r, 3500, 0.1);
        s = lerp(s, 3500, 0.1);
        t = lerp(t, 3500, 0.1);
      }
  
    }
  
    if (time > 6) {
      //clear()
  
      if (time > 6.2) {
        texture(img.consignes)
        u = lerp(u, 0, 0.1);
  
        push();
        translate(200,u,4);
        plane(2021/5, 1472/5);
        pop();
      }
      if(time > 6.3) {
        texture(img.copyright)
        w = lerp(w, 150, 0.1);
  
        push();
        translate(200,w,5);
        plane(1984/5, 1223/5);
        pop();
      }
      if (time > 6.4) {
        texture(img.subjective) 
        z = lerp(z, 150, 0.1);
  
        push();
        translate(-200,z,0);
        plane(1853/5, 1144/5);
        pop();
  
        texture(img.gobelins)
        v = lerp(v, 600, 0.1);
  
        push();
        translate(0,v,2);
        plane(225 /3,397/3);
        pop();
      }
  
      if (time > 6.6) {
        texture(img.visualisation)
        x = lerp(x, -0, 0.1);
        console.log("p: " + x);
  
        push();
        translate(-200,x,1);
        plane(2321/5, 1529/5);
        pop();
      }
  
      if (time > 6.8) {
        texture(img.data)
        y = lerp(y, -150, 0.1);
        console.log("p: " + y);
  
        push();
        translate(-200,y,4);
        plane(885/3, 762/3);
        pop();
      }
  
      if(time > 10) {
        u = lerp(u, 2500, 0.1);
        v = lerp(v, 3500, 0.1);
        w = lerp(w, 2500, 0.1);
        x = lerp(x, 2500, 0.1);
        y = lerp(y, 2500, 0.1);
        z = lerp(z, 2500, 0.1);
      }
  
    }
  
    if (time > 12) {
      //clear()
      push();
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
      pop();
    }
  
  
    // test de position souris
  
  
  }
  
  function placeFakeButtons() {
    for (let i = 1; i < 9; i++) {
      fakeButtons[i] = document.getElementById('button' + i);
      console.log(fakeButtons, i)
      fakeButtons[i].style.top = `${72 + -(4 * i)}%`;
      fakeButtons[i].style.left = `${43 + (4 * i)}%`;
  
  
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
  
  placeFakeButtons()

export default class Bar {
  constructor(hauteur, largeur, positionX, positionY, positionZ, drawShape) {
    this.hauteur = hauteur;
    this.largeur = largeur;
    this.positionX = positionX;
    this.positionY = positionY;
    this.positionZ = positionZ;
    this.gravity = gravity;
    this.environment = environment;
    this.enfancy = enfancy;
    this.water = water;
    this.greyzone = greyzone;
    this.love = love;
    //this.drawShape = drawShape();
  }

  drawShape(hauteur, largeur, positionX, positionY, positionZ) {

    push();
    translate(positionX, positionY, positionZ);

    push();
    rotateY(PI / 4);

    beginShape();
    fill(205, 128)
    vertex(0, 0);
    vertex(largeur, 0);
    vertex(largeur, -hauteur);
    vertex(0, -hauteur);
    endShape(CLOSE);
    pop();

    push();
    rotateY(-PI / 4);

    beginShape();
    fill(255, 128)
    vertex(0, 0);
    vertex(-largeur, 0);
    vertex(-largeur, -hauteur);
    vertex(0, -hauteur);
    endShape(CLOSE);
    pop();

    push();
    rotateY(PI / 4);

    beginShape();
    fill(235, 128)
    vertex(0, -hauteur);
    vertex(largeur, -hauteur);
    vertex(largeur, -hauteur, -largeur);
    vertex(0, -hauteur, -largeur);
    endShape(CLOSE);
    pop();

    pop();
    pop();
  }

  writeTitle(title, hauteur){
    push();
    translate(10, -hauteur * 1.15)
    push();
    textAlign(CENTER);
    textFont(MontserratSemiBold);
    rotateY(PI / 4);
    rotateX(PI / 2);
    text(title, 0, 0);
    pop();
    pop();
  }
}
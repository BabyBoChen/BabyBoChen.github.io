var kingOfSpades = new Card("assets/images/kingOfSpades.png",13,"spade");
kingOfHearts.setPos(0,0);
kingOfSpades.setSpeed(10);
kingOfSpades.setAngular(-10);
layers.push(kingOfSpades);

var kingOfHearts = new Card("assets/images/kingOfHearts.png",13,"heart");
kingOfHearts.setPos(500,0);
kingOfHearts.setSpeed(10);
kingOfHearts.setAngular(20);
layers.push(kingOfHearts);

var kingOfDiamonds = new Card("assets/images/kingOfDiamonds.png",13,"diamond");
kingOfDiamonds.setPos(0,500);
kingOfDiamonds.setSpeed(5);
kingOfDiamonds.setAngular(-20);
layers.push(kingOfDiamonds);

var kingOfClubs = new Card("assets/images/kingOfClubs.png",13,"club");
kingOfClubs.setPos(500,500);
kingOfClubs.setSpeed(5);
kingOfClubs.setAngular(10);
layers.push(kingOfClubs);
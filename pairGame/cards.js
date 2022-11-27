class Card extends Image{

    constructor(card,rank,suit){
        super();
        this.card = card;
        this.back = "assets/images/back.png";
        this.src = this.back;
        this.rank = rank;
        this.suit = suit;
        this.addEventListener("load",function(){
            var a = (this.naturalWidth/2);
            var b = (this.naturalHeight/2);
            this.radius = Math.sqrt(a * a + b * b);
            var c = this.radius;
            this.centerTheta = (Math.acos((c * c + a * a - b * b)/(2*c*a)) / Math.PI)*180;
        });
        if (this.suit == "spade" || this.suit  == "club"){
            this.color = "black";
        }else if (this.suit == "heart" || this.suit == "diamond"){
            this.color = "red";
        }
        this.centerX = 60;
        this.centerY = 60;
        this.xA;
        this.yA;
        this.xB;
        this.yB;
        this.xC;
        this.yC;
        this.xD;
        this.yD;
        this.intXA;
        this.intYA;
        this.intXB;
        this.intYB;
        this.intXC;
        this.intYC;
        this.intXD;
        this.intYD;
        this.drawAssistLine = false;
        this.opacity = 1;
        this.clickable = true;
        this.revealed = false;
        this.destroying = false;
        this.vectorX = 0;
        this.vectorY = 0;
        this.angle = 0;
        this.angular = 0;
    }

    setPos(x,y){
        this.centerX = x;
        this.centerY = y;
    }

    setSpeed(speed){
        if (speed >= 10){
            speed = 10;
        }else if (speed <= 0){
            speed = 0;
        }
        this.vectorX = speed;
        this.vectorY = speed;
    }

    setAngular(theta){
        if (theta > 30){
            theta = 30;
        }else if (theta < -30){
            theta = -30;
        }
        this.angular = theta;
    }

    update(){
        this.rotate(this.angular);
        this.bouncing();
        ctx.translate(this.centerX,this.centerY);
        ctx.rotate(this.angle / 180 * Math.PI);
        ctx.translate(-this.naturalWidth/2,-this.naturalHeight/2);
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(this,0,0);
        ctx.globalAlpha = 1;
        ctx.translate(this.naturalWidth/2,this.naturalHeight/2);
        ctx.rotate(-this.angle / 180 * Math.PI);
        ctx.translate(-this.centerX,-this.centerY);
        if (this.angle >= 0){
            var invAngle = this.angle;
        }else{
            var invAngle = 360 + this.angle;
        }
        this.xA = this.centerX + (this.radius * Math.cos((invAngle - 180 + this.centerTheta) / 180 * Math.PI));
        this.yA = this.centerY + (this.radius * Math.sin((invAngle - 180 + this.centerTheta) / 180 * Math.PI));
        this.xB = this.centerX + (this.radius * Math.cos((invAngle - 180 - this.centerTheta) / 180 * Math.PI));
        this.yB = this.centerY + (this.radius * Math.sin((invAngle - 180 - this.centerTheta) / 180 * Math.PI));
        this.xC = this.centerX + (this.radius * Math.cos((invAngle + this.centerTheta) / 180 * Math.PI));
        this.yC = this.centerY + (this.radius * Math.sin((invAngle + this.centerTheta) / 180 * Math.PI));
        this.xD = this.centerX + (this.radius * Math.cos((invAngle - this.centerTheta) / 180 * Math.PI));
        this.yD = this.centerY + (this.radius * Math.sin((invAngle - this.centerTheta) / 180 * Math.PI));
        this.intXA = Number.parseInt(Number.parseFloat(this.xA).toFixed(0));
        this.intYA = Number.parseInt(Number.parseFloat(this.yA).toFixed(0));
        var pointA = `A(${this.intXA},${this.intYA})`;
        this.intXB = Number.parseInt(Number.parseFloat(this.xB).toFixed(0));
        this.intYB = Number.parseInt(Number.parseFloat(this.yB).toFixed(0));
        var pointB = `B(${this.intXB},${this.intYB})`;
        this.intXC = Number.parseInt(Number.parseFloat(this.xC).toFixed(0));
        this.intYC = Number.parseInt(Number.parseFloat(this.yC).toFixed(0));
        var pointC = `C(${this.intXC},${this.intYC})`;
        this.intXD = Number.parseInt(Number.parseFloat(this.xD).toFixed(0));
        this.intYD = Number.parseInt(Number.parseFloat(this.yD).toFixed(0));
        var pointD = `D(${this.intXD},${this.intYD})`;
        if (this.drawAssistLine){
            ctx.font = 'bold 18px serif';
            ctx.fillText(pointA,this.intXA,this.intYA);
            ctx.fillText(pointB,this.intXB,this.intYB);
            ctx.fillText(pointC,this.intXC,this.intYC);
            ctx.fillText(pointD,this.intXD,this.intYD);
            ctx.beginPath();
            ctx.moveTo(this.xA,this.yA);
            ctx.lineTo(this.xB,this.yB);
            ctx.lineTo(this.xC,this.yC);
            ctx.lineTo(this.xD,this.yD);
            ctx.lineTo(this.xA,this.yA);
            ctx.stroke();
        }
    }

    rotate(angular){
        if (Math.abs(this.angle + angular) >= 360){
            this.angle = 0;
        }
        this.angle += angular;
    }

    bouncing(){
        var closeToRight = (this.centerX + this.radius >= window.innerWidth);
        var closeToLeft = (this.centerX - this.radius <= 0);
        var closeToBottom = (this.centerY + this.radius >= window.innerHeight);
        var closeToTop = (this.centerY - this.radius <= 0);
        var xs = [this.xA,this.xB,this.xC,this.xD];
        if (closeToRight){
            for (var i = 0; i < xs.length; i++){
                if (xs[i] + this.vectorX > window.innerWidth){
                    this.vectorX = Math.abs(this.vectorX) * (-1);
                    break;
                }
            }
        }else if (closeToLeft){
            for (var i = 0; i < xs.length; i++){
                if (xs[i] - Math.abs(this.vectorX) < 0){
                    this.vectorX = Math.abs(this.vectorX);
                    break;
                }
            }
        }
        this.centerX += this.vectorX;

        var ys = [this.yA,this.yB,this.yC,this.yD];
        if (closeToBottom){
            for (var i = 0; i < ys.length; i++){
                if (ys[i] + this.vectorY > window.innerHeight){
                    this.vectorY = Math.abs(this.vectorY) * (-1);
                    break;
                }
            }
        }else if (closeToTop){
            for (var i = 0; i < ys.length; i++){
                if (ys[i] - Math.abs(this.vectorY) < 0){
                    this.vectorY = Math.abs(this.vectorY);
                    break;
                }
            }
        }
        this.centerY += this.vectorY;
    }

    /** @param {boolean} bool*/
    assistLine(bool){
        this.drawAssistLine = bool;
    }

    /** @param {MouseEvent} e*/
    formulaAB(e){
        if (this.angle >= 0){
            var invAngle = this.angle;
        }else{
            var invAngle = 360 + this.angle;
        }
        if (invAngle >= 360){
            invAngle -= 360;
        }
        if (this.intXA != this.intXB){
            var a = (this.intYB - this.intYA) / (this.intXB - this.intXA);
            var b = (this.intXB * this.intYA - this.intXA * this.intYB) / (this.intXB - this.intXA);
            if (invAngle >= 0 && invAngle < 180){
                return (a * e.offsetX + b <= e.offsetY);
            }else if (invAngle > 180 && invAngle < 360){
                return (a * e.offsetX + b >= e.offsetY);
            }
        }else{
            if (invAngle >= 0 && invAngle < 180){
                return (e.offsetX >= this.intXA);
            }else if (invAngle >= 180 && invAngle < 360){
                return (e.offsetX <= this.intXA);
            }
        }
    }

    /** @param {MouseEvent} e*/
    formulaBC(e){
        if (this.angle >= 0){
            var invAngle = this.angle;
        }else{
            var invAngle = 360 + this.angle;
        }
        if (invAngle >= 360){
            invAngle -= 360;
        }
        if (this.intXB != this.intXC){
            var a = (this.intYC - this.intYB) / (this.intXC - this.intXB);
            var b = (this.intXC * this.intYB - this.intXB * this.intYC) / (this.intXC - this.intXB);
            if (invAngle >= 0 && invAngle < 90){
                return (a * e.offsetX + b >= e.offsetY);
            }else if (invAngle > 90 && invAngle < 270){
                return (a * e.offsetX + b <= e.offsetY);
            }else if (invAngle > 270 && invAngle < 360){
                return (a * e.offsetX + b >= e.offsetY);
            }
        }else{
            if (invAngle >= 0 && invAngle < 180){
                return (e.offsetX >= this.intXB);
            }else if (invAngle >= 180 && invAngle < 360){
                return (e.offsetX <= this.intXB);
            } 
        }
    }

    /** @param {MouseEvent} e*/
    formulaCD(e){
        if (this.angle >= 0){
            var invAngle = this.angle;
        }else{
            var invAngle = 360 + this.angle;
        }
        if (invAngle >= 360){
            invAngle -= 360;
        }
        if (this.intXC != this.intXD){
            var a = (this.intYD - this.intYC) / (this.intXD - this.intXC);
            var b = (this.intXD * this.intYC - this.intXC * this.intYD) / (this.intXD - this.intXC);
            if (invAngle >= 0 && invAngle < 180){
                return (a * e.offsetX + b >= e.offsetY);
            }else if (invAngle > 180 && invAngle < 360){
                return (a * e.offsetX + b <= e.offsetY);
            }
        }else{
            if (invAngle >= 0 && invAngle < 180){
                return (e.offsetX >= this.intXC);
            }else if (invAngle >= 180 && invAngle < 360){
                return (e.offsetX <= this.intXC);
            }
        }
    }

    /** @param {MouseEvent} e*/
    formulaDA(e){
        if (this.angle >= 0){
            var invAngle = this.angle;
        }else{
            var invAngle = 360 + this.angle;
        }
        if (invAngle >= 360){
            invAngle -= 360;
        }
        if (this.intXD != this.intXA){
            var a = (this.intYA - this.intYD) / (this.intXA - this.intXD);
            var b = (this.intXA * this.intYD - this.intXD * this.intYA) / (this.intXA - this.intXD);
            if (invAngle >= 0 && invAngle < 90){
                return (a * e.offsetX + b <= e.offsetY);
            }else if (invAngle > 90 && invAngle < 270){
                return (a * e.offsetX + b >= e.offsetY);
            }else if (invAngle > 270 && invAngle < 360){
                return (a * e.offsetX + b <= e.offsetY);
            }
        }else{
            if (invAngle >= 0 && invAngle < 180){
                return (e.offsetX <= this.intXD);
            }else if (invAngle >= 180 && invAngle < 360){
                return (e.offsetX >= this.intXD);
            } 
        }
    }
    
    /** @param {MouseEvent} e*/
    isClicked(e){
        var ab = this.formulaAB(e);
        var bc = this.formulaBC(e);
        var cd = this.formulaCD(e);
        var da = this.formulaDA(e);
        if (ab && bc && cd && da){
            return true;
        }else{
            return false;
        }
    }

    flip(){
        this.revealed = !(this.revealed);
        if (this.revealed == true){
            this.src = this.card;
        }else{
            this.src = this.back;
        }
    }

    isRevealed(){
        return this.revealed;
    }

    isClickable(){
        return this.clickable;
    }

    matched(){
        var that = this;
        this.clickable = false;
        this.opacity = 0.75;
        setTimeout(function(){
            that.destroying = true;
        },1000);
    }

}

function spawnCards(){

    var kingOfSpades = new Card("assets/images/kingOfSpades.png",13,"spade");
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

    var aceOfSpades = new Card("assets/images/aceOfSpades.png",1,"spade");
    aceOfSpades.setPos(250,0);
    aceOfSpades.setSpeed(10);
    aceOfSpades.setAngular(-10);
    layers.push(aceOfSpades);

    var aceOfHearts = new Card("assets/images/aceOfHearts.png",1,"heart");
    aceOfHearts.setPos(750,0);
    aceOfHearts.setSpeed(10);
    aceOfHearts.setAngular(10);
    layers.push(aceOfHearts);

    var aceOfDiamonds = new Card("assets/images/aceOfDiamonds.png",1,"diamond");
    aceOfDiamonds.setPos(250,250);
    aceOfDiamonds.setSpeed(5);
    aceOfDiamonds.setAngular(-20);
    layers.push(aceOfDiamonds);

    var aceOfClubs = new Card("assets/images/aceOfClubs.png",1,"club");
    aceOfClubs.setPos(750,250);
    aceOfClubs.setSpeed(5);
    aceOfClubs.setAngular(10);
    layers.push(aceOfClubs);
}


{
    /**@type {HTMLCanvasElement} */
    var viewport = document.getElementById("viewport");
    


    window.addEventListener("load", function (e) {
        viewport.style.width = window.innerwidth + "px";
        viewport.style.height = window.innerHeight + "px";
    });
    window.addEventListener("resize", function (e) {
        viewport.style.width = window.innerwidth + "px";
        viewport.style.height = window.innerHeight + "px";
    });

    class Football extends Image {
        constructor() {

            super();
            this.src = "./Images/footballCompressed.png";
            this.angle = 0;
            this.angularDirection = 1;
            this.X = 0;
            this.Y = 0;
            this.xDirecttion = 1;
            this.yDirecttion = 1;
            this.step2 = 5;
        }

        move(step) {
            if ((this.X + this.naturalWidth + step * this.xDirecttion) > viewport.offsetWidth) {
                this.xDirecttion = -Math.abs(this.xDirecttion);
            }
            else if ((this.X + step * this.xDirecttion) < 0) {
                this.xDirecttion = Math.abs(this.xDirecttion);
            }
            this.X += this.xDirecttion * step;
            if ((this.Y + this.naturalHeight + step * this.yDirecttion) > viewport.offsetHeight) {
                this.yDirecttion = -Math.abs(this.yDirecttion);
            }
            else if ((this.Y + step * this.yDirecttion) < window.pageYOffset) {
                this.yDirecttion = Math.abs(this.yDirecttion);
            }
            this.Y += this.yDirecttion * step;
        }

        rotate(degree) {

            this.angle += degree * this.angularDirection * (Math.PI / 180);
            if (this.angle >= Math.PI * 2) {

                this.angle -= Math.PI * 2;
            }
            if (this.angle <= -Math.PI * 2) {

                this.angle += Math.PI * 2;
            }
        }

        collision_detection(football) {

            var distanceX = this.X - football.X;
            var distanceY = this.Y - football.Y;

            if ((distanceX * distanceX + distanceY * distanceY) <= this.naturalWidth * this.naturalHeight) {
                this.xDirecttion = this.xDirecttion * (-1);
                this.yDirecttion = this.yDirecttion * (-1);
            }

        }
    }



    /** @type {CanvasRenderingContext2D} */
    var ctx = viewport.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'low';

    var footballs = [];

    var football1 = new Football();
    football1.angularDirection = 2;
    footballs.push(football1);
    var football2 = new Football();
    football2.X = viewport.offsetWidth - football2.naturalWidth;
    football2.xDirecttion = 2;
    football2.yDirecttion = 2;
    football2.angularDirection = -1;
    footballs.push(football2);

    var mainloop = setInterval(function (e) {
        ctx.canvas.width = viewport.offsetWidth;
        ctx.canvas.height = viewport.offsetHeight;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        footballs.forEach(football => {
            football.move(5);
            football.rotate(5);
            ctx.translate(football.X + football.naturalWidth / 2, football.Y + football.naturalHeight / 2);
            ctx.rotate(football.angle);
            ctx.translate(-(football.X + football.naturalWidth / 2), -(football.Y + football.naturalHeight / 2));
            ctx.drawImage(football, football.X, football.Y, football.naturalWidth, football.naturalHeight);
            ctx.setTransform(1, 0, 0, 1, 0, 0);//why???
        });

    }, 1000 / 30);
}
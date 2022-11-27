var revealed = [];
var moves = 0;

function startControl(){

    window.addEventListener("click",control);
}

function endControl(){

    window.removeEventListener("click",control);
}

function control(e){

    for (var i = 0; i < layers.length; i++){
        /** @type {Card} */
        var layer = layers[layers.length-i-1];
        var clickable = layer.isClickable();
        var clicked = layer.isClicked(e);
        if (clickable && clicked){
            if (revealed.length == 0){
                revealed.push(layer);
                layer.flip();
                layers.splice(layers.indexOf(layer),1);
                layers.push(layer);
            }else if (revealed.length == 1){
                if (!(layer.isRevealed())){
                    revealed.push(layer);
                    layer.flip();
                    layers.splice(layers.indexOf(layer),1);
                    layers.push(layer);
                }
                if (revealed.length == 2){
                    if (revealed[0].color == revealed[1].color && revealed[0].rank == revealed[1].rank){
                        revealed[0].matched();
                        revealed[1].matched();
                        revealed = [];
                    }
                    moves += 1;
                }
            }else if (revealed.length >= 2){
                if (!(layer.isRevealed())){
                    for (var i = 0; i < revealed.length; i++){
                        if (revealed[i].clickable == true){
                            revealed[i].flip();
                        }
                    }
                    revealed = [];
                    revealed.push(layer);
                    layer.flip();
                    layers.splice(layers.indexOf(layer),1);
                    layers.push(layer);
                }else{
                    for (var i = 0; i < revealed.length; i++){
                        if (revealed[i].clickable == true){
                            revealed[i].flip();
                        }
                    }
                    revealed = [];
                }
            }
            break;
        }
    }
}
const express = require("express");
const app = express();
const port = 5500;

for(let i = 0; i < process.argv.length; i++){
    if(i >= 2){
        let src = process.argv[i].replace("\"","").replace("'","");
        app.use(express.static(src));
        console.log(`adding to context root: ${src}`);
    }
}

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});

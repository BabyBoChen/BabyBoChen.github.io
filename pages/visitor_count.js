/** @type {String} */
export let visitorCount =`
    <h1 style="text-align:center;">訪客人數</h1>
    <br/>
    <div style="text-align:center;width:100%;">
        <div class="row">
            <div class="col-6" style="text-align:right;">
                <img src="https://i.imgur.com/OsiVCmE.png"/>
            </div>
            <div class="col-6" style="text-align:left;display:flex;flex-direction:column;justify-content:center;">
                <p style="margin-bottom:0px;">伯夷作品集</p>
                <p style="margin-bottom:0px;">訪客人次：<span id="spanVisitorCt">0</span></p>
            </div>
        </div>
    </div>
    <br/>
    <div class="row">
        <div class="col-sm-6">
            <h2>簡介：</h2>
            <p>使用Dart程式語言以及shelf_io套件撰寫的web api。該api將每一次連到「伯夷作品集」的用戶端IP位置以及地理資訊寫入到SQLite資料庫中。</p>
            <p>「訪客人數」以容器化的方式，將執行環境包裝成映像檔並上傳至<a href="https://hub.docker.com/" target="_blank">Docker Hub</a>，同時使用Azure的持續部署功能將網站上架到Azure雲端伺服器。</p>
            <p>由於Azure會不定期的重新裝載容器，導致用來記錄訪客資訊的SQLite資料庫會被清空。</p>
        </div>
        <div class="col-sm-6">
            <h2>連結：</h2>
            <ul>
                <li><a href="https://bblj-my-dart.azurewebsites.net/" target="_blank">訪客人數(Azure)</a></li>
                <li><a href="https://github.com/BabyBoChen/visit_counter" target="_blank">GitHub存放庫：visit_counter</a></li>
            </ul>
        </div>
    </div>
`;

//<a href="https://bblj-my-dart.azurewebsites.net/" target="_blank">訪客人數</a>
/** @type {String} */
export const stockTw = `
    <h1 style="text-align:center;">台股即時通</h1>
    <div style="text-align:center;">
        <img style="width:50%;max-width:360px;border:1px solid black;margin:5px;" src="https://i.imgur.com/nuckGPN.png"/>
        
        <img style="width:50%;max-width:360px;border:1px solid black;margin:5px;" src="https://i.imgur.com/44jzHup.png"/>
    </div>
    <div class="row">
        <div class="col-sm-6">
            <h2>簡介：</h2>
            <p>「台股即時通」整理了台灣股市中的「半導體業」和「資訊服務業」近一季的股價走勢。股票交易資料抓取自<a href="https://www.twse.com.tw/zh/" target="_blank">臺灣證卷交易所</a>，並儲存在網站的SQLite資料庫中。</p>
            <p>「台股即時通」採用Flask模組做為網站的後端架構，使用SQLAlchemy模組做為資料庫存取介面，搭配Bootstrap以及Chart.js來製作頁面的排版與圖表。網站已上架至Python Anywhere的Web平台。</p>
        </div>
        <div class="col-sm-6">
            <h2>連結：</h2>
            <ul>
                <li><a href="https://babybochen.pythonanywhere.com/" target="_blank">台股即時通(Python Anywhere)</a></li>
                <li><a href="https://github.com/BabyBoChen/stock_tw" target="_blank">GitHub存放庫：stock_tw</a></li>
            </ul>
        </div>
    </div>
    <div class="row">    
        <div class="col-sm-12">
            
        </div>
    </div>
`;

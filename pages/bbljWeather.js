/** @type {String} */
export const bbljWeather = `
<h1 style="width:100%;text-align:center;">BBLJ氣象台</h1>
<div style="text-align:center;">
    <img style="width:100%;max-width:500px;border:1px solid black" src="https://i.imgur.com/pZFj7q4.png"/>
</div>
<div class="row">
    <div class="col-sm-6">
        <h2>簡介：</h2>
        <p>BBLJ氣象台是一款以Flutter框架開發的Web應用程式，從<a href="https://openweathermap.org/" target="_blank">OpenWeather</a>網站抓取即時天氣資訊，並採用Material Design的設計標準將天氣資訊呈現在頁面中。</p>
        <p>頁面載入前的海報圖片是由BBLJ的前端工程師Jessy親自操刀繪製。</p>
    </div>
    <div class="col-sm-6">
        <h2>連結：</h2>
        <ul>
            <li><a href="https://gentle-mud-045418900.1.azurestaticapps.net/" target="_blank">BBLJ氣象台（Azure）</a></li>
            <li><a href="https://github.com/BabyBoChen/BBLJWeather" target="_blank">GitHub存放庫：BBLJWeather</a></li>
        </ul>
        <p>本站利用Azure的Static Web App服務上架至雲端伺服器，並設定GitHub存放庫進行持續部署。</p>
    </div>
</div>
`;
/** @type {String} */
export const mine = `
    <h1 style="width:100%;text-align:center;">踩地雷</h1>
    <div style="text-align:center;">
        <img style="width:100%;max-width:500px;border:1px solid black" src="https://i.imgur.com/HXrHvI3.png"/>
    </div>
    <div class="row">
        <div class="col-sm-6">
            <h2>簡介：</h2>
            <p>使用.Net Framework C#撰寫的Winform小遊戲——「踩地雷」。遊戲勝利條件為找出所有沒地雷的格子，並連續完成三關。</p>
            <h2>連結：</h2>
            <ul>
                <li><a href="https://github.com/BabyBoChen/Mine" target="_blank">GitHub存放庫：Mine</a></li>
            </ul>
        </div>
        <div class="col-sm-6">
            <h2>遊戲規則：</h2>
            <ul>
                <li>使用Visual Studio 2019執行專案開始遊戲。</li>
                <li>點擊任一空格，由系統計算出是否為地雷以及周邊共有幾個地雷。</li>
                <li>挑出所有非地雷的空格後即可進入下一關。</li>
                <li>本遊戲共有三關，格子數量分別為：10*10、15*15、20*20</li>
                <li>三個關卡的地雷數分別為：10、20、40</li>
                <li>「Auto Sweep」按鈕開啟後會自動延伸周邊沒有地雷的格子。</li>
                <li>「Cheat Mode」按鈕開啟後會顯示出所有地雷。</li>
            </ul>
        </div>
    </div>
`;
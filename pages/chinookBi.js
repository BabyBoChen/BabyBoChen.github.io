/** @type {String} */
export let chinookBi =`
    <h1 style="text-align:center;">Power BI Chinook唱片行</h1>
    <div style="text-align:center;">
        <img style="width:100%;max-width:500px;" src="https://i.imgur.com/53ELYjS.png"/>
    </div>
    <div class="row">
        <div class="col-sm-6">
            <h2>簡介：</h2>
            <p>「Power BI Chinook唱片行」是一組使用Microsoft PowerBI軟體所繪製的數據圖表。Chinook是一個SQLite範例資料庫（<a href="https://www.sqlitetutorial.net/sqlite-sample-database/" target="_blank">SQLite Tutorial</a>），內容是一間唱片行的產品銷售資料。</p>
            <p>Microsoft Power BI相較於其他免費的BI系統（如：Metabase、Apache Superset）而言，其優勢在於圖表元件強大的互動性以及pbix檔自帶的資料倉儲功能。而缺點則在於，PowerBI無法建立免費的私有雲來共享數據圖表，且PowerBI圖表元件本身缺少「TopN and Others」的數據過濾功能，難以讓讀者專注於重要的資料。</p>
            <p>本作品的「Top10歌手排行榜」圖表使用Power BI專用的DAX語法製造出「TopN and Others」的效果，克服了PowerBI一個最大的缺點。該DAX語法請下載pbix檔，參考invoice_items資料表的Top10SalesAmount欄位。</p>
        </div>
        <div class="col-sm-6">
            <h2>連結：</h2>
            <ul>
                <li><a href="https://app.powerbi.com/view?r=eyJrIjoiMDU1OWE3ZmQtOTNkNS00Zjg4LWIyZDctZDY4NGU4OTI1NmE2IiwidCI6IjZkNWY5NGUyLTdkOWUtNDhmZC1hZDFkLTFlYTE5YTA3ZDY4MCIsImMiOjEwfQ%3D%3D" target="_blank">Chinook唱片行（app.powerbi.com）</a></li>
                <li><a href="https://drive.google.com/file/d/1Cexbp99uwBi7QDcOPw_9zTjn92LNFsUx/view?usp=sharing" target="_blank">chinook.pbix（Google Drive）</a></li>
            </ul>
        </div>
    </div>
`;
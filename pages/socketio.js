/** @type {String} */
export const socketio = `
    <h1 style="width:100%;text-align:center;">聊天室</h1>
    <div style="text-align:center;">
        <img style="width:100%;max-width:250px;border:1px solid black" src="https://i.imgur.com/3B1lXyr.png"/>
    </div>
    <div class="row">
        <div class="col-sm-6">
            <h2>簡介：</h2>
            <p>採用Core MVC框架製做的Web即時聊天室。前端UI使用Vue.js撰寫，並使用<a href="https://docs.microsoft.com/zh-tw/aspnet/core/signalr/introduction?view=aspnetcore-5.0" target="_blank"><b>SignalR</b></a>技術來達成前後端的雙向呼叫。為了確保「在線訪客」清單可以具有thread safe的效果，本站使用一個靜態的<a href="https://docs.microsoft.com/zh-tw/dotnet/api/system.collections.concurrent.concurrentdictionary-2?view=net-5.0" target="_blank"><b>ConcurrentDictionary</b></a>物件來管理所有的在線訪客。</p>
            <p>網站已上架至微軟的Azure雲端平台。</p>
        </div>
        <div class="col-sm-6">
            <h2>連結：</h2>
            <ul>
                <li><a href="https://bbljchatroom.azurewebsites.net/" target="_blank">SignalR聊天室（Azure）*</a></li>
                <li><a href="https://github.com/BabyBoChen/SocketIO" target="_blank">GitHub存放庫：SocketIO**</a></li>
            </ul>
            <span>*通關密語：</span>
            <br/>
            <span>**註：原先採用Python Flask的SocketIO模組撰寫，但因為Python Anywhere平台不支援Web Socket以及該平台的高網路延池，故改採用SignalR技術撰寫。</span>
        </div>
    </div>
`;

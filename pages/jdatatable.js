/** @type {String} */
export const jdatatable = `
    <h1 style="text-align:center;">JDataTable</h1>
    <div class="row">
        <h2>使用範例：</h2>
        <div class="code-section col-sm-12" style="margin:auto;height:500px;">
            <code style="color:black;">
                <span><span class="java-cond">import</span> com.bblj.jdatatable.*;</span><br/>
                <br/>
                <span>...(Connecting to Chinook.db)</span><br/>
                <span>Connection <span class="java-var">conn</span> = DriverManager.getConnection(<span class="java-var">connString</span>);</span><br/>
                <span>Statement <span class="java-var">stmt</span> = <span class="java-var">conn</span>.createStatement();</span><br/>
                <span>String <span class="java-var">sql</span> = <span class="java-string">"SELECT * FROM albums"</span>;</span><br/>
                <span>ResultSet <span class="java-var">rs</span> = <span class="java-var">stmt</span>.executeQuery(<span class="java-var">sql</span>);</span><br/>
                <span>DataTable <span class="java-var">dt</span> = DataTable.FromResultSet(<span class="java-var">rs</span>);  <span class="java-comment">// <------- convert ResultSet to DataTable</span></span><br/>
                <span><span class="java-var">rs</span>.close();</span><br/>
                <span><span class="java-var">stmt</span>.close();</span><br/>
                <span><span class="java-var">conn</span>.close();</span><br/>
                <br/>
                <span><span class="java-comment">//Insert new row</span></span><br/>
                <span>DataRow <span class="java-var">newRow</span> = <span class="java-var">dt</span>.NewRow();</span><br/>
                <span><span class="java-var">newRow</span>.SetCellValue(<span class="java-string">"AlbumId"</span>, 999);</span><br/>
                <span><span class="java-var">newRow</span>.SetCellValue(<span class="java-string">"Title"</span>, <span class="java-string"></span>"Test1");</span><br/>
                <span><span class="java-var">newRow</span>.SetCellValue(<span class="java-string">"ArtistId"</span>, 1);</span><br/>
                <span><span class="java-var">dt</span>.getRows().add(0, <span class="java-var">newRow</span>);</span><br/>
                <br/>
                <span><span class="java-comment">//Delete row</span></span><br/>
                <span>DataRow <span class="java-var">toDelete</span> = <span class="java-var">dt</span>.getRows().get(2);</span><br/>
                <span><span class="java-var">toDelete</span>.Delete();</span><br/>
                <br/>
                <span><span class="java-comment">//Update row</span></span><br/>
                <span>DataRow <span class="java-var">toModified</span> = <span class="java-var">dt</span>.getRows().get(1);</span><br/>
                <span><span class="java-var">toModified</span>.SetCellValue(<span class="java-string">"Title"</span>, <span class="java-string">"xxxxxx"</span>);</span><br/>
                <br/>
                <span><span class="java-comment">//Loop through all data cells</span></span><br/>
                <span><span class="java-cond">for</span>(DataRow <span class="java-var">row</span> : <span class="java-var">dt</span>.getRows()) {</span><br/>
                <span class="indent"></span><span><span class="java-cond">for</span>(DataColumn <span class="java-var">col</span> : <span class="java-var">dt</span>.getColumns()) {</span><br/>
                <span class="indent"></span><span class="indent"></span><span>System.out.print(<span class="java-var">row</span>.GetCellValue(<span class="java-var">col</span>.getColumnName()));</span><br/>
                <span class="indent"></span><span class="indent"></span><span>System.out.print(<span class="java-string">"; "</span>);</span><br/>
                <span class="indent"></span><span>}</span><br/>
                <span class="indent"></span><span>System.<span class="java-string">out</span>.print(<span class="java-var">row</span>.getRowState()); <span class="java-comment">//Print row state (Added,Deleted,Detached,Modified,Unchanged)</span></span><br/>
                <span class="indent"></span><span>System.<span class="java-string">out</span>.println();</span><br/>
                <span>}</span><br/>
                <span>...</span>
            </code>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-6">
            <h2>簡介：</h2>
            <p>在JAVA中實作類似於.Net的DataTable類別庫。</p>
        </div>
        <div class="col-sm-6">
            <h2>連結：</h2>
            <ul>
                <li>下載JAVA Archive：<a href="https://drive.google.com/file/d/1IkpuZArKN4-jamdlpKYT0sqnFaSMIF3F/view" target="_blank">com-bblj-jdatatable.jar</a></li>
                <li>GitHub存放庫：<a href="https://github.com/BabyBoChen/JDataTable" target="_blank">JDataTable</a></li>
            </ul>
        </div>
    </div>
`;
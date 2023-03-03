class Dimension {
    constructor(w = 0, h = 0) {
        /** @type {Number}*/
        this.w = w;
        /** @type {Number}*/
        this.h = h;
    }
}

class Vector2D {
    constructor(x = 0, y = 0) {
        /** @type {Number}*/
        this.x = x;
        /** @type {Number}*/
        this.y = y;
    }
}

class CalendarDay {
    /** @type {Date} */
    #date = new Date();
    /** @type {Boolean} */
    #isHoliday = false;
    /** @type {String} */
    #description = "";
    constructor() {
        
    }
    /** @return {Date} */
    get date() {
        return this.#date;
    }
    /**@param {Date} _date */
    set date(_date) {
        this.#date = _date;
    }
    /** @return {Boolean} */
    get isHoliday() {
        return this.#isHoliday;
    }
    /**@param {Boolean} _isHoliday */
    set isHoliday(_isHoliday) {
        this.#isHoliday = _isHoliday;
    }
    /** @return {String} */
    get description() {
        return this.#description;
    }
    /**@param {String} _description */
    set description(_description) {
        this.#description = _description;
    }
}

class BBLJCalendarConfig {
    /** @type {Number} */
    #year = 1990;
    /** @type {Number} */
    #month = 0;
    /** @type {String} */
    #fontSize = "1.25em";
    constructor(){
        /** @type {Function}*/
        this.onDateClicked = function() {
    
        };
    }
    /**@param {Number} y */
    set year(y) {
        this.#year = y;
    }
    /**@return {Number} */
    get year() {
        return this.#year;
    }
    /**@param {Number} m */
    set month(m) {
        this.#month = m;
    }
    /**@return {Number} */
    get month() {
        return this.#month;
    }
    /**@param {String} size */
    set fontSize(size) {
        this.#fontSize = size;
    }
    /**@return {String} */
    get fontSize() {
        return this.#fontSize;
    }
}

const BBLJCalendar = {

    /** @type {HTMLCanvasElement} */
    canvas : null,

    /** @type {CanvasRenderingContext2D} */
    ctx : null,
    
    /** @type {Number}*/
    width : 0,

    /** @type {Number}*/
    height : 0,

    /** @type {Number}*/
    columnWidth : 0,

    /** @type {Number}*/
    rowHeight : 0,

    /** @type {[string]}*/
    WEEKDAYS : ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"],

    /** @type {BBLJCalendarConfig} */
    config : new BBLJCalendarConfig(),

    /** @type {[CalendarDay]} */
    calendarDays : [],

    /** @type {Vector2D?} */
    cursorPos : null,

    /** @type {Function}*/
    mount : /** @param canvas {HTMLCanvasElement} @param config {BBLJCalendarConfig} */ function(canvas, config) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        if(config){   
            this.config = config;
        }
        this.populateCalendarDates();
        let theCalendar = this;
        this.canvas.addEventListener("mousemove", function(e){
            theCalendar.calcuateCursorPos(e);
            theCalendar.draw();
        });
        this.canvas.addEventListener("mouseout", function(){
            theCalendar.cursorPos = null;
            theCalendar.draw();
        });
        this.canvas.addEventListener("click", function(e){
            theCalendar.calcuateCursorPos(e);
            let theCalendarDay = theCalendar.getClickedDay();
            if(theCalendarDay){
                theCalendar.config.onDateClicked(theCalendarDay);
            }
        });
        this.draw();
    },

    /** @type {Function}*/
    getFirstDateOfTheCalendar : /** @return {Date} */ function() {
        let firstDateOfTheMonth = new Date(this.config.year, this.config.month, 1);
        let firstDateOfTheCalendar = firstDateOfTheMonth;
        for(let i = 0; i < firstDateOfTheMonth.getDay(); i++){
            firstDateOfTheCalendar.setDate(firstDateOfTheMonth.getDate() - 1);
        }
        return firstDateOfTheCalendar;
    },

    /** @type {Function}*/
    populateCalendarDates: function() {
        /** @type {Date}*/
        let firstDateOfTheCalendar = this.getFirstDateOfTheCalendar();
        for(let i = 0; i < 42; i++){
            let d = new CalendarDay();
            d.date = new Date(firstDateOfTheCalendar.getFullYear(), firstDateOfTheCalendar.getMonth(), firstDateOfTheCalendar.getDate());
            d.date.setDate(firstDateOfTheCalendar.getDate() + i);
            this.calendarDays.push(d);
        }
    },

    /** @type {Function}*/
    calcuateCursorPos : function(e) {
        let coord = new Vector2D(0, 0);
        let x = e.offsetX;
        let y = e.offsetY;
        coord.x = Math.floor(x / this.columnWidth);
        coord.y = Math.floor(y / this.rowHeight);
        this.cursorPos = coord;
    },

    /** @type {Function}*/
    draw : function(){
        //1. Clear All
        this.ctx.clearRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
        
        //2. Calculate width and height
        this.width = this.canvas.offsetWidth;
        this.height = this.canvas.offsetHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.columnWidth = this.canvas.width / 7;
        this.rowHeight = this.canvas.height / 7;

        //3. draw
        this.drawWeekDays();
        this.drawCalendarDays();
        this.drawBorder();
    },

    /** @type {Function}*/
    drawWeekDays: function() {
        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(0, 0, this.width, this.rowHeight);
        this.ctx.fillStyle = 'white';
        this.ctx.font = `${this.config.fontSize} Arial`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = "middle";
        for (let i = 0; i < this.WEEKDAYS.length; i++) {
            this.ctx.fillText(this.WEEKDAYS[i], this.columnWidth / 2 + this.columnWidth * i, this.rowHeight / 2, this.columnWidth);
        }
    },

    /** @type {Function}*/
    drawCalendarDays : function(){
        this.ctx.fillStyle = 'black';
        if(this.calendarDays != null && this.calendarDays.length > 0) {
            let tempCalendarDays = this.calendarDays.sort(function(current, next){
                if(current.date.getTime() > next.date.getTime()){
                    return 1;
                } else {
                    return -1;
                }
            });
            for(let i = 0; i < tempCalendarDays.length; i++){
                let theDate = this.calendarDays[i].date;
                //console.log(theDate);
                //console.log("theDate:" + theDate.getDate());
                let theDay = theDate.getDay();
                //console.log("theDay:" + theDay);
                //let nthDay = theDay == 0 ? 7 : theDay;
                let week = Math.ceil((i + 1) / 7);
                //console.log("week:" + week);
                let x = (theDay) * this.columnWidth;
                //console.log("x:"+x);
                let y = this.rowHeight * (week);
                //console.log("y:"+y);
                if(this.cursorPos != null){
                    //console.log(this.cursorPos);
                    if(this.cursorPos.x == theDay && this.cursorPos.y == week){
                        this.ctx.fillStyle = 'yellow';
                        this.ctx.fillRect(this.columnWidth * theDay, this.rowHeight * week, this.columnWidth, this.rowHeight);
                    }
                    else{
                        this.ctx.fillStyle = 'white';
                        this.ctx.fillRect(this.columnWidth * x, this.rowHeight * y, this.columnWidth, this.rowHeight);
                    }
                }
                this.ctx.fillStyle = 'black';
                if(this.calendarDays[i].isHoliday){
                    this.ctx.fillStyle = 'red';
                }
                this.ctx.fillText(theDate.getDate(), x + this.columnWidth/2, y + this.rowHeight/2, this.columnWidth);
            }
        } 
    },

    /** @type {Function}*/
    drawBorder : function(){
        this.ctx.moveTo(0 + this.ctx.lineWidth, 0 + this.ctx.lineWidth);
        this.ctx.beginPath();
        this.ctx.lineTo(this.width - this.ctx.lineWidth, 0 + this.ctx.lineWidth);
        this.ctx.lineTo(this.width - this.ctx.lineWidth, this.height - this.ctx.lineWidth);
        this.ctx.lineTo(0 + this.ctx.lineWidth, this.height - this.ctx.lineWidth);
        this.ctx.lineTo(0 + this.ctx.lineWidth, 0 + this.ctx.lineWidth);
        this.ctx.closePath();
        this.ctx.stroke();

        //columns
        for (let i = 1; i < 8; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.columnWidth * i, 0);
            this.ctx.lineTo(this.columnWidth * i, this.height);
            this.ctx.closePath();
            this.ctx.stroke();
        }

        //rows
        for (let i = 1; i < 7; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, this.rowHeight * i);
            this.ctx.lineTo(this.width, this.rowHeight * i);
            this.ctx.closePath();
            this.ctx.stroke();
        }
    },

    /** @type {Function} */
    getClickedDay: function(){
        let theDay = null;
        if(this.cursorPos != null){
            let i = (this.cursorPos.y-1)*7 + this.cursorPos.x;
            theDay = this.calendarDays[i];
        }
        return theDay;
    },
};

export { BBLJCalendar, BBLJCalendarConfig }
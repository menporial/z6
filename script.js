
var arrPlotX = [0];
var arrSinY1 = [0];
var arrCosY2 = [0];



if(typeof(EventSource) !== "undefined") {
    var source = new EventSource("http://vmzakova.fei.stuba.sk/sse/sse.php");
    
    source.addEventListener("message", function(e) {
        coordinatesListener(e);
			}, false);
  
} else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support server-sent events...";
}

function coordinatesListener(e){
    var data = JSON.parse(e.data);
    document.getElementById("result").innerHTML = e.data;
    if(data.x == 0){
        arrSinY1[0] = data.y1;
        arrCosY2[0] = data.y2;
    }else{
        arrSinY1.push(data.y1);
        arrCosY2.push(data.y2);
        arrPlotX.push(data.x);
    }

    console.log(arrPlotX);


}
var lineDiv = document.getElementById('line-chart');

var traceA = {
  x: [1, 5, 13, 24, 35, 46, 60],
  y: [80, 40, 70, 65, 15, 75, 49],
  type: 'scatter'
};

var traceB = {
  x: [4, 9, 17, 21, 31, 42, 56],
  y: [64, 81, 3, 49, 25, 17, 26],
  type: 'scatter'
};

var data = [traceA, traceB];

var layout = {
  title:'A Line Chart in Plotly'
};

Plotly.plot( lineDiv, data, layout );

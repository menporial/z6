
var arrPlotX = [0];
var arrSinY1 = [0];
var arrCosY2 = [0];
var traceA, traceB;
var dataA, dataB;
var lineDiv = document.getElementById('line-chart');




if(typeof(EventSource) !== "undefined") 
{
    var source = new EventSource("http://vmzakova.fei.stuba.sk/sse/sse.php");
} 
else 
{
    document.getElementById("result").innerHTML = "Sorry, your browser does not support server-sent events...";
}

function coordinatesListener(){
  source.addEventListener("message", function(e)
  {
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

 //   console.log(arrPlotX);
    plotDraw();  
	}); 
    

}


function plotDraw(){
 traceA = {
  x: arrPlotX,
  y: arrSinY1,
  type: 'scatter',
  name: 'Sinus',
  line: {
    color: 'rgb(255, 153, 0)',
    width: 2
  }
};

 traceB = {
  x: arrPlotX,
  y: arrCosY2,
  type: 'scatter',
  name: 'Cos',
  line: {
    color: 'rgb(153, 153, 255)',
    width: 2
  }
};

var layout = {
  title: 'Graf sínusu a kosínusu',
  showlegend: true
};

//var data = [traceA, traceB];
dataA = [traceA];
dataB = [traceB];


Plotly.plot(graph, [], layout );
Plotly.addTraces(graph, dataA);
Plotly.addTraces(graph, dataB);
}

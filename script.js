
var arrPlotX = [0];
var arrSinY1 = [0];
var arrCosY2 = [1];
var traceA, traceB;
var dataA, dataB;
var lineDiv = document.getElementById('line-chart');
var displaySin = true;
var displayCos = true;
var process = true;
var pausedX;
var pausedSinY1;
var pausedCosY2;
var traceX, traceSinY1, traceCosY2;




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

function сheckedSin()
{
  if(displaySin == true)
  {
    displaySin = false;
  }
  else
  {
    displaySin = true;
  } 
  
  plotDraw();
}

function сheckedCos()
{
  if(displayCos == true)
  {
    displayCos = false;
  }
  else
  {
    displayCos = true;
  } 
  
  plotDraw();
}

function pausePlot()
{
  process = false;
  document.getElementById("pausePlot").style.display = "none";
  document.getElementById("continuePlot").style.display = "block";
  
  pausedX = arrPlotX.slice();
  pausedSinY1 = arrSinY1.slice();
  pausedCosY2 = arrCosY2.slice();
}

function continuePlot()
{
  process = true;
  document.getElementById("pausePlot").style.display = "block";
  document.getElementById("continuePlot").style.display = "none";
  
  plotDraw(); 
}


function plotDraw(){
 
  if(process == true){
    traceX = arrPlotX;
    traceSinY1 = arrSinY1;
    traceCosY2 = arrCosY2;
  }else{
    traceX = pausedX;
    traceSinY1 = pausedSinY1;
    traceCosY2 = pausedCosY2;
  }
 traceA = {
  x: traceX,
  y: traceSinY1,
  type: 'scattergl',
  name: 'Sin',
  line: {
    color: 'red',
    width: 2
  }
};

 traceB = {
  x: traceX,
  y: traceCosY2,
  type: 'scattergl',
  name: 'Cos',
  line: {
    color: 'black',
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


Plotly.newPlot(lineDiv, [], layout, 200 );

if(displaySin == true && displayCos == true)
  {
    Plotly.addTraces(lineDiv, dataA);
    Plotly.addTraces(lineDiv, dataB);
  }
  else if(displaySin == true && displayCos == false)
  {
    Plotly.addTraces(lineDiv, dataA); 
  }
  else if(displaySin == false && displayCos == true)
  {
    Plotly.addTraces(lineDiv, dataB); 
  }  
}

var scroll;
var data;

$.ajax({
  type: 'GET',
  async: false,
  url: "https://zenithtest1.s3.us-east-2.amazonaws.com/usedexotics3.json",
  data: "",
  success: function(result) {
    data = result;
  }
});

function getMake() {
  var make = document.querySelector("#make").value;
  var findModels;
  var modelList = document.querySelector('#model');
  var newOption;
  var del = document.querySelector("#model");
  del.innerHTML = "";
  var selectobject = document.getElementById("make");
  for (var i = 0; i < selectobject.length; i++) {
    if (selectobject.options[i].value == 'A')
      selectobject.remove(i);
  }
  if (make == "Ferrari") {
    findModels = "Ferrari"; //print make
    var modelOps = ['348', '360 Modena', '360 Spider', '456 GT',
      '456 M', '458 Italia', '458 Speciale',
      '458 Spider', '488 GTB', '488 Pista',
      '488 Pista Spider', '488 Spider', '512 M',
      '512 TR', '550 Barchetta', '550 Maranello',
      '575 M', '599 GTB Fiorano', '599 GTO', '612 Scaglietti',
      '812 Superfast', 'California',
      'Challenge Stradale', 'Enzo', 'F12berlinetta',
      'F12tdf', 'F355', 'F40', 'F430', 'F50', 'F8 Spider',
      'F8 Tributo', 'FF', 'GTC4Lusso', 'GTC4LussoT',
      'LaFerrari', 'LaFerrari Aperta', 'Mondial',
      'Mondial T', 'PortoFino', 'SF90 Stradale',
      'Superamerica', 'Testarossa'];
    for (i = 0; i < modelOps.length; i++) {
      newOption = document.createElement("option");
      newOption.appendChild(document.createTextNode(modelOps[i]));
      newOption.value = modelOps[i];
      modelList.appendChild(newOption);
    }
  } else if (make == "Lamborghini") {
    findModels = "Lamborghini"; //print make
    var modelOps = ['Aventador', 'Aventador S', 'Aventador SVJ',
      'Diablo', 'Gallardo', 'Huracan', 'Huracan EVO',
      'Murcielago', 'Urus'
    ];
    for (i = 0; i < modelOps.length; i++) {
      newOption = document.createElement("option");
      newOption.appendChild(document.createTextNode(modelOps[i]));
      newOption.value = modelOps[i];
      modelList.appendChild(newOption);
    }
  } else if (make == "McLaren") {
    findModels = "McLaren"; //print make
    var modelOps = ['570GT', '570S', '600LT', '650S', '675LT', '720S',
      'GT', 'MP4-12C'];
    for (i = 0; i < modelOps.length; i++) {
      newOption = document.createElement("option");
      newOption.appendChild(document.createTextNode(modelOps[i]));
      newOption.value = modelOps[i];
      modelList.appendChild(newOption);
    }
  } else if (make == "Tesla") {
    findModels = "Tesla";
    var modelOps = ['Model 3', 'Model S', 'Model X','Roadster'];
    for (i = 0; i < modelOps.length; i++) {
      newOption = document.createElement("option");
      newOption.appendChild(document.createTextNode(modelOps[i]));
      newOption.value = modelOps[i];
      modelList.appendChild(newOption);
    }
  }

}


function search() {
  var searchMake = document.querySelector("#make").value;
  var searchModel = document.querySelector("#model").value;
  window.scrollTo(0, document.getElementById('disp-result').offsetTop);
  var curMiles = [];
  var curPrices = [];
  console.log(searchMake)
  console.log(searchModel)
  console.log(JSON.stringify(data[searchMake]))
  var numOfResults = Object.keys(data[searchMake][searchModel]).length;
  for (var i = 0; i < numOfResults; i++) { //creating chart data arrays
    curMiles.push(data[searchMake][searchModel][i][0]);
    curPrices.push(data[searchMake][searchModel][i][1]);
  }

  document.querySelector("#disp2").innerHTML = searchMake + ' ' + searchModel + ': ' + curPrices.length + ' results';

  //Current Chart
  var curData = [];
  for (var i = 0; i < curMiles.length; i++) {
    x = curMiles[i];
    y = curPrices[i];
    var json = {
      x: x,
      y: y
    };
    curData.push(json);
  }
  var ctx = document.getElementById('curchart').getContext('2d');
  var scatterChart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        data: curData,
        radius: 6,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: 'rgba(0, 100, 255, 1)',
        backgroundColor: 'rgba(0, 172, 223, 0.8)'
      }]
    },
    options: {
      scales: {
        xAxes: [{
          type: 'linear',
          position: 'bottom',
          ticks: {
            fontSize: 16,
            fontColor: "black"
          },
          scaleLabel: {
            display: true,
            labelString: 'Miles (mi)',
            fontSize: 16,
            fontColor: "black"
          }
        }],
        yAxes: [{
          ticks: {
            fontSize: 16,
            fontColor: "black"
          },
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'List Price',
            fontSize: 16,
            fontColor: "black"
          }
        }]
      },
      legend: {
        display: false
      },
      layout: {
        padding: {
          left: 20,
          right: 30,
          top: 20,
          bottom: 20
        }
      }
    }
  });
  //Historical Chart
  var hisDate = [2000, 2005, 2010, 2015, 2020];
  var hisValue = [160000, 130000, 100000, 80000, 90000];
  var hisData = [];
  for (var i = 0; i < curMiles.length; i++) {
    x = hisDate[i];
    y = hisValue[i];
    var json = {
      x: x,
      y: y
    };
    hisData.push(json);
  }
  var ctx2 = document.getElementById('hischart').getContext('2d');
  var scatterChart = new Chart(ctx2, {
    type: 'line',
    data: {
      datasets: [{
        data: hisData,
        borderWidth: 1,
        radius: 8,
        pointHoverRadius: 10,
        backgroundColor: 'rgba(212, 0, 0, 0.8)',
        fill: false
      }]
    },
    options: {
      scales: {
        xAxes: [{
          type: 'linear',
          position: 'bottom',
          ticks: {
            fontSize: 16,
            fontColor: "black"
          },
          scaleLabel: {
            display: true,
            labelString: 'Year',
            fontSize: 16,
            fontColor: "black"
          }
        }],
        yAxes: [{
          display: true,
          ticks: {
            fontSize: 16,
            fontColor: "black",
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: 'Average Price',
            fontSize: 16,
            fontColor: "black"
          }
        }]
      },
      legend: {
        display: false
      },
      layout: {
        padding: {
          left: 20,
          right: 30,
          top: 20,
          bottom: 20
        }
      }
    }
  });
}

function CurUpdate() {
  document.querySelector("#test er").innerHTML = "success 1";
  var userInput = document.getElementById('MaxPrice').value;
  alert(userInput)
}

/*
At top: $.getJSON( "https://zenithtest1.s3.us-east-2.amazonaws.com/usedexotics.json", function( data ) {
  $("#backStop").text(JSON.stringify(data));
});

In search:  var data = JSON.parse(document.querySelector("#backStop").innerHTML);
*/

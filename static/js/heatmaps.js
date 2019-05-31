queue()
  .defer(d3.csv, 'data/HumanRpkm100.csv')
  .await(makeGraphsHuman);


queue()
  .defer(d3.csv, 'data/MouseRpkm100.csv')
  .await(makeGraphsMouse);


var hs = null;
var mm10 = null;
var selection = null;
var mapped = null;
var subgroups = null;

// color configuration for my heatmaps
var colorscaleValue = [
  [0, '#3D9970'],
  [1, '#001f3f']
];


function makeGraphsHuman(error, Human) {
  hs = Human;

  // create a subselection of our CSV data, so that only the numeric block results
  // and make sure that it is in a bi-dimensional array
  var heatmapvalues = [];
  var symbols = [];
  var subjects = [];

  Human.forEach(function (row) {
    subjects = Object.keys( row ).slice(1);
    //var subjects = Object.keys(row).map(function (Key) { return row[Key];});
    vals = Object.values(row);
    //var vals = Object.values(row).map(function (Val) { return row[Val];});

    // first column is our symbol, so we just add it to an array to use later
    symbols.push( vals[0] );

    var newrow = [];
    for(var i = 1; i < vals.length; i++) { // start from 1 because we want to skip the first column
      newrow.push( vals[i] );
    }
    heatmapvalues.push(newrow);
  });

  // debug shit
  console.log(symbols);
  console.log(typeof (symbols));
  console.log(heatmapvalues);
  console.log(subjects);
  console.log(typeof (subjects));

  // layout for heatmap
  var layout = {
    title: 'Mostly Humans',
    annotations: [],
    xaxis: {
      side: 'top'
    },
    yaxis: {
      width: 700,
      height: 700,
      autosize: false
    }
  };

  // prepare our data for Plotly heatmap
  var bicho = [
    {
      z: heatmapvalues,
      dx: subjects,
      dy: symbols,
      type: 'heatmap'
      //  TODO: apparently this line makes the whole thing break if we keep the 3 axis, if we use z only works
    }
  ];

  Plotly.newPlot('heatmapdiv-human', bicho);
}
var graphOptions = {filename: "Neardentals", fileopt: "overwrite"};
Plotly.plot(bicho, graphOptions, function (err, msg) {
    console.log(msg);
});


function makeGraphsMouse(error, Mouse) {

  var raton = [
    {
      z: [[1, 20, 30, 50, 1], [20, 1, 60, 80, 30], [30, 60, 1, -10, 20]],
      x: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      y: ['Morning', 'Afternoon', 'Evening'],
      type: 'heatmap'
    }
  ];

  Plotly.newPlot('heatmapdiv-mouse', raton);
}

/*
function makeGraphsMouse(error, Mouse) {
  console.log( "mouse: " + typeof(Mouse) );

  mm10 = crossfilter(Mouse);   // generate data matrix
/*
  //genomicData.forEach(function (g) {         // this is to format data and manipulate
    //g.averg_reads = parseInt(g.averg_reads);
    //g.qc_number = parseInt(g.qc_number);
    //g.length_reads = parseInt(g.length_reads);
  //})

  show_significan_mmgen(mm);

  dc.renderAll();
}
 */



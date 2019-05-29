queue()
  .defer(d3.csv, 'data/HumanRpkm100.csv')
  .defer(d3.csv, 'data/MouseRpkm100.csv')
  .await(makeGraphs);

var hs = null;
var mm10 = null;

function makeGraphs(error, Human) {
  var ndx = crossfilter(Human);   // generate data matrix
  daths = Human;


  show_significant_hsgen(ndx);

  dc.renderAll();
}

function makeGraphs(error, Mouse) {
  var mm = crossfilter(Mouse);   // generate data matrix
  musm = Mouse;

  //genomicData.forEach(function (g) {         // this is to format data and manipulate
    //g.averg_reads = parseInt(g.averg_reads);
    //g.qc_number = parseInt(g.qc_number);
    //g.length_reads = parseInt(g.length_reads);
  //})

  show_significan_mmgen(mm);

  dc.renderAll();
}



var heatmapChart = dc.heatMap("#heatmapHuman");


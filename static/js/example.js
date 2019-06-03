queue()
  .defer(d3.csv, 'data/HumanRpkm100.csv')
  .await(makeGraphsHuman);


queue()
  .defer(d3.csv, 'data/MouseRpkm100.csv')
  .await(makeGraphsMouse);


var hs = null;
var mm10 = null;


function makeGraphsHuman(error, Human) {
  var human = crossfilter(Human);// generate data matrix
  hs = Human;

  /*
    Human.forEach(function (h) {         // this is to format data and manipulate
      h.averg_reads = parseInt(g.averg_reads);
      h.qc_number = parseInt(g.qc_number);
      h.length_reads = parseInt(g.length_reads);
    })

  */

  show_heatmaphuman(human);


  dc.renderAll();
};




var heatchart = null;

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
    return [heatmapvalues];
    return [symbols];
    return [subjects];
  });

  var heatColorMapping = d3.scaleLinear()
            .domain([-23, 0, 23])
            .range(["red", "#e5e5e5", "green"]);


  heatchart = dc.heatMap('#exampleheatmaphsdiv')
    .width(12 * 80 + 80)
    .height(27 * 10 + 40)
    .dimension(heatmapvalues)
    .group(subjects)
    .colors(heatColorMapping);
  heatchart.xBorderRadius(0);
  heatchart.yBorderRadius(0);

  heatchart.rowsLabel(function(d) { //console.log("rows labels", d);
  //console.log("using ddata", datesData[d]);
  return symbols[d]; })

}

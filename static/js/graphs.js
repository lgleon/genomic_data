queue()
  .defer(d3.csv, 'data/ImmuGenomic.csv') //import data from file (what is exactly defer??
  .await(makeGraphs);

var data = null;

function makeGraphs(error, genomicData) {
  var gen = crossfilter(genomicData);   // generate data matrix
  data = genomicData;


  genomicData.forEach(function (g) {         // this is to format data and manipulate
    g.averg_reads = parseInt(g.averg_reads);
    g.qc_number = parseInt(g.qc_number);
    g.length_reads = parseInt(g.length_reads);
  })


  show_species_balance(gen);
  show_depth_reads(gen);
  show_annotation(gen);
  show_data_type(gen);


  dc.renderAll();
};


var chart = null;
function show_species_balance(gen) {
  var dim = gen.dimension(dc.pluck('species'));
  var group = dim.group();

  chart = dc.barChart('#species-selection')    //link to html element through id
    .width (400)
    .height(300)
    .margins({top: 10, right: 50, bottom: 30, left: 50})
    .dimension(dim)
    .group(group)
    .transitionDuration(500)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .elasticY(true)
    .xAxisLabel('Species')
    .yAxis().ticks(20);


}

function show_depth_reads(gen) {
  var dim = gen.dimension(dc.pluck('project'));
  //var dim = gen.dimension(function(d) {return d.project;});
  //var group = dim.group().reduceSum(function(d) {return d.averg_reads;});
  var group = dim.group().reduceSum(dc.pluck('averg_reads'));
  dc.barChart('#average_reads')
    .width(600)
    .height(300)
    .margins({top: 10, right: 50, bottom: 30, left: 50})
    .dimension(dim)
    .group(group)
    .transitionDuration(500)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .elasticY(true)
    .xAxisLabel('Reads Depth')
    .yAxis().ticks(20);

}

function show_annotation(gen) {
  var dim = gen.dimension(dc.pluck('species'));
  var group = dim.group().reduceSum(dc.pluck('Annotation'));;

  dc.barChart('#Annotation')
    .width(400)
    .height(300)
    .margins({top: 20, right: 50, bottom: 30, left: 50})
    .dimension(dim)
    .group(group)
    .transitionDuration(500)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .elasticY(true)
    .xAxisLabel('Annotated features')
    .yAxis().ticks(20);


}


function show_data_type(gen) {
  var dim = gen.dimension(dc.pluck('data_type'));
  var group = dim.group();

  dc.barChart('#data_type')
    .width(400)
    .height(300)
    .margins({top: 10, right: 50, bottom: 30, left: 50})
    .dimension(dim)
    .group(group)
    .transitionDuration(500)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .elasticY(true)
    .xAxisLabel('Type of Data')
    .yAxis().ticks(20);


}

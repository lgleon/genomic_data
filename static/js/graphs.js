queue()
    .defer(d3.csv, "data/ImmuGenomic.csv")
    .await(makeGraphs);

function makeGraphs(error, speciesData) {
  var ndx = crossfilter(speciesDataData);

    show_species_balance(ndx);

    dc.renderAll();
}

function show_species_balance(ndx) {
    var dim = ndx.dimension(dc.pluck('species'));
    var group = dim.group();

    dc.barChart('#species-selection')
        .width(400)
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

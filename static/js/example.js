queue()
// Declare a barchart associated to a html5 element by id
var gendata = dc.barChart('#example-chart');

//Import data from file
d3.csv('data/ImmuGenomic.csv', function(data) {
  //parse all data to format and manipulate
  data.forEach(function (d) {
    d.date = dateFormat.parse(d.date);
    d.sales = +d.sales; //coerce to number
    d.company = +d.company;
  });

  var ndx = crossfilter(data);

  var companyDimension = ndx.dimension(function(d){
    return d.company;
  });

  var salesOverCompanyGroup = companyDimension.group().reduceSum(function (d) {
    return d.sales;
  });

  salesPerCompany.width(300)
    .height(400)
    .dimension(companyDimension)
    .group(salesOverCompanyGroup)
    .xAxisLabel('Compañia')
    .yAxisLabel('Ventas');


})

queue()
  .defer(d3.csv, 'data/HumanRpkm100g.csv')
  .await(makeGraphsHuman);


queue()
  .defer(d3.csv, 'data/MouseRpkm100g.csv')
  .await(makeGraphsMouse);
//.await(makeGraphRaton);


var hs = null;
var mm10 = null;
//var selection = null;
//var mapped = null;
//var subgroups = null;

//color configuration for my heatmaps
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
    subjects = Object.keys(row).slice(1);
    //var subjects = Object.keys(row).map(function (Key) { return row[Key];});
    valus = Object.values(row);
    //var vals = Object.values(row).map(function (Val) { return row[Val];});
    // first column is our symbol, so we just add it to an array to use later
    symbols.push(valus[0]);

    var newrow = [];
    for (var i = 1; i < valus.length; i++) { // start from 1 because we want to skip the first column
      newrow.push(valus[i]);
    }
    heatmapvalues.push(newrow);
    return [heatmapvalues];
  });

  // debug shit
  console.log(symbols);
  console.log(typeof (symbols));
  console.log(heatmapvalues);
  console.log(subjects);
  console.log(typeof (subjects));

  var layout = {
    title: 'Human Heatmap',
    annotations: [],
    xaxis: {
      ticks: '',
      side: 'top'
    },
    yaxis: {
      ticks: '',
      ticksuffix: ' ',
      width: 700,
      height: 700,
      autosize: false
    }
  };


  // prepare our data for Plotly heatmap
  var data = [
    {
      z: heatmapvalues,
      x: subjects,
      //x: ['B80', 'B81', 'B86', 'B94', 'B95', 'B96', 'LGL030', 'LGL037', 'LGL047', 'LGL052', 'LGL141', 'LGL148', 'LGL150', 'LGL002', 'LGL018', 'LGL028'],
      y: symbols,   // I think there is a problem with the length
      //y: ['SLC14A1', 'ANKS1B', 'CST3', 'IER5', 'IFI30', 'CSRNP1', 'KCTD6', 'GDI1', 'NXT1', 'SLC30A1', 'BEST1', 'OTUD1', 'NOP53', 'NA1', 'PSAP', 'ACAD11', 'PIM3', 'HMGA1', 'SLC3A2', 'FTL', 'FTH1', 'ATP6V0C', 'RPL13', 'RPL15', 'STARD9', 'RACK1', 'PIK3R3', 'NKIRAS1', 'EEF1A1', 'NA2', 'NA3', 'EEF1G', 'NA4', 'IER2', 'GRPEL1', 'IRF2BP2', 'C1QBP', 'SPAG16', 'RPL8', 'LINC00909', 'FAM53C', 'TGFBI', 'GPX1', 'GADD45A', 'B3GNT2', 'NA5', 'RPS2', 'FCGRT', 'GRN', 'HNRNPA0', 'NA6', 'TPT1', 'HOOK2', 'JUNB', 'PTP4A1', 'DUSP6', 'NA7', 'EXOSC6', 'CTSB', 'NA8', 'RPL7', 'CARS', 'KIAA1671', 'TRIM5', 'NA9', 'RNASEK', 'RNF130', 'RPLP0', 'ING1', 'EIF3L', 'ATP6V1G1', 'NA10', 'CTSS', 'MIDN', 'LRRC39', 'NA11', 'RHOT2', 'RSL1D1', 'VCAN-AS1', 'EEF1D', 'CLPP', 'BTG2', 'LYZ', 'C8orf59', 'IFT80', 'NA12', 'RPL19', 'VCAN', 'NA13', 'CCNY', 'SMIM10L1', 'SNN', 'RPL18A', 'NA14', 'LAPTM5', 'C1orf112', 'AAR2', 'NA15', 'NUDT15', 'CEP290'],
      type: 'heatmap',
      //colorscale: colorscaleValue,
    }
  ];

  Plotly.newPlot('heatmapdiv-human', data, layout);
}


function makeGraphsMouse(error, Mouse) {
  mm = Mouse;

  // create a subselection of our CSV data, so that only the numeric block results
  // and make sure that it is in a bi-dimensional array
  var heatmapvaluesm = [];
  var symbolsm = [];
  var subjectsm = [];

  Mouse.forEach(function (rowm) {
    subjectsm = Object.keys(rowm).slice(1);
    //var subjectsm = Object.keys(row).map(function (Key) { return row[Key];});
    valus = Object.values(rowm);
    //var vals = Object.values(row).map(function (Val) { return row[Val];});
    // first column is our symbol, so we just add it to an array to use later
    symbolsm.push(valus[0]);

    var newrow = [];
    for (var i = 1; i < valus.length; i++) { // start from 1 because we want to skip the first column
      newrow.push(valus[i]);
    }
    heatmapvaluesm.push(newrow);
    return [heatmapvaluesm];


  });

  // debug shit
  console.log(symbolsm);
  console.log(typeof (symbolsm));
  console.log(heatmapvaluesm);
  console.log(subjectsm);
  console.log(typeof (subjectsm));

  var layout = {
    title: 'Mouse Heatmap',
    annotations: [],
    xaxis: {
      ticks: '',
      side: 'top'
    },
    yaxis: {
      ticks: '',
      ticksuffix: ' ',
      width: 700,
      height: 700,
      autosize: false
    }
  };

  // prepare our data for Plotly heatmap
  var data = [
    {
      z: heatmapvaluesm,
      x: subjectsm,
      //y: ['Synpo', 'Prss16', 'NA1', 'Ptk2', 'Tspan2', 'Cd40lg', 'Cables1', 'Dntt', 'Lag3', 'Cxxc5', 'Tbx21', 'Plscr1', 'Bcat1', 'Ramp1', 'Ctla4', 'Trat1', 'Galnt10', 'Ptprj', 'Ccdc50', 'Erg', 'Sh3pxd2a', 'Myo6', 'Slc6a19', 'Iigp1', 'Nrn1', 'Smpdl3b', 'Slc16a5', 'Cd80', 'Spire1', 'Il12rb2', 'Scpep1', 'Slamf7', 'Alcam', 'Gm4951', 'F830016B08Rik', 'Kcna2', 'St6gal1', 'Gm4841', 'Spsb1', 'Mlkl', 'Pdlim4', 'Palm', 'Pls1', 'Ifngr2', 'Atp1b1', 'Tmem2', 'Npas2', 'Rflnb', 'Ptms', 'NA2', 'Dnajc6', 'St14', 'Ybx3', 'Wfs1', 'Mpp2', 'Hip1r', 'Osbpl3', 'Aldoc', 'Kdelc2', 'Arhgef11', 'Plod2', 'Pik3ap1', 'Tbkbp1', 'Irgm2', 'Unc93b1', 'Plcb4', 'Actr3b', 'NA3', 'Setbp1', 'Gzmb', 'Dapk2', 'NA4', 'Srgap3', 'Kcnk5', 'Myl10', 'Trnp1', 'Hopx', 'Entpd1', 'Cldnd1', 'Serpina3f', 'She', 'Ncf4', 'Scd2', 'Itga1', 'Tiam1', 'Vipr1', 'Klrk1', 'Ahnak', 'Anxa4', 'Cd200', '1110032F04Rik', 'Gpr55', 'Ptpn14', 'C030029H02Rik', 'Litaf', 'Qpct', 'Endod1', 'Cd163', 'Arid3a', 'Mical3'],
      y: symbolsm,   // There is a problem with the names, THERE MUST NOT BE ANY REPEATED NAMES
      type: 'heatmap',
      colorscale: colorscaleValue,
    }
  ];

  Plotly.newPlot('heatmapdiv-mouse', data, layout);
}


/*
function makeGraphRaton(error, Mouse) {

  var raton = [
    {
      z: [[1, 20, 30, 50, 1], [20, 1, 60, 80, 30], [30, 60, 1, -10, 20]],
      x: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      y: ['Morning', 'Afternoon', 'Evening'],
      type: 'heatmap'
    }
  ];

  Plotly.newPlot('heatmapdiv-raton', raton);
}
*/

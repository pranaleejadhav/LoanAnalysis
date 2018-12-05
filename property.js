var data = [];
var datamap = {};
var losses_fileurl = "https://raw.githubusercontent.com/apogaku/VAProject/master/Final_data.csv"
var dataset;
var original_dataset;
var state_name = "";
var loan_range = "";
var pdata;
var width1 = 550;
var height1 = 250;
var width2 = 550;
var height2 = 275;


function fetchData() {

    d3.csv(losses_fileurl, function(error, data) {
        if (error) throw error;
        dataset = data;
        original_dataset = data;
        processData()
        processData2()
    });

}


function filterData(type = 1, value) {
 
    if (type == 1) {
        state_name = value
    } else {
        loan_range = value
    }

    processData()
    processData2()
}


function processData() {
    dataset = original_dataset;

    if (state_name != "") {
        dataset = d3.nest()
            .entries(dataset.filter(function(d) {
                return d.PropertyState == state_name;
            }));

    }


    if (loan_range != "") {
        dataset = d3.nest()
            .entries(dataset.filter(function(d) {
                return d.LoanAmountRequested <= loan_range;
            }));

    }

    var cnt = 0
    var statusByProperty = d3.nest()
        .key(function(d) {
            return d.EstimatedPropertyValue;
        })
        .rollup(function(v) {
            return v.length;
        })
        .entries(dataset);

    var pos = 0

    var category = [75000, 95000, 115000, 135000, 170000, 220000, 275000, 350000, 450000, 600000, 800000, 2000000]

    for (var i = 0; i < category.length; i++) {
        data[i] = {
            EstimatedPropertyValue: category[i],
            abandoned: 0,
            rejected: 0,
            accepted: 0
        };
    }


    dataset.forEach(function(r) {
        var type = 0;

        var x = r.EstimatedPropertyValue;
        if (x == 0) {
            return;
        }
        switch (true) {
            case (x <= 75000):
                type = 0;
                break;
            case (x <= 95000):
                type = 1;
                break;
            case (x <= 115000):
                type = 2;
                break;
            case (x <= 135000):
                type = 3;
                break;
            case (x <= 170000):
                type = 4;
                break;
            case (x <= 220000):
                type = 5;
                break;
            case (x <= 275000):
                type = 6;
                break;
            case (x <= 350000):
                type = 7;
                break;
            case (x <= 450000):
                type = 8;
                break;
            case (x <= 600000):
                type = 9;
                break;
            case (x <= 800000):
                type = 10;
                break;
            case (x <= 2000000):
                type = 11;
                break;
            default:
                type = 0;
                break;
        }

        var row = {};

        row = data[type]
        if (r.Status == 0) {

            row.abandoned = row.abandoned + 1
        } else

        if (r.Status == 2) {
            row.rejected = row.rejected + 1
        } else

        if (r.Status == 1) {
            row.accepted = row.accepted + 1
        }

        data[type] = row


    })


    create_barChart();

}


function processData2() {
  dataset = original_dataset;
 // state_name = "MI"
    var loanAmt = [60000, 95999, 385000, 115000, 135000, 200000, 220000, 150000, 305000, 110000, 204000, 180000, 125000, 128000, 400000, 210000, 85000, 325000, 225000, 250000, 300000, 650000, 140000, 190000, 119000, 255000, 170000, 80000, 553000, 450000, 771000, 105000, 240000, 75000, 120000, 160000, 480000, 425000, 195000, 280000, 115681, 111000, 70000, 130000, 68000, 420000, 95000, 65000, 469000, 84000, 215000, 90000, 350000, 320000, 460000, 185000, 290000, 1544000, 260000, 310000, 475000, 631000, 375000, 100000, 155000, 181000, 330000, 335000, 435000, 410000, 635000, 104000, 700000, 370000, 230000, 600000, 175000, 630000, 89000, 550000, 103000, 216000, 295000, 850000, 451000, 380000, 275000, 145000, 208000, 900000, 96000, 500000, 472000, 315000, 235000, 205000, 199000, 1600000, 525000, 79000, 124000, 66000, 72000, 438000, 445000, 186000, 144000, 540000, 219000, 122000, 270000, 649000, 367000, 74000, 770000, 112000, 452000, 515000, 139000, 465000, 294000, 98000, 218000, 142000, 63000, 69000, 355000, 88000, 178000, 750000, 405000, 126000, 92000, 570000, 248000, 274000, 257000, 951000, 171000, 490000, 510000, 123000, 71999, 360000, 87000, 345000, 560000, 1042000, 680000, 440000, 870000, 189000, 116000, 365000, 61000, 102000, 151999, 470000, 238000, 340000, 113000, 502000, 212000, 281000, 690000, 50000, 146000, 166000, 35000, 55000, 10000, 925000, 378000, 298000, 237000, 230002, 245002, 315002, 45000, 225001, 250001, 115001, 550001, 170001, 150001, 190001, 115002, 570001, 95001, 160001, 140001, 130001, 360002, 475001, 175002, 325001, 365001, 300001, 65001, 375001, 270002, 490002, 215001, 50001, 100001, 200001, 75001, 480002, 450001, 40001, 290001, 180001, 90001, 220002, 90002, 110001, 275001, 155001, 80001, 100002, 20001, 335002, 345001, 260001, 580001, 125001, 150002, 60001, 550002, 165001, 255001, 350001, 565002, 235002, 445002, 140002, 80002, 105001, 135001, 120001, 280002, 315001, 395001, 330001, 265001, 85001, 0, 145001, 310001, 35001, 535001, 285001, 70001, 555001, 175001, 650001, 195001, 30001, 435001, 425001, 700001, 440001, 390001, 520001, 415001, 210001, 205001, 500001, 400001, 800001, 245001, 600001, 55001, 220001, 235001, 750001, 355001, 15000, 45001, 295001, 615001, 1000001, 340001, 370001, 660001, 565001, 30000, 430001, 480001, 10001, 25001, 185001, 320001, 710001, 230001, 265002, 525001, 385001, 200002, 920001, 545002, 270001, 105002, 510002, 325002, 180002, 395002, 305001, 580002, 70002, 440002, 950001, 560001, 215002, 285002, 725001, 240001, 125002, 110002, 410001, 210002, 495002, 420002, 375002, 280001, 460001, 165002, 120002, 355002, 510001, 160002, 40000, 835001, 195002, 300002, 15001, 240002, 225002, 360001, 605001, 380001, 385002, 95002, 170002, 330002, 340002, 515002, 400002, 250002, 570002, 50002, 1220001, 490001, 205002, 295002, 370002, 288000, 73000, 71000, 520000, 168000, 59000, 1050000, 335001, 405001, 82001, 320002, 302001, 775001, 905001, 525002];

if (state_name != "") {
dataset = d3.nest()
 .entries(dataset.filter(function(d) {
                return d.PropertyState == state_name;
            }));

}
    //loanAmt.sort();
    loanAmt.sort(function(a, b) {
        return a - b
    });

  //  console.log(loanAmt)

    pdata = new Array(8);
    var start = 42;
    var offset = 43;
    for (var i = 0; i < 8; i++) {
        pdata[i] = {
            loanAmount: loanAmt[start],
            abandoned1: 0,
            accepted1: 0,
            rejected1: 0,
            abandoned: 0,
            accepted: 0,
            rejected: 0
        };

        if (i == 6) {
            start = loanAmt.length - 1
        } else {
            start = start + offset
        }

    }

   // console.log(pdata)

    dataset.forEach(function(r) {

                var x = r.LoanAmountRequested
                var type = 0
                switch (true) {
                    case (x <= loanAmt[42]):
                        type = 0;
                        break;
                    case (x <= loanAmt[85]):
                        type = 1;
                        break;
                    case (x <= loanAmt[128]):
                        type = 2;
                        break;
                    case (x <= loanAmt[171]):
                        type = 3;
                        break;
                    case (x <= loanAmt[214]):
                        type = 4;
                        break;
                    case (x <= loanAmt[257]):
                        type = 5;
                        break;
                    case (x <= loanAmt[300]):
                        type = 6;
                        break;
                    case (x <= loanAmt[loanAmt.length - 1]):
                        type = 7;
                        break;
                }

                var row = {};

                row = pdata[type]
                // 

                if (r.Veteran == 0) {
                    if (r.Status == 0) {

                        row.abandoned = row.abandoned + 1
                    } else

                    if (r.Status == 2) {
                        row.rejected = row.rejected + 1
                    } else

                    if (r.Status == 1) {
                        row.accepted = row.accepted + 1
                    }
                } else {

                    if (r.Status == 0) {

                        row.abandoned1 = row.abandoned1 + 1
                    } else

                    if (r.Status == 2) {
                        row.rejected1 = row.rejected1 + 1
                    } else

                    if (r.Status == 1) {
                        row.accepted1 = row.accepted1 + 1
                    }
                }

                pdata[type] = row
              });

                create_barChart2()
            }

function create_barChart() {

    $('#svg_bar').empty();

    var margin = {
        top: 20,
        right: 160,
        bottom: 35,
        left: 30
    };
    var width = width1 //960 - margin.left - margin.right,
    height = height1 //500 - margin.top - margin.bottom;

    //770 450

   // console.log(width)
  //  console.log(height)
    var svg = d3.select("#svg_bar")
        .attr("width", width + margin.left + 80)//width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    // Transpose the data into layers
    var processed_data = d3.layout.stack()(["abandoned", "rejected", "accepted"].map(function(status) {
        return data.map(function(d) {
            return {
                x: (d.EstimatedPropertyValue),
                y: +d[status]
            };
        });
    }));



    // Set x, y and colors
    var x = d3.scale.ordinal()
        .domain(processed_data[0].map(function(d) {
            return d.x;
        }))
        .rangeRoundBands([10, width - 10], 0.02);

    var y = d3.scale.linear()
        .domain([0, d3.max(processed_data, function(d) {
            return d3.max(d, function(d) {
                return d.y0 + d.y;
            });
        })])
        .range([height, 0]);

    var colors = ["b33040", "#d25c4d", "#f2b447"];


    // Define and draw axes
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(5)
        .tickSize(-width, 0, 0)
        .tickFormat(function(d) {
            return d
        });

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
    //.tickFormat(d3.time.format("%Y"));

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);


    // Create groups for each series, rects for each segment 
    var groups = svg.selectAll("g.cost")
        .data(processed_data)
        .enter().append("g")
        .attr("class", "cost")
        .style("fill", function(d, i) {
            return colors[i];
        });

    var rect = groups.selectAll("rect")
        .data(function(d) {
            return d;
        })
        .enter()
        .append("rect")
        .attr("x", function(d) {
            return x(d.x);
        })
        .attr("y", function(d) {
            return y(d.y0 + d.y);
        })
        .attr("height", function(d) {
            return y(d.y0) - y(d.y0 + d.y);
        })
        .attr("width", x.rangeBand())
        .on("mouseover", function() {
            tooltip.style("display", null);
        })
        .on("mouseout", function() {
            tooltip.style("display", "none");
        })
        .on("mousemove", function(d) {
            var xPosition = d3.mouse(this)[0] - 15;
            var yPosition = d3.mouse(this)[1] - 25;
            tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
            tooltip.select("text").text("Status count: " + d.y);
        });


    // Draw legend
    var legend = svg.selectAll(".legend")
        .data(colors)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) {
            return "translate(30," + i * 19 + ")";
        });

    legend.append("rect")
        .attr("x", width - 50 - 18) //width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function(d, i) {
            return colors.slice().reverse()[i];
        });

    legend.append("text")
        .attr("x", width - 50 + 5) //width + 5)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text(function(d, i) {
            switch (i) {
                case 0:
                    return "Abandoned"
                case 1:
                    return "Accepted";
                case 2:
                    return "Rejected";
            }
        });


    // Prep the tooltip bits, initial display is hidden
    var tooltip = svg.append("g")
        .attr("class", "tooltip")
        .style("display", "none");

    tooltip.append("rect")
        .attr("width", 120)
        .attr("height", 20)
        .attr("fill", "white")
        .style("opacity", 0.5);

    tooltip.append("text")
        .attr("x", 60)
        .attr("dy", "1.2em")
        .style("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("font-weight", "bold");

}


function create_barChart2() {

   $('#svg_bar2').empty();



    var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 40
        },
        width = width2//960 - margin.left - margin.right,
        height = height2//500 - margin.top - margin.bottom;

    var x0 = d3.scale.ordinal()
        .rangeRoundBands([0, width], 0.1);

    var x1 = d3.scale.ordinal();

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x0)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.format(".2s"));

    var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var svg = d3.select("#svg_bar2")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var yBegin;

    var innerColumns = {
        "column1": ["abandoned1", "accepted1", "rejected1"],
        "column2": ["abandoned", "accepted", "rejected"],

    }

    var legendcolumnHeaders = ["Abandoned (Veteran)", "Accepted (Veteran)", "Rejected (Veteran)", "Abandoned (Non-Veteran)","Accepted (Non-Veteran)","Rejected (Non-Veteran)"]

    var columnHeaders = d3.keys(pdata[0]).filter(function(key) {
        return key !== "loanAmount";
    });
    color.domain(d3.keys(pdata[0]).filter(function(key) {
        return key !== "loanAmount";
    }));
    pdata.forEach(function(d) {
        var yColumn = new Array();
        d.columnDetails = columnHeaders.map(function(name) {
            for (ic in innerColumns) {
                if ($.inArray(name, innerColumns[ic]) >= 0) {
                    if (!yColumn[ic]) {
                        yColumn[ic] = 0;
                    }
                    yBegin = yColumn[ic];
                    yColumn[ic] += +d[name];
                    return {
                        name: name,
                        column: ic,
                        yBegin: yBegin,
                        yEnd: +d[name] + yBegin,
                    };
                }
            }
        });
        d.total = d3.max(d.columnDetails, function(d) {
            return d.yEnd;
        });
    });



    x0.domain(pdata.map(function(d) {
        return d.loanAmount;
    }));
    x1.domain(d3.keys(innerColumns)).rangeRoundBands([0, x0.rangeBand()]);

    y.domain([0, d3.max(pdata, function(d) {
        return d.total;
    })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".7em")
        .style("text-anchor", "end")
        .text("");

    var project_stackedbar = svg.selectAll(".project_stackedbar")
        .data(pdata)
        .enter().append("g")
        .attr("class", "g")
        .attr("transform", function(d) {
            return "translate(" + x0(d.loanAmount) + ",0)";
        });

    project_stackedbar.selectAll("rect")
        .data(function(d) {
            return d.columnDetails;
        })
        .enter().append("rect")
        .attr("width", x1.rangeBand())
        .attr("x", function(d) {
            return x1(d.column);
        })
        .attr("y", function(d) {
            return y(d.yEnd);
        })
        .attr("height", function(d) {
            return y(d.yBegin) - y(d.yEnd);
        })
        .style("fill", function(d) {
            return color(d.name);
        })
        .on("mouseover", function() { tooltip.style("display", null); })
        .on("mouseout", function() { tooltip.style("display", "none"); })
        .on("mousemove", function(d) {
          //console.log("d: "+ JSON.stringify(d3.mouse(this)) + "  "+d3.mouse(this)[0])
        var xPosition =  d3.mouse(this)[0];
      var yPosition = d3.mouse(this)[1];
      tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
      tooltip.select("text").text("Status count: "+(d.yEnd - d.yBegin));
    })

    var legend = svg.selectAll(".legend")
        .data(columnHeaders.slice().reverse())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) {
            return "translate(0," + i * 20 + ")";
        });

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) {
            switch(d) {
              case "abandoned1": 
                return "Abandoned (Veteran)"
                break;
              case "accepted1":
                return "Accepted (Veteran)"
                break;
              case "rejected1":
                return "Rejected (Veteran)"
                break;
              case "abandoned": 
                return "Abandoned (Non-Veteran)"
                break;
              case "accepted":
                return "Accepted (Non-Veteran)"
                break;
              case "rejected":
                return "Rejected (Non-Veteran)"
                break;
            }
            return d;
        });

          // Prep the tooltip bits, initial display is hidden
  var tooltip = svg.append("g")
    .attr("class", "tooltip")
    .style("display", "none");
      
  tooltip.append("rect")
    .attr("width", 120)
    .attr("height", 20)
    .attr("fill", "white")
    .style("opacity", 0.5);

  tooltip.append("text")
    .attr("x", 60)
    .attr("dy", "1.2em")
    .style("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("font-weight", "bold");


}


function createSelectBox() {

    var usStates = [{
            name: 'ALL',
            abbreviation: 'ALL'
        },
        {
            name: 'CALIFORNIA',
            abbreviation: 'CA'
        },
        {
            name: 'TEXAS',
            abbreviation: 'TX'
        },
        {
            name: 'WASHINGTON',
            abbreviation: 'WA'
        },
        {
            name: 'ALABAMA',
            abbreviation: 'AL'
        },
        {
            name: 'ALASKA',
            abbreviation: 'AK'
        },
        {
            name: 'AMERICAN SAMOA',
            abbreviation: 'AS'
        },
        {
            name: 'ARIZONA',
            abbreviation: 'AZ'
        },
        {
            name: 'ARKANSAS',
            abbreviation: 'AR'
        },
        
        {
            name: 'COLORADO',
            abbreviation: 'CO'
        },
        {
            name: 'CONNECTICUT',
            abbreviation: 'CT'
        },
        {
            name: 'DELAWARE',
            abbreviation: 'DE'
        },
        {
            name: 'DISTRICT OF COLUMBIA',
            abbreviation: 'DC'
        },
        {
            name: 'FEDERATED STATES OF MICRONESIA',
            abbreviation: 'FM'
        },
        {
            name: 'FLORIDA',
            abbreviation: 'FL'
        },
        {
            name: 'GEORGIA',
            abbreviation: 'GA'
        },
        {
            name: 'GUAM',
            abbreviation: 'GU'
        },
        {
            name: 'HAWAII',
            abbreviation: 'HI'
        },
        {
            name: 'IDAHO',
            abbreviation: 'ID'
        },
        {
            name: 'ILLINOIS',
            abbreviation: 'IL'
        },
        {
            name: 'INDIANA',
            abbreviation: 'IN'
        },
        {
            name: 'IOWA',
            abbreviation: 'IA'
        },
        {
            name: 'KANSAS',
            abbreviation: 'KS'
        },
        {
            name: 'KENTUCKY',
            abbreviation: 'KY'
        },
        {
            name: 'LOUISIANA',
            abbreviation: 'LA'
        },
        {
            name: 'MAINE',
            abbreviation: 'ME'
        },
        {
            name: 'MARSHALL ISLANDS',
            abbreviation: 'MH'
        },
        {
            name: 'MARYLAND',
            abbreviation: 'MD'
        },
        {
            name: 'MASSACHUSETTS',
            abbreviation: 'MA'
        },
        {
            name: 'MICHIGAN',
            abbreviation: 'MI'
        },
        {
            name: 'MINNESOTA',
            abbreviation: 'MN'
        },
        {
            name: 'MISSISSIPPI',
            abbreviation: 'MS'
        },
        {
            name: 'MISSOURI',
            abbreviation: 'MO'
        },
        {
            name: 'MONTANA',
            abbreviation: 'MT'
        },
        {
            name: 'NEBRASKA',
            abbreviation: 'NE'
        },
        {
            name: 'NEVADA',
            abbreviation: 'NV'
        },
        {
            name: 'NEW HAMPSHIRE',
            abbreviation: 'NH'
        },
        {
            name: 'NEW JERSEY',
            abbreviation: 'NJ'
        },
        {
            name: 'NEW MEXICO',
            abbreviation: 'NM'
        },
        {
            name: 'NEW YORK',
            abbreviation: 'NY'
        },
        {
            name: 'NORTH CAROLINA',
            abbreviation: 'NC'
        },
        {
            name: 'NORTH DAKOTA',
            abbreviation: 'ND'
        },
        {
            name: 'NORTHERN MARIANA ISLANDS',
            abbreviation: 'MP'
        },
        {
            name: 'OHIO',
            abbreviation: 'OH'
        },
        {
            name: 'OKLAHOMA',
            abbreviation: 'OK'
        },
        {
            name: 'OREGON',
            abbreviation: 'OR'
        },
        {
            name: 'PALAU',
            abbreviation: 'PW'
        },
        {
            name: 'PENNSYLVANIA',
            abbreviation: 'PA'
        },
        {
            name: 'PUERTO RICO',
            abbreviation: 'PR'
        },
        {
            name: 'RHODE ISLAND',
            abbreviation: 'RI'
        },
        {
            name: 'SOUTH CAROLINA',
            abbreviation: 'SC'
        },
        {
            name: 'SOUTH DAKOTA',
            abbreviation: 'SD'
        },
        {
            name: 'TENNESSEE',
            abbreviation: 'TN'
        },
        
        {
            name: 'UTAH',
            abbreviation: 'UT'
        },
        {
            name: 'VERMONT',
            abbreviation: 'VT'
        },
        {
            name: 'VIRGIN ISLANDS',
            abbreviation: 'VI'
        },
        {
            name: 'VIRGINIA',
            abbreviation: 'VA'
        },
        
        {
            name: 'WEST VIRGINIA',
            abbreviation: 'WV'
        },
        {
            name: 'WISCONSIN',
            abbreviation: 'WI'
        },
        {
            name: 'WYOMING',
            abbreviation: 'WY'
        }
    ];
    var stateSelect = document.getElementById('stateList');

    for (var i = 0; i < usStates.length; i++) {
        var option = document.createElement("option");
        option.text = usStates[i].abbreviation;
        option.value = usStates[i].abbreviation;
        stateSelect.add(option);

    }

    document.getElementById('stateList').onchange = function() {

        filterData(1, this.value);
    }

}
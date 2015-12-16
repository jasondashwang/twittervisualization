var w = 400;
var h = 400;
var r = h/2;

var color = d3.scale.category20c();

var platforms = [];
var platform = {};

for(var i = 0; i < results.length; i++){
	if(platform.hasOwnProperty(results[i]['source'])){
		platform[results[i]['source']] += 1;
	} else {
		platform[results[i]['source']] = 1;
	}
}

var counts = [];

for (var key in platform){
	counts.push(platform[key]);
}

counts.sort(function(a,b){return b - a});

if(counts.length > 5){

	var other = 0;

	for (var q = 4; q < counts.length; q++){
		other += counts[q];
	}

	platforms.push({name: 'Other', count: other});

	for (var key in platform){
		if(platform[key] >= counts[3]){
			var hold = {};
			hold.name = key;
			hold.count = platform[key];
			platforms.push(hold);
		}
	}
} else {
	for (var key in platform){
		var hold = {};
		hold.name = key;
		hold.count = platform[key];
		platforms.push(hold);
	}
}

var svg = d3.select('#platform').append("svg:svg");

var vis = svg.data([platforms]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")");
var pie = d3.layout.pie().value(function(d){return d.count;});

var arc = d3.svg.arc().outerRadius(r);

var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
arcs.append("svg:path")
    .attr("fill", function(d, i){
        return color(i);
    })
    .attr("d", function (d) {
        return arc(d);
    })
    .attr("title", function (d, i){
    	return platforms[i].name;
    });

arcs.append("svg:text").attr("transform", function(d){
			d.innerRadius = 0;
			d.outerRadius = r;
    return "translate(" + arc.centroid(d) + ")";}).attr("text-anchor", "middle").text( function(d, i) {
    return platforms[i].count;}
		);


// Credits to http://jsfiddle.net/ragingsquirrel3/qkHK6/

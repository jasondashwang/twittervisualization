var w = 400;
var h = 400;
var r = h/2;

var color = d3.scale.category10();

var languages = [];
var language = {};

for(var i = 0; i < results.length; i++){
	if(language.hasOwnProperty(results[i]['language'])){
		language[results[i]['language']] += 1;
	} else {
		language[results[i]['language']] = 1;
	}
}

var counts = [];

for (var key in language){
	counts.push(language[key]);
}

counts.sort(function(a,b){return b - a});

if(counts.length > 5){

	var other = 0;

	for (var q = 4; q < counts.length; q++){
		other += counts[q];
	}

	languages.push({name: 'Other', count: other});

	for (var key in language){
		if(language[key] >= counts[3]){
			var hold = {};
			hold.name = key;
			hold.count = language[key];
			languages.push(hold);
		}
	}
} else {
	for (var key in language){
		var hold = {};
		hold.name = key;
		hold.count = language[key];
		languages.push(hold);
	}
}

var vis = d3.select('#language').append("svg:svg").data([languages]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")");
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
    	return languages[i].name;
    });

arcs.append("svg:text").attr("transform", function(d){
			d.innerRadius = 0;
			d.outerRadius = r;
    return "translate(" + arc.centroid(d) + ")";}).attr("text-anchor", "middle").text( function(d, i) {
    return languages[i].count;}
		);


// Credits to http://jsfiddle.net/ragingsquirrel3/qkHK6/
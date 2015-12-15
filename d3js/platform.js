var platforms = [];
var platform = {};

for(var i = 0; i < results.length; i++){
	if(platform.hasOwnProperty(results[i]['source'])){
		platform[results[i]['source']] += 1;
	} else {
		platform[results[i]['source']] = 0;
	}
}

console.log(platform)

for (var key in platform){
	var hold = {};
	hold.name = key;
	hold.count = platform.key;
	platforms.push(hold);
}

console.log(platforms);

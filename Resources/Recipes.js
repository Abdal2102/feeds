var recipeWin = Ti.UI.currentWindow;

var data = [];

var xhr = Ti.Network.createHTTPClient();

var search = Ti.UI.createSearchBar({
	showCancel:true,
	height:43,
	top:0
});

search.addEventListener("change", function(e){
	Ti.API.info("user searching for: " +e.value);
});

search.addEventListener("return", function(e){
	search.blur();
});

search.addEventListener("cancel", function(e){
	search.blur();
})



var tblRecipe = Ti.UI.createTableView({
	data:data,
	height:366,
	width:320,
	top:0,
	left:0,
	search:search,
	filterAttribute:"filter"
});

recipeWin.add(tblRecipe);

xhr.onload = function(){
	
	//var xml = this.responseXML;
	
	var jsonObj = JSON.parse(this.responseText);
	
	Ti.API.info(jsonObject.query.results.item.length);
	
	items = xml.documentElements.getItemsByTagName("item");
	
	//for(var i=0; i<items.length; i++){
	for(var i=0; i<jsonObject.query.results.item.length; i++){	
		var row = Ti.UI.createTableViewRow({
			hasChild:true,
			className:"recipe-row",
			//filter:items.item(i).getElementByTagName("titles").item(0).text
			filter:jsonObject.query.results.item[i].title
		});
		
		var titleLabel = Ti.UI.createLabel({
			text:jsonObject.query.results.item[i].title,
			//(xml)text: items.item(i).getItemsByTagName("title").item(0).text,
			font:{fontSize: 14, fontWeight: "bold"},
			left:60,
			top:5,
			height:20,
			width:210
		});
		
		var descLabel = Ti.UI.createLabel({
			text:jsonObject.query.results.item[i].description,
			//(xml)text: items.item(i).getElementByTagName("title").item(0).text,
			font:{fontSize: 10, fontWeight:"normal"},
			left:60,
			top:25,
			height:40,
			width:200
		}) ;
		if(descLabel.text==""){
			descLabel.text = "Unavailable";
		}
		
		var icImg = Ti.UI.createImageView({
			image:"images/Kellz.jpg",
			width:"auto",
			height:"auto",
			left:10,
			right:10
		});
		row.add(titleLabel);
		row.add(descLabel);
		row.add(icImg);
		
		data.push(row);
	}
}


xhr.onerror = function(){
	Ti.API.error(this.status + " - " + this.statusText);
}

xhr.open("GET", "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20feed%20where%20url%3D'http%3A%2F%2Fwww.cuisine.com.au%2Ffeed%2Fall-recipes'&format=json&diagnostics=true");

xhr.send();

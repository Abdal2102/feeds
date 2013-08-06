Ti.UI.setBackgroundColor('#000');

var tabGrp = Ti.UI.createTabGroup();

var winR = Ti.UI.createWindow({
	title:"Recipes",
	url:"Recipes.js",
	top:0,
	left:0,
	height:"auto",
	width:"auto"
})

var tab1 = Ti.UI.createTab({
	title:"Recipes",
	window:winR
});

var winF = Ti.UI.createWindow({
	title:"Favorites",
	url:"Favorites.js",
	top:0,
	left:0,
	height:"auto",
	width:"auto"
});

var tab2 = Ti.UI.createTab({
	title:"Favorites",
	window:winF
});

tabGrp.addTab(tab1);
tabGrp.addTab(tab2);

tabGrp.open();

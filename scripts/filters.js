function loadLocations(target) 
{
	jQuery.ajax({                                
		url: "API/locations/get/all.php",                    
		type: "GET",
		dataType: "json",
		data: {},
		success: function(data)
		{
			construct = "<h3>Område</h3>";
			
			construct += "<ul>";
			for (var key in data) 
			{
				construct += "<li>";
				
				construct += "<input type='checkbox' id='loc-parent-" + key + "' data-parent='true' data-locid='" + key + "' onchange='locationChanged(this);' />";
				construct += "<label for='loc-parent-" + key + "'>" + data[key].name + "</label>";
				
				var item = data[key];
				 
					construct += "<ul class='sub' id='loc-submenu-" + key + "'>"
					for (var subkey in item.sub)
					{
						construct += "<li><input type='checkbox' id='loc-child-" + subkey + "' data-parent-id='" + key + "' onchange='locationChanged(this);' data-locid='" + subkey + "' /><label for='loc-child-" + subkey + "'>" + item.sub[subkey].name + "</li>";
					}
					construct += "</ul>";
				construct += "</li>";
			}
			construct += "</ul>";
			construct += "<div class='expander' onclick='expand(this);'></div>";
			
			$("#" + target).html(construct);
		}
	});
}

function expand (elem)
{
	var target = $(elem).parent();
	try
	{
		var goSmall = (target[0].getAttribute('style').indexOf("max-height") > -1 ? false : true);
	}
	catch(err)
	{
		var goSmall = true;
	}
	
	if (goSmall)
	{
		target.css("max-height", "36vh");
		$(elem).removeClass("open");
	}
	else
	{
		target.css("max-height", "");
		$(elem).addClass("open");
	}
	
	$("#filters").css("position", "absolute");
	setTimeout(function() {
		$("#filters").css("position", "fixed");
	}, 100);
}

function locationChanged(item)
{
	$("#filters").css({"position": "absolute" , "top" : $("#resultsWrapper").scrollTop()}); 
	setTimeout(function() {
		$("#filters").css({"position": "fixed" , "top" : 0}); 
	}, 100);

	var itemID = $(item).data("locid");
	if ($(item).data("parent"))
	{
		if (item.checked)
		{
			counties[itemID] = itemID;
		}
		else
		{
			delete counties[itemID];
			
			$("#loc-submenu-" + itemID + " li input").each(function() {
				delete munics[$(this).data("locid")];
				$(this)[0].checked = false;
			});
		}
	}
	else
	{
		if (item.checked)
		{
			munics[itemID] = itemID;
			
			delete counties[$(item).data("parent-id")];
		}
		else
		{
			delete munics[itemID];
		}
	}
	
	page = 0;
	loadNewResults($("#mainSearchTxt").val());					
}

function loadCategories(target)
{
	jQuery.ajax({                                
		url: "API/categories/get/all.php",                    
		type: "GET",
		dataType: "json",
		data: {},
		success: function(data)
		{
			construct = "<h3>Kategorier</h3>";
			
			construct += "<ul>";
			for (var key in data) 
			{
				construct += "<li>";
				
				construct += "<input type='checkbox' id='cat-parent-" + key + "' data-parent='true' data-catid='" + key + "' onchange='catChanged(this);' />";
				construct += "<label for='cat-parent-" + key + "'>" + data[key].name + "</label>";
				
				var item = data[key];
				 
					construct += "<ul class='sub' id='cat-submenu-" + key + "'>"
					for (var subkey in item.sub)
					{
						construct += "<li><input type='checkbox' id='cat-child-" + key + "-" + subkey + "' data-parent-id='" + key + "' onchange='catChanged(this);' data-catid='" + subkey + "' /><label for='cat-child-" + key + "-" + subkey + "'>" + item.sub[subkey].name + "</li>";
					}
					construct += "</ul>";
				construct += "</li>";
			}
			construct += "</ul>";
			construct += "<div class='expander' onclick='expand(this);'></div>";
			
			$("#" + target).html(construct);
		}
	});
}

function catChanged(item)
{
	$("#filters").css({"position": "absolute" , "top" : $("#resultsWrapper").scrollTop()}); 
	setTimeout(function() {
		$("#filters").css({"position": "fixed" , "top" : 0});
	}, 100);

	var itemID = $(item).data("catid");
	if ($(item).data("parent"))
	{
		if (item.checked)
		{
			parentCats[itemID] = itemID;
		}
		else
		{
			delete parentCats[itemID];
			
			$("#cat-submenu-" + itemID + " li input").each(function() {
				delete childCats[$(this).data("locid")];
				$(this)[0].checked = false;
			});
		}
	}
	else
	{
		if (item.checked)
		{
			childCats[itemID] = itemID;
			delete parentCats[$(item).data("parent-id")];
		}
		else
		{
			delete childCats[itemID];
		}
	}
	
	page = 0;
	loadNewResults($("#mainSearchTxt").val());	
}
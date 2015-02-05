var searching = false;
var globalQuery = "";
var searchType = "b";

function fadebg(dark)
{
	if (dark)
	{
		$("#splash .darken").addClass("active");
		$("#splash .header").css("z-index", 0);
	}
	else
	{
		$("#splash .darken").removeClass("active");
		$("#splash .header").css("z-index", 2);
	}
}

$("#mainSearchTxt").focus(function() 
{
	fadebg(true);
});

$("#mainSearchTxt").blur(function()
{
	setTimeout(function() { 
		if (!searching)
		{
			fadebg(false);
		}
	}, 100);
});


$("#mainSearchTxt").keyup(function(e) 
{
	if (e.keyCode == 13)
	{
		$("#quickresults").html("");	
		setPage("q/" + searchType, [$("#mainSearchTxt").val()]);
		$(window).trigger('hashchange');
	}
	else
	{
		if (e.keyCode == 8 && $("#mainSearchTxt").val().length == 0)
		{
			$("#quickresults").html("");
		}
		else if (e.keyCode != 16 && e.keyCode != 17 && e.keyCode != 18 && e.keyCode != 20 && e.keyCode != 38 && e.keyCode != 40)
		{
			populateQuickResults();
		}
	}
});

var request;
function populateQuickResults()
{
	var records;

	var q = $("#mainSearchTxt").val();
	
	if (typeof(request) != "undefined")
	{
		request.abort();
	}
	
	request = jQuery.ajax({                                
		url: "API/business/get/quickresults",                    
		type: "GET",
		dataType: "json",
		data: {q : q},
		success: function(data)
		{
			records = data;
			
			$("#quickresults").html("");
	
			var construct = "";
			var i = 0;
			records.forEach(function(item)
			{
				construct += "<li class='quickselector' id='quick_select_" + i + "' data-index='" + i + "' data-id='" + item.ID + "'>";
					construct += "<span>" + item.businessName + "</span>";
					construct += "<font>" + item.type + "</font>";
				construct += "</li>";
				i++;
			});
			$("#quickresults").html(construct);
		}
	});
}

var currentQuickIndex = -1;
$(document).keydown(function(e) {
	if ($("#quickresults").html().length > 0)
	{
		if (e.keyCode == 38)
		{
			//up
			if (currentQuickIndex < 1)
			{
				currentQuickIndex = 7;
			}
			else
			{
				currentQuickIndex--;
			}
		}
		else if(e.keyCode == 40)
		{
			//down
			if (currentQuickIndex == 7)
			{
				currentQuickIndex = 0;
			}
			else
			{
				currentQuickIndex++;
			}
		}
		
		if (e.keyCode == 40 || e.keyCode == 38)
		{
			$(".quickselector").removeClass("active");
			$("#quick_select_" + currentQuickIndex).addClass("active");
			placeCaretAtEnd($("#mainSearchTxt")[0]);
		}
		else
		{
			currentQuickIndex = -1;
		}
	}
});

$("#mainSearchBtn").click(function () 
{
	setPage("q/" + searchType, [$("#mainSearchTxt").val()]);
	$(window).trigger('hashchange');
});

$("#quickresults").on("click", "li", function ()
{
	console.log("click");
	$("#mainSearchTxt").val($(this).children("span").html());
	
	searchType = "b";
	setPage("profile", [searchType, $(this).data("id")]);
	$(window).trigger('hashchange');
});

function search(q, type)
{
	if (typeof(request) != "undefined")
	{
		request.abort();
	}
	
	globalQuery = q;

	fadebg(true);
	searching = true;
	
	$("#middleContainer").addClass("active");
	page = 0;
	
	$("#mainSearchTxt").val(q);
	
	loadNewResults(q, type);
	$('body').addClass("searching");
	$("#profile").show();
	$("body").scrollTop(0);
	
	$("#filters").css("overflow-y", "visible");
	$("#filters").click(function() {
		$("#filters").css("overflow-y", "auto");
	});
}

function closeSearch()
{
	searching = false;
	$("#middleContainer").removeClass("active");
	page = 0;
	$('#resultsList').html("");
	$('body').removeClass("searching");
	fadebg(false);
	$("#profile").hide();
	$("#right_add").fadeOut(200);
}

$("#closeSearch").click(function () {
	window.location.hash = "";
	$(window).trigger('hashchange');
});

var spinner = new Spinner({
  lines: 9	, // The number of lines to draw
  length: 6, // The length of each line
  width: 3, // The line thickness
  radius: 5, // The radius of the inner circle
  corners: 1, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#fff', // #rgb or #rrggbb or array of colors
  speed: 2, // Rounds per second
  trail: 0, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: true, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: '50%', // Top position relative to parent
  left: '50%' // Left position relative to parent
});

var page;
var loading = false;
var lastResults = 0;
function loadNewResults(q, type)
{
	if (!loading)
	{
		loading = true;
	
		if (page == 0)
		{
			$('#resultsList').html("");
		}
	
		var resultsLoading = document.createElement("div");
		resultsLoading.className = "resultsLoading";
		resultsLoading.id = "resultsLoading";
		$("#resultsList").append(resultsLoading);
		spinner.spin(resultsLoading);
		
				var childcatlist = "";
		childCats.forEach(function (item) 
		{
			childcatlist += item + "-";
		});
		childcatlist = childcatlist.slice(0,-1);
		
		var parentcatlist = "";
		parentCats.forEach(function (item) 
		{
			parentcatlist += item + "-";
		});
		parentcatlist = parentcatlist.slice(0,-1);
		
		if (type == "b")
		{
			$("#selPrivate").removeClass("active");
			$("#selBusiness").addClass("active");
			$("#filterCategories").show();
		}
		
		else if (type == "p")
		{
			$("#selPrivate").addClass("active");
			$("#selBusiness").removeClass("active");
			$("#filterCategories").hide();
		}
		
		var municslist = "";
		munics.forEach(function (item) 
		{
			municslist += item + "-";
		});
		municslist = municslist.slice(0,-1);
		
		var countieslist = "";
		counties.forEach(function (item) 
		{
			countieslist += item + "-";
		});
		countieslist = countieslist.slice(0,-1);

		
		if (type == "p")
		{
			//Person
			searchUrl = "API/people/get/results.php";
		}
		else if (type == "b")
		{
			//Business
			searchUrl = "API/business/get/results.php";
		}
		else if (type == "x")
		{
			//Both
			searchUrl = "API/combined/get/results.php";
		}
		
		jQuery.ajax({                   
		url: searchUrl,                    
		type: "GET",
		dataType: "json",
		data: {q : q, page: page, childcat : childcatlist, parentcat : parentcatlist, munics: municslist, counties: countieslist},
		success: function(data)
		{
			$("#quickresults").html("");
			
			$(".resultsLoading").remove();
			
			construct = "<div class='banner' id='running_banner" + page + "' ></div>";
			var bannerPage = page;
			
			lastResults = data.length;
			
			data.forEach(function (item) 
			{
				construct += "<li>";
					construct += "<div class='info'>";
						if (item.rank > 1)
						{
							construct += "<div class='sponsored'>sponset</div>";
						}
						
						
						construct += "<div class='inner'>";
							construct += "<a href='javascript: void(0);' onclick=\"setPage('profile', ['" + searchType + "', " + item.ID + "]); $(window).trigger('hashchange');\"><h2>" + item.businessName + "</h2></a>";
							construct += "<h3>" + item.bizAddress + " | " + item.contact + "</h3>";
							construct += "<p>" + item.shortDesc + "</p>";
						construct += "</div>";
						
						construct += "<img class='logo' src='http://finnrett.no/old/common/uploads/business/business-" + item.oldId + "/logo/" + item.logo + "' onclick='profile(" + item.ID + ", \"" + searchType + "\");' onerror='$(this).parent().find(\".inner\").css(\"max-width\", \"570px\"); this.parentNode.removeChild(this);'/>";
						
						construct += "<div class='bot'><a href='javascript: void(0);' onclick='sms(" + item.businessCode + ")'>Få info på SMS (5kr)</a></div>";
					construct += "</div>";
				construct += "</li>";
			});
			
			$("#resultsList").append(construct);
			
			jQuery.ajax({                                
				url: "API/banners/get/search.php",                    
				type: "GET",
				dataType: "json",
				data: {cat: 0},
				success: function(data)
				{
					var re = /(?:\.([^.]+))?$/;
					var construct;
					
					if (re.exec(data[0].bnrImgPath)[1] == "png" || re.exec(data[0].bnrImgPath)[1] == "jpg" || re.exec(data[0].bnrImgPath)[1] == "gif")
					{
						//add is image
						construct = "<img src='" + data[0].bnrImgPath + "' />";
					}
					else if (re.exec(data[0].bnrImgPath)[1] == "swf")
					{
						//add is flash
						construct = constructFlashAdd(data[0].bnrImgPath, "100%", "100%");
					}
					else
					{
						console.log("Error loading add, unknown type");
					}
					
					$("#running_banner" + bannerPage).html(construct);
					
					if (bannerPage == 0)
					{
						var construct = "";
						if (re.exec(data[1].bnrImgPath)[1] == "png" || re.exec(data[1].bnrImgPath)[1] == "jpg" || re.exec(data[0].bnrImgPath)[1] == "gif")
						{
							//add is image
							construct = "<img src='" + data[1].bnrImgPath + "' />";
						}
						else if (re.exec(data[1].bnrImgPath)[1] == "swf")
						{
							//add is flash
							construct = constructFlashAdd(data[1].bnrImgPath, "100%", "100%");
						}
						else
						{
							console.log("Error loading add, unknown type");
						}
						
						$("#right_add").html(construct);
						$("#right_add").fadeIn();
					}
				}
			});
			loading = false;
			page++;
		},
		error: function() {
			spinner.stop();
			$(".resultsLoading").remove();
			$("#resultsList").append("<div class='noresults'>Ingen resultater</div>");
			loading = false;
		}
		});
	}
}

function constructFlashAdd(path, width, height)
{
	var construct;
	
	construct = '<object codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="' + width + '" height="' + height + '">';
	construct += '	<param name="movie" value="http://finnrett.no/old/common/uploads/banner_images/' + path + '">';
	construct += '	<param name="quality" value="high">';
	construct += '	<embed src="http://finnrett.no/old/common/uploads/banner_images/' + path + '" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="' + width + '" height="' + height + '">';
	construct += '</object>';
	
	return construct;
}

var resultsWrapper = document.getElementById("resultsWrapper");
resultsWrapper.onscroll = scrolled;

var noresultsset = false;
function scrolled()
{
	if((resultsWrapper.scrollHeight - resultsWrapper.scrollTop <= resultsWrapper.clientHeight + 120) && searching)
	{
		if (lastResults == 8)
		{
			noresultsset = false;
			loadNewResults($("#mainSearchTxt").val());
		}
		else
		{
			if (!noresultsset)
			{
				$("#resultsList").append("<div class='noresults'>Ingen flere resultater</div>");
				noresultsset = true;
			}
		}
	}
}

function changeType(type, elem)
{
	$("#type_selector li").removeClass("active");;
	$(elem).addClass("active");
	searchType = type;
	setPage("q/" + searchType, [$("#mainSearchTxt").val()]);
	$(window).trigger('hashchange');
}

$(document).click(function(event) { 
    $("#quickresults").html("");
});

function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}
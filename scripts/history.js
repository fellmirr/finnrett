/* History */
/*
window.addEventListener("popstate", function(e) {
	// Get State value using e.state
	console.log(e.state);
	if (e.state["page"] == "front")
	{
		closeSearch();
		$("#profile").hide();
	}
	else if (e.state["page"] == "search")
	{
		if (!profileOpen)
		{
			search(e.state["value"], true);
		}
		else
		{
			closeProfile(true);
		}
	}
	else if (e.state["page"] == "profile")
	{
		profile(e.state["value"], true);
	}
});
*/

function setPage(page, params)
{
	var construct = "#!/" + page;
	
	params.forEach(function (item) {
		construct += "/" + encodeURI(item);
	});

	window.location.hash = construct;
}

window.onhashchange = function () { handlePage(false); };

var overrideHash = false;
function handlePage(onload)
{
	var url = window.location.hash;
	
	if (url.length > 1)
	{
		url = url.split("/");
		var page = url[1];
		if (!onload && !overrideHash)
		{
			if (page == "q")
			{
				search(decodeURI(url[3]), url[2]);
			}
			else if (page == "profile")
			{
				profile(url[3], url[2]);
			}
		}
		else if (onload && !overrideHash)
		{
			if (page == "q")
			{
				search(decodeURI(url[3]), url[2]);
			}
			else if (page == "profile")
			{
				profile(url[3], url[2]);
			}
			onload = false;
		}
		else if (overrideHash)
		{
			overrideHash = false;
		}
	}
	else if (!onload) //If hash is null and not on load, go to homepage
	{
		if (profileOpen)
		{
			closeProfile(true);
			overrideHash = false;
		}
		closeSearch();
		overrideHash = false;
	}
}
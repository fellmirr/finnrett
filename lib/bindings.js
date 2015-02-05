function Bindings()
{
	this.makeTable = function(target, data) 
	{
		var construct = "";

		target = document.getElementById(target);
		target.innerHTML = "";
		
		for (var i = 0; i < data.length; i++)
		{
			if (data[i][1] !== undefined && data[i][1] !== null)
			{
				if (data[i][1].length != 0)
				{
					construct += "<tr>";
						construct += "<td>";
							construct += data[i][0];
						construct += "</td>";
						construct += "<td>";
						
							if (data[i][2] == "link")
							{
								if (data[i][1].indexOf("http://") != 0)
								{
									data[i][1] = "http://" + data[i][1];
								}	
								construct += "<a href='" + data[i][1] + "'>"
							}
							else if (data[i][2] == "binary")
							{
								data[i][1] = (data[i][2] == 0 ? "Nei" : "Ja");
							}
							
							construct += data[i][1];
							
							if (data[i][2] == "link")
							{
								construct += "</a>";
							}
							
						construct += "</td>";
					construct += "</tr>";
				}
			}
		}
		target.innerHTML = construct;
	}
}
String.prototype.capitalize = function() 
{
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function thousandSeperate(x) 
{
	try
	{
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	}
	catch (err)
	{
		return x;
	}
}

function phoneSeperate(x) 
{
	try
	{
		return x.toString().replace(/\B(?=(\d{2})+(?!\d))/g, " ");
	}
	catch (err)
	{
		return x;
	}
}

function rnd(min,max)
{
	return Math.floor(Math.random()*(max-min+1)+min);
}
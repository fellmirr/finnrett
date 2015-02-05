$("#txtNumber").keydown(function (e) {
	if (e.keyCode == 13)
	{
		sendSms();
	}
});

function sendSms()
{
	$("#sms").removeClass("active");
	
	jQuery.ajax({                                
		url: "API/sms/post/q.php",                    
		type: "GET",
		dataType: "text",
		data: {"gsm" : $("#txtNumber").val(), "kodeord" : "FINNRETT", "tekst" : smsBusinessCode, "kortnr" : 2030},
		success: function(data)
		{
			if (data == 'Skriv "FINNRETT din-kode-her", og bruk koden du mottar hvert øyeblikk')
			{
				
			}
			else
			{
				acualSmsRequest();
			}
		}
	});
}

function acualSmsRequest()
{
	jQuery.ajax({                                
		url: "API/sms/post/business.php",                    
		type: "GET",
		dataType: "text",
		data: {"gsm" : $("#txtNumber").val(), "msg" : data},
		success: function(response)
		{
			alert(response);
		}
	});
}

function sms(business)
{
	$("#sms").addClass("active");
	smsBusinessCode = business;
}
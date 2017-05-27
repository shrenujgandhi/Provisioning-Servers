var needle = require("needle");
var os   = require("os");

var config = {};
config.token = process.env.DIGI_TOKEN; 

var headers =
{
	'Content-Type': 'application/json',
	Authorization: 'Bearer ' + config.token
};

var client =
{
	createDroplet: function (dropletName, region, imageName, onResponse)
	{
		var data = 
		{
			"name": dropletName,
			"region": region,
			"size": "512mb",
			"image": imageName,
			// Id to ssh_key already associated with account.
			"ssh_keys": [process.env.DIGI_SSH_KEY],
			"backups": false,
			"ipv6": false,
			"user_data": null,
			"private_networking": null
		};

		console.log ("Attempting to create: " + JSON.stringify(data) );

		needle.post ("https://api.digitalocean.com/v2/droplets", data, {headers:headers,json:true}, onResponse );
	}, 

	getDroplet: function (dropletId, onResponse)
	{
		needle.get ("https://api.digitalocean.com/v2/droplets/" + dropletId, {headers:headers}, onResponse)
	}

};

// #############################################
// #3 Create an droplet with the specified name, region, and image
// Comment out when completed. ONLY RUN ONCE!!!!!
// Write down/copy droplet id.
var name = "sgandhi4" + os.hostname();
var region = "nyc3"; // Fill one in from #1
var image = "ubuntu-14-04-x64"; // Fill one in from #2
var dropletId;

client.createDroplet(name, region, image, function(error, response, body)
{
	// console.log(body);
	var data = response.body;

	// StatusCode 202 - Means server accepted request.
	if(!error && response.statusCode == 202)
	{
		dropletId = data.droplet["id"];
		console.log ("Creating Droplet");
	}
});

// #############################################
// #4 Extend the client to retrieve information about a specified droplet.
// Comment out when done.
// https://developers.digitalocean.com/documentation/v2/#retrieve-an-existing-droplet-by-id
// REMEMBER POST != GET
// Most importantly, print out IP address!
var dropletIp;

var timeoutForIp = setInterval (function() {
	client.getDroplet (dropletId, function (error, response) {
		
		var data = response.body;

		if (data.droplet) {

			if (data.droplet["networks"]["v4"].length != 0)
			{
				console.log("Droplet Created");
				var dropletIp = data.droplet["networks"]["v4"][0]["ip_address"];
				console.log("Droplet Id: ", dropletId)
				console.log("IP Address: ", dropletIp, "\n");
				clearInterval(timeoutForIp);
			}
		}
	})
}, 1000);

// #############################################
// #5 In the command line, ping your server, make sure it is alive!
// ping xx.xx.xx.xx

// #############################################
// #6 Extend the client to DESTROY the specified droplet.
// Comment out when done.
// https://developers.digitalocean.com/documentation/v2/#delete-a-droplet
// HINT, use the DELETE verb.
// HINT #2, needle.delete(url, data, options, callback), data needs passed as null.
// No response body will be sent back, but the response code will indicate success.
// Specifically, the response code will be a 204, which means that the action was successful with no returned body data.
// 	if(!err && resp.statusCode == 204)
// 	{
//			console.log("Deleted!");
// 	}
	
// #############################################
// #7 In the command line, ping your server, make sure it is dead!
// ping xx.xx.xx.xx
// It could be possible that digitalocean reallocated your IP address to another server, so don't fret it is still pinging.
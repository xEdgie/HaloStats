//Api Key
var apiKey = "384505cac652456bb2738ae2f88107c6";

//Playlist IDs
var doublesID = "";
var eliminationID = "";
var mythicArenaID = "";
var slayerID = "";
var swatID = "";
var teamArenaID = "";

//Player Info
var gamertag;
var spartan;

//Doubles Stats
var doublesRank;
var doublesKDA = 0.0;
var doublesKills = 0;
var doublesDeaths = 0;
var doublesAssists = 0;
var doublesGames = 0;
var doublesWins = 0;
var doublesLoses = 0;
var doublesTies = 0;

//Elimination Stats
var eliminationRank;
var eliminationKDA = 0.0;
var eliminationKills = 0;
var eliminationDeaths = 0;
var eliminationAssists = 0;
var eliminationGames = 0;
var eliminationWins = 0;
var eliminationLoses = 0;
var eliminationTies = 0;

//Mythic Arena Stats
var mythicArenaRank;
var mythicArenaKDA = 0.0;
var mythicArenaKills = 0;
var mythicArenaDeaths = 0;
var mythicArenaAssists = 0;
var mythicArenaGames = 0;
var mythicArenaWins = 0;
var mythicArenaLoses = 0;
var mythicArenaTies = 0;

//Slayer Stats
var slayerRank;
var slayerKDA = 0.0;
var slayerKills = 0;
var slayerDeaths = 0;
var slayerAssists = 0;
var slayerGames = 0;
var slayerWins = 0;
var slayerLoses = 0;
var slayerTies = 0;

//Swat Stats
var swatRank;
var swatKDA = 0.0;
var swatKills = 0;
var swatDeaths = 0;
var swatAssists = 0;
var swatGames = 0;
var swatWins = 0;
var swatLoses = 0;
var swatTies = 0;

//Team Arena Stats
var teamArenaRank;
var teamArenaKDA = 0.0;
var teamArenaKills = 0;
var teamArenaDeaths = 0;
var teamArenaAssists = 0;
var teamArenaGames = 0;
var teamArenaWins = 0;
var teamArenaLoses = 0;
var teamArenaTies = 0;

//Functions
///////////////////////////////////////////////////////////////////////////////////////////////////

//Start All Queries
function Start()
{
	getPlaylistId();
	getPlayerInfo();
	getPlayerServiceRecord();
}

//Get Stats for playlist
function getStats(Playlist, Rank, KDA, Kills, Deaths, Assists, Games, Wins, Loses, Ties, ID, json)
{
	var numPlaylists = json.Results[0].Result.ArenaStats.ArenaPlaylistStats.length;

	//Format Output Labels
	document.getElementById(Playlist + "Rank").innerHTML = "Rank: N/A";
	document.getElementById(Playlist + "KDA").innerHTML = "KDA : N/A";
	document.getElementById(Playlist + "Kills").innerHTML = "Kills : N/A";
	document.getElementById(Playlist + "Deaths").innerHTML = "Deaths : N/A";
	document.getElementById(Playlist + "Assists").innerHTML = "Assists : N/A";
	document.getElementById(Playlist + "Games").innerHTML = "Games Played : N/A";
	document.getElementById(Playlist + "Wins").innerHTML = "Wins : N/A";
	document.getElementById(Playlist + "Loses").innerHTML = "Loses : N/A";
	document.getElementById(Playlist + "Ties").innerHTML = "Ties : N/A";

	for(i = 0; i < numPlaylists; i++)
	{
		if(json.Results[0].Result.ArenaStats.ArenaPlaylistStats[i].PlaylistId == ID)
		{
			if (json.Results[0].Result.ArenaStats.ArenaPlaylistStats[i].MeasurementMatchesLeft == 0)
			{
				//Rank
				switch(json.Results[0].Result.ArenaStats.ArenaPlaylistStats[i].Csr.DesignationId)
				{
					case 1:
						Rank = "Bronze";
						break;

					case 2:
						Rank = "Silver";
						break;

					case 3:
						Rank = "Gold";
						break;

					case 4:
						Rank = "Platinum";
						break;

					case 5:
						Rank = "Diamond";
						break;
					
					case 6:
						Rank = "Onyx";
						break;
				}

				if(Rank == "Onyx")
				{
					Rank = Rank + " " + json.Results[0].Result.ArenaStats.ArenaPlaylistStats[i].Csr;
				}
				else
				{
					//Tier
					switch(json.Results[0].Result.ArenaStats.ArenaPlaylistStats[i].Csr.Tier)
					{
						case 1:
							Rank = Rank + " 1";
							break;

						case 2:
							Rank = Rank + " 2";
							break;

						case 3:
							Rank = Rank + " 3";
							break;

						case 4:
							Rank = Rank + " 4";
							break;

						case 5:
							Rank = Rank + " 5";
							break;
						
						case 6:
							Rank = Rank + " 6";
							break;
					}
				}
				//Output
				document.getElementById(Playlist + "Rank").innerHTML = "Rank : " + Rank;
			}
			else
			{
				//Output
				document.getElementById(Playlist + "Rank").innerHTML = "Rank : Not Ranked";
			}

			Kills = parseInt(json.Results[0].Result.ArenaStats.ArenaPlaylistStats[i].TotalKills);
			Deaths = parseInt(json.Results[0].Result.ArenaStats.ArenaPlaylistStats[i].TotalDeaths);
			Assists = parseInt(json.Results[0].Result.ArenaStats.ArenaPlaylistStats[i].TotalAssists);
			Games = parseInt(json.Results[0].Result.ArenaStats.ArenaPlaylistStats[i].TotalGamesCompleted);
			Wins = parseInt(json.Results[0].Result.ArenaStats.ArenaPlaylistStats[i].TotalGamesWon);
			Loses = parseInt(json.Results[0].Result.ArenaStats.ArenaPlaylistStats[i].TotalGamesLost);
			Ties = parseInt(json.Results[0].Result.ArenaStats.ArenaPlaylistStats[i].TotalGamesTied);
			KDA = ((Kills + (1/3 * Assists)) - Deaths) / Games;

			//Output
			document.getElementById(Playlist + "KDA").innerHTML = "KDA : " + KDA.toFixed(1);
			document.getElementById(Playlist + "Kills").innerHTML = "Kills : " + Kills;
			document.getElementById(Playlist + "Deaths").innerHTML = "Deaths : " + Deaths;
			document.getElementById(Playlist + "Assists").innerHTML = "Assists : " + Assists;
			document.getElementById(Playlist + "Games").innerHTML = "Games Played : " + Games;
			document.getElementById(Playlist + "Wins").innerHTML = "Wins : " + Wins;
			document.getElementById(Playlist + "Loses").innerHTML = "Loses : " + Loses;
			document.getElementById(Playlist + "Ties").innerHTML = "Ties : " + Ties;
		}
	}
}


//Api Queries
///////////////////////////////////////////////////////////////////////////////////////////////////

function getPlaylistId()
{
	var xhr = new XMLHttpRequest();

	console.log("Getting Playlist ID's");

	xhr.onreadystatechange = function()
	{
		if (this.readyState === 4 && this.status === 200)
		{
			//Parse Data
			var json = JSON.parse(this.responseText);

			//Extract Data
			for(i = 0; i < json.length; i++)
			{
				//Check the active playlists
				if (json[i].isActive == true)
				{
					//Find playlist id using playlist name
					switch(json[i].name)
					{
						case "Doubles":
							console.log(json[i].name);
							doublesID = json[i].id;
							break;
						
						case "Elimination":
							console.log(json[i].name);
							eliminationID = json[i].id;
							break;

						case "Mythic Arena":
							console.log(json[i].name);
							mythicArenaID = json[i].id;
							break;

						case "Slayer ":
							console.log(json[i].name);
							slayerID = json[i].id;
							break;

						case "SWAT":
							console.log(json[i].name);
							swatID = json[i].id;
							break;

						case "Team Arena":
							console.log(json[i].name);
							teamArenaID = json[i].id;
							break;
					}
				}
			}
		}
    }

    //https://www.haloapi.com/metadata/h5/metadata/playlists
	xhr.open('GET', `https://www.haloapi.com/metadata/h5/metadata/playlists`, true);
	xhr.setRequestHeader("Ocp-Apim-Subscription-Key", apiKey);

	xhr.send();

	getPlayerArenaStats();
}

//Get Arena Stats
function getPlayerArenaStats()
{
	gamertag = document.getElementById("searchPlayer").value;

	var xhr = new XMLHttpRequest();

	console.log("Getting Arena Stats");

	xhr.onreadystatechange = function()
	{
		if (this.readyState === 4 && this.status === 200)
		{
			//Parse Data
			var json = JSON.parse(this.responseText);

			//Extract Data
			document.getElementById("spartanrank").innerHTML = "Spartan Rank : " + json.Results[0].Result.SpartanRank + " / 152"; //$.Results[0].Result.SpartanRank
			
			getStats("doubles", doublesRank, doublesKDA, doublesKills, doublesDeaths, doublesAssists, doublesGames, doublesWins, doublesLoses, doublesTies, doublesID, json);
			getStats("elimination", eliminationRank, eliminationKDA, eliminationKills, eliminationDeaths, eliminationAssists, eliminationGames, eliminationWins, eliminationLoses, eliminationTies, eliminationID, json);
			getStats("mythicArena", mythicArenaRank, mythicArenaKDA, mythicArenaKills, mythicArenaDeaths, mythicArenaAssists, mythicArenaGames, mythicArenaWins, mythicArenaLoses, mythicArenaTies, mythicArenaID, json);
			getStats("slayer", slayerRank, slayerKDA, slayerKills, slayerDeaths, slayerAssists, slayerGames, slayerWins, slayerLoses, slayerTies, slayerID, json);
			getStats("swat", swatRank, swatKDA, swatKills, swatDeaths, swatAssists, swatGames, swatWins, swatLoses, swatTies, swatID, json);
			getStats("teamArena", teamArenaRank, teamArenaKDA, teamArenaKills, teamArenaDeaths, teamArenaAssists, teamArenaGames, teamArenaWins, teamArenaLoses, teamArenaTies, teamArenaID, json);
		}
    }

    //Query : https://www.haloapi.com/stats/h5/servicerecords/arena?players=xEdgie
	xhr.open('GET', `https://www.haloapi.com/stats/h5/servicerecords/arena?players=${gamertag}`, true);
	xhr.setRequestHeader("Ocp-Apim-Subscription-Key", apiKey);

	xhr.send();
}

//Get Player Info
function getPlayerInfo()
{
	var xhr = new XMLHttpRequest();

	console.log("Getting Player Information...");

	xhr.onreadystatechange = function()
	{
		if (this.readyState === 4 && this.status === 200)
		{
			//Parse Data
			var json = JSON.parse(this.responseText);

			//Extract Data
			document.getElementById("gamertag").innerHTML = "Gamertag : " + json.Gamertag;
			document.getElementById("servicetag").innerHTML = "Service Tag : " + json.ServiceTag;
			if(json.Company != null)
			{
				document.getElementById("company").innerHTML = "Spartan Company : " + json.Company.Name;
			}
		}
    }

    //Query : https://www.haloapi.com/profile/h5/profiles/xEdgie/appearance
	xhr.open('GET', `https://www.haloapi.com/profile/h5/profiles/${gamertag}/appearance`, true);
	xhr.setRequestHeader("Ocp-Apim-Subscription-Key", apiKey);

	xhr.send();
}

//Get Service Record
function getPlayerServiceRecord()
{
	var xhr = new XMLHttpRequest();

	console.log("Getting Player Information...");

	xhr.onreadystatechange = function()
	{
		if (this.readyState === 4 && this.status === 200)
		{
			//Parse Data
			var json = JSON.parse(this.responseText);

			//Extract Data
			var progress = (parseInt(json.Results[0].Result.Xp) / 50000000) * 100;
			document.getElementById("xp").innerHTML = "Total XP : " + json.Results[0].Result.Xp + " / 50000000";
			document.getElementById("maxrank").innerHTML = "Progress to Max Rank : " + progress.toFixed(1) + "%";
			//document.getElementById("xpbar").setAttribute("aria-valuenow", progress);
		}
    }

    //Query : https://www.haloapi.com/stats/h5/servicerecords/arena?players=xEdgie
	xhr.open('GET', `https://www.haloapi.com/stats/h5/servicerecords/arena?players=${gamertag}`, true);
	xhr.setRequestHeader("Ocp-Apim-Subscription-Key", apiKey);

	xhr.send();
}

//Broken Queries
///////////////////////////////////////////////////////////////////////////////////////////////////

//Get Player's Spartan
function getPlayerSpartan()
{
	/*gamertag = document.getElementById("searchPlayer").value;

	var xhr = new XMLHttpRequest();

	console.log("Getting Spartan...");

	xhr.onreadystatechange = function()
	{
		if (this.readyState === 4 && this.status === 200)
		{
			var emblem = xhr.responseURL;
			document.getElementById("Spartan").src = emblem
		}
	}

	//https://www.haloapi.com/profile/h5/profiles/{Player}/spartan?size{512}
	//xhr.open('GET', `https://www.haloapi.com/profile/h5/profiles/${gamertag}/spartan?size{512}`, true);
	xhr.open('GET', `https://www.haloapi.com/profile/h5/profiles/xEdgie/spartan?size{512}`, true);
	xhr.setRequestHeader("Ocp-Apim-Subscription-Key", apiKey);

	xhr.send();

	//console.log("Got Spartan.");*/
	


	//Test API Code
	$(function() {
		$.ajax({
			   //"https://www.haloapi.com/profile/h5/profiles/xEdgie/spartan?"
			url: "https://www.haloapi.com/profile/h5/profiles/xEdgie/spartan",
			beforeSend: function(xhrObj){
				// Request headers
				xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", apiKey);
			},
			type: "GET",
			// Request body
			data: "{body}",
		})
		.done(function(data) {
			alert("success");
		})
		.fail(function() {
			alert("error");
		});
	});
}
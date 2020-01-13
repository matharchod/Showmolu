//Use PHP to get a list of tweets in JSON format
//Use the first word or phrase from the tweet as the category for that tweet
//Use the URL from the tweet as the link for its tile 
var Showmolu = (function () {

	//Create persistent storage for Projects in a closure
	var Projects = (function (input) {
		var x;
		return function (input) {
			if (!input) {
				return x;
			} else {
				x = input;
				return x;
			}
		};

	})();

	//Make a synchronous call to get Projects
	var getProjects = (function () {

		//Use AJAX to get the latest tweets
		$.ajax({
			//REAL DATA
			//url: "/_projects/Showmolu/tmhOAuth-master/tweets_json.php?count=200",
			//TEST DATA
			url: "/v2/test-data.json",
			type: "GET",
			dataType: "json",
			async: false,
			success: function (result) {
				Projects(result);
				console.log(result);
			},
			error: function (err) {
				console.log(err);
				alert("Error with JSON: " + err.responseText);
			}
		});

	})();

	//Use the Projects to create tiles	
	var ProjectFactory = function () {

		//Create place to collect tiles for future reference
		var ProjectCollection = [],
			result = Projects();

		for (var i in result) {

			//Use the factory to create each tile
			var tile = {
				projects: result
			};

			ProjectCollection.push(tile);

		};

		Projects(ProjectCollection);

		return Projects();


	};

	//PUBLIC METHODS
	return {

		BehanceProjects: Projects,
		ProjectFactory: ProjectFactory,

	};

})();
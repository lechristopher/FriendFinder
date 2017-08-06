var dataFriend = require('../data/friends.js');

//export api route
module.exports = function (app) {
//all friends
	app.get('/api/friends', function(req, res){
		res.json(dataFriend);
	})

//new friends
	app.post('/api/friends', function(req, res){
		var addFriend = req.body;

//for loop that checks every friend, then will print out data based on response
		for(var i = 0; i < addFriend.scores.length; i++) {
			if(addFriend.scores[i] == "1 (Strongly Disagree)") {
				addFriend.scores[i] = 1;
			} else if(addFriend.scores[i] == "5 (Strongly Agree)") {
				addFriend.scores[i] = 5;
			} else {
				addFriend.scores[i] = parseInt(addFriend.scores[i]);
			}
		}
//stores it in this array
		var differencesArray = [];

//check the differences in scores
		for(var i = 0; i < dataFriend.length; i++) {

			var oldFriend = dataFriend[i];
			var totalDifference = 0;

			for(var i = 0; i < oldFriend.scores.length; i++) {
				var differenceOneScore = Math.floor(oldFriend.scores[k] - addFriend.scores[k]);
				totalDifference += differenceOneScore;
			}

			differencesArray[i] = totalDifference;
		}

		var bestFriendScore = differencesArray[0];
		var bestFriendDefault = 0;

		for(var i = 1; i < differencesArray.length; i++) {
			if(differencesArray[i] < bestFriendScore) {
				bestFriendScore = differencesArray[i];
				bestFriendDefault = i;
			}
		}
//add the new friend
		friendData.push(addFriend);

		res.json(dataFriend[bestFriendDefault]);
	})
}

angular.module('studionic.values',[])

.value('DefaultSettings',{
	version: 1,

	cards: {
		"feedback":{enabled: true, templateUrl: "templates/cards/feedbackCard.html"},
		"data":{enabled: true, templateUrl: "templates/cards/dataCard.html"},
		"lesson":{enabled: true, templateUrl: "templates/cards/lessonCard.html"}
	},
	badges: {
		"speaker":{enabled: true, templateUrl: "templates/badges/speakerBadge.html"},
		"room":{enabled: true, templateUrl: "templates/badges/roomBadge.html"},
		"duration":{enabled: true, templateUrl: "templates/badges/durationBadge.html"}
	}	
});

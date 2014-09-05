angular.module('studionic.values',[])

.value('DefaultSettings',{
	version: 1,

	cards: {
		"feedback":{enabled: true, templateUrl: "templates/cards/feedbackCard.html"},
		"course":{enabled: true, templateUrl: "templates/cards/courseCard.html"}
	},
	badges: {
		"speaker":{enabled: true, templateUrl: "templates/badges/speakerBadge.html"}
	}	
});

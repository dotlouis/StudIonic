angular.module('studionic.values',[])

.value('DefaultSettings',{
	version: 1,
	templateUrl: "templates/cards/",

	//cards
	cardChangelog: {enabled: true },
	cardFeedback: {enabled: true }
});

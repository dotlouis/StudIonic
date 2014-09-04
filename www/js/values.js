angular.module('studionic.values',[])

.value('DefaultSettings',{
	version: 1,
	templateUrl: "templates/",

	cards: {
		"feedback":{enabled: true},
		"course":{enabled: true}
	}
});

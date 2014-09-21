angular.module('studionic.factories', [])

.factory('UserFactory', ['$q', function($q){
	return {
		current: function(){
			var deferred = $q.defer();
			var currentUser = Parse.User.current();
			if(currentUser)
				deferred.resolve(currentUser);
			else
				deferred.reject("No current user");
			return deferred.promise;
		},
		signIn: function(username, password){
			return Parse.User.logIn(username, password);
		},
		logOut: function(){
			Parse.User.logOut();
		},
		signUp: function(username, password){
			return Parse.User.signUp(username, password, {email: username});
		},
		getRoles: function(user){
			var query = new Parse.Query(Parse.Role);
			query.equalTo("users", user);
			return query.find();
		},
		setProfilePicture: function(user, imageData){
			var deferred = $q.defer();
			var profilePicture = new Parse.File("profile_picture.jpg", { base64: imageData });
			// first save the file itself
			profilePicture.save().then(function(savedFile) {
				// then associate the file with the user profilePicture property
				user.set("profilePicture", profilePicture);
				user.save().then(function(){
					// return savedFile
			  		deferred.resolve(savedFile);
				});
			}, function(error) {
				console.log(error);
				deferred.reject(error);
			});
			return deferred.promise;
		},
		get: function(id){
			var query =	new Parse.Query(Parse.User);
			return query.get(id);
		},
		create: function(options){
			return new Course().save({
				// 'start': options.start,
				// 'duration': options.duration,
				// 'teacher': options.teacher.id,
				'lesson': options.lesson,
				'room': options.room
			}).then(function(course){
				console.log(course);
				return course;
			});
		},
		delete: function(course){
			return course.destroy().then(function(success){
				console.log(success);
				return success;
			});
		}
		/*get: function(user){
			var deferred = $q.defer();
			var userdata = {
				fullname: "Larry Page",
				role: "entrepreneur",
				schoolyear: 16,
				schoolname: "Google",
				absences: 2
			};
			deferred.resolve(userdata);
			return	deferred.promise;
		}*/
	};
}])


.factory('SchoolFactory', ['$q', function($q){
	
	var School = Parse.Object.extend('School');

	return {
		setCoverPicture: function(school, imageData){
			var deferred = $q.defer();
			//var currentUser = Parse.User.current();
			var coverPicture = new Parse.File("cover_picture.jpg", { base64: imageData });
			// first save the file itself
			coverPicture.save().then(function(savedFile) {
				// then associate the file with the school coverPicture property
				school.set("coverPicture", coverPicture);
				school.save().then(function(school){
					// return savedFile
			  		deferred.resolve(savedFile);
				}, function(error){
			  		console.log(error);
			  		deferred.reject(error);
			  	});
			}, function(error) {
				console.log(error);
				deferred.reject(error);
			});
			return deferred.promise;
		},
		get: function(id){
			var query =	new Parse.Query('School');
			return query.get(id).then(function(school){
				// do some stuff with school
				return school;
			});
		},
	};
}])

/*
.factory('CourseFactory', ['$q', function($q){
	return {
		get: function(id){
			var deferred = $q.defer();
			var coursedata = {
				name: "Lean Startup",
				room: {fullname: "Amphitheatre Nicolas Tesla", shortname: "Amph. Tesla"},
				datetime: "in 7min",
				fulldatetime: "Wed 17 at 13h",
				duration: "1h30",
				assignements: ["interview a CEO", "do a business model canvas"],
				speakers: ["Steve Blank", "Eric Ries"],
				attendees: ["Googlers"],
				description: "Get out of the building",
				attendeeNumber: 1
			};
			deferred.resolve(coursedata);
			return	deferred.promise;
		}
	};
}])
*/

.factory('CourseFactory', [function(){

	var Course = Parse.Object.extend('Course');

	return {
		getAll: function(){
			var query = new Parse.Query('Course');
			query.include('lesson');
			return query.find().then(function(courses){
				// do some stuff with courses
				return courses;
			});
		},
		get: function(id){
			var query =	new Parse.Query('Course');
			query.include('lesson');
			return query.get(id).then(function(course){
				// do some stuff with course
				return course;
			});
		},
		create: function(options){
			return new Course().save({
				// 'start': options.start,
				// 'duration': options.duration,
				// 'teacher': options.teacher.id,
				'lesson': options.lesson,
				'room': options.room
			}).then(function(course){
				console.log(course);
				return course;
			});
		},
		delete: function(course){
			return course.destroy().then(function(success){
				console.log(success);
				return success;
			});
		}
	};
}])

.factory('LessonFactory', [function(){

	var Lesson = Parse.Object.extend('Lesson');

	return {
		getAll: function(){
			var query = new Parse.Query('Lesson');
			return query.find().then(function(lessons){
				// do some stuff with lessons
				return lessons;
			});

		},
		get: function(id){
			var query =	new Parse.Query('Lesson');
			return query.get(id).then(function(lesson){
				// do some stuff with lesson
				return lesson;
			});
		},
		create: function(options){
			return new Lesson().save({
				'name': options.name
			}).then(function(lesson){
				console.log(lesson);
				return lesson;
			});
		},
		delete: function(lesson){
			return lesson.destroy().then(function(success){
				console.log(success);
				return success;
			});
		}
	};
}])

.factory('SettingFactory', ['$q','DefaultSettings', function($q, DefaultSettings){
	return {
		key: function(index){
			var deferred = $q.defer();
			var keyName = window.localStorage.key(index);
			deferred.resolve(keyName);
			return deferred.promise;
		},
		get: function(key){
			var deferred = $q.defer();
			var value = JSON.parse(window.localStorage.getItem(key) || {});
			deferred.resolve(value);
			return deferred.promise;
		},
		set: function(key, value){
			window.localStorage.setItem(key,JSON.stringify(value));
		},
		remove: function(key){
			window.localStorage.removeItem(key);
		},
		clear: function(){
			window.localStorage.clear();
		},
		setDefault: function(){
			this.set('settings',DefaultSettings);
		}
	}
}]);

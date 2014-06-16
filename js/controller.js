itunesApp.controller('itunesListCtrl', function ($scope, $http) {
	
	$scope.sitename = 'iTunes Search';
	$scope.author = '- by 010pixel';
	$scope.theme = 'theme-default';
	
	$scope.keyword = '2014';
	$scope.entities = ['movie','podcast', 'music', 'musicVideo', 'audiobook', 'shortFilm', 'tvShow', 'software', 'ebook'];
	$scope.entity = 'podcast';
	$scope.titleLimit = '30';
	$scope.collectionLimit = '30';
	
	/*
	$scope.templates = [
							{ name: 'podcast', url: 'templates/podcast.html'},
							{ name: 'movie', url: 'templates/movie.html'}
						];
	$scope.template = $scope.templates[0];
	*/

	$scope.results = [];
	$scope.hasResults = false;
	$scope.processing = true;
	$scope.processClass = "alert-success";
	$scope.resultCount = -1;
	
	$scope.loadResults = function() {
		
		$scope.processing = true;
		
		$scope.url = 'json/data.php?limit=200&term=' + $scope.keyword + '&entity=' + $scope.entity;
		console.log($scope.url);
		
		$http.get(
			$scope.url
		).success(function(data) {
			console.log(data);
			// console.log(data.resultCount);
			$scope.resultCount = data.resultCount;
			$scope.results = data.results;
			if ( data.resultCount > 0 ) {
				$scope.hasResults = true;
				$scope.processClass = "alert-success";
			} else {
				$scope.hasResults = false;
				$scope.processClass = "alert-danger";
			}
			$scope.processing = false;
		});
    };
	
	$scope.change = function() {
		$scope.loadResults();
    };
	
	$scope.filter = function() {
    };
	
	$scope.$watch("keyword", function(query){
	});

	$scope.$watch("entity", function(query){
		$scope.template = { name: $scope.entity, url: 'templates/'+ $scope.entity +'.html'};
		$scope.change();
	});
	
	$scope.loadResults();
});
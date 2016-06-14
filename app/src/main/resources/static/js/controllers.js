'use strict';

angular.module('findyourhashtags.controllers', [])


    .controller('LoginController', function ($scope, $rootScope, $state, $location, Restangular) {

        $scope.login = function(){
            Restangular.all('login').post('username=' + $scope.credentials.username
                + '&password=' + $scope.credentials.password).then(function(resp){
                console.log(resp);
                $location.path("/gifts");

            }, function(resp){
                console.log(resp);
            });
        };

        $scope.logout = function(){
            Restangular.all('logout').post().then(function(resp){
                console.log(resp);
            }, function(resp){
                console.log(resp);
            });
            $location.path('login');

        };
    })

    .controller('TwitterController', function ($scope, $state, TwitterService) {

        TwitterService.getTweets().then(function(resp){
            $scope.tweets = resp;
        });

        $scope.searchForHashtag = function(hashtag) {
            TwitterService.searchForHashtag(hashtag).then(function(resp){
                $scope.tweets = resp;
            });
        };

        $scope.favourite = function(tweetId) {
            TwitterService.favourite(tweetId).then(function(resp){
                console.log(tweetId);
            });
        };

        $scope.unfavourite = function(tweetId) {
            TwitterService.unfavourite(tweetId).then(function(resp){
                console.log(tweetId);
            });
        };

        $scope.retweet = function(tweetId) {
            TwitterService.retweet(tweetId).then(function(resp){
                console.log(tweetId);
            });
        };

        $scope.toggleComment = function(){
            $(function () {
                $('.panel-google-plus > .panel-footer > .input-placeholder, .panel-google-plus > .panel-google-plus-comment > .panel-google-plus-textarea > button[type="reset"]').on('click', function(event) {
                    var $panel = $(this).closest('.panel-google-plus');
                    var $comment;
                    $comment = $panel.find('.panel-google-plus-comment');

                    $comment.find('.btn:first-child').addClass('disabled');
                    $comment.find('textarea').val('');

                    $panel.toggleClass('panel-google-plus-show-comment');

                    if ($panel.hasClass('panel-google-plus-show-comment')) {
                        $comment.find('textarea').focus();
                    }
                });
                $('.panel-google-plus-comment > .panel-google-plus-textarea > textarea').on('keyup', function(event) {
                    var $comment = $(this).closest('.panel-google-plus-comment');

                    $comment.find('button[type="submit"]').addClass('disabled');
                    if ($(this).val().length >= 1) {
                        $comment.find('button[type="submit"]').removeClass('disabled');
                    }
                });
            });
        }

    });



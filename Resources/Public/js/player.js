/*
 * Minimalistic HTML5 Audio Player - jQuery Plugin
 * @requires jQuery v1.4.2 or later
 *
 * Minimalistic HTML5 Audio Player is an html5 audio player
 *
 * Licensed under the MIT:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright (c) 2012-, Nimius Design www.nimius-design.de)
 */
;(function($, window, document, undefined){


	// plugin start
	$.fn.player = function(options){

		// config
		var settings = $.extend({
			volume: 0.8,
			playlistId: 'audio-playlist'

		}, options);

		this.each(function(){

			var $this = $(this),
				$miniPlayer = $this.get(0),
				$playButton = $('.audio-controllerPlay'),
				$nextButton = $('.audio-controllerNext'),
				$prevButton = $('.audio-controllerPrev'),
				$currentlyPlaying = $('.currently-playing'),
				$currentSong = $($miniPlayer).find('source').attr('src');
				$currentSongText = $($miniPlayer).find('source').data('title');

			// set volume
			$miniPlayer.volume = settings.volume;

			// play button click handler
			$('.audio-controllerPlay').on('click', function(e){
				e.preventDefault();
				if($miniPlayer.paused){
					$miniPlayer.play();
					if(!$.trim($('.currently-playing').html()).length){
						$('.currently-playing').text($currentSongText);
					}
					$playButton.removeClass('.audio-controllerPlay').addClass('audio-controllerPause');
				} else {
					$miniPlayer.pause();
					$playButton.removeClass('audio-controllerPause').addClass('audio-controllerPlay');
				}
			});

			// volume knob (depends on external plugin)
			$('#control').knobKnob({
				snap : 10,
				value: 359 * $miniPlayer.volume,
				turn : function(ratio){
					$miniPlayer.volume = ratio;
					// $('.volume-info span').text(Math.round(ratio*100) + '%');
				}
			});

			// playlist
			var playlistId = settings.playlistId,
				$playlistSelector = $('#' + playlistId);
				$playlistArray = $playlistSelector.find('a'),
				playlistArrayLength = $playlistArray.length,
				songNameArray = [];
				songNameTitleArray = [];

			$.each($playlistArray, function(index, val) {
				var $el = $(val);
				var $theSongName = $el.attr('href');
				var $theSongNameTitle = $el.attr('title');
				songNameArray.push($theSongName);
				songNameTitleArray.push($theSongNameTitle);
			});

			// next button click handler
			$('.audio-controllerNext').on('click', function(e){
				e.preventDefault();
				if($miniPlayer.paused === false){

					var $currentSong = $($miniPlayer).find('source').attr('src');
					var $theCurrentIndex = $.inArray($currentSong, songNameArray);

					if($theCurrentIndex < playlistArrayLength-1){
						$theNextSong = songNameArray[$theCurrentIndex+1];
						$theNextSongTitle = songNameTitleArray[$theCurrentIndex+1];
						$this.find('source').attr('src', $theNextSong);
						$miniPlayer.load();
						$miniPlayer.play();
						// $currentlyPlaying.text($theNextSong);
						$currentlyPlaying.text($theNextSongTitle);
					}

				}
			});

			// previous button click handler
			$('.audio-controllerPrev').on('click', function(e){
				e.preventDefault();
				if($miniPlayer.paused === false){

					var $currentSong = $($miniPlayer).find('source').attr('src');
					var $theCurrentIndex = $.inArray($currentSong, songNameArray);

					if($theCurrentIndex !== 0){
						$thePrevSong = songNameArray[$theCurrentIndex-1];
						$thePrevSongText = songNameTitleArray[$theCurrentIndex-1];
						$this.find('source').attr('src', $thePrevSong);
						$miniPlayer.load();
						$miniPlayer.play();
						$currentlyPlaying.text($thePrevSongText);
					}

				}
			});

			// playlist song(s) click event(s)
			$playlistSelector.on('click', 'a', function(e) {
				e.preventDefault();
				$theSong = $(this).attr('href');
				$theSongTitle = $(this).attr('title');
				$this.find('source').attr('src', $theSong);
				$miniPlayer.load();
				$miniPlayer.play();
				$currentlyPlaying.text($theSongTitle);
				$playButton.removeClass('audio-controllerPlay').addClass('audio-controllerPause');

			});

		});

		// returns the object
		return this;

	// plugin end
	};

})(jQuery,window,document);








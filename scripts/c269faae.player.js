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
			playlistId: 'playlist'

		}, options);

		this.each(function(){
			
			var $this = $(this), 
				$miniPlayer = $this.get(0),
				$playButton = $('#play'),
				$nextButton = $('#next'),
				$prevButton = $('#prev'),
				$currentlyPlaying = $('.currently-playing'),
				$currentSong = $($miniPlayer).find('source').attr('src');

			// set volume
			$miniPlayer.volume = options.volume;

			// play button click handler
			$('#play').on('click', function(e){
				e.preventDefault();
				if($miniPlayer.paused){
					$miniPlayer.play();
					if(!$.trim($('.currently-playing').html()).length){
						$('.currently-playing').text($currentSong);
					}
					$playButton.find('i').removeClass('icon-play').addClass('icon-pause');
				} else {
					$miniPlayer.pause();
					$playButton.find('i').removeClass('icon-pause').addClass('icon-play');
				}
			});

			// volume knob (depends on external plugin)
			$('#control').knobKnob({
				snap : 10,
				value: 359 * $miniPlayer.volume,
				turn : function(ratio){
					$miniPlayer.volume = ratio;
					$('.volume-info span').text(Math.round(ratio*100) + '%');
				}
			});

			// playlist
			var playlistId = options.playlistId,
				$playlistSelector = $('#' + playlistId);
				$playlistArray = $playlistSelector.find('a'),
				playlistArrayLength = $playlistArray.length,
				songNameArray = [];

			$.each($playlistArray, function(index, val) {
				var $el = $(val);
				var $theSongName = $el.attr('href');
				songNameArray.push($theSongName);
			});

			// next button click handler
			$('#next').on('click', function(e){
				e.preventDefault();
				if($miniPlayer.paused === false){

					var $currentSong = $($miniPlayer).find('source').attr('src');
					var $theCurrentIndex = $.inArray($currentSong, songNameArray);

					if($theCurrentIndex < playlistArrayLength-1){
						$theNextSong = songNameArray[$theCurrentIndex+1];
						$this.find('source').attr('src', $theNextSong);
						$miniPlayer.load();						
						$miniPlayer.play();
						$currentlyPlaying.text($theNextSong);
					}

				}
			});

			// previous button click handler
			$('#prev').on('click', function(e){
				e.preventDefault();
				if($miniPlayer.paused === false){

					var $currentSong = $($miniPlayer).find('source').attr('src');
					var $theCurrentIndex = $.inArray($currentSong, songNameArray);

					if($theCurrentIndex !== 0){
						$thePrevSong = songNameArray[$theCurrentIndex-1];
						$this.find('source').attr('src', $thePrevSong);
						$miniPlayer.load();						
						$miniPlayer.play();
						$currentlyPlaying.text($thePrevSong);
					}

				}
			});

			// playlist song(s) click event(s)
			$playlistSelector.on('click', 'a', function(e) {
				e.preventDefault();
				$theSong = $(this).attr('href');
				$this.find('source').attr('src', $theSong);
				$miniPlayer.load();						
				$miniPlayer.play();
				$currentlyPlaying.text($theSong);
				$playButton.find('i').removeClass('icon-play').addClass('icon-pause');

			});

		});

		// returns the object
		return this;

	// plugin end
	};

})(jQuery,window,document);








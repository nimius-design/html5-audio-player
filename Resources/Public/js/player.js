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
      // deprecated!!
			playlistId: 'audio-playlist',

      playlist:     '#audio-playlist',
      playlistItem: '.song',

      playlistOGGAttribute:   'data-ogg',
      playlistMP3Attribute:   'data-mp3',
      playlisttitleAttribute:   'title',

      playButton:   '.audio-controllerPlay',
      nextButton:   '.audio-controllerNext',
      prevButton:   '.audio-controllerPrev',
      pauseClass:    'audio-controllerPause',

      currentlyPlaying:   '.currently-playing',

      uploadFolder:     'uploads/tx_nimhtml5audioplayer/',

		}, options);

		this.each(function(){

      // get HTML objects
			var $this = $(this),
				$miniPlayer = $this.get(0),
				$playButton = $(settings.playButton),
				$nextButton = $(settings.nextButton),
				$prevButton = $(settings.prevButton),
				$currentlyPlaying = $(settings.currentlyPlaying),

        // deprecated
				$currentSong = $($miniPlayer).find('source').attr('src');
        // deprecated
				$currentSongText = $($miniPlayer).find('source').data('title');

      var $playlist = $(settings.playlist);
      var $playlistItems = $playlist.find(settings.playlistItem);


      // ============================================================================================================
      //               OBJECTS

      /**
       * The Song object
       * @param  {object} inp object input in the type of {mp3: … ogg: … name: …}
       * @return {void}
       */
      function song(inp){
        if(inp.mp3)  this.mp3 = inp.mp3;
        if(inp.ogg)  this.ogg = inp.ogg;
        if(inp.name)  this.name = inp.name;
        if(inp.id)  this.id = inp.id;
        console.log(inp);
      }


      // ------------------------------------------------------------------

      function knob(){
        $('#control').knobKnob({
          snap : 10,
          value: 359 * player.player.volume,
          turn : function(ratio){
            player.setVolume(ratio);
          }
        });
      }

      // ------------------------------------------------------------------

      function playButton(){
        this.button = $(settings.playButton);
        this.playing;
      }

      playButton.prototype.pause = function(){
        this.button.removeClass(settings.pauseClass);
        this.button.addClass(settings.playButton);
        this.playing = false;
      }

      playButton.prototype.play  = function(){
        this.button.addClass(settings.pauseClass);
        this.button.removeClass(settings.playButton);
        this.playing = true;
      }

      // ------------------------------------------------------------------

      /**
       * Playlist object
       * @return {void}
       */
      function playlist(){
        playlist = this;

        // for some weird reason we have to start at 1 here
        this.currentSong = 1;
        // build the actual playlist
        this.songs = [{},];
        $playlistItems.each(function(n,v){
          console.log([typeof(n),n]);
          var id = n+1;
          playlist.songs.push(new song({
            name: $(this).attr(settings.playlisttitleAttribute) ? $(this).attr(settings.playlisttitleAttribute) : false,
            mp3:  $(this).attr(settings.playlistMP3Attribute) ? $(this).attr(settings.playlistMP3Attribute) : false,
            ogg:  $(this).attr(settings.playlistOGGAttribute) ? $(this).attr(settings.playlistOGGAttribute) : false,
            id:   parseInt(id),
          }));
          $(this).click(function(){
            player.setSong(playlist.songs[id]);
            player.player.load();
            player.play();
          });
        });

        console.log(playlist);
      }

      /**
       * next function: increases current counter and returns the new song object
       * @return {song}
       */
      playlist.prototype.next = function(){
        var nextSong;
        if(this.currentSong+1 < this.songs.length){
          nextSong = this.currentSong+1;
        } else {
          nextSong = 1;
        }

        this.currentSong = nextSong;
        return this.songs[nextSong];
      }

      /**
       * prev function: decreases the current counter and returns the new song object
       * @return {song}
       */
      playlist.prototype.prev = function(){
        var prevSong;
        if(this.currentSong-1 >= 1){
          prevSong = this.currentSong-1;
        } else {
          prevSong = this.songs.length-1;
        }

        this.currentSong = prevSong;
        console.log(["nextSong in playlist.prev d()",prevSong]);
        return this.songs[prevSong];
      }


      // ------------------------------------------------------------------

      /**
       * the player object
       * @param  {object} palyer the player object
       * @return {void}
       */
      function player(player){
        this.player = player;
        this.playButton = new playButton();
        // this.knob = new knob();
        this.playlist = new playlist();
      }

      /**
       * sets the label for the song
       * @param {song} song
       */
      player.prototype.setLabel = function(song){
        console.log(["song in setLabel",song]);
        $currentlyPlaying.html(song.name);
      }

      /**
       * actually sets the song for us
       * @param {song} song a valid song object
       */
      player.prototype.setSong = function(song){
        var out = "";
        if(song.mp3){
          out += '<source src="'+settings.uploadFolder+'/'+song.mp3+'" data-title="'+song.name+'" type="audio/mpeg" preload="auto" />'
        }
        if(song.ogg){
          out += '<source src="'+settings.uploadFolder+'/'+song.ogg+'" data-title="'+song.name+'" type="audio/ogg" preload="auto" />'
        }
        console.log(this.player);
        this.player.innerHTML = out;
        this.setLabel(song);
        this.playlist.currentSong = song.id;
      }

      /**
       * i guess you can guess what this does
       * @return {void}
       */
      player.prototype.next = function(){
        var playing = !this.player.paused;
        this.setSong(this.playlist.next());
        this.player.load();
        if(playing){this.play();}
      }

      /**
       * i guess you can guess what this does
       * @return {void}
       */
      player.prototype.prev = function(){
        var playing = !this.player.paused;
        this.setSong(this.playlist.prev());
        this.player.load();
        if(playing){this.play();}
      }

      player.prototype.play = function(){
        this.setLabel(this.playlist.songs[this.playlist.currentSong]);
        this.player.play();
        this.playButton.play();
      }

      player.prototype.pause = function(){
        this.player.pause();
        this.playButton.pause();
      }

      player.prototype.toggleplay = function(){
        if(this.player.paused){
          this.play();
        } else {
          this.pause();
        }
      }

      player.prototype.setVolume = function(vol){
        this.player.volume = vol;
      }




      player = new player($this.get(0));
      player.knob = new knob();

      player.setSong(player.playlist.songs[player.playlist.currentSong]);


      // =====================================================================
      //                          // EVENT HANDLERS

      $(settings.playButton).click(function(){
        player.play();
      });

      $(settings.pauseClass).click(function(){
        player.pause();
      });

      $(settings.nextButton).click(function(){
        player.next();
      })

      $(settings.prevButton).click(function(){
        player.prev();
      });

		});

		// returns the object
		return this;

	// plugin end
	};

})(jQuery,window,document);








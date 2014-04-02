
/**
* HTML5audioplayer – NIMIUS
* @param  {object} palyer the player object
* @return {void}
*/
function HTML5audioplayer(inp){

  this.settings = merge_options({
    player:           document.querySelector("#audio-wrap audio"),
    playClass:        'audio-controllerPlay',
    pauseClass:       'audio-controllerPause',
    nextClass:        'audio-controllerNext',
    prevClass:       'audio-controllerPrev',
    songSelector:     '#audio-playlist .song',

    knob:             '#control .knob',
    time:             '#control .time',

    uploadFolder:     'uploads/tx_nimhtml5audioplayer/',
  },inp);



  // ===========================================
  //                Functions



  this.play = function(){
    this.setLabel(this.playlist.songs[this.playlist.currentSong]);
    this.player.play();
    this.playButton.play();
  }


  /**
  * sets the label for the song
  * @param {song} song
  */
  this.setLabel = function(song){
    var songs = document.querySelectorAll(this.settings.songSelector);
    for(var i = 0; i < songs.length; i++){
      songs[i].className = "song";
    }
    songs[song.id-1].className = "song active";
  }

  /**
  * actually sets the song for us
  * @param {song} song a valid song object
  */
  this.setSong = function(song){
    var out = "";
    if(song.mp3){
      out += '<source src="'+this.settings.uploadFolder+'/'+song.mp3+'" data-title="'+song.name+'" type="audio/mpeg" preload="auto" />'
    }
    if(song.ogg){
      out += '<source src="'+this.settings.uploadFolder+'/'+song.ogg+'" data-title="'+song.name+'" type="audio/ogg" preload="auto" />'
    }
    //console.log(this.player);
    this.player.innerHTML = out;
    this.setLabel(song);
    this.playlist.currentSong = song.id;
  }

  /**
  * i guess you can guess what this does
  * @return {void}
  */
  this.next = function(){
    var playing = !this.player.paused;
    this.setSong(this.playlist.next());
    this.player.load();
    if(playing){this.play();}
  }

  /**
  * i guess you can guess what this does
  * @return {void}
  */
  this.prev = function(){
    var playing = !this.player.paused;
    this.setSong(this.playlist.prev());
    this.player.load();
    if(playing){this.play();}
  }


  this.pause = function(){
    this.player.pause();
    this.playButton.pause();
  }

  this.toggleplay = function(){
    if(this.player.paused){
      this.play();
    } else {
      this.pause();
    }
  }

  this.setVolume = function(vol){
    this.player.volume = vol;

    if(vol > 0 && vol < 1){
        //console.log(this);
        this.knob.update(vol);
    }
  }

  this.returnSong = function(inp){
    return new song(inp);
  }


    //
    //
    //

    this.setTime = function(time){
        if(time < this.player.seekable.end(0)){
            //console.log(time);
            this.player.currentTime = time;
            //this.time.update(time);
        }
    }

    this.getPercentage = function(){
        return this.player.currentTime / this.player.seekable.end(0);
    }

    this.time = new jimKnopf({
        knob:       this.settings.time,
        thickness:  50,
        class:      "timerunner"
    });

    this.updateTime = function(){
        if(!this.player.paused && this.getPercentage() != 0){
            this.time.update(
                this.getPercentage()
            );
        }
        //console.log(this);
    }

    this.bindTimeUpdate = function(bind){
        if(bind){
            this.timeUpdateInterval = setInterval(this.updateTime.bind(this),100);
        } else {
            clearInterval(this.timeUpdateInterval);
        }
    }

    this.bindTimeUpdate(true);





  //
  // ===============================================
  //                initialization

  HTML5audioplayer = this;

  // define the player for everyone
  this.player = (typeof(this.settings.player) == "object") ? this.settings.player : document.querySelector(this.settings.player);

  // the label for everyone
  // this.label = (typeof(this.settings.currentlyPlaying) == "object") ? this.settings.currentlyPlaying : document.querySelector(this.settings.currentlyPlaying);

  // initialize the play button
  this.playButton = new playButton({
    button: '.'+this.settings.playClass,
    play:   this.settings.playClass,
    pause:  this.settings.pauseClass
  });
  // this.knob = new knob();
  this.playlist = new playlist(this.settings.songSelector);
  // set the first song
  this.setSong(this.playlist.songs[1]);

  this.nextButton = document.querySelector('.' + this.settings.nextClass);
  this.prevButton = document.querySelector('.' + this.settings.prevClass);

  this.knob = new jimKnopf({
    knob:   this.settings.knob,
  })

  this.setVolume(0.999);




  // ================================================
  //                  click handler

  this.playButton.button.onclick = function(){
    HTML5audioplayer.toggleplay();
  }

  this.nextButton.onclick = function(){
    HTML5audioplayer.next();
  }

  this.prevButton.onclick = function(){
    HTML5audioplayer.prev();
  }

  document.querySelector(this.settings.knob).onchange = function(){
        HTML5audioplayer.setVolume(this.value);

  };

  this.time.element.onchange = function(){
      HTML5audioplayer.bindTimeUpdate(false);
      HTML5audioplayer.pause();
      HTML5audioplayer.setTime(this.value * HTML5audioplayer.player.seekable.end(0));
      setTimeout(function(){
          HTML5audioplayer.play();
      },1000);
      HTML5audioplayer.bindTimeUpdate(true);
  }





  // ==============================================
  //
  /**
   * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
   * http://stackoverflow.com/questions/171251/how-can-i-merge-properties-of-two-javascript-objects-dynamically
   *
   * @param obj1
   * @param obj2
   * @returns obj3 a new object based on obj1 and obj2
   */
   function merge_options(obj1,obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
  }


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
    //console.log(inp);
  }


  // ------------------------------------------------------------------

  // function knob(){
  //   $('#control').knobKnob({
  //     snap : 10,
  //     value: 359 * player.player.volume,
  //     turn : function(ratio){
  //       player.setVolume(ratio);
  //     }
  //   });
  // }

  // ------------------------------------------------------------------

  function playButton(inp){
    this.button = (typeof(inp.button) == "object") ? inp.button : document.querySelector(inp.button);
    this.playClass = inp.play;
    this.pauseClass = inp.pause;
    this.playing;

    this.pause = function(){
      this.button.setAttribute("class",this.playClass);
      this.playing = false;
    }

    this.play  = function(){
      this.button.setAttribute("class",this.pauseClass);
      this.playing = true;
    }
  }


      // ------------------------------------------------------------------

  /**
  * Playlist object
  * @return {void}
  */
  function playlist(songSelector){
    playlist = this;
    //console.log(songSelector);

    this.currentSong = 1;
    // build the actual playlist
    this.songs = [{},];

    var s = document.querySelectorAll(songSelector);
    for(var i=0; i<s.length; i++){

      var id = i+1;

      this.songs.push(new song({
        name:   s[i].getAttribute("data-name") ? s[i].getAttribute("data-name") : false,
        mp3:    s[i].getAttribute("data-mp3")  ? s[i].getAttribute("data-mp3")  : false,
        ogg:    s[i].getAttribute("data-ogg")  ? s[i].getAttribute("data-ogg")  : false,
        id:     id,
      }));
      s[i].setAttribute("data-id",id);

      s[i].onclick = function(){
        //console.log(this)
        HTML5audioplayer.setSong(playlist.songs[this.getAttribute("data-id")]);
        HTML5audioplayer.player.load();
        HTML5audioplayer.play();
      }
    }


    /**
    * next function: increases current counter and returns the new song object
    * @return {song}
    */
    this.next = function(){
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
    this.prev = function(){
      var prevSong;
      if(this.currentSong-1 >= 1){
        prevSong = this.currentSong-1;
      } else {
        prevSong = this.songs.length-1;
      }

      this.currentSong = prevSong;
      //console.log(["nextSong in playlist.prev d()",prevSong]);
      return this.songs[prevSong];
    }
  }


  function jimKnopf(inp){

      /*
      initialization
       */
    this.element = (typeof(inp.knob) == "object") ? inp.knob : document.querySelector(inp.knob);

      if(!inp.thickness){
          inp.thickness = 15;
      }

      if(!inp.class){
          inp.class = "p3";
      }

      var P2 = function() {
      };

      P3 = function() {
    };

    P3.prototype = Object.create(Ui.prototype);

    P3.prototype.createElement = function() {
      Ui.prototype.createElement.apply(this, arguments);
      this.addComponent(new Ui.Arc({
        arcWidth: this.width/inp.thickness
      }));
      this.merge(this.options, {arcWidth: this.width/inp.thickness});
      var arc = new Ui.El.Arc(this.options);
      arc.setAngle(this.options.anglerange);
      this.el.node.appendChild(arc.node);
      this.el.node.setAttribute("class", inp.class);
    };

        this.jim = new Knob(this.element, new P3());
        // window.jim = this.jim;


      /*
       ------------------
       */

      this.update = function(num,isPercent){
          if(typeof isPercent !== "undefined" || isPercent){
              num /= 100;
          }
          this.jim.ui.update(num);
      }


  }

}



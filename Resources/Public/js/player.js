/**
 * HTML5audioplayer – NIMIUS
 * @param  {object} palyer the player object
 * @return {void}
 */
function HTML5audioplayer(inp) {

    this.settings = merge_options({
        player: document.querySelector("#audio-wrap audio"),
        playClass: 'audio-controllerPlay',
        pauseClass: 'audio-controllerPause',
        nextClass: 'audio-controllerNext',
        prevClass: 'audio-controllerPrev',
        songSelector: '#audio-playlist .song',

        knob: '#control .knob',
        time: '#control .time',

        uploadFolder: 'uploads/tx_nimhtml5audioplayer/'
    }, inp);


    // ===========================================
    //                Functions

    // Controlling functions, use these to control the player

    /**
     * starts the playback
     */
    this.play = function () {
        this.setLabel(this.playlist.songs[this.playlist.currentSong]);
        this.player.play();
        this.playButton.play();
    }

    /**
     * pauses the playback
     */
    this.pause = function () {
        this.player.pause();
        this.playButton.pause();
    }

    /**
     * toggles the play / pause state
     */
    this.toggleplay = function () {
        if (this.player.paused) {
            this.play();
        } else {
            this.pause();
        }
    }

    /**
     * i guess you can guess what this does
     */
    this.next = function () {
        // see if the player was playing before
        var playing = !this.player.paused;
        this.setSong(this.playlist.next());
        this.player.load();

        // if the player was playing before, then start playing again
        if (playing) {
            this.play();
        }
    }

    /**
     * i guess you can guess what this does
     */
    this.prev = function () {
        // see if the player was playing before
        var playing = !this.player.paused;
        this.setSong(this.playlist.prev());
        this.player.load();

        // if the player was playing before, then start playing again
        if (playing) {
            this.play();
        }
    }

    /**
     * skip to a certain time in the song
     * @param {number} time time in the song in seconds (must be lower than the total length of the song)
     */
    this.setTime = function (time) {
        if (time < this.player.seekable.end(0)) {
            this.player.currentTime = time;
        }
    }

    /**
     * sets the Volume
     * @param {number} vol the volume, between 0.0 (mute) and 1.0 (full)
     */
    this.setVolume = function (vol) {
        this.player.volume = vol;

        if (vol > 0 && vol < 1) {
            //console.log(this);
            this.knob.update(vol);
        }
    }


    // internal functions, unless you know what you are doing, don't use them from outwards

    /**
     * sets the label for the song
     * @param {HTML5audioplayer.song} song
     */
    this.setLabel = function (song) {
        var songs = document.querySelectorAll(this.settings.songSelector);
        for (var i = 0; i < songs.length; i++) {
            songs[i].className = "song";
        }
        songs[song.id - 1].className = "song active";
    }

    /**
     * actually sets the song for us
     * @param {HTML5audioplayer.song} song a valid song object
     */
    this.setSong = function (song) {
        var out = "";
        if (song.mp3) {
            out += '<source src="' + this.settings.uploadFolder + '/' + song.mp3 + '" data-title="' + song.name + '" type="audio/mpeg" preload="auto" />'
        }
        if (song.ogg) {
            out += '<source src="' + this.settings.uploadFolder + '/' + song.ogg + '" data-title="' + song.name + '" type="audio/ogg" preload="auto" />'
        }
        //console.log(this.player);
        this.player.innerHTML = out;
        this.setLabel(song);
        this.playlist.currentSong = song.id;
    }

    /**
     * gets the progress of the song
     * @param {boolean} convertToPercent should be true, if you want percentages (0%-100%), if false it returns floats (0.0 - 1.0)
     * @returns {number}
     */
    this.getPercentage = function (convertToPercent) {
        var time =  this.player.currentTime / this.player.seekable.end(0);
        if(convertToPercent){
            time *= 100;
        }
        return time;
    }

    /**
     * sets the rimerunner to the current position in the song
     */
    this.updateTime = function () {
        if (!this.player.paused && this.getPercentage() != 0) {
            this.timerunner.update(
                this.getPercentage()
            );
        }
        //console.log(this);
    }

    /**
     * binds the updateTime function to an interval every second
     * @param {boolean} bind if true it sets the interval, if false it removes / clears it
     */
    this.bindTimeUpdate = function (bind) {
        if (bind) {
            this.timeUpdateInterval = setInterval(this.updateTime.bind(this), 100);
        } else {
            clearInterval(this.timeUpdateInterval);
        }
    }

    /**
     * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
     * http://stackoverflow.com/questions/171251/how-can-i-merge-properties-of-two-javascript-objects-dynamically
     *
     * @param obj1
     * @param obj2
     * @returns obj3 a new object based on obj1 and obj2
     */
    function merge_options(obj1, obj2) {
        var obj3 = {};
        for (var attrname in obj1) {
            obj3[attrname] = obj1[attrname];
        }
        for (var attrname in obj2) {
            obj3[attrname] = obj2[attrname];
        }
        return obj3;
    }


    //
    // ===============================================
    //                initialization

    // for easier use later on and no scope confusion in the handlers
    HTML5audioplayer = this;

    // sets the player object / element
    // you can input both: a already selected audio element or a selector
    this.player = (typeof(this.settings.player) == "object") ? this.settings.player : document.querySelector(this.settings.player);

    // initialize the play button
    this.playButton = new playButton({
        button: '.' + this.settings.playClass,
        play:   this.settings.playClass,
        pause:  this.settings.pauseClass
    });

    // initialize the playlist object
    this.playlist = new playlist(this.settings.songSelector);

    // set the first song note here: this array starts at 1, cause starting at 0 causes trouble
    this.setSong(this.playlist.songs[1]);

    // sets the next and prev button
    this.nextButton = document.querySelector('.' + this.settings.nextClass);
    this.prevButton = document.querySelector('.' + this.settings.prevClass);

    // initializes the volume knob
    this.knob = new jimKnopf({
        knob: this.settings.knob
    });

    // sets the volume to full volume by default
    this.setVolume(0.999);

    // initialize the timerunner
    this.timerunner = new jimKnopf({
        knob: this.settings.time,
        thickness: 50
    });

    this.timerunner.update(0);

    // bind the update
    this.bindTimeUpdate(true);






    // ================================================
    //                  event handler

    this.playButton.button.onclick = function () {
        HTML5audioplayer.toggleplay();
    }

    this.nextButton.onclick = function () {
        HTML5audioplayer.next();
    }

    this.prevButton.onclick = function () {
        HTML5audioplayer.prev();
    }

    this.knob.element.onchange = function () {
        HTML5audioplayer.setVolume(this.value);
    };

    this.timerunner.element.onchange = function () {
        // first unbind the automatic update every second to avoid the control "jumping around" and pausing the player for the same reason
        HTML5audioplayer.bindTimeUpdate(false);
        HTML5audioplayer.pause();

        // set the actual value (the input ranges from 0.0 to 1.0, so we have to multiply by the total length of the song to get the seconds)
        HTML5audioplayer.setTime(this.value * HTML5audioplayer.player.seekable.end(0));

        // start playing again after 1second
        setTimeout(function () {
            HTML5audioplayer.play();
        }, 1000);

        // bind the timerunner update again
        HTML5audioplayer.bindTimeUpdate(true);
    }

    this.player.onended = function(){
        HTML5audioplayer.next();
        HTML5audioplayer.play();
    }





    // ==============================================
    //                  Objects


    /**
     * The Song object
     * @param  {object} inp object input in the type of {mp3: … ogg: … name: …}
     * @return {void}
     */
    function song(inp) {
        if (inp.mp3)  this.mp3 = inp.mp3;
        if (inp.ogg)  this.ogg = inp.ogg;
        if (inp.name)  this.name = inp.name;
        if (inp.id)  this.id = inp.id;
        //console.log(inp);
    }

    /**
     * the play button
     * @param {object} inp
     */
    function playButton(inp) {
        this.button = (typeof(inp.button) == "object") ? inp.button : document.querySelector(inp.button);
        this.playClass = inp.play;
        this.pauseClass = inp.pause;
        this.playing;

        this.pause = function () {
            this.button.setAttribute("class", this.playClass);
            this.playing = false;
        }

        this.play = function () {
            this.button.setAttribute("class", this.pauseClass);
            this.playing = true;
        }
    }


    /**
     * Playlist object
     * @return {void}
     */
    function playlist(songSelector) {
        playlist = this;

        this.currentSong = 1;
        // build the actual playlist
        this.songs = [
            {}
        ];

        var s = document.querySelectorAll(songSelector);
        for (var i = 0; i < s.length; i++) {

            var id = i + 1;

            this.songs.push(new song({
                name: s[i].getAttribute("data-name") ? s[i].getAttribute("data-name") : false,
                mp3: s[i].getAttribute("data-mp3") ? s[i].getAttribute("data-mp3") : false,
                ogg: s[i].getAttribute("data-ogg") ? s[i].getAttribute("data-ogg") : false,
                id: id
            }));
            s[i].setAttribute("data-id", id);

            s[i].onclick = function () {
                //console.log(this)

                // do not update while changing the song.
                // That can result in timpolling while reloading the content
                HTML5audioplayer.bindTimeUpdate(false);
                HTML5audioplayer.timerunner.update(0);

                HTML5audioplayer.setSong(playlist.songs[this.getAttribute("data-id")]);
                HTML5audioplayer.player.load();
                HTML5audioplayer.play();

                setInterval(HTML5audioplayer.bindTimeUpdate(true),1000);
            }
        }


        /**
         * next function: increases current counter and returns the new song object
         * @return {HTML5audioplayer.song}
         */
        this.next = function () {
            var nextSong;
            if (this.currentSong + 1 < this.songs.length) {
                nextSong = this.currentSong + 1;
            } else {
                nextSong = 1;
            }

            this.currentSong = nextSong;
            return this.songs[nextSong];
        }

        /**
         * prev function: decreases the current counter and returns the new song object
         * @return {HTML5audioplayer.song}
         */
        this.prev = function () {
            var prevSong;
            if (this.currentSong - 1 >= 1) {
                prevSong = this.currentSong - 1;
            } else {
                prevSong = this.songs.length - 1;
            }

            this.currentSong = prevSong;
            //console.log(["nextSong in playlist.prev d()",prevSong]);
            return this.songs[prevSong];
        }
    }


    /**
     * a wrapper for the turning knob library jim knopf
     * @param inp
     */
    function jimKnopf(inp) {

        /*
         initialization
         */
        this.element = (typeof(inp.knob) == "object") ? inp.knob : document.querySelector(inp.knob);

        /**
         * default for thickness
         */
        if (!inp.thickness) {
            inp.thickness = 15;
        }

        /**
         * as taken from one of the examples on the site
         */
        P3 = function() {};
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
        };


        this.jim = new Knob(this.element, new P3());

        /**
         * update the state of the knob
         * @param {number} num either a float between 0.0 - 1.0 or percentage between 0% - 100%
         * @param {boolean} isPercent if true, it indicates, that the given value is to treat as a percentage
         */
        this.update = function (num, isPercent) {
            if (typeof isPercent !== "undefined" || isPercent) {
                num /= 100;
            }
            this.jim.ui.update(num);
        }


    }

}



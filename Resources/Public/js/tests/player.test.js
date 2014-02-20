buster.spec.expose(); // Make spec functions global

var spec = describe("HTML5 audioplayer", function () {
    this.player = new HTML5audioplayer();


    it("should play", function () {
        this.player.play();
        buster.refute(this.player.settings.player.paused);
    });

    it("should pause", function () {
      // (start is a copy of the play test)
      this.player.play();
      buster.refute(this.player.settings.player.paused);

      this.player.pause();
      buster.assert(this.player.settings.player.paused);
    });

    it("should set labels", function () {
      var testSong = this.player.playlist.songs[1];

      this.player.setLabel(testSong);

      buster.assert.equals(
        document.querySelector(this.player.settings.songSelector+".active").innerHTML,
        "I'll be right behind you Josephine"
      );
    });

    it("should set songs", function() {
      var testSong = this.player.playlist.songs[1];

      this.player.setSong(testSong);

      // see if the songs get set correctly
      buster.assert(this.player.player.innerHTML.indexOf(this.player.settings.uploadFolder+"/"+testSong.mp3) != -1);
      buster.assert(this.player.player.innerHTML.indexOf(this.player.settings.uploadFolder+"/"+testSong.ogg) != -1);

      // see if the current Song in the playlist gets set properly
      buster.assert.equals(this.player.playlist.currentSong,testSong.id);

      // we don't have to test if the labels is set correctly, we test this in a seperate case
    });

    it("should skip to the next song", function(){
      // this test assumes that there are only two songs in the playlist
      // reset the current song, just in case
      this.player.setSong(this.player.playlist.songs[1]);
      // test if the preperation for the test above were successfull (may sound stupid, but this is just for safety)
      buster.assert.equals(this.player.playlist.currentSong,1);

      this.player.next();
      buster.assert.equals(this.player.playlist.currentSong,2);

      this.player.next();
      buster.assert.equals(this.player.playlist.currentSong,1);
    });

    it("should go to the previous song", function(){
      // this test assumes that there are only two songs in the playlist
      // reset the current song, just in case
      this.player.setSong(this.player.playlist.songs[2]);
      // test if the preperation for the test above were successfull (may sound stupid, but this is just for safety)
      buster.assert.equals(this.player.playlist.currentSong,2);

      this.player.prev();
      buster.assert.equals(this.player.playlist.currentSong,1);

      this.player.prev();
      buster.assert.equals(this.player.playlist.currentSong,2);
    });

    it("should set the volume", function(){
      this.player.setVolume(0.5);
      buster.assert.equals(this.player.player.volume,0.5);
    });


});
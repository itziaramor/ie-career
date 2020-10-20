if($('#defaultVideo').length) {

  // VIDEO CURRENT STATUS
  var videoIsPlaying = false;
  var dataVideoOri = $('.video-wrapper__video').attr('data-video-caption-ori');
  var dataVideoLanguageOri = $('.video-wrapper__video').attr('data-video-language-ori');
  var dataVideoAlt = $('.video-wrapper__video').attr('data-video-caption-alt');
  var dataVideoLanguageAlt = $('.video-wrapper__video').attr('data-video-language-alt');

  // production
  if (window.location.pathname.indexOf('/en') != -1) {
    var dataVideoOriSubtitle = '../../en/' + dataVideoOri;
    var dataVideoAltSubtitle = '../../en/' + dataVideoAlt;
  } else if (window.location.pathname.indexOf('/es') != -1) {
    var dataVideoOriSubtitle = '../../es/' + dataVideoOri;
    var dataVideoAltSubtitle = '../../es/' + dataVideoAlt;
  }

  // LOAD JWPLAYER DEFAULT CONFIG
  var loadDefaultVideoConfig = function (url) {
    return jwplayer('vc-defaultVideo').setup({
      file: url,
      "tracks": [{
        "kind": "captions",
        "file": dataVideoOriSubtitle,
        "label": dataVideoLanguageOri
      },   
      {
        "kind": "captions",
        "file": dataVideoAltSubtitle,
        "label": dataVideoLanguageAlt
    }],
      height: '100%',
      width: '100%',
      aspectratio: '16:9',
      autostart: true
    });
  };

  // LOAD VIDEO
  var loadVideo = function () {
    videoIsPlaying = true;
    var url = $('#defaultVideo').attr('data-video-source');

    loadDefaultVideoConfig(url);
  };


  // on click hide cover and loadVideo
  $('.video-wrapper__cover').on('click', function(e){
    e.preventDefault();

    $(this).hide();
    loadVideo($('#defaultVideo').attr('data-video-source'));
  });

}

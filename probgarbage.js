<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Grid Demo</title>
    <script src="https://aframe.io/releases/0.7.1/aframe.min.js"></script>
    <script src="https://unpkg.com/aframe-animation-component/dist/aframe-animation-component.min.js"></script>
   
    <script src="https://rawgit.com/mayognaise/aframe-mouse-cursor-component/master/dist/aframe-mouse-cursor-component.min.js"></script>

    <style type="text/css">
      #video-permission {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: white;
          z-index: 10000;
          display: none;
      }

      #video-permission-button {
        position: fixed;
        top: calc(50% - 1em);
        left: calc(50% - 60px);
        width: 120px;
        height: 2em;
      }
    </style>

  </head>
  <body>
    
    <!-- Use components defined in separate files. -->
    <script src="arrow-key-rotation.js"></script>
    <script src="play-on-window-click.js"></script>
    <script src="play-on-vrdisplayactivate-or-enter-vr.js"></script>
    <script src="hide-once-playing.js"></script>

    <!-- Specify our scene. -->
    <a-scene>
      <!-- The original example also has this 180 degree rotation, to appear to be going forward. -->
      <a-videosphere rotation="0 180 0" src="#video" 
                     play-on-window-click
                     play-on-vrdisplayactivate-or-enter-vr>
      </a-videosphere>
      
      <!-- Define camera with zero user height, movement disabled and arrow key rotation added. -->
      <a-camera user-height="0" wasd-controls-enabled="false" arrow-key-rotation>
        <!-- Text element for display messaging.  Hide once video is playing. -->
        <a-entity id="msg" position="0 -0.3 -1.5" text="align:center; 
                width:3;
                wrapCount:100;
                color:red;
                value:Click window to make the video play, if needed."
                hide-once-playing="#video">
        </a-entity>
      </a-camera>      
      
      <!-- Wait for the video to load. -->
      <a-assets>
        <!-- Single source video. -->
        <video id="video" style="display:none" 
               autoplay loop crossorigin="anonymous" playsinline webkit-playsinline>
          <!-- MP4 video source. -->
          <source type="application/x-mpegURL"
          src="https://bitmovin-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd" />
          </video>
        </source>
      </a-assets>
    </a-scene>
    
    <!-- Show a button to switch to the multi-source example that shows detail. -->
    <button onClick="window.location.href='multi-source-detail.html'" style="position:absolute;top:10px;right:10px;">
      Switch to multi-source detail example
    </button>
    <script src="js/AVideoPlayer.js"></script>
    <script type="text/javascript">
      let scene = document.querySelector('a-scene');
      var cursor = document.querySelector('a-cursor');

      /**
      * CINEMA MODE
      */
      scene.lightOff = function() {
        scene.islightOn = true;
        scene.removeAttribute('animation__fogback');
        scene.setAttribute('animation__fog', "property: fog.color; to: #0c192a; dur: 800; easing: easeInQuad;");
      }
      scene.lightOn = function() {
        scene.islightOn = false;
        scene.removeAttribute('animation__fog');
        scene.setAttribute('animation__fogback', "property: fog.color; to: #dbdedb; dur: 800");
      }

      /**
      * AVideoPlayer
      */
      // var videoPlayer = new AVideoPlayer();

      /**
      * CURSOR
      */

      // Cursor
      let hideCursor = function() {
        cursor.removeAttribute('animation__cursorHideLeave');
        cursor.setAttribute('animation__cursorHideEnter', "property: scale; from: 0.6 0.6 0.6; to: 0 0 0; dur: 300; easing: easeInQuad;");
      }
      let showCursor = function() {
        cursor.removeAttribute('animation__cursorHideEnter');
        cursor.setAttribute('animation__cursorHideLeave', "property: scale; from: 0 0 0; to: 0.6 0.6 0.6; dur: 300; easing: easeInQuad;");
      }
      document.querySelector('#video-screen').addEventListener('mouseenter', hideCursor);
      document.querySelector('#video-screen').addEventListener('mouseleave', showCursor);

      // Play button action
      document.querySelector('#control-play').addEventListener('click', function () {
        if (videoPlayer.paused) {
          scene.lightOn()
        } else {
          scene.lightOff();
          hideCursor();
        }
      });
    </script>
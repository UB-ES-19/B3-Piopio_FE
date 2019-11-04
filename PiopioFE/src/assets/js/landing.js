function initLanding(){
  $(document).ready(function () {
    "use strict";

    if ($('.landing-wrapper').length) {

      /* ---- particles.js config ---- */

      if ($('#particles-js').length) {

        particlesJS("particles-js", {
          "particles": {
            "number": {
              "value": 50,
              "density": {
                "enable": true,
                "value_area": 1000
              }
            },
            "color": {
              "value": ["#1a72ff"]
            },

            "shape": {
              "type": "circle",
              "stroke": {
                "width": 5,
                "color": "#1a72ff"
              },
              "fill": {
                "color": "#1a72ff"
              },
              "polygon": {
                "nb_sides": 5
              },
              "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
              }
            },
            "opacity": {
              "value": 0.6,
              "random": false,
              "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
              }
            },
            "size": {
              "value": 4,
              "random": true,
              "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
              }
            },
            "line_linked": {
              "enable": false,
              "distance": 120,
              "color": "#1a72ff",
              "opacity": 0.2,
              "width": 1.6
            },
            "move": {
              "enable": true,
              "speed": 3,
              "direction": "top",
              "random": false,
              "straight": false,
              "out_mode": "out",
              "bounce": false,
              "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
              }
            }
          },
          "interactivity": {
            "detect_on": "canvas",
            "events": {
              "onhover": {
                "enable": true,
                "mode": "grab"
              },
              "onclick": {
                "enable": false
              },
              "resize": true
            },
            "modes": {
              "grab": {
                "distance": 140,
                "line_linked": {
                  "opacity": 1
                }
              },
              "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
              },
              "repulse": {
                "distance": 200,
                "duration": 0.4
              },
              "push": {
                "particles_nb": 4
              },
              "remove": {
                "particles_nb": 2
              }
            }
          },
          "retina_detect": true
        });

      }

    }
  });
}
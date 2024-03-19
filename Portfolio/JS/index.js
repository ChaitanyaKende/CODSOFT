const soundCloud = document.querySelector(".sound-cloud");
const off = document.querySelector("#off");
const on = document.querySelector("#on");
const myAudio = document.querySelector("#myAudio");

off.addEventListener("click", () => soundTrack("off"));
on.addEventListener("click", () => soundTrack("on"));

const soundTrack = (soundState) => {
  if (soundState === "off") {
    on.style.display = "block";
    off.style.display = "none";
    soundCloud.style.color = "#08fdd8 ";
    myAudio.play();
  } else if (soundState === "on") {
    on.style.display = "none";
    off.style.display = "block";
    soundCloud.style.color = "#f50057 ";
    myAudio.pause();
  }
};

// play music end here

const btnBars = document.querySelector(".bars");
const btnTimes = document.querySelector(".times");
const sidenav = document.querySelector(".aside");

btnBars.addEventListener("click", () => myFunc("open"));
btnTimes.addEventListener("click", () => myFunc("close"));

const myFunc = (navCondition) => {
  if (navCondition === "open") {
    sidenav.classList.add("show-nav");
    btnTimes.style.display = "block";
    btnBars.style.display = "none";
  } else if (navCondition === "close") {
    sidenav.classList.remove("show-nav");
    btnTimes.style.display = "none";
    btnBars.style.display = "block";
  }
};

$(document).ready(function () {
  if (
    !$("#myCanvas").tagcanvas(
      {
        textColour: "#08FDD8",
        outlineColour: "transparent",
        reverse: true,
        depth: 0,
        maxSpeed: 0.09,
        weight: true,
      },
      "tags"
    )
  ) {
    //something  went wrong hide the canvas container
    $("myCanvasContainer");
  }
});

// contact me section starts here
const nameInput = document.querySelector(".name");
const emailInput = document.querySelector(".email");
const subjectInput = document.querySelector(".subject");
const textareaInput = document.querySelector(".textarea");

const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  ValidateInput();
});

const ValidateInput = () => {
  let email = emailInput.value;
  let textarea = textareaInput.value;
  if (!email && !textarea) {
    // means if email n textarea is not true
    setError(emailInput.parentElement);
    setError(textareaInput.parentElement);
    showMessage("Please fill in the require inputs ");
  } else if (!email && textarea) {
    setError(emailInput.parentElement);
    showMessage("Oops Email can't be empty");
  } else if (!textarea && email) {
    setError(textareaInput.parentElement);
    showMessage("Please provde a message");
  } else if (email && textarea) {
    emailjs.sendForm(
      "service_4r3r1fd",
      "template_l00w2zc",
      contactForm,
      "sa4MBmMHKpv0nV_YP"
    );

    setSuccess(emailInput.parentElement);
    setSuccess(nameInput.parentElement);
    setSuccess(textareaInput.parentElement);
    showMessage("Message sent successfully", "green");
    textareaInput.value = "";
    emailInput.value = "";
    nameInput.value = "";
    subjectInput.value = "";
  }
};
const setError = (input) => {
  if (input.classList.contains("success")) {
    input.classList.remove("success ");
  } else {
    input.classList.add("error");
  }
};
const setSuccess = (input) => {
  if (input.classList.contains("error")) {
    input.classList.remove("error");
  } else {
    input.classList.add("success");
  }
};

const messageDiv = document.querySelector(".message");

const showMessage = (message, updatecolor) => {
  const divContent = document.createElement("div");
  divContent.textContent = message;
  divContent.classList.add("messege-content");
  divContent.style.backgroundColor = updatecolor;
  messageDiv.prepend(divContent);

  messageDiv.style.transform = `translate(${(0, 0)}%)`;
  setTimeout(() => {
    divContent.classList.add("hide");
    divContent.addEventListener("transitionend", () => {
      divContent.remove();
    });
  }, 5000);
};

// hover effect code

(function (window) {
  var ctx,
    hue,
    logo,
    form,
    buffer,
    target = {},
    tendrils = [],
    settings = {};

  settings.debug = true;
  settings.friction = 0.5;
  settings.trails = 20;
  settings.size = 50;
  settings.dampening = 0.25;
  settings.tension = 0.98;

  Math.TWO_PI = Math.PI * 2;

  // ========================================================================================
  // Oscillator 何问起
  // ----------------------------------------------------------------------------------------

  function Oscillator(options) {
    this.init(options || {});
  }

  Oscillator.prototype = (function () {
    var value = 0;

    return {
      init: function (options) {
        this.phase = options.phase || 0;
        this.offset = options.offset || 0;
        this.frequency = options.frequency || 0.001;
        this.amplitude = options.amplitude || 1;
      },

      update: function () {
        this.phase += this.frequency;
        value = this.offset + Math.sin(this.phase) * this.amplitude;
        return value;
      },

      value: function () {
        return value;
      },
    };
  })();

  // ========================================================================================
  // Tendril hovertree.com
  // ----------------------------------------------------------------------------------------

  function Tendril(options) {
    this.init(options || {});
  }

  Tendril.prototype = (function () {
    function Node() {
      this.x = 0;
      this.y = 0;
      this.vy = 0;
      this.vx = 0;
    }

    return {
      init: function (options) {
        this.spring = options.spring + Math.random() * 0.1 - 0.05;
        this.friction = settings.friction + Math.random() * 0.01 - 0.005;
        this.nodes = [];

        for (var i = 0, node; i < settings.size; i++) {
          node = new Node();
          node.x = target.x;
          node.y = target.y;

          this.nodes.push(node);
        }
      },

      update: function () {
        var spring = this.spring,
          node = this.nodes[0];

        node.vx += (target.x - node.x) * spring;
        node.vy += (target.y - node.y) * spring;

        for (var prev, i = 0, n = this.nodes.length; i < n; i++) {
          node = this.nodes[i];

          if (i > 0) {
            prev = this.nodes[i - 1];

            node.vx += (prev.x - node.x) * spring;
            node.vy += (prev.y - node.y) * spring;
            node.vx += prev.vx * settings.dampening;
            node.vy += prev.vy * settings.dampening;
          }

          node.vx *= this.friction;
          node.vy *= this.friction;
          node.x += node.vx;
          node.y += node.vy;

          spring *= settings.tension;
        }
      },

      draw: function () {
        var x = this.nodes[0].x,
          y = this.nodes[0].y,
          a,
          b;

        ctx.beginPath();
        ctx.moveTo(x, y);

        for (var i = 1, n = this.nodes.length - 2; i < n; i++) {
          a = this.nodes[i];
          b = this.nodes[i + 1];
          x = (a.x + b.x) * 0.5;
          y = (a.y + b.y) * 0.5;

          ctx.quadraticCurveTo(a.x, a.y, x, y);
        }

        a = this.nodes[i];
        b = this.nodes[i + 1];

        ctx.quadraticCurveTo(a.x, a.y, b.x, b.y);
        ctx.stroke();
        ctx.closePath();
      },
    };
  })();

  // ----------------------------------------------------------------------------------------

  function init(event) {
    document.removeEventListener("mousemove", init);
    document.removeEventListener("touchstart", init);

    document.addEventListener("mousemove", mousemove);
    document.addEventListener("touchmove", mousemove);
    document.addEventListener("touchstart", touchstart);

    mousemove(event);
    reset();
    loop();
  }

  function reset() {
    tendrils = [];

    for (var i = 0; i < settings.trails; i++) {
      tendrils.push(
        new Tendril({
          spring: 0.45 + 0.025 * (i / settings.trails),
        })
      );
    }
  }

  function loop() {
    if (!ctx.running) return;

    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#1d1d1d";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.globalCompositeOperation = "lighter";
    ctx.strokeStyle = " #08fdd8";
    // "hsla(" + Math.round(hue.update()) + ",90%,50%,0.25)";
    ctx.lineWidth = 1;

    if (ctx.frame % 60 == 0) {
      console.log(
        hue.update(),
        Math.round(hue.update()),
        hue.phase,
        hue.offset,
        hue.frequency,
        hue.amplitude
      );
    }

    for (var i = 0, tendril; i < settings.trails; i++) {
      tendril = tendrils[i];
      tendril.update();
      tendril.draw();
    }

    ctx.frame++;
    ctx.stats.update();
    requestAnimFrame(loop);
  }

  function resize() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
  }

  function start() {
    if (!ctx.running) {
      ctx.running = true;
      loop();
    }
  }

  function stop() {
    ctx.running = false;
  }

  function mousemove(event) {
    if (event.touches) {
      target.x = event.touches[0].pageX;
      target.y = event.touches[0].pageY;
    } else {
      target.x = event.clientX;
      target.y = event.clientY;
    }
    event.preventDefault();
  }

  function touchstart(event) {
    if (event.touches.length == 1) {
      target.x = event.touches[0].pageX;
      target.y = event.touches[0].pageY;
    }
  }

  function keyup(event) {
    switch (event.keyCode) {
      case 32:
        save();
        break;
      default:
      // console.log(event.keyCode); hovertree.com
    }
  }

  // function letters(id) {
  //   var el = document.getElementById(id),
  //     letters = el.innerHTML.replace("&amp;", "&").split(""),
  //     heading = "";

  //   for (var i = 0, n = letters.length, letter; i < n; i++) {
  //     letter = letters[i].replace("&", "&amp");
  //     heading += letter.trim()
  //       ? '<span class="letter-' + i + '">' + letter + "</span>"
  //       : "&nbsp;";
  //   }

  //   el.innerHTML = heading;
  //   setTimeout(function () {
  //     el.className = "transition-in";
  //   }, Math.random() * 500 + 500);
  // }

  function save() {
    if (!buffer) {
      buffer = document.createElement("canvas");
      buffer.width = screen.availWidth;
      buffer.height = screen.availHeight;
      buffer.ctx = buffer.getContext("2d");

      form = document.createElement("form");
      form.method = "post";
      form.input = document.createElement("input");
      form.input.type = "hidden";
      form.input.name = "data";
      form.appendChild(form.input);

      document.body.appendChild(form);
    }

    buffer.ctx.fillStyle = "#1d1d1d";
    buffer.ctx.fillRect(0, 0, buffer.width, buffer.height);

    buffer.ctx.drawImage(
      canvas,
      Math.round(buffer.width / 2 - canvas.width / 2),
      Math.round(buffer.height / 2 - canvas.height / 2)
    );

    buffer.ctx.drawImage(
      logo,
      Math.round(buffer.width / 2 - logo.width / 4),
      Math.round(buffer.height / 2 - logo.height / 4),
      logo.width / 2,
      logo.height / 2
    );

    window.open(
      buffer.toDataURL(),
      "wallpaper",
      "top=0,left=0,width=" + buffer.width + ",height=" + buffer.height
    );

    // form.input.value = buffer.toDataURL().substr(22);
    // form.submit(); hovertree.com
  }

  window.requestAnimFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (fn) {
        window.setTimeout(fn, 1000 / 60);
      }
    );
  })();

  window.onload = function () {
    ctx = document.getElementById("canvas").getContext("2d");
    ctx.stats = new Stats();
    ctx.running = true;
    ctx.frame = 1;

    logo = new Image();
    logo.src =
      "ht" + "tp://ho" + "vertree.c" + "om/themes/hvtimages/hvtlogo.p" + "ng";

    hue = new Oscillator({
      phase: Math.random() * Math.TWO_PI,
      amplitude: 85,
      frequency: 0.0015,
      offset: 285,
    });

    //   letters("h1");
    //   letters("h2");

    document.addEventListener("mousemove", init);
    document.addEventListener("touchstart", init);
    document.body.addEventListener("orientationchange", resize);
    window.addEventListener("resize", resize);
    window.addEventListener("keyup", keyup);
    window.addEventListener("focus", start);
    window.addEventListener("blur", stop);

    resize();

    if (window.DEBUG) {
      var gui = new dat.GUI();

      // gui.add(settings, 'debug');
      settings.gui.add(settings, "trails", 1, 30).onChange(reset);
      settings.gui.add(settings, "size", 25, 75).onFinishChange(reset);
      settings.gui.add(settings, "friction", 0.45, 0.55).onFinishChange(reset);
      settings.gui.add(settings, "dampening", 0.01, 0.4).onFinishChange(reset);
      settings.gui.add(settings, "tension", 0.95, 0.999).onFinishChange(reset);

      document.body.appendChild(ctx.stats.domElement);
    }
  };
})(window);

// java script end here

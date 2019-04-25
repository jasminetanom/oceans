var mgr;
var pasig_vid;
var manta_vid;
var thermo;
var coral;

var sea_level_data, sea_temp_data;
var data_year;
var alpha_value = 255;
var temp_array = [];
var coral_width = 550;
var cover_array = [];
var cur_cover;

var monk_seal, abalone, blue_whale, right_whale, albatross
var staghorn, seagrass, sea_turtle, vaquita

var baskerville;
var anton;

function setup() {
  baskerville = loadFont("assets/LibreBaskerville-Regular.otf");
  anton = loadFont("assets/Antonio-Regular.ttf");

  textFont(baskerville);

  frameRate(75);

  var cnv = createCanvas(550, 600);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);

  thermo = loadImage("assets/thermometer.png");
  coral = loadImage("assets/coral_reef.png");

  sea_level_data = loadStrings("data/sea_level.csv");
  sea_temp_data = loadStrings("data/sea-surface-temp.csv");
  coral_cover_data = loadStrings("data/coral_cleaned.csv");

  pasig_vid = createVideo("assets/pasig.mp4");
  manta_vid = createVideo("assets/manta.mp4");

  // by default video shows up in separate dom
  // element. hide it and draw it to the canvas
  // instead
  pasig_vid.hide();
  manta_vid.hide();

  monk_seal = loadImage("assets/monk_seal.jpg");
  abalone = loadImage("assets/abalone.jpg");
  blue_whale = loadImage("assets/blue_whale.jpeg");
  right_whale = loadImage("assets/right_whale.jpg");
  albatross = loadImage("assets/albatross.jpg");
  staghorn = loadImage("assets/coral.jpg");
  seagrass = loadImage("assets/seagrass.jpg");
  sea_turtle = loadImage("assets/turtle.jpg");
  vaquita = loadImage("assets/vaquita.jpg");



  mgr = new SceneManager();

  // Preload scenes. Preloading is normally optional
  // ... but needed if showNextScene() is used.
  mgr.addScene(Animation0);
  mgr.addScene(Animation1);
  mgr.addScene(Animation2);
  mgr.addScene(Animation3);
  mgr.addScene(Animation4);
  mgr.addScene(Animation5);
  mgr.addScene(Animation6);
  mgr.addScene(Animation7);
  mgr.addScene(Animation8);
  mgr.addScene(Animation9);
  mgr.addScene(Animation10);
  mgr.addScene(Animation11);
  mgr.addScene(Animation12);
  // mgr.addScene(Animation13);


  mgr.showNextScene();
}

function draw() {
  mgr.draw();
}

function mousePressed() {
  mgr.handleEvent("mousePressed");
}


// =============================================================
// =                         BEGIN SCENES                      =
// =============================================================
function Animation0() {

  this.draw = function() {
    background(0, 160, 176);

    push();
    noStroke();
    fill(237, 201, 81);
    textSize(36);
    textFont(anton);
    text("WHAT HAVE", 80, 231);
    text("WE DONE", 80, 269);
    text("TO OUR", 80, 307);
    text("OCEANS?", 80, 345);
    pop();

    push();
    noStroke();
    fill("white");
    textSize(18);
    text("Find out by clicking 'next'", 80, 375);
    text("whenever the button appears.", 80, 400);
    pop();

    push();
    noStroke();
    fill("black");
    rect(80, 425, 70, 30);

    push();
    fill("white");
    textSize(16);
    text("next >", 90, 445);
    pop();

    pop();

  }

  this.mousePressed = function() {
    if ((mouseX > 80) && (mouseX < 150) && (mouseY > 425) && (mouseY < 445)) {
      this.sceneManager.showNextScene();
    }
  }

}

function Animation1() {
  var start_1;

  this.setup = function() {
    background(255);
    data_year = 0;
    start_1 = frameCount;
    frameRate(120);
  }

  this.draw = function() {
    if (data_year == 0) {
      push();
      noStroke();
      fill("white");
      rect(0, 0, 550, 600);
      pop();
    }

    push();
    noStroke();
    fill(237, 201, 81);
    textSize(36);
    textFont(anton);
    text("WE'VE", 80, 231);
    text("HEATED UP", 80, 269);
    text("AND ACIDIFIED", 80, 307);
    text("OUR OCEANS.", 80, 345);
    pop();

    new_fc = frameCount - start_1 - 4;

    var level_line = sea_level_data[new_fc + 2];
    var temp_line = sea_temp_data[new_fc + 8];
    var coral_line = coral_cover_data[new_fc + 2];

    if ((new_fc > 0) && (new_fc < 1607)) {
      var level_values = level_line.split(',');
      var level = float(level_values[1]);

      if (new_fc < 135) {
        var temp_values = temp_line.split(',');
        var temp = float(temp_values[1]);
        temp_array.push(temp + 0.4700088);
      }

      if (new_fc < 131) {
        var cover_values = coral_line.split(',');
        var cover = float(cover_values[1]);
        cover_array.push(cover);
      }

      mod_fc = new_fc % 12;

      stroke(0, 160, 176);

      if (mod_fc == 1) {
        push();
        noStroke();
        fill(0, 160, 176);
        textSize(42);
        textFont(anton);
        text(data_year + 1880, 440, 80);
        pop();

        fill(0, 160, 176, alpha_value);
        beginShape();
        vertex(0, 650);
        vertex(0, 550 - 1.5 * (level + 183));
        curveVertex((mod_fc - 1) * 50, 500 - 1.5 * (level + 183));

      } else if (mod_fc == 0) { // December
        push();
        noStroke();
        fill(255);
        rect(400, 40, 200, 50);

        pop();

        mod_fc = 12;
        data_year++;
        alpha_value -= 1.5;

        curveVertex((mod_fc - 1) * 50, 500 - 1.5 * (level + 183));
        vertex(550, 500 - 1.5 * (level + 183));
        vertex(550, 650);
        endShape(CLOSE);

      } else {
        curveVertex((mod_fc - 1) * 50, 500 - 1.5 * (level + 183));
      }

      if ((mod_fc == 1) && (data_year < temp_array.length)) { // January
        cur_temp = temp_array[data_year];
      }

      if ((mod_fc == 1) && (data_year < cover_array.length)) { // January
        cur_cover = 500 + cover_array[data_year] * 5;

      }

      push();
      image(thermo, 445, 110);
      noStroke();
      fill(204, 51, 63);
      ellipse(473, 446, 40, 40);

      var delta = 100 * cur_temp;
      rect(466, 275 - delta, 15, 162 + delta);
      rect
      fill(0);

      textSize(12);
      text("0", 530, 270);
      text("+1", 530, 270 - 132 + 2);
      text("-1", 530, 270 + 132 - 4);
      pop();


    }

    push();

    image(coral, -350, 280);

    push();
    fill(0, 180);
    rect(cur_cover, 500, 50000000, 550);
    pop();

    pop();

    push();
    stroke(0);
    strokeWeight(4);
    fill(255);
    textSize(42);

    if ((data_year < cover_array.length) && (cover_array[data_year] != 0)) {
      text(str(cover_array[data_year]) + "%", 330, 570);

    } else if (cover_array[data_year] != 0) {
      text("-48%", 330, 570);
    }

    textSize(18);
    text("coral", 460, 548);
    text("cover", 460, 563);
    textSize(12);
    text("vs. 1985", 462, 575);
    pop();

    push();
    noStroke();
    fill(0);
    textSize(24);
    text("sea level rise since 1880 (cm)", 40, 50);
    pop();

    push();
    noStroke();
    fill(0);
    textSize(16);

    for (var tick = -183; tick < 100; tick += 10) {
      var mark = tick + 183;
      if (mark % 20 == 0) {
        if (mark / 10 > 0) {
          text(mark / 10, 30, (500 - 1.5 * mark) + 6);
        }
      }
    }

    pop();

    push();
    noStroke();
    fill(0);
    textSize(24);
    text("sea", 410, 350);
    text("surface", 360, 375);
    text("temp", 385, 400);
    textSize(18);
    text("vs. 1880 (°F)", 340, 425);
    pop();


    push();
    strokeWeight(2);
    stroke(0);
    line(20, -height, 20, height);

    for (var y = -height + 20; y < height; y += 30) {
      line(15, y, 25, y);
    }

    line(-width, 500, width, 500);

    for (var x = -width; x < width; x += 50) {
      line(x, 495, x, 505);
    }
    pop();

    push();
    strokeWeight(2);
    stroke(255);
    for (var x = -width; x < width; x += 50) {
      line(x, 500, x, 505);
    }
    pop();

    push();
    noStroke();
    fill(0);
    textSize(16);
    text(" J        F       M        A        M         J         J         A        S        O        N      D", 0, 490);
    pop();

    push();
    noStroke();
    fill(255);
    textSize(16);
    text("       -90     -80    -70     -60     -50     -40    -30     -20     -10        0  (%)", 0, 520);

    pop();

    if (new_fc > 1610) {
      push();
      noStroke();
      fill("black");
      rect(80, 355, 70, 30);

      push();
      fill("white");
      textSize(16);
      text("next >", 90, 375);
      pop();

      pop();
    }
  }

  this.mousePressed = function() {
    if ((mouseX > 80) && (mouseX < 150) && (mouseY > 355) && (mouseY < 385)) {
      this.sceneManager.showNextScene();
    }
  }
}

function Animation2() {
  var start_2;

  this.setup = function() {
    start_2 = frameCount;
  }

  this.draw = function() {

    background(0, 160, 176);
    image(pasig_vid, 0, 0, 550, 600);
    pasig_vid.loop(); // set the video to loop and start playing

    push();
    noStroke();
    fill(237, 201, 81);
    textSize(36);
    textFont(anton);
    text("WE'VE", 80, 231);
    text("THROWN GARBAGE", 80, 269);
    text("INTO OUR SEAS", 80, 307);
    text("AND RIVERS ...", 80, 345);
    pop();

    push();
    noStroke();
    fill(255);
    textSize(18);
    text("Hard to believe, but this is a tributary", 80, 375);
    text("of the Pasig River in Manila, Phillipines.", 80, 400);
    text("All the trash here eventually", 80, 425);
    text("empties into the ocean.", 80, 450);
    pop();

    if (frameCount - start_2 > 120) {
      push();
      noStroke();
      fill("black");
      rect(80, 475, 70, 30);

      push();
      fill("white");
      textSize(16);
      text("next >", 90, 495);
      pop();

      pop();
    }
  }

  this.mousePressed = function() {
    if ((mouseX > 80) && (mouseX < 150) && (mouseY > 475) && (mouseY < 495)) {
      this.sceneManager.showNextScene();
    }
  }
}


function Animation3() {
  var start_3;

  this.setup = function() {
    start_3 = frameCount;
  }

  this.draw = function() {
    background(0, 160, 176);
    image(manta_vid, 0, 0, 550, 600);
    // image
    manta_vid.loop(); // set the video to loop and start playing

    push();
    noStroke();
    fill(237, 201, 81);
    textSize(36);
    textFont(anton);
    text("... AND", 80, 231);
    text("FILLED UP", 80, 269);
    text("OUR OCEANS", 80, 307);
    text("WITH PLASTICS.", 80, 345);
    pop();

    push();
    noStroke();
    fill(255);
    textSize(18);
    text("What you don't even see,", 80, 375);
    text("are the microplastics", 80, 400);
    text("that harm species of all sizes.", 80, 425);
    pop();

    if (frameCount - start_3 > 120) {
      push();
      noStroke();
      fill("black");
      rect(80, 450, 70, 30);

      push();
      fill("white");
      textSize(16);
      text("next >", 90, 470);
      pop();

      pop();
    }
  }

  this.mousePressed = function() {
    if ((mouseX > 80) && (mouseX < 150) && (mouseY > 450) && (mouseY < 470)) {
      this.sceneManager.showNextScene();
    }
  }
}

function Animation4() {

  var fish_full = [52.67,
    52.67,
    50.27,
    50.27,
    43.98,
    43.98,
    42.63,
    50.0,
    50.0,
    45.95,
    45.95,
    43.35,
    43.35,
    43.35,
    49.73,
    49.73,
    47.17,
    47.17,
    47.17,
    47.17,
    52.71,
    52.71,
    52.71,
    51.51,
    51.51,
    52.83,
    57.47,
    57.47,
    61.28,
    61.28,
    58.11
  ]

  var fish_not = [30.67,
    30.67,
    31.55,
    31.55,
    31.41,
    31.41,
    30.53,
    31.38,
    31.38,
    29.28,
    29.28,
    29.61,
    29.61,
    29.61,
    26.63,
    26.63,
    25.4,
    25.4,
    25.4,
    25.4,
    22.92,
    22.92,
    22.92,
    20.52,
    20.52,
    14.68,
    12.66,
    12.66,
    9.98,
    9.98,
    10.53
  ]

  var fish_over = [16.67,
    16.67,
    18.18,
    18.18,
    24.61,
    24.61,
    26.84,
    18.62,
    18.62,
    24.77,
    24.77,
    27.04,
    27.04,
    27.04,
    23.64,
    23.64,
    27.44,
    27.44,
    27.44,
    27.44,
    24.38,
    24.38,
    24.38,
    27.97,
    27.97,
    32.49,
    29.87,
    29.87,
    28.74,
    28.74,
    31.36
  ]

  var start_fc

  this.setup = function() {
    start_fc = frameCount;
    background(0, 160, 176);
    frameRate(20);
  }

  this.draw = function() {

    push();
    noStroke();
    fill(0);
    textSize(36);
    textFont(anton);
    text("WE'VE", 80, 231);
    text("DEPLETED", 80, 269);
    text("OUR OCEANS", 80, 307);
    text("OF FISH.", 80, 345);
    pop();

    push();
    noStroke();
    fill(0);
    textSize(18);
    text("100% of total global fish stocks", 20, 35);
    text("0%", 20, height - 45);
    text("1983", 20, height - 25);
    text("2013", width - 65, height - 25);

    text("Overexploited", 300, 100);
    text("Fully exploited", 380, 340);
    text("Not yet fully exploited", 170, 500);


    pop();

    var fish_fc = frameCount - start_fc;

    var fish_over_y = fish_over[fish_fc] / 100 * 590
    var fish_full_y = fish_full[fish_fc] / 100 * 590
    var fish_not_y = fish_not[fish_fc] / 100 * 590

    var fish_x = 11 + 17 * fish_fc

    push();
    noStroke();
    fill(204,51,63);
    rect(fish_x, 10, 17, fish_over_y);
    pop();

    push();
    noStroke();
    fill(235,104,65);
    rect(fish_x, fish_over_y, 17, fish_full_y);
    pop();

    push();
    noStroke();
    fill("white");
    rect(fish_x, fish_full_y + fish_over_y, 17, fish_not_y);
    pop();

    if (frameCount - start_fc > 60) {
      push();
      noStroke();
      fill("black");
      rect(80, 355, 70, 30);

      push();
      fill("white");
      textSize(16);
      text("next >", 90, 375);
      pop();

      pop();
    }
  }

  this.mousePressed = function() {
    if ((mouseX > 80) && (mouseX < 150) && (mouseY > 355) && (mouseY < 385)) {
      this.sceneManager.showNextScene();
    }
  }
}

function Animation5() {

  this.draw = function() {
    background(0, 160, 176);

    push();
    noStroke();
    fill(237, 201, 81);
    textSize(36);
    textFont(anton);
    text("AND WE'VE", 80, 231);
    text("HURT", 80, 269);
    text("SO MANY", 80, 307);
    text("SPECIES.", 80, 345);
    pop();

    push();
    noStroke();
    fill("white");
    textSize(18);
    text("Let's learn about", 80, 375);
    text("some of them:", 80, 400);

    pop();
    push();
    noStroke();
    fill("black");
    rect(80, 425, 70, 30);

    push();
    fill("white");
    textSize(16);
    text("next >", 90, 445);
    pop();

    pop();

  }

  this.mousePressed = function() {
    if ((mouseX > 80) && (mouseX < 150) && (mouseY > 425) && (mouseY < 445)) {
      this.sceneManager.showNextScene();
    }
  }
}

function Animation6() {
  this.draw = function() {
    background(0, 160, 176);
    image(monk_seal, 0, 0, 550, 300);

    push();
    noStroke();
    fill(237, 201, 81);
    textSize(36);
    textFont(anton);
    text("MONK SEALS", 80, 345);
    pop();

    push();
    noStroke();
    fill("white");
    textSize(16);
    text("Threats to the Hawaiian monk seal include\nentanglement with fishing gear, lack of food, loss\nof breeding areas due to erosion and disease.\nIn the Mediterranean, coastal development and\nhuman interactions can displace the seals from\ntheir habitat. People have also hunted them\nfor their oil, and to reduce competition with\nour fishing, as monk seals eat commercially\nimportant fish and other animals. ", 80, 375);
    pop();

    push();
    noStroke();
    fill("black");
    rect(400, 550, 70, 30);

    push();
    fill("white");
    textSize(16);
    text("next >", 410, 570);
    pop();

    pop();

  }

  this.mousePressed = function() {
    if ((mouseX > 400) && (mouseX < 470) && (mouseY > 550) && (mouseY < 570)) {
      this.sceneManager.showNextScene();
    }
  }

}

function Animation7() {

  this.draw = function() {
    background(0, 160, 176);
    image(abalone, 0, 0, 550, 300);

    push();
    noStroke();
    fill(237, 201, 81);
    textSize(36);
    textFont(anton);
    text("WHITE ABALONE", 80, 345);
    pop();

    push();
    noStroke();
    fill("white");
    textSize(16);

    text("The White Abalone's California population\ncollapsed almost two decades before it was listed,\nnot long after a commercial fishery for the shelled\nmollusk opened in the 1970s. The species still\nhasn't recovered, largely because males and\nfemales of the sedentary abalones need to be in\nclose proximity in order to reproduce—\na difficult task when there aren't many abalones\nout there in the first place.", 80, 375)

    pop();
    push();
    noStroke();
    fill("black");
    rect(400, 550, 70, 30);

    push();
    fill("white");
    textSize(16);
    text("next >", 410, 570);
    pop();

    pop();

  }

  this.mousePressed = function() {
    if ((mouseX > 400) && (mouseX < 470) && (mouseY > 550) && (mouseY < 570)) {
      this.sceneManager.showNextScene();
    }
  }

}

function Animation8() {
  this.draw = function() {
    background(0, 160, 176);
    image(albatross, 0, 0, 550, 300);

    push();
    noStroke();
    fill(237, 201, 81);
    textSize(36);
    textFont(anton);
    text("SHORT-TAILED ALBATROSS", 80, 345);
    // text("ALBATROSS", 80, 375);
    pop();

    push();
    noStroke();
    fill("white");
    textSize(16);


    text("In the 1940s, their population plummeted\nfrom tens of millions to such a small number\nthat they were believed to be extinct. Their\ndecline was due to hunting for their feathers\nand damage to their breeding islands. Along with\nother albatross species, they are often caught\nmistakenly by longline fishing gear and can\nmistake plastic for food. In 2008, it was estimated\nthat only 2,000 of the birds remained.", 80, 375)

    pop();
    push();
    noStroke();
    fill("black");
    rect(400, 550, 70, 30);

    push();
    fill("white");
    textSize(16);
    text("next >", 410, 570);
    pop();

    pop();

  }

  this.mousePressed = function() {
    if ((mouseX > 400) && (mouseX < 470) && (mouseY > 550) && (mouseY < 570)) {
      this.sceneManager.showNextScene();
    }
  }

}

function Animation9() {
  this.draw = function() {
    background(0, 160, 176);
    image(seagrass, 0, 0, 550, 300);

    push();
    noStroke();
    fill(237, 201, 81);
    textSize(36);
    textFont(anton);
    text("JOHNSON'S SEAGRASS", 80, 345);
    pop();

    push();
    noStroke();
    fill("white");
    textSize(16);

    text("The flowing green stalks of Johnson's seagrass\nplay an important role in coastal ecosystems\nwhere they act as nursery grounds for small\nlarval fish, and are eaten by the also-endangered\nWest Indian manatee and green sea turtle.\nAlready the rarest seagrass in the U.S. due to\nits limited distribution, it is threatened by\ndisturbance from boats, dredging, storm waves,\nand poor water quality.", 80, 375)

    pop();

    push();
    noStroke();
    fill("black");
    rect(400, 550, 70, 30);

    push();
    fill("white");
    textSize(16);
    text("next >", 410, 570);
    pop();

    pop();

  }

  this.mousePressed = function() {
    if ((mouseX > 400) && (mouseX < 470) && (mouseY > 550) && (mouseY < 570)) {
      this.sceneManager.showNextScene();
    }
  }

}

function Animation10() {
  this.draw = function() {
    background(0, 160, 176);
    image(sea_turtle, 0, 0, 550, 300);

    push();
    noStroke();
    fill(237, 201, 81);
    textSize(36);
    textFont(anton);
    text("SEA TURTLES", 80, 345);
    pop();

    push();
    noStroke();
    fill("white");
    textSize(16);


    text("All six of the species of sea turtles found in U.S.\nwaters are listed as endangered under the\nEndangered Species Act. Sea turtles face a\nvariety of threats in both the ocean (like getting\n entangled in fishing gear) and on land (such as\nartificial lights confusing newborn hatchlings).", 80, 375)

    pop();

    push();
    noStroke();
    fill("black");
    rect(400, 550, 70, 30);

    push();
    fill("white");
    textSize(16);
    text("next >", 410, 570);
    pop();

    pop();

  }

  this.mousePressed = function() {
    if ((mouseX > 400) && (mouseX < 470) && (mouseY > 550) && (mouseY < 570)) {
      this.sceneManager.showNextScene();
    }
  }

}

function Animation11() {
  var bars = [true, true, true, true, true, true, true];

  this.draw = function() {
    background("white");
    push();
    noStroke();
    fill("black");
    textSize(18);
    text("☐ Our energy use", 80, 40);
    text("☐ Our oil and gas consumption", 80, 100);
    text("☐ Our materialism and consumer culture", 80, 160);
    text("☐ Our plastic use", 80, 400);
    text("☐ Our seafood consumption", 80, 460);
    text("☐ Our development and use of beaches", 80, 520);
    text("☐ Our tourism and marine recreation", 80, 580);
    pop();

    if (mouseY <= 60) {
      bars[0] = false;
    }

    if ((mouseY > 60) && (mouseY <= 120)) {
      bars[1] = false;
    }

    if ((mouseY > 120) && (mouseY <= 180)) {
      bars[2] = false;
    }

    if ((mouseY > 360) && (mouseY <= 420)) {
      bars[3] = false;
    }

    if ((mouseY > 420) && (mouseY <= 480)) {
      bars[4] = false;
    }

    if ((mouseY > 480) && (mouseY <= 540)) {
      bars[5] = false;
    }

    if ((mouseY > 540) && (mouseY <= 600) && (mouseX < 400)) {
      bars[6] = false;
    }

    push();
    line(0, 60, 550, 60);
    line(0, 120, 550, 120);
    line(0, 180, 550, 180);
    line(0, 360, 550, 360);
    line(0, 420, 550, 420);
    line(0, 480, 550, 480);
    line(0, 540, 550, 540);
    pop();


    if (bars[0]) {
      push();
      noStroke();
      fill(106,74,60);
      rect(0, 0, 550, 60);
      pop();
    }

    if (bars[1]) {
      push();
      noStroke();
      fill(204,51,63);
      rect(0, 60, 550, 60);
      pop();
    }

    if (bars[2]) {
      push();
      noStroke();
      fill(235,104,65);
      rect(0, 120, 550, 60);
      pop();
    }

    if (bars[3]) {
      push();
      noStroke();
      fill(163,169,72);
      rect(0, 360, 550, 60);
      pop();
    }

    if (bars[4]) {
      push();
      noStroke();
      fill(0, 160, 176);
      rect(0, 420, 550, 60);
      pop();
    }

    if (bars[5]) {
      push();
      noStroke();
      fill(81,91,171);
      rect(0, 480, 550, 60);
      pop();
    }

    if (bars[6]) {
      push();
      noStroke();
      fill(146,93,170);
      rect(0, 540, 550, 60);
      pop();
    }


    push();
    noStroke();
    fill(237, 201, 81);
    textSize(36);
    textFont(anton);
    text("MAYBE, JUST MAYBE,", 80, 227);
    text("WE COULD BE, AND SHOULD BE", 80, 264);
    text("MORE MINDFUL OF", 80, 303);
    text("SOME THINGS WE DO.", 80, 340);
    pop();


    push();
    noStroke();
    fill("black");
    rect(400, 310, 70, 30);
    pop
    push();
    fill("white");
    textSize(16);
    text("next >", 410, 330);
    pop();
    pop();

  }

  this.mousePressed = function() {
    if ((mouseX > 400) && (mouseX < 470) && (mouseY > 320) && (mouseY < 340)) {
      this.sceneManager.showNextScene();
    }
  }
}

// function Animation11() {
//
//   this.draw = function() {
//     background(0, 160, 176);
//
//     push();
//     noStroke();
//     fill(237, 201, 81);
//     textSize(24);
//     textFont(anton);
//
//
//     text("With every drop of water you drink,", 80, 215);
//     text("every breath you take,", 80, 245);
//     text("you're connected to the sea.", 80, 275);
//     text("No matter where on Earth you live.", 80, 305);
//     text("Most of the oxygen in the atmosphere", 80, 335);
//     text("is generated by the sea.", 80, 365);
//     pop();
//
//     push();
//     noStroke();
//     fill("white");
//     textSize(18);
//     // text("Find out by clicking 'next'", 80, 375);
//     text("-- Sylvia Earle, Oceanographer", 80, 400);
//     pop();
//
//     push();
//     noStroke();
//     fill("black");
//     rect(80, 425, 70, 30);
//
//     push();
//     fill("white");
//     textSize(16);
//     text("next >", 90, 445);
//     pop();
//
//     pop();
//
//   }
//
//   this.mousePressed = function() {
//     if ((mouseX > 80) && (mouseX < 150) && (mouseY > 425) && (mouseY < 445)) {
//       this.sceneManager.showNextScene();
//     }
//   }
//
// }

function Animation12() {

  this.draw = function() {
    background(0, 160, 176);

    push();
    noStroke();
    fill(237, 201, 81);
    textSize(24);
    textFont(anton);

    // "With every drop of water you drink, every breath you take,  No matter where on Earth you live. Most of the oxygen in the atmosphere is generated by the sea."

    text("I HOPE FOR YOUR HELP,", 80, 215);
    text("TO EXPLORE AND PROTECT THE WILD OCEAN", 80, 245);
    text("IN WAYS THAT WILL RESTORE THE HEALTH AND,", 80, 275);
    text("IN DOING SO, SECURE THE HOPE FOR HUMANKIND.", 80, 305);
    text("HEALTH TO THE OCEAN MEANS HEALTH FOR US.", 80, 335);

    pop();

    push();
    noStroke();
    fill("white");
    textSize(18);
    // text("Find out by clicking 'next'", 80, 375);
    text("-- Sylvia Earle, Oceanographer", 80, 370);
    pop();
  }

  this.mousePressed = function() {
    this.sceneManager.showNextScene();
  }

}

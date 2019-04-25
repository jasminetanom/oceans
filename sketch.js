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
  // mgr.addScene(Animation12);

  mgr.showNextScene();
}

function draw() {
  mgr.draw();
}

function mousePressed() {
  mgr.handleEvent("mousePressed");
}

function keyPressed() {
  // You can optionaly handle the key press at global level...
  switch (key) {
    case '1':
      mgr.showScene(Animation1);
      break;
    case '2':
      mgr.showScene(Animation2);
      break;
    case '3':
      mgr.showScene(Animation3);
      break;
    case '4':
      mgr.showScene(Animation4);
      break;
    case '5':
      mgr.showScene(Animation5);
      break;
    case '6':
      mgr.showScene(Animation6);
      break;
    case '7':
      mgr.showScene(Animation7);
      break;
    case '8':
      mgr.showScene(Animation8);
      break;
    case '9':
      mgr.showScene(Animation9);
      break;
    case '10':
      mgr.showScene(Animation10);
      break;
    case '11':
      mgr.showScene(Animation11);
      break;
  }

  // ... then dispatch via the SceneManager.
  mgr.handleEvent("keyPressed");


}


// =============================================================
// =                         BEGIN SCENES                      =
// =============================================================
function Animation1() {
  this.setup = function() {
    background(255);
    data_year = 0;
  }

  this.draw = function() {

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

    new_fc = frameCount - 4;

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
      // var delta = 132 * cur_temp;
      var delta = 100 * cur_temp;
      rect(466, 275 - delta, 15, 162 + delta);
      rect
      fill(0);
      // textFont(merriweather);
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
    text("J          F          M          A         M           J           J           A           S          O          N         D", 0, 490);
    pop();

    push();
    noStroke();
    fill(255);
    textSize(16);
    text("        -90      -80     -70     -60      -50     -40     -30     -20     -10         0   (%)", 0, 520);

    pop();

    if (new_fc > 1610) {
      push();
      noStroke();
      fill("black");
      rect(80, 355, 70, 30);

      push();
      fill("white");
      textSize(18);
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
    text("AND RIVERS.", 80, 345);
    pop();

    push();
    noStroke();
    fill(255);
    textSize(18);
    text("Hard to believe, but this is a tributary", 80, 375);
    text("of the Pasig River in Manila, Phillipines.", 80, 400);
    text("The trash here eventually empties into the ocean.", 80, 425);
    pop();

    if (frameCount - start_2 > 120) {
      push();
      noStroke();
      fill("black");
      rect(80, 450, 70, 30);

      push();
      fill("white");
      textSize(18);
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
      fill("black");
      rect(80, 450, 70, 30);

      push();
      fill("white");
      textSize(18);
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
    text("Fully exploited", 400, 340);
    text("Not yet fully exploited", 170, 500);


    pop();

    var fish_fc = frameCount - start_fc;

    var fish_over_y = fish_over[fish_fc] / 100 * 590
    var fish_full_y = fish_full[fish_fc] / 100 * 590
    var fish_not_y = fish_not[fish_fc] / 100 * 590

    var fish_x = 11 + 17 * fish_fc

    push();
    noStroke();
    fill("red");
    rect(fish_x, 10, 17, fish_over_y);
    pop();

    push();
    noStroke();
    fill("pink");
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
      textSize(18);
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
    textSize(18);
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
    text("Threats to the Hawaiian monk seal include entanglement\nwith fishing gear, lack of food, loss of breeding areas\ndue to erosion and disease. In the Mediterranean, coastal\ndevelopment and human interactions can displace the\nseals from their habitat. People have also hunted them\nfor their oil, and to reduce competition with our fishing,\nas monk seals eat commercially important fish\nand other animals. ", 80, 375);
    pop();

    push();
    noStroke();
    fill("black");
    rect(400, 550, 70, 30);

    push();
    fill("white");
    textSize(18);
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

    text("The White Abalone's California population collapsed\nalmost two decades before it was listed, not long after a\ncommercial fishery for the shelled mollusk opened in \nthe 1970s. The species still hasn't recovered, largely\nbecause males and females ofthe sedentary abalones\nneed to be in close proximity in order to reproduce\n—a difficult task when there aren't many abalones out\nthere in the first place.", 80, 375)

    pop();
    push();
    noStroke();
    fill("black");
    rect(400, 550, 70, 30);

    push();
    fill("white");
    textSize(18);
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


    text("In the 1940s, the short-tailed albatross population\nplummeted from tens of millions to such a small number\nthat they were believed to be extinct. Their decline was\ndue to hunting for their feathers and damage to their\nbreeding islands from volcanic activity. Today they aren't\nhunted, but along with other albatross species, they\nare often caught mistakenly by longline fishing gear\nand can mistake plastic for food. In 2008, it was\nestimated that only 2,000 of the birds remained.", 80, 375)

    pop();
    push();
    noStroke();
    fill("black");
    rect(400, 550, 70, 30);

    push();
    fill("white");
    textSize(18);
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

    text("Johnson's seagrass is the lone ocean plant listed under\nthe Endangered Species Act. Its flowing green stalks\nplay an important role in coastal ecosystems where \nthey act as nursery grounds for small larval fish, and\nare eaten by the also-endangered West Indian manatee\nand green sea turtle. Already the rarest seagrass in the\nU.S. due to its limited distribution, it is threatened by\ndisturbance from boats, dredging, storm waves, and\npoor water quality.", 80, 375)

    pop();

    push();
    noStroke();
    fill("black");
    rect(400, 550, 70, 30);

    push();
    fill("white");
    textSize(18);
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


    text("All six of the species of sea turtles that are found in U.S.\nwaters are listed as endangered under the ESA. Sea\n turtles face a variety of threats in both the ocean (like\nentanglement in fishing gear) and on land (such as \nartificial lights confusing newborn hatchlings).", 80, 375)

    pop();

    push();
    noStroke();
    fill("black");
    rect(400, 550, 70, 30);

    push();
    fill("white");
    textSize(18);
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
    // background(0, 160, 176);
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
    text("☐ Our beach and marine recreation", 80, 520);
    text("☐ Our tourism", 80, 580);
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
    // fill("black");
    // stroke("black");
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
    text("WE COULD BE", 80, 264);
    text("MORE MINDFUL OF", 80, 303);
    text("SOME THINGS WE DO?", 80, 340);
    pop();

  }
}

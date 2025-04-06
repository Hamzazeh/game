const rules = document.querySelector(".rules");
const rules_overlay = document.querySelector(".rules-overlay");
const play_page = document.querySelector(".play-page");
const main_game = document.querySelector(".part-two");
const score_num = document.getElementById("score");

// score num
let score = 0;
score_num.innerHTML = score;

function show_rules() {
  rules.style.display = "flex";
  rules_overlay.style.display = "block";
}

function hide_rules() {
  rules.style.display = "none";
  rules_overlay.style.display = "none";
}

function turn_play_page(event) {
  main_game.style.display = "none";
  play_page.style.display = "flex";

  const clickedDiv = event.currentTarget;
  const img = clickedDiv.querySelector("img");
  const imgUrl = img.getAttribute("src");

  const my_picked_img = document.querySelector(".my-picked-img");
  my_picked_img.innerHTML = `
	<img src="${imgUrl}" />
	`;

  if (imgUrl.includes("rock")) {
    my_picked_img.style.borderColor = "var(--Rock)";
  } else if (imgUrl.includes("paper")) {
    my_picked_img.style.borderColor = "var(--Paper)";
  } else {
    my_picked_img.style.borderColor = "var(--Scissors)";
  }

  // house choice
  let house_cho = house_choice();

  // show winner
  let winner_result = winner(imgUrl, house_cho);
  show_winner(winner_result);

  // show score

  cal_score(winner_result);
}

function house_choice() {
  const house_img = document.querySelector(".house-img");
  let imgs = [
    "./images/icon-rock.svg",
    "./images/icon-paper.svg",
    "./images/icon-scissors.svg",
    "./images/icon-scissors.svg",
  ];

  let rand_img = imgs[Math.floor(Math.random() * (imgs.length - 1))];

  house_img.innerHTML = `
	<img src="${rand_img}" />
	`;

  if (rand_img.includes("rock")) {
    house_img.style.borderColor = "var(--Rock)";
  } else if (rand_img.includes("paper")) {
    house_img.style.borderColor = "var(--Paper)";
  } else {
    house_img.style.borderColor = "var(--Scissors)";
  }

  return rand_img;
}

function winner(my_picked, house_picked) {
  if (my_picked && house_picked) {
    let me_win = true;

    let my_rock = my_picked.includes("rock");
    let my_paper = my_picked.includes("paper");
    let my_scissors = my_picked.includes("scissor");

    let house_rock = house_picked.includes("rock");
    let house_paper = house_picked.includes("paper");
    let house_scissors = house_picked.includes("scissor");

    if (my_rock && house_scissors) {
      console.log("you win rock beats scissor");
      me_win = true;
    } else if (my_paper && house_rock) {
      console.log("you win paper beats rock");
      me_win = true;
    } else if (my_scissors && house_paper) {
      console.log("you win scissors beats paper");
      me_win = true;
    } else if (my_picked === house_picked) {
      console.log("it's tie");
      me_win = "it's tie";
    } else {
      console.log(`you lose ${house_picked} beats ${my_picked}`);
      me_win = false;
    }

    return me_win;
  }
}

function show_winner(i_win) {
  const house_img = document.querySelector(".house-img");
  const my_picked_img = document.querySelector(".my-picked-img");
  let text_win = document.querySelector(".winner-cont h2");

  if (i_win === true) {
    text_win.innerHTML = "you win";
    my_picked_img.classList.add("win-effect")
    house_img.classList.remove("win-effect")
  } else if (!i_win) {
    text_win.innerHTML = "you lose!";
    my_picked_img.classList.remove("win-effect")
    house_img.classList.add("win-effect")
  } else {
    text_win.innerHTML = "it's tie";
    my_picked_img.classList.remove("win-effect")
    house_img.classList.remove("win-effect")
  }
}

// play again
function play_again() {
  main_game.style.display = "flex";
  play_page.style.display = "none";
}

// score_num
function cal_score(me_win) {
  if (me_win === true) {
    score += 1;
    score_num.innerHTML = score;
  } else if (!me_win) {
    if (score > 0) {
      score -= 1;
      score_num.innerHTML = score;
    }
  }
}

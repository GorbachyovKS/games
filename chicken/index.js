const INITIAL_VALUES = {
  ASSETS: {
    start: "bg_start.svg",
    step_variant_1: "step_variant_1.svg",
    step_variant_2: "step_variant_2.svg",
    step_variant_3: "step_variant_3.svg",
    end: "bg_end.svg",
    logo: "logo.svg",
    logo_load: "logo_load.svg",
    point_wait: "point_wait.svg",
    point_success: "point_success.svg",
    lattice: "lattice.svg",
    torch: "torch.svg",
    torch_light: "torch_light.svg",
    step_light: "step_light.svg",
    fire_medal: "fire_medal.svg",
    gold_medal: "gold_medal.svg",
    chicken_cook: "chicken_cook.svg",

    egg: "egg.svg",
    podium: "podium.svg",
    podium_light: "podium_light.svg",

    loadBg: "loadBg.webp",
    loadProgressBorder: "loadProgressBorder.webp",
    loadProgressScale: "loadProgressScale.webp",
    button_play: "button_play.svg",
    button_info: "button_info.svg",
    button_info_min: "button_info_min.svg",
    button_coin: "button_coin.svg",
    button_cash: "button_cash.svg",
    coin: "coin.svg",
    background: "background.svg",
    popup: "popup.svg",
    popup_button: "popup_button.svg",

    fire_particle: "fire_particle/fire_particle.png",
    fire_particle_sheet: "fire_particle/fire_particle.json",
    chicken_go: "chicken_go/chicken_go.png",
    chicken_go_sheet: "chicken_go/chicken_go.json",
    fire: "fire/fire.png",
    fire_sheet: "fire/fire.json",
    chicken_stay: "chicken_stay/chicken_stay.png",
    chicken_stay_sheet: "chicken_stay/chicken_stay.json",
  },
  TEXT: {
    play: "PLAY",
    cash_out: "CASH OUT",
    go: "GO",
    win: "WIN",
    popup_win: {
      title: "WIN!",
      button: "Take your winnings",
    },
    popup_loss: {
      title: "LOSS!",
      button: "Try again",
    },
    styles: {
      textStyle: {
        fill: 0xffffff,
        fontFamily: "Lexend",
        fontWeight: "bold",
        fontSize: "14px",
        align: "center",
      },
      textStyleCashOut: {
        fill: 0x000000,
        fontFamily: "Lexend",
        fontWeight: "bold",
        fontSize: "14px",
        align: "center",
      },
      textStyleMin: {
        fill: 0xcdcdcd,
        fontFamily: "Lexend",
        fontWeight: "bold",
        fontSize: "12px",
      },
      textStyleCoinMin: {
        fill: 0xcdcdcd,
        fontFamily: "Lexend",
        fontWeight: "bold",
        fontSize: "14px",
      },
      textStyleInfo: {
        fill: 0xcdcdcd,
        fontFamily: "Lexend",
        fontWeight: "bold",
        fontSize: "16px",
      },
      textStylePopupTitle: {
        fill: 0xffffff,
        fontFamily: "Lexend",
        fontWeight: "bold",
        fontSize: "32px",
      },
      textStylePopupDescription: {
        fill: 0xffd02e,
        fontFamily: "Lexend",
        fontWeight: "bold",
        fontSize: "48px",
      },
      textStylePopupDescriptionAfter: {
        fill: 0x26d04e,
        fontFamily: "Lexend",
        fontWeight: "bold",
        fontSize: "24px",
      },
      textStylePopupButton: {
        fill: 0xffffff,
        fontFamily: "Lexend",
        fontWeight: "bold",
        fontSize: "24px",
      },
    },
  },
  SETTING: {
    // Предпологается, что эти поля, будет насаривать пользователь
    FIRE: {
      SPEED: 6 / 24, // скорость анимации огня ( fps / кол-во кадров)
    },
    FIRE_PARTICLES: {
      SPEED: 10 / 16,
    },
    POPUP: {
      WIDTH: 310,
      HEIGHT: 296,
      BUTTON: {
        WIDTH: 262,
        HEIGHT: 62,
      },
    },
    EGG: {
      SPEED: 0.04, // скорость смещение анимации яйца
      OFFSET_DELTA: 10, // смещение анимации
    },
    CHICKEN: {
      SPEED: 18 / 46, // скорость аниамации чикена ( fps / кол-во кадров)
      SPEED_COOK: 0.02, // скорость анимации приготовления чикена
      SPEED_JUMP: 24 / 28, // скорость аниамации прыжка чикена ( fps / кол-во кадров)
      JUMP_HEIGHT: 15, // высота прыжка
      JUMP_WIN_HEIGHT: 55, // макс высота прыжка при выйгрыше
      JUMP_DURATION: 900, // длительность прыжка
      DURATION_AFTER_JUMP: 100, // задержка после прыжка
      JUMP_FRAMES: 60, // количество кадров прыжка
    },
    GAME: {
      WIN_PERCENTAGE: 30, // шанс выйгрыша
      STEP_LOSS: 0,
      REDIRECT_LINK: "https://www.google.ru/?hl=ru", // ссылка на оффер
      FACTOR_STEP_X: 1.15, // множитель Х на степе
      COUNT_STEP: [
        // Гибкая настройка степов в, случае отсутствия xFactor принимается FACTOR_STEP_X
        { xFactor: "3x" },
        { xFactor: "6x" },
        { xFactor: "9x" },
        { xFactor: "9x" },
        { xFactor: "9x" },
        { xFactor: "9x" },
      ], // количество степов
      DURATION_AFTER_LOAD: 5, // задержка по времени после загрузки всех ассетов (при переключение на экрна игры)
      DURATION_AFTER_GAME: 5, // задержка по времени появление popup
    },
  },
};

const {
  ASSETS,
  TEXT,
  SETTING: { GAME, CHICKEN, EGG, POPUP, FIRE, FIRE_PARTICLES },
} = INITIAL_VALUES;

const containersForScale = [];
const backgroundsForRatio = [];

function windowResize() {
  if (!app || !app.screen) return;

  const { width: w, height: h } = app.screen;
  const designWidth = 320;
  const designHeight = 568;

  const scale = Math.min(w / designWidth, h / designHeight);
  const shouldScale = w < designWidth || h < designHeight;
  const finalScale = shouldScale ? scale : 1;

  containersForScale.forEach((container) => {
    if (container) {
      console.log(container);
      container.scale?.set(scale);
      setCenterElement(container);
    }
  });

  backgroundsForRatio.forEach((asset) => {
    if (asset) {
      setAspectRatioElement(asset);
    }
  });
}

const centeredElements = new WeakSet();

// Centered Elements By App
function setCenterElement(element) {
  if (!centeredElements.has(element)) {
    const bounds = element.getLocalBounds();
    element.pivot.set(
      bounds.x + bounds.width / 2,
      bounds.y + bounds.height / 2
    );
    centeredElements.add(element);
  }
  element.position.set(app.screen.width / 2, app.screen.height / 2);
}

// Aspect Ratio Element
function setAspectRatioElement(element) {
  const { width: appWidth, height: appHeight } = app.screen;
  const aspectRatio = element.width / element.height;

  element.position.set(appWidth / 2, appHeight / 2);
  element.width = appWidth;
  element.height = appWidth / aspectRatio;
  if (appWidth / aspectRatio < appHeight) {
    element.width = aspectRatio * appHeight;
    element.height = appHeight;
  }
}

function setElementsByEvents({ scale, ratio }) {
  if (scale) containersForScale.push(scale);
  if (ratio) backgroundsForRatio.push(ratio);
  windowResize();
}

// Форматируем пути
const ASSETS_FORMATTED_PATH = Object.keys(ASSETS).reduce(
  (acc, key) => ({ ...acc, [key]: `./assets/` + ASSETS[key] }),
  {}
);

// Получаем массив путей по ключам
const ASSETS_PATH = Object.values(ASSETS_FORMATTED_PATH);

// Фильтруем массив путей по совпадению строки 'load'
const ASSETS_PATH_LOADER = ASSETS_PATH.filter((asset) =>
  asset.includes("load")
);

const FLOOR_HEIGHT = 21;

const app = new PIXI.Application();
globalThis.__PIXI_APP__ = app;
await app.init({
  resizeTo: window,
  antialias: true,
  resolution: 4,
  autoDensity: true,
});

app.renderer.on("resize", windowResize);

document.body.appendChild(app.canvas);
// Загружаем ассеты для экрана лоудера
await PIXI.Assets.load(ASSETS_PATH_LOADER);
// LOAD SCREEN

const containerLoader = new PIXI.Container();
const containerBgLoad = new PIXI.Container();
const containerBgLoadBar = new PIXI.Container();

const loadBg = PIXI.Sprite.from(ASSETS_FORMATTED_PATH.loadBg);
loadBg.anchor.set(0.5);
containerLoader.addChild(loadBg);
const logoLoad = PIXI.Sprite.from(ASSETS_FORMATTED_PATH.logo_load);
const loadProgressBorder = PIXI.Sprite.from(
  ASSETS_FORMATTED_PATH.loadProgressBorder
);
const loadProgressScale = PIXI.Sprite.from(
  ASSETS_FORMATTED_PATH.loadProgressScale
);

containerBgLoad.addChild(logoLoad);
containerBgLoadBar.addChild(loadProgressScale);
containerBgLoadBar.addChild(loadProgressBorder);

containerBgLoadBar.x = (containerBgLoad.width - containerBgLoadBar.width) / 2;
containerBgLoadBar.y = logoLoad.height + 30;
containerBgLoad.x = app.screen.width / 2 - containerBgLoad.width / 2;
containerBgLoad.y = app.screen.height / 2 - containerBgLoad.height / 2;

containerBgLoad.addChild(containerBgLoadBar);
containerLoader.addChild(containerBgLoad);
app.stage.addChild(containerLoader);
setElementsByEvents({ ratio: loadBg, scale: containerBgLoad });

// // load the assets
await PIXI.Assets.load(ASSETS_PATH, (progress) => {
  if (progress === 1) {
    setTimeout(() => {
      const ticker = new PIXI.Ticker();
      ticker.add(({ deltaTime }) => {
        containerGameView.alpha += 0.05 * deltaTime;
        if (containerGameView.alpha >= 1) ticker.stop();
      });
      ticker.start();
    }, GAME.DURATION_AFTER_LOAD);
  }
});

// // Helpers
function randomizer(winPercentage, min = 0, max = 100) {
  // Генерируем случайное число от min до max
  const randomValue = Math.random() * (max - min) + min;

  // Проверяем, попадает ли случайное число в диапазон выигрыша
  const winThreshold = winPercentage / 100; // Преобразуем процент в дробное значение
  return randomValue <= winThreshold * (max - min) + min;
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

// // CONST
// let ROAD_WIDTH = 0
const SCALE_LIGHT_TORCH_MAX = 1;
const SCALE_LIGHT_TORCH_DELTA = 0.005;
const SCALE_LIGHT_TORCH_MIN = 0.8;

const BG_STEP = PIXI.Sprite.from(ASSETS_FORMATTED_PATH.step_variant_1);

// // INITIAL GAME
const containerGameView = new PIXI.Container();

const containerGameBg = new PIXI.Container();
const gameBg = PIXI.Sprite.from(ASSETS_FORMATTED_PATH.background);
gameBg.anchor.set(0.5);
containerGameBg.addChild(gameBg);
containerGameView.addChild(containerGameBg);

const containerGame = new PIXI.Container();

setElementsByEvents({ scale: containerGame, ratio: containerGameBg });

const logoGame = PIXI.Sprite.from(ASSETS_FORMATTED_PATH.logo);
logoGame.name = "logoGame";
logoGame.anchor = 0.5;
logoGame.position.set(0, -250);

containerGame.addChild(logoGame);

const containerPanel = new PIXI.Container();
const textButton = new PIXI.Text(TEXT.play, TEXT.styles.textStyle);
const textButtonCash = new PIXI.Text(
  `${TEXT.cash_out}\n ${0} USD`,
  TEXT.styles.textStyleCashOut
);

const buttonPlayContainer = new PIXI.Container();
const buttonPlay = PIXI.Sprite.from(ASSETS_FORMATTED_PATH.button_play);
buttonPlayContainer.cursor = "pointer";
buttonPlayContainer.interactive = true;
buttonPlayContainer.addChild(buttonPlay);
buttonPlayContainer.position.set(-6, 220);
textButton.anchor = 0.5;
textButton.x = buttonPlayContainer.width / 2;
textButton.y = buttonPlayContainer.height / 2 - 4;
buttonPlayContainer.addChild(textButton);
buttonPlayContainer.on("pointerdown", buttonPointerDown);

const buttonCashContainer = new PIXI.Container();
const buttonCash = PIXI.Sprite.from(ASSETS_FORMATTED_PATH.button_cash);
buttonCashContainer.cursor = "pointer";
buttonCashContainer.interactive = true;
buttonCashContainer.addChild(buttonCash);
buttonCashContainer.position.set(-160, 220);
textButtonCash.anchor = 0.5;
textButtonCash.position.set(
  buttonCashContainer.width / 2,
  buttonCashContainer.height / 2 - 4
);
buttonCashContainer.addChild(textButtonCash);
buttonCashContainer.on("pointerdown", buttonCashPointerDown);

const buttonAddedMoneyMap = [];
const buttonAddedMoneyCoinMap = [1, 2, 5, 10];
for (let i = 0; i < 4; i++) {
  const button = new PIXI.Container();
  const buttonSprite = PIXI.Sprite.from(ASSETS_FORMATTED_PATH.button_coin);
  button.addChild(buttonSprite);
  containerPanel.addChild(button);
  button.interactive = true;
  button.cursor = "pointer";
  button.on("pointerdown", () => {
    if (gameState !== GAME_STATES.START) return;
    textInfo.text = +textInfo.text + buttonAddedMoneyCoinMap[i];
  });
  const containerContentButton = new PIXI.Container();
  button.addChild(containerContentButton);

  const coin = PIXI.Sprite.from(ASSETS_FORMATTED_PATH.coin);
  const textCoin = new PIXI.Text(
    buttonAddedMoneyCoinMap[i],
    TEXT.styles.textStyleCoinMin
  );
  buttonAddedMoneyMap.push(button);

  textCoin.x = 0;
  coin.x = textCoin.width + 4;

  textCoin.y = (button.height - textCoin.height) / 2 - 4;
  coin.y = (button.height - coin.height) / 2 - 4;

  containerContentButton.addChild(coin);
  containerContentButton.addChild(textCoin);

  containerContentButton.position.set(
    (button.width - containerContentButton.width) / 2,
    0
  );

  button.position.set(-160, 170);
  button.interactive = true;
  button.buttonMode = true;
  button.cursor = "pointer";
  if (buttonAddedMoneyMap[i - 1])
    button.x =
      buttonAddedMoneyMap[i - 1].x + buttonAddedMoneyMap[i - 1].width - 8;
}

const buttonInfoContainer = new PIXI.Container();
const buttonInfo = PIXI.Sprite.from(ASSETS_FORMATTED_PATH.button_info);
buttonInfoContainer.addChild(buttonInfo);
buttonInfoContainer.position.set(-160, 116);

const buttonInfoMinContainer = new PIXI.Container();
buttonInfoMinContainer.on("pointerdown", () => {
  if (gameState !== GAME_STATES.START) return;
  textInfo.text = 0;
});
const buttonInfoMin = PIXI.Sprite.from(ASSETS_FORMATTED_PATH.button_info_min);
buttonInfoMinContainer.addChild(buttonInfoMin);

const buttonInfoMaxContainer = new PIXI.Container();
buttonInfoMaxContainer.on("pointerdown", () => {
  if (gameState !== GAME_STATES.START) return;
  textInfo.text = 150;
});
const buttonInfoMax = PIXI.Sprite.from(ASSETS_FORMATTED_PATH.button_info_min);
buttonInfoMaxContainer.addChild(buttonInfoMax);

const textInfoMin = new PIXI.Text("MIN", TEXT.styles.textStyleMin);
const textInfoMax = new PIXI.Text("MAX", TEXT.styles.textStyleMin);
const textInfo = new PIXI.Text(1, TEXT.styles.textStyleInfo);
textInfo.anchor = 0.5;
textInfoMin.anchor = 0.5;
textInfoMax.anchor = 0.5;
textInfoMin.position.set(
  buttonInfoMaxContainer.width / 2,
  buttonInfoMaxContainer.height / 2
);
textInfoMax.position.set(
  buttonInfoMinContainer.width / 2,
  buttonInfoMinContainer.height / 2
);
textInfo.position.set(
  buttonInfoContainer.width / 2,
  buttonInfoContainer.height / 2 - 4
);
buttonInfoContainer.addChild(textInfo);
buttonInfoMaxContainer.addChild(textInfoMax);
buttonInfoMinContainer.addChild(textInfoMin);
buttonInfoMinContainer.position.set(15, 10);
buttonInfoMaxContainer.position.set(
  buttonInfoContainer.width - buttonInfoMaxContainer.width - 15,
  10
);

buttonInfoContainer.addChild(buttonInfoMinContainer, buttonInfoMaxContainer);
buttonInfoMinContainer.interactive = true;
buttonInfoMinContainer.cursor = "pointer";
buttonInfoMaxContainer.interactive = true;
buttonInfoMaxContainer.cursor = "pointer";

buttonInfoContainer.addChild(buttonInfo);
containerPanel.addChild(
  buttonInfoContainer,
  buttonPlayContainer,
  buttonCashContainer
);

containerGame.addChild(containerPanel);

containerGameView.addChild(containerGame);
// //  INITIAL MAP GAME BACKGROUND
const containerMapBackground = new PIXI.Container();
containerMapBackground.x = -app.screen.width / 2;
containerMapBackground.y = -225;
containerGame.addChild(containerMapBackground);

for (let i = 0; i < 50; i++) {
  const containerStep = new PIXI.Container();

  const bgStep = PIXI.Sprite.from(
    ASSETS_FORMATTED_PATH[
      randomizer(50)
        ? "step_variant_3"
        : randomizer(50)
        ? "step_variant_2"
        : "step_variant_1"
    ]
  );
  containerStep.addChild(bgStep);

  containerMapBackground.addChild(containerStep);
  containerStep.x = containerMapBackground.width - 10;
}

// //  INITIAL MAP GAME
const containerMap = new PIXI.Container();
let offsetContainerMap = 0;
app.renderer.on("resize", () => {
  const { width: w, height: h } = app.screen;
  const designWidth = 320;
  const designHeight = 568;

  const scale = Math.min(w / designWidth, h / designHeight);
  const shouldScale = w < designWidth || h < designHeight;
  const finalScale = shouldScale ? scale : 1;
  containerMap.x = (-app.screen.width / 2 + offsetContainerMap) / scale;
  containerMapBackground.x = -app.screen.width / 2 / scale;
});

const bgStart = PIXI.Sprite.from(ASSETS_FORMATTED_PATH.start);
containerMap.x = -app.screen.width / 2;
containerMap.y = -225;
containerMap.addChild(bgStart);
containerGame.addChild(containerMap);

// MAP STEP POINT
const MAP_POINTS = {};

for (let i = 0; i < GAME.COUNT_STEP.length; i++) {
  const step = GAME.COUNT_STEP[i];
  const containerStep = new PIXI.Container();
  const bgStep = PIXI.Sprite.from(
    ASSETS_FORMATTED_PATH[
      randomizer(50)
        ? "step_variant_3"
        : randomizer(50)
        ? "step_variant_2"
        : "step_variant_1"
    ]
  );
  const stepLight = PIXI.Sprite.from(ASSETS_FORMATTED_PATH.step_light);
  const torch = PIXI.Sprite.from(ASSETS_FORMATTED_PATH.torch);
  const torchLight = PIXI.Sprite.from(ASSETS_FORMATTED_PATH.torch_light);
  const lattice = PIXI.Sprite.from(ASSETS_FORMATTED_PATH.lattice);
  const containerPoint = new PIXI.Container();
  const prevStepX = MAP_POINTS[i - 1]
    ? (
        +MAP_POINTS[i - 1].textPoint.text.replace("x", "") * GAME.FACTOR_STEP_X
      ).toFixed(1)
    : GAME.FACTOR_STEP_X * (i + 1).toFixed(1);
  const textPoint = new PIXI.Text(
    step.xFactor || `${prevStepX}x`,
    TEXT.styles.textStyle
  );
  const pointWait = PIXI.Sprite.from(ASSETS_FORMATTED_PATH.point_wait);
  const pointSuccess = PIXI.Sprite.from(ASSETS_FORMATTED_PATH.point_success);
  const fireMedal = PIXI.Sprite.from(ASSETS_FORMATTED_PATH.fire_medal);
  const goldMedal = PIXI.Sprite.from(ASSETS_FORMATTED_PATH.gold_medal);

  containerPoint.addChild(pointWait);
  containerPoint.addChild(pointSuccess);
  containerPoint.addChild(textPoint);
  containerPoint.addChild(goldMedal);
  containerPoint.addChild(fireMedal);

  pointSuccess.anchor.x = 0.5;
  pointSuccess.x += pointSuccess.width / 2;
  pointSuccess.alpha = 0;

  fireMedal.anchor.x = 0.5;
  fireMedal.x += fireMedal.width / 2;
  fireMedal.scale.x = 0;

  goldMedal.anchor.x = 0.5;
  goldMedal.x += goldMedal.width / 2;
  goldMedal.scale.x = 0;

  containerStep.addChild(bgStep);
  containerStep.addChild(containerPoint);
  containerStep.addChild(torch);
  containerStep.addChild(torchLight);
  containerStep.addChild(lattice);
  containerStep.addChild(stepLight);

  textPoint.x = containerPoint.width / 2 - textPoint.width / 2;
  textPoint.y = containerPoint.height / 2 - textPoint.height / 2;

  lattice.position.set(
    (containerStep.width - lattice.width) / 2,
    containerStep.height - lattice.height - FLOOR_HEIGHT
  );

  torch.y = FLOOR_HEIGHT;
  torch.x = containerStep.width / 2 - torch.width / 2;

  torchLight.y = torchLight.height / 2 + FLOOR_HEIGHT;
  torchLight.x = containerStep.width / 2;
  torchLight.anchor = 0.5;

  stepLight.alpha = 0;
  stepLight.y = containerStep.height - stepLight.height - FLOOR_HEIGHT;

  // TORCH LIGHTNING ANIMATION
  let tourchScale = 1;
  let revert = false;
  app.ticker.add((ticker) => {
    if (revert) tourchScale -= SCALE_LIGHT_TORCH_DELTA;
    else tourchScale += SCALE_LIGHT_TORCH_DELTA;
    if (tourchScale >= SCALE_LIGHT_TORCH_MAX) revert = true;
    else if (tourchScale <= SCALE_LIGHT_TORCH_MIN) revert = false;
    torchLight.scale = tourchScale;
  });
  containerPoint.position.set(
    (containerStep.width - containerPoint.width) / 2,
    (containerStep.height - containerPoint.height) / 2
  );

  containerStep.x = containerMap.width;
  containerMap.addChild(containerStep);

  const fireParticleSheet = PIXI.Assets.get(
    ASSETS_FORMATTED_PATH.fire_particle_sheet
  );

  const fireParticleTextures = Object.keys(fireParticleSheet.textures)
    .sort((a, b) => parseFloat(a) - parseFloat(b))
    .map((key) => fireParticleSheet.textures[key]);

  const fireParticles = new PIXI.AnimatedSprite(fireParticleTextures);

  fireParticles.alpha = 0;
  fireParticles.width = containerStep.width;
  fireParticles.height = containerStep.height - FLOOR_HEIGHT;
  fireParticles.y = fireParticles.animationSpeed = FIRE_PARTICLES.SPEED; // 6 fps
  fireParticles.loop = false;
  setTimeout(() => {
    fireParticles.play();
    fireParticles.alpha = 1;
  }, getRandomInt(5000, 20000));
  fireParticles.onComplete = () => {
    fireParticles.alpha = 0;
    setTimeout(() => {
      fireParticles.alpha = 1;
      fireParticles.gotoAndPlay(0);
    }, getRandomInt(5000, 20000));
  };
  containerStep.addChild(fireParticles);

  MAP_POINTS[i] = {
    pointWait,
    pointSuccess,
    stepLight,
    textPoint,
    goldMedal,
    fireMedal,
  };
}

const containerEnd = new PIXI.Container();
const bgEnd = PIXI.Sprite.from(ASSETS_FORMATTED_PATH.end);
const podium = PIXI.Sprite.from(ASSETS_FORMATTED_PATH.podium);
const podiumLight = PIXI.Sprite.from(ASSETS_FORMATTED_PATH.podium_light);
containerEnd.x = containerMap.width;
containerEnd.addChild(bgEnd);
containerEnd.addChild(podium);
containerEnd.addChild(podiumLight);
const containerEgg = new PIXI.Container();

const egg = PIXI.Sprite.from(ASSETS_FORMATTED_PATH.egg);
containerEgg.addChild(egg);

const textEgg = new PIXI.Text("1999x", TEXT.styles.textStyle);
textEgg.anchor = 0.5;
textEgg.position.set(containerEgg.width / 2, containerEgg.height / 2);
containerEgg.addChild(textEgg);

containerEnd.addChild(containerEgg);

podium.position.set(
  (containerEnd.width - podium.width) / 2,
  containerEnd.height - podium.height - FLOOR_HEIGHT
);

podiumLight.position.set(
  (containerEnd.width - podiumLight.width) / 2 + 1.5,
  containerEnd.height - podiumLight.height - FLOOR_HEIGHT - podium.height + 1
);

containerEgg.y = (containerEnd.height - containerEgg.height) / 2;
containerEgg.x = (containerEnd.width - containerEgg.width) / 2 + 2;

const EGG_Y_CORD = containerEgg.y;
let time = 0;
// EGG ANIMATION
app.ticker.add(() => {
  containerEgg.y = EGG_Y_CORD + EGG.OFFSET_DELTA * Math.sin(time);
  time += EGG.SPEED;
});

containerMap.addChild(containerEnd);

function stepPointDoing(
  { pointWait, pointSuccess, stepLight, fireMedal, textPoint } = {},
  index
) {
  if (!pointWait || !pointSuccess || !stepLight) return;
  pointWait.aplha = 0;
  let state = index + 1 === GAME.STEP_LOSS;
  if (state) {
    gameState = GAME_STATES.FINISH;
  }
  if (MAP_POINTS[index]) {
    const { goldMedal: goldMedalPrev, pointSuccess: pointSuccessPrev } =
      MAP_POINTS[index - 1] || {};
    const medal = state ? fireMedal : goldMedalPrev;
    const point = state ? pointSuccess : pointSuccessPrev;
    if (medal && point) {
      const ticker = new PIXI.Ticker();
      ticker.add(() => {
        if (medal.scale.x > -1) {
          medal.scale.x = (medal.scale.x - 0.1).toFixed(1);
          point.scale.x = (point.scale.x - 0.1).toFixed(1);
        } else ticker.stop();
      });
      ticker.start();
    }
  }
  const isLastJump = GAME.COUNT_STEP.length + 1 === step;

  if (state) {
    fire.x = chicken.x;
    fire.y = chicken.y;

    chickenCook.x = chicken.x;
    chickenCook.y = chicken.y;
    fire.alpha = 1;
    fire.loop = false;
    fire.play();
    fire.onFrameChange = (frameIndex) => {
      const middleIndex = Math.round(fireTextures.length / 2);
      if (frameIndex === middleIndex) {
        chicken.alpha = 0;
        chickenCook.alpha = 1;
        setTimeout(() => renderPopup(state), GAME.DURATION_AFTER_GAME);
      }
    };
    fire.onComplete = () => {
      fire.alpha = 0;
    };
  } else {
    pointSuccess.alpha = 1;
    stepLight.alpha = 1;
    textButtonCash.text = `${TEXT.cash_out}\n${(
      parseFloat(textInfo.text) *
      parseFloat(isLastJump ? textEgg.text : textPoint.text)
    ).toFixed(2)} USD`;
  }

  return state;
}

const sheetChickenGo = PIXI.Assets.get(ASSETS_FORMATTED_PATH.chicken_go_sheet);

const sheetChickenStay = PIXI.Assets.get(
  ASSETS_FORMATTED_PATH.chicken_stay_sheet
);

const chickenTextures = Object.keys(sheetChickenStay.textures)
  .sort((a, b) => parseFloat(a) - parseFloat(b))
  .map((key) => sheetChickenStay.textures[key]);
const chickenJumpTextures = Object.keys(sheetChickenGo.textures)
  .sort((a, b) => parseFloat(a) - parseFloat(b))
  .map((key) => sheetChickenGo.textures[key]);

const chicken = new PIXI.AnimatedSprite(chickenTextures);
chicken.animationSpeed = CHICKEN.SPEED; // 6 fps
chicken.play();
chicken.anchor.set(0.5, 1);
chicken.position.set(70, containerMap.height - FLOOR_HEIGHT);
containerMap.addChild(chicken);

const chickenCook = PIXI.Sprite.from(ASSETS_FORMATTED_PATH.chicken_cook);
chickenCook.anchor.set(0.5, 1);
chickenCook.alpha = 0;
chickenCook.position.set(chicken.x, chicken.y);
containerMap.addChild(chickenCook);

const fireSheet = PIXI.Assets.get(ASSETS_FORMATTED_PATH.fire_sheet);

const fireTextures = Object.keys(fireSheet.textures)
  .sort((a, b) => parseFloat(a) - parseFloat(b))
  .map((key) => fireSheet.textures[key]);

const fire = new PIXI.AnimatedSprite(fireTextures);
fire.animationSpeed = FIRE.SPEED; // 6 fps
fire.anchor.set(0.5, 1);
fire.alpha = 0;
fire.position.set(chicken.x, chicken.y);
containerMap.addChild(fire);

// Настоящая позиция чикена
const CHICKEN_STAY_POSITION = chicken.y;

// Точка опоры падения чикена up/down
let revert_chicken = false;

// Количество пройденных степов
let step = 0;

// STATES GAME
const GAME_STATES = {
  START: "start",
  PENDING: "pending",
  PLAYING: "playing",
  PLAYING_STEP: "playing_step",
  FINISH: "finish",
};
let gameState = GAME_STATES.START;

let stepGameState = false;
let chickenJumpState = false;

app.ticker.add(() => {
  if (gameState === GAME_STATES.PLAYING) {
    if (textButton.text === TEXT.play) {
      textButton.text = TEXT.go;
      textButton.x = buttonPlayContainer.width / 2;
      textButton.y = buttonPlayContainer.height / 2;
    }
    gameState = GAME_STATES.PLAYING_STEP;
    stepGame();
  }
});

function stepGame() {
  if (step > GAME.COUNT_STEP.length) return;
  const isLastJump = GAME.COUNT_STEP.length === step;
  const x2 = chicken.x + BG_STEP.width,
    mx2 = chicken.x + BG_STEP.width;
  if (!isLastJump) jump({ x2, mx2 });
  else jump({ x2: x2 + 45, mx2, y2: CHICKEN.JUMP_WIN_HEIGHT * 2 });
}
function jump({
  x1 = chicken.x,
  x2 = chicken.x,
  y1 = chicken.y,
  y2 = CHICKEN.JUMP_HEIGHT * 2,
  mx1 = chicken.x,
  mx2 = chicken.x,
} = {}) {
  chicken.textures = chickenJumpTextures;
  chicken.play();
  chicken.animationSpeed = CHICKEN.SPEED_JUMP;

  const interval = CHICKEN.JUMP_DURATION / CHICKEN.JUMP_FRAMES;

  const dx = (x2 - x1) / CHICKEN.JUMP_FRAMES; // Изменение по X за кадр (для chiken)
  const dxm = (mx2 - mx1) / CHICKEN.JUMP_FRAMES; // Изменение по mX за кадр (для map)
  const jumpHeight = y1 - y2 - y1; // Разница в высоте

  let frame = 0;

  const jumpInterval = setInterval(() => {
    if (frame <= CHICKEN.JUMP_FRAMES) {
      // Линейная интерполяция по X
      chicken.x += dx;
      if (containerMap.x + containerMap.width > app.screen.width / 2) {
        containerMap.x -= dxm;
        offsetContainerMap -= dxm;
      }
      // Параболическая интерполяция по Y
      const t = frame / CHICKEN.JUMP_FRAMES; // Нормализованное время от 0 до 1
      chicken.y = y1 + 4 * jumpHeight * t * (1 - t); // Формула для параболы

      frame++;
    } else {
      clearInterval(jumpInterval); // Остановка анимации после завершения

      chicken.textures = chickenTextures;
      chicken.play();
      chicken.animationSpeed = CHICKEN.SPEED;

      const state = stepPointDoing(MAP_POINTS[step], step);
      setTimeout(() => {
        step += 1;
        if (step === GAME.COUNT_STEP.length + 1) {
          gameState = GAME_STATES.FINISH;
          renderPopup(state);
        } else {
          if (!state) gameState = GAME_STATES.PENDING;
        }
      }, CHICKEN.DURATION_AFTER_JUMP);
    }
  }, interval);
}

const renderPopup = (state) => {
  const popupTextProps = state ? "popup_loss" : "popup_win";
  const popup = PIXI.Sprite.from(ASSETS_FORMATTED_PATH.popup);
  const popupText = new PIXI.Text(
    TEXT[popupTextProps].title,
    TEXT.styles.textStylePopupTitle
  );
  const isLastJump = GAME.COUNT_STEP.length + 1 === step;
  const { textPoint } = MAP_POINTS[step - 1] || {};
  const text = isLastJump ? textEgg.text : textPoint.text;
  const popupTextCash = new PIXI.Text(
    text,
    TEXT.styles.textStylePopupDescription
  );
  const popupTextCashPlus = new PIXI.Text(
    "+ " + parseFloat(textInfo.text) * parseFloat(text) + "$",
    TEXT.styles.textStylePopupDescriptionAfter
  );
  const popupTextButton = new PIXI.Text(
    TEXT[popupTextProps].button,
    TEXT.styles.textStylePopupButton
  );
  const containerPopupButton = new PIXI.Container();
  const popupButton = PIXI.Sprite.from(ASSETS_FORMATTED_PATH.popup_button);
  popupButton.anchor.set(0.5);
  containerPopupButton.addChild(popupButton);

  const BLUR_MAX = 10;
  const BLUR_MIN = 0;
  const blurFilter = new PIXI.BlurFilter();
  containerGame.filters = [blurFilter];
  blurFilter.blur = 0;

  const ticker = new PIXI.Ticker();

  ticker.add(() => {
    if (blurFilter.blur <= BLUR_MAX) blurFilter.blur += 0.4;
    if (popup.y >= app.screen.height / 2) popup.y -= 16;
    if (!(blurFilter.blur <= BLUR_MAX) && !(popup.y >= app.screen.height / 2))
      ticker.stop();
  });
  ticker.start();

  containerPopupButton.anchor = 0.5;
  containerPopupButton.interactive = true;
  containerPopupButton.cursor = "pointer";
  containerPopupButton.on("pointerdown", () => {
    window.open(GAME.REDIRECT_LINK);
  });
  containerPopupButton.x = popup.width / 2;
  containerPopupButton.y = popup.height - containerPopupButton.height / 2 - 24;
  popupTextButton.x = popupTextButton.x - popupTextButton.width / 2;
  popupTextButton.y = popupTextButton.y - popupTextButton.height / 2;

  popupText.anchor = 0.5;
  popupText.y = popupText.height / 2 + 32;
  popupText.x = popup.width / 2;

  popupTextCash.anchor = 0.5;
  popupTextCash.y = popupTextCash.height / 2 + 92;
  popupTextCash.x = popup.width / 2;

  popupTextCashPlus.anchor = 0.5;
  popupTextCashPlus.y = popupTextCashPlus.height / 2 + 165;
  popupTextCashPlus.x = popup.width / 2;

  containerPopupButton.addChild(popupTextButton);
  popup.addChild(popupText);
  if (!state) {
    popup.addChild(popupTextCash);
    popup.addChild(popupTextCashPlus);
  }
  popup.addChild(containerPopupButton);
  containerGameView.addChild(popup);
  setElementsByEvents({ scale: popup });
  popup.y = app.screen.height;
};

// LOAD END
app.stage.addChild(containerGameView);
containerGameView.alpha = 0;

function buttonCashPointerDown() {
  if (step - 1 === -1 || gameState !== GAME_STATES.PENDING) return;
  renderPopup(false);
}

function buttonPointerDown() {
  if (gameState === GAME_STATES.PENDING || gameState === GAME_STATES.START) {
    gameState = GAME_STATES.PLAYING;
  }
}

windowResize();

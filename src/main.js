import './styles.styl'


let files = []

// grab list of file names
document.querySelector('input').addEventListener('change', e => {
  console.log("FILES")
  for (let i = 0; i < e.target.files.length; i++) {
    files.push(e.target.files[ i ].name)
  }

  files = randomiseArray(files)

})


const form = document.querySelector("form");

form.addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(form);
  let time = "";

  let i = 0

  for (const entry of data) {

    if (entry[ 1 ]) {
      // data when i == 1 is the custom input
      time = entry[ 1 ]
    }

    i++
  };

  startDrawing(time)

});


function startDrawing (time) {

  let setupEl = document.querySelector('.setup')
  let drawingEl = document.querySelector('.drawing')

  setupEl.classList.add('hide')
  drawingEl.classList.remove('hide')

  // ------------------------------
  // TIMER

  let timeEl = document.querySelector('.timeDisplay')

  // total time in seconds
  let timeLeft = time * 60

  let interval
  interval = setInterval(createInterval, 1000)

  function createInterval () {
    let seconds = timeLeft % 60

    // standardises time so 9 seconds -> 09
    seconds = seconds.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })

    let minutes = Math.floor(timeLeft / 60)

    timeEl.innerText = `${minutes}:${seconds}`

    timeLeft = timeLeft - 1

    if (timeLeft < 0) {
      nextImage()
    }
  }



  // ------------------------------
  // CONTROLS
  let curImage = document.querySelector('.curImage')

  // sets up first image
  curImage.innerHTML = `<img src="./Gestures/${files[ 0 ]}">`

  let i = 0

  let prev = document.querySelector('.prev')
  let pause = document.querySelector('.pause')
  let next = document.querySelector('.next')
  let stop = document.querySelector('.stop')


  prev.addEventListener('click', e => {
    if (i > 0) {
      i = i - 1
      curImage.innerHTML = `<img src="./Gestures/${files[ i ]}">`
    }

    timeLeft = time * 60

  })

  next.addEventListener('click', e => {

    nextImage()

  })

  function nextImage () {
    if (i < files.length) {
      i = i + 1
      console.log("next", i)
      curImage.innerHTML = `<img src="./Gestures/${files[ i ]}">`
    }

    timeLeft = time * 60

  }

  pause.addEventListener('click', e => {
    console.log('interval', interval)
    if (interval) {
      clearInterval(interval)
      interval = null
    }
    else {
      console.log('creating interval')
      interval = setInterval(createInterval, 1000)
    }

  })

  stop.addEventListener('click', e => {
    clearInterval(interval)
    drawingEl.classList.add('hide')
    setupEl.classList.remove('hide')
  })

}




// ----------------------------------------

function randomiseArray (array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [ array[ i ], array[ j ] ] = [ array[ j ], array[ i ] ];
  }

  return array
};
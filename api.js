const urlArrJokes = 'https://api.chucknorris.io/jokes/categories';



// Function for make random gradients buttons 
function generate() {
    var hexValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e',];

    function populate(a) {
        for (let i = 0; i < 6; i++) {
            let x = Math.round(Math.random() * 14);
            let y = hexValues[x];
            a += y;
        }
        return a;
    }

    let newColor1 = populate('#');
    let newColor2 = populate('#');

    let gradient =
        'linear-gradient(-21deg, ' + newColor1 + ', ' + newColor2 + ')';

    return gradient;
}


fetch(urlArrJokes)
    .then(result => {
        return result.json();
    }).then(data => { // categories of jokes
        for (let i = 0; i < data.length; i++) {
            let categorie = document.getElementById('categories');
            categorie.innerHTML = categorie.innerHTML + "<div id='sub-categories" + i + "' class='sub-categories' onclick='openJokes(" + i + ")'>" + data[i] + '</div>';
            // categorie.innerHTML + `<div id="sub-categories${i}" class="sub-categories" onclick="openJokes(${i})"> ${data[i]} </div>`;

            document.getElementById(
                'sub-categories' + i
            ).style.background = generate();
        }

        // Second menu buttons without gradient color
        let categories2 = document.getElementById('categories2');

        for (let i = 0; i < data.length; i++) {
            // categories2.innerHTML = categories2.innerHTML + "<div id='sub-categories2" + i + "' class='sub-categories2' onclick='openJokes(" + i + ")'>" + data[i] + '</div>';
            categories2.innerHTML = categories2.innerHTML + `<div id="sub-categories2${i}" class="sub-categories2" onclick="openJokes(${i})"> ${data[i]} </div>`
        }

    });



function openJokes(e) {
    let jokes = document.getElementById('jokes');
    jokes.innerHTML = '<img src="/img/821.gif" alt="" srcset="">';
    let categorieJokes = document.getElementById('sub-categories' + e).innerText;
    document.getElementById('header').style.display = 'none';
    document.getElementById('image').style.display = 'none';
    document.getElementById('second-header').style.display = 'flex';
    document.getElementById('choose-category').innerHTML = '<span>' + categorieJokes + '</span>';
    document.getElementById('jokes').style.display = 'block';
    document.getElementById('first-menu').style.display = 'none';
    document.getElementById('categories2').style.display = 'flex';
    document.getElementById('sliders-jokes').style.display = 'none';
    // Promise for get 5 jokes

    const urlJoke = 'https://api.chucknorris.io/jokes/random?category=' + categorieJokes;
    let futureInner = '';

    new Promise(function (resolve, reject) {
        for (let i = 0; i < 5; i++) {
            fetch(urlJoke)
                .then(jokesResult => {
                    return jokesResult.json();
                })
                .then(jokesData => {
                    futureInner = futureInner + "<div class='jokes-block'>" + jokesData.value + '</div>';
                    if (i == 4) {
                        jokes.innerHTML = futureInner;
                        resolve();
                    }
                });
        }
    });

    // sub-menu buttons change color

    let changeColor = document.getElementById('choose-category').innerText;
    let categoriesChange = document.getElementsByClassName('sub-categories2');
    for (let i = 0; i < categoriesChange.length; i++) {
        let ps = categoriesChange[i].innerText;
        if (changeColor === ps) {
            document.getElementById('sub-categories2' + e).style.backgroundColor = '#fcd561';
            document.getElementById('sub-categories2' + e).style.color = 'black';
        } else {
            document.getElementById('sub-categories2' + i).style.backgroundColor = '#261462';
            document.getElementById('sub-categories2' + i).style.color = 'rgb(184, 184, 184)';
        }
    }

}

//  return to the first menu

function goBack() {
    document.getElementById('header').style.display = 'block';
    document.getElementById('image').style.display = 'block';
    document.getElementById('second-header').style.display = 'none';
    document.getElementById('jokes').style.display = 'none';
    document.getElementById('first-menu').style.display = 'block';
    document.getElementById('categories2').style.display = 'none';
    document.getElementById('sliders-jokes').style.display = 'block';
}

// Promise to get 3 random jokes for sliders

let sliderItem = document.getElementById("sliders-jokes")
let futureSlider = "";

let sliderJokes = new Promise(function (resolve, reject) {
    fetch(urlArrJokes)
        .then(jokesRandom => {
            return jokesRandom.json()
        })
        .then(slidersArrJokes => {
            let x = Math.round(Math.random() * (slidersArrJokes.length - 1))
            let urlSliderJoke = 'https://api.chucknorris.io/jokes/random?category=' + slidersArrJokes[x]
            return (urlSliderJoke)
        })
        .then(urlSliderJoke => {
            for (let i = 0; i < 3; i++) {
                fetch(urlSliderJoke)
                    .then(getJokeSlider => {
                        return getJokeSlider.json()
                    })
                    .then(finalJokeSlider => {
                        let joke = finalJokeSlider.value
                        futureSlider = futureSlider + `<div class= "slider-item"><div class= "slider-chuck-joke"> ${joke} </div></div>`
                        if (i == 2) {
                            sliderItem.innerHTML = futureSlider
                            slider()
                            resolve()
                        }
                    })
            }
        })

})

// Slick slider

function slider(){
    $(document).ready(function () {
        $('#sliders-jokes').slick({
            dots: true,
            autoplay: true,
            autoplaySpeed: 5000,
        });
    });
}


// .then((futureSlider) => {
    //     $(document).ready(function () {
    //         $('#sliders-jokes').slick();
    //     });
    //     console.log("s")
    //     sliderItem.innerHTML = futureSlider
    // })
// sliderJokes.then(finalJokeSlider => {
//     let joke = finalJokeSlider.value
//     sliderItem.innerHTML = sliderItem.innerHTML + `<div class= "slider-item"><div class= "slider-chuck-joke"> ${joke} </div></div>`
//     return fetch(urlArrJokes)
// }).then(x => {
//     console.log(x)
// })

// sliderJokes.then(() => {
    // $(document).ready(function () {
    //     $('.sliders-jokes').slick();
    // });
//     console.log("s")
// })

// Slick slider

//     getJoke.then((futureInner) => {
//     jokes.innerHTML = futureInner
// })

// let futureInner = "";

// let getJoke = new Promise (function(resolve, reject) {
//     fetch(urlJoke).then((jokesData) => {
//         resolve(jokesData.json())
//     })
// })

// for (let i=0;i<5;i++) {
//    getJoke.then((jokesData) => {
//     console.log(jokesData)
//     jokes.innerHTML = jokes.innerHTML  + "<div class='jokes-block'>" + jokesData.value + "</div>"
//     return fetch(urlJoke)
// }).then((jokesData) => {
//     resolve(jokesData.json())
// })

// }

// let getJoke1 = new Promise(function(resolve, reject) {
//       fetch(urlJoke).then((jokeResult) => {
//         resolve(jokeResult.json())
//     })
// });
// let getJoke2 = new Promise(function(resolve, reject) {
//       fetch(urlJoke).then((jokeResult) => {
//         resolve(jokeResult.json())
//     })
// });
// let getJoke3 = new Promise(function(resolve, reject) {
//       fetch(urlJoke).then((jokeResult) => {
//         resolve(jokeResult.json())
//     })
// });
// let getJoke4 = new Promise(function(resolve, reject) {
//       fetch(urlJoke).then((jokeResult) => {
//         resolve(jokeResult.json())
//     })
// });
// let getJoke5 = new Promise(function(resolve, reject) {
//       fetch(urlJoke).then((jokeResult) => {
//         resolve(jokeResult.json())
//     })
// });

// for (let i = 0;i < 5; i++) {
//         Promise.all([getJoke1, getJoke2, getJoke3, getJoke4, getJoke5]).then((val) => {
//         jokes.innerHTML = jokes.innerHTML + "<div class='jokes-block'>" + val[pop].value + "</div>"
//         pop++
//     })
// }

// getJoke.then((jokesData) => {
//     console.log(jokesData)
//     futureInner = futureInner + "<div class='jokes-block'>" + jokesData.value + "</div>"
//     getJoke.then((jokesData2) => {
//         console.log(jokesData2)
//         futureInner = futureInner + "<div class='jokes-block'>" + jokesData2.value + "</div>"
//         getJoke.then((jokesData3) => {
//             futureInner = futureInner + "<div class='jokes-block'>" + jokesData3.value + "</div>"
//             getJoke.then((jokesData4) => {
//                 futureInner = futureInner + "<div class='jokes-block'>" + jokesData4.value + "</div>"
//                 getJoke.then((jokesData5) => {
//                     futureInner = futureInner + "<div class='jokes-block'>" + jokesData5.value + "</div>"
//                         jokes.innerHTML = futureInner
//                 })
//             })
//         })
//     })
// })

// const joke1 = new Promise(function(resolve, reject){
//     fetch(urlJoke).then((jokeResult1) => {
//         return jokeResult1.json()
//     }).then((jokesData1) => {
//         futureInner = futureInner + "<div class='jokes-block'>" + jokesData1.value + "</div>"
//     })
//     resolve()
// })

// const joke2 = new Promise(function(resolve, reject){
//     fetch(urlJoke).then((jokeResult2) => {
//         return jokeResult2.json()
//     }).then((jokesData2) => {
//         futureInner = futureInner + "<div class='jokes-block'>" + jokesData2.value + "</div>"
//     })
//     resolve()
// })

// const joke3 = new Promise(function(resolve, reject){
//     fetch(urlJoke).then((jokeResult3) => {
//         return jokeResult3.json()
//     }).then((jokesData3) => {
//         futureInner = futureInner + "<div class='jokes-block'>" + jokesData3.value + "</div>"
//     })
//     resolve()
// })

// const joke4 = new Promise(function(resolve, reject){
//     fetch(urlJoke).then((jokeResult4) => {
//         return jokeResult4.json()
//     }).then((jokesData4) => {
//         futureInner = futureInner + "<div class='jokes-block'>" + jokesData4.value + "</div>"
//     })
//     resolve()
// })

// const joke5 = new Promise(function(resolve, reject){
//     fetch(urlJoke).then((jokeResult5) => {
//         return jokeResult5.json()
//     }).then((jokesData5) => {
//         futureInner = futureInner + "<div class='jokes-block'>" + jokesData5.value + "</div>"
//     })
//     resolve()
// })

// Promise.all([joke1, joke2, joke3, joke4, joke5]).then(() => {
//     setTimeout(() => {
//         console.log("d")
//     jokes.innerHTML = futureInner
//     },5000)

// })

// const promiseJokes = new Promise(function(resolve, reject){
//     for (let i = 0; i < 5; i++) {
//         fetch(urlJoke)
//         .then((jokesResult) => {

//             return jokesResult.json()

//         })
//         .then((jokesData) => {
//             console.log(jokesData)
//             // jokes.innerHTML = futureInner
//             futureInner = futureInner + "<div class='jokes-block'>" + jokesData.value + "</div>"
//             return ""
//          }).then((y) => {
//              y()
//          })
//     }
//     resolve()
// })

// function changeInner(){
//     jokes.innerHTML = futureInner
// }

// for (let i = 0; i < 5; i++) {

//     fetch(urlJoke)
//         .then((jokesResult) => {
//             return jokesResult.json()
//         })
//         .then((jokesData) => {
//             console.log(jokesData)
//             jokes.innerHTML = jokes.innerHTML + "<div class='jokes-block'>" + jokesData.value + "</div>"
//         })

// }

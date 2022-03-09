const priceInput = document.querySelector('#price');
const pncInput = document.querySelector('#pnc-input');
const pncRange = document.querySelector('#pnc-range');
const inputs = document.querySelectorAll('input');

const radioType = document.querySelectorAll('input[name="type"]');

const customs = document.querySelector('input[name="customs"]');
const wholesale = document.querySelector('input[name="wholesale"]');
const vat = document.querySelector('input[name="vat"]');

const totalPriceElement = document.querySelector('#total-price');
const animItems = document.querySelectorAll('._anim-items');

$(document).ready(function () {
    $.ajax({
        url: "http://localhost:3000",
        context: document.body,
        success: function (response) {
            const { rate } = response
            $(".todayRate").val(rate)
            $(".todayRateInfo").text(rate)
        }
    });
});


/*---ANIMATION Total---*/

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);

    function animOnScroll() {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = Offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_active');
            } else {
                animItem.classList.remove('_active');
            }

        }
    }

    function Offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }

    }

    setTimeout(() => {
        animOnScroll();
    }, 100);

}

/*---CALCULATE---*/

pncRange.addEventListener('input', function () {
    pncInput.value = pncRange.value;
});

pncInput.addEventListener('input', function () {
    pncRange.value = pncInput.value;
});

function calculate() {
    let totalPrice = parseFloat(priceInput.value) * parseInt(pncInput.value);

    for (const radio of radioType) {
        if (radio.checked) {
            totalPrice = totalPrice * parseFloat(radio.value);
        }
    }

    if (customs.checked) {
        totalPrice = totalPrice * parseFloat(customs.value);
    }

    if (wholesale.checked) {
        totalPrice = totalPrice * parseFloat(wholesale.value);
    }

    if (vat.checked) {
        totalPrice = totalPrice * parseFloat(vat.value);
    }

    const formatter = new Intl.NumberFormat('ru');
    totalPriceElement.innerText = formatter.format(totalPrice);
}

calculate();

for (const input of inputs) {
    input.addEventListener('input', function () {
        calculate();
    });
}

/* --- GAME --- */


document.addEventListener("keydown", function (event) {
    console.log("Here")
    jumpNurse();

});

/* --- mobile_listener --- */
document.querySelector('.game').addEventListener("touchstart", myTouch);

function myTouch(event) {
    jumpNurse();
}

function disableScroll() {
// Get the current page scroll position
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,

// if any scroll is attempted, set this to the previous value
        window.onscroll = function () {
            window.scrollTo(scrollLeft, scrollTop);
        };
}
// Получаем nurse и covid через documentqueryselector 
// Берем позиция девочки ofset x + width
// Covid offSet x  - nurse (позиция). Если это меньше 5 , тогда засчитываем столкновение- иначе прыжок

// offSetX

let jumpCounter = 0;
let offJump = 0;

function jumpNurse() {

    if (nurse.classList != "jump") {
        nurse.classList.add("jump")
    }

const nurseInterval = document.querySelector('#nurse');
const topNurse = parseInt(nurseInterval.offsetTop);
const covidInterval = document.querySelector('#covid');
const leftCovid = parseInt(covidInterval.offsetLeft);

console.warn(leftCovid);
console.warn(topNurse);

if (leftCovid >= 75 && leftCovid <= 125 && topNurse === 105) {
    jumpCounter++;
    document.getElementById("result-game").innerText = jumpCounter;
    document.getElementById('boom').style.display="none";


} else {
    offJump++;
    document.getElementById("jumps-off").innerText = offJump;
    document.getElementById('boom').style.display="block";
} 


setTimeout(function () {
    nurse.classList.remove("jump");
}, 300)
}


function startGame() {
    disableScroll()
    if (covid.classList != "startCovidMov") {
        covid.classList.add("startCovidMov")
    }
}

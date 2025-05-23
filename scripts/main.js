const num_op = [];

let clear_state = true;
const disp_element = document.querySelector("p");
const digits = document.querySelector(".numbers");
const default_sign = '+';

function initialize(){
    let sign = default_sign;
    createDigits();
    addEventListeners();
}

function createDigits(){
    for (let i = 0; i < 10; i++) {
        const digit = document.createElement("button");
        digit.classList.add("digit");
        digit.textContent = i;
        digits.appendChild(digit);
    }
}

function addEventListeners(){
    digits.addEventListener("click", handle_num);

    // using event delegation b/c there's multiple elements within the .operators class
    // added event listener to parent div
    operators = document.querySelector(".operators");
    operators.addEventListener("click", handle_op);

    const clear = document.querySelector(".clear");
    clear.addEventListener("click", handle_clear);

    const sign_toggle = document.querySelector(".sign");
    sign_toggle.addEventListener("click", handle_sign);
    
    const equal = document.querySelector(".equal");
    equal.addEventListener("click", handle_eq)
    
    const back = document.querySelector(".back");
    back.addEventListener("click", handle_back);

}


function handle_back() {
    if (!(disp_element.textContent === "00" || disp_element.textContent === "")) {
        if (disp_element.textContent === "-") {
            sign = default_sign;
        }
        disp_element.textContent = disp_element.textContent.slice(0, -1);
    }
}

function handle_sign() {
    // TODO: Add these conditions to a list, getting unwieldy
    if (!(disp_element.textContent === "" || disp_element.textContent === "00" || disp_element.textContent === "0" || disp_element.textContent === "INF")) {
        if (sign === '+') {
            // toggle negative
            sign = '-';
            disp_element.textContent = "-" + disp_element.textContent;
        }
        else {
            sign = '+';
            disp_element.textContent = disp_element.textContent.slice(1);
        }
    }
}

function handle_num(event) {
    if (event.target.tagName === "BUTTON") {
        if (clear_state) {
            clear_disp();
            clear_state = false;
        }
        disp_element.textContent += event.target.textContent;
    }
}

function handle_op(event) {
    // console.log(event.target);
    if (event.target.tagName === "BUTTON") {
        // if event got triggered by an actual button click and not just a random click in the div
        let num1;
        // TODO: can i replace with if (clear_state) to be more clear??
        if (num_op.length === 0) {
            num1 = Number(disp_element.textContent);
            num_op[0] = num1;
            sign = default_sign;
            // num_op[1] = e.target.textContent;
        }
        else {
            // a lot of repetitiion here and in handle_eq, think this could be better organized
            // console.log("here");
            let num2 = Number(disp_element.textContent);
            // console.log(num2);
            num1 = num_op[0];
            let op = num_op[1];

            let result = do_op(num1, num2, op);
            num_op[0] = result;
            // num_op[1] = e.target.textContent;
            if (result === 'INF')
                sign = default_sign;
            else
                sign = result >= 0 ? '+' : '-';
        }
        num_op[1] = event.target.textContent;

        clear_disp();

    }

}

function clear_disp() {
    disp_element.textContent = "";
}

function handle_clear() {
    clear_disp();
    disp_element.textContent = "00";
    clear_state = true;
    sign = default_sign;
    num_op.length = 0;
}

function do_op(num1, num2, op) {
    switch (op) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '\u00D7':
            return num1 * num2;
        case '\u00F7':
            if (num2 != 0)
                return num1 / num2;
            else
                return "INF";
        default:
            return "NA";
    }
}

function handle_eq(event) {
    if (num_op.length === 0) {
        return;
    }
    let num1 = num_op.shift();
    let op = num_op.shift();
    let num2 = Number(disp_element.textContent);
    let result = do_op(num1, num2, op)
    clear_disp()
    disp_element.textContent = result;
    clear_state = true;
    if (result === 'INF')
        sign = default_sign;
    else
        sign = result >= 0 ? '+' : '-';
}


initialize();
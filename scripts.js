onload = function() {

    const tipCalculatorContainer = () => {
        let test = document.querySelectorAll(".tip-calc__label");
        const amounts = document.querySelectorAll(".tip-calc__right-h2");
        const reset = document.querySelector(".tip-calc__reset-button");
        const cont = document.querySelector(".tip-calc__cont");
        const input = document.querySelectorAll(".tip-calc__input");
        const percentButton = document.querySelectorAll(".tip-calc__select-button");
        const percentButtonArr = [...percentButton];

        //show or hide the error messages and borders
        const showErrors = () => {
            const errorMessage = document.querySelectorAll(".tip-calc__label--error");
            for (let i = 0; i < percentButton.length; i++) {
                percentButton[i].addEventListener("click", function(e) {
                    e.preventDefault();
                    for (let j = 0; j < input.length; j++) {
                        if (input[j].value.length < 1) {
                            errorMessage[j].style.display = 'block';
                            input[j].classList.add("tip-calc__show-error");
                            input[j].classList.remove("tip-calc__input-border")
                        } else if (input[j].value.length > 0) {
                            errorMessage[j].style.display = 'none';
                            input[j].classList.remove("tip-calc__show-error");
                            input[j].classList.add("tip-calc__input-border");
                        }
                        input[j].addEventListener("input", function() {
                            if (input[j].value.length < 1) {
                                percentButtonArr.forEach(b => b.classList.remove("tip-calc__selected"));
                            }
                        })
                    }
                })
            }
        }

        showErrors();

        //remove the placeholders from the inputs on focus
        const removePlaceholdersOnFocus = () => {
            const placeHolder = document.querySelectorAll(".tip-calc__placeholder--right");
            const input = document.querySelectorAll(".tip-calc__input");
            const custom = document.querySelector(".tip-calc__custom-button");

            for (let i = 0; i < input.length; i++) {
                input[i].addEventListener("focusin", function() {
                    if (input[i].value.length === 0) {
                        placeHolder[i].style.display = 'none';
                    }           
                    if (input[i].value.length === 0 && input[i].classList.contains("tip-calc__show-error") === false) {
                        input[i].classList.add("tip-calc__input-border");
                    }
                })

                input[i].addEventListener("focusout", function() {
                    if (input[i].value.length === 0) {
                        placeHolder[i].style.display = 'block';
                    }
                    if (input[i].value.length === 0 && input[i].classList.contains("tip-calc__show-error") === false) {
                        input[i].classList.remove("tip-calc__input-border");
                    }
                })
            }

            custom.addEventListener("focusin", function() {
                custom.placeholder = '';
                custom.setAttribute("style", "border: solid 2px hsl(172, 67%, 45%)");
            })

            custom.addEventListener("focusout", function() {
                if (custom.value.length === 0) {
                    custom.placeholder = 'Custom';
                }
                if (custom.value.length === 0) {
                    custom.placeholder = 'Custom';
                    custom.setAttribute("style", "border: none");
                }
                
            })
        }

        removePlaceholdersOnFocus();

        //limit the tip amount to two decimal places with no rounding (like the design image)
        function limitToTwoDecimals(value) {
            let strValue = value.toString();
            let decimalIndex = strValue.indexOf('.');   
            if (decimalIndex === -1) return value.toFixed(2);
            let integerPart = strValue.substring(0, decimalIndex);
            let decimalPart = strValue.substring(decimalIndex + 1, decimalIndex + 3);
            return parseFloat(integerPart + '.' + decimalPart).toFixed(2);
        }

        //calculate the tip amount and total
        const findTipAmount = () => {
            for (let i = 0; i < percentButton.length; i++) {
                percentButton[i].addEventListener("click", function() {
                    if (input[1].value.length > 0 && input[0].value.length > 0 && i != 5) {
                        let amountNum = input[0].value * (percentButton[i].innerHTML / 100);
                                amountNum = amountNum / input[1].value;
                                amounts[0].innerHTML = limitToTwoDecimals(amountNum);
                                let totTip = amountNum * input[1].value;
                                let totAmount = parseFloat(input[0].value);
                                let billTot = totTip + totAmount;
                                billTot = billTot / input[1].value;
                                amounts[1].innerHTML = billTot.toFixed(2);
                                reset.classList.add("tip-calc__reset-active");
                                percentButton[i].classList.add("tip-calc__selected");                       
                    }
                    for (let j = 0; j < percentButton.length; j++) {
                        if (i != j && percentButton[i].classList.contains("tip-calc__selected") || i != j && percentButton[i].classList.contains("tip-calc__custom-button")) {
                            percentButton[j].classList.remove("tip-calc__selected");
                        }
                    }    
                })
            }
        }

        findTipAmount();

        //set the tip percentage for the custom button
        const setCustomPercentage = () => {
            percentButton[5].addEventListener("input", function() {
                    if (input[1].value.length > 0 && input[0].value.length > 0) {
                        let amountNum = input[0].value * (percentButton[5].value / 100);
                        amountNum = amountNum / input[1].value;
                        amounts[0].innerHTML = limitToTwoDecimals(amountNum);
                        let totTip = amountNum * input[1].value;
                        let totAmount = parseFloat(input[0].value);
                        let billTot = totTip + totAmount;
                        reset.classList.add("tip-calc__reset-active");
                        billTot = billTot / input[1].value;
                        amounts[1].innerHTML = billTot.toFixed(2);
                    }
                })

                percentButton[5].addEventListener("click", function() {
                    if (input[1].value.length > 0 && input[0].value.length > 0 && percentButton[5].value.length > 0) {
                        let amountNum = input[0].value * (percentButton[5].value / 100);
                        amountNum = amountNum / input[1].value;
                        amounts[0].innerHTML = limitToTwoDecimals(amountNum);
                        let totTip = amountNum * input[1].value;
                        let totAmount = parseFloat(input[0].value);
                        let billTot = totTip + totAmount;
                        billTot = billTot / input[1].value;
                        amounts[1].innerHTML = billTot.toFixed(2);
                        reset.classList.add("tip-calc__reset-active");
                    }
                })

                percentButton[11].addEventListener("input", function() {
                    if (input[1].value.length > 0 && input[0].value.length > 0) {
                        let amountNum = input[0].value * (percentButton[11].value / 100);
                        amountNum = amountNum / input[1].value;
                        amounts[0].innerHTML = limitToTwoDecimals(amountNum);
                        let totTip = amountNum * input[1].value;
                        let totAmount = parseFloat(input[0].value);
                        let billTot = totTip + totAmount;
                        reset.classList.add("tip-calc__reset-active");
                        billTot = billTot / input[1].value;
                        amounts[1].innerHTML = billTot.toFixed(2);
                    }
                })

                percentButton[11].addEventListener("click", function() {
                    if (input[1].value.length > 0 && input[0].value.length > 0 && percentButton[11].value.length > 0) {
                        let amountNum = input[0].value * (percentButton[11].value / 100);
                        amountNum = amountNum / input[1].value;
                        amounts[0].innerHTML = limitToTwoDecimals(amountNum);
                        let totTip = amountNum * input[1].value;
                        let totAmount = parseFloat(input[0].value);
                        let billTot = totTip + totAmount;
                        billTot = billTot / input[1].value;
                        amounts[1].innerHTML = billTot.toFixed(2);
                        reset.classList.add("tip-calc__reset-active");
                    }
                })
        }

        setCustomPercentage();

        //clear calculator input
        const resetForm = () => {
            reset.addEventListener("click", function(e) {
                e.preventDefault();
                if (reset.classList.contains("tip-calc__reset-active")) {
                    cont.submit();
                }
            })
    
        }

        resetForm();

    }

    tipCalculatorContainer();
   






















}

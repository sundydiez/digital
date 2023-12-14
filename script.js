let activeInput = document.getElementById('hexField'); 
let disableKeys = []; 

document.addEventListener("DOMContentLoaded", function () {
    var inputFields = document.querySelectorAll("input[type='text']");
    inputFields.forEach(function (field) {
        field.addEventListener('click', function() {
            const inputs = document.querySelectorAll("input[type='text']");
            inputs.forEach(function(input) {
                input.classList.remove('active');
            });

            if(this.id === field.id) {
                field.classList.add('active'); 
                activeInput = this; 

                
                if(this.id === 'octalField') {
                    disableKeys = ['A', 'B', 'C', 'D', 'E', 'F', '8', '9']; 
                }else if(this.id === 'binaryField') {
                    disableKeys = ['2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']; 
                }else if(this.id === 'decimalField') {
                    disableKeys = ['A', 'B', 'C', 'D', 'E', 'F']; 
                }else {
                    disableKeys = []; 
                }
                const btns = document.getElementsByClassName("converterButton");
                for (let i = 0; i < btns.length; i++) {
                    if (disableKeys.includes(btns[i].id)) {
                        btns[i].classList.add('disable');
                    } else {
                        btns[i].classList.remove('disable');
                    }
                }
            }
        });
        field.addEventListener("input", function () {
            if (field.id === 'decimalField') {
                field.value = field.value.replace(/[^\d.]/g, '');
            } else if (field.id === 'binaryField') {
                field.value = field.value.replace(/[^01]/g, '');
            } else if (field.id === 'octalField') {
                field.value = field.value.replace(/[^0-7]/g, '');
            } else if (field.id === 'hexField') {
                field.value = field.value.replace(/[^0-9A-Fa-f]/g, '');
            }
            handleInput(field);
        });
    });
});

function handleInput(inputField) {
    if(!activeInput) {
        activeInput = document.getElementById('hexField'); 
    }

    // console.log(activeInput)
    var inputValue = inputField.value;

    if (!inputValue) {
        clearFields();
        return;
    }

    if (inputField.id === 'binaryField') {
        convertFromBinary(inputValue, 'binaryField');
    } else if (inputField.id === 'octalField') {
        convertFromOctal(inputValue, 'octalField');
    } else if (inputField.id === 'hexField') {
        convertFromHexadecimal(inputValue, 'hexField');
    } else {
        convertFromDecimal(inputValue);
    }
}

function appendToField(targetFieldId, value) {
    var accc = document.getElementById(activeInput.id); 
    console.log(accc)
    accc.blur(); 
    if (accc.tagName === 'INPUT' && accc.type === 'text') {

        if (value === 'AC') {
            accc.value = '';
        } else if (value === 'DEL') {
            accc.value = accc.value.slice(0, -1);
        } else {
            appendHexToField(accc, value);
            // console.log('activeInput', activeInput)
        }
        handleInput(accc);
    }
    
    // var activeField = document.getElementById(targetFieldId);


    // if (activeField.tagName === 'INPUT' && activeField.type === 'text') {
    //     if (value === 'AC') {
    //         activeField.value = '';
    //     } else if (value === 'DEL') {
    //         activeField.value = activeField.value.slice(0, -1);
    //     } else {
    //         appendHexToField(activeField, value);
    //     }
    //     handleInput(activeField);
    // }
}


function appendHexToField(field, value) {

    var currentText = field.value;
    console.log(field.value)
    var cursorPosition = field.selectionStart;
    var newText =
        currentText.substring(0, cursorPosition) +
        value +
        currentText.substring(cursorPosition);
    field.value = newText; 
}

function convertFromBinary(value, targetFieldId) {
    value = value.replace(/[^01]/g, '');

    if (/^[01]+$/.test(value)) {
        var decimalValue = parseInt(value, 2);
        updateFields(decimalValue, targetFieldId);
    } else {
        clearFields();
    }
}

function convertFromOctal(value, targetFieldId) {
    if (/^[0-7]+$/.test(value)) {
        var decimalValue = parseInt(value, 8);
        updateFields(decimalValue, targetFieldId);
    } else {
        clearFields();
    }
}

function convertFromHexadecimal(value, targetFieldId) {
    if (/^[0-9A-Fa-f]+$/.test(value)) {
        var decimalValue = parseInt(value, 16);
        updateFields(decimalValue, targetFieldId);
    } else {
        clearFields();
    }
}

function convertFromDecimal(value) {
    if (/^[\d.]+$/.test(value)) {
        var decimalValue = parseFloat(value);
        updateFields(decimalValue);
    } else {
        clearFields();
    }
}

function updateFields(decimalValue, targetFieldId) {
    document.getElementById('decimalField').value = decimalValue;
    document.getElementById('binaryField').value = decimalValue.toString(2);
    document.getElementById('octalField').value = decimalValue.toString(8);
    document.getElementById('hexField').value = decimalValue.toString(16).toUpperCase();
}

function clearFields() {
    document.getElementById('decimalField').value = '';
    document.getElementById('binaryField').value = '';
    document.getElementById('octalField').value = '';
    document.getElementById('hexField').value = '';
}

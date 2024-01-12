let treeDepth = 0;

/**
 * Starts the script on load
 */
function start(){
    // check for old browser
    if ( !document.getElementById ){
        window.location = "legacy.html";
    }

    if (localStorage.getItem('recentEntry') !== null ){
        removeAllChildElements('previousResult');
        loadRecent();
    }
    divMaker(data.init);
}

function restart(){
    if (confirm(`Reset your choices?\n(This will not reset content in the "Previous Selected Item" box.)`)){
        removeAllChildElements('marioForm');
        removeAllChildElements('output');
        removeAllChildElements('userFeedback');
        divMaker(data.init);
    }
}

/**
 * Makes a new forum object based on the last value selected
 * @param {Object?} dom The object to be passed through
 */
function dataGetter(dom){
    if(dom.value !== 'none'){
        treeFixer(dom.id);
        //console.log(dom);
        //console.log(dom.id);
        //console.log(dom.value);
        for (let item in data){
            //console.log(item);
            //console.log(data[item]);
            if ( item === dom.value){
                divMaker(data[dom.value]);
            }
        }
    }  
}

/**
 * prunes the 'dom' tree to the earliest roots
 * @param {String} idNumber The number to stop removing at (decending)
 */
function treeFixer(idNumber){
    let marioForm = $('marioForm');
    let lastOption = marioForm.lastChild;
    let output = $('output');
    // clean up child nodes
    while (lastOption.id !== idNumber){
        marioForm.removeChild(lastOption);
        lastOption = marioForm.lastChild;
    }
    // remove any shown result images, result text, etc
    while (output.firstChild){
        output.removeChild(output.firstChild);
    }
}

/**
 * remove all child elements from a defined section with an id
 * @param {String} id the id to remove results from
 */
function removeAllChildElements(id){
    let element = $(id)
    //console.log(element);
    while (element.firstChild ){
        element.removeChild(element.firstChild);
    }
}

/**
 * load the most recent selected item, if it exists
 */
function loadRecent(){
        let localStorageImg = document.createElement('img');
        let localStorageText = document.createElement('p');
    if (window.localStorage){
        localStorageImg.setAttribute('src', localStorage.getItem('recentImage'));
        localStorageText.appendChild(
            document.createTextNode(
                localStorage.getItem('recentEntry')
            )
        );
    } else {
        localStorageImg.setAttribute('src', GetCookie('recentImage'));
        localStorageText.appendChild(
            document.createTextNode(
                GetCookie('recentEntry')
            )
        )
    }
    $('previousResult').appendChild(localStorageImg);
    $('previousResult').appendChild(localStorageText);
}


function upAnimation(dom, distance, dx, appear){
    dom.style.top = distance + 'px';
    //console.log("top: " + dom.style.top);
    distance = distance - distance;
    //console.log(distance);
    upAnimationLooper(dom, distance, dx, appear);
}

/**
 * "Teleports" an animation down off of the screen, then moves it back up in a slow manner
 * @param {Object?} dom The object to be passed throgh
 * @param {Int} startEnd The amount to move the item
 * @param {Int} dx rate at which it will be moved back up
 * @param {Bool} appear force the objects visibility to be visible
 */
function upAnimationLooper(dom, startEnd, dx, appear){
    //debugger;
    // get my position
    let position = parseInt(dom.style.top);
    //console.log("Position: " + position);
    if(position > startEnd){
        // moveme
        dom.style.top = position - dx + 'px';
        // move again when ready
        requestAnimationFrame(function(){upAnimationLooper(dom, startEnd, dx, appear);});
    }
}

/**
 * Makes an input in html
 * @param {String} type Input type
 * @param {String} name Input name
 * @param {String} id id name
 */
function inputMaker(type, name, id){
    let inputElement = document.createElement('input');
    inputElement.setAttribute('type', type);
    inputElement.setAttribute('name', name);
    inputElement.setAttribute('id', id);
    return inputElement;
}

/**
 * Validates the form
 * @returns true if the form is valid, false otherwise
 */
function validateForm(){
    let valid = true;
    if($('name').value === ''){
        alert("The name field is empty.");
        return false;
    }
    if($('email').value === ''){
        alert("The email field is empty.");
        return false;
    }
    return valid;
}

/** 
* Create a forum (generateForm();)
* - with method 
* 	- get 
* 	- onsubmit return validate form
* - two labels for name and email, each one with
* 	- an input with
* 		- the correct type
* 		- name
* 		- id
* 		- required=true
* 	- createTextNode, with the label attribute
* 		- append this with appendchild
*/
function generateForm(){
    let formElement = document.createElement('form');
    formElement.setAttribute('action', 'page.php');
    formElement.setAttribute('method', 'get');
    formElement.setAttribute('onsubmit','return validateForm();');
    formElement.setAttribute('class', 'verticalLayout')
    // h2
    let h2Element = document.createElement('h2');
    let h2Text = document.createTextNode('Submit Feedback:');
    h2Element.appendChild(h2Text);
    // name element
    let nameLabel = document.createElement('label');
    let nameText = document.createTextNode('name: ');
    let nameInput = inputMaker('text', 'name', 'name');
    nameLabel.appendChild(nameText);
    nameLabel.appendChild(nameInput);
    // email element
    let emailLabel = document.createElement('label');
    let emailText = document.createTextNode('email: ');
    let emailInput = inputMaker('email', 'email', 'email');
    emailLabel.appendChild(emailText);
    emailLabel.appendChild(emailInput);
    // submit button
    let submitButton = document.createElement('input');
    submitButton.setAttribute('type', 'submit');
    submitButton.setAttribute('value', 'go');
    // appending everything together
    formElement.appendChild(h2Element);
    formElement.appendChild(nameLabel);
    formElement.appendChild(emailLabel);
    formElement.appendChild(submitButton);
    $('userFeedback').appendChild(formElement);
    upAnimation($('userFeedback'), 1000, 5, true);
}

/**
 * Needs to:
 * make a dropdown with three choices
 * first one defaults to the question
 * the rest are the choices that the user can go to 
 * use onchange([command])
 * see section 3a for generation
 * @param {*} questionList the list of prompts to insert as a question
 */
function divMaker(questionList){
    //let moveDown = "200";
    //console.log(questionList);
    removeAllChildElements('userFeedback');
    if (questionList.length !== 2){
        let counter = 0;
        // create the select elements
        let selectElement = document.createElement('select');
        selectElement.setAttribute('id', treeDepth);
        selectElement.setAttribute('onchange', 'dataGetter(this)');
        selectElement.setAttribute('class', 'scrollUp');
        for (item of questionList){
            // create the option elements    
            let optionElement = document.createElement('option');
            let text = ''
            if (counter === 0){
                // create "select option"
                optionElement.setAttribute('value','none');
                text = document.createTextNode(item);

            } else {
                optionElement.setAttribute('value', item);
                text = document.createTextNode(item);
            }
            // append option element to select element
            optionElement.appendChild(text);
            selectElement.appendChild(optionElement);
            counter++;
        }
        // append the select element and run animations on it
        //selectElement.setAttribute('visibility', hidden);
        $('marioForm').appendChild(selectElement);
        // debugger;
        upAnimation($('marioForm').lastChild, 1000, 5, true);
        treeDepth++;
    } else {
        output = $('output');
        let h2Element = document.createElement('h2');
        let h2Text = document.createTextNode('Your Result:');
        h2Element.appendChild(h2Text);
        output.appendChild(h2Element);
        // create the final image with text
        let textPart = questionList[0];
        let imagePart = questionList[1];
        //console.log(questionList);
        //console.log(imagePart);
        //image
        let imgElement = document.createElement('img');
        imgElement.setAttribute('src', imagePart);
        output.appendChild(imgElement);
        //text
        let textElement = document.createElement('p');
        let text = document.createTextNode(textPart);
        textElement.appendChild(text);
        output.appendChild(textElement);
        removeAllChildElements('previousResult');
        // store the most recent entry in previousResult using localStorage or a cookie
        if (window.localStorage){
            // use localStorage
            localStorage.setItem('recentImage', imagePart);
            localStorage.setItem('recentEntry', textPart);
            console.log("part: " + textPart);
            loadRecent();
        } else {
            // use cookies
            SetCookie('recentImage', imagePart);
            SetCookie('recentEntry', textPart);
            loadRecent();
        }
        
        upAnimation($('output'), 1000, 5, true);
        generateForm();
    }
    
}

/**
 * Shorthand to getElementById
 * @param {String} id the id
 * @returns the id
 */
function $(id){
    return document.getElementById(id);
}

/**
 * Shorthand to getElementsByTagName
 * @param {String} tag the tag
 * @param {Number} num the number
 * @returns the tagName
 */
function $$(tag, num){
    return document.getElementsByTagName(tag)[num];
}


//Customer Login Modal
function showCustLoginModal(){
    var modal = document.getElementById("custLoginModal");
    modal.style.display = "block";

    var span = document.getElementsByClassName("close")[0];
}

function closeCustLoginModal(){
    var modal = document.getElementById("custLoginModal");
    modal.style.display = "none";
}

window.onclick = function(event){
    var modal = document.getElementById("custLoginModal");
    if(event.target == modal){
        modal.style.display = "none";
    }
}

//New Customer Modal
function handleNewCustomer(){
    //close customer login form
    var modal = document.getElementById("custLoginModal");
    modal.style.display = "none";

    //show modal for new customer form
    modal = document.getElementById("newCustModal");
    modal.style.display = "block";
}

function closeNewCustModal(){
    var modal = document.getElementById("newCustModal");
    modal.style.display = "none";
}

window.onclick = function(event){
    var modal = document.getElementById("newCustModal");
    if(event.target == modal){
        modal.style.display = "none";
    }
}

function handleCustomerSignIn()
{
    document.getElementById("custSignInErrorMsg").style.display = "none"; //hide the errorMsg unless sign-in is invalid
    
    //get value of user input email and password
    let inputEmail = document.getElementById("customerEmail").value;
    let inputPassword = document.getElementById("customerPassword").value;

    var success;
    let customer = "";
    let errorMsgHtml = "";

    const customerApiUrl = "https://localhost:5001/api/Customer/"+inputEmail;
    fetch(customerApiUrl).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(json){
        if(json.customerId == 0){
            //if no customer found w/ that email address, display error message
            errorMsgHtml = "<p>No customer found with that email address.</p>";
            document.getElementById("custSignInErrorMsg").innerHTML = errorMsgHtml;
            document.getElementById("custSignInErrorMsg").style.display = "block";
        }
        else { //if the customer was found with that email, check for the password
            if(inputPassword == json.password){
                customer = json; //set the json object to the customer
                window.location.href = "./customer.html?id="+customer.customerId; //go to customer dashboard
            }
            else {
                //if password doesn't match, display error message
                errorMsgHtml = "<p>Invalid login.</p>";
                document.getElementById("custSignInErrorMsg").innerHTML = errorMsgHtml;
                document.getElementById("custSignInErrorMsg").style.display = "block";
            }
        }
    }).catch(function(error){
        console.log(error);
    }) 

}


function handleCreateNewCustOnClick(){
    const customerApiUrl = "https://localhost:5001/api/Customer";

    //get customer data
    let inputEmail = document.getElementById("custEmail").value;
    let inputPassword = document.getElementById("custPassword").value;
    let inputFirstName = document.getElementById("custFirstName").value;
    let inputLastName = document.getElementById("custLastName").value;
    let dob = document.getElementById("custBirthDate").value;
    let inputGender = document.getElementById("custGender").value;
    let inputFitnessGoals;
    console.log("birthDate is " + dob);
    if(document.getElementById("fitnessGoals").value != null){
        inputFitnessGoals = document.getElementById("fitnessGoals").value;
    }
    else{
        inputFitnessGoals = null;
    }
    //To-do: handle preferred activities

    //If yesReferred is checked, get referrerName
    if(document.getElementById("yesReferred").checked){
        let referredByName = document.getElementById("referrerName");
    }

    console.log(inputPassword + " " + dob + " " + inputGender + " " + inputFirstName + " " + inputLastName + " " + inputEmail);
    console.log("fitness goals: " + inputFitnessGoals);

    var bodyObj = {
        password: inputPassword,
        birthDate: dob, 
        gender: inputGender,
        fitnessGoals: inputFitnessGoals,
        PhoneNo: "5554443333", //putting a fake phoneNo in here for now because the form isn't set up to take in a phone number yet.
        fName: inputFirstName,
        lName: inputLastName,
        email: inputEmail
        // referredBy: referredByName,
    };

    //make api call to create customer
    fetch(customerApiUrl, {
        method: "POST",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(bodyObj)
    }).then(function(response){
        console.log("made it to the POST");
        console.log(response);
        
    })

    sendCustomerToDashboard(inputEmail);
}

function sendCustomerToDashboard(email){
    //get new customer's id and send them to ./customer.html?id=@id@
    const getCustomerApiUrl = "https://localhost:5001/api/Customer/"+email;
    fetch(getCustomerApiUrl).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(json){
        let customerId = json.customerId;
        window.location.href = "./customer.html?customerId="+customerId;
        //console.log("customerId is " + customerId);
    }).catch(function(error){
        console.log(error);
    }) 

}



//Trainer Login Modal
function showTrainerLoginModal(){
    var modal = document.getElementById("trainerLoginModal");
    modal.style.display = "block";

    var span = document.getElementsByClassName("close")[0];
}

function closeTrainerLoginModal(){
    var modal = document.getElementById("trainerLoginModal");
    modal.style.display = "none";
}

window.onclick = function(event){
    var modal = document.getElementById("trainerLoginModal");
    if(event.target == modal){
        modal.style.display = "none";
    }
}

function handleNewTrainer(){ //to pop up new trainer form
    //close trainer login modal
    var modal = document.getElementById("trainerLoginModal");
    modal.style.display = "none";

    //show modal for new trainer form
    var modal = document.getElementById("newTrainerModal");
    modal.style.display = "block";

}


/* TRAINER login / sign-up */
function handleTrainerSignIn(){
    document.getElementById("trainerSignInErrorMsg").style.display = "none"; //hide the errorMsg unless sign-in is invalid
    
    //get value of user input email and password
    let inputEmail = document.getElementById("trainerEmail").value;
    let inputPassword = document.getElementById("trainerPassword").value;
    console.log("inputEmail is " + inputEmail);


    let trainer = "";
    let errorMsgHtml = "";

    const trainerApiUrl = "https://localhost:5001/api/Trainer/"+inputEmail;
    fetch(trainerApiUrl).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(json){
        if(json.trainerId == 0){
            //if no trainer found w/ that email address, display error message
            errorMsgHtml = "<p>No trainer found with that email address.</p>";
            document.getElementById("trainerSignInErrorMsg").innerHTML = errorMsgHtml;
            document.getElementById("trainerSignInErrorMsg").style.display = "block";
        }
        else { //if the trainer was found with that email, check for the password
            if(inputPassword == json.password){
                trainer = json; //set the json object to the trainer
                window.location.href = "./trainer.html?id="+trainer.trainerId; //go to trainer dashboard
            }
            else {
                //if password doesn't match, display error message
                errorMsgHtml = "<p>Invalid login.</p>";
                document.getElementById("trainerSignInErrorMsg").innerHTML = errorMsgHtml;
                document.getElementById("trainerSignInErrorMsg").style.display = "block";
            }
        }
    }).catch(function(error){
        console.log(error);
    }) 
}

function handleCreateNewTrainerOnClick(){ 
    const trainerApiUrl = "https://localhost:5001/api/Trainer";

    //get customer data
    let inputEmail = document.getElementById("newTrainerEmail").value;
    let inputPassword = document.getElementById("newTrainerPassword").value;
    let inputFirstName = document.getElementById("trainerFName").value;
    let inputLastName = document.getElementById("trainerLName").value;
    let dob = document.getElementById("trainerBirthDate").value;
    let inputGender = document.getElementById("trainerGender").value;
    
    //To-do: handle training activities and price


    //set user inputs to a body object
    var bodyObj = {
        fName: inputFirstName,
        lName: inputLastName,
        birthDate: dob,
        gender: inputGender,
        email: inputEmail,
        password: inputPassword, 
        //preferred activities []
    };
    
    //make api call to create customer
    fetch(trainerApiUrl, {
        method: "POST",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(bodyObj)
    }).then(function(response){
        console.log(response);
        console.log("made it to the post");
    })
    //create new trainer (get data and add to DB)
    //go to trainer.html
    //window.location.href = "./trainer.html";
    sendTrainerToDashboard(inputEmail);
}

function sendTrainerToDashboard(email){
    //get new customer's id and send them to Trainer Dashboard
    const getTrainerApiUrl = "https://localhost:5001/api/Trainer/"+email;
    fetch(getTrainerApiUrl).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(json){
        let trainerId = json.trainerId;
       // window.location.href = "./trainer.html?trainerId="+trainerId;
        console.log("customerId is " + trainerId);
    }).catch(function(error){
        console.log(error);
    }) 

}

function closeNewTrainerModal(){
    var modal = document.getElementById("newTrainerModal");
    modal.style.display = "none";
}

window.onclick = function(event){
    var modal = document.getElementById("newTrainerModal");
    if(event.target == modal){
        modal.style.display = "none";
    }
}


/* NOTE: this is only enabling the price input field when the checkbox is first checked.  
It is not disabiling it once it goes from checked to unchecked */
function activitySelected(inputID){
/* only enable price input fields if its corresponding checkbox is checked */
    if(document.getElementById(inputID).checked){
        //if box gets checked, enable its price input field
        console.log(inputID + " is now checked");
        document.getElementById(inputID+"Price").disabled = false;
    }
    else{
        console.log(inputID + " is now unchecked");
        //if deselected, disable the price input field
        document.getElementById(inputID+"Price").disabled = true;
    } 

}

function handleReferredByOnClick(){
    if(document.getElementById("yesReferred").checked == true){
        document.getElementById("referrerName").disabled = false;
        document.getElementById("referrerName").required;
    }
}

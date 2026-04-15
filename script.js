$(function() { 
    // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
    
    // Called function to update the name, happiness, and weight of our pet in our HTML
    checkAndUpdatePetInfoInHtml();
  
    // UNIQUE JQUERY METHOD #1: .on()
    // We use .on() for event delegation instead of .click()
    // This allows us to attach event handlers to elements using a selector
    // and data attribute. When any button with class "pet-button" is clicked,
    // we get its data-action attribute and call the corresponding function.
    $('.button-container').on('click', '.pet-button', function() {
      var action = $(this).data('action');
      handlePetAction(action);
    });
});

// Create a pet_info object with initial values for name, weight, and happiness
var pet_info = {
  name: "Froakie",
  weight: 10,
  happiness: 50
};

// Array of pet comments to display when user interacts with the pet
var petComments = {
  feed: ["Yum! That was delicious!", "Nom nom nom!", "Thanks! 😋", "I LOVE treats!"],
  pet: ["That feels nice!", "More pets please!", "I love you!", "Purrrr..."],
  play: ["Wheee! That was fun!", "Let's play again!", "Woof woof!", "Best day ever!"],
  rest: ["Zzzzz... that felt good", "I needed that nap", "Refreshed and ready!", "Sweet dreams..."],
  ignore: ["Hey... pay attention to me 😢", "I feel a little lonely...", "Did I do something wrong?", "I'm sad now..."]
};

/**
 * Decreases the pet's happiness by a specific amount
 */
function dropPetHappiness(amount) {
  pet_info['happiness'] -= amount;
}

/**
 * Handles all pet actions based on the action parameter
 * This function consolidates all button click behaviors
 */
function handlePetAction(action) {
  switch(action) {
    case 'feed':
      // Feed: Increases pet happiness by 15 and weight by 5
      pet_info['happiness'] += 15;
      pet_info['weight'] += 5;
      break;
    case 'pet':
      // Pet: Increases pet happiness by 10, weight stays the same
      pet_info['happiness'] += 10;
      break;
    case 'play':
      // Play: Increases pet happiness by 20 and decreases weight by 8
      pet_info['happiness'] += 20;
      pet_info['weight'] -= 8;
      break;
    case 'rest':
      // Rest: Increases pet happiness by 25, weight stays the same
      pet_info['happiness'] += 25;
      break;
    case 'ignore':
      // Ignore: Decreases pet happiness by 15
      dropPetHappiness(15);
      break;
  }
  showPetComment(action);
  checkAndUpdatePetInfoInHtml();
}

/**
 * Validates pet_info values to ensure they don't go below zero
 * and caps happiness at a reasonable maximum of 100
 */
function checkWeightAndHappinessBeforeUpdating() {
  // Prevent weight from going below zero
  if (pet_info['weight'] < 0) {
    pet_info['weight'] = 0;
  }
  
  // Prevent happiness from going below zero
  if (pet_info['happiness'] < 0) {
    pet_info['happiness'] = 0;
  }
  
  // Cap happiness at 100 to keep it reasonable
  if (pet_info['happiness'] > 100) {
    pet_info['happiness'] = 100;
  }
}

/**
 * Updates the HTML display with the current pet_info values
 * Changes the text content of the name, weight, and happiness elements
 */
function updatePetInfoInHtml() {
  $('.name').text(pet_info['name']);
  $('.weight').text(pet_info['weight']);
  $('.happiness').text(pet_info['happiness']);
}

/**
 * Displays a random comment from the pet after user interaction
 * Uses jQuery's .fadeIn() and .delay() methods to create a visual effect
 * 
 * UNIQUE JQUERY METHOD #2: .text()
 * .text() updates the text content of the selected element
 * We use this to dynamically update the pet's comment and mood status
 * This constantly updates the pet's mood based on happiness level
 */
function showPetComment(action) {
  var comments = petComments[action];
  var randomComment = comments[Math.floor(Math.random() * comments.length)];
  
  // Select the notification element and fade it out if it exists
  var $notification = $('.pet-notification');
  
  // .fadeOut() is used first to clear any existing comment
  $notification.fadeOut(300, function() {
    // .text() updates the text content of the notification element
    // This dynamically changes what the pet says after each interaction
    $notification.text(randomComment);
    // .fadeIn() displays the new comment smoothly
    $notification.fadeIn(300);
    // .delay() waits 2000ms before the next animation
    // .fadeOut() removes the comment after the delay
    $notification.delay(2000).fadeOut(300);
  });
}

/**
 * Updates the pet's mood status based on happiness level
 * Uses .text() to update the mood display constantly
 */
function updatePetMood() {
  var happiness = pet_info['happiness'];
  var mood;
  
  if (happiness >= 80) {
    mood = "Ecstatic! 🤩";
  } else if (happiness >= 60) {
    mood = "Very Happy 😊";
  } else if (happiness >= 40) {
    mood = "Happy 😄";
  } else if (happiness >= 20) {
    mood = "Content 😐";
  } else {
    mood = "Sad 😢";
  }
  
  // .text() constantly updates the mood span with the current mood
  $('.mood').text(mood);
}

/**
 * UNIQUE JQUERY METHOD #3: .attr()
 * .attr() gets or sets the attributes of an element
 * We use this to dynamically change the pet's image src based on its state
 * The pet's image changes to reflect whether it is happy, hungry, or sleepy
 * This provides visual feedback to the user about the pet's current condition
 */
function updatePetImage() {
  var $petImage = $('.pet-image');
  var happiness = pet_info['happiness'];
  var weight = pet_info['weight'];
  var imageSrc = 'images/froakie-happy.webp';
  var state = 'happy';
  
  // Determine the pet's state based on happiness and weight
  if (happiness >= 70) {
    // Happy - high happiness
    state = 'happy';
    imageSrc = 'images/froakie-happy.webp';
  } else if (happiness <= 10) {
    // Very sad/sleepy - extremely low happiness (check this BEFORE hungry)
    state = 'sleepy';
    imageSrc = 'images/froakie-sleepy.webp';
  } else if (happiness <= 20 || weight < 5) {
    // Hungry or very sad - low happiness or very low weight
    state = 'hungry';
    imageSrc = 'images/froakie-hungry.webp';
  } else {
    // Default normal state
    state = 'normal';
    imageSrc = 'images/froakie-happy.webp';
  }
  
  // .attr() dynamically updates the src attribute of the pet image
  // This allows the pet's visual appearance to change based on its state
  $petImage.attr('src', imageSrc);
}

/**
 * Main function that handles validation and updates the display
 */
function checkAndUpdatePetInfoInHtml() {
  checkWeightAndHappinessBeforeUpdating();  
  updatePetInfoInHtml();
  updatePetMood();
  updatePetImage();
}
  

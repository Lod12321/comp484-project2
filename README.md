# Project GigaPet JavaScript

## Purpose
This project builds the functionality and UI for a simple virtual Giga Pet game using JavaScript and jQuery.  
It demonstrates understanding of:

- JavaScript objects and arrays
- Button click interactions
- Updating HTML element properties dynamically
- Preventing invalid game-state values

## Technologies Used
- HTML
- CSS
- JavaScript
- jQuery (v2.2.1)

## Core Data Structure

### `pet_info` object
Tracks the pet's game state:

- `name`
- `weight`
- `happiness`

## Game Methods (JavaScript Functions)

### `handlePetAction(action)`
Main controller for all button actions:

- `feed` → increases happiness and weight
- `pet` → increases happiness
- `play` → increases happiness and decreases weight
- `rest` → increases happiness
- `ignore` → decreases happiness

### `dropPetHappiness(amount)`
Helper method that reduces pet happiness by a specified amount.

### `checkWeightAndHappinessBeforeUpdating()`
Validation method that:

- prevents `weight` from going below `0`
- prevents `happiness` from going below `0`
- caps `happiness` at `100`

### `updatePetInfoInHtml()`
Writes current `name`, `weight`, and `happiness` values to the dashboard.

### `showPetComment(action)`
Displays a random pet comment after each action.

### `updatePetMood()`
Computes and displays mood text based on current happiness range.

### `updatePetImage()`
Changes the pet image based on happiness and weight conditions.

### `checkAndUpdatePetInfoInHtml()`
Coordinator method that validates values and refreshes all UI pieces.

## jQuery Methods Used

### Base/Interaction Methods
- `$(function() { ... })` – run logic after DOM is ready
- `.on('click', selector, handler)` – delegated click handling for pet buttons
- `.data('action')` – reads each button action type

### UI Update Methods
- `.text()` – updates dashboard fields, mood, and comment content
- `.attr('src', imageSrc)` – updates the pet image source dynamically

### Animation/Feedback Methods
- `.fadeOut()` – hides current notification before replacing text
- `.fadeIn()` – shows updated notification smoothly
- `.delay()` – keeps notification visible briefly before fading out

## Unique jQuery Methods Highlighted
In this project, these methods are highlighted as key jQuery features:

1. `.on()` – delegated event handling
2. `.attr()` – dynamic image attribute updates

Additional jQuery methods also used: `.fadeIn()`, `.fadeOut()`, `.delay()`, `.text()`, `.data()`.

## Requirement Coverage Summary
- ✅ `pet_info` object with `name`, `weight`, `happiness`
- ✅ Button interactions with behavior changes
- ✅ Lower-bound bug fixes (no negative values)
- ✅ New action button: **Ignore**
- ✅ New behavior for added button: happiness drop
- ✅ Visual notification comments after each button press
- ✅ jQuery methods documented and used in implementation

## Notes
- Main logic file: `script.js`
- Main markup file: `index.html`
- Styling file: `style.css`

# Frontend Mentor - Newsletter sign-up form with success message solution

This is a solution to the [Newsletter sign-up form with success message challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/newsletter-signup-form-with-success-message-3FC1AZbNrv). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- Add their email and submit the form
- See a success message with their email after successfully submitting the form
- See form validation messages if:
  - The field is left empty
  - The email address is not formatted correctly
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![Mobile View Screenshot](assets/images/screenshots/mobile-view-screenshot.png)
![Tablet View Screenshot](assets/images/screenshots/tablet-view-screenshot.png)
![Desktop View Screenshot](assets/images/screenshots/desktop-view-screenshot.png)

### Links

- Solution URL: https://github.com/TumeloLutaka/newsletter-sign-up
- Live Site URL: https://tumelolutaka.github.io/newsletter-sign-up/

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- JavaScript
- CSS Media Queries

### What I learned

This challenges was more difficult than the ones I had attempted before. One of the biggest hurdles was figuring out how to properly address content that lived in the same space but could only be shown one at a time, some proper application of the hidden attribute, CSS and JavaScript help me get past that hurdle.

```html
section id="success" class="success" hidden aria-live="polite" role="alert" >
```

```css
[hidden] {
  display: none !important;
}
```

```js
form.hidden = true;
success.hidden = false;
```

## Author

- Frontend Mentor - [@TumeloLutaka](https://www.frontendmentor.io/profile/TumeloLutaka)
- Github - [@TumeloLutaka](https://github.com/TumeloLutaka)

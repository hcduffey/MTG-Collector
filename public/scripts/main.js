// https://bulma.io/documentation/components/navbar/
// Activates the hamburger links when displayed
$(document).ready(function() {

  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function() {

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

  });
});

// Event handler to show the delete modal
$("#delete-lnk").click(function () {
    $("#delete-modal").addClass("is-active");
});

// Event handler to show the edit modal
$("#edit-lnk").click(function () {
    $("#edit-modal").addClass("is-active");
});

// Event handler to close modals
$(".no-delete-btn").click(function () {
    $("#delete-modal").removeClass("is-active");
    $("#edit-modal").removeClass("is-active");
});

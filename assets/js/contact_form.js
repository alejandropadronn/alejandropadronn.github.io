$(function () {

    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function ($form, event) {
            // Prevent spam click and default submit behaviour
            $("#btnSubmit").attr("disabled", true);
            event.preventDefault();

            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }

            var formUrl = "https://docs.google.com/forms/d/e/" +
                "1FAIpQLScj8xZwks7Yrb2H5_M1KBsVsAI7xhB99iYbnePbViRaARcGFQ/" +
                "formResponse?entry.1527841574=" + name + "&entry.2008332497=" +
                email + "&entry.1737282329=" + message;

            console.log(formUrl);

            // Don't care about success or failure here
            // Since github static pages do not allow this, we just
            // need to send the above URL to google forms and it will
            // create a new form for us.
            $.ajax({
                url: formUrl,
                type: "GET",
                cache: false
            });

            // Enable button & show success message
            $("#btnSubmit").attr("disabled", false);
            $('#success').html("<div class='alert alert-success'>");
            $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                .append("</button>");
            $('#success > .alert-success')
                .append("<strong>Your message has been sent. </strong>");
            $('#success > .alert-success')
                .append('</div>');

            //clear all fields
            $('#contactForm').trigger("reset");
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

// When clicking on Full hide fail/success boxes
$('#name').focus(function () {
    $('#success').html('');
});

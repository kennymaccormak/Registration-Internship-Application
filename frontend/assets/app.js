$(function() {

  // Smoth scroll
  $('.registration-btn a').on('click', function(event) {
    
    // Make sure this.hash has a value before overriding default behavior

    if (this.hash !== ""){
      event.preventDefault();
      var hash = this.hash;
      $('body').animate({
        scrollTop: $(hash).offset().top
      }, 600, function() {
        window.location.hash = hash
      });
    }
  });

  // Header navigation forms buttons

  //default tab border-bottom color
  $('#personalData-link').parent().addClass('active');
  // Link to contactData
  $('#personalData-link').on('click', function(event) {
    event.preventDefault();
    $('#personalData').delay(100).fadeIn(100);
    $('#contactData').delay(100).fadeOut(100);

    $('#contactData-link').parent().removeClass('active');
		$(this).parent().addClass('active');
  });

  // Link to personalData
  $('#contactData-link').on('click', function(event) {
    event.preventDefault();
    $('#contactData').delay(100).fadeIn(100);
    $('#personalData').delay(100).fadeOut(100);
    $('#personalData-link').parent().removeClass('active');
    $(this).parent().addClass('active');
  });

  // Footer navigation forms buttons

  //  next Button
  $('#nextBtn-link').on('click', function(event) {
    event.preventDefault();
    $('#contactData').delay(100).fadeIn(100);
    $('#personalData').delay(100).fadeOut(100);
    $('#personalData-link').parent().removeClass('active');
    $('#contactData-link').parent().addClass('active');
  })

  // Prev button
  $('#prevBtn-link').on('click', function(event) {
    event.preventDefault();
    $('#personalData').delay(100).fadeIn(100);
    $('#contactData').delay(100).fadeOut(100);
    $('#contactData-link').parent().removeClass('active');
    $('#personalData-link').parent().addClass('active');
  })

  $('#submit').on( "click", function( event ) {
    event.preventDefault();
    validate()
  });


  function validate() {

    //  FirstName SecondName and Password validation
    var fName = $('input[name="userFirstName"]');
    var sName = $('input[name="userSecondName"]');
    var pwd = $('input[name="password"]');
    var rPwd = $('input[name="confirmPassword"]');
    var input = $('#contactForm input');
    var select = $('#contactForm select');

    isEmpty(input)
    isEmpty(select)
    isEmpty(fName);
    isEmpty(sName);
    isEqual(pwd, rPwd);


    function isEmpty(elem) {
      if(!elem.val()) {
        elem.addClass('error');
        console.log(elem.val()+ ' are empty')
      } else {
        elem.removeClass('error');
        console.log('ok')
      }
    }

    function isEqual(first, second){
      if(first.val() === '' && second.val() === '') { //
        first.addClass('error');
        second.addClass('error');
        console.log('passwords are empty')
      }
      else if (first.val() !== second.val()) {
        first.addClass('error');
        second.addClass('error');
        console.log('passwords are different')
      }
      else {
        first.removeClass('error');
        second.removeClass('error');
        console.log('ok')
      }
    }
  }

});

$(function() {

  //phone mask
  $("input[name='phone']").mask("+38 (099) 999-99-99");

  //birth mask
  $("input[name='birth'], input[name='startPractic']").mask("99/99/9999",{placeholder:"дд/мм/гггг"});

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
    $('#skillData').delay(100).fadeOut(100);

    $('#skillData-link').parent().removeClass('active');
		$(this).parent().addClass('active');
  });

  // Link to personalData
  $('#skillData-link').on('click', function(event) {
    event.preventDefault();

    if( validateStp1() ) {
      $('#skillData').delay(100).fadeIn(100);
      $('#personalData').delay(100).fadeOut(100);
      $('#personalData-link').parent().removeClass('active');
      $(this).parent().addClass('active');
    }
  });

  // Footer navigation forms buttons

  //  next Button

  $('#nextBtn-link').on('click', function(event) {
    event.preventDefault();
    /*
    // Only for Debug
    $('#skillData').delay(100).fadeIn(100);
    $('#personalData').delay(100).fadeOut(100);
    $('#personalData-link').parent().removeClass('active');
    $('#skillData-link').parent().addClass('active');
    */
    if( validateStp1() ) {
      $('#skillData').delay(100).fadeIn(100);
      $('#personalData').delay(100).fadeOut(100);
      $('#personalData-link').parent().removeClass('active');
      $('#skillData-link').parent().addClass('active');
    }
  })

  // Prev button
  $('#prevBtn-link').on('click', function(event) {
    event.preventDefault();
    $('#personalData').delay(100).fadeIn(100);
    $('#skillData').delay(100).fadeOut(100);
    $('#skillData-link').parent().removeClass('active');
    $('#personalData-link').parent().addClass('active');
  })

  // STEP 1 Validation
  function validateStp1() {

    var fName = $('input[name="userFirstName"]');
    var sName = $('input[name="userSecondName"]');
    var phone = $('input[name="phone"]');
    var email = $('input[name="email"]');
    var birth = $('input[name="birth"]');
    var cityLive = $('input[name="city-live"]');

    // Check for empty
    isEmpty(fName);
    isEmpty(sName);
    isEmpty(phone);
    isEmpty(email);
    isEmail(email);
    isEmpty(birth);
    isEmpty(cityLive);


    function isEmpty(elem) {
      if(!elem.val()) {
        elem.addClass('error');
        elem.attr('placeholder', 'Заполните поле');
      } else {
        elem.removeClass('error');
        return true
      }
    }

    function isEmail(email) {
      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return regex.test(email.val());
    }

    if(isEmpty(fName)&&isEmpty(sName)&&isEmpty(phone)&&isEmpty(email)&&isEmpty(birth)&&isEmail(email)){
      return true;
    } else {
      return false;
    }

  }

  // AJAX request getCities from vk API
  (function getCity() {
    var vkCity = 'https://api.vk.com/method/database.getCities?country_id=2';
    $.ajax({
      url: vkCity,
      type: 'GET',
      dataType: 'jsonp',
      success: function(data) {
        for(el in data.response) {
          $('#city').append('<option data-cid="'+data.response[el].cid +'">'+data.response[el].title+'</option>');
        }
      }
    });
  })();


  // GET City_id and make request For university in this city
  $('#city').on('change', function(event) {
    event.preventDefault();
    var cid = $('option:selected', this).attr('data-cid');
    getUniversity(cid)
  });

  // AJAX request getUniversities from vk API
  function getUniversity(cid) {
    $('#university').empty();
    var dataUnivercity = 'https://api.vk.com/method/database.getUniversities?city_id='+cid
    $.ajax({
      url: dataUnivercity,
      type: 'GET',
      dataType: 'jsonp',
      success: function(data) {
        for(el in data.response) {
          if (typeof(data.response[el]) === 'number') {
            $('#university').last().append('<option data-univerId="last">'+'Другой ответ'+'</option>')
          } else {
            $('#university').append('<option data-univerId="'+data.response[el].id+'">'+data.response[el].title+'</option>');
          }
        }
      }
    });

  };

  // GET university ID for further faculty request
  $('#university').on('change', function(event) {
    event.preventDefault();
    var universityId = $('option:selected', this).attr('data-univerId');
    getFaculty(universityId)
  });

  // AJAX request getFaculty from vk API
  function getFaculty(universityId) {
    $('#faculty').empty();
    var dataFaculty = 'https://api.vk.com/method/database.getFaculties?university_id='+universityId;
    $.ajax({
      url: dataFaculty,
      type: 'GET',
      dataType: 'jsonp',
      success: function(data) {
        for(el in data.response) {
          if (typeof(data.response[el]) === 'number') {
            $('#faculty').last().append('<option data-univerId="last">'+'Другой ответ'+'</option>')
          } else {
            $('#faculty').append('<option data-facultyId="'+data.response[el].id+'">'+data.response[el].title+'</option>');
          }
        }
      }
    });
  };


  // GET Chairs ID from faculty request
  $('#faculty').on('change', function(event) {
    event.preventDefault();
    var facultyId = $('option:selected', this).attr('data-facultyId');
    getChairs(facultyId)
  });

  // AJAX request getChairs(специальность или кафедра) from vk API
  function getChairs(facultyId) {
    $('#speciality').empty();
    var dataChairs = 'https://api.vk.com/method/database.getChairs?faculty_id='+facultyId;
    $.ajax({
      url: dataChairs,
      type: 'GET',
      dataType: 'jsonp',
      success: function(data) {
        for(el in data.response) {
          if (typeof(data.response[el]) === 'number') {
            $('#speciality').last().append('<option data-univerId="last">'+'Другой ответ'+'</option>')
          } else {
            $('#speciality').append('<option data-specialityId="'+data.response[el].id+'">'+data.response[el].title+'</option>');
          }
        }
      }
    });
  };

  // GET Degree Year
  (function getDegree() {
    var currentYear = new Date().getFullYear();
    for(var i = currentYear; i>currentYear-6; i--){
      $('#dYear').append('<option>'+i+'</option>')
    }
  })();

});

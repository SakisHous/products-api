$(document).ready(function() {

  $('.row').on('click', '.btnSubmit', function(){
    let username = $('#username').val()
    let password = $('#password').val()
    let name = $('#name').val()
    let surname = $('#surname').val()
    let email = $('#email').val()

    const item = {
      'username': username,
      'password': password,
      'name': name,
      'surname': surname,
      'email': email
    }

    $.ajax({
      url: 'http://localhost:3000/api/users',
      type: 'POST',
      data: item,
      dataType: 'JSON'
    })
    .done(function(response) {
      console.log(response)
    })
  })
})
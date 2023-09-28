$(document).ready(function() {

  $.ajax({
    url: 'http://localhost:3000/api/users',
    type: 'get',
    dataType: 'JSON'
  })
  .done(function(response) {
    console.log(response)

    let { data, status } = response

    if (!status) {
      console.log('Problem searching users')
      return
    }

    createTbody(data)
  })

})

function createTbody(data) {
  console.log(data)
  const len = data.length

  for (let i = 0; i < len; i++) {
    let username = data[i].username
    let name = data[i].name
    let surname = data[i].surname
    let email = data[i].email
  

    let trStr = `<tr>
      <td>${username}</td>
      <td>${name}</td>
      <td>${surname}</td>
      <td>${email}</td>
      </tr>
    `
    $('#userTable tbody').append(trStr)
  }
}
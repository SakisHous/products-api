$(document).ready(function() {

  $.ajax({
    url: 'http://localhost:3000/api/products',
    type: 'get',
    dataType: 'JSON'
  })
  .done(function(response) {
    console.log(response)

    let { data, status } = response

    if (!status) {
      console.log('Problem searching products')
      return
    }

    createTbody(data)
  })

})

function createTbody(data) {
  console.log(data)
  const len = data.length

  for (let i = 0; i < len; i++) {
    let product = data[i].product
    let cost = data[i].cost
    let description = data[i].description
    let quantity = data[i].quantity
  

    let trStr = `<tr>
      <td>${product}</td>
      <td>${cost}</td>
      <td>${description}</td>
      <td>${quantity}</td>
      </tr>
    `
    $('#productsTable tbody').append(trStr)
  }
}
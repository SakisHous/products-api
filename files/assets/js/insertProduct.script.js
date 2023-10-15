$(document).ready(function() {

  $('.row').on('click', '.btnSubmit', function(){

    let product = $('#product').val()
    let cost = $('#cost').val()
    let description = $('#description').val()
    let quantity = $('#quantity').val()

    console.log(product)
    console.log(cost)
    console.log(description)
    console.log(quantity)

    const item = {
      'product': product,
      'cost': cost,
      'description': description,
      'quantity': quantity
    }

    $.ajax({
      url: 'http://localhost:3000/api/products',
      type: 'POST',
      data: item,
      dataType: 'JSON'
    })
    .done(function(response) {
      console.log(response)
    })
  })
})
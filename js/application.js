var updateTotalPrice = function (ele) {
    var itemPrice = parseFloat($(ele).find('.price').text().replace('$', ''));
    var itemQuantity = parseFloat($(ele).find('.quantity input').val());
  
    var totalPrice = itemPrice * itemQuantity;
    $(ele).children('.totalPrice').html(totalPrice);
  
    return totalPrice;
  }

var sum = function (acc, x) { return acc + x; };

var updateTotalCost = function () {
    var itemsCost = [];

    $('tbody tr').each(function (i, ele) {
        var totalPrice = updateTotalPrice(ele);
        itemsCost.push(totalPrice);
    });

    if (itemsCost.length === 0) {
        // Reset itemsCost when there are no rows
        itemsCost = [0];
    }

    var cartTotal = itemsCost.reduce(sum).toFixed(2);
    $('#cartTotal').html(cartTotal);
}

$(document).ready(function () {
    updateTotalCost();
  
    $(document).on('click', '.btn.remove', function (event) {
        $(this).closest('tr').remove();
        updateTotalCost();
      });
  
    var timeout;
    $('tbody').on('input', 'tr input', function () {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            updateTotalCost();
        }, 500);
    });

    $('#addItem').on('submit', function (event) {
        event.preventDefault();
        var item = $(this).children('[name=item]').val();
        var price = $(this).children('[name=price]').val();
        var quantity = 1;
      
        $('tbody').append('<tr>' +
          '<td class="item">' + item + '</td>' +
          '<td class="price">' + '$' + price + '</td>' +
          '<td class="quantity"><input type="number" value="' + quantity + '" /></td>' +
          '<td class="totalPrice"></td>' + 
          '<td><button class="btn btn-primary btn-sm remove">x</button></td>' +
        '</tr>');
      
        updateTotalCost();
        $(this).children('[name=item]').val('');
        $(this).children('[name=price]').val('');
        $(this).children('[name=quantity]').val('');
        $(this).children('[name=totalPrice]').val('');

        $(this).children('[name=item]').focus();
      });
    });
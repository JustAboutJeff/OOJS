var Controller = {
  init: function() {
    var myPrepTable = new PrepTable();
    var myOven = new Oven();
    $('#new_batch').submit(function (event) {
        event.preventDefault();
        myPrepTable.updatePrepTable();
        $(this).find("input[type=text], input[type=number]").val("");
    });

    $('ul#prep_batches').on('click', '.add_to_oven', function () {
        alert('Cookies in the oven');
        var batchId = $(this).data('batch-id');
        moveBatchFromTableToOven($(this), batchId);
        updateOven();
    });

    $('button#bake').on('click', function () {
        myOven.bake();
        updateOven();
    });

    function updateOven() {
      $.each(myOven.items, function(i, batch){
        $('td#rack_' + i).addClass(batch.getState()).text(batch.batchType + ' [' + batch.getState() + ']');
      });
    }

    function moveBatchFromTableToOven($element, batchId) {
      var batch_object = myPrepTable.removeBatch(batchId);
      myOven.addBatch(batch_object);
      $element.parent().remove();
    }
  }
};


$(document).ready(function () {
  Controller.init();
});

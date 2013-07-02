var Controller = {
  init: function() {
    var myPrepTable = new PrepTable();
    var myOven = new Oven();
    $('#new_batch').submit(function (event) {
        event.preventDefault();
        formHash = getFormInput();
        var newButton = '<button class="add_to_oven" data-batch-id=' + formHash.batchId + '>add to oven</button>';
        $('<li>').appendTo('ul#prep_batches').html(formHash.batchType + newButton);
        var myBatch = new Batch(formHash);
        myPrepTable.addBatch(myBatch);
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

    function getFormInput(){
      hash = {
        batchType: $('input[name=batch_type]').val(),
        bakeTime: $('input[name=bake_time]').val(),
        batchId: event.timeStamp
      };
      return hash;
    }
  }
};


$(document).ready(function () {
  Controller.init();
});

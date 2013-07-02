$(document).ready(function () {
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
        Oven.bake();
        updateOven();
    });
});

function updateOven() {
  $.each(Oven.items, function(i, batch){
    $('td#rack_' + i).addClass(batch.getState()).text(batch.batchType + ' [' + batch.getState() + ']');
  });
}

function moveBatchFromTableToOven($element, batchId) {
    var batch_object = myPrepTable.removeBatch(batchId);
    Oven.addBatch(batch_object);
    $element.parent().remove();
}

var myPrepTable = new PrepTable();

function Batch(batchType, bakeTime, batchId) {
    this.batchType = batchType;
    this.bakeTime = bakeTime;
    this.batchId = batchId;
    this.ovenTime = 0;
}

Batch.prototype = {
    getBatchType: function () {
        return this.batchType;
    },
    getBakeTime: function () {
        return this.bakeTime;
    },
    getState: function () {
        if (this.ovenTime === 0) {
            return 'raw';
        } else if (this.ovenTime < this.bakeTime) {
            return 'still_gooey';
        } else if (this.ovenTime == this.bakeTime) {
            return 'just_right';
        } else {
            return 'crispy';
        }
    }
};


function PrepTable() {
    this.items = [];
    this.addBatch = function (batch) {
        this.items.push(batch);
    };
    this.removeBatch = function (batchId) {
        for (i = 0; i < this.items.length; i++) {
            if (this.items[i].batchId === batchId) {
                var removedBatch = this.items[i];
                this.items.splice(i, 1);
                return removedBatch;
            }
        }
    };
    this.updatePrepTable = function () {
        var batchType = $('input[name=batch_type]').val();
        var bakeTime = $('input[name=bake_time]').val();
        var batchId = event.timeStamp;
        var addToOvenBtn = '<button class="add_to_oven" data-batch-id=' + batchId + '>add to oven</button>';
        $('<li>').appendTo('ul#prep_batches').html(batchType + addToOvenBtn);
        var myBatch = new Batch(batchType, bakeTime, batchId);
        this.addBatch(myBatch);
    };
}

var Oven = {
    items: [],
    addBatch: function (batch) {
        this.items.push(batch);
    },
    bake: function () {
        this.items.forEach(function (batch) {
            batch.ovenTime++;
        });
    }
};

function PrepTable() {
    this.items = [];
}

PrepTable.prototype = {
    addBatch: function (batch) {
        this.items.push(batch);
    },
    removeBatch: function (batchId) {
        for (i = 0; i < this.items.length; i++) {
            if (this.items[i].batchId === batchId) {
                var removedBatch = this.items[i];
                this.items.splice(i, 1);
                return removedBatch;
            }
        }
    },
    updatePrepTable: function () {
        var batchType = $('input[name=batch_type]').val();
        var bakeTime = $('input[name=bake_time]').val();
        var batchId = event.timeStamp;
        var addToOvenBtn = '<button class="add_to_oven" data-batch-id=' + batchId + '>add to oven</button>';
        $('<li>').appendTo('ul#prep_batches').html(batchType + addToOvenBtn);
        var myBatch = new Batch(batchType, bakeTime, batchId);
        this.addBatch(myBatch);
    }
};

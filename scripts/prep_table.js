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
    }
};

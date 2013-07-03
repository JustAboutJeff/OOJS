function Oven() {
  this.items = [];
}

Oven.prototype = {
    addBatch: function (batch) {
        this.items.push(batch);
    },
    bake: function () {
        this.items.forEach(function (batch) {
            batch.ovenTime++;
        });
    }
};

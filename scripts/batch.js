function Batch(formHash) {
    this.batchType = formHash.batchType;
    this.bakeTime = formHash.bakeTime;
    this.batchId = formHash.batchId;
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

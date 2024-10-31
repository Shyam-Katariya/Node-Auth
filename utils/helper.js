const Handlebars = require("handlebars");
const moment = require('moment')

const compareHelper = () => {
    // console.log('Compare Helpers ******************************************');
    Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
        // console.log('arg1:', arg1);
        // console.log('arg2:', arg2);
        try {
            const val1 = arg1?.toHexString ? arg1.toHexString() : arg1;
            const val2 = arg2?.toHexString ? arg2.toHexString() : arg2;

            if (val1 === val2) {
                return options.fn(this);
            }
        } catch (error) {
            // console.error('Error in ifEquals helper:', error);
            return options.inverse(this);
        }
    });
};

const timeFormatter = () => {
    Handlebars.registerHelper('timeFormat', function (timestamp) {
        const time = moment(timestamp).format('DD/MM/YYYY');
        return time
    });
};

module.exports = {
    compareHelper,
    timeFormatter
}
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const productSchema = mongoose.Schema(
    {
        barcode: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        brand: { type: [String], required: true},
        categories: { type: [String], required: true},
        packaging: { type: [String], required: true},
        img: { type: String, required: false },
        description: { type: String, required: true},
        bin: { type: [String], required: true},
        creation_date: { type: Date, required: true }
    },
    { collection: 'product' }
);

productSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Product', productSchema);
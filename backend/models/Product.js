const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        barcode: { type: String, required: true },
        name: { type: String, required: true },
        brand: { type: [String], required: true},
        categories: { type: [String], required: true},
        packaging: { type: [String], required: true},
        img: { type: String, required: true },
        description: { type: String, required: true},
        bin: { type: [String], required: true}
    },
    { collection: 'product' }
);

module.exports = mongoose.model('Product', productSchema);
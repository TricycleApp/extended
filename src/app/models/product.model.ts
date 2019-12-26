export class Product {
    constructor(public barcode: string,
                public name: string,
                public brand: [string],
                public categories: [string],
                public packaging: [string],
                public img: string,
                public description: string,
                public bin: [string]) {}
};
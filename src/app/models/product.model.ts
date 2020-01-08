export class Product {
    constructor(public name: string,
                public brand: [string],
                public categories: [string],
                public packaging: [string],
                public description: string,
                public bin: [string],
                public img?: string,
                public barcode?: string) {}
};
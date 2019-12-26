export class User {
    constructor(public fullname: String, 
                public mail: String,
                public password: String,
                public timezone: String,
                public registration_date: String,
                public number_scan: number,
                public roles: [string],
                public history: [{}]) {}
}
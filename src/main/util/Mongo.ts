import { Db, MongoClient } from "mongodb"
import Main from "../Main"

// You can remove mongo from the template if you don't need it, or you can write your own database implementation
export default class Mongo {
    private mongo!: Db
    main: Main
    constructor(main: Main) {
        this.main = main
    }

    async connect() {
        const client = await MongoClient.connect(process.env.MONGO_URI!)
        this.mongo = client.db(this.main.config.mongo.database)
        console.info(`Connected to Database ${this.mongo.databaseName}`)
    }
}

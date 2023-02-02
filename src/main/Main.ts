import { init } from "../discord/init"
import TemplateBot from "../discord/TemplateBot"
import config from "./data/config.json"
import Mongo from "./util/Mongo"
import * as fs from "fs"
import * as dotenv from "dotenv"
import * as path from "path"

export default class Main {
    mongo: Mongo
    client!: TemplateBot

    constructor() {
        this.mongo = new Mongo(this)
    }

    async initialize() {
        dotenv.config({
            path: __dirname + path.sep + ".." + path.sep + ".." + path.sep + ".env"
        })

        // You can change the order of initialization here if you need
        this.client = await init(this)
        await this.mongo.connect()
    }

    /*
     The getter and setters allow for the config to be dynamically accessed and updated,
     this edits the config file in src since the one in dist gets wiped after each build
     */
    get config(): typeof config {
        return JSON.parse(fs.readFileSync("./src/main/data/config.json").toString())
    }

    set config(config) {
        fs.writeFileSync("./src/main/data/config.json", JSON.stringify(config, null, 2))
    }
}

import Main from "./main/Main"
;(async () => {
    await new Main().initialize()
})().catch(error => {
    console.error(error)
    /*
     Crash the process if there is an error during initialization since
     some nullable properties have been assumed to be non-null based on
     the initialization process being successful
     */
    process.exit(1)
})

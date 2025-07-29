const codeCache = {}

module.exports = {
    setCode(email, code) {
        codeCache[email] = code
        setTimeout(() => delete codeCache[email], 5 * 60 * 1000)
    },
    getCode(email) {
        return codeCache[email]
    }
}
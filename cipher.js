
function encrypt (key, data) {
    // Vigener cipher
    var encrypted = ""
    var counter = 0
    for (let symbol of data) {
        let temp = symbol
        if (symbol.toLowerCase() in alphabet) {
            temp = alphabet[((alphabet.indexOf(symbol.toLowerCase())+1) + (alphabet.indexOf(key[counter])+1) -1)%27 -1]
            if (symbol.isUpper()) {
                temp = temp.upper()
            }
            counter += 1
            counter = counter % len(key)
        }
        encrypted += temp
    }
    return encrypted
}

function decrypt (key, data) {
    // Vigener cipher
    var decrypted = ""
    var counter = 0
    for (let symbol of data) {
        let temp = symbol
        if (symbol.toLowerCase() in alphabet) {
            temp = alphabet[((alphabet.indexOf(symbol.toLowerCase())+1) - (alphabet.indexOf(key[counter])+1) -1)%27 -1]
            if (symbol.isUpper()) {
                temp = temp.upper()
            }
            counter += 1
            counter = counter % len(key)
        }
        decrypted += temp
    }
    return decrypted
}

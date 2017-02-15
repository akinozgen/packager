var searchInJson = function (json, string)
{
    this.searchFor = string
    this.searchIn  = json

    this.getResult = function ()
    {
        var result = false
        Object.values(this['searchIn']).forEach(function (key, index) {
            if (this.searchFor == key)
                result = true
        }.bind(this))

        return result
    }
}

module.exports = searchInJson

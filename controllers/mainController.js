const index = async (req, res) => {
    res.render('index',{alert:''})
}

const tippani = async (req, res) => {
    res.render('tippani')
}

const response = async (req, res) => {
    res.render('index',{alert:'Your response was submitted successfully!'})
}

module.exports = {
    index, response, tippani
}
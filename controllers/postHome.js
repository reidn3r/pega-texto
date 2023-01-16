//controllers requirement
const validateRoute = require('../controllers/validateRoute');

//mongoose requirement
const Model = require('../model/UrlModel');

const postHome = async(req, res) => {

    const { form_input } = req.body;
    const route = validateRoute(form_input);
    if(route.length == 0) return res.redirect('/');

    const foundUrl = await Model.findOne({url: route});
    if(foundUrl){
        //const update = await Model.findOneAndUpdate({url: foundUrl.url}, {num_access: foundUrl.num_access + 1});
        return res.redirect(`/${route}`);
    }
    else{
        const new_url = new Model({url:route});
        await new_url.save();
        return res.redirect(`/${route}`);
    }
}

module.exports = postHome;
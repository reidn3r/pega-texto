const get = (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    next();
}
exports.xml_parse = (req, res, body) => {
    // Any request with an XML payload will be parsed
    // and a JavaScript object produced on req.body
    // corresponding to the request payload.
    console.log(req.body);
    res.status(200).end();
}
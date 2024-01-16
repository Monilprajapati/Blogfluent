export const signin = async (req, res) => {
    res.json(req.body);
};

export const signup = async (req, res) => {
    res.send("register");
}

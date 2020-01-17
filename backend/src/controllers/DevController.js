const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {

    async index(req, res) {
        const devs = await Dev.find();
        return res.json(devs);
    },

    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {

            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login, avatar_url, bio } = apiResponse.data;

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: "Point",
                coordinates: [longitude, latitude]
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })
        }
        return res.json(dev);
    },

    async update(req, res) {
        const devId = req.params.devId;

        const response = await Dev.findByIdAndUpdate({ _id: devId }, req.body, { new: true });

        return res.json(response);
    },

    async destroy(req, res) {
        const devId = req.params.devId;

        const response = await Dev.findOneAndRemove({ _id: devId });

        res.json({message: "Dev deleted!"});
    }
}

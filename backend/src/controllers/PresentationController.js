const Presentation = require('../models/Presentation');

const PresentationController = {

    // GET ALL PRESENTATIONS
    async getAllPresentations(req, res) {
        try {
            const presentations = await Presentation.find();
            res.json(presentations);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching presentations' });
        }
    },
    // ADD ONE PRESENTATION
    async addPresentation(req, res) {
        try {
            const { name, type } = req.body;
            const presentation = new Presentation({ name, type });
            await presentation.save();
            res.json(presentation);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error adding presentation' });
        }
    },


    // UPDATE A PRESENTATION
    async updatePresentation(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const updatedPresentation = await Presentation.findByIdAndUpdate(id, updateData, { new: true });
            if (!updatedPresentation) {
                return res.status(404).json({ message: 'Presentation not found' });
            }
            res.json(updatedPresentation);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating presentation' });
        }
    },

    // DELETE A PRESENTATION
    async deletePresentation(req, res) {
        try {
            const { id } = req.params;
            const presentation = await Presentation.findById(id);
            if (!presentation) {
                return res.status(404).json({ message: 'Presentation not found' });
            }
            await Presentation.findByIdAndDelete(id);
            res.json({ message: 'Presentation deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error deleting presentation' });
        }
    },
};

module.exports = PresentationController;
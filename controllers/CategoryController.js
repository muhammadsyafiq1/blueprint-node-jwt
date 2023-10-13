import Category from "../models/CategoryModel.js"

export const getCategory = async (req , res) => {
    try {
        const response = await Category.findAll()
        res.json(response)
    } catch (error) {
        console.log(error.message)
    }
}

export const createCategory = async (req, res) => {
    try {
        const name = req.body.name;
        await Category.create({
            name: name
        });
        res.status(201).json({msg: "category has been created"})
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteCategory = async (req, res) => {
    try {
        await Category.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(201).json({msg: "category has been deleted"})
    } catch (error) {
        console.log(error.message);
    }
}

export const categoryById = async (req, res) => {
    try {
        const response  = await  Category.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json(response)
    } catch (error) {
        console.log(error.message);
    }
}
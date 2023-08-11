import Product from "../models/ProductModel.js"
import path from "path"
export const getProduct = async (req, res) => {
    try {
        const response = await Product.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getProductById = async(req, res) => {
    try {
        const response = await Product.findOne({
            where: {
                id : req.params.id
            }
        })
        res.json(response)
    } catch (error) {
        console.log(error.message);
    }
}

export const saveProduct = async (req, res) => {

    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});
    const name = req.body.name
    const file = req.files.file
    const fileSize = file.data.length
    const ext = path.extname(file.name)
    const fileName = file.md5 + ext
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`
    const allowedType = ['.png','.jpg','.jpeg']

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "invalid ext"})
    if(fileSize > 5000000) return res.status(422).json({msg: "image must be less than 5 mb"})
    //Simpan image dalam folder image
    file.mv(`./public/images/${fileName}`, async(err) => {
        if(err) return res.status(500).json({msg: err.message})
        try {
            await Product.create({
                name: name,
                image: fileName,
                url: url
            })
            res.status(201).json({msg: "product has been created"})
        } catch (error) {
            console.log(error.message);
        }
    })

}

export const deleteProduct = async (req, res) => {

}
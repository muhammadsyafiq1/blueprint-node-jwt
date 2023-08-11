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
    console.log();
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});
    const name = req.body.name
    const gambar = req.files.gambar
    const gambarSize = gambar.data.length
    const ext = path.extname(gambar.name)
    const gambarName = gambar.md5 + ext
    const url = `${req.protocol}://${req.get("host")}/images/${gambarName}`
    const allowedType = ['.png','.jpg','.jpeg']

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "invalid ext"})
    if(gambarSize > 5000000) return res.status(422).json({msg: "image must be less than 5 mb"})
    //Simpan image dalam folder image
gambar.mv(`./public/images/${gambarName}`, async(err) => {
    if(err) return res.status(500).json({msg: err.message})
    try {
        await Product.create({
            name: name,
            image: gambarName,
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
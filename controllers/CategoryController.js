import db from "../config/Database.js"
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
    const t = await db.transaction();
    try {
        const name = req.body.name;

        // Buat entitas kategori di dalam transaksi
        await Category.create({
            name: name
        }, { transaction: t });

        // Commit transaksi jika operasi berhasil
        await t.commit();

        res.status(201).json({ msg: "Kategori telah berhasil dibuat" });
    } catch (error) {
        console.log(error.message);

        // Rollback transaksi jika terjadi kesalahan
        await t.rollback();
        res.status(500).json({ error: "Terjadi kesalahan saat membuat kategori" });
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
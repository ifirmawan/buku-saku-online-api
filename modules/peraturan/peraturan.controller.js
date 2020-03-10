const express = require('express');
const router = express.Router();

// import helper
const db = require('../../helpers/db');
const { ERROR: httpError } = require('../../helpers/httpError');
const response = require('../../helpers/wrapper');

const Aturan = db.Aturan;

// routes
router.get('/all', getAll);
router.get('/', getById);
router.delete('/delete', _delete);
router.get('/pasal', getPasal)

module.exports = router;

async function getAll(req,res) {
    try {
        let query = await Aturan.find();
        return response.wrapper_success(res, 200, "Sukses Get Peraturan Peraturan", query)
    } catch (error) {
        return response.wrapper_error(res, httpError.INTERNAL_ERROR, 'Something is wrong')         
    }
    
}

async function getById(req, res) {
    try {
        let model = {
            _id : req.query.id
        }
    
        let query = await Aturan.findById(model._id);
        return response.wrapper_success(res, 200, "Sukses Get Peraturan Peraturan by id", query)
    } catch (error) {
        return response.wrapper_error(res, httpError.INTERNAL_ERROR, 'Something is wrong')                 
    }
}

async function _delete(req, res) {
    try {
        let query = await Aturan.remove();
        return response.wrapper_success(res, 200, "Sukses Hapus Peraturan", query)
    } catch (error) {
        return response.wrapper_error(res, httpError.INTERNAL_ERROR, 'Something is wrong')                         
    }
   
}

async function getPasal(req, res) {
    try {
        let model = {
            _id : req.query.id,
            idPasal: req.query.idPasal
        }
    
        let query = await Aturan.findOne({_id: model._id},{ pasal: { $elemMatch: { _id: model.idPasal }} });
        let data = query.pasal[0];

        let newModel = {
            _id: data._id,
            title: data.title,
            desc: data.desc
        }
        console.log(query.pasal[0])
        return response.wrapper_success(res, 200, "Sukses Get Peraturan Peraturan by id", newModel)
    } catch (error) {
        console.log(error)
        return response.wrapper_error(res, httpError.INTERNAL_ERROR, 'Something is wrong')                 
    }
}
var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require("path");
var db = require('../../models');
var checkAuth = require('../../middleware/check-auth')

const storageLocal = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, 'uploads')
        cb(null, path.resolve(__dirname, '../../../uploads/'))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + "" + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storageLocal });

router.get('/', async function (req, res) {
    try {
        let fetchAllContents = await db.Content.findAll();
        res.status(200).json({
            status: 'success',
            payload: fetchAllContents,
            message: 'Contents fetched successfully'
        })

    }
    catch (error) {
        console.log("Error ==> " + error)
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while fetching contents'
        });
    }
})

router.post('/', upload.single('file'), async function (req, res) {
    var tmp_path = null

    if (req.file != undefined || req.file != null) {
        var tmp_path = req.file.filename;
    }

    try {
        let { heading1, heading2, heading3, paragraph_content } = req.body
        let newContent = await db.Content.create({
            heading1: heading1,
            heading2: heading2,
            heading3: heading3,
            paragraph_content: paragraph_content,
            attachment_file: tmp_path
        });
        res.status(200).json({
            'status': 'success',
            'payload': newContent,
            'message': 'Content created successfully'
        })
    }
    catch (error) {
        console.log("Error=========>" + error)
        res.status(500).json({
            'status': 'failed',
            'payload': {},
            'message': 'Content failed to create'
        })

    }
})

router.put('/:id', upload.single('file'), async function (req, res) {
    try {
        let { id } = req.params;
        var tmp_path = null

        if (req.file != undefined || req.file != null) {
            var tmp_path = req.file.filename;
        }
        let { heading1, heading2, heading3, paragraph_content } = req.body;
        let fetchContent = await db.Content.findOne({
            where: {
                id: id
            }
        });
        if (fetchContent === null) {
            res.json({
                "status": "failed",
                "message": "fetchContent failed"
            })
        }
        let updateContent = await db.Content.update({
            heading1: heading1,
            heading2: heading2,
            heading3: heading3,
            paragraph_content: paragraph_content,
            document_link: document_link,
            attachment_file: tmp_path
        }, {
            where: {
                id: id
            },
            returning: true
        }
        )
        let fetchUpdateContent = updateContent[1].length > 0 ? (updateContent[1])[0] : null;
        res.status(200).json({
            'status': 'success',
            'payload': fetchUpdateContent,
            'message': 'Content updated successfully'
        })

    } catch (error) {
        console.log("Error=====>" + error)
        res.status(500).json({
            'status': 'failed',
            'payload': {},
            'message': 'Content failed to update'
        })
    }
}
)

router.delete('/:id', async function (req, res) {
    let id = req.params.id
    try {
        let fetchContent = await db.Content.findOne({
            where: {
                id: id
            }
        });

        if (fetchContent === null) {
            return res.json({
                status: 'failed',
                payload: null,
                message: 'Error while fetching Content'
            });
        }

        await db.Content.destroy({
            where: {
                id: fetchContent.id
            }
        })

        res.status(200).json({
            status: 'success',
            payload: null,
            message: 'Content deleted successfully'
        });
    }
    catch (error) {
        console.log("Error at Content delete method- DELETE /:id:" + error);
        res.status(500).json({
            status: 'failed',
            message: error
        });
    }
})

module.exports = router;
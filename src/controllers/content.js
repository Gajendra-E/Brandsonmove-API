var db = require("../models");

exports.fetch_all_contents= async(req,res,next)=>{
    try{
        let fetchAllContents= await db.Content.findAll();
        res.status(200).json({
            status: 'success',
            payload: fetchAllContents,
            message: 'Contents fetched successfully'
        })

    }
    catch(error){
        console.log("Error ==> " + error)
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while fetching contents'
        });
    }
}

exports.create_content=async(req,res,next)=>{
    try{
        let {heading1,heading2,heading3,paragraph_content,document_link}=req.body
         let newContent =await db.Content.create({
            heading1:heading1,
            heading2:heading2,
            heading3:heading3,
            paragraph_content:paragraph_content,
            document_link:document_link
         });
         res.status(200).json({
             'status':'success',
             'payload':newContent,
             'message':'Content created successfully'
         })
    }
    catch(error){
        console.log("Error=========>"+error)
        res.status(500).json({
            'status':'failed',
            'payload':{},
            'message':'Content failed to create'
        })

    }
}

exports.update_content= async(req,res,next) =>{
    try{
        let { id } = req.params;
        let {heading1,heading2,heading3,paragraph_content,document_link}=req.body;
        let fetchContent = await db.Content.findOne({
            where: {
                id: id
            }
        });
        if(fetchContent===null){
            res.json({
                "status":"failed",
                "message":"fetchContent failed"
            })
        }
        let updateContent= await db.Content.update({
            heading1:heading1,
            heading2:heading2,
            heading3:heading3,
            paragraph_content:paragraph_content,
            document_link:document_link
        },{
            where: {
                id: id
            },
            returning: true
        }
        )
        let fetchUpdateContent = updateContent[1].length > 0 ? (updateContent[1])[0] : null;
        res.status(200).json({
            'status':'success',
            'payload':fetchUpdateContent,
            'message':'Content updated successfully'
        })

    }catch(error){
        console.log("Error=====>"+error)
        res.status(500).json({
            'status':'failed',
            'payload':{},
            'message':'Content failed to update'
        })
    }
}

exports.delete_content = async (req, res) => {
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
}
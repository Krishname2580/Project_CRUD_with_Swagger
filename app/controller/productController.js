
const Product=require('../models/Product')

class ProductController{


    async createProduct(req,res){
        //console.log(req.body);
        try{
            const {name,price,category}=req.body

            const prod= new Product({
                name,
                price,
                category
            })

           const data= await prod.save()
            return res.status(200).json({
                status:true,
                message:'Product Created Successfully',
                data:data
            })


        }catch(error){
            return res.status(500).json({
                status:false,
                message:error.message
            })
        }

    }


    async getProduct(req,res){
        try{
            const data= await Product.find()
            return res.status(200).json({
                status:true,
                message:'Product Fetched Successfully',
                total:data.length,
                data:data
            })
        }catch(error){
            return res.status(500).json({
                status:false,
                message:error.message
            })
        }
    }


    async getProductById(req,res){
        
       try{
        const id=req.params.id
        const datasingle= await Product.findById(id)
        return res.status(200).json({
            status:true,
            message:'get single product',
            data:datasingle
           
        })

       }catch(error){
        return res.status(500).json({
            status:false,
            message:error.message
        })

       }

    }


    async updateProduct(req,res){
        try{
            const id=req.params.id
            const data= await Product.findByIdAndUpdate(id,req.body)
            return res.status(200).json({
                status:true,
                message:'Product Updated Successfully',
                })

        }catch(error){
            return res.status(500).json({
                status:false,
                message:error.message
            })
        }
    }


    async deleteProduct(req,res){
        try{
            const id=req.params.id
            const data= await Product.findByIdAndDelete(id)
            return res.status(200).json({
                status:true,
                message:'Product Deleted Successfully',
                })

        }catch(error){
            return res.status(500).json({
                status:false,
                message:error.message
            }) 
        }

    }
   
}




module.exports=new ProductController()
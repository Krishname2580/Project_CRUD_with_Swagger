const Product = require("../models/Product");
const cloudinary = require("cloudinary").v2;

class productController {
  async homePage(req, res) {
    try {
        const { category, size, price } = req.query;

        let filter = {};

        if (category) {
            filter.category = {
                $in: Array.isArray(category) ? category : [category]
            };
        }

        if (size) {
            filter.size = {
                $in: Array.isArray(size) ? size : [size]
            };
        }

        if (price) {
            filter.price = {
                $lte: Number(price)
            };
        }

        const page = parseInt(req.query.page) || 1;
        const limit = 6;
        const skip = (page - 1) * limit;

        const totalProducts = await Product.countDocuments(filter);

        const products = await Product.find(filter)
            .skip(skip)
            .limit(limit);

        const categories = Product.schema.path("category").enumValues;
        const sizes = Product.schema.path("size").enumValues;

        return res.render("index", {
            products,
            categories,
            sizes,
            price: req.query.price || 10000,
            currentPage: page,
            totalPages: Math.ceil(totalProducts / limit)
        });

    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
}

  async createProduct(req, res) {
    try {
      const { name, price, description, category, size, color } = req.body;
      console.log(req.file);

      const newProduct = new Product({
        name,
        price,
        description,
        category,
        size,
        color,
      });

      if (req.file) {
        newProduct.imageUrl = req.file.path;
      }

      await newProduct.save();

      return res.redirect("/home");
    } catch (error) {
      console.log("CREATE ERROR:", error);
      return res.send(error.message);
    }
  }

  createPage(req, res) {
    return res.render('create');
  }

  async productDetails(req, res) {
    try {

      const product = await Product.findById(req.params.id);
      console.log(product);

      return res.render('details', {
        product
      });

    } catch (error) {
      console.log(error);
      return res.send(error.message);
    }
  }

  async editView(req, res) {
    try {
      const product = await Product.findById(req.params.id);

      const categories = Product.schema.path("category").enumValues;
      const sizes = Product.schema.path("size").enumValues;
      const colors = Product.schema.path("color").enumValues;

      return res.render("edit", {
        product,
        categories,
        sizes,
        colors,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(req, res) {
    try {
      const { name, price, description, category, size, color } = req.body;

      const updateData = {
        name,
        price,
        description,
        category,
        size,
        color,
      };

      if (req.file) {
        updateData.imageUrl = req.file.path;
        updateData.imageId = req.file.filename;
      }

      await Product.findByIdAndUpdate(req.params.id, updateData);

      return res.redirect("/");
    } catch (error) {
      console.log(error);
      return res.send(error.message);
    }
  }

  async deleteProduct(req, res) {
    try {
      const product = await Product.findById(req.params.id);

      if (product && product.imageUrl) {
        try {
          const parts = product.imageUrl.split("/");
          const fileName = parts.pop();
          const folder = parts.pop();

          const publicId = `${folder}/${fileName.split(".")[0]}`;

          await cloudinary.uploader.destroy(publicId);
        } catch (err) {
          console.log("Cloudinary delete error:", err.message);
        }
      }

      await Product.findByIdAndDelete(req.params.id);

      return res.redirect("/");
    } catch (error) {
      console.log("DELETE ERROR:", error);
      return res.send("Delete failed");
    }
  }


  // async filterProduct(req, res) {
  //   try {

  //     const { category, size, price } = req.query;

  //     let filter = {};

  //     // CATEGORY
  //     if (category) {
  //       filter.category = {
  //         $in: Array.isArray(category)
  //           ? category
  //           : [category]
  //       };
  //     }

  //     // SIZE
  //     if (size) {
  //       filter.size = {
  //         $in: Array.isArray(size)
  //           ? size
  //           : [size]
  //       };
  //     }

  //     // PRICE
  //     if (price) {
  //       filter.price = {
  //         $lte: Number(price)
  //       };
  //     }


  //     const page = parseInt(req.query.page) || 1;
  //     const limit = 6;
  //     const skip = (page - 1) * limit;

  //     const totalProducts = await Product.countDocuments(filter);

  //     const products = await Product.find(filter)
  //       .skip(skip)
  //       .limit(limit);


  //     const categories = ["Men", "Women"];
  //     const sizes = ["S", "M", "L", "XL", "XXL"];

  //     return res.render("index", {
  //       products,
  //       categories,
  //       sizes,
  //       price,
  //       currentPage: page,
  //       totalPages: Math.ceil(totalProducts / limit)
  //     });

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}

module.exports = new productController();
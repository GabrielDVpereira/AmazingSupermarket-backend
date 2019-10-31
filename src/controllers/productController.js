const Product = require('../models/Product.js');
const Market = require('../models/Market.js');
module.exports = {
  async store(req, res){
    const { filename } =  req.file;
    const { name, price } = req.body;
    const { market_id } = req.params;

    const market = Market.findById(market_id);
    if(!market) return res.status(400).json({error: "this market doesn't exist!"});

    const product = await Product.create({
      thumbnail: filename,
      market: market_id,
      name,
      price
    });

    return res.json(product);
  },

  async index(req, res){
    const { market_id } = req.params;
    const products = await Product.find({market : market_id});
    console.log(products);

    if(!products) res.status(400).json({error:'No products found for this market'});

    return res.send(products);
  },

  async delete(req,res) {
    const { product_id } = req.params;

    Product.findByIdAndRemove(product_id, (err,data)=>{
        if(!err)
          res.send({deleted: true});
        else
          res.send(err);
    })
  }
}

 const Market = require('../models/Market');
 const  { User } = require( '../models/User');

 module.exports = {

    //metodo que vai retornar todos os mercados que já existem no banco de acordo com o a sua categoria
    async category(req, res){
        const { category } = req.query;
        const markets = await Market.find({category: category});
        res.send(markets);
    },

    async markets(req, res){
        const allMarkets = await Market.find();
        res.send(allMarkets);
    },

    //retorna todos os mercados que estão associados a um usuário
    async userMarkets(req, res){
        const { owner_id } = req.body;
        const markets = await Market.find({owner: owner_id});
        res.send(markets);
    },

    //criação de mercados
    async store(req, res){
        //com o multer, a requisição recebe um novo parâmetro, o file 4
        const { filename } = req.file;
        const { name, category, owner_id } = req.body;


       console.log(req.file)
        console.log(req.body)

        const user = await User.findById(owner_id);

        if(!user) return res.status(400).json({error: "user doesn't exist!"})

        const market  = await Market.create({
           owner: owner_id,
           thumbnail: filename,
            name,
            category
        })

        return res.send(market);
    },

    //exclusão de mercados
    async delete(req, res){
        const { market_id } = req.query;

        const market = Market.findById(market_id);

        if(!market) return res.status(400).json({error: "market not found!!"});

        Market.findByIdAndRemove(market_id, (err,data)=>{
            if(!err) res.send({deleted: true});
        })
    }
 }

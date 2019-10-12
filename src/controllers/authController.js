const  { User, validate } = require( '../models/User');
const  bcrypt = require('bcrypt');

module.exports = {
    async store(req, res) {
        //validade the request body first 
        const { error } = validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        //find an existing user 
        let user = await User.findOne({email: req.body.email})
        if(user){
            console.log('-------------------------------------')
            console.log(user);
            return res.status(400).send("This user alredy exists!");
        } 

        //creating a new user if the it doenst exists
        user = new User({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            seller: req.body.seller
        }); 
        //criptografa a senha antes de salva-la
        user.password = await bcrypt.hash(user.password, 10);
        await user.save();

        const token = user.generateAuthToken();
        res.header("x-auth-token", token).send({
            _id: user._id,
            name: user.name, 
            email: user.email,
            seller: user.seller
        });
    },

    async current(req, res) {
        const user = await User.findById(req.user._id).select("-password");
        res.send(user);
    }, 

    async authenticate(req, res) {
        const {email, password }  = req.query; 
        const user = await User.findOne({email: email}); 
        
        if(user){
            //if user exists, compare the password from the query to the user's hashed password in the database
            //res.send(response) will send true if it matches, and false if it doesnt
            bcrypt.compare(password, user.password, function(err, response) {res.send(response)});     
        }else{
            res.status(400).send("This user doesn't exist!");
        }
    }

    
}

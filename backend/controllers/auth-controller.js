const otpService = require('../services/otp-service');
const hashService = require('../services/hash-service');
const userService = require('../services/user-service');

class AuthController {

    async sendOtp(req,res){

        const {phone} = req.body; 
        if(!phone) {
            res.status(400).json({message: 'Phone field is required!'});
        }
        
        const otp = await otpService.generateOtp();
        
        const ttl = 1000 * 60 * 2; //2 min
        const expires = Date.now() + ttl;
        const data = `${phone}.${otp}.${expires}`
        const hash = hashService.hashOtp(data);

        console.log(hash.expires,phone);

        try{
            await otpService.sendBySms(phone,otp);
            return res.json({
                hash:`${hash}.${expires}`,
                phone,
            })
        }catch(err) {
            console.log(err);
            res.status(500).json({message:'message sending failed'});
        }
        

     }

     verifyOtp(req,res) {
        const {otp,hash,phone} = require.body;

        if(!otp || !hash || !phone) {
            res.status(400).json({message: 'All fields are required!'});
        }

        const [hashedOtp,expires] = hash.split('.');
        if(Date.now() > +expires) {
            res.status(400).json({message : 'OTP expired!'});
        }
        const data = `${phone}.${otp}.${expires}`;
        const isValid = otpService.verifyOtp(hashedOtp, data);

        if(!isValid) {
            res.status(400).json({message: 'Invalid OTP'});
        }

        let user;
        let accessToken;
        let refreshToken;

        try{
            user = userService.findUser({phone: phone});
            if(!user) {
                userService.createUser({phone:phone});
            }
        }catch(err){
            console.log(err);
            res.status(500).json({message: 'Db error'});
        }
        

        // Token

     }
}

module.exports = new AuthController();
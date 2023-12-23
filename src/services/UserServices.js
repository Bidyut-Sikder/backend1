const ProfileModel = require("../Models/ProfileModel");
const UserModel = require("../Models/UserModel");
const EmailSend = require("../utility/EmailHelper");
const { EncodeToken } = require("../utility/TokenHelper");

const UserOTPServies = async (req) => {

    try {
        const email = req.params.email;
        let code = Math.floor(100000 + Math.random() * 900000)
        let EmailText = `Your verification code is ${code}`

        let EmailSubject = 'Email verification '

     const res=   await EmailSend(email, EmailText, EmailSubject)
console.log(res)

        await UserModel.updateOne({ email: email }, { $set: { otp: code } }, { upsert: true })

        return { status: 'success', message: '6 digit OTP has been sent.' }


    } catch (error) {
        console.log(error)
        return { status: 'fail', message: 'Something went wrong.' }

    }





}


const VeryfyOTPLoginServies = async (req) => {

    try {
        const email = req.params.email;
        const otp = req.params.otp;

        let total = await UserModel.find({ email: email, otp: otp }).count('total');
        if (total === 1) {
            //user_id reading
            let user_id = await UserModel.find({ email: email, otp: otp }).select('_id')
            //console.log(user_id[0]._id.toString())
            let token = EncodeToken(email, user_id[0]._id.toString())

            await UserModel.updateOne({ email: email }, { $set: { otp: "0" } })

            return { status: 'success', message: 'Valid OTP', token: token }
        } else {
            return { status: 'fail', message: 'Invalid OTP' }

        }



    } catch (error) {
        console.log(error)
        return { status: 'fail', message: 'Invalid OTP' }

    }
}





const SaveProfileServies = async (req) => {
    try {
        let user_id = req.headers.user_id;
        let reqBody = req.body
        reqBody.userID = user_id;

        let result = await ProfileModel.updateOne({ userID: user_id }, { $set: reqBody }, { upsert: true })
        console.log(result)
        return { status: 'success', message: 'Profile save success' }
    } catch (error) {
        return { status: 'fail', message: 'Something went wrong' }

        console.log(error.toString())
    }
    // { $set: reqBody }, { upsert: true }
}







const ReadProfileServies = async (req) => {
    try {
        let user_id = req.headers.user_id;

        let result = await ProfileModel.find({ userID: user_id })

        return { status: 'success', data: result }
    } catch (error) {
        return { status: 'success', message: 'Something went Wrong.' }

    }
}


module.exports = {
    UserOTPServies,
    VeryfyOTPLoginServies,
    SaveProfileServies,
    ReadProfileServies
}



















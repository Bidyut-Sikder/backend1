const { UserOTPServies, VeryfyOTPLoginServies, SaveProfileServies, ReadProfileServies } = require("../services/UserServices")


exports.UserOTP = async (req, res) => {
    let result = await UserOTPServies(req);
    return res.status(200).json({ result })
}


exports.VerifyOTPLogin = async (req, res) => {
    let result = await VeryfyOTPLoginServies(req)

    if (result['status'] == 'success') {
        //set cookie options
        let cookieOption = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        }
        //set cookie
        res.cookie('token', result['token'], cookieOption)

        return res.status(200).json({ result })
    } else {

        return res.status(200).json({ result })

    }



}



exports.UserLogout = async (req, res) => {
    try {
        //set cookie options
        let cookieOption = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        }
        //set cookie
        res.cookie('token', "", cookieOption)

        return res.status(200).json({ status: 'success' })

    } catch (error) {
        return res.status(200).json({ err: error.toString() })

    }
}

exports.CreateProfile = async (req, res) => {

    const result = await SaveProfileServies(req)
    res.status(200).json({ result })

}

exports.UpdateProfile = async (req, res) => {
    const result = await SaveProfileServies(req)
    res.status(200).json({ result })

}

exports.ReadProfile = async (req, res) => {
    const result = await ReadProfileServies(req)
    res.status(200).json({ result })
}







































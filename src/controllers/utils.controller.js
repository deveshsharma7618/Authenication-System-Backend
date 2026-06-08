import User from "../models/user.model.js";

const deleteUser = async (req, res) => {
    console.log(req.user);
    const email = req.user.email;
    console.log(`User with email ${email} has been deleted.`);
    const requiredUser = await User.findOneAndDelete({ email  : email });

    req.cookies = '';
    res.json({
        success: true,
        message: `User with email ${email} has been deleted.`
    });
}


const updateUser = async (req, res) => {
    const email = req.user.email;
    const { username } = req.body;
    const { filname } = req.filname;
    console.log(filename)

    const updatedUser = await User.findOneAndUpdate({ email }, { username }, { new: true });

    res.json({
        success: true,
        message: `User with email ${email} has been updated.`,
        user: updatedUser
    });
}

const updateProfilePhoto = async (req, res) => {
    const email = req.user.email;
    const filename = req.filename;
    console.log(filename, email)
    const updatedUser = await User.findOneAndUpdate({ email }, { profile_photo : filename }, {returnDocument: 'after'});
    res.json({
        success: true,
        message: `User with email ${email} has been updated.`,
        user: updatedUser
    });
}


export { deleteUser, updateUser, updateProfilePhoto };
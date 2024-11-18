

const forgotPasswordService = require('../services/forgotPasswordService');

const forgotPasswordController = {
    handleForgotPassword: async (req, res) => {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        try {
            const emailExists = await forgotPasswordService.checkEmailExists(email);

            if (emailExists) {
                return res.status(200).json({ message: 'Account found, sent password reset email.' });
            } else {
                return res.status(404).json({ message: 'Email not found. Please try again.' });
            }
        } catch (error) {
            console.error('Error handling forgot password:', error);
            res.status(500).json({ message: 'Server error' });
        }
    },
};

module.exports = forgotPasswordController;

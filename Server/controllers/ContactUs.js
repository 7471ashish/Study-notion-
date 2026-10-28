const { contactUsEmail } = require("../mail/templates/contactFormRes")
const mailSender = require("../utils/mailSender")

exports.contactUsController = async (req, res) => {
  const { email, firstname, lastname, message, phoneNo, countrycode } = req.body
  try {
    const emailRes = await mailSender(
      email,
      "Your message was received successfully",
      contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
    )
    return res.json({
      success: true,
      message: "Email sent successfully",
      data: emailRes,
    })
  } catch (error) {
    console.error("Contact Us Controller Error:", error)
    return res.status(500).json({
      success: false,
      message: "Something went wrong while sending your inquiry",
      error: error.message,
    })
  }
}

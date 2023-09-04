const nodemailer = require("nodemailer");

const send = async (mailTo, otp) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASSWORD,
        },
    });

    const body = `
        <div style="text-align: center;">
            <div style="margin:auto; text-align: center; padding: 50px 30px; width: 80%; max-width:500px; background-color:#031633; background-image: radial-gradient(circle, #031633 0%, #010b19 100%); border-radius: 8px;">
                <h2 style="text-align: center; font-family: 'Trebuchet MS', sans-serif;font-size: xx-large; color: #cfe2ff; font-weight: 600; letter-spacing: 3px;">
                    Hello!
                </h2>
                <h3 style="text-align: center; font-family: 'Trebuchet MS', sans-serif;font-size: x-large; color: #b6d4fe; font-weight: 500; margin-top: 30px ">
                    Your One Time Password is
                </h3>

                <h1 style="text-align: center; font-family: 'Trebuchet MS', sans-serif;font-size: xxx-large; background-color: #04214c; color: #e7f1ff; font-weight: 900; letter-spacing: 7px; margin: 60px auto 0 auto; width:fit-content; padding: 20px; border-radius:5px;">
                    ${otp}
                </h1>

                <p style="text-align: center; font-family: 'Trebuchet MS', sans-serif; font-size: medium; color: #9ec5fe; margin-top: 60px;">
                    OTP is valid for next 30 minutes.
                </p>
                <p style="text-align: center; font-family: 'Trebuchet MS', sans-serif; font-size: medium; color: #9ec5fe;">
                    Please do not share the OTP or login credentials with anyone.
                </p>

                <p style="text-align: center; font-family: 'Trebuchet MS', sans-serif; font-size: large; color: #3d8bfd; margin-top: 30px;">
                KAJ
                </p>
            </div>
        </div>
    `;

    const mailOptions = {
        from: "KAJ <noreply@kaj.com>",
        to: mailTo,
        subject: "KAJ OTP",
        html: body,
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        return false;
    }
};

module.exports = send;

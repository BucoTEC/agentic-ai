import nodemailer from "nodemailer";

const sendVerificationMail = (reciver) => {
	const transporter = nodemailer.createTransport({
		service: "hotmail",
		auth: {
			user: "test040120004716@outlook.com",
			pass: "0401Adnan",
		},
	});

	const options = {
		from: "test040120004716@outlook.com",
		to: reciver,
		subject: "email from booking api",
		text: "fix run on reload",
	};

	transporter.sendMail(options, (err, info) => {
		if (err) {
			console.log(err);
			return;
		}
		console.log("Sent email: " + info.response);
	});
};

export default sendVerificationMail;

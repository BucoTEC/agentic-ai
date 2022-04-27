import nodemailer from "nodemailer";

const sendVerificationMail = () => {
	const transporter = nodemailer.createTransport({
		service: "hotmail",
		auth: {
			user: "test040120004716@outlook.com",
			pass: "0401Adnan",
		},
	});

	const options = {
		from: "test040120004716@outlook.com",
		to: "adnan.bucalovic13@gmail.com",
		subject: "email from booking api",
		text: "hello from booking api final test for node mailer",
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

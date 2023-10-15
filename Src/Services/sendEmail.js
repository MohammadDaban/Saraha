import nodemailer from 'nodemailer';

async function sendEmail(to,subject,html){
  

  let transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
      
      user: process.env.EMAIL,
      pass: process.env.SENDPASSWORD,
    },
    tls:{
      rejectUnauthorized: false
    }
  });
    
    let info = await transporter.sendMail({
      from:`"mohammad daban 👻" <${process.env.EMAIL}>`,
      to,
      subject,
      html,
    });
   
}

export default sendEmail
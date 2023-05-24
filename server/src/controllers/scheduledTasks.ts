import cron from 'node-cron';
import Reservation from '../models/Reservation'
import Student from '../models/Student'
import Item from '../models/Item'
import nodemailer from "nodemailer";

const sendNotifications = async () => {
    const Day = new Date();
    let yesterday  = new Date(Day);
    yesterday .setDate(Day.getDate() - 1);
    const todayReservation = await Reservation.find({DateTo: {$gte: yesterday , $lte: Day}});
    const usersMap = todayReservation.map(res => res.student);
    const itemsMap = todayReservation.map(res => res.item);

    const Students = await Student.find({_id: {$in: usersMap}})
    const Items = await Item.find({_id: {$in: itemsMap}})

    console.log("Scheduled task");
    Students.forEach(stu => {
        const relevantReservation = todayReservation.find(reservation => stu._id.toString() == reservation.student.toString())
        const item = Items.find(item => item._id.toString() == relevantReservation?.item.toString())

          
              const transporter = nodemailer.createTransport({
                service: 'zoho',
                auth: {
                  user: "sceproject@zohomail.com",
                  pass: "HE123456@",
                },
              });
          
              const mailOptions = {
                from: "sceproject@zohomail.com",
                to: "sceproject@zohomail.com",
                subject: "reminder 📋",
                text: `hi ${stu.FullName}, \nthis is a friendly reminder to return the ${item?.kind} - ${item?.itemName}\nHave a nice day :)`,
              };
              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.error("Error occurred while sending the email:", error);
                  // res.sendStatus(404)
                } else {
                  console.log("Email sent:", info.response);
                  // res.sendStatus(200);
                }
              });
    })
    
}

sendNotifications()
cron.schedule('15 * * * *', sendNotifications);
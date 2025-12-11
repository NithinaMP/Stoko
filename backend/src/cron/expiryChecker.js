const cron = require("node-cron");
const { Item, HomeMember, Notification, User } = require("../models");
const { Op } = require("sequelize");

function daysBetween(d1, d2) {
  const diff = Math.ceil((d2 - d1) / (1000*60*60*24));
  return diff;
}

// run at 01:00 daily
cron.schedule("0 1 * * *", async () => {
  try {
    console.log("Running expiry checker cron...");
    const today = new Date();
    const items = await Item.findAll({ where: { expiry_date: { [Op.not]: null } }});
    for (const item of items) {
      const expiry = new Date(item.expiry_date);
      const days = daysBetween(today, expiry);
      let type = null;
      if (days < 0) type = "expired";
      else if (days === 0) type = "daily";
      else if (days <= 2) type = "2days";
      else if (days <= 7) type = "week";
      else continue;
      const homeMembers = await HomeMember.findAll({ where: { home_id: item.home_id }});
      for (const hm of homeMembers) {
        await Notification.create({ item_id: item.id, user_id: hm.user_id, type, sent_on: new Date() }).catch(()=>{});
      }
    }
    console.log("Expiry checker done.");
  } catch (err) {
    console.error("Cron error", err);
  }
});

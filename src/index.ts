import { Message, Whatsapp, create } from "venom-bot";

create({
  session: "zap-bot",
  disableWelcome: true,
})
  .then(async (client: Whatsapp) => await start(client))
  .catch((err) => {
    console.log(err);
  });

async function start(client: Whatsapp) {
  client.onMessage(async (message: Message) => {
    if (!message.body || message.isGroupMsg) return;

    const customerPhone = `+${message.from.replace("@c.us", "")}`;
    const customerName = message.author;
    const customerKey = `customer:${customerPhone}:chat`;
    const orderCode = `#sk-${("00000" + Math.random()).slice(-5)}`;

    let response = "";
    response = `Olá! Seu texto foi "${message.content}"\nPhone: ${customerPhone}\nNome: ${customerName}\n${customerKey}\nOrdem nº: ${orderCode}`;

    console.log(message.body);
    console.log(message.from);

    await client.sendText(message.from, response);
  });
}

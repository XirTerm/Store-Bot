const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json")
const db = require("nrc.db")
const {MessageActionRow, MessageButton} = require("discord.js")
module.exports = {
    calistir: async(client, message, args) => {

		if(message.author.id !== message.guild.ownerId) return message.reply(`Bu komudu sadece sunucu sahibi kullanabilir.`)
		
		const menu = new Discord.MessageEmbed()
		.setColor('#58ff65')
		.setTitle('StoreBot | Sıraya Giriş')
		.setAuthor({ name: 'StoreBot', iconURL: '', url: '' })
		.setDescription(`⭐ | Sıraya girmek veya fiyatları görmek için aşağıdaki butonlara tıklayabilirsiniz! \n \n 📛 | **NOT:** İyi alışverişler :)`)
		.setThumbnail('')
		.setFooter({ text: ``, iconURL: '' });

		const row = new MessageActionRow()
		.addComponents(
		new MessageButton()
		.setCustomId('sıra')
		.setLabel('Sıraya Girmek İçin Tıkla')
		.setEmoji("⭐")
		.setStyle('SECONDARY'),
		new MessageButton()
		.setCustomId('satis-embed')
		.setLabel('Satış Fiyatları')
		.setEmoji("💰")
		.setStyle('SECONDARY'),
		new MessageButton()
		.setCustomId('fiyat-embed')
		.setLabel('Pet Simulator X Fiyatları')
		.setEmoji("🐶")
		.setStyle('SECONDARY')
		);
		message.channel.send({
			embeds: [menu], components: [row]
		});

		message.delete()

},

name: "sıra-sistemi",
description: "",
aliases: ['sırasistemi,', 'sirasistemi', 'sira-sistemi', 'sıra', 'sira'],
kategori: "",
usage: "",
}
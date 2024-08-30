const { Client, Intents, Collection, MessageAttachment, MessageEmbed, Permissions, Constants, ApplicationCommandPermissionsManager, MessageButton, MessageActionRow } = require('discord.js');
const Discord = require("discord.js")
const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MEMBERS,Intents.FLAGS.GUILD_BANS,Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,Intents.FLAGS.GUILD_INTEGRATIONS,Intents.FLAGS.GUILD_WEBHOOKS,Intents.FLAGS.GUILD_INVITES,Intents.FLAGS.GUILD_VOICE_STATES,Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_MESSAGE_REACTIONS,Intents.FLAGS.GUILD_MESSAGE_TYPING,Intents.FLAGS.DIRECT_MESSAGES,Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,Intents.FLAGS.DIRECT_MESSAGE_TYPING] });
const ayarlar = require("./ayarlar.json");
const db = require("nrc.db");
const message = require("./events/message");
require('dotenv').config();
let prefix = ayarlar.prefix;
client.commands = new Collection();
client.aliases = new Collection();

["command"].forEach(handler => {
  require(`./komutcalistirici`)(client);
}); 

client.on("ready", () => {
  require("./events/eventLoader")(client);
});





const { Modal, TextInputComponent, showModal } = require('discord-modals') 
const discordModals = require('discord-modals') 
discordModals(client); 

const storebot = new Modal() 
.setCustomId('form')
.setTitle('Sıraya Giriş')
.addComponents(
  new TextInputComponent() 
  .setCustomId('sıra-giriş')
  .setLabel('SİPARİŞİNİZ NEDİR?')
  .setStyle('SHORT') 
  .setMinLength(2)
  .setMaxLength(30)
  .setPlaceholder('Örnek: 1,000 owo coin...')
  .setRequired(true)
)
.addComponents(
	new TextInputComponent() 
	.setCustomId('sipariş-fiyatı')
	.setLabel('SİPARİŞ FİYATI')
	.setStyle('SHORT') 
	.setMinLength(1)
	.setMaxLength(5)
	.setPlaceholder('Örnek: 80 (Sadece sayı olarak yazın.)')
	.setRequired(true)
  )
  .addComponents(
	new TextInputComponent() 
	.setCustomId('ödeme-kartı')
	.setLabel('HANGİ KART İLE ÖDEME YAPACAKSINIZ?')
	.setMinLength(3)
	.setMaxLength(20)
	.setStyle('SHORT') 
	.setPlaceholder('İninal, Papara, Ziraat Bankası vs...')
	.setRequired(true)
	) 
  .addComponents(
	new TextInputComponent() 
	.setCustomId('hazır-durum')
	.setLabel('ALIŞVERİŞ İÇİN HERŞEYİNİZ HAZIR MI?')
	.setStyle('SHORT') 
	.setMinLength(4)
	.setMaxLength(4)
	.setPlaceholder('Örnek: Evet | Hazır olmadan sıraya girmeyin!')
	.setRequired(true)
  )


client.on('interactionCreate', async (interaction) => {

	if(interaction.customId === "sıra"){
		showModal(storebot, {
			client: client, 
			interaction: interaction 
		  })
	}
	if (interaction.customId == "satis-embed") {
		const embed = new MessageEmbed()
		.setImage(``)
		.setAuthor({ name: ''})
		.setDescription(``)
		.setColor(``)
		.setThumbnail(``)
		.setFooter({ text: ``, iconURL: '' });
		interaction.reply({embeds:[embed], ephemeral:true})
	}
	if (interaction.customId == "fiyat-emebd") {
		const embed1 = new MessageEmbed()
		.setTitle(``)
		.setDescription(``)
		.setColor(``)
		.setThumbnail(``)
		.setFooter({ text: ``, iconURL: '' });
		
	
	if (interaction.customId == "fiyat-embed") {
		const embed2 = new MessageEmbed()
		.setTitle(``)
		.setDescription(``)
		.setColor(``)
		.setThumbnail(``)
		.setFooter({ text: ``, iconURL: '' });

		if (interaction.customId == "fiyat-embed") {
			const embed3 = new MessageEmbed()
			.setTitle(``)
			.setDescription(``)
			.setColor(``)
			.setThumbnail(``)
			.setFooter({ text: ``, iconURL: '' });
		interaction.reply({embeds:[embed1, embed2, embed3], ephemeral:true})
	}}}
	if(interaction.customId === "sahipban"){
		if(!interaction.member.roles.cache.has(ayarlar.yetkilirol)) {
            return  interaction.reply({content: "Bu Komutu Kullanabilmek İçin Gerekli Yetkiye Sahip Değilsin.", ephemeral: true});
     
		}
		const banform = new Modal() 
.setCustomId('sahip-ban')
.setTitle('Kullanıcıyı Yasakla')
  .addComponents(
	new TextInputComponent() 
	.setCustomId('ban-sebep')
	.setLabel('Yasaklama Sebebinizi Belirtiniz.')
	.setStyle('LONG') 
	.setMinLength(1)
	.setMaxLength(500)
	.setPlaceholder('Toxiclik \nSıra Kirliliği...')
	.setRequired(true)
  )
		showModal(banform, {
			client: client, 
			interaction: interaction 
		  })
		}

	if(interaction.customId === "formred"){
		if(!interaction.member.roles.cache.has(ayarlar.yetkilirol)) {
            return  interaction.reply({content: "Bu Komutu Kullanabilmek İçin Gerekli Yetkiye Sahip Değilsin.", ephemeral: true});
     }
		const redform = new Modal() 
.setCustomId('form-red')
.setTitle('Sıraya Giriş Red')
  .addComponents(
	new TextInputComponent() 
	.setCustomId('red-sebep')
	.setLabel('Reddetme Sebebinizi Belirtiniz.')
	.setStyle('LONG') 
	.setMinLength(1)
	.setMaxLength(500)
	.setPlaceholder('Artık Almıyoruz \nElimizde Bulunmuyor Gibi...')
	.setRequired(true)
  )
		showModal(redform, {
			client: client, 
			interaction: interaction 
		  })
		}


	if(interaction.customId === "formonay"){
		
        if(!interaction.member.roles.cache.has(ayarlar.yetkilirol)) {
            return  interaction.reply({content: "Bu Komutu Kullanabilmek İçin Gerekli Yetkiye Sahip Değilsin.", ephemeral: true});
     }

		let sahip = db.fetch(`onay-red-mesaj_${interaction.message.id}`)
		let siparişfiyatı = db.fetch(`siparis_id_${sahip}`)
        let sıragiriş = db.fetch(`siragiris_id_${sahip}`)

		const embed = new Discord.MessageEmbed()
		.setColor("#00c208")
		.setDescription(`**<@!${sahip}>** Sıraya Girişin Başarılı. Alışverişin Başladı. \n **Onaylayan Yetkili:** <@${interaction.user.id}> (${interaction.user.id})`)
		const ticketChannel = await interaction.guild.channels.create( 
			client.users.cache.get(sahip).username, 
			{ 
				name: "onay", 
				customId: 'formonay', 
				type: "text" 
			  } 
			); 
		ticketChannel.setParent(`${ayarlar.kategoriid}`)

		const row = new MessageActionRow()
		.addComponents(
		new MessageButton()
		.setURL(`https://discord.com/channels/${ayarlar.sunucuid}/${ticketChannel.id}`)
		.setLabel('Alışveriş Kanalı')
		.setStyle('LINK')
		.setDisabled(false)
		
		
		);
		await interaction.update({ embeds: [embed] , components: [row] });
		db.delete(`siparis_id_${sahip}`)
		db.delete(`siparis_bilgi_${siparişfiyatı}`)
		db.delete(`siparis_${siparişfiyatı}`)
		const embedd = new Discord.MessageEmbed()
		.setColor("#00c208")
		.setDescription(`<@${sahip}> isimli kullanıcının sıraya girişi <@${interaction.user.id}> tarafından onaylandı. \n Alışveriş Başladı!`)
		client.users.cache.get(sahip).send({ embeds: [embed], components: [row]})
		client.channels.cache.get(ayarlar['onay-red-log']).send({embeds:[embedd]})


	ticketChannel.permissionOverwrites.create(sahip, { 
VIEW_CHANNEL: true, 
READ_MESSAGE_HISTORY: true,
SEND_MESSAGES: true, 
ATTACH_FILES: true

}); 
ticketChannel.permissionOverwrites.create(interaction.guild.id, {  VIEW_CHANNEL: false })
	ticketChannel.send({content: `Merhaba, <@${sahip}>. Senin sıran geldi!

	Ücreti aşağıdaki kartlardan hangisini kullanıyorsan oraya gönderebilirsin.
	Siparişin: **${sıragiriş}**
	Göndereceğin ücret: **${siparişfiyatı} TL**`}) 

ticketChannel.send({content: ``})
}}) 


client.on('modalSubmit',async (modal) => {

	if(modal.customId === 'sahip-ban'){
		let sahip = db.fetch(`onay-red-mesaj_${modal.message.id}`)
		const bansebep = modal.getTextInputValue('ban-sebep')
		const embed = new Discord.MessageEmbed()
		.setColor("#ff0000")
		.setDescription(`
		<@${sahip}> adlı kullanıcı <@${modal.user.id}> tarafından yasaklandı. \n Sıradan Çıkartıldı.
		> Sebep: **${bansebep}**
		`)
		await modal.deferReply({ ephemeral: true })
 		modal.followUp({ content: `Başarılı Bir Şekilde Reddedildi.`, ephemeral: true })
		client.channels.cache.get(ayarlar['onay-red-log']).send({embeds:[embed]})
        client.users.cache.get(sahip).send({embeds:[embed]})

		let siparişfiyatı = db.fetch(`siparis_id_${sahip}`)
		db.delete(`siparis_id_${sahip}`)
		db.delete(`onay-red-mesaj_${modal.message.id}`)
		db.delete(`siparis_bilgi_${siparişfiyatı}`)
		db.delete(`siparis_${siparişfiyatı}`)

		const embedd = new Discord.MessageEmbed()
		.setColor("#ff0000")
		.setDescription(`**<@${sahip}>** Sıraya Giriş Reddedildi, Yasaklandı.
		**Yasaklayan Yetkili:** <@${modal.user.id}> (${modal.user.id})
		> Sebep: **${bansebep}**`)
		const row = new MessageActionRow()
		.addComponents(
		new MessageButton()
		.setCustomId('yasaklandı')
		.setLabel('Kullanıcı Yasaklandı')
		.setStyle('DANGER')
		.setDisabled(true)
		
		);
		client.channels.cache.get(ayarlar.botlog).messages.edit(modal.message.id, {embeds: [embedd], components: [row]})
	}

	if(modal.customId === 'form-red'){

		let sahip = db.fetch(`onay-red-mesaj_${modal.message.id}`)
		const redsebep = modal.getTextInputValue('red-sebep')
		const embed = new Discord.MessageEmbed()
		.setColor("#ff0000")
		.setDescription(`
		<@${sahip}> sıraya girişin <@${modal.user.id}> tarafından reddedildi. \n Sıradan Çıkartıldı.
		> Sebep: **${redsebep}** `)
		await modal.deferReply({ ephemeral: true })
 		modal.followUp({ content: `Başarılı Bir Şekilde Reddedildi.`, ephemeral: true })
		client.channels.cache.get(ayarlar['onay-red-log']).send({embeds:[embed]})
        client.users.cache.get(sahip).send({embeds:[embed]})

		let siparişfiyatı = db.fetch(`siparis_id_${sahip}`)
		db.delete(`siparis_id_${sahip}`)
		db.delete(`onay-red-mesaj_${modal.message.id}`)
		db.delete(`siparis_bilgi_${siparişfiyatı}`)
		db.delete(`siparis_${siparişfiyatı}`)

		const embedd = new Discord.MessageEmbed()
		.setColor("#ff0000")
		.setDescription(`**<@${sahip}>** Sıraya Giriş Reddedildi
		**Reddeden Yetkili:** <@${modal.user.id}> (${modal.user.id})
		> Sebep: **${redsebep}**`)
		const row = new MessageActionRow()
		.addComponents(
		new MessageButton()
		.setCustomId('reddedildi')
		.setLabel('Giriş Reddedildi')
		.setStyle('DANGER')
		.setDisabled(true)
		
		);
		client.channels.cache.get(ayarlar.botlog).messages.edit(modal.message.id, {embeds: [embedd], components: [row]})
	}

	if(modal.customId === 'form'){
		const siparişfiyatı = modal.getTextInputValue('sipariş-fiyatı')
		if(isNaN(siparişfiyatı)){
			await modal.reply({ content: `❌ | Lütfen ödenecek tutarı sadece **sayı** olarak yazın.`, ephemeral: true });
		}else{	
		const hazırdurum = modal.getTextInputValue('hazır-durum')
		const sıragiriş = modal.getTextInputValue('sıra-giriş')
		const kart = modal.getTextInputValue('ödeme-kartı')
		let kontrol = db.fetch(`siparis_id_${modal.user.id}`)
		await modal.deferReply({ ephemeral: true })
		if(kontrol) return  modal.followUp({ content: `⚠️ | Zaten Sıra Başvuru Yapmışsın. Onaylanmasını Bekleyiniz.`, ephemeral: true })
		let kontrol2 = db.fetch(`siparis_${siparişfiyatı}`)
		db.set(`siparis_id_${modal.user.id}`, siparişfiyatı)
		db.set(`siparis_${siparişfiyatı}`, modal.user.id)
		db.set(`siparis_bilgi_${siparişfiyatı}`, [])
		db.set(`siragiris_id_${modal.user.id}`, sıragiriş)
		db.push(`siparis_bilgi_${siparişfiyatı}`, sıragiriş)
		db.push(`siparis_bilgi_${siparişfiyatı}`, hazırdurum)
		modal.followUp({ content: `✅ | Başarılı Bir Şekilde Sıraya Giriş Talebi Oluşturuldu. Lütfen Talebinizin Onaylanmasını Bekleyiniz.`, ephemeral: true })
		
		const row = new MessageActionRow()
		.addComponents(
		new MessageButton()
		.setCustomId('formonay')
		.setLabel('Talebi Onayla')
		.setStyle('SUCCESS'),
		
		new MessageButton()
		.setCustomId('formred')
		.setLabel('Talebi Reddet')
		.setStyle('DANGER'),

		new MessageButton()
		.setCustomId('sahipban')
		.setLabel('Kullanıcıyı Yasakla | Yakında')
		.setStyle('DANGER')
        .setDisabled(true),

		new MessageButton()
		.setURL(`https://linktr.ee/xirterm`)
		.setLabel('Bot Geliştiricisi')
		.setStyle('LINK'),
		);

		const embed = new Discord.MessageEmbed()
		.setColor("#ffdf00")
		.setDescription(`
		> **Talep Bilgileri;**

		**Sipariş:** \`\`\`\ ${sıragiriş}\`\`\`\
		**Tutar:** \`\`\`\ ${siparişfiyatı}\`\`\`\
		**Ödeme:** \`\`\`\ ${kart} \`\`\`\
		**Hazır Durumu:** \`\`\`\ ${hazırdurum} \`\`\`\

		> **Kullanıcı Bilgileri;**

		**İD:** \`${modal.user.id} ${modal.user.username}\`
		**Etiket:** <@${modal.user.id}>
		`)
		.setImage("")
		client.channels.cache.get(ayarlar.botlog).send({embeds:[embed],components: [row]}).then(c => {
			db.set(`onay-red-mesaj_${c.id}`, modal.user.id)
		})
		
	}
	}  
  })


client.login(ayarlar.token);

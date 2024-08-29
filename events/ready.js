const db = require("nrc.db");

module.exports = async(client) => {

  
  client.user.setStatus("online");
  const aktiviteler = [
    "Xirterm Prods",
    "Bot Aktif",
    "Güvenli Hizmet!",
    "Dev. @xirterm"
  ]
  setInterval(function() {
    var random = Math.floor(Math.random() * (aktiviteler.length - 0 + 1) + 0);

    client.user.setActivity(aktiviteler[random], "");
  }, 2 * 2500);




  
  
  console.log("Ayarlamalar: Durum Ayarlandı!")
  console.log("Ayarlamalar: Aktivite Ayarlandı!")
  console.log(" ")



  const kulsayi = []
  client.guilds.cache.forEach((item, i) => {
      kulsayi.push(item.memberCount)
  });
  var toplamkulsayi = 0
  for (var i = 0; i < kulsayi.length; i++) {
      if (isNaN(kulsayi[i])){
          continue;
      }

      toplamkulsayi += Number(kulsayi[i])
  }

  console.log("Bot İstatistiği")
  console.log(`Sunucu Sayısı: ${client.guilds.cache.size}`)
  console.log(`Kullanıcı Sayısı: ${toplamkulsayi}`)
  console.log(`Emoji Sayısı: ${client.emojis.cache.size}`)
  console.log(`Kanal Sayısı: ${client.channels.cache.size}`)

  console.log(" ")

  console.log(`${client.user.tag} olarak Discord'a giriş yaptım. Şuan Aktifim.`);


}

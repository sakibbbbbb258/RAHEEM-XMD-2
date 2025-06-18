import config from '../config.cjs';

const alive = async (m, gss) => {
  try {
    // Affiche le contenu du message pour le débogage
    console.log('Message reçu:', m.body);

    const prefix = config.PREFIX;
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
    
    const validCommands = ['alive', 'bot', 'test'];
    if (!validCommands.includes(cmd)) return;

    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);

    // Affiche l'expéditeur pour le débogage
    console.log('Expéditeur:', m.sender);

    const aliveMessage = `
👋 Hello @${m.sender.split('@')[0]}

✅ *RAHEEM-XMD-2 is Alive!*

⏱️ *Uptime:* ${hours}h ${minutes}m ${seconds}s  
🔐 *Mode:* ${global.public ? 'Public' : 'Private'}  
👑 *Owner:* ${config.OWNER_NUMBER}
`.trim();

    // Envoi du message avec l'image et le texte
    await gss.sendMessage(m.from, {
      image: { url: 'https://files.catbox.moe/2tpewa.jpg' }, // Remplacer par ton image si nécessaire
      caption: aliveMessage,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363398101781980@newsletter',
          newsletterName: "RAHEEM-XMD-2🪀",
          serverMessageId: 143
        }
      }
    }, { quoted: m });

  } catch (err) {
    // Log l'erreur dans la console et répond à l'utilisateur
    console.error('Erreur de commande alive :', err);
    m.reply(`❌ An error occurred while executing the alive command. Error: ${err.message}`);
  }
};

export default alive;

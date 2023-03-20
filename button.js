const { role_aha, red, mido, } = require('./a.js');

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (!interaction.guild) {
    return interaction.reply({
      embeds: [
        {
          title: '📛 エラー',
          description: 'DMでコマンドを使用することは出来ません。',
          color: red
        },
      ],
      ephemeral: true
    });
  }
  if (!interaction.guild.members.me.permissions.has("Administrator")) {
    return interaction.reply({
      embeds: [
        {
          title: '📛 権限エラー',
          description: '`Missing Permissions`\n\nBotの権限が不足しています、BMBBに管理者権限を付与してください。'
          +`\n分からない場合は、<@${Kito}>までお問い合わせください。`,
          color: red
        },
      ],
      ephemeral: true
    });
  }
  if (interaction.commandName === 'role_huyo') {
    const taitle = interaction.options.getString('taitle');
    const description = interaction.options.getString('description');
    const button_name = interaction.options.getString('button-name');
    const channel1 = interaction.options.getChannel('channel');
    const role = interaction.options.getRole('role');

    const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
      .setCustomId('role_button')
      .setLabel(button_name)
      .setStyle(ButtonStyle.Primary),
    );
    const embed = new EmbedBuilder()
    .setColor(16772096)
    .setTitle(taitle)
    .setDescription(description)
    await interaction.reply({
      embeds: [
        {
          title: '✅ パネル設置完了',
          description: `・タイトル:${taitle}\n・説明:${description}\n・ボタン名:${button_name}\n・ロール:${role}\n・送信チャンネル:${channel1}`,
          color: mido
        },
      ],
      ephemeral: true
    });
    const mese = await client.channels.cache.get(channel1.id).send({ embeds: [embed], components: [row] });
    await role_aha.set(interaction.guild.id+mese.id, role);
	}

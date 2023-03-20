const { role_aha, red, mido, } = require('./a.js');

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isButton()) return;
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
  if (interaction.customId.startsWith('role')) {
    const role_get = await role_aha.get(interaction.guild.id+interaction.message.id);
    const role = interaction.guild.roles.cache.get(role_get.id);
    if (!role) {
      return interaction.reply({
        embeds: [
          {
            title: '📛 エラー',
            description: `ロールが設定されていません。`,
            color: red
          },
        ],
        ephemeral: true
      });
    }
    try {
      if (interaction.member.roles.cache.has(role.id)) {
        await interaction.member.roles.remove(role.id);
        await interaction.reply({
          embeds: [
            {
              title: '✅ ロール解除',
              description: `${role}を解除しました。`,
              color: mido
            },
          ],
          ephemeral: true
        });
      } else {
        await interaction.member.roles.add(role.id);
        await interaction.reply({
          embeds: [
            {
              title: '✅ ロール付与',
              description: `${role}を付与しました。`,
              color: mido
            },
          ],
          ephemeral: true
        });
      }
    }catch (error) {
      if (error.code === 50013) {
        await interaction.reply({
          embeds: [
            {
              title: '📛 エラー',
              description: `付与させたいロール(${role})が、DMBBbotより権限が高いです。\n\nサーバーの管理者(<@${interaction.guild.ownerId}>)にお問い合わせください。`,
              color: red
            },
          ],
          ephemeral: true
        });
      } else if (error.code === 10011) {
        await interaction.reply({
          embeds: [
            {
              title: '📛 エラー',
              description: `ロールが存在しません。\n\nサーバーの管理者(<@${interaction.guild.ownerId}>)にお問い合わせください。`,
              color: red
            },
          ],
          ephemeral: true
        });
      } else {
        await interaction.reply({
          embeds: [
            {
              title: '📛 不明なエラー',
              description: `以下のエラーを開発者(<${Kito}>)までお伝えください。\n`+`${error.message}`,
              color: red
            },
          ],
          ephemeral: true
        });
      }
    }
  }

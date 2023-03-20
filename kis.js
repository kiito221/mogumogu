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
  if (interaction.customId.startsWith('rinzi')) {
    const okane_has = await money.has(interaction.member.id);
    const okane_get = await money.get(interaction.member.id);
    const a = okane_get||0;
    const pure_has = await pure.has(interaction.guild.id+interaction.member.id);
    if (!okane_has) {
      return interaction.reply({
        embeds: [
          {
            title: '📛 エラー',
            description: '口座が開設されていません。',
            color: red
          },
        ],
        ephemeral: true
      });
    }
    if (pure_has) {
      return interaction.reply({
        embeds: [
          {
            title: '📛 エラー',
            description: '既に給付金を受け取っています。',
            color: red
          },
        ],
        ephemeral: true
      });
    }
    await pure.set(interaction.guild.id+interaction.member.id,true);
    await money.set(interaction.member.id , a + 1000000);
    interaction.reply({
      embeds: [
        {
          title: '✅ 給付金の受け取り完了',
          description: `給付金を取得しました。\n${a}+1000000=__${a+1000000}__`,
          color: mido
        },
      ],
      ephemeral: true
    })
  }
  if (interaction.customId.startsWith('role')) {
    const role = interaction.guild.roles.cache.get(role.id);
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

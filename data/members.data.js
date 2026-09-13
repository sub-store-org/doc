export default {
  async load() {
    const res = await fetch(
      "https://api.github.com/orgs/sub-store-org/members"
    );

    if (res.status !== 200) return [];
    const users = await res.json();

    const userRes = await Promise.allSettled(
      users.map((user) => fetch(user.url))
    );

    const userData = [];
    for (const user of userRes) {
      if (user.status === "fulfilled") {
        const userJson = await user.value.json();
        userData.push(userJson);
      }
    }

    return userData.map((user) => ({
      avatar: user.avatar_url,
      name: user.name ? user.name : user.login,
      title: "成员",
      links: [{ icon: "github", link: user.html_url }],
    }));
  },
};
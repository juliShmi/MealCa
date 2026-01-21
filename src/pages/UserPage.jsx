function UserPage({ user }) {
  if (!user) return null;

  const initials = String(user.nickname ?? "?")
    .trim()
    .slice(0, 2)
    .toUpperCase();

  return (
    <div style={{ padding: 16, maxWidth: 720 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          aria-label="User avatar placeholder"
          title={user.nickname}
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "#eee",
            display: "grid",
            placeItems: "center",
            fontWeight: 800,
            fontSize: 22,
            color: "#333",
            border: "1px solid #ddd",
          }}
        >
          {initials}
        </div>

        <div>
          <div style={{ fontSize: 20, fontWeight: 900 }}>{user.nickname}</div>
          <div style={{ opacity: 0.7, marginTop: 4 }}>id: {user.id}</div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;


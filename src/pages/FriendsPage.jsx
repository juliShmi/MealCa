import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

function FriendsPage({ currentUser, users = [], friendships = [] }) {
  const navigate = useNavigate();

  const friends = useMemo(() => {
    const byId = new Map((users ?? []).map((u) => [String(u.id), u]));
    return (friendships ?? [])
      .filter((f) => f?.status === "accepted")
      .filter((f) => String(f.userId) === String(currentUser?.id) || String(f.friendId) === String(currentUser?.id))
      .map((f) => {
        const friendId =
          String(f.userId) === String(currentUser?.id) ? String(f.friendId) : String(f.userId);
        return {
          friendship: f,
          user: byId.get(friendId) ?? { id: friendId, nickname: friendId },
        };
      });
  }, [users, friendships, currentUser]);

  return (
    <div style={{ padding: 16, maxWidth: 720 }}>
      <h1 style={{ marginTop: 0 }}>Friends</h1>

      {friends.length === 0 ? (
        <div style={{ opacity: 0.7 }}>No friends yet.</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {friends.map(({ user }) => (
            <button
              key={user.id}
              type="button"
              onClick={() => navigate(`/friends/${encodeURIComponent(String(user.id))}`)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                padding: "12px 14px",
                borderRadius: 12,
                border: "1px solid #ddd",
                background: "#fff",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  aria-hidden="true"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 0,
                    background: "#fff",
                    border: "3px solid #111",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 900,
                    boxShadow: "4px 4px 0 0 #111",
                  }}
                >
                  {(user.nickname ?? "?").slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 900 }}>{user.nickname}</div>
                  <div style={{ opacity: 0.6, fontSize: 12 }}>{user.id}</div>
                </div>
              </div>
              <span aria-hidden="true">›</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default FriendsPage;


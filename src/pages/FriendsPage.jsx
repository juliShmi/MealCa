import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

function FriendsPage({ currentUser, users = [], friendships = [], onRemoveFriend, onFollow }) {
  const navigate = useNavigate();

  const friends = useMemo(() => {
    const byId = new Map((users ?? []).map((u) => [String(u.id), u]));
    return (friendships ?? [])
      .filter((f) => f?.status === "accepted")
      .filter(
        (f) =>
          String(f.userId) === String(currentUser?.id) ||
          String(f.friendId) === String(currentUser?.id),
      )
      .map((f) => {
        const friendId =
          String(f.userId) === String(currentUser?.id) ? String(f.friendId) : String(f.userId);
        return {
          friendship: f,
          user: byId.get(friendId) ?? { id: friendId, nickname: friendId },
        };
      });
  }, [users, friendships, currentUser]);

  const followers = useMemo(() => {
    const byId = new Map((users ?? []).map((u) => [String(u.id), u]));
    return (friendships ?? [])
      .filter((f) => f?.status === "follower")
      .filter((f) => String(f.userId) === String(currentUser?.id))
      .map((f) => {
        const followerId = String(f.friendId);
        return {
          friendship: f,
          user: byId.get(followerId) ?? { id: followerId, nickname: followerId },
        };
      });
  }, [users, friendships, currentUser]);

  const iFollow = useMemo(() => {
    const byId = new Map((users ?? []).map((u) => [String(u.id), u]));
    return (friendships ?? [])
      .filter((f) => f?.status === "following")
      .filter((f) => String(f.userId) === String(currentUser?.id))
      .map((f) => {
        const id = String(f.friendId);
        return {
          friendship: f,
          user: byId.get(id) ?? { id, nickname: id },
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
                    borderRadius: 999,
                    background: "#eee",
                    border: "1px solid #ddd",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 900,
                  }}
                >
                  {(user.nickname ?? "?").slice(0, 1).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 900 }}>{user.nickname}</div>
                  <div style={{ opacity: 0.6, fontSize: 12 }}>{user.id}</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFriend?.(user.id);
                  }}
                  title="Remove from friends"
                  aria-label={`Remove ${user.nickname} from friends`}
                >
                  Remove
                </button>
                <span aria-hidden="true">›</span>
              </div>
            </button>
          ))}
        </div>
      )}

      <h2 style={{ marginTop: 24 }}>Followers</h2>
      {followers.length === 0 ? (
        <div style={{ opacity: 0.7 }}>No followers.</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {followers.map(({ user }) => (
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
                    borderRadius: 999,
                    background: "#eee",
                    border: "1px solid #ddd",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 900,
                  }}
                >
                  {(user.nickname ?? "?").slice(0, 1).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 900 }}>{user.nickname}</div>
                  <div style={{ opacity: 0.6, fontSize: 12 }}>{user.id}</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onFollow?.(user.id);
                  }}
                >
                  Follow
                </button>
                <span aria-hidden="true">›</span>
              </div>
            </button>
          ))}
        </div>
      )}

      <h2 style={{ marginTop: 24 }}>I Follow</h2>
      {iFollow.length === 0 ? (
        <div style={{ opacity: 0.7 }}>You are not following anyone.</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {iFollow.map(({ user }) => (
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
                    borderRadius: 999,
                    background: "#eee",
                    border: "1px solid #ddd",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 900,
                  }}
                >
                  {(user.nickname ?? "?").slice(0, 1).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 900 }}>{user.nickname}</div>
                  <div style={{ opacity: 0.6, fontSize: 12 }}>{user.id}</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 12, opacity: 0.75, fontWeight: 800 }}>Following</span>
                <span aria-hidden="true">›</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default FriendsPage;


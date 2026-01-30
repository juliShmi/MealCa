import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function FriendsPage({ currentUser, users = [], friendships = [], recipes = [], onRemoveFriend, onFollow, onUnfollow }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState("friends"); // friends | followers | following

  const signatureByUserId = useMemo(() => {
    const map = new Map();
    (users ?? []).forEach((u) => {
      const sigId = u?.signatureDishRecipeId;
      if (!sigId) {
        map.set(String(u.id), null);
        return;
      }
      const r =
        (recipes ?? []).find((x) => String(x.authorId) === String(u.id) && String(x.id) === String(sigId)) ?? null;
      map.set(String(u.id), r);
    });
    return map;
  }, [users, recipes]);

  const SignatureLine = ({ user }) => {
    const recipe = signatureByUserId.get(String(user.id)) ?? null;
    return (
      <div style={{ marginTop: 2, display: "flex", alignItems: "center", gap: 8, fontSize: 12, opacity: 0.75 }}>
        <div
          aria-hidden="true"
          style={{
            width: 18,
            height: 18,
            borderRadius: 6,
            border: "1px solid #ddd",
            background: "#f3f3f3",
            display: "grid",
            placeItems: "center",
            fontWeight: 900,
            fontSize: 11,
            color: "#444",
            flex: "0 0 auto",
          }}
        >
          {recipe ? String(recipe.name ?? "?").slice(0, 1).toUpperCase() : "—"}
        </div>
        <span style={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {recipe ? recipe.name : "Not assigned"}
        </span>
      </div>
    );
  };

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

  const TabButton = ({ id, label, count }) => {
    const isActive = tab === id;
    return (
      <button
        type="button"
        onClick={() => setTab(id)}
        aria-pressed={isActive}
        style={{
          padding: "8px 10px",
          borderRadius: 999,
          border: isActive ? "2px solid #111" : "1px solid #ddd",
          background: isActive ? "#f7f7f7" : "#fff",
          cursor: "pointer",
          fontWeight: 900,
          fontSize: 13,
        }}
      >
        {label}{" "}
        <span style={{ opacity: 0.7, fontWeight: 800 }}>
          {count}
        </span>
      </button>
    );
  };

  return (
    <div style={{ padding: 16, maxWidth: 720 }}>
      <h1 style={{ marginTop: 0 }}>Friends</h1>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
        <TabButton id="friends" label="Friends" count={friends.length} />
        <TabButton id="followers" label="Followers" count={followers.length} />
        <TabButton id="following" label="I Follow" count={iFollow.length} />
      </div>

      {tab === "friends" && (
        <>
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
                      <SignatureLine user={user} />
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
        </>
      )}

      {tab === "followers" && (
        <>
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
                      <SignatureLine user={user} />
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
        </>
      )}

      {tab === "following" && (
        <>
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
                      <SignatureLine user={user} />
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onUnfollow?.(user.id);
                      }}
                      title={`Unfollow ${user.nickname}`}
                      aria-label={`Unfollow ${user.nickname}`}
                    >
                      Unfollow
                    </button>
                    <span aria-hidden="true">›</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default FriendsPage;


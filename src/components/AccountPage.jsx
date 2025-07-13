import React, { useEffect, useState } from "react";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("credentials"));
    setUser(storedUser);

    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  if (!user)
    return (
      <div className="p-6 max-w-xl mx-auto">
        <p className="text-red-500 font-semibold">
          No account found. Please sign up.
        </p>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">Account Info</h2>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Address:</strong> {user.address}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Your Orders</h2>
        {orders.length === 0 ? (
          <p className="text-gray-600">No orders placed yet.</p>
        ) : (
          orders.map((order, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded shadow mb-4 border"
            >
              <p className="text-sm text-gray-500">
                Ordered on: {new Date(order.date).toLocaleString()}
              </p>
              <ul className="divide-y mt-2">
                {order.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between py-2"
                  >
                    <span>{item.title} (x{item.quantity})</span>
                    <span className="font-semibold">${item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
              <p className="text-right font-bold mt-2">
                Total: ${order.total.toFixed(2)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProfilePage;

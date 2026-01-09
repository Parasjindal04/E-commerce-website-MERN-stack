import { Order } from "../models/order.model.js";
import { Purchase } from "../models/purchase.model.js";

export const orderData = async (req, res) => {
  const order = req.body;

  try {
    // 1️⃣ Create order
    const orderInfo = await Order.create(order);

    // 2️⃣ Create purchase record
    const purchaseInfo = await Purchase.create({
      userId: orderInfo.userId,
      courseId: orderInfo.courseId,
    });

    // 3️⃣ Return order + purchase info
    res.status(201).json({
      message: "Order & Purchase created successfully",
      order: orderInfo,
      purchase: purchaseInfo,
    });
  } catch (error) {
    console.log("Error in order creation:", error);
    res.status(500).json({ errors: "Error in order creation" });
  }
};

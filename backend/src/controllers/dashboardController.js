const prisma = require("../config/prisma");

const getDashboard = async (req, res) => {
  try {
    const totalCustomers = await prisma.customer.count();

    const totalProducts = await prisma.product.count();

    const totalChallans = await prisma.challan.count();

    const totalUsers = await prisma.user.count();

    const products = await prisma.product.findMany();

    const lowStockProducts = products.filter(
      (product) => product.currentStock <= product.minimumStock
    ).length;

    res.status(200).json({
      totalCustomers,
      totalProducts,
      totalChallans,
      totalUsers,
      lowStockProducts,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getDashboard,
};
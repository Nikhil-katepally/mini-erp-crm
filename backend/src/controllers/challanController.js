const prisma = require("../config/prisma");

// Create Draft Challan
const createChallan = async (req, res) => {
  try {
    const { customerId, items } = req.body;

    const customer = await prisma.customer.findUnique({
      where: {
        id: Number(customerId),
      },
    });

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    let totalQuantity = 0;

    const count = await prisma.challan.count();

    const challanNumber =
      "CH-" +
      new Date().getFullYear() +
      "-" +
      String(count + 1).padStart(4, "0");

    const challanItems = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: {
          id: Number(item.productId),
        },
      });

      if (!product) {
        return res.status(404).json({
          message: `Product ${item.productId} not found`,
        });
      }

      totalQuantity += Number(item.quantity);

      challanItems.push({
        productId: product.id,
        productName: product.productName,
        sku: product.sku,
        unitPrice: product.unitPrice,
        quantity: Number(item.quantity),
      });
    }

    const challan = await prisma.challan.create({
      data: {
        challanNumber,
        customerId: Number(customerId),
        totalQuantity,
        status: "DRAFT",
        createdById: req.user.id,
        items: {
          create: challanItems,
        },
      },
      include: {
        customer: true,
        items: true,
      },
    });

    res.status(201).json(challan);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get All Challans
const getAllChallans = async (req, res) => {
  try {
    const challans = await prisma.challan.findMany({
      include: {
        customer: true,
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        items: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(challans);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get Challan By ID
const getChallanById = async (req, res) => {
  try {
    const challan = await prisma.challan.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        customer: true,
        createdBy: true,
        items: true,
      },
    });

    if (!challan) {
      return res.status(404).json({
        message: "Challan not found",
      });
    }

    res.json(challan);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const confirmChallan = async (req, res) => {
  try {
    const challanId = Number(req.params.id);

    const challan = await prisma.challan.findUnique({
      where: {
        id: challanId,
      },
      include: {
        items: true,
      },
    });

    if (!challan) {
      return res.status(404).json({
        message: "Challan not found",
      });
    }

    if (challan.status === "CONFIRMED") {
      return res.status(400).json({
        message: "Challan already confirmed",
      });
    }

    // Check stock
    for (const item of challan.items) {
      const product = await prisma.product.findUnique({
        where: {
          id: item.productId,
        },
      });

      if (!product) {
        return res.status(404).json({
          message: `Product ${item.productId} not found`,
        });
      }

      if (product.currentStock < item.quantity) {
        return res.status(400).json({
          message: `${product.productName} has insufficient stock`,
        });
      }
    }

    // Deduct stock and create stock movements
    for (const item of challan.items) {
      const product = await prisma.product.findUnique({
        where: {
          id: item.productId,
        },
      });

      await prisma.product.update({
        where: {
          id: item.productId,
        },
        data: {
          currentStock: product.currentStock - item.quantity,
        },
      });

      await prisma.stockMovement.create({
        data: {
          productId: item.productId,
          quantity: item.quantity,
          movementType: "OUT",
          reason: `Sales Challan ${challan.challanNumber}`,
          createdById: req.user.id,
        },
      });
    }

    const updatedChallan = await prisma.challan.update({
      where: {
        id: challanId,
      },
      data: {
        status: "CONFIRMED",
      },
      include: {
        customer: true,
        items: true,
      },
    });

    res.json({
      message: "Challan confirmed successfully",
      challan: updatedChallan,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createChallan,
  getAllChallans,
  getChallanById,
  confirmChallan,
};
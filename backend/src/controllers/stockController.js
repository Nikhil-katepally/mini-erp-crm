const prisma = require("../config/prisma");

// Stock IN
const stockIn = async (req, res) => {
  try {
    const { productId, quantity, reason } = req.body;

    const product = await prisma.product.findUnique({
      where: {
        id: Number(productId),
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id: Number(productId),
      },
      data: {
        currentStock: product.currentStock + Number(quantity),
      },
    });

    await prisma.stockMovement.create({
      data: {
        productId: Number(productId),
        quantity: Number(quantity),
        movementType: "IN",
        reason,
        createdById: req.user.id,
      },
    });

    res.status(200).json({
      message: "Stock Added Successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Stock OUT
const stockOut = async (req, res) => {
  try {
    const { productId, quantity, reason } = req.body;

    const product = await prisma.product.findUnique({
      where: {
        id: Number(productId),
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (product.currentStock < Number(quantity)) {
      return res.status(400).json({
        message: "Insufficient Stock",
      });
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id: Number(productId),
      },
      data: {
        currentStock: product.currentStock - Number(quantity),
      },
    });

    await prisma.stockMovement.create({
      data: {
        productId: Number(productId),
        quantity: Number(quantity),
        movementType: "OUT",
        reason,
        createdById: req.user.id,
      },
    });

    res.status(200).json({
      message: "Stock Removed Successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Stock History
const stockHistory = async (req, res) => {
  try {
    const history = await prisma.stockMovement.findMany({
      include: {
        product: true,
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(history);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  stockIn,
  stockOut,
  stockHistory,
};
const prisma = require("../config/prisma");

// Create Product
const createProduct = async (req, res) => {
  try {
    const {
      productName,
      sku,
      description,
      category,
      unit,
      unitPrice,
      currentStock,
      minimumStock,
      warehouse,
    } = req.body;

    const existingProduct = await prisma.product.findUnique({
      where: { sku },
    });

    if (existingProduct) {
      return res.status(400).json({
        message: "SKU already exists",
      });
    }

    const product = await prisma.product.create({
      data: {
        productName,
        sku,
        description,
        category,
        unit,
        unitPrice,
        currentStock,
        minimumStock,
        warehouse,
        createdById: req.user.id,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get All Products
const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
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

    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get Product By ID
const getProductById = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }

    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const product = await prisma.product.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });

    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    await prisma.product.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.json({
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Search Products
const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.query;

    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            productName: {
              contains: keyword,
            },
          },
          {
            sku: {
              contains: keyword,
            },
          },
          {
            category: {
              contains: keyword,
            },
          },
        ],
      },
    });

    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Low Stock Products
const lowStockProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();

    const lowStock = products.filter(
      (p) => p.currentStock <= p.minimumStock
    );

    res.json(lowStock);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
  lowStockProducts,
};
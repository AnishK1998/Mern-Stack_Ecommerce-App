const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const Order = require("../models/orderModel");

//Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    sucess: true,
    order,
  });
});

//get single Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(
      new ErrorHandler(`Order not found with this id : ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    sucess: true,
    order,
  });
});
//Get Logged in user Orders
exports.myOrder = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id }).populate(
    "user",
    "name email"
  );
  if (!orders) {
    return next(
      new ErrorHandler(`Cart is empty for this id : ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    sucess: true,
    orders,
  });
});

//Get all orders for :-Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({
    sucess: true,
    totalAmount,
    orders,
  });
});

//Update Order status and reduce quantity when staus will be delivered:-Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(
      new ErrorHandler(`Order not found with this id : ${req.params.id}`, 404)
    );
  }
  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler(`You have already delivered this order`, 404));
  }

  if(req.body.status === "Shipped"){
    order.orderItems.forEach(async (o) =>{
      await updateStock(o.product, o.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }
  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    sucess: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.Stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

//delete order :- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(
      new ErrorHandler(`Order not found with this id : ${req.params.id}`, 404)
    );
  }
  await order.remove();
  res.status(200).json({
    sucess: true,
    message: "Order deleted successfully",
  });
});

import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast"

const getStoredJSON = (key, fallback) => {
  try {
    const val = localStorage.getItem(key)
    return val ? JSON.parse(val) : fallback
  } catch (err) {
    return fallback
  }
}

const initialState = {
  cart: getStoredJSON("cart", []),
  total: getStoredJSON("total", 0),
  totalItems: getStoredJSON("totalItems", 0),
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const course = action.payload
      const index = state.cart.findIndex((item) => item._id === course._id)

      if (index >= 0) {
        toast.error("Course is already in your cart")
        return
      }

      state.cart.push(course)
      state.totalItems++
      state.total += Number(course.price || 0)

      try {
        localStorage.setItem("cart", JSON.stringify(state.cart))
        localStorage.setItem("total", JSON.stringify(state.total))
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
      } catch (e) {}

      toast.success("Course added to cart")
    },
    removeFromCart: (state, action) => {
      const courseId = action.payload
      const index = state.cart.findIndex((item) => item._id === courseId)

      if (index >= 0) {
        state.totalItems--
        state.total -= Number(state.cart[index].price || 0)
        state.cart.splice(index, 1)

        try {
          localStorage.setItem("cart", JSON.stringify(state.cart))
          localStorage.setItem("total", JSON.stringify(state.total))
          localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
        } catch (e) {}

        toast.success("Course removed from cart")
      }
    },
    resetCart: (state) => {
      state.cart = []
      state.total = 0
      state.totalItems = 0
      try {
        localStorage.removeItem("cart")
        localStorage.removeItem("total")
        localStorage.removeItem("totalItems")
      } catch (e) {}
    },
  },
})

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions

export default cartSlice.reducer
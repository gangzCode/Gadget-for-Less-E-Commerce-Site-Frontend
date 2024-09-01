const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getNewArrivals = async () => {
  const res = await fetch(baseUrl + "/products/get/featured/10", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  if (!res.ok) {
    throw res.status;
  }
  return await res.json();
};

export const getBestSellers = async (count) => {
  const res = await fetch(baseUrl + "/products/get/bestSeller/" + count, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  if (!res.ok) {
    throw res.status;
  }
  return await res.json();
};

export const getCrumbs = async (catType, id) => {
  const res = await fetch(baseUrl + `/products/get/crumbs?category=${id}&catType=${catType}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  if (!res.ok) {
    throw res.status;
  }
  return await res.json();
};

export const getProductCrumbs = async (product) => {
  const res = await fetch(baseUrl + `/products/get/crumbs?product=${product}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  if (!res.ok) {
    throw res.status;
  }
  return await res.json();
};

export const getSales = async (page, limit) => {
  const res = await fetch(
    baseUrl + `/products/get/productsWithDiscount?page=${page}&limit=${limit}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );
  if (!res.ok) {
    throw res.status;
  }
  return await res.json();
};

export const getAllItemsWithPagination = async (data) => {
  const res = await fetch(baseUrl + "/products/get/products", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw res.status;
  }
  return await res.json();
};

export const getAllItemsFilteredWithPagination = async (data) => {
  const res = await fetch(baseUrl + "/products/get/productsFiltered", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw res.status;
  }
  return await res.json();
};

export const getAllFilterGroups = async () => {
  const res = await fetch(baseUrl + "/filters/getFilterGroup", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  if (!res.ok) {
    throw res.status;
  }
  return await res.json();
};

export const getCardFilters = async () => {
  const res = await fetch(baseUrl + "/filters/getCardFilters", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  if (!res.ok) {
    throw res.status;
  }
  return await res.json();
};

/*
export const getNewArrivals = async (token) => {
    const res = (await fetch(baseUrl + '/products/get/featured/10', {
        headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        method: "GET",
    }));
    if(!res.ok) {
        throw (res.status);
    }
    return await res.json();
}
*/

export const getProduct = async (productId) => {
  const res = await fetch(baseUrl + "/products/" + productId, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  if (!res.ok) {
    throw res.status;
  }
  return await res.json();
};

export const getRelatedProducts = async (incatId, limit) => {
  const res = await fetch(
    baseUrl +
      "/products/?categories&subCategories&innerSubCategories=" +
      incatId +
      "&limit=" +
      limit,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );
  if (!res.ok) {
    throw res.status;
  }
  return await res.json();
};

export const getCategoriesForNav = async () => {
  const res = await fetch(baseUrl + "/categories/getNavBarCategories", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  if (!res.ok) {
    throw res.status;
  }
  return await res.json();
};

/* CART */
export const addItemToCart = async (token, data) => {
  const res = await fetch(baseUrl + "/cart/", {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw res.status;
  }
  return await res.json();
};

export const getCart = async (token, username) => {
  const res = await fetch(baseUrl + "/cart/find", {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ username: username }),
  });
  if (!res.ok) {
    throw res.status;
  }
  return await res.json();
};

export const deleteFromCart = async (token, username, cartId) => {
  const res = await fetch(baseUrl + "/cart/delete", {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ username: username, cartId: cartId }),
  });
  if (!res.ok) {
    throw res.status;
  }
  return await res.json();
};

export const updateCartApi = async (token, cartArray) => {
  const res = await fetch(baseUrl + "/cart/update", {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(cartArray),
  });
  if (!res.ok) {
    throw res.status;
  }
  return await res.json();
};

export const clearCartApi = async (token, username) => {
  const res = await fetch(baseUrl + "/cart/clearCart", {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ username: username }),
  });
  if (!res.ok) {
    throw res.status;
  }
  return await res.json();
};

/* WISHLIST */
export const addItemToWishlist = async (token, data) => {
  const res = await fetch(baseUrl + "/wishlist/", {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw res.status;
  }
  return await res.json();
};

export const getWishlist = async (token, username) => {
  const res = await fetch(baseUrl + "/wishlist/find", {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ username: username }),
  });
  if (!res.ok) {
    throw res.status;
  }
  return await res.json();
};

export const deleteFromWishlist = async (token, username, wishlistId) => {
  const res = await fetch(baseUrl + "/wishlist/delete", {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ username: username, wishlistId: wishlistId }),
  });
  if (!res.ok) {
    throw res.status;
  }
  return await res.json();
};

export const clearWishlistApi = async (token, username) => {
  const res = await fetch(baseUrl + "/wishlist/clearWishlist", {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ username: username }),
  });
  if (!res.ok) {
    throw res.status;
  }
  return await res.json();
};

/* NEWS LETTER */
export const subscribeToNewsApi = async (username) => {
  const res = await fetch(baseUrl + "/news-letters", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ email: username }),
  });
  if (!res.ok) {
    throw res.status;
  }
  return await res.json();
};

export const sendContactUs = async (data) => {
  const res = await fetch(baseUrl + "/news-letters/inquire", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw res.status;
  }
  return await res.json();
};

/* ACCOUNT DETAILS */
export const saveUserDetails = async (token, userData) => {
  const res = await fetch(baseUrl + "/clients/saveUserDetails", {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(userData),
  });
  if (!res.ok) {
    throw res.status;
  }
  return await res.json();
};

export const getUserDataByEmail = async (token, username) => {
  const res = await fetch(baseUrl + "/clients/findUserDetails", {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ email: username }),
  });
  if (!res.ok) {
    throw res.status;
  }
  return await res.json();
};

export const saveUserAddress = async (token, userData) => {
  const res = await fetch(baseUrl + "/clients/saveUserAddress", {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(userData),
  });
  if (!res.ok) {
    throw res.status;
  }
  return await res.json();
};

export const findUserAddress = async (token, username) => {
  const res = await fetch(baseUrl + "/clients/findUserAddress", {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ email: username }),
  });
  if (!res.ok) {
    throw res.status;
  }
  return await res.json();
};

export const findPostalCharges = async (data) => {
  const res = await fetch(baseUrl + "/order/findPostalCharges", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw res.status;
  }
  return await res.json();
};

// export const getPaymentLink = async (token, data) => {
//     const res = await fetch(baseUrl + '/order/getPaymentLink',{
//         headers: {
//             authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//         },
//         method: "POST",
//         body: JSON.stringify(data)
//     });
//     if(!res.ok) {
//         throw (res.status);
//     }
//     return await res.json();
// }

export const chargeUser = async (token, data) => {
  const res = await fetch(baseUrl + "/order/charge", {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw res.status;
  }
  return await res.json();
};

export const placeOrder = async (token, data) => {
  const res = await fetch(baseUrl + "/order/placeOrder", {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw res.status;
  }
  return await res.json();
};

export const getOrders = async (token, username) => {
  const res = await fetch(baseUrl + "/order/getOrdersForUser", {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ username: username }),
  });
  if (!res.ok) {
    throw res.status;
  }
  return await res.json();
};

export const deleteAddressApi = async (token, addressId) => {
  const res = await fetch(baseUrl + "/clients/deleteAddress", {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ addressId: addressId }),
  });
  if (!res.ok) {
    throw res.status;
  }
  return await res.json();
};

export const getAllSubCategories = async () => {
  const res = await fetch(baseUrl + "/subCategories", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  if (!res.ok) {
    throw res.status;
  }
  return await res.json();
};

// Search
let controller = null;

export const quickSearch = async (term) => {
  if (controller) {
    controller.abort();
  }
  controller = new AbortController();
  const signal = controller.signal;
  const res = await fetch(baseUrl + "/search/quickSearch/" + term, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
    signal: signal,
  });
  controller = null;
  if (!res.ok) {
    throw res.status;
  }
  return res.json();
};

export const downloadReportApi = async (token, orderId) => {
  const res = await fetch(baseUrl + "/order/printReportForUser/", {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ orderId: orderId }),
  });
  if (!res.ok) {
    throw res.status;
  }
  return res.json();
};

// TAXES
export const getActiveTaxes = async () => {
  const res = await fetch(baseUrl + "/tax/activeTaxes", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  if (!res.ok) {
    throw res.status;
  }
  return await res.json();
};

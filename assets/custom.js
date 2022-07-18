/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 *
 * If you just want to force refresh the mini-cart without adding a specific product, you can trigger the event
 * "cart:refresh" in a similar way (in that case, passing the quantity is not necessary):
 *
 * document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
 *   bubbles: true
 * }));
 */

/* 
    CODE TO CHANGE THE COLOR OF THE SHOP PAY LOGO
*/
function changeShopPayLogo() {
  // SELECT THE SVG PATH FOR THE LOGO IN THE SHADOWROOT. RETURNS AN ARRAY OF 2.
  let selector = document
    .querySelector("shopify-payment-terms")
    .shadowRoot.querySelector("shop-pay-logo")
    .shadowRoot.querySelectorAll("path");

  // ITERATE THROUGH THAT ARRAY CHANGING THE COLOR TO BLACK FOR ALL
  for (let i = 0; i < selector.length; i++) {
    document
      .querySelector("shopify-payment-terms")
      .shadowRoot.querySelector("shop-pay-logo")
      .shadowRoot.querySelectorAll("path")
      [i].setAttribute("style", "fill: #353535");
  }
}

// CHANGE COLOR OF THE BUTTON SHOP PAY (CANT GET IT TO WORK)
function test() {
  let selector2 = document
    .getElementById("shopify-svg__payments-shop-pay")
    .querySelectorAll("path");

  for (let i = 0; i < selector2.length; i++) {
    const path = selector2[i];

    path.style.fill = "red";
    if (path.style.fill == "white") {
    }
  }
}
window.onload = (event) => {
  test();
};

// THE LOGO CHANGE FUNCTION NEEDS TO RUN ONCE ALL THE ELEMENTS HAVE BEEN LOADED.
window.onload = (event) => {
  // THE SHOP PAY LOGO REFRESHES EVERYTIME THE PRICE OF THE VARIANT CHANGES. SO WE NEED TO ADD AN EVENT LISTENER FOR THE PRICE CHANGE AND RUN THE FUNCTION AGAIN FOR THE COLOR.

  // Select the node that will be observed for mutations
  const targetNode = document.getElementsByClassName(
    "ProductMeta__PriceList"
  )[0];
  const targetNode2 = document.getElementsByClassName(
    "ProductMeta__StoreAvailabilityContainer"
  )[0];

  // Options for the observer (which mutations to observe)
  const config = { attributes: true, childList: true, subtree: true };

  // Callback function to execute when mutations are observed
  const callback = function (mutationList, observer) {
    // Use traditional 'for loops' for IE 11
    // WHENEVER SOMETHING IN THE TARGETNODE CHANGES, EXECUTE THE COLOR CHANGE OF THE LOGO AGAIN
    for (const mutation of mutationList) {
      changeShopPayLogo();
    }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);
  observer.observe(targetNode2, config);

  // Later, you can stop observing
  // observer.disconnect();
  changeShopPayLogo();
};
/*
    END OF SHOP PAY LOGO CHANGE CUSTOM CODE
*/

/*
    SHOP PAY INFO ONLY SHOW FOR ITEMS OVER $50
*/

function showShopPay() {
  document.getElementById("shop-pay-container").style.visibility = "visible";
  document.getElementById("shop-pay-container").style.height = "auto";
}

function hideShopPay() {
  document.getElementById("shop-pay-container").style.visibility = "hidden";
  document.getElementById("shop-pay-container").style.height = "0";
}

document.addEventListener("variant:changed", function (event) {
  var variant = event.detail.variant; // Gives you access to the whole variant details
  window.onload = (event) => {
    changeShopPayLogo();
  };
  console.log("variant change!!");
  console.log(variant);
  if (variant.price > 5000) {
    showShopPay();
  } else {
    hideShopPay();
  }
});

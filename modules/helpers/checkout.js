export const checkoutWebView = (data, signature) => {
  return `<!doctype html>

<html lang="en">

<head>
    <meta charset="utf-8">
    <title>beneficio</title>
    <meta name="description" content="beneficio">
    <meta name="author" content="beneficio">
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
</head>

<body style="margin: 0; padding-bottom: 10px; background-color: #f9f8fd;">
    <div id="liqpay_checkout"></div>
    <script>
        window.LiqPayCheckoutCallback = function() {
            LiqPayCheckout.init({
                data: "${data}",
                signature: "${signature}",
                embedTo: "#liqpay_checkout",
                mode: "embed" // embed || popup,
            }).on("liqpay.callback", function(data) {
                console.log(data.status);
                console.log(data);
            }).on("liqpay.ready", function(data) {
                console.log(data.status, 'it is success ?');
                completeLevel();
                // ready
            }).on("liqpay.close", function(data) {
                console.log(data.status, 'it is failure ?');
                rejectComplete();
                // close
            });
        };
    </script>
    <script type="text/javascript" src="http://static.liqpay.ua/libjs/checkout.js"></script>
</body>

</html>`;
};


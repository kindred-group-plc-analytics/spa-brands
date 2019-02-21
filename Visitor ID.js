if (b.event_name === 'loginSuccess') {
    // Login Operation was completed.
    if (typeof vAPI !== "undefined") {
        vAPI.getInstance(u.data.adobe_org_id,
            function (visitor) {
                if (b.userId) {
                    visitor.setCustomerIDs({
                        "server_side": {
                            "id": b.userId,
                            "authState": Visitor.AuthState.AUTHENTICATED
                        }
                    });
                }

            }, u.clearEmptyKeys(u.data.config), u.data.customer_ids);
    }
}
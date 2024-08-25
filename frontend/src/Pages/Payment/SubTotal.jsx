import React from "react";
import CurrencyFormat from "react-currency-format";
import {userApi} from "../../Redux/Services/userApi";

export default function SubTotal() {
	const {data} = userApi.endpoints.getUser.useQueryState();

	return (
		<div className="payment__subtotal">
			<strong>
				<CurrencyFormat
					renderText={(value) => <>Order Total: {value}</>}
					decimalScale={2}
					value={data?.cartItems?.total}
					displayType={"text"}
					thousandSeparator={true}
					prefix={"$"}
				/>
			</strong>
		</div>
	);
}

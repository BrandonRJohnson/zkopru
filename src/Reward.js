import fromWei from "./fromWei";
import BN from "bn.js";

const Reward = ( item ) => {
    return fromWei(BN(item.withdrawal.erc20Amount).sub(new BN(item.prepayFeeInToken)))
}

export default Reward;
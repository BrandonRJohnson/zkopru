import fromWei from "./fromWei";
import BN from "bn.js";


const Reward = ( item ) => {
    if ( +item.withdrawal.tokenAddr === 0) {
        return `${fromWei(item.prepayFeeInEth)} ETH`
    }
    else {
        const { decimals, symbol } = item.withdrawal.tokenInfo
        return `${new BN(item.prepayFeeInToken).div(new BN(10).pow(new BN(decimals)))} ${symbol}`
    }
}

export default Reward;
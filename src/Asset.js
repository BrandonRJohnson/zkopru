
const Asset  = ( address, tokenInfo ) => {
    if ( +address === 0) {
        return "ETH"
    }

    else {
        return tokenInfo.symbol
    }
}

export default Asset;
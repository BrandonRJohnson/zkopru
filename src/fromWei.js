import BN from 'bn.js';

const fromWei = (amount, decimals = 8) => {
    let bnAmount
    if (typeof amount === 'string' && amount.indexOf('0x') === 0) {
      bnAmount = new BN(amount.slice(2), 16)
    } else {
      bnAmount = new BN(amount)
    }
    const finney = bnAmount.div(new BN(`${10 ** (18 - decimals)}`)).toString()
    const ether = +finney / (10 ** decimals)
    return ether
}

export default fromWei;
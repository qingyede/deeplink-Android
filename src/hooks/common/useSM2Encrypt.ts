// import { ref } from 'vue';
// import smCrypto from 'sm-crypto'
// const sm2 = smCrypto.sm2
// import { PUBLICKEY } from "@/constant/API";
// const cipherMode = 1 // 1 - C1C3C2，0 - C1C2C3，默认为1

// export function useSM2Encrypt() {

//   /**
//    * @param {string} message - 要加密的明文
//    */
//   const encryptMessage = (message) => {
//     try {
//       return sm2.doEncrypt(message, PUBLICKEY, cipherMode)
//     } catch (error) {
//       console.error('Encryption failed:', error);
//       return ''
//     }
//   };

//   return {
//     encryptMessage,
//   };
// }

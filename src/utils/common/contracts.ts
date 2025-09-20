import { ethers } from 'ethers'

export const CONTRACT_ADDRESSES = {
  RENT: '0xDA9EfdfF9CA7B7065b7706406a1a79C0e483815A',
  DLC_TOKEN: '0x6f8F70C74FE7d7a61C8EAC0f35A4Ba39a51E1BEe',
  NFT_CONTRACT: '0x6Aa5844f9006C0C3003DB0a375442533bbFc2C17',
}
// 积分模式
export const DLCP_TOKEN_ADDRESS = '0x9b09b4B7a748079DAd5c280dCf66428e48E38Cd6'
export const DLCP_RECEIVER = '0x4D3945Ae9Adb44289E15bDEe279d10F440E19595'
// 地址
export const NFTTRANSFER_ADDRESS = '0x4D3945Ae9Adb44289E15bDEe279d10F440E19595'

export const CONTRACT_ABIS = {
  RENT: [
    {
      inputs: [],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'target',
          type: 'address',
        },
      ],
      name: 'AddressEmptyCode',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'AddressInsufficientBalance',
      type: 'error',
    },
    {
      inputs: [],
      name: 'BalanceNotEnough',
      type: 'error',
    },
    {
      inputs: [],
      name: 'CallerNotStakingContract',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'CanNotUpgrade',
      type: 'error',
    },
    {
      inputs: [],
      name: 'CountOfApproveAdminsShouldBeFive',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'implementation',
          type: 'address',
        },
      ],
      name: 'ERC1967InvalidImplementation',
      type: 'error',
    },
    {
      inputs: [],
      name: 'ERC1967NonPayable',
      type: 'error',
    },
    {
      inputs: [],
      name: 'ElementNotFound',
      type: 'error',
    },
    {
      inputs: [],
      name: 'FailedInnerCall',
      type: 'error',
    },
    {
      inputs: [],
      name: 'InvalidInitialization',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'rentDuration',
          type: 'uint256',
        },
      ],
      name: 'InvalidRentDuration',
      type: 'error',
    },
    {
      inputs: [],
      name: 'MachineCanNotRent',
      type: 'error',
    },
    {
      inputs: [],
      name: 'MachineCanNotRentWithin100BlocksAfterLastRent',
      type: 'error',
    },
    {
      inputs: [],
      name: 'MachineNotRented',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NotApproveAdmin',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NotDBCAIContract',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NotInitializing',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NotProxyRentingMachine',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NotRenter',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NotValidMachineId',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
      ],
      name: 'OwnableInvalidOwner',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'OwnableUnauthorizedAccount',
      type: 'error',
    },
    {
      inputs: [],
      name: 'ProxyRentCanNotEndByRenter',
      type: 'error',
    },
    {
      inputs: [],
      name: 'RenTimeCannotOverMachineUnstakeTime',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'rentDuration',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'maxRentDuration',
          type: 'uint256',
        },
      ],
      name: 'RentDurationTooLong',
      type: 'error',
    },
    {
      inputs: [],
      name: 'RentEnd',
      type: 'error',
    },
    {
      inputs: [],
      name: 'RentNotEnd',
      type: 'error',
    },
    {
      inputs: [],
      name: 'RenterAndPayerIsSame',
      type: 'error',
    },
    {
      inputs: [],
      name: 'RentingNotExist',
      type: 'error',
    },
    {
      inputs: [],
      name: 'ReportedMachineNotFound',
      type: 'error',
    },
    {
      inputs: [],
      name: 'ReserveAmountForReportShouldBe10000',
      type: 'error',
    },
    {
      inputs: [],
      name: 'RewardNotStart',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'token',
          type: 'address',
        },
      ],
      name: 'SafeERC20FailedOperation',
      type: 'error',
    },
    {
      inputs: [],
      name: 'UUPSUnauthorizedCallContext',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'slot',
          type: 'bytes32',
        },
      ],
      name: 'UUPSUnsupportedProxiableUUID',
      type: 'error',
    },
    {
      inputs: [],
      name: 'VoteFinished',
      type: 'error',
    },
    {
      inputs: [],
      name: 'ZeroAddress',
      type: 'error',
    },
    {
      inputs: [],
      name: 'ZeroCalcPoint',
      type: 'error',
    },
    {
      inputs: [],
      name: 'uint256Overflow',
      type: 'error',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'string',
          name: 'machineId',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'calcPoint',
          type: 'uint256',
        },
      ],
      name: 'AddBackCalcPointOnOnline',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'string',
          name: 'machineId',
          type: 'string',
        },
      ],
      name: 'AddCalcPointOnline',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'string',
          name: 'machineId',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'admin',
          type: 'address',
        },
      ],
      name: 'ApprovedReport',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'string',
          name: 'machineId',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'rentId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'burnTime',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'burnDLCAmount',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'renter',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint8',
          name: 'rentGpuCount',
          type: 'uint8',
        },
      ],
      name: 'BurnedFee',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'machineOnwer',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'rentId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'machineId',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'rentEndTime',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'renter',
          type: 'address',
        },
      ],
      name: 'EndRentMachine',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'string',
          name: 'machineId',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'enum Rent.Vote',
          name: 'vote',
          type: 'uint8',
        },
      ],
      name: 'ExecuteReport',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'machineOnwer',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'rentId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'ExtraRentFeeTransfer',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint64',
          name: 'version',
          type: 'uint64',
        },
      ],
      name: 'Initialized',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'string',
          name: 'machineId',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'calcPoint',
          type: 'uint256',
        },
      ],
      name: 'MachineRegister',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'string',
          name: 'machineId',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'calcPoint',
          type: 'uint256',
        },
      ],
      name: 'MachineUnregister',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'previousOwner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: 'OwnershipTransferred',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'string',
          name: 'machineId',
          type: 'string',
        },
      ],
      name: 'PaidSlash',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'string',
          name: 'machineId',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'rentId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'renter',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'PayBackFee',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'rentId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'renter',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'totalRentFee',
          type: 'uint256',
        },
      ],
      name: 'PayToContractOnRent',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'machineOnwer',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'rentId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'PlatformFeeTransfer',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'string',
          name: 'machineId',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'admin',
          type: 'address',
        },
      ],
      name: 'RefusedReport',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'string',
          name: 'machineId',
          type: 'string',
        },
      ],
      name: 'RemoveCalcPointOnOffline',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'machineOnwer',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'machineId',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'rentId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'additionalRentSeconds',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'additionalRentFee',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'renter',
          type: 'address',
        },
      ],
      name: 'RenewRent',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'rentId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'renter',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'baseRentFee',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'extraRentFee',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'platformFee',
          type: 'uint256',
        },
      ],
      name: 'RentFee',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'machineOnwer',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'rentId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'machineId',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'rentEndTime',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'renter',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'rentFee',
          type: 'uint256',
        },
      ],
      name: 'RentMachine',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'rentId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'renter',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'RenterPayExtraRentFee',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'rentId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'machineId',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'reporter',
          type: 'address',
        },
      ],
      name: 'ReportMachineFault',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'stakeHolder',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'machineId',
          type: 'string',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'renter',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'slashAmount',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'rentStartAt',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'rentEndAt',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'enum Rent.SlashType',
          name: 'slashType',
          type: 'uint8',
        },
      ],
      name: 'SlashMachineOnOffline',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'implementation',
          type: 'address',
        },
      ],
      name: 'Upgraded',
      type: 'event',
    },
    {
      inputs: [],
      name: 'FACTOR',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'ONE_CALC_POINT_USD_VALUE_PER_MONTH',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'REPORT_RESERVE_AMOUNT',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'SECONDS_PER_BLOCK',
      outputs: [
        {
          internalType: 'uint8',
          name: '',
          type: 'uint8',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'SLASH_AMOUNT',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'UPGRADE_INTERFACE_VERSION',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'USD_DECIMALS',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'adminsToApprove',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'adminsToSetRentWhiteList',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'machineId',
          type: 'string',
        },
      ],
      name: 'approveMachineFaultReporting',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'machineId',
          type: 'string',
        },
      ],
      name: 'canRent',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'canUpgradeAddress',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'dbcAIContract',
      outputs: [
        {
          internalType: 'contract IDBCAIContract',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'machineId',
          type: 'string',
        },
      ],
      name: 'endRentMachine',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'feeToken',
      outputs: [
        {
          internalType: 'contract IRewardToken',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'machineId',
          type: 'string',
        },
        {
          internalType: 'uint256',
          name: 'rentSeconds',
          type: 'uint256',
        },
      ],
      name: 'getBaseMachinePrice',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'stakeHolder',
          type: 'address',
        },
      ],
      name: 'getBurnedRentFeeByStakeHolder',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'machineId',
          type: 'string',
        },
        {
          internalType: 'uint256',
          name: 'rentSeconds',
          type: 'uint256',
        },
      ],
      name: 'getExtraRentFee',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'machineId',
          type: 'string',
        },
      ],
      name: 'getMachineHolderAndCalcPoint',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'machineId',
          type: 'string',
        },
      ],
      name: 'getMachineInfo',
      outputs: [
        {
          internalType: 'uint256',
          name: 'availableRentHours',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'reservedAmount',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'rentFeePerHour',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'machineId',
          type: 'string',
        },
        {
          internalType: 'uint256',
          name: 'rentSeconds',
          type: 'uint256',
        },
      ],
      name: 'getMachinePrice',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'stakeHolder',
          type: 'address',
        },
      ],
      name: 'getRentedGPUCountOfStakeHolder',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'machineId',
          type: 'string',
        },
      ],
      name: 'getRenter',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'machineId',
          type: 'string',
        },
        {
          internalType: 'uint256',
          name: 'pageNumber',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'pageSize',
          type: 'uint256',
        },
      ],
      name: 'getSlashInfosByMachineId',
      outputs: [
        {
          components: [
            {
              internalType: 'address',
              name: 'stakeHolder',
              type: 'address',
            },
            {
              internalType: 'string',
              name: 'machineId',
              type: 'string',
            },
            {
              internalType: 'uint256',
              name: 'slashAmount',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'rentStartAtTimestamp',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'rentEndAtTimestamp',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'rentedDurationSeconds',
              type: 'uint256',
            },
            {
              internalType: 'address',
              name: 'renter',
              type: 'address',
            },
            {
              internalType: 'enum Rent.SlashType',
              name: 'slashType',
              type: 'uint8',
            },
            {
              internalType: 'uint256',
              name: 'createdAt',
              type: 'uint256',
            },
            {
              internalType: 'bool',
              name: 'paid',
              type: 'bool',
            },
          ],
          internalType: 'struct Rent.SlashInfo[]',
          name: 'paginatedSlashInfos',
          type: 'tuple[]',
        },
        {
          internalType: 'uint256',
          name: 'totalCount',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getTotalBurnedRentFee',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getTotalRentedGPUCount',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'machineId',
          type: 'string',
        },
      ],
      name: 'inRentWhiteList',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_initialOwner',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '_precompileContract',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '_stakingContract',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '_dbcAIContract',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '_feeToken',
          type: 'address',
        },
      ],
      name: 'initialize',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'machineId',
          type: 'string',
        },
      ],
      name: 'isInSlashing',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'machineId',
          type: 'string',
        },
      ],
      name: 'isRented',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'lastRentId',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      name: 'machine2ProxyRented',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      name: 'machineId2BurnedInfo',
      outputs: [
        {
          internalType: 'uint256',
          name: 'totalBurnedAmount',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      name: 'machineId2LastRentEndBlock',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      name: 'machineId2RentId',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      name: 'machineId2SlashInfo',
      outputs: [
        {
          internalType: 'address',
          name: 'stakeHolder',
          type: 'address',
        },
        {
          internalType: 'string',
          name: 'machineId',
          type: 'string',
        },
        {
          internalType: 'uint256',
          name: 'slashAmount',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'rentStartAtTimestamp',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'rentEndAtTimestamp',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'rentedDurationSeconds',
          type: 'uint256',
        },
        {
          internalType: 'address',
          name: 'renter',
          type: 'address',
        },
        {
          internalType: 'enum Rent.SlashType',
          name: 'slashType',
          type: 'uint8',
        },
        {
          internalType: 'uint256',
          name: 'createdAt',
          type: 'uint256',
        },
        {
          internalType: 'bool',
          name: 'paid',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'machineId2SlashInfos',
      outputs: [
        {
          internalType: 'address',
          name: 'stakeHolder',
          type: 'address',
        },
        {
          internalType: 'string',
          name: 'machineId',
          type: 'string',
        },
        {
          internalType: 'uint256',
          name: 'slashAmount',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'rentStartAtTimestamp',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'rentEndAtTimestamp',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'rentedDurationSeconds',
          type: 'uint256',
        },
        {
          internalType: 'address',
          name: 'renter',
          type: 'address',
        },
        {
          internalType: 'enum Rent.SlashType',
          name: 'slashType',
          type: 'uint8',
        },
        {
          internalType: 'uint256',
          name: 'createdAt',
          type: 'uint256',
        },
        {
          internalType: 'bool',
          name: 'paid',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'enum Rent.NotifyType',
          name: 'tp',
          type: 'uint8',
        },
        {
          internalType: 'string',
          name: 'machineId',
          type: 'string',
        },
      ],
      name: 'notify',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'oracle',
      outputs: [
        {
          internalType: 'contract IOracle',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'machineId',
          type: 'string',
        },
      ],
      name: 'paidSlash',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'pendingSlashMachineId2ApprovedAdmins',
      outputs: [
        {
          internalType: 'enum Rent.Vote',
          name: '',
          type: 'uint8',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      name: 'pendingSlashMachineId2ApprovedCount',
      outputs: [
        {
          internalType: 'uint8',
          name: '',
          type: 'uint8',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      name: 'pendingSlashMachineId2RefuseCount',
      outputs: [
        {
          internalType: 'uint8',
          name: '',
          type: 'uint8',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'pendingSlashMachineIds',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'precompileContract',
      outputs: [
        {
          internalType: 'contract IPrecompileContract',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'proxiableUUID',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'renter',
          type: 'address',
        },
        {
          internalType: 'string',
          name: 'machineId',
          type: 'string',
        },
        {
          internalType: 'uint256',
          name: 'additionalRentSeconds',
          type: 'uint256',
        },
      ],
      name: 'proxyRenewRent',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'registered',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'machineId',
          type: 'string',
        },
      ],
      name: 'rejectMachineFaultReporting',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'machineId',
          type: 'string',
        },
        {
          internalType: 'uint256',
          name: 'additionalRentSeconds',
          type: 'uint256',
        },
      ],
      name: 'renewRent',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'renounceOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'rentGPUInfo',
      outputs: [
        {
          internalType: 'uint256',
          name: 'rentedGPUCount',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'rentingGPUCount',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'rentId2FeeInfoInDLC',
      outputs: [
        {
          internalType: 'uint256',
          name: 'baseFee',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'extraFee',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'platformFee',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'rentId2RentInfo',
      outputs: [
        {
          internalType: 'address',
          name: 'stakeHolder',
          type: 'address',
        },
        {
          internalType: 'string',
          name: 'machineId',
          type: 'string',
        },
        {
          internalType: 'uint256',
          name: 'rentStatTime',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'rentEndTime',
          type: 'uint256',
        },
        {
          internalType: 'address',
          name: 'renter',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'machineId',
          type: 'string',
        },
        {
          internalType: 'uint256',
          name: 'rentSeconds',
          type: 'uint256',
        },
      ],
      name: 'rentMachine',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'renter',
          type: 'address',
        },
        {
          internalType: 'string',
          name: 'machineId',
          type: 'string',
        },
        {
          internalType: 'uint256',
          name: 'rentSeconds',
          type: 'uint256',
        },
      ],
      name: 'rentProxyMachine',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      name: 'rentWhitelist',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'renter2RentIds',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'machineId',
          type: 'string',
        },
        {
          internalType: 'uint256',
          name: 'reserveAmount',
          type: 'uint256',
        },
      ],
      name: 'reportMachineFault',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address[]',
          name: 'admins',
          type: 'address[]',
        },
      ],
      name: 'setAdminsToAddRentWhiteList',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address[]',
          name: 'admins',
          type: 'address[]',
        },
      ],
      name: 'setAdminsToApproveMachineFaultReporting',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'addr',
          type: 'address',
        },
      ],
      name: 'setCanUpgradeAddress',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'addr',
          type: 'address',
        },
      ],
      name: 'setDBCAIContract',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_feeToken',
          type: 'address',
        },
      ],
      name: 'setFeeToken',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'addr',
          type: 'address',
        },
      ],
      name: 'setOracle',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_precompileContract',
          type: 'address',
        },
      ],
      name: 'setPrecompileContract',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string[]',
          name: 'machineIds',
          type: 'string[]',
        },
        {
          internalType: 'bool',
          name: 'isAdd',
          type: 'bool',
        },
      ],
      name: 'setRentingWhitelist',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'addr',
          type: 'address',
        },
      ],
      name: 'setStakingContract',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'stakeHolder2RentFee',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'stakeHolder2RentGPUInfo',
      outputs: [
        {
          internalType: 'uint256',
          name: 'rentedGPUCount',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'rentingGPUCount',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'stakingContract',
      outputs: [
        {
          internalType: 'contract IStakingContract',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'totalBurnedAmount',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: 'transferOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'newImplementation',
          type: 'address',
        },
        {
          internalType: 'bytes',
          name: 'data',
          type: 'bytes',
        },
      ],
      name: 'upgradeToAndCall',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'version',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'pure',
      type: 'function',
    },
    {
      inputs: [],
      name: 'voteThreshold',
      outputs: [
        {
          internalType: 'uint8',
          name: '',
          type: 'uint8',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ],
  NFT_CONTRACT: [
    {
      inputs: [],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'target',
          type: 'address',
        },
      ],
      name: 'AddressEmptyCode',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'implementation',
          type: 'address',
        },
      ],
      name: 'ERC1967InvalidImplementation',
      type: 'error',
    },
    {
      inputs: [],
      name: 'ERC1967NonPayable',
      type: 'error',
    },
    {
      inputs: [],
      name: 'ERC721EnumerableForbiddenBatchMint',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
      ],
      name: 'ERC721IncorrectOwner',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'ERC721InsufficientApproval',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'approver',
          type: 'address',
        },
      ],
      name: 'ERC721InvalidApprover',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
      ],
      name: 'ERC721InvalidOperator',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
      ],
      name: 'ERC721InvalidOwner',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'receiver',
          type: 'address',
        },
      ],
      name: 'ERC721InvalidReceiver',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
      ],
      name: 'ERC721InvalidSender',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'ERC721NonexistentToken',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'index',
          type: 'uint256',
        },
      ],
      name: 'ERC721OutOfBoundsIndex',
      type: 'error',
    },
    {
      inputs: [],
      name: 'FailedCall',
      type: 'error',
    },
    {
      inputs: [],
      name: 'InvalidInitialization',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NotInitializing',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
      ],
      name: 'OwnableInvalidOwner',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'OwnableUnauthorizedAccount',
      type: 'error',
    },
    {
      inputs: [],
      name: 'UUPSUnauthorizedCallContext',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'slot',
          type: 'bytes32',
        },
      ],
      name: 'UUPSUnsupportedProxiableUUID',
      type: 'error',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'approved',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'Approval',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'bool',
          name: 'approved',
          type: 'bool',
        },
      ],
      name: 'ApprovalForAll',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint64',
          name: 'version',
          type: 'uint64',
        },
      ],
      name: 'Initialized',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'previousOwner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: 'OwnershipTransferred',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'Transfer',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'implementation',
          type: 'address',
        },
      ],
      name: 'Upgraded',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'expireAtTimestamp',
          type: 'uint256',
        },
      ],
      name: 'activeToken',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'enum DeepLinkCrownNFT.VersionType',
          name: 'versionType',
          type: 'uint8',
        },
        {
          indexed: false,
          internalType: 'enum DeepLinkCrownNFT.ExpireTimeType',
          name: 'expireTimeType',
          type: 'uint8',
        },
      ],
      name: 'mintedToken',
      type: 'event',
    },
    {
      inputs: [],
      name: 'UPGRADE_INTERFACE_VERSION',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'active',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'minter',
          type: 'address',
        },
        {
          internalType: 'enum DeepLinkCrownNFT.VersionType',
          name: 'versionType',
          type: 'uint8',
        },
      ],
      name: 'addMinter2MintLevel',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'approve',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
      ],
      name: 'balanceOf',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
      ],
      name: 'getActiveTokenIdsByAddress',
      outputs: [
        {
          internalType: 'uint256[]',
          name: '',
          type: 'uint256[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'getApproved',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
      ],
      name: 'getTokenIdsByAddress',
      outputs: [
        {
          internalType: 'uint256[]',
          name: '',
          type: 'uint256[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'initialOwner',
          type: 'address',
        },
      ],
      name: 'initialize',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
      ],
      name: 'isApprovedForAll',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
        {
          internalType: 'enum DeepLinkCrownNFT.VersionType',
          name: '',
          type: 'uint8',
        },
      ],
      name: 'minter2MintLevel',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'name',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'ownerOf',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'proxiableUUID',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'minter',
          type: 'address',
        },
        {
          internalType: 'enum DeepLinkCrownNFT.VersionType',
          name: 'versionType',
          type: 'uint8',
        },
      ],
      name: 'removeMintLevelOfMinter',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'renounceOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
        {
          internalType: 'enum DeepLinkCrownNFT.VersionType',
          name: 'versionType',
          type: 'uint8',
        },
        {
          internalType: 'enum DeepLinkCrownNFT.ExpireTimeType',
          name: 'expireTimeType',
          type: 'uint8',
        },
      ],
      name: 'safeBatchMint',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'safeTransferFrom',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'bytes',
          name: 'data',
          type: 'bytes',
        },
      ],
      name: 'safeTransferFrom',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
        {
          internalType: 'bool',
          name: 'approved',
          type: 'bool',
        },
      ],
      name: 'setApprovalForAll',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes4',
          name: 'interfaceId',
          type: 'bytes4',
        },
      ],
      name: 'supportsInterface',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'symbol',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'index',
          type: 'uint256',
        },
      ],
      name: 'tokenByIndex',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'tokenId2NFTInfo',
      outputs: [
        {
          internalType: 'enum DeepLinkCrownNFT.VersionType',
          name: 'versionType',
          type: 'uint8',
        },
        {
          internalType: 'enum DeepLinkCrownNFT.ExpireTimeType',
          name: 'expireTimeType',
          type: 'uint8',
        },
        {
          internalType: 'uint256',
          name: 'expireAtTimestamp',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'index',
          type: 'uint256',
        },
      ],
      name: 'tokenOfOwnerByIndex',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'tokenURI',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'totalSupply',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'transferFrom',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: 'transferOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'newImplementation',
          type: 'address',
        },
        {
          internalType: 'bytes',
          name: 'data',
          type: 'bytes',
        },
      ],
      name: 'upgradeToAndCall',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'version',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'pure',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'enum DeepLinkCrownNFT.VersionType',
          name: '',
          type: 'uint8',
        },
      ],
      name: 'versionType2URI',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ],
  DLC_TOKEN: [
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function decimals() view returns (uint8)',
    'function balanceOf(address) view returns (uint256)',
    'function transfer(address,uint256) returns (bool)', // ✅ 补上
    'function approve(address,uint256) returns (bool)', // 你说不需要授权可以删掉
  ],
}

export const getContract = (
  contractName: keyof typeof CONTRACT_ADDRESSES,
  providerOrSigner: ethers.Provider | ethers.Signer
) => {
  const address = CONTRACT_ADDRESSES[contractName]
  const abi = CONTRACT_ABIS[contractName]
  console.log('getContract 输入:', { contractName, address, abi }) // 调试
  if (!address || !abi) {
    throw new Error(`Invalid contract name or ABI: ${contractName}`)
  }
  const contract = new ethers.Contract(address, abi, providerOrSigner)
  console.log(`✅ 合约 ${contractName} 初始化完成`, {
    address: address,
    abiLength: abi.length,
  })
  return contract
}

# Wallet Connection Errors - Understanding and Solutions

## Common Wallet Connection Errors

### 1. "Failed to launch 'bnc://...' because the scheme does not have a registered handler"

**What it means:**
- The user tried to connect to Binance Wallet, but the Binance Wallet app is not installed on their system
- The browser cannot handle the `bnc://` URL scheme because there's no registered application

**Similar errors:**
- `okex://` - OKX Wallet not installed
- `trust://` - Trust Wallet not installed
- `metamask://` - MetaMask not installed

**Solution:**
- User needs to install the specific wallet app first
- Provide clear instructions and download links

### 2. "User rejected" Error

**What it means:**
- User clicked "Cancel" or "Reject" in the wallet popup
- User closed the wallet connection dialog

**Solution:**
- Inform user that connection was cancelled
- Allow them to try again

### 3. "No wallet found" Error

**What it means:**
- No supported wallet is detected on the user's system
- User doesn't have any of the supported wallets installed

**Solution:**
- Guide user to install a supported wallet
- Provide download links for popular wallets

## Error Handling Implementation

### Enhanced Error Messages

The application now provides user-friendly error messages instead of technical error codes:

```javascript
// Before: "Failed to launch 'bnc://...' because the scheme does not have a registered handler"
// After: "Binance Wallet app is not installed. Please install the wallet app first."
```

### Error Categories

1. **Wallet Not Installed**
   - Detected by: `scheme does not have a registered handler` or `Failed to launch`
   - Solution: Provide download link for the specific wallet

2. **User Cancelled**
   - Detected by: `User rejected`
   - Solution: Allow retry

3. **No Wallet Available**
   - Detected by: `No wallet found`
   - Solution: Guide to install any supported wallet

4. **Network Issues**
   - Detected by: `Network error`
   - Solution: Check internet connection

## User Experience Improvements

### 1. Better Error Display
- Clear, actionable error messages
- Visual error indicators with icons
- Retry buttons for failed connections

### 2. Wallet Selection Modal
- Clean, modern wallet selection interface
- Loading states during connection attempts
- Help text with download links

### 3. Progressive Enhancement
- Graceful fallback when wallets aren't available
- Clear guidance for wallet installation
- Multiple wallet options

## Supported Wallets

### Currently Supported:
1. **MetaMask** (`io.metamask`)
   - Most popular Ethereum wallet
   - Browser extension and mobile app
   - Download: https://metamask.io/download/

2. **Coinbase Wallet** (`com.coinbase.wallet`)
   - User-friendly wallet
   - Mobile app and browser extension
   - Download: https://wallet.coinbase.com/

3. **Binance Wallet** (`com.binance.wallet`)
   - Binance ecosystem wallet
   - Mobile app
   - Download: https://www.bnbchain.org/en/binance-wallet

4. **OKX Wallet** (`com.okex.wallet`)
   - OKX exchange wallet
   - Mobile app
   - Download: https://www.okx.com/web3

5. **Trust Wallet** (`com.trustwallet.app`)
   - Binance-owned mobile wallet
   - Mobile app only
   - Download: https://trustwallet.com/

## Best Practices

### For Users:
1. **Install a supported wallet** before trying to connect
2. **MetaMask is recommended** for beginners
3. **Ensure wallet is unlocked** before connecting
4. **Check network compatibility** with the application

### For Developers:
1. **Always handle connection errors gracefully**
2. **Provide clear user guidance**
3. **Offer multiple wallet options**
4. **Test with different wallet configurations**

## Testing Wallet Connections

### Manual Testing:
1. Try connecting with each supported wallet
2. Test with wallets not installed (should show helpful error)
3. Test user cancellation scenarios
4. Test network error scenarios

### Error Simulation:
```javascript
// Simulate wallet not installed error
// This happens when user tries to connect to uninstalled wallet

// Simulate user rejection
// User clicks "Cancel" in wallet popup

// Simulate network error
// Disconnect internet and try to connect
```

## Future Improvements

1. **Wallet Detection**: Check if wallets are installed before showing them
2. **Auto-Installation**: Deep links to app stores for mobile wallets
3. **Connection Persistence**: Remember successful connections
4. **Network Switching**: Allow users to switch networks within the app
5. **Transaction History**: Show recent transactions and balances

## Troubleshooting Guide

### For Users:

**Q: I get "scheme does not have a registered handler" error**
A: Install the wallet app first. Click the download link provided in the error message.

**Q: Connection keeps failing**
A: Try a different wallet or check your internet connection.

**Q: Which wallet should I use?**
A: MetaMask is recommended for beginners. It's widely supported and easy to use.

**Q: Can I use multiple wallets?**
A: Yes, you can connect different wallets, but only one at a time.

### For Developers:

**Q: How to add support for a new wallet?**
A: Add the wallet configuration to `src/config/thirdweb.js` and update the wallet list.

**Q: How to customize error messages?**
A: Modify the error handling logic in `src/composables/useThirdWeb.js`.

**Q: How to test wallet connections?**
A: Install different wallets and test connection scenarios, including error cases.

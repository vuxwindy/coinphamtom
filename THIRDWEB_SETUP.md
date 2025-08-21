# ThirdWeb Integration Setup Guide

This guide will help you set up and configure ThirdWeb in your Vue.js application.

## 🚀 Quick Start

### 1. Get Your ThirdWeb Client ID

1. Go to [ThirdWeb Dashboard](https://thirdweb.com/dashboard)
2. Create a new project or select an existing one
3. Go to Settings → API Keys
4. Copy your Client ID

### 2. Configure Your Client ID

Edit `src/config/thirdweb.js` and replace the placeholder:

```javascript
export const thirdwebConfig = {
  clientId: "your-actual-client-id-here", // Replace this
  // ... rest of config
}
```

### 3. Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to `/thirdweb-demo` to see the demo page
3. Try connecting your wallet

## 📁 File Structure

```
src/
├── components/
│   └── ThirdWebConnect.vue          # Main wallet connect component
├── composables/
│   └── useThirdWeb.js               # ThirdWeb composable
├── config/
│   └── thirdweb.js                  # Configuration file
├── views/
│   └── ThirdWebDemo.vue             # Demo page
└── router/
    └── index.js                     # Router with demo route
```

## 🔧 Configuration Options

### Supported Networks

The default configuration includes:
- **Ethereum Mainnet** (Chain ID: 1)
- **Binance Smart Chain** (Chain ID: 56)
- **Polygon** (Chain ID: 137)

### Supported Wallets

- MetaMask
- Coinbase Wallet
- Rainbow
- Rabby
- Zerion

### Customization

You can customize the configuration in `src/config/thirdweb.js`:

```javascript
export const thirdwebConfig = {
  clientId: "your-client-id",
  
  // Add/remove supported chains
  supportedChains: [
    // Your custom chains here
  ],
  
  // Add/remove supported wallets
  wallets: [
    // Your custom wallets here
  ],
  
  // Change default chain
  defaultChain: 1, // Ethereum
  
  // Enable/disable auto-connect
  autoConnect: true,
  
  // Custom theme
  theme: {
    primaryColor: "#667eea",
    secondaryColor: "#764ba2",
    // ... more theme options
  }
}
```

## 🎯 Usage Examples

### Basic Wallet Connection

```vue
<template>
  <ThirdWebConnect />
</template>

<script>
import ThirdWebConnect from '@/components/ThirdWebConnect.vue'

export default {
  components: {
    ThirdWebConnect
  }
}
</script>
```

### Using the Composable

```vue
<script>
import { useThirdWeb } from '@/composables/useThirdWeb.js'

export default {
  setup() {
    const {
      isConnected,
      account,
      chain,
      connect,
      disconnect,
      getBalance,
      sendTransaction,
      signMessage
    } = useThirdWeb()

    // Your component logic here
    return {
      isConnected,
      account,
      chain,
      connect,
      disconnect,
      getBalance,
      sendTransaction,
      signMessage
    }
  }
}
</script>
```

### Wallet Actions

```javascript
// Connect wallet
const result = await connect('io.metamask')

// Get balance
const balance = await getBalance()

// Send transaction
const tx = await sendTransaction({
  to: '0x...',
  value: '0.1',
  data: '0x'
})

// Sign message
const signature = await signMessage('Hello World')
```

## 🎨 Styling

The ThirdWeb components use CSS custom properties for theming. You can customize the appearance by overriding these variables:

```css
:root {
  --thirdweb-primary: #667eea;
  --thirdweb-secondary: #764ba2;
  --thirdweb-background: #ffffff;
  --thirdweb-text: #333333;
}
```

## 🔒 Security Considerations

1. **Never expose your secret key** - Only use the client ID in frontend code
2. **Validate transactions** - Always validate transaction parameters before sending
3. **Handle errors gracefully** - Implement proper error handling for wallet operations
4. **Test on testnets** - Test your integration on test networks before mainnet

## 🐛 Troubleshooting

### Common Issues

1. **"Client ID not found"**
   - Make sure you've replaced the placeholder in `src/config/thirdweb.js`
   - Verify your client ID is correct in the ThirdWeb dashboard

2. **"Wallet not found"**
   - Ensure the wallet extension is installed
   - Check if the wallet is supported in the configuration

3. **"Network not supported"**
   - Add the network to `supportedChains` in the configuration
   - Or switch to a supported network

4. **"Transaction failed"**
   - Check if you have sufficient balance
   - Verify the transaction parameters
   - Ensure you're on the correct network

### Debug Mode

Enable debug logging by adding this to your browser console:

```javascript
localStorage.setItem('thirdweb-debug', 'true')
```

## 📚 Additional Resources

- [ThirdWeb Documentation](https://portal.thirdweb.com/)
- [ThirdWeb React SDK](https://portal.thirdweb.com/react)
- [ThirdWeb JavaScript SDK](https://portal.thirdweb.com/typescript)
- [ThirdWeb Dashboard](https://thirdweb.com/dashboard)

## 🤝 Support

If you encounter any issues:

1. Check the [ThirdWeb Discord](https://discord.gg/thirdweb)
2. Review the [ThirdWeb Documentation](https://portal.thirdweb.com/)
3. Check the browser console for error messages
4. Verify your configuration settings

## 🎉 Next Steps

After setting up ThirdWeb:

1. **Test all wallet connections** - Try connecting with different wallets
2. **Test network switching** - Switch between different networks
3. **Test transactions** - Send test transactions on testnets
4. **Integrate with your app** - Use the composable in your components
5. **Add error handling** - Implement proper error handling
6. **Style to match your app** - Customize the appearance

Happy building! 🚀

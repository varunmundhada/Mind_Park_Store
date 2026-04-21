// Quick script to get your network IP address for mobile testing
import { networkInterfaces } from 'os';

function getNetworkIP() {
  const nets = networkInterfaces();
  const results = [];

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip internal (i.e. 127.0.0.1) and non-IPv4 addresses
      const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4;
      if (net.family === familyV4Value && !net.internal) {
        results.push({
          interface: name,
          address: net.address
        });
      }
    }
  }

  return results;
}

console.log('\n🌐 Network IP Addresses for Mobile Access:\n');
console.log('═══════════════════════════════════════════\n');

const ips = getNetworkIP();

if (ips.length === 0) {
  console.log('❌ No network IP found. Make sure you are connected to WiFi.\n');
} else {
  ips.forEach((ip, index) => {
    console.log(`${index + 1}. ${ip.interface}`);
    console.log(`   IP: ${ip.address}`);
    console.log(`   Frontend URL: http://${ip.address}:5173`);
    console.log(`   Backend URL:  http://${ip.address}:5000`);
    console.log('');
  });

  console.log('═══════════════════════════════════════════\n');
  console.log('📱 To access on your phone:');
  console.log('   1. Connect your phone to the SAME WiFi network');
  console.log('   2. Open browser on phone');
  console.log(`   3. Go to: http://${ips[0].address}:5173\n`);
  console.log('⚙️  Make sure to update server/.env:');
  console.log(`   CLIENT_URL=http://${ips[0].address}:5173\n`);
}

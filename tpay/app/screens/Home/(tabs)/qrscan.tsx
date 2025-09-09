    // import React, { useState } from 'react';
    // import { View, Text, StyleSheet } from 'react-native';
    // import { RNCamera } from 'react-native-camera';

    // const QRCodeScanner = () => {
    //     const [scannedData, setScannedData] = useState(null);

    //     const handleBarCodeScanned = ({ data }) => {
    //         setScannedData(data);
    //         // You can also navigate, display an alert, or perform other actions here
    //     };

    //     return (
    //         <View style={styles.container}>
    //             <RNCamera
    //                 style={styles.camera}
    //                 onBarCodeRead={handleBarCodeScanned} // Or onCodeScanned for VisionCamera
    //                 // Other camera props like flashMode, type (front/back)
    //             />
    //             {scannedData && (
    //                 <View style={styles.scannedResult}>
    //                     <Text>Scanned QR Code: {scannedData}</Text>
    //                 </View>
    //             )}
    //         </View>
    //     );
    // };

    // const styles = StyleSheet.create({
    //     container: {
    //         flex: 1,
    //         flexDirection: 'column',
    //         backgroundColor: 'black',
    //     },
    //     camera: {
    //         flex: 1,
    //         justifyContent: 'flex-end',
    //         alignItems: 'center',
    //     },
    //     scannedResult: {
    //         padding: 20,
    //         backgroundColor: 'white',
    //         alignItems: 'center',
    //     },
    // });

    // export default QRCodeScanner;
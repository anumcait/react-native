import React, { useState } from 'react';
import {
  SafeAreaView,
  TextInput,
  Button,
  Text,
  StyleSheet,
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { verifyGST } from './src/api/GstVerification'; // adjust path if needed

const App = () => {
  const [gstin, setGstin] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const isValidGSTIN = (gstin) =>
    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gstin);

  const handleVerify = async () => {
    if (!isValidGSTIN(gstin)) {
      Alert.alert('Invalid GSTIN', 'Please enter a valid 15-character GSTIN.');
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      const data = await verifyGST(gstin);
      setResult(data);
    } catch (error) {
      setResult({ error: 'Verification failed. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  const renderRow = (label, value) => (
    <View style={styles.row} key={label}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value || '-'}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>GST Verification</Text>

      <TextInput
        placeholder="Enter GSTIN"
        value={gstin}
        onChangeText={setGstin}
        style={styles.input}
        autoCapitalize="characters"
        maxLength={15}
      />

      <Button
        title={loading ? 'Verifying...' : 'Verify'}
        onPress={handleVerify}
        disabled={loading}
      />

      {loading && <ActivityIndicator style={styles.loader} size="large" color="#007bff" />}

      <ScrollView style={styles.resultBox}>
         {result?.data && (
    <View style={styles.table}>
      {renderRow('GSTIN', result.data.gstin)}
      {renderRow('Legal Name', result.data.legal_name)}
      {renderRow('Trade Name', result.data.trade_name)}
      {renderRow('State', result.data.state)}
      {renderRow('Address', result.data.address)}
      {renderRow('Pincode', result.data.pincode)}
      {renderRow('Status', result.data.status)}
      {renderRow('Constitution', result.data.constitutionOfBusiness)}
      {renderRow('Date of Registration', result.data.dateOfRegistration)}
      {renderRow('Last Updated', result.data.lastUpdated)}
    </View>
  )}

        {result?.error && (
          <Text style={[styles.resultText, { color: 'red' }]}>{result.error}</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  loader: {
    marginVertical: 20,
  },
  resultBox: {
    marginTop: 20,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
    maxHeight: 400,
  },
  resultText: {
    fontSize: 14,
    color: '#333',
  },
  table: {
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  label: {
    fontWeight: 'bold',
    flex: 1,
    color: '#333',
  },
  value: {
    flex: 1,
    textAlign: 'right',
    color: '#555',
  },
});

export default App;

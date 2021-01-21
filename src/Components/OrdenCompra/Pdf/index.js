import React from 'react';
import { PDFViewer, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

export default function OrdenCompraPDF(){
    return(
        <PDFViewer>
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text>Orden de Compra</Text>
                    </View>
                    <View style={styles.section}>
                        <Text>Productos</Text>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    )
}
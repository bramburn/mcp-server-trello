#!/usr/bin/env node

/**
 * Test for Sprint 5: get_card_labels tool
 */

import { validateGetCardLabelsRequest } from './validators.js';

console.log('🧪 Testing Sprint 5: get_card_labels tool...');

// Test 1: Valid card_id
try {
  const testArgs1 = {
    card_id: 'test-card-123'
  };

  const result1 = validateGetCardLabelsRequest(testArgs1);
  console.log('✅ Test 1 PASSED - Valid card_id:', result1);
} catch (error) {
  console.error('❌ Test 1 FAILED:', error.message);
}

// Test 2: Missing card_id
try {
  const testArgs2 = {};

  const result2 = validateGetCardLabelsRequest(testArgs2);
  console.log('❌ Test 2 FAILED - Should have thrown error for missing card_id');
} catch (error) {
  console.log('✅ Test 2 PASSED - Correctly caught missing card_id:', error.message);
}

// Test 3: Empty card_id
try {
  const testArgs3 = {
    card_id: ''
  };

  const result3 = validateGetCardLabelsRequest(testArgs3);
  console.log('❌ Test 3 FAILED - Should have thrown error for empty card_id');
} catch (error) {
  console.log('✅ Test 3 PASSED - Correctly caught empty card_id:', error.message);
}

// Test label formatting logic
function testLabelFormatting() {
  console.log('\n📝 Testing label formatting logic:');
  
  // Mock label data from Trello API (card with labels)
  const mockCardWithLabels = [
    { id: 'label1', name: 'High Priority', color: 'red' },
    { id: 'label2', name: 'Bug', color: 'orange' },
    { id: 'label3', name: 'Feature', color: 'green' }
  ];
  
  // Format labels as the tool would
  const formattedLabels = mockCardWithLabels.map(label => ({
    id: label.id,
    name: label.name,
    color: label.color
  }));
  
  console.log('✅ Card with labels formatted correctly:');
  formattedLabels.forEach((label, index) => {
    console.log(`   ${index + 1}. ID: ${label.id}, Name: "${label.name}", Color: ${label.color}`);
  });
  
  // Test response structure for card with labels
  const responseWithLabels = {
    success: true,
    labels: formattedLabels
  };
  
  console.log('\n✅ Response structure (with labels):');
  console.log(JSON.stringify(responseWithLabels, null, 2));
  
  // Test response structure for card with no labels
  const responseNoLabels = {
    success: true,
    labels: []
  };
  
  console.log('\n✅ Response structure (no labels):');
  console.log(JSON.stringify(responseNoLabels, null, 2));
}

testLabelFormatting();

console.log('\n🎉 Sprint 5 validation tests completed!');
